import React from "react";
import RoomTable from "./RoomTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getBuildingByPath } from "../utils/buildingMapper";

export default function BuildingModal({
  selectedBuilding,
  rooms = [],
  searchQuery = "",
  setSearchQuery,
  showOpenOnly = false,
  setShowOpenOnly,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  loading = false,
  error = "",
  onRefresh,
  onClose,
}) {
  // Get building data from the new mapping system
  const buildingData = selectedBuilding
    ? getBuildingByPath(selectedBuilding)
    : null;
  const buildingName = buildingData
    ? buildingData.displayName
    : "Unknown Building";

  if (!selectedBuilding) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-storm-gray-lighter max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-uiuc-orange text-white px-6 py-4 rounded-t-2xl flex justify-between items-center sticky top-0">
          <div>
            <h3 className="text-xl font-semibold">{buildingName}</h3>
            <p className="text-sm text-white/90 mt-1">
              Study Space Availability
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Filters Section */}
          <div className="bg-storm-gray-lighter/20 rounded-xl p-4 mb-6 border border-storm-gray-lighter">
            <h3 className="text-sm font-medium text-uiuc-blue mb-3">
              Search Filters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-storm-gray mb-1">
                  Date
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="border border-storm-gray-lighter rounded-xl px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-uiuc-orange focus:border-transparent"
                  dateFormat="MMM d"
                  minDate={new Date("2025-08-25")}
                  maxDate={new Date("2025-12-10")}
                  filterDate={(date) => {
                    const day = date.getDay();
                    return day >= 1 && day <= 5;
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-storm-gray mb-1">
                  Time
                </label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="border border-storm-gray-lighter rounded-xl px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-uiuc-orange focus:border-transparent"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={onRefresh}
                  disabled={loading}
                  className="w-full px-4 py-2 bg-uiuc-orange hover:bg-uiuc-orange-light text-white rounded-xl hover:shadow-modern disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-all"
                >
                  {loading ? "Loading..." : "Refresh"}
                </button>
              </div>
            </div>
          </div>

          {/* Room Data Display */}
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-uiuc-orange"></div>
              <p className="text-storm-gray mt-2 text-sm">
                Loading room data...
              </p>
            </div>
          )}

          {error && (
            <div className="text-center py-6">
              <p className="text-red-600 mb-3 text-sm">{error}</p>
              <button
                onClick={onRefresh}
                className="px-4 py-2 bg-uiuc-orange text-white rounded-xl hover:bg-uiuc-orange-light text-sm transition-all"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && rooms.length === 0 && (
            <div className="text-center py-8">
              <div className="text-storm-gray-light mb-4">
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
              <p className="text-storm-gray text-sm">
                No open rooms available at this time. Try another date or time.
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
              selectedTime={selectedTime}
            />
          )}
        </div>
      </div>
    </div>
  );
}
