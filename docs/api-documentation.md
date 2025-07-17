# API Documentation - UIUC Study Space Finder

## Base URL
```
http://localhost:8080/api
```

## Authentication
- (If implemented) Use JWT or session-based authentication for protected endpoints
- Public endpoints do not require authentication

## Endpoints

### GET /api/spaces
- **Description**: Get a list of all study spaces
- **Response**:
```json
[
  {
    "id": "string",
    "name": "Grainger Library",
    "location": { "lat": 40.113, "lng": -88.224 },
    "capacity": 200,
    "available": true,
    "type": "library|classroom|lounge",
    "features": ["wifi", "whiteboard"]
  },
  ...
]
```

### GET /api/spaces/{id}
- **Description**: Get details for a specific study space
- **Response**:
```json
{
  "id": "string",
  "name": "Grainger Library",
  "location": { "lat": 40.113, "lng": -88.224 },
  "capacity": 200,
  "available": true,
  "type": "library|classroom|lounge",
  "features": ["wifi", "whiteboard"]
}
```

### GET /api/courses
- **Description**: Get a list of courses and their scheduled rooms
- **Response**:
```json
[
  {
    "courseId": "CS225",
    "title": "Data Structures",
    "room": "Siebel 1404",
    "schedule": ["MWF 10:00-10:50"]
  },
  ...
]
```

### POST /api/feedback
- **Description**: Submit user feedback
- **Request**:
```json
{
  "email": "user@example.com",
  "message": "Great app!"
}
```
- **Response**:
```json
{
  "status": "success"
}
```

---

For more details on system design, see [Architecture](architecture.md). 