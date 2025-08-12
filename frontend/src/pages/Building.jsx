import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchRoomsForBuilding } from "../api/rooms";

export default function Building() {
  const { buildingId } = useParams();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatBuildingName = (id) => {
    if (!id) return "Unknown Building";
    return id
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getBuildingDescription = () => {
    return "This building is part of the University of Illinois Urbana-Champaign campus.";
  };

  const getDayOfWeek = (date) => {
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const day = getDayOfWeek(selectedDate);
      const data = await fetchRoomsForBuilding(buildingId, day, selectedTime);
      setRooms(data || []);
    } catch (err) {
      console.error("Error fetching rooms:", err);
      setError("Failed to fetch room data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [buildingId, selectedDate, selectedTime]);

  useEffect(() => {
    if (buildingId) {
      fetchRooms();
    }
  }, [buildingId, fetchRooms]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
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
            {formatBuildingName(buildingId)}
          </h1>
          <p className="text-gray-600 text-lg">
            University of Illinois Urbana-Champaign
          </p>
        </div>

        {/* Building info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed">
              {getBuildingDescription()}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Details
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Building ID:</span>
                <span className="text-gray-900">{buildingId}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Campus:</span>
                <span className="text-gray-900">Urbana-Champaign</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">University:</span>
                <span className="text-gray-900">University of Illinois</span>
              </div>
            </div>
          </div>
        </div>

        {/* Date and time selectors */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Select Date
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="border rounded p-2 w-full"
              dateFormat="MMMM d, yyyy"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Select Time
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
        </div>

        {/* Study space availability */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Study Spaces
          </h3>

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
            <ul className="space-y-3">
              {rooms.map((room, idx) => (
                <li
                  key={room.roomNumber || idx}
                  className="p-4 bg-white rounded shadow flex justify-between items-center"
                >
                  <div className="flex-1">
                    <span className="font-medium text-lg">
                      {room.roomNumber}
                    </span>
                    <div className="flex items-center mt-1">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          room.status === "OPEN"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {room.status}
                      </span>
                      {room.availableUntil && (
                        <span className="ml-2 text-sm text-gray-600">
                          Available until {room.availableUntil}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    {room.occupiedRanges && room.occupiedRanges.length > 0 ? (
                      <div>
                        <div className="font-medium">Occupied:</div>
                        {room.occupiedRanges.map((range, rangeIdx) => (
                          <div key={rangeIdx} className="text-xs">
                            {range.start} - {range.end}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-green-600 font-medium">
                        Free all day
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
