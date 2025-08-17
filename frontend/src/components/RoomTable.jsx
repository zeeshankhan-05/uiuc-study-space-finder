import React from "react";
import {
  convertTimeRangeTo12Hour,
  getOccupiedUntilDisplay,
  shouldShowOccupiedTimes,
} from "../utils/dateUtils";

export default function RoomTable({
  rooms,
  searchQuery,
  setSearchQuery,
  showOpenOnly,
  setShowOpenOnly,
  selectedTime = "12:00", // Add selectedTime prop with default
}) {
  // Sort rooms by room number in the specified order (00xx first, 10xx second, 20xx third, etc.)
  const sortRoomsByNumber = (roomList) => {
    return roomList.sort((a, b) => {
      const roomA = a.roomNumber || "";
      const roomB = b.roomNumber || "";

      // Extract the floor number (first digit) from room numbers
      const floorA = parseInt(roomA.charAt(0)) || 0;
      const floorB = parseInt(roomB.charAt(0)) || 0;

      // If floors are different, sort by floor (0 first, then 1, 2, 3, etc.)
      if (floorA !== floorB) {
        return floorA - floorB;
      }

      // If floors are the same, sort by the full room number as a string
      return roomA.localeCompare(roomB, undefined, { numeric: true });
    });
  };

  // Sort rooms first, then filter
  const sortedRooms = sortRoomsByNumber([...rooms]);

  // Filter rooms based on search query and open-only toggle
  const filteredRooms = sortedRooms.filter((room) => {
    // First filter by open-only toggle
    if (showOpenOnly && room.status !== "OPEN") {
      return false;
    }

    // Then filter by search query
    if (!searchQuery.trim()) return true;
    return room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search by room number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-storm-gray-lighter rounded-xl px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-uiuc-orange focus:border-transparent h-10"
        />
      </div>

      {/* Open rooms only toggle */}
      <div className="flex justify-center">
        <label className="flex items-center gap-2 mb-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showOpenOnly}
            onChange={(e) => setShowOpenOnly(e.target.checked)}
            className="w-4 h-4 text-uiuc-orange focus:ring-uiuc-orange focus:ring-2"
          />
          <span className="text-xs text-storm-gray">Show open rooms only</span>
        </label>
      </div>

      {/* Results count */}
      <div className="text-xs text-storm-gray text-center">
        {filteredRooms.length} of {rooms.length} rooms
        {showOpenOnly && (
          <span className="ml-1 text-uiuc-orange font-medium">
            (filtered to open rooms only)
          </span>
        )}
      </div>

      {/* Rooms table with overflow wrapper */}
      {filteredRooms.length > 0 ? (
        <div className="overflow-x-auto border border-storm-gray-lighter rounded-xl">
          <table className="w-full bg-white">
            <thead className="sticky top-0 bg-storm-gray-lighter/20 z-10">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-semibold text-uiuc-blue uppercase tracking-wider border-b border-storm-gray-lighter">
                  Room
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-uiuc-blue uppercase tracking-wider border-b border-storm-gray-lighter">
                  Status
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-uiuc-blue uppercase tracking-wider border-b border-storm-gray-lighter">
                  Occupied Until
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-uiuc-blue uppercase tracking-wider border-b border-storm-gray-lighter">
                  Occupied Times
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-storm-gray-lighter">
              {filteredRooms.map((room, idx) => (
                <tr
                  key={room.roomNumber || idx}
                  className="hover:bg-storm-gray-lighter/10 transition-colors"
                >
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="font-semibold text-sm text-uiuc-blue">
                      {room.roomNumber}
                    </span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        room.status === "OPEN"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : "bg-red-100 text-red-800 border border-red-200"
                      }`}
                    >
                      {room.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-storm-gray">
                    {getOccupiedUntilDisplay(room, selectedTime)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-storm-gray">
                    {shouldShowOccupiedTimes(room) ? (
                      <div className="space-y-1">
                        {room.occupiedRanges.map((range, rangeIdx) => (
                          <div
                            key={rangeIdx}
                            className="text-xs bg-storm-gray-lighter/30 px-2 py-1 rounded-lg border border-storm-gray-lighter"
                          >
                            {convertTimeRangeTo12Hour(range.start, range.end)}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-green-600 font-semibold text-sm">
                        Free all day
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-6 text-storm-gray">
          <p className="text-sm">
            {searchQuery.trim() ? (
              <>No rooms found matching "{searchQuery}"</>
            ) : (
              "No rooms available"
            )}
          </p>
        </div>
      )}
    </div>
  );
}
