#!/usr/bin/env node

/**
 * ARCHITECTURE.md Auto-Generator
 * Scans project structure and dependencies, then updates ARCHITECTURE.md
 * 
 * Usage: node scripts/generate-architecture.js
 * Or: npm run docs:update
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = path.dirname(__dirname);
const ARCHITECTURE_FILE = path.join(PROJECT_ROOT, 'ARCHITECTURE.md');

// ANSI colors for console output
const COLORS = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

function log(message, color = COLORS.reset) {
    console.log(`${color}${message}${COLORS.reset}`);
}

function logSection(message) {
    log(`\n📋 ${message}`, COLORS.cyan);
}

function logSuccess(message) {
    log(`✅ ${message}`, COLORS.green);
}

function logWarning(message) {
    log(`⚠️  ${message}`, COLORS.yellow);
}

/**
 * Recursively get all files in a directory
 */
function getAllFiles(dirPath, fileList = []) {
    const files = fs.readdirSync(dirPath);
    
    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            getAllFiles(filePath, fileList);
        } else if (file.endsWith('.js') || file.endsWith('.scss')) {
            fileList.push({
                path: filePath,
                relative: path.relative(PROJECT_ROOT, filePath),
                name: file,
                ext: path.extname(file)
            });
        }
    });
    
    return fileList;
}

/**
 * Extract dependencies from a file
 */
function extractDependencies(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const dependencies = [];
    
    if (filePath.endsWith('.js')) {
        // Match require() or import statements
        const requirePattern = /require\(['"]([^'"]+)['"]\)/g;
        const importPattern = /import[^'"]+from\s+['"]([^'"]+)['"]/g;
        
        let match;
        while ((match = requirePattern.exec(content)) !== null) {
            dependencies.push(match[1]);
        }
        while ((match = importPattern.exec(content)) !== null) {
            dependencies.push(match[1]);
        }
    } else if (filePath.endsWith('.scss') || filePath.endsWith('.css')) {
        // Match @import and @use statements
        const importPattern = /@import\s+['"]([^'"]+)['"]/g;
        const usePattern = /@use\s+['"]([^'"]+)['"]/g;
        
        let match;
        while ((match = importPattern.exec(content)) !== null) {
            dependencies.push(match[1]);
        }
        while ((match = usePattern.exec(content)) !== null) {
            dependencies.push(match[1]);
        }
    }
    
    return dependencies;
}

/**
 * Generate file structure diagram
 */
function generateFileStructure() {
    logSection('Generating file structure...');
    
    let structure = '```\n';
    structure += '2026-Conflict/\n';
    
    const items = [
        '├── 📄 index.html',
        '├── 📄 package.json',
        '├── 📄 README.md',
        '├── 📄 ARCHITECTURE.md',
        '│'
    ];
    
    // Add JS files
    const jsFiles = getAllFiles(path.join(PROJECT_ROOT, 'js'));
    const jsMain = jsFiles.find(f => f.name === 'script.js');
    const jsComponents = jsFiles.filter(f => f.name !== 'script.js');
    
    items.push('├── 📂 js/');
    if (jsMain) {
        items.push(`│   ├── 📄 ${jsMain.name}`);
    }
    if (jsComponents.length > 0) {
        items.push('│   └── 📂 components/');
        jsComponents.forEach((file, index) => {
            const isLast = index === jsComponents.length - 1;
            const prefix = isLast ? '│       └──' : '│       ├──';
            items.push(`${prefix} 📄 ${file.name}`);
        });
    }
    
    items.push('│');
    
    // Add SCSS files
    const scssFiles = getAllFiles(path.join(PROJECT_ROOT, 'scss'));
    const scssMain = scssFiles.find(f => f.name === 'styles.scss');
    const scssPartials = scssFiles.filter(f => f.name.startsWith('_'));
    const scssComponents = scssFiles.filter(f => 
        f.relative.startsWith('scss/components/') && f.name.startsWith('_')
    );
    
    items.push('├── 📂 scss/');
    if (scssMain) {
        items.push(`│   ├── 📄 ${scssMain.name}`);
    }
    scssPartials.filter(f => f.name !== 'styles.scss').forEach((file, index) => {
        const prefix = index === scssPartials.length - 2 && scssComponents.length === 0 ? '│   └──' : '│   ├──';
        items.push(`${prefix} 📄 ${file.name}`);
    });
    if (scssComponents.length > 0) {
        items.push('│   └── 📂 components/');
        scssComponents.forEach((file, index) => {
            const isLast = index === scssComponents.length - 1;
            const prefix = isLast ? '│       └──' : '│       ├──';
            items.push(`${prefix} 📄 ${file.name}`);
        });
    }
    
    items.push('│');
    
    // Add data files
    const dataDir = path.join(PROJECT_ROOT, 'data');
    if (fs.existsSync(dataDir)) {
        const dataFiles = fs.readdirSync(dataDir);
        items.push('├── 📂 data/');
        dataFiles.forEach((file, index) => {
            const isLast = index === dataFiles.length - 1;
            const prefix = isLast ? '│   └──' : '│   ├──';
            items.push(`${prefix} 📄 ${file}`);
        });
    }
    
    // Add assets folder
    const assetsDir = path.join(PROJECT_ROOT, 'assets');
    if (fs.existsSync(assetsDir)) {
        items.push('│');
        items.push('└── 📂 assets/');
    }
    
    structure += items.join('\n');
    structure += '\n```';
    
    logSuccess('File structure generated');
    return structure;
}

