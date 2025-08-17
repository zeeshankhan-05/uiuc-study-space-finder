/**
 * Test cases and examples for the new room availability logic
 * This file demonstrates how the improved display logic works
 */

import {
  getOccupiedUntilDisplay,
  shouldShowOccupiedTimes,
  isRoomCurrentlyOccupied,
  getCurrentClassEndTime
} from './dateUtils';

// Example room data structures for testing
const testRooms = {
  // Room currently open with next class in 2 hours
  openRoomWithNextClass: {
    roomNumber: "1035",
    status: "OPEN",
    occupiedRanges: [
      { start: "14:00", end: "15:50" }, // 2:00 PM - 3:50 PM
      { start: "17:00", end: "18:50" }  // 5:00 PM - 6:50 PM
    ]
  },

  // Room currently occupied with class ending in 30 minutes
  occupiedRoomWithCurrentClass: {
    roomNumber: "0036",
    status: "OCCUPIED",
    occupiedRanges: [
      { start: "10:00", end: "11:30" }, // 10:00 AM - 11:30 AM (current)
      { start: "13:00", end: "14:50" }, // 1:00 PM - 2:50 PM
      { start: "16:00", end: "17:50" }  // 4:00 PM - 5:50 PM
    ]
  },

  // Room free entire day with no scheduled classes
  freeAllDayRoom: {
    roomNumber: "0035",
    status: "OPEN",
    occupiedRanges: []
  },

  // Room with back-to-back classes throughout the day
  backToBackClassesRoom: {
    roomNumber: "2018",
    status: "OCCUPIED",
    occupiedRanges: [
      { start: "08:00", end: "09:50" }, // 8:00 AM - 9:50 AM
      { start: "10:00", end: "11:50" }, // 10:00 AM - 11:50 AM
      { start: "12:00", end: "13:50" }, // 12:00 PM - 1:50 PM
      { start: "14:00", end: "15:50" }, // 2:00 PM - 3:50 PM
      { start: "16:00", end: "17:50" }  // 4:00 PM - 5:50 PM
    ]
  },

  // Room with only morning classes
  morningOnlyRoom: {
    roomNumber: "0018",
    status: "OPEN",
    occupiedRanges: [
      { start: "08:00", end: "09:50" }, // 8:00 AM - 9:50 AM
      { start: "10:00", end: "11:50" }  // 10:00 AM - 11:50 AM
    ]
  },

  // Room with only evening classes
  eveningOnlyRoom: {
    roomNumber: "1038",
    status: "OPEN",
    occupiedRanges: [
      { start: "16:00", end: "17:50" }, // 4:00 PM - 5:50 PM
      { start: "18:00", end: "19:50" }  // 6:00 PM - 7:50 PM
    ]
  }
};

