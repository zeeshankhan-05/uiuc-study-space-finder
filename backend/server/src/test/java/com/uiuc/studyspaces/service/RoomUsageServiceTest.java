package com.uiuc.studyspaces.service;

import com.uiuc.studyspaces.model.RoomUsage;
import com.uiuc.studyspaces.model.RoomStatusResponse;
import com.uiuc.studyspaces.repository.RoomUsageRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RoomUsageServiceTest {

    @Mock
    private RoomUsageRepository repository;

    @Mock
    private MongoTemplate mongoTemplate;

    @InjectMocks
    private RoomUsageService service;

    private RoomUsage testRoom1;
    private RoomUsage testRoom2;
    private RoomUsage testRoom3;

    @BeforeEach
    void setUp() {
        // Create test room 1: Free room (no usage data)
        testRoom1 = new RoomUsage();
        testRoom1.setBuilding("Test Building");
        testRoom1.setRoomNumber("101");
        testRoom1.setUsage(null);

        // Create test room 2: Open room (usage data but not occupied at query time)
        testRoom2 = new RoomUsage();
        testRoom2.setBuilding("Test Building");
        testRoom2.setRoomNumber("102");

        RoomUsage.Usage usage2 = new RoomUsage.Usage();
        RoomUsage.TimeRange timeRange1 = new RoomUsage.TimeRange();
        timeRange1.setStart("09:00");
        timeRange1.setEnd("10:00");

        RoomUsage.TimeRange timeRange2 = new RoomUsage.TimeRange();
        timeRange2.setStart("14:00");
        timeRange2.setEnd("15:00");

        usage2.setMonday(Arrays.asList(timeRange1, timeRange2));
        testRoom2.setUsage(usage2);

        // Create test room 3: Occupied room (usage data and occupied at query time)
        testRoom3 = new RoomUsage();
        testRoom3.setBuilding("Test Building");
        testRoom3.setRoomNumber("103");

        RoomUsage.Usage usage3 = new RoomUsage.Usage();
        RoomUsage.TimeRange timeRange3 = new RoomUsage.TimeRange();
        timeRange3.setStart("12:00");
        timeRange3.setEnd("13:00");

        RoomUsage.TimeRange timeRange4 = new RoomUsage.TimeRange();
        timeRange4.setStart("15:00");
        timeRange4.setEnd("16:00");

        usage3.setMonday(Arrays.asList(timeRange3, timeRange4));
        testRoom3.setUsage(usage3);
    }

    @Test
    void testGetAllRoomsWithStatus_ValidInput() {
        // Arrange
        String building = "Test Building";
        String day = "Monday";
        String time = "12:30"; // Between 12:00-13:00, so room 103 should be occupied

        when(repository.findByBuilding(building))
                .thenReturn(Arrays.asList(testRoom1, testRoom2, testRoom3));

        // Act
        List<RoomStatusResponse> result = service.getAllRoomsWithStatus(building, day, time);

        // Assert
        assertNotNull(result);
        assertEquals(3, result.size());

        // Room 1: Free room
        RoomStatusResponse room1Response = result.stream()
                .filter(r -> r.getRoomNumber().equals("101"))
                .findFirst()
                .orElse(null);
        assertNotNull(room1Response);
        assertEquals("OPEN", room1Response.getStatus());
        assertNull(room1Response.getAvailableUntil());
        assertNull(room1Response.getOccupiedRanges());

        // Room 2: Open room
        RoomStatusResponse room2Response = result.stream()
                .filter(r -> r.getRoomNumber().equals("102"))
                .findFirst()
                .orElse(null);
        assertNotNull(room2Response);
        assertEquals("OPEN", room2Response.getStatus());
        assertEquals("14:00", room2Response.getAvailableUntil()); // Next occupied time
        assertNull(room2Response.getOccupiedRanges());

        // Room 3: Occupied room
        RoomStatusResponse room3Response = result.stream()
                .filter(r -> r.getRoomNumber().equals("103"))
                .findFirst()
                .orElse(null);
        assertNotNull(room3Response);
        assertEquals("OCCUPIED", room3Response.getStatus());
        assertNull(room3Response.getAvailableUntil());
        assertNotNull(room3Response.getOccupiedRanges());
        assertEquals(2, room3Response.getOccupiedRanges().size());

        verify(repository).findByBuilding(building);
    }

    @Test
    void testGetAllRoomsWithStatus_InvalidDay() {
        // Arrange
        String building = "Test Building";
        String day = "Saturday";
        String time = "13:30";

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> {
            service.getAllRoomsWithStatus(building, day, time);
        });

        verifyNoInteractions(repository);
    }

    @Test
    void testGetAllRoomsWithStatus_InvalidTime() {
        // Arrange
        String building = "Test Building";
        String day = "Monday";
        String time = "25:00"; // Invalid time format

        // Act & Assert
        assertThrows(Exception.class, () -> {
            service.getAllRoomsWithStatus(building, day, time);
        });
    }

    @Test
    void testGetAllRoomsWithStatus_EmptyBuilding() {
        // Arrange
        String building = "Empty Building";
        String day = "Monday";
        String time = "13:30";

        when(repository.findByBuilding(building))
                .thenReturn(Arrays.asList());

        // Act
        List<RoomStatusResponse> result = service.getAllRoomsWithStatus(building, day, time);

        // Assert
        assertNotNull(result);
        assertTrue(result.isEmpty());

        verify(repository).findByBuilding(building);
    }

    @Test
    void testGetAllRoomsWithStatus_RoomFreeForRestOfDay() {
        // Arrange
        String building = "Test Building";
        String day = "Monday";
        String time = "16:30"; // After all occupied times

        when(repository.findByBuilding(building))
                .thenReturn(Arrays.asList(testRoom2, testRoom3));

        // Act
        List<RoomStatusResponse> result = service.getAllRoomsWithStatus(building, day, time);

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());

        // Room 2: Should be open with no next occupied time (free for rest of day)
        RoomStatusResponse room2Response = result.stream()
                .filter(r -> r.getRoomNumber().equals("102"))
                .findFirst()
                .orElse(null);
        assertNotNull(room2Response);
        assertEquals("OPEN", room2Response.getStatus());
        assertNull(room2Response.getAvailableUntil()); // Free for rest of day

        // Room 3: Should be open with no next occupied time (free for rest of day)
        RoomStatusResponse room3Response = result.stream()
                .filter(r -> r.getRoomNumber().equals("103"))
                .findFirst()
                .orElse(null);
        assertNotNull(room3Response);
        assertEquals("OPEN", room3Response.getStatus());
        assertNull(room3Response.getAvailableUntil()); // Free for rest of day
    }
}
