# 2026-Conflict Project Documentation

## Project Overview
An interactive web application visualizing the Israeli-Palestinian conflict timeline from 1987-2023, focusing on Hamas attacks and territorial control changes. The application features an interactive timeline, strategic map with SVG overlays, military symbol system, and comprehensive event filtering.

## Architecture
The application is built with vanilla JavaScript, HTML5, CSS3, and SVG for scalable graphics. It uses a modular architecture with separate files for different concerns.

## File Structure and Interactions

### 1. `index.html` - Main Application Entry Point
- **Purpose**: Root HTML structure and application container
- **Key Features**: 
  - Responsive layout with timeline and map containers
  - Control panels for filtering and navigation
  - Loading states and error handling UI
- **Dependencies**: Loads all JavaScript modules and CSS

### 2. `styles.css` - Global Styling and Layout
- **Purpose**: Visual design, responsive layout, animations
- **Key Components**:
  - Timeline CSS Grid for event layout
  - Map container positioning
  - Military symbol styling
  - Era-based color schemes (1987-2005: First Intifada, 2006-2023: Second Intifada/War Era)
- **Integration**: Works with all components via class-based styling

### 3. `script.js` - Core Application Logic
- **Purpose**: Main application controller and data processing
- **Key Functions**:
  - **Data Loading**: `loadHamasAttacksCSV()` - Async CSV parsing from `Hamasterrorattacks.csv`
  - **Event Management**: `getAllEvents()` - Combines timeline events with CSV attack data
  - **Timeline Rendering**: `renderTimeline()`, `createTimelineEvent()`
  - **Military Classification**: `enhanceEventWithMilitaryData()` - Adds military size/intensity classifications
  - **Map Integration**: `initializeMap()`, `updateStrategicMap()`
  - **Filtering**: `filterEvents()`, `updateEventStats()`
- **Data Flow**:
  1. Loads CSV data asynchronously
  2. Combines with hardcoded timeline events
  3. Enhances with military classifications
  4. Renders timeline and map visualizations

### 4. `symbols.js` - Military Symbol System
- **Purpose**: NATO APP-6 style military symbol generation
- **Key Classes**:
  - `MilitarySymbolFactory` - Creates tactical symbols
  - `SymbolRenderer` - Renders symbols to SVG
- **Symbol Types**: Ground forces, facilities, attacks, settlements, observation posts
- **Integration**: Called by timeline and map rendering functions in `script.js`
- **Fix Applied**: Converted percentage-based SVG path coordinates to numeric values for valid SVG paths

### 5. `flags.js` - Flag and Territory Visual System
- **Purpose**: SVG flag generation and territory visualization
- **Key Classes**:
  - `FlagRenderer` - Creates scalable SVG flags
  - `TerritoryControl` - Manages territorial control percentages
- **Integration**: Used by map rendering in `script.js` for territory control visualization

### 6. `Hamasterrorattacks.csv` - Attack Data Source
- **Purpose**: Comprehensive database of Hamas attacks (1987-2023)
- **Data Structure**:
  - Date, Location, AttackType, Weapon
  - Casualties (killed/wounded by nationality)
  - Context and target information
- **Integration**: Loaded asynchronously by `loadHamasAttacksCSV()` in `script.js`

## Data Flow Architecture

```
CSV File → script.js (loadHamasAttacksCSV) → Event Processing Pipeline
                                                        ↓
Timeline Events ← getAllEvents() ← Military Enhancement ← CSV Data
    ↓                                        ↓
Timeline Rendering ← filterEvents() ← User Controls
    ↓
Map Rendering ← symbols.js/flags.js ← Event Data
```

## Key Features and Implementation

### Timeline System
- **Layout**: CSS Grid with responsive columns
- **Event Cards**: Dynamic creation based on event categories
- **Era Classification**: First Intifada (1987-2005) vs War Era (2006-2023)
- **Military Classification**: Size (squad to division) and intensity (low/medium/high)

### Strategic Map
- **SVG-based**: Scalable vector graphics for territories and symbols
- **Territory Control**: Dynamic percentage-based visualization
- **Military Symbols**: NATO APP-6 style tactical symbols
- **Interactive Filters**: Year-based filtering with smooth transitions

### Event Classification System
- **Categories**: military, political, diplomatic, social
- **Military Enhancement**: Automatic classification based on casualties
  - Squad: <5 casualties
  - Platoon: 5-9 casualties  
  - Company: 10-19 casualties
  - Battalion: 20-49 casualties
  - Brigade: 50-99 casualties
  - Division: 100+ casualties

## Technical Implementation Details

### Asynchronous Data Loading
- CSV files loaded using Fetch API
- Promise-based event initialization
- Error handling for missing/invalid data

### SVG Path Fix Applied
- **Issue**: SVG paths used percentage values (e.g., `M 40% 60%`)
- **Solution**: Converted to numeric coordinates (e.g., `M 40 60`)
- **Impact**: Fixed browser console errors and improved symbol rendering

### Military Symbol System
- Scalable vector graphics for zoom independence
- NATO APP-6 compliance for military symbols
- Dynamic color coding based on era and event type

### Responsive Design
- Mobile-first approach
- CSS Grid for timeline layout
- Flexible map container sizing
- Touch-friendly controls

## Error Handling and Fixes

### CSV Loading Error (Resolved)
- **Problem**: Duplicate `getAllEvents()` functions causing `sampleCSVData` reference error
- **Solution**: 
  - Removed obsolete `parseHamasAttacksFromCSV()` function
  - Consolidated to single async `getAllEvents()` function
  - Ensured military classification enhancement

### SVG Path Error (Resolved)
- **Problem**: Invalid percentage values in SVG `d` attributes
- **Solution**: Systematically converted all percentage coordinates to numeric values
- **Files Affected**: `symbols.js` (all path attributes)

## Performance Optimizations

### Efficient Rendering
- Event batching for timeline updates
- SVG symbol caching
- Lazy loading of detailed event information

### Memory Management
- Proper cleanup of event listeners
- Efficient data structure usage
- Minimal DOM manipulation

## Future Enhancements

### Potential Improvements
1. **Real-time Data Integration**: API connections for live conflict data
2. **Advanced Filtering**: Multi-dimensional filtering options
3. **Export Functionality**: PDF/image export of timeline and maps
4. **Accessibility**: Screen reader support and keyboard navigation
5. **3D Visualization**: Three.js integration for immersive map experience

### Scalability Considerations
- Database integration for large datasets
- Server-side rendering for performance
- Progressive loading for mobile devices

## Conclusion

The 2026-Conflict project demonstrates a sophisticated approach to historical conflict visualization, combining accurate data representation with intuitive user interface design. The modular architecture allows for easy maintenance and enhancement while the SVG-based graphics ensure scalability across devices.

Recent fixes have resolved critical errors in CSV loading and SVG rendering, resulting in a stable and functional application that effectively visualizes complex geopolitical and military data.