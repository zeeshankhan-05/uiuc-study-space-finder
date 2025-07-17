// About.jsx - About page for UIUC Study Space Finder
import React from 'react';

const About = () => (
  <section>
    <h2 className="text-2xl font-bold mb-4">About This Project</h2>
    <p className="text-lg text-gray-700 mb-4">
      UIUC Study Space Finder is a portfolio project built to help students easily locate available study spaces on campus. It leverages real-time data, modern web technologies, and a clean user experience to solve a real student problem.
    </p>
    <ul className="list-disc list-inside text-gray-600 mb-4">
      <li>Full-stack: Spring Boot, React, Python, MongoDB</li>
      <li>Interactive map and smart scheduling</li>
      <li>Open source and easy to contribute</li>
    </ul>
    <p className="text-md text-gray-500">Created by Zeeshan Khan for portfolio and educational purposes.</p>
  </section>
);

export default About; 