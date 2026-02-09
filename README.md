# 2026-Conflict Project

## Project Overview
An interactive web application visualizing the Israel-Hamas conflict with historical timeline and military map. Features a clean Swiss design aesthetic with white backgrounds, black text, and NATO military symbology.

## Key Features
- **Interactive Timeline**: Slider with year navigation, displays latest 15 events on page load
- **Swiss Design Theme**: White backgrounds, black text, minimal styling
- **White Map**: Clean light tile base with military-style overlays
- **NATO Symbology**: 1994-era military symbols with color-coded affiliations
- **Side Panel**: 360px drawer that opens on page load showing latest events with date
- **Smooth Transitions**: All UI elements shift when side panel opens/closes

## Quick Start

```bash
npm run dev      # Development server at http://localhost:3000
npm run build    # Production build
npm run preview  # Preview production build
```

## Architecture

### File Structure
```
├── index.html                    # Main HTML entry point
├── package.json                  # Project configuration
├── README.md                     # This file
├── scss/                         # SCSS stylesheets
│   ├── styles.scss              # Main styles entry
│   ├── _variables.scss          # Design tokens
│   └── components/
│       ├── _map.scss           # Map & legend styles
│       ├── _popups.scss        # Popup styles
│       └── _sidepanel.scss     # Side panel styles
├── js/
│   ├── script.js               # Main application logic
│   └── components/
│       ├── clustering-system.js # Event clustering
│       ├── flags.js            # Flag system (disabled by default)
│       └── symbols.js          # NATO symbol generation
└── data/
    └── Hamasterrorattacks.csv  # Attack database
```

### Side Panel Behavior
- **Default**: Opens on page load with latest 15 events
- **Width**: 360px, slides in from left
- **Content Shift**: Header, intro, map-container, and footer shift right by 360px when open
- **Close**: Click X button or click on map to close
- **Header**: Shows "Latest Events (YYYY-MM-DD)" with the most recent event date

### Design System

#### Colors (Swiss Theme)
```scss
$bg-primary: #FFFFFF;
$bg-secondary: #F5F5F5;
$bg-tertiary: #E8E8E8;
$text-primary: #000000;
$text-secondary: #333333;
$text-muted: #666666;
$map-border: #E0E0E0;
```

#### NATO Affiliation Colors
```scss
$nato-friendly: #0066CC;   // Israeli-aligned
$nato-hostile: #CC0000;    // Hamas/hostile
$nato-neutral: #00AA00;   // Neutral forces
$nato-unknown: #FFAA00;    // Unknown
```

### Map Configuration
- **Tiles**: CARTO Light All (white/clean map)
- **Center**: [31.5, 35.0] (Israel/Palestine region)
- **Default Zoom**: 7
- **Grid**: Subtle black dashed lines on white

### Event Side Panel
Displays latest 15 events sorted by date (newest first):
- Event title, date, category (military/political/social)
- Description, impact, territory control percentages
- Casualty counts, involved nations

## JavaScript Key Functions

### Side Panel
```javascript
initializeSidePanel()     // Load latest 15 events on page load
openEventSidePanel()      // Populate panel with events
toggleSidePanel()         // Open/close drawer
updateSidePanelState()    // Handle .shifted classes for content
```

### Map Rendering
```javascript
updateMapForYear(year)    // Update markers for year
drawMovementPaths()       // Draw military movements
addMapLegend()           // Add legend control
```

### Timeline
```javascript
handleSliderChange()     // Year navigation
startMapAnimation()      // Auto-play through years
```

## Performance Fixes Applied

### Ghosting Prevention
- Zoom handler clears all layers before redrawing
- Debounced zoom events (150ms)
- Clustering cache cleared on zoom
- All layer groups cleared: markerLayer, flagLayer, movementLayer, territoryLayer

### Flag System
- Disabled by default (`showFlags: false`)
- Flags embedded in markers removed to prevent duplicates
- Legacy flag overlay code preserved but not used

## CSS Architecture

### Component Files
- `_map.scss`: Map container, tiles, legend, popups, movement paths
- `_popups.scss`: All popup styling with white theme
- `_sidepanel.scss`: Side drawer, events list, transitions

### Leaflet Overrides
Comprehensive overrides force white theme on all map elements:
- Container background
- Tile layers
- All popup components
- Zoom controls
- Attribution
- Layer controls

## Responsive Design
- Side panel: 360px width on desktop, full-width overlay on mobile (<768px)
- Map: 600px height, 450px on tablet, 350px on mobile
- All transitions disabled on mobile for panel

## Dependencies
- Leaflet.js (CDN)
- Font Awesome (CDN)
- Vite + Sass (dev/build)
