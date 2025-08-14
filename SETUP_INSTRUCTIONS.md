# UIUC Study Space Finder - Setup Instructions

## Overview

This application helps students find available study spaces on the UIUC campus by showing room availability in real-time.

## Features

- **Interactive Campus Map**: Click on buildings to view room availability
- **Real-time Room Status**: See which rooms are open or occupied
- **Time-based Filtering**: Change date and time to see availability
- **Responsive Design**: Works on desktop and mobile devices

## Prerequisites

- Node.js (v16 or higher)
- Java 17 or higher
- MongoDB (local or Atlas)
- Python 3.8+ (for data scraping)

## Quick Start

### 1. Start the Backend Server

```bash
cd backend/server
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

### 2. Start the Frontend Development Server

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:3000` (or next available port)

### 3. Load Sample Data (if needed)

```bash
cd scraper
python main.py --push-only
```

## How to Use

### 1. Navigate to the Map

- Open your browser and go to `http://localhost:3000`
- Click on "Map" in the navigation

### 2. Select a Building

- Click on any building on the interactive campus map
- You'll be taken to that building's page

### 3. View Room Availability

- The page will show all rooms in the building with their current status
- Green = Available, Red = Occupied
- You can see when rooms become available

### 4. Change Time/Date

- Use the date picker to select a different day
- Use the time picker to check availability at different times
- The table updates automatically

## API Endpoints

### Get All Buildings

```
GET /api/buildings
```

### Get Rooms in Building

```
GET /api/buildings/{building}/rooms?day={day}&time={time}
```

### Get Available Rooms

```
GET /api/rooms?building={building}&day={day}&time={time}
```

## Troubleshooting

### Frontend Issues

- **Import Error**: Make sure all dependencies are installed with `npm install`
- **API Connection**: Ensure the backend is running on port 8080
- **Building Not Found**: Check the building mapper in `frontend/src/utils/buildingMapper.js`

### Backend Issues

- **MongoDB Connection**: Ensure MongoDB is running and accessible
- **Port Already in Use**: Change the port in `application.properties`
- **Data Not Loading**: Run the scraper to populate the database

### Data Issues

- **No Buildings Showing**: Run `python main.py --push-only` in the scraper directory
- **Empty Results**: Check if the building name matches between SVG and API data

## Development

### Project Structure

```
├── frontend/          # React frontend application
├── backend/           # Spring Boot backend API
├── scraper/           # Python data scraping tools
└── docs/             # Documentation
```

### Key Files

- `frontend/src/api/rooms.js` - API client functions
- `frontend/src/utils/buildingMapper.js` - Building name mapping
- `frontend/src/components/CampusMap.jsx` - Interactive map component
- `frontend/src/pages/Building.jsx` - Building detail page
- `backend/server/src/main/java/com/uiuc/studyspaces/controller/RoomUsageController.java` - API endpoints

## Data Sources

The application uses course schedule data from UIUC to determine room availability. The scraper processes this data and stores it in MongoDB for real-time access.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational/portfolio use only.
