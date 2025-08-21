import React, { useState } from "react";
import MapTableLayout from "./components/MapTableLayout";
import Building from "./pages/Building";
import EnhancedSearchBar from "./components/EnhancedSearchBar";
import { getCurrentAdjustedDate } from "./utils/dateUtils";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import uiucLogo from "./assets/uiuc-block-i-logo.png";

// Enhanced App component with routing
function AppContent() {
  const navigate = useNavigate();

  // Handle homepage navigation from title/logo
  const handleHomeClick = () => {
    navigate("/");
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-uiuc-gray to-white">
      {/* Professional Header with UIUC Brand Identity */}
      <header className="bg-gradient-to-r from-uiuc-blue to-uiuc-navy-light text-white shadow-uiuc-lg border-b border-uiuc-blue/20">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* University Identity - Now Clickable */}
            <div
              className="flex items-center space-x-4 cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={handleHomeClick}
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-modern overflow-hidden">
                <img
                  src={uiucLogo}
                  alt="UIUC Block I Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                  UIUC Study Space Finder
                </h1>
                <p className="text-uiuc-orange/90 text-sm font-medium">
                  University of Illinois Urbana-Champaign
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/building/:buildingId" element={<Building />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// Modern, academic-inspired main page component
function MainPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showOpenOnly, setShowOpenOnly] = useState(false);
  const [selectedBuilding, _setSelectedBuilding] = useState(null);
  const [selectedDate, setSelectedDate] = useState(getCurrentAdjustedDate());
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rooms, _setRooms] = useState([]);

  const handleRefresh = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setError("");
    }, 1000);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Hero Section - Academic Tool Aesthetic */}
      <section className="text-center mb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-uiuc-blue mb-6 leading-tight">
            Find Available
            <span className="block text-uiuc-orange">Study Spaces</span>
          </h1>
          <p className="text-xl md:text-2xl text-storm-gray mb-10 leading-relaxed max-w-3xl mx-auto">
            Find open study spots on campus with ease.
          </p>

          {/* Enhanced Search Interface */}
          <div className="max-w-3xl mx-auto mb-12">
            <EnhancedSearchBar
              onBuildingSelect={(building) => {
                // Handle building selection from search
                console.log("Building selected from search:", building);
                // The MapTableLayout will handle the actual building selection
              }}
              placeholder="Search buildings"
              buttonText="Search"
            />
          </div>
        </div>
      </section>

      {/* Main Map Section - Primary Focus */}
      <section className="mb-16">
        <div className="bg-white rounded-2xl shadow-modern-lg border border-storm-gray-lighter overflow-hidden">
          <div className="bg-gradient-to-r from-uiuc-blue to-uiuc-navy-light text-white px-8 py-6">
            <h2 className="text-2xl font-bold mb-2">UIUC Campus Map</h2>
            <p className="text-uiuc-orange/90">
              Drag to explore and click on buildings for study space details
            </p>
          </div>

          <div className="p-8">
            <MapTableLayout
              rooms={rooms}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              showOpenOnly={showOpenOnly}
              setShowOpenOnly={setShowOpenOnly}
              selectedBuilding={selectedBuilding}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              loading={loading}
              error={error}
              onRefresh={handleRefresh}
              onBuildingSelect={(building) => {
                // Handle building selection from search
                console.log("Building selected:", building);
                // You can add additional logic here if needed
              }}
            />
          </div>
        </div>
      </section>

      {/* Help & Disclaimer Section */}
      <section className="mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="transform scale-110 transition-transform duration-300 bg-gradient-to-br from-storm-gray-lighter/30 to-white rounded-2xl p-8 md:p-12 border border-storm-gray-lighter shadow-modern-lg">
            <h3 className="text-2xl font-bold text-uiuc-blue mb-6 text-center">
              Important Information
            </h3>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Disclaimers */}
              <div>
                <h4 className="text-lg font-semibold text-uiuc-blue mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 text-uiuc-orange mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Disclaimers
                </h4>
                <ul className="space-y-2 text-sm text-storm-gray">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-uiuc-orange rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    Fall 2025 semester data only
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-uiuc-orange rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    Covers main campus buildings only
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-uiuc-orange rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    Room availability may not be fully accurate
                  </li>
                </ul>
              </div>

              {/* How to Use */}
              <div>
                <h4 className="text-lg font-semibold text-uiuc-blue mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 text-uiuc-orange mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  How to Use
                </h4>
                <ol className="list-decimal list-inside marker:text-uiuc-orange space-y-2 text-sm text-storm-gray pl-4">
                  <li>Click on any building on the map</li>
                  <li>Select your preferred date and time</li>
                  <li>View available study spaces</li>
                </ol>
              </div>
            </div>

            <div className="text-center pt-6 border-t border-storm-gray-lighter">
              <p className="text-sm text-storm-gray mb-2">
                Made for UIUC students by Zeeshan Khan
              </p>
              <p className="text-xs text-storm-gray-light">
                This tool does not guarantee room availability and not all
                buildings have complete information.
              </p>
              <p className="text-xs text-storm-gray-light">
                This is an independent project - not officially affiliated with
                UIUC.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
