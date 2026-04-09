# 2026-Conflict Project - Architecture Diagrams

> Comprehensive visualization of project structure, data flow, and system architecture

---

## 1. Project Structure

```mermaid
graph TD
    subgraph Root
        A[2026-Conflict/] --> B[index.html]
        A --> C[package.json]
        A --> D[vite.config.js]
        A --> E[vercel.json]
        A --> F[README.md]
    end
    
    subgraph js
        A --> G[js/]
        G --> H[script.js]
        G --> I[components/]
        I --> J[symbols.js]
        I --> K[flags.js]
        I --> L[clustering-system.js]
    end
    
    subgraph scss
        A --> M[scss/]
        M --> N[styles.scss]
        M --> O[_variables.scss]
        M --> P[_mixins.scss]
        M --> Q[_grid.scss]
        M --> R[_inline-styles.scss]
        M --> S[components/]
        S --> T[_map.scss]
        S --> U[_popups.scss]
        S --> V[_sidepanel.scss]
        S --> W[_text.scss]
    end
    
    subgraph data
        A --> X[data/]
        X --> Y[Hamasterrorattacks.csv]
    end
    
    subgraph assets
        A --> Z[assets/]
    end
    
    style A fill:#f9f,stroke:#333
    style H fill:#bfb,stroke:#333
    style N fill:#bbf,stroke:#333
```

---

## 2. Component Hierarchy

```mermaid
graph TB
    subgraph index.html
        A[index.html] --> B[Header]
        A --> C[Intro Section]
        A --> D[Map Container]
        A --> E[Timeline Slider]
        A --> F[Event Side Panel]
        A --> G[Footer]
    end
    
    subgraph Map Container
        D --> H[Leaflet Map]
        H --> I[Tile Layer]
        H --> J[markerLayer]
        H --> K[flagLayer]
        H --> L[movementLayer]
        H --> M[territoryLayer]
        H --> N[cityLayer]
    end
    
    subgraph Controls
        D --> O[Map Controls]
        D --> P[Legend]
        E --> Q[Era Selector]
        E --> R[Filter Buttons]
        E --> S[Play/Pause]
    end
    
    style H fill:#bbf,stroke:#333
    style J fill:#bfb,stroke:#333
```

---

## 3. Script Loading Order

```mermaid
sequenceDiagram
    participant HTML as index.html
    participant Symbols as symbols.js
    participant Flags as flags.js
    participant Clustering as clustering-system.js
    participant Script as script.js
    
    HTML->>Symbols: Load first (base classes)
    Symbols-->>HTML: NATOSymbolLibrary ready
    HTML->>Flags: Load second (depends on symbols)
    Flags-->>HTML: FlagSystem ready
    HTML->>Clustering: Load third (depends on both)
    Clustering-->>HTML: IntensityClusterer ready
    HTML->>Script: Load last (orchestrates all)
    Script->>Symbols: Use NATOSymbolLibrary
    Script->>Flags: Use FlagSystem
    Script->>Clustering: Use IntensityClusterer
    
    Note over HTML,Script: CRITICAL: Wrong order = runtime errors
```

---

## 4. Data Flow

```mermaid
flowchart LR
    subgraph Data_Sources
        A[CSV File<br/>Hamasterrorattacks.csv] -->|loadHamasAttacksCSV| B
        C[Timeline Events<br/>66+ events in script.js] -->|timelineEvents array| B
        D[Location Map<br/>50+ hardcoded locations] -->|geocoding| B
    end
    
    B[JavaScript Logic] -->|renders| E[Leaflet Map]
    B -->|styles via| F[SCSS Styles]
    B -->|updates| G[Side Panel]
    B -->|updates| H[Timeline Slider]
    
    E -->|markers| I[User]
    G -->|events list| I
    H -->|year selection| B
    
    style B fill:#bfb,stroke:#333
    style E fill:#bbf,stroke:#333
```

---

## 5. Event Lifecycle

```mermaid
stateDiagram-v2
    [*] --> UserLoad: Page Load
    
    UserLoad --> ShowIntro: Display intro section
    ShowIntro --> ScrollMap: User scrolls down
    
    ScrollMap --> TimelineReady: Map container visible
    TimelineReady --> InitMap: initializeMap()
    
    InitMap --> SliderChanged: User drags slider
    SliderChanged --> UpdateMapYear: updateMapForYear(year)
    
    UpdateMapYear --> ClearLayers: Clear markerLayer
    ClearLayers --> FilterEvents: Filter events by year
    FilterEvents --> CreateMarkers: Generate markers
    
    CreateMarkers --> CheckClustering: Cluster or individual?
    CheckClustering --> Clustered: >3 events nearby
    CheckClustering --> Individual: Events spread out
    
    Clustered --> AddCluster: Add cluster marker
    Individual --> AddMarker: Add single marker
    
    AddCluster --> UserClicksCluster
    AddMarker --> UserClicksMarker
    
    UserClicksCluster --> ExpandCluster: Show individual events
    UserClicksMarker --> OpenPopup: Display popup
    
    OpenPopup --> UserClicksPopup: User reads details
    UserClicksPopup --> OpenSidePanel: User wants more info
    
    OpenSidePanel --> ShiftContent: Add .shifted class
    ShiftContent --> DisplayEvents: Show latest 15 events
    
    DisplayEvents --> TimelineReady: Map ready for next interaction
```

