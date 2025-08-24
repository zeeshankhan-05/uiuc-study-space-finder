// ✅ Debug: Log the API base URL to verify it's coming from the correct environment
console.log("API base URL:", import.meta.env.VITE_REACT_APP_API_URL);

/**
 * Helper function to build the backend URL
 */
const buildBackendUrl = ({ endpoint, building, day, time, roomNumber }) => {
  // Use the environment variable for the base URL
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;

  if (endpoint === 'rooms' || endpoint === 'available') {
    return `${baseUrl}/api/buildings/${encodeURIComponent(building)}/rooms?day=${encodeURIComponent(day)}&time=${encodeURIComponent(time)}`;
  } else if (endpoint === 'buildings') {
    return `${baseUrl}/api/buildings`;
  } else if (endpoint === 'roomDetails') {
    return `${baseUrl}/api/rooms/${encodeURIComponent(building)}/${encodeURIComponent(roomNumber)}`;
  } else {
    throw new Error('Invalid endpoint');
  }
};

/**
 * Fetch helper
 */
const fetchFromBackend = async (params) => {
  try {
    const url = buildBackendUrl(params);
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed ${params.endpoint}:`, await response.text());
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : data;
  } catch (error) {
    console.error(`Error fetching ${params.endpoint}:`, error);
    throw error;
  }
};

/**
 * Fetch all rooms in a building
 */
export const fetchRoomsForBuilding = async (buildingId, day, time) => {
  // Use buildingId directly since it's already the correct slug format
  return fetchFromBackend({ endpoint: 'rooms', building: buildingId, day, time });
};

/**
 * Fetch all available rooms in a building
 */
export const fetchAvailableRooms = async (buildingId, day, time) => {
  // Use buildingId directly since it's already the correct slug format
  return fetchFromBackend({ endpoint: 'available', building: buildingId, day, time });
};

/**
 * Fetch all buildings
 */
export const fetchAllBuildings = async () => {
  return fetchFromBackend({ endpoint: 'buildings' });
};

/**
 * Fetch details for a specific room
 */
export const fetchRoomDetails = async (buildingId, roomNumber) => {
  // Use buildingId directly since it's already the correct slug format
  return fetchFromBackend({ endpoint: 'roomDetails', building: buildingId, roomNumber });
};
