# Project Context: Israel-Hamas Conflict Timeline

## Project Overview
- **Type**: Educational web application displaying historical timeline (1900-2025)
- **Purpose**: Interactive visualization of Israel-Hamas conflict with multiple perspectives
- **Technology Stack**: HTML5, CSS3, Vanilla JavaScript, Leaflet.js mapping

## Codebase Structure
```
/index.html          # Main application entry point (~220 lines)
/script.js           # Main application logic and data (~1,800 lines)
/styles.css          # Styling and responsive design (~800 lines)
/SOURCES.md          # Academic source documentation
```

## Key Features Implemented

### 1. Custom Marker System
- **Triangles** (Red) - Military attacks/conflicts
- **Squares** (Blue) - Settlements/locations  
- **Diamonds** (Purple) - Political events/agreements
- **Stars** (Orange) - Social movements/protests
- **Hexagons** (Green) - Territory changes/borders
- **Circles** (Orange) - Major cities

### 2. Overlap Handling
- Groups events by similar coordinates
- Spiral offset pattern for overlapping markers
- Connecting lines show cluster relationships
- Popup warnings for multiple events at same location

### 3. Data Structure
Events contain:
- date, title, description
- category (military, political, social)
- geography (coordinates, type, intensity)
- territoryControl percentages
- impact descriptions

### 4. Map Features
- Interactive Leaflet.js map
- Territory control visualization
- Filter controls by event type
- Timeline animation with play/pause
- Comprehensive legend with custom icons

## Important Implementation Notes

### Marker Creation Process
1. Group events by coordinates to handle overlaps
2. Calculate spiral offsets for clustered events
3. Create SVG-based custom icons with proper scaling
4. Add popup content with overlap information
5. Connect offset markers with subtle lines

### Event Categories
- `military` / `attack` - Red triangles
- `political` - Purple diamonds  
- `social` - Orange stars
- `settlement` - Blue squares
- `territory_change` - Green hexagons

### Map State Management
```javascript
mapState = {
    map: Leaflet map instance,
    markerLayer: Event markers layer,
    territoryLayer: Territory visualization,
    showAttacks/showPolitical/etc: Filter states
}
```

### File Locations
- Marker functions: script.js lines ~1619-1720
- Icon creation: script.js lines ~1619-1690
- Legend: script.js lines ~1257-1316
- Event data: script.js lines ~2-1600

## Academic Standards
- Multiple source verification
- Peer-reviewed citations
- Balanced perspectives (Israeli, Palestinian, Hamas)
- Educational neutrality protocols
- Geographic data accuracy

## User Experience Features
- Responsive design for mobile/desktop
- Semantic HTML5 structure
- Accessibility considerations
- Smooth animations and transitions
- Clear visual hierarchy

## Common Issues to Watch For
1. Marker overlaps - handled by grouping system
2. Event data accuracy - cross-referenced sources
3. Performance with many markers - layer management
4. Mobile responsiveness - CSS media queries
5. Browser compatibility - vanilla JS approach

## Development Guidelines
- Maintain academic neutrality
- Use semantic HTML structure
- Test marker clustering in dense areas
- Verify coordinate accuracy
- Ensure all event types are properly categorized
- Check legend accuracy after any marker changes

## Testing Checklist
- All marker shapes display correctly
- Overlapping markers show proper spacing
- Legend icons match map markers
- Popup content displays event details
- Timeline animation works smoothly
- Filter controls hide/show correct markers
- Mobile responsiveness maintained

## Map Features

### Base Functionality
- Interactive timeline scrubbing (1948-2023)
- Historical event markers with categorization
- Territory control visualization
- City/territory layer toggles
- Detailed popup information for each event

### Military Movement System (NEW)
- **Faction-specific markers** with unique symbols:
  - Hamas (green triangles)
  - Israeli Defense Forces (blue stars)
  - Palestinian Authority (purple circles)
  - Hezbollah (yellow hexagons)
  - Coalition Forces (orange diamonds)
- **Directional markers** pointing toward attack direction
- **Detailed popups** with operation type, timing, and waypoint information
- **Movement toggle** in map controls to show/hide military movements
- **October 7, 2023 Hamas Attack** implemented with full movement data:
  - Multi-pronged attack routes from Gaza
  - Land, sea, and air infiltration methods
  - 15 Israeli communities targeted
  - Real-time military movement visualization

## Debug Attempts Summary
1. **Initial Analysis**: Identified that cities and movement paths work, but faction markers not visible in legend
2. **Template Literal Issue**: Legend template not rendering faction section properly 
3. **Movement Function Debugging**: Added console logging to track marker creation
4. **Syntax Error Fix**: Resolved duplicate code blocks causing JavaScript syntax errors
5. **MapState Integration**: Added `showMovements`, `movementLayer`, and `isUpdating` properties
6. **Recursive Call Prevention**: Implemented `isUpdating` flag to prevent infinite loops
7. **October 7 Attack Implementation**: Added comprehensive Hamas movement data with 15 target locations
8. **getEventYear Function Recovery**: Restored critical function that was accidentally removed during duplicate code cleanup, fixing ReferenceError timeline scrubbing issues
9. **Military Factions Object**: Added comprehensive faction definitions with proper name matching for movement data
10. **Dynamic Faction Legend**: Implemented faction icon rendering using militaryFactions object instead of hardcoded entries
11. **Faction Selector Controls**: Added individual faction filter checkboxes for IDF, Hamas, PA, Hezbollah, Arab Forces, Iran
12. **Active Faction Filters**: Added mapState.activeFactionFilters to track which factions are currently displayed
13. **Faction-Based Movement Filtering**: Enhanced drawMovementPaths to respect active faction filters
14. **Faction Name Mapping**: Updated militaryFactions object to handle multiple name variants (IDF/Israeli Defense Force, etc.)
4. **CSS Enhancements**: Improved faction marker visibility with !important declarations
5. **Legend Fix Attempts**: Multiple attempts to fix template literal parsing
6. **Current Issue**: Legend faction section completely missing from rendered HTML despite being in source code

## Root Cause
The issue appears to be in the `addMapLegend()` function template literal - JavaScript execution stops before reaching the faction section, causing it to be omitted from the rendered legend.