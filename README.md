# UIUC Study Space Finder

A modern web application that helps University of Illinois Urbana-Champaign students find available study spaces across campus by tracking classroom schedules and occupancy.

## Project Overview

This project is a comprehensive study space finder designed for the University of Illinois Urbana-Champaign, benefiting over 50,000 students. It leverages modern web technologies to help students find available study spaces across campus. Key components include:

- A MongoDB database storing building and room availability information from 180+ UIUC departments
- A Spring Boot application providing a RESTful API backend with room availability calculations
- A React-based frontend with an interactive SVG campus map and building navigation
- A Python-based scraper that processes course schedules to determine room usage patterns

## Visit The Site

Feel free to check out the project here!

[EMBED_LINK_PLACEHOLDER]

## 🚀 Features

### Core Features

- **Interactive Campus Map**: Built with Leaflet for smooth, responsive map interactions
- **Smart Scheduling**: Real-time tracking of classroom schedules and availability
- **Department-wise Data**: Organized course data for all UIUC departments
- **Mobile Responsive**: Tailwind-powered responsive design for all devices

### User Experience

- **Enhanced Search**: Advanced search functionality with dropdown suggestions
- **Building Information**: Detailed modal views for each campus building
- **Room Availability**: Real-time room status and scheduling information
- **Date-based Filtering**: Smart date selection with React DatePicker
- **Keyboard Navigation**: Full keyboard support for map interactions

### Technical Features

- **RESTful API**: Comprehensive Spring Boot backend endpoints with room availability calculations
- **MongoDB Integration**: Efficient NoSQL data storage and retrieval with 180+ department datasets
- **Data Scraping**: Automated course and room data collection using BeautifulSoup and Selenium
- **Data Normalization**: Standardized room and building information across all departments
- **SVG Map Integration**: Custom campus map with interactive building elements and routing
- **Real-time Availability**: Dynamic room status calculation based on course schedules

## 🗺️ Map Interaction & Zoom

### Zoom Architecture

#### Map Zoom

- **Custom + Button** - Zoom into campus map
- **Custom - Button** - Zoom out of campus map
- **Custom Reset Button** - Reset map view to default
- Independent of browser zoom level
- Maintains map-specific state

### Keyboard Navigation

#### Map-Focused Controls

When the map is focused (Tab navigation), these shortcuts are available:

- **+ / =** - Map zoom in
- **-** - Map zoom out
- **0** - Reset map view
- **Arrow Keys** - Pan map in all directions
- **Escape** - Reset map view

#### Focus Management

- Use **Tab** to navigate to the map container
- Visual focus indicator shows when map is active
- Keyboard shortcuts only work when map is focused
- Browser zoom shortcuts always work globally

## 🛠️ Tech Stack

### Backend

- **Spring Boot 3.5.3** - RESTful API server
- **MongoDB** - NoSQL database for flexible data storage
- **Maven** - Dependency management and build tool
- **Java 17** - Runtime environment
- **Spring Data MongoDB** - Database integration
- **SpringDoc OpenAPI UI 1.6.14** - API documentation
- **Spring Boot Validation** - Input validation

### Frontend

- **React 19.1.0** - Modern UI framework with hooks
- **Vite 7.0.4** - Fast build tool and development server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **React Router DOM 7.7.0** - Client-side routing
- **Leaflet 1.9.4 / React-Leaflet 5.0.0** - Interactive mapping library
- **Axios 1.10.0** - HTTP client for API communication
- **React DatePicker 8.4.0** - Date selection component
- **Tailwind Forms & Typography** - Enhanced form styling

### Data Pipeline

- **Python 3.x** - Web scraping and data processing
- **BeautifulSoup 4.12.2** - HTML parsing for course data
- **Selenium 4.15.2** - Dynamic web scraping
- **PyMongo 4.6.0** - MongoDB integration
- **Requests 2.31.0** - HTTP client for web scraping
- **Room Normalizer** - Custom room data standardization
- **JSON Data Storage** - Structured course and room data
- **Department-wise Organization** - Modular data management (180+ departments)

## 📁 Project Structure

