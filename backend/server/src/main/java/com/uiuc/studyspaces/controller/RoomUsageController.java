package com.uiuc.studyspaces.controller;

import com.uiuc.studyspaces.model.RoomUsage;
import com.uiuc.studyspaces.model.RoomStatusResponse;
import com.uiuc.studyspaces.service.RoomUsageService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

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
    public ResponseEntity<?> getAvailableRooms(
            @RequestParam String building,
            @RequestParam String day,
            @RequestParam String time) {
        try {
            List<RoomUsage> rooms = service.getAvailableRooms(building, day, time);
            return ResponseEntity.ok(rooms);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while fetching room data: " + e.getMessage());
        }
    }

    @GetMapping("/buildings")
    public List<String> getAllBuildings() {
        return service.getAllBuildings();
    }

    @GetMapping("/rooms/{building}/{room}")
    public RoomUsage getRoomDetails(
            @PathVariable String building,
            @PathVariable String room) {
        return service.getRoomByName(building, room);
    }

    /**
     * Get all rooms in a building with their availability status for a specific day
     * and time
     * 
     * @param building The building name (path variable)
     * @param day      The day of the week (query parameter)
     * @param time     The time to check availability in HH:mm format (query
     *                 parameter)
     * @return List of RoomStatusResponse objects containing room status information
     */
    @GetMapping("/buildings/{building}/rooms")
    public ResponseEntity<?> getAllRoomsInBuilding(
            @PathVariable String building,
            @RequestParam String day,
            @RequestParam String time) {
        try {
            List<RoomStatusResponse> rooms = service.getAllRoomsWithStatus(building, day, time);
            return ResponseEntity.ok(rooms);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while fetching room data: " + e.getMessage());
        }
    }
}
