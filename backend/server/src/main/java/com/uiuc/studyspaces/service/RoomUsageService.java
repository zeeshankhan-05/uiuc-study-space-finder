package com.uiuc.studyspaces.service;

import com.uiuc.studyspaces.model.RoomUsage;
import com.uiuc.studyspaces.repository.RoomUsageRepository;

import jakarta.annotation.PostConstruct;

import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalTime;
import java.util.List;
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
        LocalTime queryTime = LocalTime.parse(timeStr);
        List<RoomUsage> rooms = repository.findByBuilding(building);

        System.out.println("Looking for rooms in building: " + building + ", day: " + day + ", time: " + timeStr);
        System.out.println("Total rooms found: " + rooms.size());

        return rooms.stream()
                .filter(room -> {
                    System.out.println("Checking room: " + room.getRoom());

                    if (room.getUsage() == null || room.getUsage().getCourses() == null) {
                        System.out.println("No usage data found for room " + room.getRoom() + " — assuming free");
                        return true;
                    }

                    List<RoomUsage.Course> coursesOnDay = room.getUsage().getCourses().stream()
                            .filter(course -> course.getDay().equalsIgnoreCase(day))
                            .toList();

                    System.out
                            .println("Courses on " + day + " for room " + room.getRoom() + ": " + coursesOnDay.size());

                    for (RoomUsage.Course course : coursesOnDay) {
                        LocalTime start = LocalTime.parse(course.getStart());
                        LocalTime end = LocalTime.parse(course.getEnd());
                        System.out.println("Checking course time: " + start + " - " + end);

                        if (!queryTime.isBefore(start) && queryTime.isBefore(end)) {
                            System.out.println("Room " + room.getRoom() + " is occupied at " + timeStr);
                            return false;
                        }
                    }

                    System.out.println("Room " + room.getRoom() + " is free at " + timeStr);
                    return true;
                })
                .collect(Collectors.toList());
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
        System.out.println("Looking for building='" + building + "', room='" + room + "'");
        return repository.findByBuildingAndRoom(building, room)
                .map(result -> {
                    System.out.println("✅ Found: " + result);
                    return result;
                })
                .orElseGet(() -> {
                    System.out.println("❌ Not found");
                    return null;
                });
    }

    @PostConstruct
    public void printAllRoomsOnceOnStartup() {
        List<RoomUsage> all = repository.findAll();
        for (RoomUsage room : all) {
            System.out.println("📄 Room from DB -> " +
                    "building='" + room.getBuilding() + "' (length=" + room.getBuilding().length() + "), " +
                    "room='" + room.getRoom() + "' (length=" + room.getRoom().length() + ")");
        }
    }
}
