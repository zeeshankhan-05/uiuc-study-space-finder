# UIUC Study Space Finder - Frontend

A React-based web application for finding study spaces at the University of Illinois Urbana-Champaign.

## Features

### Interactive Campus Map

- **SVG-based campus map** with clickable building areas
- **Building information pages** accessible by clicking on map buildings
- **Hover tooltips** showing building names
- **Responsive design** that works on all screen sizes
- **Dual zoom system** separating browser zoom from map zoom functionality

### Dual Zoom System

The application features a sophisticated dual zoom system that separates browser zoom from map zoom functionality:

- **Browser Zoom**: Standard browser zoom (Cmd+/Ctrl+, Cmd-/Ctrl-, Cmd0/Ctrl0) affects the entire page
- **Map Zoom**: Custom map zoom controls work independently for the campus map only
- **Independent Controls**: Both zoom systems operate simultaneously without interference

### Navigation

- **React Router** for seamless navigation between pages
- **Building detail pages** with comprehensive information
- **Back navigation** to return to the map

### Building Data

- **Comprehensive building database** covering major UIUC campus buildings
- **Detailed descriptions** for each building
- **Study space information** with room availability status

### Search & Filtering

- **Enhanced search bar** with building and room filtering
- **Date and time selection** for checking availability
- **Real-time room status** updates

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── CampusMap.jsx          # Interactive SVG map component
│   │   ├── CampusMap.css          # Map styling
│   │   ├── EnhancedSearchBar.jsx  # Search and filtering component
│   │   ├── RoomTable.jsx          # Room availability table
│   │   ├── BuildingModal.jsx      # Building information modal
│   │   ├── SearchDropdown.jsx     # Search dropdown component
│   │   └── MapTableLayout.jsx     # Layout component
│   ├── pages/
│   │   ├── Building.jsx           # Individual building pages
│   ├── utils/
│   │   ├── buildingMapper.js      # Building data and mapping
│   │   ├── dateUtils.js           # Date handling utilities
│   │   ├── searchUtils.js         # Search functionality
│   │   └── roomAvailabilityTests.js # Room availability logic tests
│   ├── assets/
│   │   ├── campusMapWithBuildings.svg  # SVG map with clickable areas
│   │   └── UIUC Block I Logo.png       # UIUC logo
│   └── App.jsx                    # Main app component with routing
```

## How the Interactive Map Works

### SVG Integration

The map uses an SVG file (`campusMapWithBuildings.svg`) that contains:

- **Clickable polygons** for each building
- **Building metadata** including names and URLs
- **Responsive design** that scales with the container

### Click Handling

1. **Building polygons** are automatically made clickable
2. **Click events** navigate to individual building pages
3. **Hover effects** show building names in tooltips
4. **Routing** uses React Router for seamless navigation

### Building Pages

Each building has its own page (`/building/:buildingId`) featuring:

- **Building name** and description
- **Campus information**
- **Study space details** with room availability
- **Navigation back to map**

## Technologies Used

- **React 19** - UI framework
- **React Router** - Navigation and routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **SVG** - Scalable vector graphics for the map
- **Axios** - HTTP client for API communication

## Key Features

### Room Availability

- **Real-time status** showing open/occupied rooms
- **Time-based filtering** to check availability at different times
- **Date selection** for planning study sessions
- **Building-specific** room information

### Search & Navigation

- **Building search** with dropdown suggestions
- **Room filtering** by availability status
- **Responsive design** optimized for mobile and desktop

## Future Enhancements

- **Real-time updates** from backend API
- **Room booking system**
- **User reviews and ratings**
- **Mobile app version**
- **Accessibility improvements**

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is built for portfolio use. See the main project LICENSE file for details.
