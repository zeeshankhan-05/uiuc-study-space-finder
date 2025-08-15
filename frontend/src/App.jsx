import React from "react";
import Map from "./pages/Map";
import Building from "./pages/Building";
import About from "./pages/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <header className="bg-blue-900 text-white shadow-md">
          <div className="container mx-auto px-4 py-3 md:py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                UIUC Study Space Finder
              </h1>
              <nav className="flex space-x-4">
                <a
                  href="/"
                  className="text-white hover:text-blue-200 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                >
                  Map
                </a>
                <a
                  href="/about"
                  className="text-white hover:text-blue-200 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/building/:buildingId" element={<Building />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Main page component that only shows the map
function MainPage() {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      {/* Map Section - Main Focus */}
      <Map />
    </div>
  );
}

export default App;
