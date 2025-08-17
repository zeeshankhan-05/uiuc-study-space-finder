# Room Availability Display Logic

## Overview

The UIUC Study Space Finder has been enhanced with improved room availability display logic that better serves students looking for study spaces. The key changes focus on clarity and actionable information.

## Key Changes

### 1. Column Header Update

- **Before**: "Available Until"
- **After**: "Occupied Until"
- **Rationale**: Students need to know when they must leave, not when availability ends

### 2. Display Logic Improvements

#### For Currently Open Rooms

- **Occupied Until**: Shows when the next class starts
- **Example**: "Occupied Until: 2:00 PM"
- **Student Action**: Can study until 2:00 PM

#### For Currently Occupied Rooms

- **Occupied Until**: Shows when the current class ends
- **Example**: "Occupied Until: 11:30 AM"
- **Student Action**: Can study starting at 11:30 AM

#### For Free All Day Rooms

- **Occupied Until**: Shows "Free all day"
- **Student Action**: Can study all day without interruption

### 3. Occupied Times Display

- **Always shown** for rooms with scheduled classes
- **Hidden only** when room is completely free
- **Chronological order** for easy planning
- **Maintains existing styling** and expandable behavior

## Technical Implementation

### New Utility Functions

#### `getOccupiedUntilDisplay(room, currentTime)`

Main function that determines what to display in the "Occupied Until" column.

```javascript
// For open rooms: shows next class start time
// For occupied rooms: shows current class end time
// For free rooms: shows "Free all day"
```

#### `shouldShowOccupiedTimes(room)`

Determines whether to display the occupied times section.

```javascript
// Returns true if room has any scheduled classes
// Returns false only for completely free rooms
```

#### `isRoomCurrentlyOccupied(room, currentTime)`

Checks if a room is currently occupied at the given time.

#### `getCurrentClassEndTime(room, currentTime)`

Gets the end time of the current class if the room is occupied.

#### `timeToMinutes(time)`

Converts time strings to minutes for easy comparison.

### Data Flow

1. **Room Data**: Received from API with `occupiedRanges` array
2. **Time Processing**: Current time converted to minutes for comparison
3. **Logic Application**: Appropriate display text calculated based on room status
4. **UI Update**: Table displays clear, actionable information

## User Experience Improvements

### Before (Confusing)

- "Available Until: 4:00 PM" - unclear when to leave
- Inconsistent display of occupied times
- Students had to interpret availability windows

### After (Clear)

- "Occupied Until: 4:00 PM" - clear when to leave
- Always shows occupied times for planning
- Students immediately understand their study window

## Example Scenarios

### Scenario 1: Room 1035 (Currently Open)

- **Status**: OPEN
- **Occupied Until**: 2:00 PM
- **Occupied Times**: Shows all class times
- **Student Understanding**: "I can study here until 2:00 PM"

### Scenario 2: Room 0036 (Currently Occupied)

- **Status**: OCCUPIED
- **Occupied Until**: 11:30 AM
- **Occupied Times**: Shows all class times
- **Student Understanding**: "I can study here starting at 11:30 AM"

### Scenario 3: Room 0035 (Free All Day)

- **Status**: OPEN
- **Occupied Until**: Free all day
- **Occupied Times**: Hidden (no classes)
- **Student Understanding**: "I can study here all day"

## Edge Case Handling

### Back-to-Back Classes

- Rooms with consecutive classes show appropriate transition times
- Students can plan around multiple class periods

### End-of-Day Scenarios

- Rooms with late classes show appropriate "occupied until" times
- Students understand when evening availability ends

### Early Morning Classes

- Rooms with morning-only classes show "Free for rest of day" after classes
- Students can plan afternoon/evening study sessions

## Testing

The `roomAvailabilityTests.js` file contains comprehensive test cases covering:

- Open rooms with next classes
- Occupied rooms with current classes
- Free all day rooms
- Back-to-back class scenarios
- Morning-only and evening-only class patterns

Run tests with:

```javascript
import { runAllTests } from "./roomAvailabilityTests";
runAllTests();
```

## Benefits

1. **Clarity**: Students immediately know when they must leave
2. **Planning**: All occupied times visible for comprehensive planning
3. **Consistency**: Uniform display logic across all room types
4. **Efficiency**: Reduced confusion and faster decision-making
5. **User-Centric**: Designed around student needs, not system logic

## Future Enhancements

Potential improvements could include:

- Real-time updates as classes progress
- Integration with student schedules
- Notifications when rooms become available
- Mobile-optimized quick-view mode
- Accessibility improvements for screen readers

## Maintenance

The new logic is:

- **Modular**: Easy to modify individual functions
- **Testable**: Comprehensive test coverage
- **Documented**: Clear function purposes and examples
- **Backward Compatible**: Works with existing API structure
- **Performance Optimized**: Efficient time calculations
