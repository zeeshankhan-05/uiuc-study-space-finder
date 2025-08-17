/**
 * Date utility functions for the UIUC Study Space Finder
 * Handles weekend date adjustments and other date-related operations
 */

/**
 * Adjusts a date to the nearest valid weekday if it falls on a weekend
 * Saturdays are adjusted to Friday, Sundays are adjusted to Monday
 * 
 * @param {Date} date - The date to check and potentially adjust
 * @returns {Date} - The adjusted date (same date if it's already a weekday)
 */
export function adjustWeekendDate(date) {
  const dayOfWeek = date.getDay();
  
  // 0 = Sunday, 6 = Saturday
  if (dayOfWeek === 0) {
    // Sunday - adjust to Monday
    const monday = new Date(date);
    monday.setDate(date.getDate() + 1);
    return monday;
  } else if (dayOfWeek === 6) {
    // Saturday - adjust to Friday
    const friday = new Date(date);
    friday.setDate(date.getDate() - 1);
    return friday;
  }
  
  // Already a weekday, return the same date
  return date;
}

/**
 * Gets the current date adjusted for weekends
 * @returns {Date} - Current date adjusted to nearest weekday if needed
 */
export function getCurrentAdjustedDate() {
  const currentDate = new Date();
  return adjustWeekendDate(currentDate);
}

/**
 * Checks if a date falls on a weekend
 * @param {Date} date - The date to check
 * @returns {boolean} - True if the date is a weekend, false otherwise
 */
export function isWeekend(date) {
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
}

/**
 * Gets the next valid weekday from a given date
 * @param {Date} date - The starting date
 * @returns {Date} - The next valid weekday
 */
export function getNextWeekday(date) {
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() + 1);
  
  while (isWeekend(nextDay)) {
    nextDay.setDate(nextDay.getDate() + 1);
  }
  
  return nextDay;
}

/**
 * Gets the previous valid weekday from a given date
 * @param {Date} date - The starting date
 * @returns {Date} - The previous valid weekday
 */
export function getPreviousWeekday(date) {
  const prevDay = new Date(date);
  prevDay.setDate(date.getDate() - 1);
  
  while (isWeekend(prevDay)) {
    prevDay.setDate(prevDay.getDate() - 1);
  }
  
  return prevDay;
}

/**
 * Converts 24-hour time format (HH:mm) to 12-hour format (h:mm AM/PM)
 * @param {string} time24 - Time in 24-hour format (e.g., "14:30")
 * @returns {string} - Time in 12-hour format (e.g., "2:30 PM")
 */
export function convertTo12HourFormat(time24) {
  if (!time24 || typeof time24 !== 'string') {
    return time24;
  }
  
  // Parse the time string
  const [hours, minutes] = time24.split(':').map(Number);
  
  if (isNaN(hours) || isNaN(minutes)) {
    return time24; // Return original if parsing fails
  }
  
  let period = 'AM';
  let displayHours = hours;
  
  if (hours === 0) {
    displayHours = 12;
  } else if (hours === 12) {
    period = 'PM';
  } else if (hours > 12) {
    displayHours = hours - 12;
    period = 'PM';
  }
  
  // Format with leading zero for minutes if needed
  const formattedMinutes = minutes.toString().padStart(2, '0');
  
  return `${displayHours}:${formattedMinutes} ${period}`;
}

/**
 * Converts a time range from 24-hour format to 12-hour format
 * @param {string} startTime - Start time in 24-hour format (e.g., "14:30")
 * @param {string} endTime - End time in 24-hour format (e.g., "15:50")
 * @returns {string} - Time range in 12-hour format (e.g., "2:30 PM - 3:50 PM")
 */
export function convertTimeRangeTo12Hour(startTime, endTime) {
  const start12 = convertTo12HourFormat(startTime);
  const end12 = convertTo12HourFormat(endTime);
  return `${start12} - ${end12}`;
}

