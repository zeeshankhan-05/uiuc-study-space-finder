import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <section className="text-center px-4">
    <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
      Welcome to UIUC Study Space Finder
    </h1>
    <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
      Discover available study spaces across the UIUC campus in real-time. Use
      the interactive map to find open classrooms, libraries, and more.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        to="/map"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-base md:text-lg font-medium"
      >
        Go to Map
      </Link>
      <Link
        to="/about"
        className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors text-base md:text-lg font-medium"
      >
        Learn More
      </Link>
    </div>
  </section>
);

export default Home;
