/**
 * API functions for room-related operations
 * Updated to use Vercel serverless proxy for HTTPS frontend
 */

import { getCleanBuildingNameForAPI } from '../utils/buildingMapper';

// Vercel serverless proxy endpoint
const API_BASE_URL = '/api/rooms';

/**
 * Fetch all rooms in a building with their availability status for a specific day and time
 * @param {string} buildingId - The building identifier
 * @param {string} day - The day of the week (e.g., "Monday", "Tuesday")
 * @param {string} time - The time in HH:mm format (e.g., "14:30")
 * @returns {Promise<Array>} Array of room status objects
 */
export const fetchRoomsForBuilding = async (buildingId, day, time) => {
  try {
    const cleanBuildingId = getCleanBuildingNameForAPI(buildingId);

    const response = await fetch(
      `${API_BASE_URL}?endpoint=rooms&building=${encodeURIComponent(cleanBuildingId)}&day=${encodeURIComponent(day)}&time=${encodeURIComponent(time)}`,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching rooms for building:', error);
    throw error;
  }
};

/**
 * Fetch all available rooms in a building for a specific day and time
 * @param {string} buildingId - The building identifier
 * @param {string} day - The day of the week
 * @param {string} time - The time in HH:mm format
 * @returns {Promise<Array>} Array of available room objects
 */
export const fetchAvailableRooms = async (buildingId, day, time) => {
  try {
    const cleanBuildingId = getCleanBuildingNameForAPI(buildingId);

    const response = await fetch(
      `${API_BASE_URL}?endpoint=available&building=${encodeURIComponent(cleanBuildingId)}&day=${encodeURIComponent(day)}&time=${encodeURIComponent(time)}`,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching available rooms:', error);
    throw error;
  }
};

/**
 * Fetch all buildings
 * @returns {Promise<Array>} Array of building names
 */
export const fetchAllBuildings = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}?endpoint=buildings`,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching buildings:', error);
    throw error;
  }
};

/**
 * Fetch details for a specific room
 * @param {string} buildingId - The building identifier
 * @param {string} roomNumber - The room number
 * @returns {Promise<Object>} Room details object
 */
export const fetchRoomDetails = async (buildingId, roomNumber) => {
  try {
    const cleanBuildingId = getCleanBuildingNameForAPI(buildingId);

    const response = await fetch(
      `${API_BASE_URL}?endpoint=roomDetails&building=${encodeURIComponent(cleanBuildingId)}&roomNumber=${encodeURIComponent(roomNumber)}`,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching room details:', error);
    throw error;
  }
};
