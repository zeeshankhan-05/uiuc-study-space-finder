import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchRoomsForBuilding } from "../api/rooms";
import RoomTable from "../components/RoomTable";

export default function Building() {
  const { buildingId } = useParams();
  const navigate = useNavigate();

  // Decode the building ID from URL
  const decodedBuildingId = buildingId ? decodeURIComponent(buildingId) : "";

  // Get current date and time in CST
  const getCurrentDateTime = () => {
    const now = new Date();
    // Convert to CST (Central Standard Time)
    const cstTime = new Date(
      now.toLocaleString("en-US", { timeZone: "America/Chicago" })
    );
    return cstTime;
  };

  const getCurrentTimeString = () => {
    const now = new Date();
    // Get current time in CST and format as HH:mm
    const cstTime = new Date(
      now.toLocaleString("en-US", { timeZone: "America/Chicago" })
    );
    return cstTime.toTimeString().slice(0, 5); // Get HH:mm format
  };

  // Set default date and time to current CST date/time
  const [selectedDate, setSelectedDate] = useState(getCurrentDateTime());
  const [selectedTime, setSelectedTime] = useState(getCurrentTimeString());
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showOpenOnly, setShowOpenOnly] = useState(false);

  const formatBuildingName = (id) => {
    if (!id) return "Unknown Building";
    return id
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getDayOfWeek = (date) => {
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const day = getDayOfWeek(selectedDate);
      const data = await fetchRoomsForBuilding(
        decodedBuildingId,
        day,
        selectedTime
      );
      setRooms(data || []);
    } catch (err) {
      console.error("Error fetching rooms:", err);
      setError("Failed to fetch room data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [decodedBuildingId, selectedDate, selectedTime]);

  useEffect(() => {
    if (decodedBuildingId) {
      fetchRooms();
    }
  }, [decodedBuildingId, selectedDate, selectedTime, fetchRooms]);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Map
      </button>

      {/* Building header */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {formatBuildingName(decodedBuildingId)}
        </h1>
        <p className="text-gray-600 text-lg">
          University of Illinois Urbana-Champaign
        </p>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg border shadow-sm p-4 md:p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-2">
              Select Date
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="border rounded-lg p-3 w-full h-11 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              dateFormat="MMMM d, yyyy"
              minDate={new Date("2025-08-25")}
              maxDate={new Date("2025-12-10")}
              filterDate={(date) => {
                const day = date.getDay();
                // Only allow Monday (1) through Friday (5)
                return day >= 1 && day <= 5;
              }}
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-2">
              Select Time
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="border rounded-lg p-3 w-full h-11 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="md:w-auto">
            <button
              onClick={fetchRooms}
              disabled={loading}
              className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium h-11 transition-colors"
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>
        </div>
      </div>

      {/* Rooms Section - Full width since no map */}
      <div className="w-full">
        <div className="bg-white rounded-lg border shadow-sm p-4 md:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Study Spaces
          </h2>

          {loading && (
            <p className="text-blue-800">Loading available rooms...</p>
          )}
          {error && (
            <p className="text-red-600">
              {error}{" "}
              <button
                onClick={fetchRooms}
                className="underline text-blue-600 hover:text-blue-800"
              >
                Retry
              </button>
            </p>
          )}
          {!loading && !error && rooms.length === 0 && (
            <p className="text-blue-800">
              No available rooms at this time. Try another date or time.
            </p>
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
        </div>
      </div>
    </div>
  );
}