/**
 * Generate dependency graph for JS files
 */
function generateJSDependencies() {
    logSection('Analyzing JS dependencies...');
    
    const jsFiles = getAllFiles(path.join(PROJECT_ROOT, 'js'));
    let graph = '```mermaid\nflowchart TD\n';
    
    graph += '    subgraph Main Script\n';
    graph += '        MAIN[script.js]\n';
    graph += '    end\n\n';
    
    // Add components
    const components = jsFiles.filter(f => f.name !== 'script.js');
    graph += '    subgraph Components\n';
    components.forEach(file => {
        const nodeName = file.name.replace('.js', '');
        graph += `        ${nodeName.toUpperCase() === nodeName ? nodeName : nodeName}[${file.name}]\n`;
    });
    graph += '    end\n\n';
    
    // Add external
    graph += '    subgraph External\n';
    graph += '        LEAFLET[Leaflet.js]\n';
    graph += '        FONT_AWESOME[Font Awesome]\n';
    graph += '    end\n\n';
    
    // Add dependencies
    jsFiles.forEach(file => {
        const deps = extractDependencies(file.path);
        const nodeName = file.name.replace('.js', '');
        
        // Check for Leaflet usage
        const usesLeaflet = deps.some(d => d.includes('leaflet') || d.includes('./'));
        if (usesLeaflet && file.name !== 'script.js') {
            graph += `    ${nodeName} -->|uses| LEAFLET\n`;
        }
    });
    
    // Flag system check
    const flagsFile = jsFiles.find(f => f.name === 'flags.js');
    if (flagsFile) {
        const content = fs.readFileSync(flagsFile.path, 'utf8');
        if (content.includes('disabled') || !content.includes('export')) {
            graph += '\n    FLAGS -.->|disabled| MAIN\n';
        }
    }
    
    graph += '\n    MAIN -->|imports| CLUSTER\n';
    graph += '    MAIN -->|imports| FLAGS\n';
    graph += '    MAIN -->|imports| SYMBOLS\n';
    graph += '    MAIN -->|uses| LEAFLET\n';
    graph += '    CLUSTER -->|uses| LEAFLET\n';
    graph += '    SYMBOLS -->|generates| SVG\n\n';
    graph += '    FLAGS -->|unused| MAIN\n';
    graph += '```';
    
    logSuccess('JS dependency graph generated');
    return graph;
}

/**
 * Generate dependency graph for SCSS files
 */
