# 2026-Conflict Project

## 📋 Project Overview
An interactive web application visualizing military conflicts with 1994-era NATO symbology standards. The application features strategic map visualization, military symbol systems, and territorial control displays with a functional, restrained design aesthetic.

## 🎯 Key Features
- **1994 NATO Symbology**: Standard military symbols with complete legend reference
- **Clean Map Loading**: No symbol repetition or tiling artifacts
- **Enhanced Flag System**: Larger, clearly legible national flags
- **Military Movement**: Thin lines with directional arrows
- **Integrated UI**: National Forces panel within Legend Options
- **1994-Era Styling**: Functional, restrained visualization without modern embellishments
- **Timeline Slider**: Interactive year slider with tick marks for event navigation and snap-to-event functionality

## 📁 Project Organization

```
2026-Conflict/
├── index.html                     # Main HTML entry point
├── package.json                   # Project configuration
├── .gitignore                     # Git ignore rules
├── README.md                       # Project documentation
├── PROJECT_DOCUMENTATION.md         # Technical documentation
├── ai_js_ruleset.md             # JavaScript coding standards
│
├── scss/                         # SCSS stylesheets (migrating from CSS)
│   ├── styles.scss               # Main styles entry point
│   ├── _variables.scss           # Design tokens and variables
│   └── _mixins.scss              # Reusable mixins
│
├── css/                          # Legacy CSS (being migrated to SCSS)
│   ├── styles.css                # Original styles
│   └── styles.css.backup         # Backup of original
│
├── js/                          # JavaScript files
│   ├── script.js                 # Main application logic
│   └── components/               # Reusable components
│       ├── symbols.js            # NATO military symbol system
│       ├── flags.js              # Flag and territory visualization
│       └── clustering-system.js   # Event clustering and grouping
│
├── data/                        # Data files
│   └── Hamasterrorattacks.csv   # Hamas attacks database (1987-2023)
│
└── assets/                      # Static assets
    ├── images/                  # Image files
    └── fonts/                   # Font files
```

## 🚀 Getting Started

### Development Mode (with Vite + SCSS hot reloading):
```bash
npm run dev
# Opens at http://localhost:3000
```

### Legacy Mode (Python server):
```bash
npm run legacy
# Opens at http://localhost:8000
```

### Build for Production:
```bash
npm run build
# Outputs to dist/ folder
npm run preview
# Preview production build
```

## 🎨 SCSS Architecture

### Variables (`scss/_variables.scss`)
Design tokens and configuration:
```scss
// NATO Affiliation Colors
$nato-friendly: #0066CC;
$nato-hostile: #CC0000;
$neutral: #00AA00;

// Nation Colors
$israel-color: #0038B8;
$palestine-color: #009C48;

// Theme Colors
$bg-primary: #0a0a0a;
$bg-secondary: #1a1a2e;
$text-primary: #e8e8e8;

// Spacing
$spacing-sm: 0.5rem;
$spacing-md: 1rem;
$spacing-lg: 1.5rem;

// Breakpoints
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
```

### Mixins (`scss/_mixins.scss`)
Reusable style patterns:
```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin btn-primary {
  padding: 0.5rem 1rem;
  background: $nato-friendly;
  color: white;
  border-radius: 8px;
}
```

### Main Entry (`scss/styles.scss`)
Imports variables, mixins, and component partials. Migrating incrementally from legacy CSS.

## 📋 File Dependencies

### Script Loading Order (Critical!)
```html
<!-- CSS (SCSS compiled automatically by Vite) -->
<link rel="stylesheet" href="scss/styles.scss">

<!-- JavaScript (loaded at end of body) -->
<script src="js/components/symbols.js"></script>        <!-- Base symbols -->
<script src="js/components/flags.js"></script>          <!-- Flag system -->
<script src="js/components/clustering-system.js"></script> <!-- Clustering logic -->
<script src="js/script.js"></script>                     <!-- Main app -->
```

### Dependencies Flow:
```
SCSS → Vite → Compiled CSS → HTML → symbols.js → flags.js → clustering-system.js → script.js
```

## 🔄 Data Flow

```
CSV Data → script.js (loadHamasAttacksCSV) → Event Processing
                                                  ↓
                          Timeline Events ← getAllEvents()
                                                  ↓
                          Timeline Rendering ← createTimelineEvent()
                                                  ↓
                          Map Rendering ← updateMapForYear()
```

## 🛠️ Development Guidelines

### CSS to SCSS Migration Process
1. **Copy** original CSS to `scss/styles.scss`
2. **Extract** variables to `_variables.scss`
3. **Extract** mixins to `_mixins.scss`
4. **Convert** nested rules to SCSS nesting
5. **Replace** hardcoded values with variables
6. **Test** thoroughly before moving on

### Current Migration Status
- ✅ Variables defined
- ✅ Mixins created
- ✅ Map styles (complete)
- ✅ Legend styles (complete)
- ✅ Timeline slider styles with tick marks (complete)
- ⏳ Remaining components

