# Implementation Plan

- [ ] 1. Set up project structure and core data models
  - Create directory structure for scraper, backend, and database components
  - Define core data models and interfaces for room, building, and availability data
  - Set up MongoDB connection utilities and basic configuration
  - _Requirements: 5.1, 5.2, 5.3_

- [ ] 2. Implement Python scraper foundation
  - [ ] 2.1 Create CourseExplorerScraper class with HTML parsing logic
    - Write scraper to extract course meeting information from Course Explorer HTML
    - Implement methods to parse building, room, days, and times from course data
    - Add error handling for malformed HTML and network issues
    - _Requirements: 4.1, 4.2, 4.5_

  - [ ] 2.2 Implement RoomNormalizer for consistent room formatting
    - Create room normalization logic to standardize building and room identifiers
    - Write methods to parse and format room strings into {building: room} structure
    - Add validation for room format consistency
    - _Requirements: 4.3_

  - [ ] 2.3 Build DatabaseClient for MongoDB operations
    - Implement MongoDB connection and insertion methods
    - Create methods to store room availability data and update timestamps
    - Add error handling for database connection failures
    - _Requirements: 4.4, 4.6, 5.4_

- [ ] 3. Create MongoDB schema and test data insertion
  - [ ] 3.1 Design and implement MongoDB collections schema
    - Create rooms collection with availability time slots structure
    - Implement buildings collection with location and room count data
    - Set up scrape_metadata collection for tracking scraper runs
    - _Requirements: 5.1, 5.2, 5.6_

  - [ ] 3.2 Insert mock data for testing and validation
    - Create sample room availability data for multiple buildings
    - Insert test building information with coordinates and room counts
    - Validate schema structure with realistic test data
    - _Requirements: 5.3, 5.4_

- [ ] 4. Build Spring Boot API foundation
  - [ ] 4.1 Set up Spring Boot project structure and dependencies
    - Create Spring Boot application with MongoDB and web dependencies
    - Configure application properties for database connection
    - Set up basic project structure with controller, service, and repository layers
    - _Requirements: 5.4, 5.5_

  - [ ] 4.2 Implement core data models and DTOs
    - Create Java classes for RoomIdentifier, TimeSlot, and RoomAvailability
    - Implement BuildingInfo and related data transfer objects
    - Add JSON serialization annotations for API responses
    - _Requirements: 5.2, 5.4_

  - [ ] 4.3 Create database service layer for MongoDB operations
    - Implement repository interfaces for rooms and buildings collections
    - Create service methods for querying room availability data
    - Add database connection error handling and logging
    - _Requirements: 5.4, 5.5_

- [ ] 5. Implement core API endpoints
  - [ ] 5.1 Build buildings endpoint for campus building data
    - Create REST endpoint to return all campus buildings with availability counts
    - Implement service logic to calculate available rooms per building
    - Add response formatting and error handling
    - _Requirements: 1.2, 1.3, 2.4_

  - [ ] 5.2 Create building rooms endpoint for room availability
    - Implement endpoint to return available rooms for a specific building
    - Add query parameters for day and time filtering
    - Include current availability status and next available time calculations
    - _Requirements: 2.1, 2.2, 2.3, 2.5_

  - [ ] 5.3 Build room schedule endpoint for detailed time information
    - Create endpoint to return full daily schedule for a specific room
    - Implement time slot generation with 30-minute increments
    - Add logic to distinguish occupied vs available time periods
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 6. Implement availability calculation logic
  - [ ] 6.1 Create real-time availability calculator
    - Write service methods to determine current room availability based on time
    - Implement logic to calculate next available time window for occupied rooms
    - Add day-of-week awareness for schedule calculations
    - _Requirements: 2.5, 3.4, 3.5_

  - [ ] 6.2 Build schedule processing utilities
    - Create methods to convert database time slots into user-friendly schedules
    - Implement time range calculations and availability window detection
    - Add validation for time slot consistency and overlap detection
    - _Requirements: 3.1, 3.2, 3.3_

- [ ] 7. Set up React frontend foundation
  - [ ] 7.1 Create React project structure and dependencies
    - Initialize React application with required dependencies for mapping and UI
    - Set up component directory structure for pages and reusable components
    - Configure build tools and development environment
    - _Requirements: 6.1, 6.6_

  - [ ] 7.2 Implement basic routing and page structure
    - Create HomePage, BuildingDetailPage, and RoomSchedulePage components
    - Set up React Router for navigation between different views
    - Add basic layout and navigation structure
    - _Requirements: 1.1, 6.1_

