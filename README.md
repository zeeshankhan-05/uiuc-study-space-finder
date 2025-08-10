# UIUC Study Space Finder

A modern web application that helps University of Illinois Urbana-Champaign students find available study spaces across campus by tracking classroom schedules and occupancy in real-time.

## 🚀 Features

- **Interactive Campus Map**: Visual representation of study spaces with real-time availability
- **Smart Scheduling**: Tracks classroom schedules to predict study space availability
- **Real-time Updates**: Live data on space occupancy and availability
- **Mobile Responsive**: Optimized for both desktop and mobile devices
- **Course Integration**: Links study spaces to course schedules for better planning

## 🛠️ Tech Stack

### Backend
- **Spring Boot 3.x** - RESTful API server
- **MongoDB** - NoSQL database for flexible data storage
- **Maven** - Dependency management and build tool

### Frontend
- **React 19** - Modern UI framework with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Leaflet** - Interactive maps
- **Axios** - HTTP client for API communication

### Data Pipeline
- **Python 3.x** - Web scraping and data processing
- **BeautifulSoup** - HTML parsing
- **Selenium** - Dynamic content scraping
- **PyMongo** - MongoDB Python driver

## 📁 Project Structure

```
uiuc-study-space-finder/
├── backend/studyspaces/     # Spring Boot API server
├── frontend/                # React + Vite application
├── scraper/                 # Python data collection scripts
├── docs/                    # Project documentation
└── .github/workflows/       # CI/CD pipelines
```

## 🚀 Quick Start

### Prerequisites
- Java 17+ (for Spring Boot)
- Node.js 18+ (for React frontend)
- Python 3.8+ (for data scraping)
- MongoDB (local or cloud instance)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/zeeshankhan-05/uiuc-study-space-finder.git
   cd uiuc-study-space-finder
   ```

2. **Start the Backend**
   ```bash
   cd backend/studyspaces
   ./mvnw spring-boot:run
   ```
   Backend will be available at `http://localhost:3000 **Start the Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend will be available at `http://localhost:3000`

4 **Setup Data Scraper** (Optional)
   ```bash
   cd scraper
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

## 📚 Documentation

- [Architecture Overview](docs/architecture.md) - System design and component interactions
- [API Documentation](docs/api-documentation.md) - REST API endpoints and usage
- [Setup Instructions](docs/setup-instructions.md) - Detailed development environment setup

## 🧪 Testing

```bash
# Backend tests
cd backend/studyspaces
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

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature`)
4.Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Zeeshan Khan** - Computer Science 26' @ UIUC

- GitHub: [@zeeshankhan-05](https://github.com/zeeshankhan-05)
- LinkedIn: [zeeshankhan05](https://www.linkedin.com/in/zeeshankhan05/)

## 🙏 Acknowledgments

- UIUC Course Explorer API for course data
- OpenStreetMap for campus mapping data
- Spring Boot and React communities for excellent documentation
