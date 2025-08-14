import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";
import About from "./pages/About";
import Building from "./pages/Building";
import Test from "./pages/Test";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <header className="bg-blue-900 text-white shadow-md">
          <div className="container mx-auto px-4 py-3 md:py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-center md:text-left">
              UIUC Study Space Finder
            </h1>
            <nav className="flex justify-center md:justify-end space-x-4 md:space-x-6">
              <Link to="/" className="text-sm md:text-base hover:underline">
                Home
              </Link>
              <Link to="/map" className="text-sm md:text-base hover:underline">
                Map
              </Link>
              <Link
                to="/about"
                className="text-sm md:text-base hover:underline"
              >
                About
              </Link>
              <Link to="/test" className="text-sm md:text-base hover:underline">
                Test
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/about" element={<About />} />
            <Route path="/test" element={<Test />} />
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

export default App;
