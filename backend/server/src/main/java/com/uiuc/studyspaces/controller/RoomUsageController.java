package com.uiuc.studyspaces.controller;

import com.uiuc.studyspaces.model.RoomUsage;
import com.uiuc.studyspaces.service.RoomUsageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Temporarily allow all for frontend testing
public class RoomUsageController {

    private final RoomUsageService service;

    public RoomUsageController(RoomUsageService service) {
        this.service = service;
    }

    @GetMapping("/rooms")
    public List<RoomUsage> getAvailableRooms(
            @RequestParam String building,
            @RequestParam String day,
            @RequestParam String time) {
        return service.getAvailableRooms(building, day, time);
    }

    @GetMapping("/buildings")
    public List<String> getAllBuildings() {
        return service.getAllBuildings();
    }

    @GetMapping("/room")
    public RoomUsage getRoomDetails(
            @RequestParam String building,
            @RequestParam String room) {
        return service.getRoomByName(building, room);
    }
}
