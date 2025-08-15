import React from "react";
import CampusMap from "./CampusMap";
import RoomTable from "./RoomTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MapTableLayout({
  rooms = [],
  searchQuery = "",
  setSearchQuery,
  showOpenOnly = false,
  setShowOpenOnly,
  selectedBuilding = null,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  loading = false,
  error = "",
  onRefresh,
}) {
  const formatBuildingName = (id) => {
    if (!id) return "Unknown Building";
    return id
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="mx-auto max-w-7xl p-3 md:p-4 lg:p-6">
      {/* Responsive grid layout container */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:[grid-template-columns:2fr_3fr]">
        {/* LEFT: MAP SECTION */}
        <section className="rounded-2xl border border-gray-200 p-3 md:p-4 shadow-sm bg-white">
          <h2 className="text-lg font-semibold mb-3 md:mb-4">Campus Map</h2>
          <p className="text-sm text-gray-600 mb-4">
            Click on any building to view details and study space information.
          </p>
          <div className="relative w-full">
            <CampusMap />
          </div>
        </section>

        {/* RIGHT: DETAILS / ROOMS SECTION */}
        <aside className="rounded-2xl border border-gray-200 p-3 md:p-4 shadow-sm bg-white">
          <header className="mb-3 md:mb-4">
            <h2 className="text-lg font-semibold">
              {selectedBuilding
                ? formatBuildingName(selectedBuilding)
                : "Building Details & Rooms"}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              {selectedBuilding
                ? "View available study spaces and filter by availability."
                : "Select a building on the map to view room availability."}
            </p>
          </header>

          {/* Show filters and room data only when a building is selected */}
          {selectedBuilding ? (
            <>
              {/* Filters Section */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Filters
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      className="border rounded px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      dateFormat="MMM d"
                      minDate={new Date("2025-08-25")}
                      maxDate={new Date("2025-12-10")}
                      filterDate={(date) => {
                        const day = date.getDay();
                        return day >= 1 && day <= 5;
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="border rounded px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="sm:w-auto">
                    <button
                      onClick={onRefresh}
                      disabled={loading}
                      className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
                    >
                      {loading ? "Loading..." : "Refresh"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Room Data Display */}
              {loading && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="text-gray-600 mt-2">Loading room data...</p>
                </div>
              )}

              {error && (
                <div className="text-center py-6">
                  <p className="text-red-600 mb-3">{error}</p>
                  <button
                    onClick={onRefresh}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  >
                    Retry
                  </button>
                </div>
              )}

              {!loading && !error && rooms.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm">
                    No open rooms available at this time. Try another date or
                    time.
                  </p>
                </div>
              )}

              {!loading && !error && rooms.length > 0 && (
                <RoomTable
                  rooms={rooms}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  showOpenOnly={showOpenOnly}
                  setShowOpenOnly={setShowOpenOnly}
                />
              )}
            </>
          ) : (
            /* No building selected state */
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-sm">
                Click on a building on the map to view room availability and
                study spaces.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