---

## 6. State Management

```mermaid
graph TD
    subgraph window.mapState
        A[mapState] --> B[map: Leaflet instance]
        A --> C[currentYear: 1994]
        A --> D[markerLayer]
        A --> E[flagLayer]
        A --> F[movementLayer]
        A --> G[territoryLayer]
        A --> H[sidePanelOpen: false]
        A --> I[isAnimating: false]
        A --> J[animationSpeed: 1000]
    end
    
    subgraph window.clusterState
        K[clusterState] --> L[enabled: true]
        K --> M[showFlags: false]
        K --> N[minClusterSize: 3]
    end
    
    subgraph window.performanceOptimizer
        O[performanceOptimizer] --> P[clusterCache]
        O --> Q[symbolCache]
        O --> R[debounceTimer]
    end
    
    style A fill:#bbf,stroke:#333
    style K fill:#bfb,stroke:#333
    style O fill:#fbf,stroke:#333
```

---

## 7. Key Functions Reference

```mermaid
graph LR
    subgraph Initialization
        A[initializeMap] --> B[initializeTimeline]
        B --> C[initializeSidePanel]
        C --> D[initializeClusteringSystem]
        D --> E[setupEventListeners]
    end
    
    subgraph Rendering
        F[updateMapForYear] --> G[drawAllEventMarkers]
        G --> H[drawMovementPaths]
        H --> I[drawTerritoryControl]
        I --> J[addMilitaryGrid]
    end
    
    subgraph Data
        K[parseCSV] --> L[loadHamasAttacksCSV]
        L --> M[getFilteredEventsForYear]
        M --> N[enhanceEventWithMilitaryData]
    end
    
    subgraph SidePanel
        O[openEventSidePanel] --> P[updateSidePanelState]
        P --> Q[showAllVisibleEvents]
    end
    
    style A fill:#bbf,stroke:#333
    style F fill:#bfb,stroke:#333
    style K fill:#fbf,stroke:#333
    style O fill:#fbb,stroke:#333
```

---

## 8. Layer Management

```mermaid
flowchart TB
    A[User Action] --> B[Slider Change]
    A --> C[Zoom Change]
    A --> D[Filter Toggle]
    
    B --> E[updateMapForYear]
    C --> F[handleZoomEnd]
    D --> G[applyFilters]
    
    E --> H[Clear All Layers]
    F --> H
    G --> H
    
    H --> I[markerLayer.clearLayers]
    H --> J[flagLayer.clearLayers]
    H --> K[movementLayer.clearLayers]
    H --> L[territoryLayer.clearLayers]
    H --> M[clusterCache.clear]
    
    I --> N[Draw New Markers]
    J --> N
    K --> N
    L --> N
    
    style H fill:#fcc,stroke:#333
    style N fill:#cfc,stroke:#333
```

---

## 9. Deployment Flow

```mermaid
flowchart TD
    A[Git Push] --> B[Vercel CI/CD]
    
    B --> C[Run npm run build]
    
    C --> D[vite build]
    C --> E[cp -r js dist/]
    C --> F[cp -r data dist/]
    
    D --> G[Bundle assets to dist/]
    E --> H[Copy JS files]
    F --> I[Copy CSV data]
    
    G --> J[dist/ folder complete]
    H --> J
    I --> J
    
    J --> K[Serve on vercel.app]
    
    style A fill:#f9f,stroke:#333
    style K fill:#9f9,stroke:#333
```

---

## 10. Development Timeline

```mermaid
gantt
    title 2026-Conflict Development Timeline
    dateFormat  YYYY-MM-DD
    axisFormat  %b %d
    
    section Phase 1: MVP
    Basic HTML Structure       :done,    p1, 2026-02-03, 1d
    Timeline Events           :done,    p2, 2026-02-03, 1d
    Map Integration           :done,    p3, 2026-02-03, 1d
    
    section Phase 2: Features
    Movement Animations       :done,    p4, 2026-02-03, 2d
    Faction Icons             :done,    p5, 2026-02-04, 1d
    Flags System              :done,    p6, 2026-02-05, 1d
    Clustering System         :done,    p7, 2026-02-06, 1d
    Sidepanel & Popups        :done,    p8, 2026-02-07, 1d
    Improved Map Logic        :done,    p9, 2026-02-08, 1d
    
    section Phase 3: Styling
    SCSS Migration            :done,    p10, 2026-02-06, 2d
    Inline Style Removal      :done,    p11, 2026-02-09, 1d
    Documentation             :done,    p12, 2026-02-09, 1d
    
    section Phase 4: Deploy
    Vercel Config             :done,    p13, 2026-02-09, 1d
    404 Fixes                 :done,    p14, 2026-02-09, 1d
```