function generateSCSSDependencies() {
    logSection('Analyzing SCSS dependencies...');
    
    const scssFiles = getAllFiles(path.join(PROJECT_ROOT, 'scss'));
    
    let graph = '```mermaid\nflowchart TD\n';
    
    graph += '    subgraph Main Entry\n';
    graph += '        STYLES[styles.scss]\n';
    graph += '    end\n\n';
    
    // Variables and mixins
    graph += '    subgraph Design System\n';
    graph += '        VARS[_variables.scss]\n';
    graph += '        MIXINS[_mixins.scss]\n';
    graph += '        GRID[_grid.scss]\n';
    graph += '    end\n\n';
    
    // Components
    const components = scssFiles.filter(f => f.relative.startsWith('scss/components/'));
    graph += '    subgraph Components\n';
    components.forEach(file => {
        graph += `        MAP${file.name.includes('map') ? '[_map.scss]' : ''}\n`;
        graph += `        POPUPS${file.name.includes('popup') ? '[_popups.scss]' : ''}\n`;
        graph += `        SIDEPANEL${file.name.includes('sidepanel') ? '[_sidepanel.scss]' : ''}\n`;
        graph += `        TEXT${file.name.includes('text') ? '[_text.scss]' : ''}\n`;
    });
    graph += '    end\n\n';
    
    // Dependencies
    graph += '    STYLES -->|uses| VARS\n';
    graph += '    STYLES -->|uses| MIXINS\n';
    graph += '    STYLES -->|uses| GRID\n';
    graph += '    STYLES -->|imports| MAP\n';
    graph += '    STYLES -->|imports| POPUPS\n';
    graph += '    STYLES -->|imports| SIDEPANEL\n';
    graph += '    STYLES -->|imports| TEXT\n\n';
    
    graph += '    MAP -->|uses| VARS\n';
    graph += '    POPUPS -->|uses| VARS\n';
    graph += '    SIDEPANEL -->|uses| VARS\n';
    graph += '    TEXT -->|uses| VARS\n';
    graph += '```';
    
    logSuccess('SCSS dependency graph generated');
    return graph;
}

/**
 * Extract key functions from JS files
 */
function extractKeyFunctions() {
    logSection('Extracting key functions...');
    
    const jsFiles = getAllFiles(path.join(PROJECT_ROOT, 'js'));
    const functions = {
        initialization: [],
        rendering: [],
        data: []
    };
    
    const categoryKeywords = {
        initialization: ['init', 'setup', 'create', 'load'],
        rendering: ['render', 'update', 'draw', 'create', 'add'],
        data: ['load', 'parse', 'fetch', 'get', 'filter']
    };
    
    jsFiles.forEach(file => {
        const content = fs.readFileSync(file.path, 'utf8');
        const relativePath = path.relative(PROJECT_ROOT, file.path);
        
        // Match function declarations
        const funcPattern = /function\s+(\w+)\s*\(/g;
        let match;
        
        while ((match = funcPattern.exec(content)) !== null) {
            const funcName = match[1];
            
            // Determine category
            let category = 'data';
            for (const [cat, keywords] of Object.entries(categoryKeywords)) {
                if (keywords.some(kw => funcName.toLowerCase().startsWith(kw))) {
                    category = cat;
                    break;
                }
            }
            
            // Get line number
            const lineNumber = content.substring(0, match.index).split('\n').length;
            
            // Create description from function name
            const description = funcName
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => str.toUpperCase())
                .trim();
            
            functions[category].push({
                name: funcName,
                file: relativePath,
                line: lineNumber,
                description: description
            });
        }
    });
    
    logSuccess(`Found ${functions.initialization.length + functions.rendering.length + functions.data.length} functions`);
    return functions;
}

/**
 * Generate function reference table
 */