- [ ] 8. Build interactive campus map component
  - [ ] 8.1 Create CampusMap component with building markers
    - Implement interactive map using a mapping library (Leaflet or Google Maps)
    - Add clickable building markers with UIUC campus coordinates
    - Implement hover effects to display building names
    - _Requirements: 1.1, 1.2, 1.3, 6.2_

  - [ ] 8.2 Add building availability status indicators
    - Implement different marker styles for buildings with/without available rooms
    - Create visual indicators to show availability status at a glance
    - Add real-time updates when availability data changes
    - _Requirements: 1.4, 6.2_

- [ ] 9. Implement building and room detail components
  - [ ] 9.1 Create BuildingDetailPage for room listings
    - Build component to display available rooms when a building is selected
    - Show room numbers, current availability status, and time information
    - Add handling for buildings with no available rooms
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [ ] 9.2 Build RoomSchedulePage for detailed schedules
    - Create schedule grid component showing 30-minute time increments
    - Implement visual distinction between occupied and available time slots
    - Add current time indicator and next availability information
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 10. Add API integration and state management
  - [ ] 10.1 Implement API service layer for backend communication
    - Create service functions to call Spring Boot API endpoints
    - Add error handling for network failures and API errors
    - Implement loading states and retry mechanisms
    - _Requirements: 6.3, 6.4_

  - [ ] 10.2 Set up state management for application data
    - Implement React state management (Context API or Redux) for buildings and rooms
    - Add caching for frequently accessed data to improve performance
    - Create state update mechanisms for real-time availability changes
    - _Requirements: 6.5, 7.4_

- [ ] 11. Add responsive design and mobile optimization
  - [ ] 11.1 Implement responsive layout for different screen sizes
    - Create CSS/styled-components for mobile, tablet, and desktop layouts
    - Ensure map and room list components adapt to screen size appropriately
    - Add touch-friendly interactions for mobile devices
    - _Requirements: 6.1, 6.6_

  - [ ] 11.2 Optimize performance for mobile devices
    - Implement lazy loading for building details and room data
    - Add loading indicators and optimize API call frequency
    - Ensure touch interactions work properly on map and room selection
    - _Requirements: 6.2, 6.3, 6.6_

- [ ] 12. Implement data freshness and update indicators
  - [ ] 12.1 Add timestamp display for data freshness
    - Show last update time for room availability information
    - Display warnings when data is older than 24 hours
    - Add refresh functionality to manually update data
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [ ] 12.2 Create automatic data refresh mechanisms
    - Implement periodic data updates in the frontend
    - Add real-time availability updates when possible
    - Handle data staleness gracefully with appropriate user messaging
    - _Requirements: 7.5, 6.5_

- [ ] 13. Add comprehensive error handling and user feedback
  - [ ] 13.1 Implement frontend error handling for API failures
    - Add user-friendly error messages for network and server errors
    - Create retry mechanisms for failed API calls
    - Implement graceful degradation when services are unavailable
    - _Requirements: 6.4, 7.5_

  - [ ] 13.2 Add loading states and user feedback
    - Implement loading spinners and progress indicators
    - Add success/error notifications for user actions
    - Create informative messages for empty states (no available rooms)
    - _Requirements: 6.4, 2.4_

- [ ] 14. Create comprehensive test suite
  - [ ] 14.1 Write unit tests for scraper components
    - Test CourseExplorerScraper with mock HTML responses
    - Create tests for RoomNormalizer logic and edge cases
    - Add tests for DatabaseClient methods and error handling
    - _Requirements: 4.5, 4.6_

  - [ ] 14.2 Implement Spring Boot API tests
    - Write controller tests using MockMvc for all endpoints
    - Create service layer unit tests with mocked dependencies
    - Add integration tests for database operations
    - _Requirements: 5.4, 5.5_

  - [ ] 14.3 Build React component tests
    - Test map component rendering and user interactions
    - Create tests for room list and schedule components
    - Add integration tests for API communication
    - _Requirements: 6.2, 6.3_

- [ ] 15. Integrate scraper with complete data pipeline
  - [ ] 15.1 Connect scraper to write directly to MongoDB
    - Modify scraper to insert processed data into production database
    - Add scheduling mechanism for periodic scraper runs
    - Implement data validation and consistency checks
    - _Requirements: 4.4, 4.6, 5.6_

  - [ ] 15.2 Test end-to-end data flow from scraper to frontend
    - Verify complete pipeline: scraper → database → API → frontend
    - Test with real Course Explorer data for multiple departments
    - Validate data accuracy and availability calculations
    - _Requirements: 4.1, 4.2, 4.3, 4.4_