/**
 * Calculates when a room becomes occupied next (for "Occupied Until" display)
 * @param {Object} room - Room object with occupiedRanges and status
 * @param {string} currentTime - Current time in HH:mm format
 * @returns {string} - Time when room becomes occupied next, or "Free all day"
 */
export function getOccupiedUntil(room, currentTime) {
  if (!room.occupiedRanges || room.occupiedRanges.length === 0) {
    return "Free all day";
  }

  // Convert current time to minutes for comparison
  const currentMinutes = timeToMinutes(currentTime);
  
  // Find the next occupied time slot
  for (const range of room.occupiedRanges) {
    const startMinutes = timeToMinutes(range.start);
    
    // If this time slot starts after current time, return it
    if (startMinutes > currentMinutes) {
      return convertTo12HourFormat(range.start);
    }
  }
  
  // If no future time slots found, room is free for the rest of the day
  return "Free for rest of day";
}

/**
 * Converts time string (HH:mm) to minutes for easy comparison
 * @param {string} time - Time in HH:mm format
 * @returns {number} - Time in minutes
 */
export function timeToMinutes(time) {
  if (!time || typeof time !== 'string') return 0;
  
  const [hours, minutes] = time.split(':').map(Number);
  return (hours * 60) + minutes;
}

/**
 * Checks if a room is currently occupied at the given time
 * @param {Object} room - Room object with occupiedRanges
 * @param {string} currentTime - Current time in HH:mm format
 * @returns {boolean} - True if room is currently occupied
 */
export function isRoomCurrentlyOccupied(room, currentTime) {
  if (!room.occupiedRanges || room.occupiedRanges.length === 0) {
    return false;
  }
  
  const currentMinutes = timeToMinutes(currentTime);
  
  for (const range of room.occupiedRanges) {
    const startMinutes = timeToMinutes(range.start);
    const endMinutes = timeToMinutes(range.end);
    
    if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
      return true;
    }
  }
  
  return false;
}

/**
 * Gets the end time of the current class if room is occupied
 * @param {Object} room - Room object with occupiedRanges
 * @param {string} currentTime - Current time in HH:mm format
 * @returns {string|null} - End time of current class, or null if not occupied
 */
export function getCurrentClassEndTime(room, currentTime) {
  if (!room.occupiedRanges || room.occupiedRanges.length === 0) {
    return null;
  }
  
  const currentMinutes = timeToMinutes(currentTime);
  
  for (const range of room.occupiedRanges) {
    const startMinutes = timeToMinutes(range.start);
    const endMinutes = timeToMinutes(range.end);
    
    if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
      return convertTo12HourFormat(range.end);
    }
  }
  
  return null;
}

/**
 * Determines the appropriate "Occupied Until" display text for a room
 * @param {Object} room - Room object with occupiedRanges and status
 * @param {string} currentTime - Current time in HH:mm format
 * @returns {string} - Display text for "Occupied Until" column
 */
export function getOccupiedUntilDisplay(room, currentTime) {
  // If room has no classes, it's free all day
  if (!room.occupiedRanges || room.occupiedRanges.length === 0) {
    return "Free all day";
  }
  
  // If room is currently occupied, show when current class ends
  if (room.status === "OCCUPIED") {
    const currentClassEnd = getCurrentClassEndTime(room, currentTime);
    if (currentClassEnd) {
      return currentClassEnd;
    }
  }
  
  // If room is open, show when next class starts
  if (room.status === "OPEN") {
    return getOccupiedUntil(room, currentTime);
  }
  
  // Fallback: show when next class starts
  return getOccupiedUntil(room, currentTime);
}

/**
 * Checks if a room should display occupied times
 * @param {Object} room - Room object with occupiedRanges
 * @returns {boolean} - True if occupied times should be displayed
 */
export function shouldShowOccupiedTimes(room) {
  return room.occupiedRanges && room.occupiedRanges.length > 0;
}
