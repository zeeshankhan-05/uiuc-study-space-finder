# UIUC Study Space Finder - Map Interaction Debugging Guide

## Overview

This guide provides step-by-step debugging instructions for restoring full interactive map functionality, including drag/pan, building hover effects, and building click navigation.

## Application Features

### Dual Zoom System

The application features a sophisticated dual zoom system that separates browser zoom from map zoom functionality:

- **Browser Zoom**: Standard browser zoom (Cmd+/Ctrl+, Cmd-/Ctrl-, Cmd0/Ctrl0) affects the entire page
- **Map Zoom**: Custom map zoom controls work independently for the campus map only
- **Independent Controls**: Both zoom systems operate simultaneously without interference

## Current Status

- Event listener setup issues
- SVG processing and injection problems  
- Event handler conflicts between drag and click
- CSS pointer events blocking interactions
- Touch event handling for mobile devices

## Debugging Checklist

### 1. Browser Console Check

- Open browser developer tools (F12)
- Check Console tab for JavaScript errors
- Look for any React warnings or errors
- Verify no network request failures

### 2. Event Listener Verification

- Open Elements tab in dev tools
- Find `.map-container` element
- Check if event listeners are attached
- Verify building elements have proper event handlers

### 3. CSS Pointer Events Check

- Inspect building elements (`.image-mapper-shape`)
- Verify `pointer-events: auto !important`
- Check no parent elements block pointer events
- Ensure SVG container doesn't interfere

### 4. Building Data Verification

- Check if `getBuildingByPath()` function works
- Verify building IDs match between SVG and mapper
- Test navigation to building detail pages
- Confirm routing configuration

## Testing Scenarios

### Test 1: Map Dragging

**Expected**: Click and drag on empty map areas moves the map smoothly
**Test Steps**:

1. Click on empty space (not on buildings)
2. Drag mouse to move map
3. Verify cursor changes to "grabbing"
4. Check map moves with mouse movement

**If Failed**:

- Check `handleMouseDown`, `handleMouseMove`, `handleMouseUp` functions
- Verify `isDragging` state management
- Check CSS cursor styles

### Test 2: Building Hover

**Expected**: Hovering over buildings shows UIUC navy blue highlighting
**Test Steps**:

1. Move mouse over any building
2. Verify building fills with navy blue color
3. Check cursor changes to "pointer"
4. Verify hover state is maintained

**If Failed**:

- Check `handleBuildingHover` function
- Verify CSS `.hovered-building` class
- Check event listener attachment
- Verify `isHoveringBuilding` state

### Test 3: Building Click

**Expected**: Clicking buildings navigates to building detail pages
**Test Steps**:

1. Click on any building
2. Verify navigation to `/building/{buildingId}`
3. Check building detail page loads
4. Verify back navigation works

**If Failed**:

- Check `handleBuildingClick` function
- Verify `navigate()` function call
- Check building ID mapping
- Verify routing configuration

### Test 4: Zoom Functionality

**Expected**: Mouse wheel and zoom buttons work properly
**Test Steps**:

1. Use mouse wheel to zoom in/out
2. Click zoom in/out buttons
3. Verify zoom level indicator updates
4. Check zoom boundaries (0.25x to 2.5x)

**If Failed**:

- Check `handleWheelZoom` function
- Verify zoom state management
- Check zoom button event handlers
- Verify transform application

### Test 5: Touch Interactions

**Expected**: Touch drag and pinch-to-zoom work on mobile
**Test Steps**:

1. Test single touch drag on mobile
2. Test pinch-to-zoom with two fingers
3. Verify touch building selection
4. Check touch event handling

**If Failed**:

- Check touch event handlers
- Verify `touch-action` CSS properties
- Check mobile-specific optimizations
- Test on actual mobile device

## Common Issues & Solutions

### Issue 1: Map Not Draggable

**Symptoms**: Clicking and dragging doesn't move the map
**Root Cause**: Pointer events blocked or event listeners not attached
**Solution**:

```css
.map-container {
  pointer-events: auto !important;
  cursor: grab;
}
```

### Issue 2: Buildings Not Clickable

**Symptoms**: Clicking buildings doesn't trigger navigation
**Root Cause**: Event listeners not properly attached or conflicts with drag
**Solution**:

```javascript
// Ensure proper event delegation
polygon.addEventListener("click", handlePolygonClick);
polygon.addEventListener("mouseenter", handleMouseEnter);
polygon.addEventListener("mouseleave", handleMouseLeave);
```

### Issue 3: No Hover Effects

**Symptoms**: Buildings don't highlight on hover
**Root Cause**: CSS classes not applied or hover state not managed
**Solution**:

```css
.image-mapper-shape.hovered-building {
  fill: rgba(19, 41, 75, 0.8) !important;
  stroke: #e84a27 !important;
  stroke-width: 3px !important;
}
```

### Issue 4: Navigation Not Working

**Symptoms**: Clicking buildings doesn't navigate to detail pages
**Root Cause**: Routing issues or building ID mapping problems
**Solution**:

```javascript
// Verify building data mapping
const buildingData = getBuildingByPath(buildingPath);
if (buildingData) {
  navigate(`/building/${buildingData.id}`);
}
```

## Performance Optimizations

### 1. Event Listener Management

- Use `useCallback` for event handlers
- Properly clean up event listeners
- Avoid recreating functions on every render

### 2. CSS Transitions

- Disable transitions during dragging for performance
- Use `will-change: transform` for smooth animations
- Optimize transform calculations

### 3. Touch Handling

- Use `touch-action: manipulation` for mobile
- Implement proper touch event handling
- Optimize for mobile performance

## Mobile-Specific Considerations

### Touch Targets

- Ensure building elements are large enough for touch
- Implement proper touch event handling
- Test on actual mobile devices

### Performance

- Optimize for mobile hardware
- Use appropriate touch sensitivity
- Implement smooth touch interactions

## Testing Tools

### 1. Browser Dev Tools

- Console for JavaScript errors
- Elements tab for DOM inspection
- Network tab for API calls
- Performance tab for optimization

### 2. React Dev Tools

- Component state inspection
- Props verification
- Hook debugging
- Performance profiling

### 3. Manual Testing

- Test all interaction scenarios
- Verify on different devices
- Check accessibility features
- Test edge cases

## Success Criteria

**Map Dragging**: Smooth drag/pan functionality on empty areas
**Building Hover**: Clear highlighting with UIUC theme colors
**Building Click**: Proper navigation to detail pages
**Zoom Controls**: Mouse wheel and button zoom functionality
**Touch Support**: Mobile touch interactions working
**Performance**: Smooth animations and responsive interactions
**Accessibility**: Keyboard navigation and screen reader support

## Next Steps

1. **Test All Scenarios**: Run through each test case
2. **Verify Fixes**: Confirm all issues are resolved
3. **Performance Check**: Ensure smooth interactions
4. **Mobile Testing**: Test on actual mobile devices
5. **Documentation**: Update user guides and help content

## Support

If issues persist after following this guide:

1. Check browser console for specific errors
2. Verify all code changes are applied
3. Test in different browsers
4. Check for conflicting CSS or JavaScript
5. Review React component lifecycle
