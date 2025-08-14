import React from "react";

export default function RoomTable({
  rooms,
  searchQuery,
  setSearchQuery,
  showOpenOnly,
  setShowOpenOnly,
}) {
  // Filter rooms based on search query and open-only toggle
  const filteredRooms = rooms.filter((room) => {
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
          className="border rounded px-2 py-1 w-full md:w-1/3 text-sm"
        />
      </div>

      {/* Open rooms only toggle */}
      <div className="flex justify-center">
        <label className="flex items-center gap-2 mb-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showOpenOnly}
            onChange={(e) => setShowOpenOnly(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm text-gray-700">Show open rooms only</span>
        </label>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-600 text-center">
        {filteredRooms.length} of {rooms.length} rooms
        {showOpenOnly && (
          <span className="ml-1 text-blue-600">
            (filtered to open rooms only)
          </span>
        )}
      </div>

      {/* Rooms table */}
      {filteredRooms.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room Number
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Available Until
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Occupied Times
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRooms.map((room, idx) => (
                <tr key={room.roomNumber || idx} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="font-medium text-lg text-gray-900">
                      {room.roomNumber}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        room.status === "OPEN"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {room.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {room.availableUntil || "N/A"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {room.occupiedRanges && room.occupiedRanges.length > 0 ? (
                      <div className="space-y-1">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          {searchQuery.trim() ? (
            <p>No rooms found matching "{searchQuery}"</p>
          ) : (
            <p>No rooms available</p>
          )}
        </div>
      )}
    </div>
  );
}
