/**
 * API functions for room-related operations
 */

import { getCleanBuildingNameForAPI } from '../utils/buildingMapper';

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Fetch all rooms in a building with their availability status for a specific day and time
 * @param {string} buildingId - The building identifier
 * @param {string} day - The day of the week (e.g., "Monday", "Tuesday")
 * @param {string} time - The time in HH:mm format (e.g., "14:30")
 * @returns {Promise<Array>} Array of room status objects
 */
export const fetchRoomsForBuilding = async (buildingId, day, time) => {
  try {
    // Clean the building name to handle duplicates
    const cleanBuildingId = getCleanBuildingNameForAPI(buildingId);
    
    const response = await fetch(
      `${API_BASE_URL}/buildings/${encodeURIComponent(cleanBuildingId)}/rooms?day=${encodeURIComponent(day)}&time=${encodeURIComponent(time)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching rooms for building:', error);
    throw error;
  }
};

/**
 * Fetch all available rooms in a building for a specific day and time
 * @param {string} buildingId - The building identifier
 * @param {string} day - The day of the week (e.g., "Monday", "Tuesday")
 * @param {string} time - The time in HH:mm format (e.g., "14:30")
 * @returns {Promise<Array>} Array of available room objects
 */
export const fetchAvailableRooms = async (buildingId, day, time) => {
  try {
    // Clean the building name to handle duplicates
    const cleanBuildingId = getCleanBuildingNameForAPI(buildingId);
    
    const response = await fetch(
      `${API_BASE_URL}/rooms?building=${encodeURIComponent(cleanBuildingId)}&day=${encodeURIComponent(day)}&time=${encodeURIComponent(time)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
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
    const response = await fetch(`${API_BASE_URL}/buildings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
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
    // Clean the building name to handle duplicates
    const cleanBuildingId = getCleanBuildingNameForAPI(buildingId);
    
    const response = await fetch(
      `${API_BASE_URL}/rooms/${encodeURIComponent(cleanBuildingId)}/${encodeURIComponent(roomNumber)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching room details:', error);
    throw error;
  }
};

