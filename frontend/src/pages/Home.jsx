import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <section className="text-center">
    <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to UIUC Study Space Finder</h1>
    <p className="text-lg text-gray-700 mb-6">
      Discover available study spaces across the UIUC campus in real-time.
      Use the interactive map to find open classrooms, libraries, and more.
    </p>
    <div className="space-x-4">
      <Link to="/map" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Go to Map</Link>
      <Link to="/about" className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition">Learn More</Link>
    </div>
  </section>
);

export default Home;
