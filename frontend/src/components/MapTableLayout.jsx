import React from "react";
import CampusMap from "./CampusMap";
import RoomTable from "./RoomTable";

export default function MapTableLayout({
  rooms = [],
  searchQuery = "",
  setSearchQuery,
  showOpenOnly = false,
  setShowOpenOnly,
}) {
  return (
    <div className="w-full">
      {/* Responsive layout container */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Map Section - Full width on mobile, half width on desktop */}
        <div className="w-full lg:w-1/2">
          <div className="mb-4 lg:mb-0">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Campus Map
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Click on any building to view details and study space information.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <CampusMap />
          </div>
        </div>

        {/* Table Section - Full width on mobile, half width on desktop */}
        <div className="w-full lg:w-1/2">
          <div className="mb-4 lg:mb-0">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Study Spaces
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              View available study spaces and filter by availability.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <RoomTable
              rooms={rooms}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              showOpenOnly={showOpenOnly}
              setShowOpenOnly={setShowOpenOnly}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
