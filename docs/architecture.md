# System Architecture - UIUC Study Space Finder

## Overview

UIUC Study Space Finder is a full-stack web application designed to help students locate available study spaces across campus. The system is composed of three main components:

- **Frontend**: React.js + Vite + Tailwind CSS
- **Backend**: Spring Boot (Java) REST API
- **Data Pipeline**: Python Scraper (BeautifulSoup, Selenium) + MongoDB

## Architecture Diagram

```
+-------------------+        REST API        +-------------------+        MongoDB        +-------------------+
|    React Frontend | <-------------------> |   Spring Boot API | <-------------------> |   Database        |
|  (Vite, Tailwind) |                       |   (Java, REST)    |                       | (MongoDB Atlas)   |
+-------------------+                       +-------------------+                       +-------------------+
         ^                                                                                      ^
         |                                                                                      |
         |  Scraped Data                                                                        |
         +-------------------+        Python Scripts        +-------------------+
                             |   (BeautifulSoup, Selenium) |   Data Scraper    |
                             +-----------------------------+-------------------+
```

## Component Breakdown

### 1. Frontend (React)

- Modern SPA using React 19, Vite, and Tailwind CSS
- Interactive campus map using SVG with clickable building areas
- Communicates with backend via REST API (Axios)
- Client-side routing (react-router-dom)

### 2. Backend (Spring Boot)

- Exposes RESTful endpoints for study space data
- Handles business logic for room availability calculations
- Connects to MongoDB for persistent storage
- Currently implements room availability and building endpoints

### 3. Data Pipeline (Python Scraper)

- Scrapes UIUC course and classroom data
- Normalizes and loads data into MongoDB
- Uses BeautifulSoup and Selenium for web scraping
- Processes course schedules to determine room availability

## Data Flow

1. **Scraper** collects and normalizes course schedule data, stores in MongoDB
2. **Backend** exposes data via REST API endpoints
3. **Frontend** fetches and displays data to users through interactive map interface

## Current Implementation Status

### Frontend ✅

- Interactive SVG campus map with clickable buildings
- Building detail pages with room information
- Search and filtering functionality
- Responsive design with Tailwind CSS
- Dual zoom system implementation

### Backend ✅

- Spring Boot application with REST API
- Room availability endpoints
- Building information endpoints
- MongoDB integration

### Data Pipeline ✅

- Python scraper for course data
- Data normalization and storage
- MongoDB integration

## Security & Best Practices

- Environment variables for configuration
- Input validation and error handling
- Modular, testable codebase
- CORS configuration for development

## Future Enhancements

- Authentication and user management
- Real-time updates via WebSockets
- Advanced filtering and search
- Mobile app development
- Performance optimizations

---

For more details, see [API Documentation](api-documentation.md) and [Setup Instructions](setup-instructions.md).
