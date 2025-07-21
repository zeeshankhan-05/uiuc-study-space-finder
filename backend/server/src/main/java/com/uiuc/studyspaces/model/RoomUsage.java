package com.uiuc.studyspaces.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "room_usage_fall2025")
public class RoomUsage {

    @Id
    private String id;

    private String building;
    private String room;
    private Usage usage;
    private List<String> courses;
    private String room_id;
    private String semester;

    // Getters and setters
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

    public String getRoomNumber() {
        return room;
    }

    public void setRoomNumber(String room) {
        this.room = room;
    }

    public Usage getUsage() {
        return usage;
    }

    public void setUsage(Usage usage) {
        this.usage = usage;
    }

    public List<String> getCourses() {
        return courses;
    }

    public void setCourses(List<String> courses) {
        this.courses = courses;
    }

    public String getRoom_id() {
        return room_id;
    }

    public void setRoom_id(String room_id) {
        this.room_id = room_id;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public static class Usage {
        private List<TimeRange> Monday;
        private List<TimeRange> Tuesday;
        private List<TimeRange> Wednesday;
        private List<TimeRange> Thursday;
        private List<TimeRange> Friday;

        public List<TimeRange> getMonday() {
            return Monday;
        }

        public void setMonday(List<TimeRange> monday) {
            Monday = monday;
        }

        public List<TimeRange> getTuesday() {
            return Tuesday;
        }

        public void setTuesday(List<TimeRange> tuesday) {
            Tuesday = tuesday;
        }

        public List<TimeRange> getWednesday() {
            return Wednesday;
        }

        public void setWednesday(List<TimeRange> wednesday) {
            Wednesday = wednesday;
        }

        public List<TimeRange> getThursday() {
            return Thursday;
        }

        public void setThursday(List<TimeRange> thursday) {
            Thursday = thursday;
        }

        public List<TimeRange> getFriday() {
            return Friday;
        }

        public void setFriday(List<TimeRange> friday) {
            Friday = friday;
        }

        public List<TimeRange> getTimeRangesForDay(String day) {
            switch (day.toLowerCase()) {
                case "monday":
                    return Monday;
                case "tuesday":
                    return Tuesday;
                case "wednesday":
                    return Wednesday;
                case "thursday":
                    return Thursday;
                case "friday":
                    return Friday;
                default:
                    return null;
            }
        }
    }

    public static class TimeRange {
        private String start;
        private String end;

        public String getStart() {
            return start;
        }

        public void setStart(String start) {
            this.start = start;
        }

        public String getEnd() {
            return end;
        }

        public void setEnd(String end) {
            this.end = end;
        }
    }
}
