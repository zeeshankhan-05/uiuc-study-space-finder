package com.uiuc.studyspaces.service;

import com.uiuc.studyspaces.model.RoomUsage;
import com.uiuc.studyspaces.model.RoomStatusResponse;
import com.uiuc.studyspaces.repository.RoomUsageRepository;

import jakarta.annotation.PostConstruct;

import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RoomUsageService {

    private final RoomUsageRepository repository;
    private final MongoTemplate mongoTemplate;

    @Autowired
    public RoomUsageService(RoomUsageRepository repository, MongoTemplate mongoTemplate) {
        this.repository = repository;
        this.mongoTemplate = mongoTemplate;
    }

    public List<RoomUsage> getAvailableRooms(String building, String day, String timeStr) {
        String normalizedDay = day.trim().toLowerCase();
        if (!Set.of("monday", "tuesday", "wednesday", "thursday", "friday").contains(normalizedDay)) {
            throw new IllegalArgumentException("Invalid day: " + day);
        }

        LocalTime queryTime = LocalTime.parse(timeStr);
        List<RoomUsage> rooms = repository.findByBuilding(building);

        System.out.println("Looking for rooms in building: " + building + ", day: " + day + ", time: " + timeStr);
        System.out.println("Total rooms found: " + rooms.size());

        return rooms.stream()
                .filter(room -> {
                    System.out.println("Checking room: " + room.getRoomNumber());

                    if (room.getUsage() == null) {
                        System.out.println("No usage data found for room " + room.getRoomNumber() + " — assuming free");
                        return true;
                    }

                    List<RoomUsage.TimeRange> slotsOnDay = null;
                    switch (day.toLowerCase()) {
                        case "monday":
                            slotsOnDay = room.getUsage().getMonday();
                            break;
                        case "tuesday":
                            slotsOnDay = room.getUsage().getTuesday();
                            break;
                        case "wednesday":
                            slotsOnDay = room.getUsage().getWednesday();
                            break;
                        case "thursday":
                            slotsOnDay = room.getUsage().getThursday();
                            break;
                        case "friday":
                            slotsOnDay = room.getUsage().getFriday();
                            break;
                        default:
                            slotsOnDay = List.of();
                            break;
                    }
                    if (slotsOnDay == null)
                        slotsOnDay = List.of();

                    System.out.println(
                            "Slots on " + day + " for room " + room.getRoomNumber() + ": " + slotsOnDay.size());

                    for (RoomUsage.TimeRange slot : slotsOnDay) {
                        LocalTime start = LocalTime.parse(slot.getStart());
                        LocalTime end = LocalTime.parse(slot.getEnd());
                        System.out.println("Checking slot time: " + start + " - " + end);

                        if (!queryTime.isBefore(start) && queryTime.isBefore(end)) {
                            System.out.println("Room " + room.getRoomNumber() + " is occupied at " + timeStr);
                            return false;
                        }
                    }

                    System.out.println("Room " + room.getRoomNumber() + " is free at " + timeStr);
                    return true;
                })
                .collect(Collectors.toList());
    }

    /**
     * Get all rooms in a building with their availability status for a specific day
     * and time
     * 
     * @param building The building name
     * @param day      The day of the week (Monday, Tuesday, etc.)
     * @param timeStr  The time to check availability (HH:mm format)
     * @return List of RoomStatusResponse objects containing room status information
     */
    public List<RoomStatusResponse> getAllRoomsWithStatus(String building, String day, String timeStr) {
        String normalizedDay = day.trim().toLowerCase();
        if (!Set.of("monday", "tuesday", "wednesday", "thursday", "friday").contains(normalizedDay)) {
            throw new IllegalArgumentException("Invalid day: " + day);
        }

        LocalTime queryTime = LocalTime.parse(timeStr);
        List<RoomUsage> rooms = repository.findByBuilding(building);

        return rooms.stream()
                .map(room -> createRoomStatusResponse(room, normalizedDay, queryTime))
                .collect(Collectors.toList());
    }

    /**
     * Create a RoomStatusResponse object for a given room, day, and time
     * 
     * @param room      The room usage data
     * @param day       The normalized day string
     * @param queryTime The time to check availability
     * @return RoomStatusResponse object
     */
    private RoomStatusResponse createRoomStatusResponse(RoomUsage room, String day, LocalTime queryTime) {
        String roomNumber = room.getRoomNumber();
        List<RoomUsage.TimeRange> timeRanges = getTimeRangesForDay(room, day);

        if (timeRanges == null || timeRanges.isEmpty()) {
            // Room is free for the entire day
            return new RoomStatusResponse(roomNumber, "OPEN", null, null);
        }

        // Check if room is occupied at the query time
        boolean isOccupied = timeRanges.stream()
                .anyMatch(range -> {
                    LocalTime start = LocalTime.parse(range.getStart());
                    LocalTime end = LocalTime.parse(range.getEnd());
                    return !queryTime.isBefore(start) && queryTime.isBefore(end);
                });

        if (isOccupied) {
            // Room is occupied, return all occupied ranges
            return new RoomStatusResponse(roomNumber, "OCCUPIED", null, timeRanges);
        } else {
            // Room is open, find when it becomes occupied next
            String availableUntil = findNextOccupiedTime(timeRanges, queryTime);
            return new RoomStatusResponse(roomNumber, "OPEN", availableUntil, null);
        }
    }

    /**
     * Get time ranges for a specific day from room usage
     * 
     * @param room The room usage data
     * @param day  The normalized day string
     * @return List of time ranges for the specified day
     */
    private List<RoomUsage.TimeRange> getTimeRangesForDay(RoomUsage room, String day) {
        if (room.getUsage() == null) {
            return null;
        }

        switch (day) {
            case "monday":
                return room.getUsage().getMonday();
            case "tuesday":
                return room.getUsage().getTuesday();
            case "wednesday":
                return room.getUsage().getWednesday();
            case "thursday":
                return room.getUsage().getThursday();
            case "friday":
                return room.getUsage().getFriday();
            default:
                return null;
        }
    }

    /**
     * Find the next time when the room becomes occupied after the query time
     * 
     * @param timeRanges List of occupied time ranges
     * @param queryTime  The current query time
     * @return Time string in HH:mm format when room becomes occupied, or null if
     *         free for rest of day
     */
    private String findNextOccupiedTime(List<RoomUsage.TimeRange> timeRanges, LocalTime queryTime) {
        if (timeRanges == null || timeRanges.isEmpty()) {
            return null;
        }

        // Find the next occupied range that starts after the query time
        return timeRanges.stream()
                .filter(range -> {
                    LocalTime start = LocalTime.parse(range.getStart());
                    return start.isAfter(queryTime);
                })
                .min((r1, r2) -> {
                    LocalTime start1 = LocalTime.parse(r1.getStart());
                    LocalTime start2 = LocalTime.parse(r2.getStart());
                    return start1.compareTo(start2);
                })
                .map(range -> range.getStart())
                .orElse(null); // Room is free for the rest of the day
    }

    public List<String> getAllBuildings() {
        List<String> buildings = mongoTemplate.query(RoomUsage.class)
                .distinct("building")
                .as(String.class)
                .all();
        buildings.sort(String::compareTo);
        return buildings;
    }

    public RoomUsage getRoomByName(String building, String room) {
        return repository.findByBuildingAndRoom(building.trim(), room.trim())
                .orElse(null);
    }

    @PostConstruct
    public void printAllRoomsOnceOnStartup() {
        List<RoomUsage> all = repository.findAll();
        for (RoomUsage room : all) {
            System.out.println("📄 Room from DB -> " +
                    "building='" + room.getBuilding() + "' (length=" + room.getBuilding().length() + "), " +
                    "room='" + room.getRoomNumber() + "' (length=" + room.getRoomNumber().length() + ")");
        }
    }
}