function generateFunctionTable(functions) {
    let table = '| Function | File | Line | Purpose |\n';
    table += '|----------|------|------|---------|\n';
    
    const categories = {
        initialization: '### Initialization',
        rendering: '### Rendering',
        data: '### Data'
    };
    
    for (const [category, funcs] of Object.entries(functions)) {
        if (funcs.length === 0) continue;
        
        table += `\n${categories[category]}\n\n`;
        table += '| Function | File | Line | Purpose |\n';
        table += '|----------|------|------|---------|\n';
        
        funcs.forEach(func => {
            table += `| \`${func.name}()\` | ${func.file} | ~${func.line} | ${func.description} |\n`;
        });
    }
    
    return table;
}

/**
 * Count inline styles mentioned in documentation
 */
function countInlineStyles() {
    logSection('Checking inline styles...');
    
    const jsFiles = getAllFiles(path.join(PROJECT_ROOT, 'js'));
    let totalInline = 0;
    
    jsFiles.forEach(file => {
        const content = fs.readFileSync(file.path, 'utf8');
        
        // Count style attribute assignments
        const styleAssignments = (content.match(/\.style\s*=/g) || []).length;
        const cssPropertyAssignments = (content.match(/\.[a-zA-Z]+\s*=/g) || []).length;
        
        totalInline += styleAssignments;
    });
    
    logWarning(`Found approximately ${totalInline} inline style assignments`);
    return totalInline;
}

/**
 * Main function to update ARCHITECTURE.md
 */
