import React from "react";
import CampusMap from "../components/CampusMap";

export default function Map() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Campus Map</h1>
        <p className="text-gray-600">
          Click on any building to view details and study space information.
        </p>
      </div>

      <CampusMap />
    </div>
  );
}