// Test scenarios
export const testScenarios = {
  // Test 1: Room currently open with next class in 2 hours
  testOpenRoomWithNextClass: () => {
    const room = testRooms.openRoomWithNextClass;
    const currentTime = "12:00"; // 12:00 PM
    
    console.log("=== Test 1: Open Room with Next Class ===");
    console.log("Room:", room.roomNumber);
    console.log("Status:", room.status);
    console.log("Current Time:", currentTime);
    console.log("Occupied Until:", getOccupiedUntilDisplay(room, currentTime));
    console.log("Should Show Occupied Times:", shouldShowOccupiedTimes(room));
    console.log("Is Currently Occupied:", isRoomCurrentlyOccupied(room, currentTime));
    console.log("Expected: Occupied Until: 2:00 PM (next class start)");
    console.log("---");
  },

  // Test 2: Room currently occupied with class ending in 30 minutes
  testOccupiedRoomWithCurrentClass: () => {
    const room = testRooms.occupiedRoomWithCurrentClass;
    const currentTime = "11:00"; // 11:00 AM (during 10:00-11:30 class)
    
    console.log("=== Test 2: Occupied Room with Current Class ===");
    console.log("Room:", room.roomNumber);
    console.log("Status:", room.status);
    console.log("Current Time:", currentTime);
    console.log("Occupied Until:", getOccupiedUntilDisplay(room, currentTime));
    console.log("Current Class End Time:", getCurrentClassEndTime(room, currentTime));
    console.log("Should Show Occupied Times:", shouldShowOccupiedTimes(room));
    console.log("Is Currently Occupied:", isRoomCurrentlyOccupied(room, currentTime));
    console.log("Expected: Occupied Until: 11:30 AM (current class end)");
    console.log("---");
  },

  // Test 3: Room free all day
  testFreeAllDayRoom: () => {
    const room = testRooms.freeAllDayRoom;
    const currentTime = "12:00"; // 12:00 PM
    
    console.log("=== Test 3: Free All Day Room ===");
    console.log("Room:", room.roomNumber);
    console.log("Status:", room.status);
    console.log("Current Time:", currentTime);
    console.log("Occupied Until:", getOccupiedUntilDisplay(room, currentTime));
    console.log("Should Show Occupied Times:", shouldShowOccupiedTimes(room));
    console.log("Is Currently Occupied:", isRoomCurrentlyOccupied(room, currentTime));
    console.log("Expected: Occupied Until: Free all day");
    console.log("---");
  },

  // Test 4: Room with back-to-back classes
  testBackToBackClassesRoom: () => {
    const room = testRooms.backToBackClassesRoom;
    const currentTime = "09:00"; // 9:00 AM (during 8:00-9:50 class)
    
    console.log("=== Test 4: Back-to-Back Classes Room ===");
    console.log("Room:", room.roomNumber);
    console.log("Status:", room.status);
    console.log("Current Time:", currentTime);
    console.log("Occupied Until:", getOccupiedUntilDisplay(room, currentTime));
    console.log("Current Class End Time:", getCurrentClassEndTime(room, currentTime));
    console.log("Should Show Occupied Times:", shouldShowOccupiedTimes(room));
    console.log("Is Currently Occupied:", isRoomCurrentlyOccupied(room, currentTime));
    console.log("Expected: Occupied Until: 9:50 AM (current class end)");
    console.log("---");
  },

  // Test 5: Room with only morning classes (currently open)
  testMorningOnlyRoom: () => {
    const room = testRooms.morningOnlyRoom;
    const currentTime = "14:00"; // 2:00 PM (after morning classes)
    
    console.log("=== Test 5: Morning Only Room (Currently Open) ===");
    console.log("Room:", room.roomNumber);
    console.log("Status:", room.status);
    console.log("Current Time:", currentTime);
    console.log("Occupied Until:", getOccupiedUntilDisplay(room, currentTime));
    console.log("Should Show Occupied Times:", shouldShowOccupiedTimes(room));
    console.log("Is Currently Occupied:", isRoomCurrentlyOccupied(room, currentTime));
    console.log("Expected: Occupied Until: Free for rest of day");
    console.log("---");
  },

  // Test 6: Room with only evening classes (currently open)
  testEveningOnlyRoom: () => {
    const room = testRooms.eveningOnlyRoom;
    const currentTime = "12:00"; // 12:00 PM (before evening classes)
    
    console.log("=== Test 6: Evening Only Room (Currently Open) ===");
    console.log("Room:", room.roomNumber);
    console.log("Status:", room.status);
    console.log("Current Time:", currentTime);
    console.log("Occupied Until:", getOccupiedUntilDisplay(room, currentTime));
    console.log("Should Show Occupied Times:", shouldShowOccupiedTimes(room));
    console.log("Is Currently Occupied:", isRoomCurrentlyOccupied(room, currentTime));
    console.log("Expected: Occupied Until: 4:00 PM (next class start)");
    console.log("---");
  }
};

// Run all tests
export const runAllTests = () => {
  console.log("🧪 Running Room Availability Logic Tests");
  console.log("========================================");
  
  testScenarios.testOpenRoomWithNextClass();
  testScenarios.testOccupiedRoomWithCurrentClass();
  testScenarios.testFreeAllDayRoom();
  testScenarios.testBackToBackClassesRoom();
  testScenarios.testMorningOnlyRoom();
  testScenarios.testEveningOnlyRoom();
  
  console.log("✅ All tests completed!");
  console.log("\n📋 Summary of Expected Behavior:");
  console.log("- OPEN rooms show when next class starts");
  console.log("- OCCUPIED rooms show when current class ends");
  console.log("- Rooms with no classes show 'Free all day'");
  console.log("- All rooms with classes show occupied times");
  console.log("- Only truly free rooms hide occupied times");
};

// Export test data for use in other components
export { testRooms };
