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
- Interactive campus map (Leaflet)
- Communicates with backend via REST API (Axios)
- Client-side routing (react-router-dom)

### 2. Backend (Spring Boot)
- Exposes RESTful endpoints for study space data
- Handles business logic, authentication, and validation
- Connects to MongoDB for persistent storage

### 3. Data Pipeline (Python Scraper)
- Scrapes UIUC course and classroom data
- Normalizes and loads data into MongoDB
- Scheduled to run periodically for fresh data

## Data Flow
1. **Scraper** collects and normalizes data, stores in MongoDB
2. **Backend** exposes data via REST API
3. **Frontend** fetches and displays data to users

## Security & Best Practices
- Environment variables for secrets
- Input validation and error handling
- Modular, testable codebase

---

For more details, see [API Documentation](api-documentation.md) and [Setup Instructions](setup-instructions.md). 