---

## 11. Color System (NATO Affiliation)

```mermaid
graph TD
    A[NATO Affiliation Colors] --> B[Friendly: #0066CC]
    A --> C[Hostile: #CC0000]
    A --> D[Neutral: #00AA00]
    A --> E[Unknown: #FFAA00]
    
    B --> F[Israeli-aligned forces]
    C --> G[Hamas/hostile forces]
    D --> H[Regional/neutral forces]
    E --> I[Unidentified]
    
    style B fill:#0066CC,stroke:#333,color:#fff
    style C fill:#CC0000,stroke:#333,color:#fff
    style D fill:#00AA00,stroke:#333,color:#fff
    style E fill:#FFAA00,stroke:#333
```

---

## 12. Event Data Structure

```mermaid
classDiagram
    class Event {
        +string date
        +string title
        +string description
        +string category
        +string era
        +string impact
        +Geography geography
        +TerritoryControl territoryControl
        +Casualties casualties
        +MilitaryClassification militaryClassification
        +MovementData movementData
    }
    
    class Geography {
        +string type
        +array~number~ coordinates
        +array~array~number~ affectedArea
        +string intensity
    }
    
    class TerritoryControl {
        +number israeli
        +number palestinian
    }
    
    class Casualties {
        +number totalCasualties
        +number civilian
        +number military
    }
    
    class MilitaryClassification {
        +string affiliation
        +string unitType
        +string size
    }
    
    class MovementData {
        +string type
        +string faction
        +array~array~number~ coordinates
        +string startTime
        +string endTime
    }
    
    Event --> Geography
    Event --> TerritoryControl
    Event --> Casualties
    Event --> MilitaryClassification
    Event --> MovementData
```

---

## 13. Problem-Solution Flowchart

```mermaid
flowchart TD
    A[Problem: 404 Errors on Deployment] --> B[Identify Missing Files]
    B --> C[js/ folder missing in dist]
    C --> D[data/ folder missing in dist]
    
    E[Problem: Inline Styles in JS] --> F[Migrate to CSS Classes]
    F --> G[Created _inline-styles.scss]
    G --> H[Added CSS custom properties]
    H --> I[Updated all JS to use classes]
    
    J[Problem: Vite External Scripts] --> K[Not bundled by default]
    K --> L[Added post-build copy script]
    L --> M[package.json: && cp -r js dist/]
    
    N[Problem: Script Load Order] --> O[symbols.js needs to load first]
    O --> P[flags.js depends on symbols]
    P --> Q[clustering depends on both]
    Q --> R[Main script loads last]
    
    style A fill:#fcc,stroke:#333
    style E fill:#fcc,stroke:#333
    style J fill:#fcc,stroke:#333
    style N fill:#fcc,stroke:#333
    
    style M fill:#cfc,stroke:#333
    style I fill:#cfc,stroke:#333
    style L fill:#cfc,stroke:#333
    style R fill:#cfc,stroke:#333
```

---

## 14. User Interaction Flow

```mermaid
flowchart LR
    A[User] --> B[Timeline Slider]
    A --> C[Filter Buttons]
    A --> D[Map Interaction]
    A --> E[Side Panel Toggle]
    
    B --> F[handleSliderChange]
    C --> G[applyFilters]
    D --> H[mapClick]
    E --> I[toggleSidePanel]
    
    F --> J[updateMapForYear]
    G --> J
    J --> K[drawAllEventMarkers]
    
    H --> L[showEventPopup]
    L --> M[openEventSidePanel]
    
    K --> N[Leaflet Marker]
    N --> O[Click Event]
    O --> L
    
    style J fill:#ff9,stroke:#333
    style K fill:#f9f,stroke:#333
    style N fill:#9ff,stroke:#333
```

---

## 15. SCSS Architecture

```mermaid
flowchart LR
    subgraph Entry_Point
        A[styles.scss] --> B[@import statements]
    end
    
    subgraph Foundation
        B --> C[_variables.scss]
        B --> D[_mixins.scss]
        B --> E[_grid.scss]
    end
    
    subgraph Components
        B --> F[components/_map.scss]
        B --> G[components/_popups.scss]
        B --> H[components/_sidepanel.scss]
        B --> I[components/_text.scss]
    end
    
    subgraph Utilities
        B --> J[_inline-styles.scss]
    end
    
    C --> K[CSS Bundle]
    D --> K
    E --> K
    F --> K
    G --> K
    H --> K
    I --> K
    J --> K
    
    style A fill:#bbf,stroke:#333
    style K fill:#bfb,stroke:#333
```

---

> Document generated for 2026-Conflict project visualization
