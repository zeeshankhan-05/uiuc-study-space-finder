# API Documentation - UIUC Study Space Finder

## Base URL

```
http://localhost:8080/api
```

## Authentication

Currently no authentication is required for any endpoints. All endpoints are publicly accessible.

## Features

### Dual Zoom System

The application features a sophisticated dual zoom system that separates browser zoom from map zoom functionality:

- **Browser Zoom**: Standard browser zoom (Cmd+/Ctrl+, Cmd-/Ctrl-, Cmd0/Ctrl0) affects the entire page
- **Map Zoom**: Custom map zoom controls work independently for the campus map only
- **Independent Controls**: Both zoom systems operate simultaneously without interference

## Endpoints

### GET /api/buildings

- **Description**: Get a list of all available buildings
- **Response**: Array of building names as strings
- **Example Response**:

```json
[
  "Siebel Center for Computer Science",
  "Grainger Engineering Library",
  "Illini Union"
]
```

### GET /api/rooms

- **Description**: Get available rooms in a specific building for a given day and time
- **Parameters**:
  - `building` (string): Building name
  - `day` (string): Day of the week (e.g., "Monday", "Tuesday")
  - `time` (string): Time in HH:mm format (e.g., "14:30")
- **Response**: Array of RoomUsage objects
- **Example Request**: `/api/rooms?building=Siebel Center for Computer Science&day=Monday&time=14:30`

### GET /api/buildings/{building}/rooms

- **Description**: Get all rooms in a building with their availability status for a specific day and time
- **Parameters**:
  - `building` (path): Building name
  - `day` (query): Day of the week (e.g., "Monday", "Tuesday")
  - `time` (query): Time in HH:mm format (e.g., "14:30")
- **Response**: Array of RoomStatusResponse objects containing room status information
- **Example Request**: `/api/buildings/Siebel Center for Computer Science/rooms?day=Monday&time=14:30`

### GET /api/rooms/{building}/{room}

- **Description**: Get detailed information about a specific room
- **Parameters**:
  - `building` (path): Building name
  - `room` (path): Room number/identifier
- **Response**: RoomUsage object with detailed room information

## Data Models

### RoomUsage

```json
{
  "building": "string",
  "room": "string",
  "capacity": "number",
  "type": "string",
  "available": "boolean",
  "occupiedRanges": [
    {
      "start": "string",
      "end": "string"
    }
  ]
}
```

### RoomStatusResponse

```json
{
  "building": "string",
  "room": "string",
  "capacity": "number",
  "type": "string",
  "status": "string",
  "occupiedUntil": "string",
  "occupiedRanges": [
    {
      "start": "string",
      "end": "string"
    }
  ]
}
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200 OK`: Successful request
- `400 Bad Request`: Invalid parameters
- `404 Not Found`: Building or room not found
- `500 Internal Server Error`: Server-side error

## CORS

The API currently allows cross-origin requests from any origin for development purposes. This should be restricted in production.

---

For more details on system design, see [Architecture](architecture.md).