### File Organization Rules:
1. **SCSS** in `/scss/` folder
2. **Legacy CSS** in `/css/` folder (being phased out)
3. **JavaScript** in `/js/` with components in `/js/components/`
4. **Data files** in `/data/` folder
5. **Assets** in `/assets/` subfolders

### Integration Requirements:
1. **Load Order**: SCSS → HTML → JS components (dependency order)
2. **Path References**: Use relative paths from project root
3. **Module Dependencies**: Verify modules exist before using
4. **Error Handling**: Graceful fallbacks for missing files

### Script Loading Sequence:
1. **symbols.js** - Base military symbol classes
2. **flags.js** - Flag and territory visualization (depends on symbols.js)
3. **clustering-system.js** - Event clustering (depends on both)
4. **script.js** - Main application (depends on all components)

## 📊 Data Structure

### CSV File Format:
```csv
Date,Location,AttackType,Weapon,TotalKilled,IsraelisKilled,PalestiniansKilled,TotalWounded,IsraelisWounded,PalestiniansWounded,TotalCasualties,Description,Context,ClaimedBy,TargetType
```

### Event Object Structure:
```javascript
{
    date: "1994",
    title: "Event Title",
    description: "Event description",
    category: "military|political|social",
    era: "1987-2005|2006-2023",
    impact: "Impact description",
    geography: {
        type: "attack|territory",
        coordinates: [lat, lng],
        affectedArea: [[lat1, lng1], [lat2, lng2]],
        intensity: "high|medium|low"
    },
    territoryControl: { israeli: 85, palestinian: 15, hamas: 2 },
    casualties: { /* casualty breakdown */ },
    militaryClassification: { /* NATO classification */ }
}
```

## 🎨 CSS Organization (Legacy → SCSS)

### Main Sections (in scss/styles.scss):
- **Base Styles** - Reset, typography, layout
- **Header Styles** - Main header and navigation
- **Map Styles** - Container, controls, overlays
- **Legend Styles** - Military symbols, flags
- **Timeline Slider Styles** - Tick marks and snap functionality
- **Footer Styles** - Footer content

### Timeline Slider Tick Marks:
The timeline slider includes dynamic tick marks generated from event years:

**JavaScript Functions:**
```javascript
getEventYears()           // Extract unique years from timelineEvents
findNearestEventYear()    // Locate nearest event year (within 3 years)
createTickMarks()         // Generate tick mark DOM elements
updateActiveTickMarks()   // Highlight current year tick
initializeTimelineTicks() // Initialize on DOM ready
```

**Features:**
- Tick marks at each event year (simplified to decades for readability)
- Snap-to-tick when dragging within 3 years of an event
- Decade labels displayed (1900, 1910, 1920, etc.)
- Active tick highlighting synchronized with current year

### Key Classes:
- `.map-container` - Map section wrapper
- `.map-header` - Map controls header
- `.map-controls` - Play/pause, speed, layer controls
- `.military-map-legend` - NATO symbol legend
- `.timeline-slider-container` - Year slider container
- `.slider-track-container` - Tick mark container
- `.slider-tick-mark` - Individual tick mark
- `.slider-tick-label` - Decade label
- `.cluster-marker` - Intensity-based clustering

## 🔧 Customization

### Adding New SCSS Variables:
1. Add to `scss/_variables.scss`
2. Use throughout SCSS files

### Adding New Mixins:
1. Add to `scss/_mixins.scss`
2. Import in component partials

### Building for Production:
```bash
npm run build
# Creates optimized assets in dist/
```

## 🚨 Important Notes

### Critical Dependencies:
- **Vite** - Build tool and dev server
- **Sass** - SCSS compilation
- **Leaflet.js** - Map rendering (loaded from CDN)
- **Font Awesome** - Icons (loaded from CDN)
- **Modern Browser** - ES6+ features required

### Performance Considerations:
- Vite provides fast HMR during development
- SCSS compiled efficiently for production
- Large CSV files need async loading
- Map updates are debounced to prevent lag
- Symbol rendering uses SVG for scalability

### Browser Compatibility:
- Chrome/Edge: Full support
- Firefox: Full support  
- Safari: Modern versions supported
- IE: Not supported (ES6+ required)

## 📱 Responsive Design

Breakpoints defined in `_variables.scss`:
- `$breakpoint-sm: 576px`
- `$breakpoint-md: 768px`
- `$breakpoint-lg: 992px`
- `$breakpoint-xl: 1200px`

## 🔍 Debug Information

### Console Logs:
- 🔄 Loading operations
- 📊 Data processing statistics  
- 🎯 Symbol creation status
- ✅ Map update completion

### Error Handling:
- CSV parsing failures with fallback data
- Symbol creation errors with default markers
- Map loading issues with retry logic
