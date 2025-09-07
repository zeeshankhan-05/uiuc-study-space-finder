import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchRoomsForBuilding } from "../api/rooms";
import RoomTable from "../components/RoomTable";
import {
  getBuildingById,
  debugBuildingMapping,
  getCleanBuildingNameForAPI,
  testBuildingMappings,
} from "../utils/buildingMapper";
import { adjustWeekendDate } from "../utils/dateUtils";

const API_BASE_URL =
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:8080";

export default function Building() {
  const { buildingId } = useParams();
  const navigate = useNavigate();

  console.log("Building component rendered with buildingId:", buildingId); // Debug log

  // Test building mappings on component mount
  React.useEffect(() => {
    testBuildingMappings();
  }, []);

  // Get building data from the new mapping system
  const buildingData = buildingId ? getBuildingById(buildingId) : null;
  console.log("Building data found:", buildingData); // Debug log

  const buildingName = buildingData
    ? buildingData.displayName
    : "Unknown Building";

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

  // Set default date and time to current CST date/time, adjusted for weekends
  const [selectedDate, setSelectedDate] = useState(
    adjustWeekendDate(getCurrentDateTime())
  );
  const [selectedTime, setSelectedTime] = useState(getCurrentTimeString());
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showOpenOnly, setShowOpenOnly] = useState(false);

  const getDayOfWeek = (date) => {
    // Ensure the date is adjusted to a weekday before getting the day name
    const adjustedDate = adjustWeekendDate(date);
    return adjustedDate.toLocaleDateString("en-US", { weekday: "long" });
  };

  const fetchRooms = useCallback(async () => {
    if (!buildingData) return;

    try {
      setLoading(true);
      setError("");
      const day = getDayOfWeek(selectedDate);

      console.log("🏢 Building Component Debug:", {
        buildingId: buildingId,
        buildingData: buildingData,
        fullName: buildingData.fullName,
        day: day,
        selectedTime: selectedTime,
      });

      // Debug building name mapping for troubleshooting
      debugBuildingMapping(buildingData.fullName);

      const data = await fetchRoomsForBuilding(
        buildingData.fullName, // Use the full name for API calls
        day,
        selectedTime
      );

      console.log("📋 Rooms Data Processing:", {
        rawData: data,
        dataType: typeof data,
        isArray: Array.isArray(data),
        length: Array.isArray(data) ? data.length : "N/A",
        firstRoom: Array.isArray(data) && data.length > 0 ? data[0] : null,
      });

      // Validate and process the data
      let processedRooms = [];

      if (Array.isArray(data)) {
        // Data is an array, use it directly
        processedRooms = data;
        console.log(
          "✅ Data is array, using directly:",
          processedRooms.length,
          "rooms"
        );
      } else if (data && typeof data === "object") {
        // Data is an object, check if it has a rooms property
        if (data.rooms && Array.isArray(data.rooms)) {
          processedRooms = data.rooms;
          console.log(
            "✅ Data has rooms property, using data.rooms:",
            processedRooms.length,
            "rooms"
          );
        } else if (data.data && Array.isArray(data.data)) {
          processedRooms = data.data;
          console.log(
            "✅ Data has data property, using data.data:",
            processedRooms.length,
            "rooms"
          );
        } else {
          console.log(
            "⚠️ Data is object but no rooms array found:",
            Object.keys(data)
          );
          processedRooms = [];
        }
      } else {
        console.log("⚠️ Unexpected data format:", typeof data, data);
        processedRooms = [];
      }

      // Validate room structure
      const validRooms = processedRooms.filter((room) => {
        const isValid =
          room &&
          (room.roomNumber || room.room || room.id) &&
          (room.status || room.availability);

        if (!isValid) {
          console.log("⚠️ Invalid room structure:", room);
        }

        return isValid;
      });

      console.log("📊 Final processed rooms:", {
        originalLength: processedRooms.length,
        validLength: validRooms.length,
        invalidCount: processedRooms.length - validRooms.length,
        sampleValidRoom: validRooms.length > 0 ? validRooms[0] : null,
        allRoomNumbers: validRooms
          .map((r) => r.roomNumber || r.room || r.id)
          .slice(0, 10),
      });

      // If we got an empty response, log additional debugging info
      if (validRooms.length === 0 && processedRooms.length === 0) {
        console.log("🚨 Empty room response - possible issues:", {
          buildingName: buildingData.fullName,
          cleanBuildingName: getCleanBuildingNameForAPI(buildingData.fullName),
          day: day,
          time: selectedTime,
          apiUrl: `${API_BASE_URL}/api/buildings/${encodeURIComponent(getCleanBuildingNameForAPI(buildingData.fullName))}/rooms?day=${encodeURIComponent(day)}&time=${encodeURIComponent(selectedTime)}`,
        });
      }

      setRooms(validRooms);
    } catch (err) {
      console.error("❌ Error fetching rooms:", err);
      setError("Failed to fetch room data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [buildingData, selectedDate, selectedTime, buildingId]);

  useEffect(() => {
    if (buildingData) {
      fetchRooms();
    }
  }, [buildingData, selectedDate, selectedTime, fetchRooms]);

  // Handle invalid building ID
  if (!buildingData) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="text-center py-16">
          <h1 className="text-4xl font-bold text-uiuc-blue mb-4">
            Building Not Found
          </h1>
          <p className="text-storm-gray text-xl mb-8">
            The building you're looking for doesn't exist or has been moved.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-uiuc-orange hover:bg-uiuc-orange-light text-white px-8 py-3 rounded-xl font-semibold transition-all hover:shadow-modern btn-modern"
          >
            Return to Map
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <button
        onClick={() => navigate("/")}
        className="mb-6 flex items-center text-uiuc-orange hover:text-uiuc-orange-light transition-all duration-300 font-medium group"
        style={{ background: "transparent", border: "none", boxShadow: "none" }}
      >
        <div className="flex items-center px-4 py-2 rounded-full group-hover:bg-uiuc-orange/10 group-hover:shadow-modern transition-all duration-300">
          <svg
            className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1"
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
          <span>Back to Map</span>
        </div>
      </button>

      {/* Building header */}
      <div className="border-b border-storm-gray-lighter pb-6 mb-8">
        <h1 className="text-4xl font-bold text-uiuc-blue mb-3">
          {buildingName}
        </h1>
        <p className="text-storm-gray text-xl">
          University of Illinois Urbana-Champaign
        </p>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-2xl shadow-modern border border-storm-gray-lighter p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-uiuc-blue mb-6">Filters</h2>
        <div className="flex flex-col md:flex-row md:items-end gap-6">
          <div className="flex-1">
            <label className="block text-storm-gray font-semibold mb-3">
              Select Date
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="border border-storm-gray-lighter rounded-xl p-3 w-full h-12 focus:outline-none focus:ring-2 focus:ring-uiuc-orange focus:border-transparent"
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
            <label className="block text-storm-gray font-semibold mb-3">
              Select Time
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="border border-storm-gray-lighter rounded-xl p-3 w-full h-12 focus:outline-none focus:ring-2 focus:ring-uiuc-orange focus:border-transparent"
            />
          </div>
          <div className="md:w-auto">
            <button
              onClick={fetchRooms}
              disabled={loading}
              className="w-full md:w-auto px-8 py-3 bg-uiuc-orange hover:bg-uiuc-orange-light text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold h-12 transition-all hover:shadow-modern btn-modern"
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>
        </div>
      </div>

      {/* Rooms Section - Full width since no map */}
      <div className="w-full">
        <div className="bg-white rounded-2xl shadow-modern border border-storm-gray-lighter p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-uiuc-blue mb-6">
            Study Spaces
          </h2>

          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-uiuc-orange"></div>
              <p className="text-uiuc-blue mt-3 font-medium">
                Loading available rooms...
              </p>
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-700 mb-3">{error}</p>
              <button
                onClick={fetchRooms}
                className="text-uiuc-orange hover:text-uiuc-orange-light font-medium underline"
              >
                Retry
              </button>
            </div>
          )}
          {!loading && !error && rooms.length === 0 && (
            <div className="text-center py-8">
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-4">
                <div className="flex items-center justify-center mb-3">
                  <svg
                    className="w-8 h-8 text-yellow-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-yellow-800">
                    No Rooms Found
                  </h3>
                </div>
                <p className="text-yellow-700 mb-4">
                  No available rooms found for <strong>{buildingName}</strong>{" "}
                  at this time.
                </p>
                <div className="text-sm text-yellow-600 space-y-2">
                  <p>• Try selecting a different date or time</p>
                  <p>• Check if the building has study spaces available</p>
                  <p>• Verify the building name is correct</p>
                </div>
              </div>
              <button
                onClick={fetchRooms}
                className="bg-uiuc-orange hover:bg-uiuc-orange-light text-white px-6 py-2 rounded-lg font-medium transition-all hover:shadow-modern"
              >
                Refresh Data
              </button>
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