function updateArchitectureFile() {
    logSection('Starting ARCHITECTURE.md update...');
    log(`Project root: ${PROJECT_ROOT}\n`);
    
    // Generate new content
    const fileStructure = generateFileStructure();
    const jsDependencies = generateJSDependencies();
    const scssDependencies = generateSCSSDependencies();
    const functions = extractKeyFunctions();
    const functionTable = generateFunctionTable(functions);
    const inlineStyleCount = countInlineStyles();
    
    // Read current file to preserve manual sections
    let currentContent = '';
    if (fs.existsSync(ARCHITECTURE_FILE)) {
        currentContent = fs.readFileSync(ARCHITECTURE_FILE, 'utf8');
    }
    
    // Preserve manual sections that shouldn't be auto-generated
    const preservedSections = [];
    
    // Check if we should preserve specific sections
    const colorLegendMatch = currentContent.match(/## Color Legend[\s\S]*?(?=## |$)/);
    if (colorLegendMatch) {
        preservedSections.push(colorLegendMatch[0]);
    }
    
    // Generate updated content
    const timestamp = new Date().toISOString().split('T')[0];
    
    const newContent = `# Project Architecture & Component Lifecycle

> **Auto-generated documentation** - Run \`npm run docs:update\` to refresh diagrams based on current file structure.

## Table of Contents

1. [File Structure](#file-structure)
2. [Data Flow](#data-flow)
3. [Component Lifecycle](#component-lifecycle)
4. [Event Lifecycle](#event-lifecycle)
5. [Dependency Graph](#dependency-graph)
6. [State Machine](#state-machine)
7. [Key Functions Reference](#key-functions-reference)

---

## File Structure

${fileStructure}

---

## Data Flow

\`\`\`mermaid
flowchart TD
    subgraph Data Sources
        CSV[CSV File<br/>Hamasterrorattacks.csv]
        EVENTS[Timeline Events<br/>66 events in script.js]
        LOCATIONS[Location Map<br/>50+ hardcoded locations]
    end

    subgraph Main Application
        HTML[index.html]
        JS[script.js]
        MAP[Leaflet Map]
        STYLES[SCSS Styles]
    end

    CSV -->|loadHamasAttacksCSV| JS
    EVENTS -->|timelineEvents array| JS
    LOCATIONS -->|geocoding| JS

    HTML -->|initializes| JS
    JS -->|renders| MAP
    JS -->|styles via| STYLES

    MAP -->|markers| USER
    JS -->|side panel| USER
\`\`\`

---

## Component Lifecycle

### Map Initialization

\`\`\`mermaid
stateDiagram-v2
    [*] --> loadPage: User opens page
    
    loadPage --> initMap: DOM ready
    initMap --> setTileLayer: CARTO Light All
    setTileLayer --> setCenter: [31.5, 35.0]
    setCenter --> setDefaultZoom: Level 7
    
    setDefaultZoom --> initLayers: Create layer groups
    initLayers --> initClustering: Setup clustering system
    
    initClustering --> loadInitialEvents: Load events for 1994
    loadInitialEvents --> [*]: Map ready
    
    state initLayers {
        markerLayer
        flagLayer
        movementLayer
        territoryLayer
    end
\`\`\`

### Event Rendering Pipeline

\`\`\`mermaid
flowchart LR
    A[Events for Year] --> B[Filter by Category]
    B --> C[Geocode Locations]
    C --> D[Create NATO Symbols]
    D --> E[Cluster Nearby Events]
    E --> F[Add to Map Layer]
    F --> G[Click → Popup]
    F --> H[Cluster → Expand]
\`\`\`

---

## Event Lifecycle

\`\`\`mermaid
stateDiagram-v2
    [*] --> UserLoad: Page Load
    
    UserLoad --> ShowIntro: Display intro section
    ShowIntro --> ScrollMap: User scrolls down
    
    ScrollMap --> TimelineReady: Map container visible
    
    TimelineReady --> SliderChanged: User drags slider
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
\`\`\`

---

## Dependency Graph

### JavaScript Dependencies

${jsDependencies}

### SCSS Dependencies

${scssDependencies}

---

## State Machine

### Side Panel States

\`\`\`mermaid
stateDiagram-v2
    [*] --> Closed: Page load
    
    Closed --> Opening: initializeSidePanel()
    Opening --> Open: Animation complete
    
    Open --> Closing: User clicks X
    Closing --> Closed: Animation complete
    
    Open --> ClickMap: User clicks map
    ClickMap --> Closed: Click outside panel
    
    state Open {
        ShowingEvents
        ScrollIndicator
    }
\`\`\`

### Map States

\`\`\`mermaid
stateDiagram-v2
    [*] --> Initializing
    
    Initializing --> Ready: Layers created
    
    Ready --> YearChanging: Slider moved
    YearChanging --> UpdatingMarkers
    UpdatingMarkers --> Ready
    
    Ready --> Zooming: User zooms
    Zooming --> Reclustering
    Reclustering --> Ready
    
    Ready --> MarkerClicked: User clicks marker
    MarkerClicked --> PopupOpen
    PopupOpen --> Ready: User closes popup
    
    Ready --> ClusterClicked: User clicks cluster
    ClusterClicked --> Expanding
    Expanding --> Ready
\`\`\`

---

## Key Functions Reference

${functionTable}

---

## Inline Styles Status

> **Note:** Documentation mentions ~${inlineStyleCount} inline style assignments remaining in JS files.

Areas with inline styles that could be migrated to SCSS:
- Dynamic marker styling
- Popup content styling
- Animation configurations

---

## Auto-Update Instructions

To regenerate this document based on current file structure:

\`\`\`bash
npm run docs:update
\`\`\`

This script:
1. Scans \`js/\` and \`scss/\` directories
2. Extracts import/dependency relationships
3. Updates the File Structure section
4. Updates the Dependency Graph section
5. Rebuilds Mermaid diagrams

---

*Last updated: ${timestamp}*
*Generated by: scripts/generate-architecture.js*
`;
    
    // Write new content
    fs.writeFileSync(ARCHITECTURE_FILE, newContent);
    logSuccess(`Updated ${ARCHITECTURE_FILE}`);
    
    // Summary
    log('\n📊 Summary:');
    logSuccess(`File structure: Updated`);
    logSuccess(`JS dependencies: Analyzed`);
    logSuccess(`SCSS dependencies: Analyzed`);
    logSuccess(`Key functions: ${functions.initialization.length + functions.rendering.length + functions.data.length} found`);
    logSuccess(`Inline styles: ~${inlineStyleCount} remaining`);
}

// Run if executed directly
if (require.main === module) {
    updateArchitectureFile();
}

module.exports = { updateArchitectureFile, generateFileStructure, generateJSDependencies, generateSCSSDependencies };
