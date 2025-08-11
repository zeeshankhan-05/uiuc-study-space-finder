package com.uiuc.studyspaces.model;

import java.util.List;

/**
 * DTO for room status response
 * Contains room information and availability status for a specific day and time
 */
public class RoomStatusResponse {
    private String roomNumber;
    private String status; // "OPEN" or "OCCUPIED"
    private String availableUntil; // HH:mm format, null if free for rest of day
    private List<RoomUsage.TimeRange> occupiedRanges; // null if room is open

    // Default constructor
    public RoomStatusResponse() {
    }

    // Constructor with all fields
    public RoomStatusResponse(String roomNumber, String status, String availableUntil,
            List<RoomUsage.TimeRange> occupiedRanges) {
        this.roomNumber = roomNumber;
        this.status = status;
        this.availableUntil = availableUntil;
        this.occupiedRanges = occupiedRanges;
    }

    // Getters and setters
    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAvailableUntil() {
        return availableUntil;
    }

    public void setAvailableUntil(String availableUntil) {
        this.availableUntil = availableUntil;
    }

    public List<RoomUsage.TimeRange> getOccupiedRanges() {
        return occupiedRanges;
    }

    public void setOccupiedRanges(List<RoomUsage.TimeRange> occupiedRanges) {
        this.occupiedRanges = occupiedRanges;
    }
}
