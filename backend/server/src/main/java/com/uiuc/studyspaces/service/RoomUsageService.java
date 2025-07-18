package com.uiuc.studyspaces.service;

import com.uiuc.studyspaces.model.RoomUsage;
import com.uiuc.studyspaces.model.TimeRange;
import com.uiuc.studyspaces.repository.RoomUsageRepository;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomUsageService {

    private final RoomUsageRepository repository;

    public RoomUsageService(RoomUsageRepository repository) {
        this.repository = repository;
    }

    public List<RoomUsage> getAvailableRooms(String building, String day, String timeStr) {
        LocalTime queryTime = LocalTime.parse(timeStr); // Expecting "HH:mm"

        return repository.findByBuilding(building).stream()
            .filter(room -> {
                List<TimeRange> busyTimes = room.getAvailability().get(day);
                if (busyTimes == null) return true; // No classes on that day

                for (TimeRange tr : busyTimes) {
                    LocalTime start = LocalTime.parse(tr.getStart());
                    LocalTime end = LocalTime.parse(tr.getEnd());
                    if (!queryTime.isBefore(start) && !queryTime.isAfter(end)) {
                        return false; // Occupied at this time
                    }
                }
                return true; // Free at this time
            })
            .collect(Collectors.toList());
    }

    public List<String> getAllBuildings() {
        return repository.findAll().stream()
            .map(RoomUsage::getBuilding)
            .distinct()
            .sorted()
            .collect(Collectors.toList());
    }

    public RoomUsage getRoomByName(String building, String room) {
        return repository.findAll().stream()
            .filter(r -> r.getBuilding().equals(building) && r.getRoom().equals(room))
            .findFirst()
            .orElse(null);
    }
}
