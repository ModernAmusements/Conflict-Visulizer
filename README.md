# 2026-Conflict Project Structure

## 📁 Project Organization

```
2026-Conflict/
├── index.html                     # Main HTML entry point
├── package.json                   # Project configuration
├── PROJECT_DOCUMENTATION.md        # Technical documentation
├── ai_js_ruleset.md             # JavaScript coding standards
│
├── css/                          # Stylesheets
│   └── styles.css               # Main application styles
│
├── js/                          # JavaScript files
│   ├── script.js                # Main application logic
│   └── components/              # Reusable components
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

1. **Start Local Server:**
   ```bash
   # From project root
   python -m http.server 8000
   # or
   npm start
   ```

2. **Open in Browser:**
   ```
   http://localhost:8000
   ```

## 📋 File Dependencies

### Script Loading Order (Critical!)
```html
<!-- CSS (loaded first) -->
<link rel="stylesheet" href="css/styles.css">

<!-- JavaScript (loaded at end of body) -->
<script src="js/components/symbols.js"></script>        <!-- Base symbols -->
<script src="js/components/flags.js"></script>          <!-- Flag system -->
<script src="js/components/clustering-system.js"></script> <!-- Clustering logic -->
<script src="js/script.js"></script>                     <!-- Main app -->
```

### Dependencies Flow:
```
CSS → HTML → symbols.js → flags.js → clustering-system.js → script.js
```

## 🎯 Key Files by Function

### **Core Application**
- `index.html` - Main structure and UI layout
- `css/styles.css` - All styling and responsive design
- `js/script.js` - Main application controller

### **Military Visualization**
- `js/components/symbols.js` - NATO APP-6 symbol generation
- `js/components/flags.js` - Territory and flag overlays
- `js/components/clustering-system.js` - Event grouping and display

### **Data Layer**
- `data/Hamasterrorattacks.csv` - Attack event database

## 🔄 Data Flow

```
CSV Data → script.js (loadHamasAttacksCSV) → Event Processing
                                                        ↓
Timeline Events ← getAllEvents() ← Military Enhancement
                                                        ↓
Timeline Rendering ← createTimelineEvent() ← symbols.js
                                                        ↓
Map Rendering ← updateMapForYear() ← flags.js + clustering-system.js
```

## 🛠️ Development Guidelines

### File Organization Rules:
1. **CSS** in `/css/` folder
2. **JavaScript** in `/js/` with components in `/js/components/`
3. **Data files** in `/data/` folder
4. **Assets** in `/assets/` subfolders

### Integration Requirements:
1. **Load Order**: CSS → HTML → JS components (dependency order)
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

## 🎨 CSS Organization

### Main Sections:
- **Timeline Styles** - Event cards, animations, responsive grid
- **Map Styles** - Container, controls, overlays
- **Military Symbols** - NATO symbol rendering
- **Responsive Design** - Mobile, tablet, desktop layouts
- **Color Themes** - Era-based color schemes

### Key Classes:
- `.timeline-event` - Main event container
- `.military-symbol-container` - NATO symbol wrapper
- `.flag-overlay` - Territory flag display
- `.movement-*` - Military movement paths

## 🔧 Customization

### Adding New Event Types:
1. Update CSV file structure
2. Modify `convertCSVToEvent()` in script.js
3. Add CSS classes for new category
4. Update military classification logic

### Adding New Symbols:
1. Update `symbols.js` with new symbol definitions
2. Add rendering logic in `NATOSymbolLibrary`
3. Update CSS for new symbol styles

### Modifying Map Display:
1. Update `updateMapForYear()` in script.js
2. Modify territory drawing functions
3. Adjust flag rendering logic

## 🚨 Important Notes

### Critical Dependencies:
- **Leaflet.js** - Map rendering (loaded from CDN)
- **Font Awesome** - Icons (loaded from CDN)
- **Modern Browser** - ES6+ features required

### Performance Considerations:
- Large CSV files need async loading
- Map updates are debounced to prevent lag
- Symbol rendering uses SVG for scalability

### Browser Compatibility:
- Chrome/Edge: Full support
- Firefox: Full support  
- Safari: Modern versions supported
- IE: Not supported (ES6+ required)

## 📱 Responsive Design

- **Mobile**: Single column timeline, simplified map
- **Tablet**: Two-column timeline, full map functionality
- **Desktop**: Multi-column timeline, advanced features

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