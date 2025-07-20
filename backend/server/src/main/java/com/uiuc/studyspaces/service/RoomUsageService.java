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

                    if (room.getUsage() == null) {
                        System.out.println("No usage data found for room " + room.getRoom() + " — assuming free");
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

                    System.out.println("Slots on " + day + " for room " + room.getRoom() + ": " + slotsOnDay.size());

                    for (RoomUsage.TimeRange slot : slotsOnDay) {
                        LocalTime start = LocalTime.parse(slot.getStart());
                        LocalTime end = LocalTime.parse(slot.getEnd());
                        System.out.println("Checking slot time: " + start + " - " + end);

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
        return repository.findByBuildingAndRoom(building.trim(), room.trim())
                .orElse(null);
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
