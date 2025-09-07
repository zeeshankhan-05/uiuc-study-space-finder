/**
 * API functions for room-related operations
 */

import { getCleanBuildingNameForAPI, getMultipleDatabaseBuildingNames } from '../utils/buildingMapper';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:8080';

/**
 * Fetch all rooms in a building with their availability status for a specific day and time
 * @param {string} buildingId - The building identifier
 * @param {string} day - The day of the week (e.g., "Monday", "Tuesday")
 * @param {string} time - The time in HH:mm format (e.g., "14:30")
 * @returns {Promise<Array>} Array of room status objects
 */
export const fetchRoomsForBuilding = async (buildingId, day, time) => {
  try {
    const databaseBuildingNames = getMultipleDatabaseBuildingNames(buildingId);
    let allRooms = [];

    console.log('🔍 API Request Debug - Multi-fetch initiated:', {
      originalBuildingId: buildingId,
      databaseBuildingNames: databaseBuildingNames,
      day: day,
      time: time
    });

    if (databaseBuildingNames.length === 0) {
      console.warn('🚨 No database building names found for:', buildingId);
      return [];
    }

    // Fetch data from all database entries for this building
    for (const dbName of databaseBuildingNames) {
      const encodedDbName = encodeURIComponent(dbName);
      const url = `${API_BASE_URL}/api/buildings/${encodedDbName}/rooms?day=${encodeURIComponent(day)}&time=${encodeURIComponent(time)}`;
      
      console.log('🔍 API Request Debug - Fetching for database entry:', {
        dbName: dbName,
        url: url
      });

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error(`🚨 API call failed for "${dbName}" with status: ${response.status}`);
          continue; // Continue with other database entries
        }

        const data = await response.json();
        console.log('📊 API Response Debug - Received for database entry:', {
          dbName: dbName,
          responseStatus: response.status,
          dataType: typeof data,
          isArray: Array.isArray(data),
          dataLength: Array.isArray(data) ? data.length : 'N/A',
          sampleData: Array.isArray(data) && data.length > 0 ? data[0] : data
        });

        if (Array.isArray(data)) {
          allRooms = allRooms.concat(data);
        } else {
          console.warn(`⚠️ API response for "${dbName}" was not an array:`, data);
        }
      } catch (error) {
        console.error(`❌ Error fetching data for "${dbName}":`, error);
        continue; // Continue with other database entries
      }
    }

    // Remove duplicate rooms based on room_id to ensure each room appears only once
    const uniqueRooms = Array.from(
      new Map(allRooms.map(room => [room.room_id || room.roomNumber, room])).values()
    );

    console.log('📊 API Response Debug - Combined and Unique Rooms:', {
      originalBuildingId: buildingId,
      totalRoomsFetched: allRooms.length,
      uniqueRoomsCount: uniqueRooms.length,
      sampleUniqueRoom: uniqueRooms.length > 0 ? uniqueRooms[0] : null
    });

    return uniqueRooms;
  } catch (error) {
    console.error('❌ Error fetching rooms for building:', error);
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
      `${API_BASE_URL}/api/buildings/${encodeURIComponent(cleanBuildingId)}/rooms?day=${encodeURIComponent(day)}&time=${encodeURIComponent(time)}`,
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
    const response = await fetch(`${API_BASE_URL}/api/buildings`, {
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
      `${API_BASE_URL}/api/rooms/${encodeURIComponent(cleanBuildingId)}/${encodeURIComponent(roomNumber)}`,
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

