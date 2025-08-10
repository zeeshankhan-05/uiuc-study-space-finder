# UIUC Study Space Finder - Frontend

A React-based web application for finding study spaces at the University of Illinois Urbana-Champaign.

## Features

### Interactive Campus Map

- **SVG-based campus map** with clickable building areas
- **Building information pages** accessible by clicking on map buildings
- **Hover tooltips** showing building names
- **Responsive design** that works on all screen sizes

### Navigation

- **React Router** for seamless navigation between pages
- **Building detail pages** with comprehensive information
- **Back navigation** to return to the map

### Building Data

- **Comprehensive building database** covering major UIUC campus buildings
- **Detailed descriptions** for each building
- **Study space information** (coming soon)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
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

4. Open your browser and navigate to `http://localhost:5173`

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
│   │   └── CampusMap.css          # Map styling
│   ├── pages/
│   │   ├── Home.jsx               # Home page
│   │   ├── Map.jsx                # Map page
│   │   ├── About.jsx              # About page
│   │   └── Building.jsx           # Individual building pages
│   ├── assets/
│   │   ├── campusMapWithBuildings.svg  # SVG map with clickable areas
│   │   └── uiuc-campus-map.png         # Background map image
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
- **Study space details** (placeholder for future features)
- **Navigation back to map**

## Customization

### Adding New Buildings

1. Edit `campusMapWithBuildings.svg` to add new polygon shapes
2. Add building descriptions in `Building.jsx`
3. Update routing if needed

### Styling

- Modify `CampusMap.css` for map appearance
- Update hover effects and tooltip styles
- Customize building page layouts

## Technologies Used

- **React 18** - UI framework
- **React Router** - Navigation and routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **SVG** - Scalable vector graphics for the map

## Future Enhancements

- **Study space availability** in real-time
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
