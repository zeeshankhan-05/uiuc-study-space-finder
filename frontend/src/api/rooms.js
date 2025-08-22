/**
 * API functions for room-related operations
 * Updated to call backend server directly for Vercel deployment
 */

import { getCleanBuildingNameForAPI } from '../utils/buildingMapper';

/**
 * Helper function to build the backend URL
 */
const buildBackendUrl = ({ endpoint, building, day, time, roomNumber }) => {
  const baseUrl = 'http://54.196.82.21';
  
  if (endpoint === 'rooms' || endpoint === 'available') {
    // Use the correct backend endpoint structure: /api/buildings/{building}/rooms
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
    return Array.isArray(data) ? data : data; // Return array or object depending on endpoint
  } catch (error) {
    console.error(`Error fetching ${params.endpoint}:`, error);
    throw error;
  }
};

/**
 * Fetch all rooms in a building
 */
export const fetchRoomsForBuilding = async (buildingId, day, time) => {
  const cleanBuildingId = getCleanBuildingNameForAPI(buildingId);
  return fetchFromBackend({ endpoint: 'rooms', building: cleanBuildingId, day, time });
};

/**
 * Fetch all available rooms in a building
 */
export const fetchAvailableRooms = async (buildingId, day, time) => {
  const cleanBuildingId = getCleanBuildingNameForAPI(buildingId);
  return fetchFromBackend({ endpoint: 'available', building: cleanBuildingId, day, time });
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
  const cleanBuildingId = getCleanBuildingNameForAPI(buildingId);
  return fetchFromBackend({ endpoint: 'roomDetails', building: cleanBuildingId, roomNumber });
};
