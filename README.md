# UIUC Study Space Finder

A modern web application that helps University of Illinois Urbana-Champaign students find available study spaces across campus by tracking classroom schedules and occupancy.

## Project Overview

This project is a comprehensive study space finder designed for the University of Illinois Urbana-Champaign, benefiting over 50,000 students. It utilizes a MongoDB database to store all building and room availability information, a Spring Boot application to create a RESTful API for the backend, and a ReactJS frontend for intuitive user interaction.

## Visit The Site

Feel free to check out the project here!

[EMBED_LINK_PLACEHOLDER]

## 🚀 Features

- **MongoDB Database**: Stores detailed information about buildings, rooms, and course schedules, including availability times, room types, and capacity.
- **Spring Boot Backend**: Provides a robust RESTful API to manage study space data efficiently. The backend is packaged with Maven and can be deployed to any cloud platform.
- **ReactJS Frontend**: A user-friendly interface for viewing building information, checking room availability, and navigating the interactive campus map. The frontend is built with Vite and can be hosted on any static hosting service.
- **Interactive Campus Map**: Visual representation of study spaces with clickable building areas
- **Smart Scheduling**: Tracks classroom schedules to predict study space availability
- **Real-time Updates**: Live data on space occupancy and availability
- **Room Status API**: Comprehensive endpoint to get all rooms in a building with their availability status
- **Mobile Responsive**: Optimized for both desktop and mobile devices
- **Course Integration**: Links study spaces to course schedules for better planning
- **Keyboard Navigation**: Full keyboard support for map interaction and navigation
- **Smart Date Filtering**: Automatically adjusts weekend dates to nearest valid weekday for optimal study space availability

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

### Frontend

- **React 19** - Modern UI framework with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **SVG** - Interactive campus map with clickable building areas
- **Axios** - HTTP client for API communication

### Data Pipeline

- **Python 3.8+** - Web scraping and data processing
- **BeautifulSoup** - HTML parsing
- **Selenium** - Dynamic content scraping
- **PyMongo** - MongoDB Python driver

## 📁 Project Structure

```
uiuc-study-space-finder/
├── backend/server/          # Spring Boot API server
├── frontend/                # React + Vite application
├── scraper/                 # Python data collection scripts
├── docs/                    # Project documentation
└── .github/workflows/       # CI/CD pipelines
```

## Prerequisites

Before running this project locally, ensure you have the following installed:

- **Java Development Kit (JDK) 17 or higher**
- **Node.js 18+ and npm (Node Package Manager)**
- **MongoDB database (local or cloud instance)**
- **Python 3.8+ (for data scraping)**
- **IDE (IntelliJ IDEA, Eclipse, VS Code, etc.)**

## 🚀 Installation

### Backend Setup

1. **Clone this repository**
2. **Open the backend/server directory in your preferred IDE**
3. **Configure the application.properties file in the src/main/resources directory with your MongoDB database credentials**
4. **Run the Spring Boot application**

```bash
cd backend/server
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to the frontend directory in your terminal**
2. **Run npm install to install the necessary dependencies**
3. **Update the API configuration if needed**
4. **Run npm run dev to start the React application**

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`

### Data Scraper Setup (Optional)

```bash
cd scraper
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py --push-only
```

## Usage

Access the frontend application via `http://localhost:5173`.

Use the provided API endpoints to perform operations on study space data:

- **`/api/buildings`** - GET all available buildings
- **`/api/rooms`** - GET available rooms with building, day, and time parameters
- **`/api/buildings/{building}/rooms`** - GET all rooms in a building with availability status
- **`/api/rooms/{building}/{room}`** - GET detailed information about a specific room

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

## 🙏 Acknowledgments

- UIUC Course Explorer API for course data
- OpenStreetMap for campus mapping data
- Spring Boot and React communities for excellent documentation
