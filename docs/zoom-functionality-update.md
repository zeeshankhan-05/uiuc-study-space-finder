# Zoom Functionality Update - Browser vs Map Zoom Separation

## Overview

This document outlines the changes made to separate browser zoom functionality from map zoom functionality in the UIUC Study Space Finder application.

## Problem Statement

Previously, the application had conflicting zoom behaviors:

- Browser keyboard shortcuts (Cmd+/Ctrl+ and Cmd-/Ctrl-) were being captured by the map component
- `e.preventDefault()` calls were preventing normal browser zoom behavior
- Users couldn't use standard browser zoom to adjust the entire page
- Map zoom and browser zoom were interfering with each other

## Solution Implemented

### 1. Modified Keyboard Event Handling

**File:** `frontend/src/components/CampusMap.jsx`

**Changes:**

- Removed `e.preventDefault()` calls for zoom-related keys (+, -, =, 0)
- Added focus-based event handling - map shortcuts only work when map is focused
- Added modifier key detection to distinguish between standalone key presses and browser shortcuts
- Preserved map navigation shortcuts (arrow keys, Escape) with proper event prevention

**Before:**

```javascript
if (e.key === "+" || e.key === "=") {
  e.preventDefault(); // This prevented browser zoom
  handleZoomIn();
}
```

**After:**

```javascript
if (isMapFocused) {
  if (e.key === "+" || e.key === "=") {
    // Don't prevent default - allow browser zoom to work
    // Only handle map zoom if it's a standalone key press (not Cmd/Ctrl + key)
    if (!e.metaKey && !e.ctrlKey) {
      handleZoomIn();
    }
  }
}
```

### 2. Added Focus Management

**Changes:**

- Added `tabIndex={0}` to the map container for keyboard navigation
- Implemented focus/blur event handlers for visual feedback
- Added CSS focus styles to indicate when map is keyboard-accessible

### 3. Enhanced User Experience

**Changes:**

- Added keyboard navigation hint below zoom controls
- Implemented visual focus indicators
- Maintained all existing map functionality (pan, zoom, building interactions)

## Current Behavior

### Browser Zoom (Global)

- **Cmd + / Ctrl +** - Zooms entire website (text, UI, all elements)
- **Cmd - / Ctrl -** - Zooms out entire website
- **Cmd 0 / Ctrl 0** - Resets website zoom to 100%
- Works anywhere on the page
- Standard browser behavior maintained

### Map Zoom (Local)

- **Custom + Button** - Zooms into campus map only
- **Custom - Button** - Zooms out of campus map only
- **Custom Reset Button** - Resets map view to default
- **Keyboard shortcuts** (when map is focused):
  - `+` or `=` - Map zoom in
  - `-` - Map zoom out
  - `0` - Reset map view
  - Arrow keys - Pan map
  - Escape - Reset map view

### Focus Management

- Use **Tab** to navigate to map container
- Visual focus indicator shows when map is active
- Map keyboard shortcuts only work when map is focused
- Browser zoom shortcuts always work globally

## Technical Implementation Details

### Event Listener Logic

```javascript
const handleKeyDown = (e) => {
  // Only handle map-specific shortcuts when the map container is focused
  const isMapFocused =
    containerRef.current?.contains(e.target) ||
    containerRef.current === e.target ||
    document.activeElement === containerRef.current;

  if (isMapFocused) {
    // Map-specific controls with modifier key detection
    if (e.key === "+" || e.key === "=") {
      if (!e.metaKey && !e.ctrlKey) {
        handleZoomIn(); // Only standalone key press
      }
      // No preventDefault() - allows browser zoom to work
    }
  }
};
```

### CSS Focus Styles

```css
.map-container.map-focused {
  outline: 2px solid #ff5f05;
  outline-offset: 2px;
}
```

## Benefits

1. **Standard Web Behavior**: Browser zoom now works as expected
2. **Independent Controls**: Map zoom and browser zoom operate separately
3. **Better Accessibility**: Keyboard navigation with visual feedback
4. **User Choice**: Users can choose between global and local zoom
5. **No Conflicts**: Both zoom systems work simultaneously without interference

## Testing

### Manual Testing Checklist

- [ ] Browser zoom shortcuts work on entire page
- [ ] Map zoom controls work independently
- [ ] Keyboard navigation works when map is focused
- [ ] Visual focus indicators appear correctly
- [ ] All existing map functionality preserved
- [ ] Touch/mobile interactions still work
- [ ] No console errors or warnings

### Test Scenarios

1. **Browser Zoom Test**

   - Use Cmd+/Ctrl+ to zoom entire page
   - Use Cmd-/Ctrl- to zoom out entire page
   - Use Cmd0/Ctrl0 to reset page zoom
   - Verify map zoom level remains unchanged

2. **Map Zoom Test**

   - Click + and - buttons
   - Focus map with Tab, then use +, -, 0 keys
   - Use arrow keys to pan when map is focused
   - Verify browser zoom level remains unchanged

3. **Focus Management Test**
   - Tab through page elements
   - Verify map gets focus indicator
   - Test keyboard shortcuts only work when focused
   - Verify focus indicator disappears on blur

## Files Modified

1. `frontend/src/components/CampusMap.jsx` - Main logic changes
2. `frontend/src/components/CampusMap.css` - Focus styles
3. `README.md` - Documentation updates
4. `docs/zoom-functionality-update.md` - This document

## Future Enhancements

- Consider adding custom keyboard shortcuts for map zoom (e.g., Shift+Plus)
- Implement zoom level persistence across sessions
- Add zoom level indicators in the UI
- Consider adding zoom to specific building functionality

## Conclusion

The implementation successfully separates browser zoom from map zoom functionality while maintaining all existing features. Users can now use both zoom systems independently, providing a more intuitive and standard web experience.
