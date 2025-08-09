import React from "react";
import CampusMap from "../components/CampusMap";

export default function Map({ selectedBuilding, setSelectedBuilding }) {
  return (
    <div>
      {!selectedBuilding ? (
        <CampusMap onBuildingClick={setSelectedBuilding} />
      ) : (
        <div>
          <button
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setSelectedBuilding(null)}
          >
            ← Back to Map
          </button>
          <h2 className="text-2xl font-semibold mb-2">
            {selectedBuilding} Details
          </h2>
          {/* TODO: Render building room availability here */}
          <p>Show room availability and info for {selectedBuilding} here.</p>
        </div>
      )}
    </div>
  );
}
