import React, { useState } from "react";
import MapTableLayout from "../components/MapTableLayout";

export default function Map() {
  // State for room table functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [showOpenOnly, setShowOpenOnly] = useState(false);

  // Mock rooms data for demonstration - in a real app this would come from an API
  const mockRooms = [
    {
      roomNumber: "101",
      status: "OPEN",
      availableUntil: "5:00 PM",
      occupiedRanges: [],
    },
    {
      roomNumber: "102",
      status: "OCCUPIED",
      availableUntil: "3:00 PM",
      occupiedRanges: [
        { start: "9:00 AM", end: "11:00 AM" },
        { start: "2:00 PM", end: "3:00 PM" },
      ],
    },
    {
      roomNumber: "201",
      status: "OPEN",
      availableUntil: "6:00 PM",
      occupiedRanges: [],
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Campus Map & Study Spaces
        </h1>
        <p className="text-gray-600">
          Explore the interactive campus map and find available study spaces in
          real-time.
        </p>
      </div>

      <MapTableLayout
        rooms={mockRooms}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showOpenOnly={showOpenOnly}
        setShowOpenOnly={setShowOpenOnly}
      />
    </div>
  );
}
