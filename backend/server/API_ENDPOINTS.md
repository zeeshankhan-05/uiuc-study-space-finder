# API Endpoints Documentation

## Room Status Endpoint

### GET /api/buildings/{building}/rooms

Returns all rooms in a building with their availability status for a specific day and time.

**URL Parameters:**

- `building` (path parameter): The building name (e.g., "Siebel Center", "Grainger Library")
- `day` (query parameter): The day of the week (e.g., "Monday", "Tuesday", "Wednesday", "Thursday", "Friday")
- `time` (query parameter): The time to check availability in HH:mm format (e.g., "13:00", "14:30")

**Example Request:**

```
GET /api/buildings/Siebel%20Center/rooms?day=Monday&time=13:00
```

**Response Format:**

```json
[
  {
    "roomNumber": "2405",
    "status": "OPEN",
    "availableUntil": "14:00",
    "occupiedRanges": null
  },
  {
    "roomNumber": "2406",
    "status": "OCCUPIED",
    "availableUntil": null,
    "occupiedRanges": [
      {
        "start": "12:00",
        "end": "13:00"
      },
      {
        "start": "15:00",
        "end": "16:00"
      }
    ]
  },
  {
    "roomNumber": "2407",
    "status": "OPEN",
    "availableUntil": null,
    "occupiedRanges": null
  }
]
```

**Response Fields:**

- `roomNumber`: The room number/identifier
- `status`: Either "OPEN" or "OCCUPIED"
- `availableUntil`: If the room is open, this shows when it becomes occupied next (HH:mm format). If null, the room is free for the rest of the day.
- `occupiedRanges`: If the room is occupied, this contains a list of all occupied time ranges for the day. If null, the room is open.

**Status Logic:**

- **OPEN**: The room is available at the specified time
- **OCCUPIED**: The room is currently in use at the specified time

**Error Responses:**

- `400 Bad Request`: If an invalid day is provided (only Monday-Friday are supported)
- `400 Bad Request`: If an invalid time format is provided (must be HH:mm)

**Notes:**

- Times are in 24-hour format (HH:mm)
- Days are case-insensitive but should be full day names
- If a room has no usage data for a day, it's considered free for the entire day
- The endpoint returns all rooms in the building, regardless of their current status
