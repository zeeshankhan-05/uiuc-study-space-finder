package com.uiuc.studyspaces.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Document("studyspaces")
public class RoomUsage {

    @Id
    private String id;

    private String building;
    private String room;

    private Map<String, List<TimeRange>> availability;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBuilding() {
        return building;
    }

    public void setBuilding(String building) {
        this.building = building;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public Map<String, List<TimeRange>> getAvailability() {
        return availability;
    }

    public void setAvailability(Map<String, List<TimeRange>> availability) {
        this.availability = availability;
    }
}
