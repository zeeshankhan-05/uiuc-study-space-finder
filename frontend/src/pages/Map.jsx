import React, { useState, useEffect, useCallback } from "react";
import MapTableLayout from "../components/MapTableLayout";
import { fetchAllBuildings } from "../api/rooms";

export default function Map() {
  // State for room table functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [showOpenOnly, setShowOpenOnly] = useState(false);

  // State for real data
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all buildings and their rooms
  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      await fetchAllBuildings(); // Verify API connection
      // For now, we'll show an empty state since the Map page doesn't have a specific building context
      // Users need to click on a building to see room details
      setRooms([]);
    } catch (err) {
      console.error("Error fetching buildings:", err);
      setError("Failed to fetch building data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return (
    <div>
      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading campus data...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchRooms}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Click on any building on the map to view room availability and study
            spaces.
          </p>
        </div>
      )}

      <MapTableLayout
        rooms={rooms}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showOpenOnly={showOpenOnly}
        setShowOpenOnly={setShowOpenOnly}
      />
    </div>
  );
}
