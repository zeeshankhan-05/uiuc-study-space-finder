# Setup Instructions - UIUC Study Space Finder

## Prerequisites
- Java 17+ (for backend)
- Node.js 18+ (for frontend)
- Python 3.8+ (for scraper)
- MongoDB (local or Atlas)

## 1. Clone the Repository
```bash
git clone https://github.com/zeeshankhan-05/uiuc-study-space-finder.git
cd uiuc-study-space-finder
```

## 2. Backend Setup (Spring Boot)
```bash
cd backend/studyspaces
./mvnw spring-boot:run
```
- Runs on `http://localhost:8080`
- Configure MongoDB in `src/main/resources/application.properties`

## 3. Frontend Setup (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
- Runs on `http://localhost:3000`
- Proxies API requests to backend

## 4. Scraper Setup (Python)
```bash
cd scraper
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env  # Add your MongoDB credentials
python course_scraper.py
```

## 5. Environment Variables
- Backend: `application.properties` for DB config
- Scraper: `.env` for MongoDB URI and DB name

## 6. Running Tests
- Backend: `./mvnw test`
- Frontend: `npm test` (if tests are added)
- Scraper: `python -m pytest` (if tests are added)

## Troubleshooting
- **Port conflicts**: Change ports in Vite or Spring Boot config
- **MongoDB connection errors**: Check URI and DB name in `.env` and `application.properties`
- **Node version issues**: Use Node 18+ (nvm recommended)
- **Python venv issues**: Ensure you activate the correct virtual environment

---

For more details, see [Architecture](architecture.md) and [API Documentation](api-documentation.md). 