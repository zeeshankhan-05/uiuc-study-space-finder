import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchRoomsForBuilding, fetchAllBuildings } from "../api/rooms";

export default function Test() {
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedTime, setSelectedTime] = useState("14:30");
  const [selectedDate, setSelectedDate] = useState(new Date("2025-08-25"));
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBuildings = async () => {
      try {
        const data = await fetchAllBuildings();
        setBuildings(data);
      } catch (err) {
        console.error("Error loading buildings:", err);
      }
    };
    loadBuildings();
  }, []);

  // Update selected day when date changes
  useEffect(() => {
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = dayNames[selectedDate.getDay()];
    if (day !== selectedDay && day !== "Sunday" && day !== "Saturday") {
      setSelectedDay(day);
    }
  }, [selectedDate, selectedDay]);

  const testRoomFetch = async () => {
    if (!selectedBuilding) return;

    try {
      setLoading(true);
      setError("");
      const data = await fetchRoomsForBuilding(
        selectedBuilding,
        selectedDay,
        selectedTime
      );
      setRooms(data || []);
    } catch (err) {
      console.error("Error fetching rooms:", err);
      setError("Failed to fetch room data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">API Test Page</h1>

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Note:</span> Only Fall 2025 semester
          dates (Aug 25 - Dec 10) and weekdays (Monday-Friday) are available.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Test Parameters</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Building:
              </label>
              <select
                value={selectedBuilding}
                onChange={(e) => setSelectedBuilding(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="">Select a building</option>
                {buildings.slice(0, 20).map((building) => (
                  <option key={building} value={building}>
                    {building}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date:</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="w-full border rounded p-2"
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
            <div>
              <label className="block text-sm font-medium mb-1">Day:</label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Time:</label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>

            <button
              onClick={testRoomFetch}
              disabled={!selectedBuilding || loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Test API"}
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Results</h2>

          {error && <div className="text-red-600 mb-4">{error}</div>}

          {loading && <div className="text-blue-600">Loading...</div>}

          {!loading && !error && rooms.length > 0 && (
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Found {rooms.length} rooms in {selectedBuilding}
              </p>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {rooms.slice(0, 10).map((room, idx) => (
                  <div key={idx} className="p-3 border rounded">
                    <div className="font-medium">{room.roomNumber}</div>
                    <div
                      className={`text-sm ${
                        room.status === "OPEN"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      Status: {room.status}
                    </div>
                    {room.availableUntil && (
                      <div className="text-xs text-gray-600">
                        Available until: {room.availableUntil}
                      </div>
                    )}
                  </div>
                ))}
                {rooms.length > 10 && (
                  <div className="text-sm text-gray-500">
                    ... and {rooms.length - 10} more rooms
                  </div>
                )}
              </div>
            </div>
          )}

          {!loading && !error && rooms.length === 0 && selectedBuilding && (
            <div className="text-gray-600">
              No rooms found for the selected parameters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
