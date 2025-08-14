import React from "react";
import Map from "./pages/Map";
import Building from "./pages/Building";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <header className="bg-blue-900 text-white shadow-md">
          <div className="container mx-auto px-4 py-3 md:py-4">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-center">
              UIUC Study Space Finder
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/building/:buildingId" element={<Building />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-200 text-center py-3 md:py-4 text-xs md:text-sm text-gray-600">
          &copy; {new Date().getFullYear()} UIUC Study Space Finder. Built for
          portfolio use.
        </footer>
      </div>
    </Router>
  );
}

// Main page component that combines map with home and about information
function MainPage() {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      {/* Map Section - Main Focus */}
      <Map />

      {/* Home and About Information Section */}
      <section className="mt-12 md:mt-16 bg-white rounded-lg shadow-md p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
              Welcome to UIUC Study Space Finder
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Discover available study spaces across the UIUC campus in
              real-time. Use the interactive map above to find open classrooms,
              libraries, and more. Click on any building to view detailed room
              availability and scheduling information.
            </p>
          </div>

          {/* About Section */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              About This Project
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              UIUC Study Space Finder is a portfolio project built to help
              students easily locate available study spaces on campus. It
              leverages real-time data, modern web technologies, and a clean
              user experience to solve a real student problem.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Features
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Interactive campus map with building selection</li>
                  <li>Real-time room availability status</li>
                  <li>Time-based filtering and scheduling</li>
                  <li>Responsive design for all devices</li>
                  <li>Search and filter functionality</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Technology Stack
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>
                    <strong>Frontend:</strong> React, Tailwind CSS
                  </li>
                  <li>
                    <strong>Backend:</strong> Spring Boot, Java
                  </li>
                  <li>
                    <strong>Database:</strong> MongoDB
                  </li>
                  <li>
                    <strong>Data Scraping:</strong> Python
                  </li>
                  <li>
                    <strong>Deployment:</strong> Ready for production
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 md:p-6">
              <p className="text-sm md:text-base text-blue-800">
                <strong>Note:</strong> This is an open-source project created by
                Zeeshan Khan for portfolio and educational purposes. The
                application uses real course scheduling data from the UIUC
                course catalog to provide accurate room availability
                information.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