```
uiuc-study-space-finder/
├── backend/
│   └── server/              # Spring Boot API server
│       ├── src/main/java/   # Java source code
│       ├── src/main/resources/ # Application properties and data files
│       └── pom.xml          # Maven configuration
├── frontend/                # React + Vite application
│   ├── src/                 # React source code
│   ├── public/              # Static assets
│   └── package.json         # Node.js dependencies
├── scraper/                 # Python data collection scripts
│   ├── data/                # Scraped course and room data
│   ├── course_scraper.py    # Web scraping logic
│   └── room_normalizer.py   # Data processing utilities
├── docs/                    # Project documentation
└── LICENSE                  # MIT License
```

## Prerequisites

Before running this project locally, ensure you have the following installed:

- **Java Development Kit (JDK) 17**
- **Node.js (for npm)**
- **MongoDB database (local or cloud instance)**
- **Python (for data scraping)**
- **Visual Studio Code or another preferred IDE**

## 🚀 Installation

### Backend Setup

1. Clone the repository
2. Navigate to the backend server directory:

```bash
cd backend/server
```

3. Configure MongoDB credentials in `src/main/resources/application.properties`
4. Run the Spring Boot application:

```bash
./mvnw spring-boot:run
```

The backend API will be available at `http://localhost:8080`

**Note:** The application uses MongoDB for data storage. Ensure you have MongoDB running locally or configure a cloud MongoDB instance.

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies and start the development server:

```bash
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Data Scraper Setup

1. Navigate to the scraper directory:

```bash
cd scraper
```

2. Install Python requirements:

```bash
pip install -r requirements.txt
```

3. Run the scraper to collect course data:

```bash
python main.py
```

**Note:** The scraper processes 180+ UIUC departments and can take significant time to complete. Use `--push-only` flag to only push existing data to MongoDB without re-scraping.

## Usage

Access the frontend application via `http://localhost:5173`.

Use the provided API endpoints to perform operations on study space data:

- **`GET /api/buildings`** - Get all available buildings
- **`GET /api/rooms`** - Get available rooms with building, day, and time parameters
- **`GET /api/buildings/{building}/rooms`** - Get all rooms in a building with availability status for specific day/time
- **`GET /api/rooms/{building}/{room}`** - Get detailed information about a specific room

### API Response Examples

**Room Status Response:**

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
      }
    ]
  }
]
```

## 📚 Documentation

- [Architecture Overview](docs/architecture.md) - System design and component interactions
- [API Documentation](docs/api-documentation.md) - REST API endpoints and usage
- [Backend API Endpoints](backend/server/API_ENDPOINTS.md) - Detailed backend API documentation
- [Setup Instructions](docs/setup-instructions.md) - Detailed development environment setup
- [Zoom Functionality](docs/zoom-functionality-update.md) - Dual zoom system implementation details

## 🏢 Building System

The application includes a comprehensive building mapping system that connects SVG map elements to building data for navigation and information display.

### Building Data Structure

Each building in the system includes:

- **ID**: Unique identifier for the building
- **Full Name**: Complete official building name
- **Display Name**: User-friendly name for the UI
- **Path**: URL path used in the SVG map for navigation

### Available Buildings

The system currently supports 50+ buildings across campus, including:

- Academic buildings (Engineering, Sciences, Arts, etc.)
- Libraries and study spaces
- Residence halls
- Administrative buildings
- Research facilities

### Building Navigation

- Click on any building on the interactive campus map
- Building data is retrieved using the `getBuildingByPath()` function
- Users are navigated to dedicated building pages with study space information
- All building paths are validated against the building data registry

## 🧪 Testing

```bash
# Backend tests
cd backend/server
./mvnw test

# Frontend tests
cd frontend
npm test

# Scraper tests
cd scraper
python -m pytest
```

## 🚀 Deployment

### Backend Deployment

- Configure MongoDB connection in `application.properties`
- Build JAR: `./mvnw clean package`
- Deploy to cloud platform (AWS, GCP, Azure)

### Frontend Deployment

- Build: `npm run build`
- Deploy static files to CDN or hosting service

## 🤝 Contributing

Contributions are welcome! If you'd like to enhance this project or report issues, please submit a pull request or open an issue.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Zeeshan Khan** - Computer Science 26' @ UIUC

- GitHub: [zeeshankhan-05](https://github.com/zeeshankhan-05)
- LinkedIn: [zeeshankhan05](https://www.linkedin.com/in/zeeshankhan05/)
- Portfolio: [https://zeeshan-khan-portfolio.vercel.app/]
