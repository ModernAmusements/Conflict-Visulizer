// NATO Military Symbols and Clustering System Integration
// Intensity-based clustering with NATO APP-6 compliance and national flag integration

// Global L variable reference (assuming Leaflet is loaded)
let L = window.L || {};

// Initialize the enhanced military systems when available
let natoSymbolLibrary, flagSystem;

// Enhanced map state with clustering - make globally accessible
// Enhanced Military Layer Management System (MIL-STD-2525 compliant)
// Following NATO APP-6 best practices for operational awareness

window.militaryLayers = {
    // Layer visibility states
    visibility: {
        friendly: true,      // Israeli forces
        hostile: true,       // Hamas/Palestinian forces
        neutral: true,       // Egypt, Jordan, Syria, Lebanon
        logistics: true,     // Supply lines, routes
        intel: true,         // Intelligence indicators
        airspace: true,      // Restricted zones
        terrain: true        // Topographic features
    },
    
    // Transparency levels (0-1)
    transparency: {
        friendly: 1.0,
        hostile: 1.0,
        neutral: 0.8,
        logistics: 0.6,
        intel: 0.5,
        airspace: 0.3,
        terrain: 0.5
    },
    
    // Priority Intelligence Requirements (PIR) filter
    priorityFilter: 'all', // 'critical', 'important', 'informational', 'all'
    
    // Uncertainty indicators
    showMetadata: true,
    maxAgeDays: 50000 // Effectively disabled for historical data (50000 days ≈ 137 years)
};

// Military Layer Controller
class MilitaryLayerController {
    constructor() {
        this.layerGroups = {};
        this.initLayerGroups();
    }
    
    initLayerGroups() {
        ['friendly', 'hostile', 'neutral', 'logistics', 'intel', 'airspace', 'terrain'].forEach(layer => {
            if (typeof L !== 'undefined' && window.mapState && window.mapState.map) {
                this.layerGroups[layer] = L.layerGroup().addTo(window.mapState.map);
            }
        });
    }
    
    setVisibility(layer, visible) {
        if (this.layerGroups[layer]) {
            if (visible) {
                window.mapState.map.addLayer(this.layerGroups[layer]);
            } else {
                window.mapState.map.removeLayer(this.layerGroups[layer]);
            }
            window.militaryLayers.visibility[layer] = visible;
        }
    }
    
    setTransparency(layer, alpha) {
        window.militaryLayers.transparency[layer] = alpha;
        // Apply transparency to layer elements
        if (this.layerGroups[layer]) {
            this.layerGroups[layer].getLayers().forEach(marker => {
                if (marker.setOpacity) {
                    marker.setOpacity(alpha);
                }
            });
        }
    }
    
    // Filter events based on PIR priority
    filterByPriority(events) {
        const priority = window.militaryLayers.priorityFilter;
        if (priority === 'all') return events;
        
        return events.filter(event => {
            const priorityLevel = this.getEventPriority(event);
            return priorityLevel <= this.getPriorityLevel(priority);
        });
    }
    
    getEventPriority(event) {
        // Critical: Major operations, high casualties (>50), territorial changes
        if (event.casualties?.totalCasualties > 50 || 
            event.geography?.type === 'territory_change' ||
            event.title?.includes('War') ||
            event.title?.includes('Major')) {
            return 1; // Critical
        }
        // Important: Significant attacks (5-50 casualties), key political events
        if (event.casualties?.totalCasualties >= 5 ||
            event.category === 'political' ||
            event.title?.includes('Operation')) {
            return 2; // Important
        }
        // Informational: Minor incidents, routine activities
        return 3; // Informational
    }
    
    getPriorityLevel(priority) {
        const levels = { 'critical': 1, 'important': 2, 'informational': 3, 'all': 4 };
        return levels[priority] || 4;
    }
    
    // Calculate event age in days
    getEventAgeDays(event) {
        const eventDate = new Date(event.date);
        const now = new Date();
        return Math.floor((now - eventDate) / (1000 * 60 * 60 * 24));
    }
    
    // Get reliability indicator based on data freshness
    getReliabilityIndicator(event) {
        const age = this.getEventAgeDays(event);
        if (age <= 30) return { level: 'fresh', label: 'Fresh', color: '#22c55e' };
        if (age <= 90) return { level: 'recent', label: 'Recent', color: '#eab308' };
        if (age <= 365) return { level: 'aging', label: 'Aging', color: '#f97316' };
        return { level: 'stale', label: 'Historical', color: '#6b7280' };
    }
    
    // Get priority label
    getPriorityLabel(event) {
        const priority = this.getEventPriority(event);
        const labels = { 1: 'CRITICAL', 2: 'IMPORTANT', 3: 'INFO' };
        return labels[priority] || 'INFO';
    }
    
    // Calculate event age in days
    getEventAgeDays(event) {
        const eventDate = new Date(event.date);
        const now = new Date();
        return Math.floor((now - eventDate) / (1000 * 60 * 60 * 24));
    }
    
    // Get reliability indicator based on data freshness
    getReliabilityIndicator(event) {
        const age = this.getEventAgeDays(event);
        if (age <= 30) return { level: 'fresh', label: 'Fresh', color: '#22c55e' };
        if (age <= 90) return { level: 'recent', label: 'Recent', color: '#eab308' };
        if (age <= 365) return { level: 'aging', label: 'Aging', color: '#f97316' };
        return { level: 'stale', label: 'Historical', color: '#6b7280' };
    }
    
    // Get events filtered by age
    filterByAge(events) {
        const maxAge = window.militaryLayers.maxAgeDays;
        const now = new Date();
        
        return events.filter(event => {
            const eventDate = new Date(event.date);
            const daysDiff = (now - eventDate) / (1000 * 60 * 60 * 24);
            return daysDiff <= maxAge;
        });
    }
}

// Initialize layer controller
window.layerController = new MilitaryLayerController();

// Backward-compatible cluster state (used by script.js)
window.clusterState = {
    enabled: true,
    showFlags: true,
    clusters: [],
    minClusterSize: 30,
    currentZoom: 7
};

// Map state reference - use existing mapState without redeclaring
if (typeof mapState !== 'undefined') {
    // Extend existing mapState if needed
    if (!mapState.map) mapState.map = null;
    if (!mapState.markerLayer) mapState.markerLayer = null;
}

// Utility functions
function getEventYear(dateString) {
    if (!dateString) return new Date().getFullYear();
    const date = new Date(dateString);
    return isNaN(date.getFullYear()) ? new Date().getFullYear() : date.getFullYear();
}

function createEnhancedPopup(event) {
    // Get military metadata if layer controller is available
    let metadataHtml = '';
    if (window.layerController) {
        const priority = window.layerController.getPriorityLabel(event);
        const age = window.layerController.getEventAgeDays(event);
        const reliability = window.layerController.getReliabilityIndicator(event);
        
        metadataHtml = `
            <div class="popup-metadata" style="display: flex; gap: 12px; margin: 8px 0; padding: 8px; background: rgba(0,0,0,0.2); border-radius: 4px;">
                <span class="priority-badge" style="background: ${priority === 'CRITICAL' ? '#dc2626' : priority === 'IMPORTANT' ? '#eab308' : '#6b7280'}; color: white; padding: 2px 8px; border-radius: 3px; font-size: 10px; font-weight: bold;">
                    ${priority}
                </span>
                <span class="age-indicator" style="color: ${reliability.color}; font-size: 11px;">
                    Age: ${age} days
                </span>
            </div>
        `;
    }
    
    return `
        <div class="enhanced-popup">
            <h4>${event.title || 'Unknown Event'}</h4>
            ${metadataHtml}
            <p><strong>Date:</strong> ${event.date || 'Unknown'}</p>
            <p><strong>Location:</strong> ${event.geography ? event.geography.placeName || 'Unknown' : 'Unknown'}</p>
            ${event.casualties ? `<p><strong>Casualties:</strong> ${event.casualties.totalCasualties || 0}</p>` : ''}
            ${event.description ? `<p>${event.description}</p>` : ''}
        </div>
    `;
}

function groupEventsByCoordinates(events) {
    const groups = new Map();
    events.forEach(event => {
        if (!event.geography || !event.geography.coordinates) return;
        const key = `${event.geography.coordinates[0]},${event.geography.coordinates[1]}`;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(event);
    });
    return Array.from(groups.values());
}

function getSpiralOffset(index, total) {
    const angle = index * (2 * Math.PI / Math.max(total, 4));
    const radius = Math.min(index * 0.001, 0.01);
    return {
        latOffset: Math.sin(angle) * radius,
        lngOffset: Math.cos(angle) * radius
    };
}

function drawAllEventMarkersWithClustering(events) {
    const clusterer = new IntensityClusterer();
    const currentZoom = mapState.map ? mapState.map.getZoom() : 7;
    const clusters = clusterer.clusterEvents(events, currentZoom);
    
    clusters.forEach(cluster => {
        const marker = createClusterMarker(cluster.events);
        if (marker && mapState.markerLayer) {
            marker.addTo(mapState.markerLayer);
        }
    });
}

// Intensity-based clustering system
class IntensityClusterer {
    constructor() {
        this.clusterThresholds = {
            high: 0.01, // ~1km at zoom 7
            medium: 0.02, // ~2km at zoom 7  
            low: 0.04 // ~4km at zoom 7
        };
    }

    // Calculate cluster key based on coordinates and zoom
    getClusterKey(lat, lng, zoom) {
        const precision = this.getPrecisionForZoom(zoom);
        const latKey = Math.floor(lat / precision) * precision;
        const lngKey = Math.floor(lng / precision) * precision;
        return `${latKey.toFixed(3)},${lngKey.toFixed(3)}`;
    }

    // Get clustering precision based on zoom level
    getPrecisionForZoom(zoom) {
        if (zoom >= 10) return 0.01; // Very tight clustering at high zoom
        if (zoom >= 8) return 0.02; // Medium clustering  
        if (zoom >= 6) return 0.05; // Loose clustering at medium zoom
        return 0.1; // Very loose clustering at low zoom
    }

    // Cluster events based on intensity and location
    clusterEvents(events, zoom) {
        const clusters = new Map();
        const precision = this.getPrecisionForZoom(zoom);

        events.forEach(event => {
            if (!event.geography || !event.geography.coordinates) return;

            const [lat, lng] = event.geography.coordinates;
            const clusterKey = this.getClusterKey(lat, lng, zoom);

            if (!clusters.has(clusterKey)) {
                clusters.set(clusterKey, {
                    coordinates: [lat, lng],
                    events: [],
                    totalIntensity: 0,
                    totalCasualties: 0,
                    maxIntensity: 'low'
                });
            }

            const cluster = clusters.get(clusterKey);
            cluster.events.push(event);

            // Calculate event intensity based on casualties
            const intensity = this.calculateEventIntensity(event);
            const casualties = this.getEventCasualties(event);

            cluster.totalIntensity += intensity;
            cluster.totalCasualties += casualties;

            // Update maximum intensity for styling
            if (this.compareIntensity(intensity, cluster.maxIntensity) > 0) {
                cluster.maxIntensity = intensity;
            }
        });

        return Array.from(clusters.values());
    }

    // Calculate intensity for a single event
    calculateEventIntensity(event) {
        const casualties = this.getEventCasualties(event);
        if (casualties >= 20) return 'high';
        if (casualties >= 5) return 'medium';
        return 'low';
    }

    // Get total casualties from event
    getEventCasualties(event) {
        if (event.casualties && event.casualties.totalCasualties) {
            return event.casualties.totalCasualties;
        }
        return 0;
    }

    // Compare intensity levels
    compareIntensity(int1, int2) {
        const levels = { low: 1, medium: 2, high: 3 };
        return levels[int1] - levels[int2];
    }

    // Get cluster styling based on intensity
    getClusterStyle(cluster) {
        const baseSize = Math.max(30, Math.min(60, 30 + cluster.events.length * 3));
        const intensityLevel = cluster.maxIntensity;

        const styles = {
            high: {
                size: baseSize + 10,
                color: 'rgba(231, 76, 60, 0.8)',
                borderColor: '#e74c3c',
                glowColor: 'rgba(231, 76, 60, 0.5)',
                className: 'high-intensity-cluster'
            },
            medium: {
                size: baseSize + 5,
                color: 'rgba(241, 196, 15, 0.8)',
                borderColor: '#f1c40f',
                glowColor: 'rgba(241, 196, 15, 0.4)',
                className: 'medium-intensity-cluster'
            },
            low: {
                size: baseSize,
                color: 'rgba(46, 204, 113, 0.8)',
                borderColor: '#2ecc71',
                glowColor: 'rgba(46, 204, 113, 0.3)',
                className: 'low-intensity-cluster'
            }
        };

        return styles[intensityLevel] || styles.low;
    }
}

// Enhanced marker creation with NATO symbols and flags
function createEnhancedMilitaryMarker(event, options = {}) {
    const { showFlags = window.clusterState.showFlags, enableClustering = window.clusterState.enabled } = options;

    // Determine affiliation and unit type
    const { affiliation, unitType, nation } = determineMilitaryDetails(event);

    // Create cluster or individual marker
    if (enableClustering && event && event.geography) {
        return createClusterMarker([event]);
    }

    // Create individual NATO symbol with flag
    const symbolData = natoSymbolLibrary.generateSymbol(affiliation, unitType, 'unit');
    const flagElement = showFlags && nation ? flagSystem.getFlagElement(nation, 24) : '';

    const markerHtml = `
        <div class="enhanced-military-marker" 
             data-affiliation="${affiliation}" 
             data-unit-type="${unitType}"
             data-nation="${nation || 'unknown'}">
            <div class="nato-symbol-wrapper">
                ${symbolData.svg}
            </div>
            ${flagElement ? `<div class="flag-badge">${flagElement}</div>` : ''}
        </div>
    `;

    const baseSize = 20;
    const finalSize = baseSize;

    return L.divIcon({
        html: markerHtml,
        className: 'nato-marker-icon',
        iconSize: [finalSize * 2, finalSize * 2],
        iconAnchor: [finalSize, finalSize],
        popupAnchor: [0, -finalSize]
    });
}

// Determine military details from event
function determineMilitaryDetails(event) {
    // Default values
    let affiliation = 'unknown';
    let unitType = 'unknown';
    let nation = 'unknown';

    // Analyze event title and category
    const title = event.title ? event.title.toLowerCase() : '';
    const category = event.category ? event.category.toLowerCase() : '';

    // Determine affiliation based on event details
    if (title.includes('hamas') || title.includes('palestinian')) {
        affiliation = 'hostile'; // From Israeli perspective
        nation = 'palestine';
    } else if (title.includes('idf') || title.includes('israeli')) {
        affiliation = 'friendly'; // Israeli perspective
        nation = 'israel';
    } else if (title.includes('egypt') || title.includes('syria') || title.includes('jordan')) {
        affiliation = 'neutral';
        nation = title.includes('egypt') ? 'egypt' : 
                  title.includes('syria') ? 'syria' : 'jordan';
    }

    // Determine unit type based on event characteristics
    if (event.geography && event.geography.type) {
        const geoType = event.geography.type.toLowerCase();
        
        switch(geoType) {
            case 'attack':
                if (title.includes('bombing') || title.includes('suicide')) {
                    unitType = 'infantry';
                } else if (title.includes('armor') || title.includes('tank')) {
                    unitType = 'armor';
                } else if (title.includes('artillery') || title.includes('mortar')) {
                    unitType = 'artillery';
                } else {
                    unitType = 'infantry';
                }
                break;
            case 'settlement':
                unitType = 'settlement';
                break;
            case 'political':
                unitType = 'headquarters';
                break;
            case 'territory_change':
                unitType = 'checkpoint';
                break;
            case 'social':
                unitType = 'observation_post';
                break;
            default:
                unitType = 'infantry';
        }
    }

    // Special handling for Hamas attacks
    if (title.includes('hamas attack')) {
        affiliation = 'hostile';
        unitType = 'infantry';
        nation = 'palestine';
    }

    return { affiliation, unitType, nation };
}

// Create cluster marker with intensity styling
function createClusterMarker(events) {
    const clusterer = new IntensityClusterer();
    const cluster = clusterer.clusterEvents(events, mapState.map.getZoom())[0];

    if (!cluster) return null;

    const style = clusterer.getClusterStyle(cluster);
    const center = cluster.coordinates;

    const clusterHtml = `
        <div class="cluster-marker ${style.className}"
             style="width: ${style.size}px; height: ${style.size}px;
                    background: ${style.color}; border: 2px solid ${style.borderColor};
                    box-shadow: 0 0 20px ${style.glowColor};">
            <span class="cluster-count">${cluster.events.length}</span>
            ${cluster.maxIntensity === 'high' ? '<div class="pulse-indicator"></div>' : ''}
        </div>
    `;

    const marker = L.marker(center, {
        icon: L.divIcon({
            html: clusterHtml,
            className: 'intensity-cluster',
            iconSize: [style.size, style.size],
            iconAnchor: [style.size/2, style.size/2]
        })
    });

    // Create popup showing first event in card style with button
    const firstEvent = cluster.events[0];
    const popupContent = createEventCardPopup(firstEvent, cluster.events, cluster.coordinates);
    marker.bindPopup(popupContent, {
        maxWidth: 320,
        className: 'military-popup'
    });

    return marker;
}

// Create popup content using event card style
function createEventCardPopup(event, clusterEvents = null, coords = null) {
    const involvedNations = typeof detectInvolvedNations === 'function' ? detectInvolvedNations(event) : [];

    const territory = event.territoryControl ?
        `<div class="event-territory">
            ${event.territoryControl.israeli ? `<div class="territory-item">🇮🇱 Israel: <span>${event.territoryControl.israeli}%</span></div>` : ''}
            ${event.territoryControl.palestinian ? `<div class="territory-item">🇵🇸 Palestine: <span>${event.territoryControl.palestinian}%</span></div>` : ''}
            ${event.territoryControl.hamas ? `<div class="territory-item">⚡ Hamas: <span>${event.territoryControl.hamas}%</span></div>` : ''}
        </div>` : '';

    const casualties = event.casualties ?
        `<div class="event-territory event-territory-compact">
            <div class="territory-item">💀 Killed: <span>${event.casualties.totalKilled || 0}</span></div>
            <div class="territory-item">🏥 Wounded: <span>${event.casualties.totalWounded || 0}</span></div>
        </div>` : '';

    const impact = event.impact ?
        `<div class="event-impact">
            <strong>Impact:</strong> ${event.impact}
        </div>` : '';

    const showAllButton = clusterEvents && clusterEvents.length > 1 && coords ?
        `<button class="show-all-events-btn" data-coords="${coords[0]},${coords[1]}">
            Show all ${clusterEvents.length} events →
        </button>` : '';

    // Store current cluster events by coordinates for button click handler
    if (clusterEvents && clusterEvents.length > 1 && coords) {
        window.clusterEventsMap = window.clusterEventsMap || new Map();
        window.clusterEventsMap.set(`${coords[0]},${coords[1]}`, clusterEvents);
    }

    return `
        <div class="popup-event-card">
            <span class="event-title">${event.title}</span>
            <div class="event-meta">
                <span class="event-date">📅 ${event.date}</span>
                <span class="event-category ${event.category || 'unknown'}">${(event.category || 'unknown').toUpperCase()}</span>
            </div>
            ${event.description ? `<div class="event-description">${event.description}</div>` : ''}
            ${impact}
            ${territory}
            ${casualties}
            ${involvedNations.length > 0 ?
                `<div class="event-territory event-territory-compact">
                    <div class="territory-item">🌍 Involved: ${involvedNations.map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(', ')}</div>
                </div>` : ''}
            ${showAllButton}
        </div>
    `;
}

// Setup enhanced legend controls with complete 1994 NATO symbology
function setupEnhancedLegend() {
    // Initialize systems
    if (!window.NATOSymbolLibrary) {
        console.warn('NATOSymbolLibrary not available');
        return;
    }
    natoSymbolLibrary = new window.NATOSymbolLibrary();
    if (!window.FlagSystem) {
        console.warn('FlagSystem not available');
    } else {
        flagSystem = new window.FlagSystem();
    }
    
    // Find left legend container (from HTML)
    const leftLegendContainer = document.getElementById('left-legend-content');
    if (!leftLegendContainer) {
        console.warn('Left legend container not found');
        return;
    }
    
    // Generate comprehensive NATO legend content
    const natoLegendContent = generateCompleteNATOLegend();
    leftLegendContainer.innerHTML = natoLegendContent;
    
    // Setup interactive controls
    setupLegendControls();
}

// Generate complete 1994 NATO symbology legend
function generateCompleteNATOLegend() {
    const affiliations = [
        { key: 'friendly', name: 'Friendly Forces', color: '#0066CC' },
        { key: 'hostile', name: 'Hostile Forces', color: '#CC0000' },
        { key: 'neutral', name: 'Neutral Forces', color: '#00AA00' },
        { key: 'unknown', name: 'Unknown Forces', color: '#FFAA00' }
    ];
    
    const unitTypes = [
        { key: 'infantry', name: 'Infantry' },
        { key: 'armor', name: 'Armor/Mechanized' },
        { key: 'artillery', name: 'Artillery' },
        { key: 'air_defense', name: 'Air Defense' },
        { key: 'engineers', name: 'Engineers' },
        { key: 'recon', name: 'Reconnaissance' },
        { key: 'headquarters', name: 'Headquarters' },
        { key: 'supply', name: 'Supply/Logistics' },
        { key: 'medical', name: 'Medical' },
        { key: 'military_police', name: 'Military Police' },
        { key: 'checkpoint', name: 'Checkpoint' },
        { key: 'settlement', name: 'Settlement' },
        { key: 'observation_post', name: 'Observation Post' },
        { key: 'attack', name: 'Attack Operation' },
        { key: 'fortification', name: 'Fortification' }
    ];
    
    let legendHTML = `
        <div class="enhanced-nato-legend">
            <div class="legend-header">
                <h4>1994 NATO Military Symbology</h4>
                <button id="legend-toggle" class="legend-toggle">
                    <i class="fas fa-chevron-down"></i>
                </button>
            </div>
            
            <div id="legend-content" class="legend-content">
                <!-- Affiliation Frames -->
                <div class="legend-section">
                    <h5>Affiliation Frames</h5>
                    <div class="symbol-grid">
    `;
    
    // Add affiliation symbols
    affiliations.forEach(affiliation => {
        const symbol = natoSymbolLibrary.generateSymbol(affiliation.key, 'infantry', 'unit');
        legendHTML += `
            <div class="symbol-item">
                <div class="symbol-display">${symbol.svg}</div>
                <span class="symbol-label">${affiliation.name}</span>
            </div>
        `;
    });
    
    legendHTML += `
                    </div>
                </div>
                
                <!-- Unit Types -->
                <div class="legend-section">
                    <h5>Unit Types (Example: Friendly)</h5>
                    <div class="symbol-grid">
    `;
    
    // Add unit type examples
    unitTypes.slice(0, 8).forEach(unitType => {
        const symbol = natoSymbolLibrary.generateSymbol('friendly', unitType.key, 'unit');
        legendHTML += `
            <div class="symbol-item">
                <div class="symbol-display">${symbol.svg}</div>
                <span class="symbol-label">${unitType.name}</span>
            </div>
        `;
    });
    
    legendHTML += `
                    </div>
                </div>
                
                <!-- Unit Size Modifiers -->
                <div class="legend-section">
                    <h5>Unit Size Hierarchy</h5>
                    <div class="symbol-grid">
    `;
    
    const unitSizes = [
        { key: 'squad', name: 'Squad' },
        { key: 'platoon', name: 'Platoon' },
        { key: 'company', name: 'Company' },
        { key: 'battalion', name: 'Battalion' },
        { key: 'brigade', name: 'Brigade' },
        { key: 'division', name: 'Division' }
    ];
    
    unitSizes.forEach(size => {
        const symbol = natoSymbolLibrary.generateSymbol('friendly', 'infantry', 'unit', { size: size.key });
        legendHTML += `
            <div class="symbol-item">
                <div class="symbol-display">${symbol.svg}</div>
                <span class="symbol-label">${size.name}</span>
            </div>
        `;
    });
    
    legendHTML += `
                    </div>
                </div>
                
                <!-- National Forces (Integrated Subsection) -->
                <div class="legend-section">
                    <h5>National Forces</h5>
                    <div class="flags-legend">
                        ${flagSystem ? generateFlagSubsection() : '<p>Flag system not available</p>'}
                    </div>
                </div>
                
                <!-- Control Panel -->
                <div class="legend-controls">
                    <div class="control-row">
                        <button id="toggle-flags" class="control-btn">
                            <i class="fas fa-flag"></i> National Flags
                        </button>
                        <button id="toggle-clustering" class="control-btn">
                            <i class="fas fa-object-group"></i> Clustering
                        </button>
                    </div>
                    <div class="control-row">
                        <button id="reset-view" class="control-btn">
                            <i class="fas fa-home"></i> Reset View
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return legendHTML;
}

// Generate flag subsection for integrated legend
function generateFlagSubsection() {
    if (!flagSystem) return '';
    
    const nations = [
        { key: 'israel', name: 'Israel' },
        { key: 'palestine', name: 'Palestine' },
        { key: 'egypt', name: 'Egypt' },
        { key: 'syria', name: 'Syria' },
        { key: 'jordan', name: 'Jordan' },
        { key: 'lebanon', name: 'Lebanon' },
        { key: 'usa', name: 'United States' },
        { key: 'uk', name: 'United Kingdom' },
        { key: 'un', name: 'United Nations' }
    ];
    
    return nations.map(nation => `
        <div class="flag-legend-item">
            <div class="legend-flag-icon">${flagSystem.getFlagElement(nation.key, 24)}</div>
            <span class="legend-flag-label">${nation.name}</span>
        </div>
    `).join('');
}

// Setup legend control buttons
function setupLegendControls() {
    // Toggle button
    const legendToggle = document.getElementById('legend-toggle');
    const legendContent = document.getElementById('legend-content');
    
    if (legendToggle && legendContent) {
        legendToggle.addEventListener('click', () => {
            legendContent.classList.toggle('collapsed');
            const icon = legendToggle.querySelector('i');
            if (icon) {
                icon.className = legendContent.classList.contains('collapsed') ? 
                    'fas fa-chevron-right' : 'fas fa-chevron-down';
            }
        });
    }
    
    // Control buttons
    const toggleFlagsBtn = document.getElementById('toggle-flags');
    const toggleClusteringBtn = document.getElementById('toggle-clustering');
    const resetViewBtn = document.getElementById('reset-view');
    
    if (toggleFlagsBtn) {
        toggleFlagsBtn.addEventListener('click', () => {
            window.clusterState.showFlags = !window.clusterState.showFlags;
            toggleFlagsBtn.classList.toggle('active', window.clusterState.showFlags);
            if (typeof updateMapForYear === 'function') {
                updateMapForYear(mapState.currentYear);
            }
        });
        toggleFlagsBtn.classList.toggle('active', window.clusterState.showFlags);
    }
    
    if (toggleClusteringBtn) {
        toggleClusteringBtn.addEventListener('click', () => {
            window.clusterState.enabled = !window.clusterState.enabled;
            toggleClusteringBtn.classList.toggle('active', window.clusterState.enabled);
            if (typeof updateMapForYear === 'function') {
                updateMapForYear(mapState.currentYear);
            }
        });
        toggleClusteringBtn.classList.toggle('active', window.clusterState.enabled);
    }
    
    if (resetViewBtn && mapState.map) {
        resetViewBtn.addEventListener('click', () => {
            mapState.map.setView([31.5, 35.0], 7);
        });
    }
}

// Override the original drawAllEventMarkers function
const originalDrawAllEventMarkers = drawAllEventMarkers;
function drawAllEventMarkers(events) {
    // Group events by coordinates for overlapping handling
    const eventGroups = groupEventsByCoordinates(events);
    
    if (window.clusterState.enabled && mapState.map.getZoom() < 9) {
        // Use enhanced clustering system
        drawAllEventMarkersWithClustering(events);
    } else {
        // Use enhanced individual markers with NATO symbols
        eventGroups.forEach(group => {
            group.forEach((event, indexInGroup) => {
                if (!event.geography || !event.geography.coordinates) return;
                
                // Calculate offset for overlapping markers
                const { latOffset, lngOffset } = getSpiralOffset(indexInGroup, group.length);
                const adjustedCoords = [
                    event.geography.coordinates[0] + latOffset,
                    event.geography.coordinates[1] + lngOffset
                ];
                
                const marker = createEnhancedMilitaryMarker(event, {
                    showFlags: window.clusterState.showFlags,
                    enableClustering: false
                });
                
                const leafletMarker = L.marker(adjustedCoords, { icon: marker });
                
                // Enhanced popup content
                const popupContent = createEnhancedPopup(event);
                leafletMarker.bindPopup(popupContent);
                
                leafletMarker.addTo(mapState.markerLayer);
            });
        });
    }
}

// Performance optimization utilities
class PerformanceOptimizer {
    constructor() {
        this.symbolCache = new Map();
        this.clusterCache = new Map();
        this.lastZoom = 0;
        this.debounceTimer = null;
        this.lastDraw = {
            zoom: 0,
            year: null,
            filters: null
        };
    }

    // Cache NATO symbols
    getCachedSymbol(affiliation, unitType, size, modifiers = {}) {
        const key = `${affiliation}-${unitType}-${size}-${JSON.stringify(modifiers)}`;
        
        if (!this.symbolCache.has(key)) {
            if (natoSymbolLibrary && typeof natoSymbolLibrary.generateSymbol === 'function') {
                const symbol = natoSymbolLibrary.generateSymbol(affiliation, unitType, size, modifiers);
                this.symbolCache.set(key, symbol);
            } else {
                // Fallback basic symbol
                const fallbackSymbol = {
                    svg: `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="${size/2}" cy="${size/2}" r="${size/2-2}" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/>
                    </svg>`,
                    size: size
                };
                this.symbolCache.set(key, fallbackSymbol);
            }
        }
        
        return this.symbolCache.get(key);
    }

    // Cache clusters
    getCachedCluster(events, zoom) {
        const eventIds = events.map(e => e.title || e.date).sort().join('|');
        const key = `${eventIds}-${zoom}`;
        
        if (!this.clusterCache.has(key)) {
            const clusterer = new IntensityClusterer();
            const clusters = clusterer.clusterEvents(events, zoom);
            this.clusterCache.set(key, clusters);
        }
        
        return this.clusterCache.get(key);
    }

    // Debounce map updates
    debounceUpdate(callback, delay = 100) {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
        
        this.debounceTimer = setTimeout(() => {
            callback();
            this.debounceTimer = null;
        }, delay);
    }

    // Clear caches when memory gets large
    clearCacheIfNeeded() {
        if (this.symbolCache.size > 1000) {
            this.symbolCache.clear();
            console.log('🧹 Cleared symbol cache for performance');
        }
        
        if (this.clusterCache.size > 500) {
            this.clusterCache.clear();
            console.log('🧹 Cleared cluster cache for performance');
        }
    }
}

// Global performance optimizer
const performanceOptimizer = new PerformanceOptimizer();

// Enhanced marker creation with performance optimization and zoom-based sizing
function createEnhancedMilitaryMarkerOptimized(event, options = {}) {
    const showFlags = options.showFlags !== undefined ? options.showFlags : (window.clusterState?.showFlags ?? true);
    const enableClustering = options.enableClustering !== undefined ? options.enableClustering : (window.clusterState?.enabled ?? true);

    // Determine affiliation and unit type
    const { affiliation, unitType, nation } = determineMilitaryDetails(event);

    // Calculate size based on zoom level and intensity
    const currentZoom = mapState.map ? mapState.map.getZoom() : 7;
    const baseSize = 20;
    const zoomScale = Math.max(0.5, Math.min(1.5, currentZoom / 7));
    const finalSize = Math.round(baseSize * zoomScale);

    // Get cached symbol with dynamic sizing
    const symbolData = performanceOptimizer.getCachedSymbol(affiliation, unitType, finalSize);
    const flagElement = (showFlags && nation && flagSystem) ? flagSystem.getFlagElement(nation, Math.round(24 * zoomScale)) : '';

    const markerHtml = `
        <div class="enhanced-military-marker" 
             data-affiliation="${affiliation}" 
             data-unit-type="${unitType}"
             data-nation="${nation || 'unknown'}"
             style="transform: scale(${zoomScale});">
            <div class="nato-symbol-wrapper">
                ${symbolData.svg}
            </div>
            ${flagElement ? `<div class="flag-badge" style="transform: scale(${zoomScale});">${flagElement}</div>` : ''}
        </div>
    `;

    return L.divIcon({
        html: markerHtml,
        className: 'nato-marker-icon',
        iconSize: [finalSize * 2, finalSize * 2],
        iconAnchor: [finalSize, finalSize],
        popupAnchor: [0, -finalSize]
    });
}

// Optimized cluster marker creation
function createClusterMarkerOptimized(events) {
    if (!mapState || !mapState.map) return null;

    const currentZoom = mapState.map.getZoom();

    // Get cached cluster
    const clusters = performanceOptimizer.getCachedCluster(events, currentZoom);
    if (!clusters || clusters.length === 0) return null;

    const cluster = clusters[0];
    const style = new IntensityClusterer().getClusterStyle(cluster);
    const center = cluster.coordinates;

    const clusterHtml = `
        <div class="cluster-marker ${style.className}"
             style="width: ${style.size}px; height: ${style.size}px;
                    background: ${style.color}; border: 2px solid ${style.borderColor};
                    box-shadow: 0 0 20px ${style.glowColor};">
            <span class="cluster-count">${cluster.events.length}</span>
            ${cluster.maxIntensity === 'high' ? '<div class="pulse-indicator"></div>' : ''}
        </div>
    `;

    const marker = L.marker(center, {
        icon: L.divIcon({
            html: clusterHtml,
            className: 'intensity-cluster',
            iconSize: [style.size, style.size],
            iconAnchor: [style.size/2, style.size/2]
        })
    });

    // Create popup showing first event in card style
    const firstEvent = cluster.events[0];
    const popupContent = createEventCardPopup(firstEvent, cluster.events, cluster.coordinates);
    marker.bindPopup(popupContent, {
        maxWidth: 320,
        className: 'military-popup'
    });

    return marker;
}

// Optimized event marker drawing with performance improvements
function drawAllEventMarkersOptimized(events) {
    console.log('🎯 drawAllEventMarkersOptimized called with', events?.length || 0, 'events');
    
    if (!mapState || !mapState.markerLayer) {
        console.log('⏭️ No marker layer yet');
        return;
    }

    // Clear existing markers before drawing new ones
    mapState.markerLayer.clearLayers();
    console.log('🗑️ Cleared marker layer');

    const currentZoom = mapState.map ? mapState.map.getZoom() : 7;
    const clusterEnabled = window.clusterState ? window.clusterState.enabled : true;
    const shouldCluster = currentZoom < 9 && clusterEnabled;
    const currentYear = mapState.currentYear || 2024;

    console.log(`🎯 Zoom ${currentZoom}, Clustering: ${shouldCluster ? 'ACTIVE' : 'individual markers'}, Year: ${currentYear}`);

    // Apply military layer filters (with fallback)
    if (window.layerController && window.militaryLayers) {
        const priorityFilter = window.militaryLayers.priorityFilter || 'all';
        const maxAge = window.militaryLayers.maxAgeDays || 50000;
        const visibility = window.militaryLayers.visibility || {};
        
        if (priorityFilter !== 'all') {
            events = window.layerController.filterByPriority(events);
        }
        events = events.filter(event => {
            const eventDate = new Date(event.date);
            const now = new Date();
            const daysDiff = (now - eventDate) / (1000 * 60 * 60 * 24);
            if (daysDiff > maxAge) return false;
            
            // Check Event Type filters (Military/Political/Social)
            const isMilitary = event.category === 'military' || event.geography?.type === 'attack';
            const isPolitical = event.category === 'political';
            const isSocial = event.category === 'social';
            
            // Show event if any relevant filter is active
            const showMilitary = mapState.showAttacks !== false;
            const showPolitical = mapState.showPolitical !== false;
            const showSocial = mapState.showSocial !== false;
            
            if (isMilitary && !showMilitary) return false;
            if (isPolitical && !showPolitical) return false;
            if (isSocial && !showSocial) return false;
            
            // If not any of the main categories, show by default (territory, settlements, etc)
            if (!isMilitary && !isPolitical && !isSocial) {
                // These are shown based on other layer settings
            }
            
            // Filter by military layer visibility (forces) - only if affiliation is known
            const { affiliation } = determineMilitaryDetails(event);
            
            if (affiliation === 'friendly' && visibility.friendly === false) return false;
            if (affiliation === 'hostile' && visibility.hostile === false) return false;
            if (affiliation === 'neutral' && visibility.neutral === false) return false;
            
            return true;
        });
        
        console.log(`🎯 After filtering: ${events.length} events (priority: ${priorityFilter}, maxAge: ${maxAge} days, friendly: ${visibility.friendly}, hostile: ${visibility.hostile}, neutral: ${visibility.neutral})`);
    } else {
        // Apply Event Type filters even without military layers
        events = events.filter(event => {
            const isMilitary = event.category === 'military' || event.geography?.type === 'attack';
            const isPolitical = event.category === 'political';
            const isSocial = event.category === 'social';
            
            const showMilitary = mapState.showAttacks !== false;
            const showPolitical = mapState.showPolitical !== false;
            const showSocial = mapState.showSocial !== false;
            
            if (isMilitary && !showMilitary) return false;
            if (isPolitical && !showPolitical) return false;
            if (isSocial && !showSocial) return false;
            
            return true;
        });
    }

    // Track which filters were used - default to true if undefined
    const currentFilters = {
        showAttacks: mapState.showAttacks !== false,
        showPolitical: mapState.showPolitical !== false,
        showSocial: mapState.showSocial !== false,
        showSettlements: mapState.showSettlements !== false,
        showTerritory: mapState.showTerritory !== false,
        priority: window.militaryLayers?.priorityFilter || 'all',
        maxAge: window.militaryLayers?.maxAgeDays || 50000,
        friendly: window.militaryLayers?.visibility?.friendly ?? true,
        hostile: window.militaryLayers?.visibility?.hostile ?? true,
        neutral: window.militaryLayers?.visibility?.neutral ?? true
    };

    // Performance optimization: only skip if zoom, year, AND filters unchanged
    const lastDraw = performanceOptimizer.lastDraw || {};
    const filtersChanged = JSON.stringify(currentFilters) !== JSON.stringify(lastDraw.filters);

    if (Math.abs(currentZoom - (lastDraw.zoom || 0)) < 1 && 
        currentYear === lastDraw.year && 
        !filtersChanged) {
        console.log('⏭️ Skipping redraw - no changes detected');
        return;
    }

    console.log('🎯 Drawing optimized markers:', events.length, 'events, clustering:', shouldCluster);

    performanceOptimizer.lastDraw = { 
        zoom: currentZoom, 
        year: currentYear,
        filters: currentFilters
    };

    if (shouldCluster) {
        // Use optimized clustering system
        const clusterer = new IntensityClusterer();
        const clusters = clusterer.clusterEvents(events, currentZoom);
        console.log(`📊 Created ${clusters.length} clusters from ${events.length} events`);
        
        clusters.forEach(cluster => {
            const marker = createClusterMarkerOptimized(cluster.events);
            if (marker) {
                marker.addTo(mapState.markerLayer);
            }
        });
    } else {
        // Draw individual markers with optimized symbol generation
        events.forEach(event => {
            if (!event.geography || !event.geography.coordinates) return;
            
            const showFlags = window.clusterState ? window.clusterState.showFlags : true;
            
            const marker = createEnhancedMilitaryMarkerOptimized(event, {
                showFlags: showFlags,
                enableClustering: false
            });
            
            const leafletMarker = L.marker(
                event.geography.coordinates,
                { icon: marker }
            );
            
            // Enhanced popup content
            const popupContent = createEnhancedPopup(event);
            leafletMarker.bindPopup(popupContent);
            
            leafletMarker.addTo(mapState.markerLayer);
        });
    }
    
    // Clear cache if needed
    performanceOptimizer.clearCacheIfNeeded();
}

    // Initialize enhanced systems with performance optimization
function initializeClusteringSystem() {
    L = window.L;
    
    if (typeof NATOSymbolLibrary !== 'undefined') {
        natoSymbolLibrary = new NATOSymbolLibrary();
    }
    
    if (typeof FlagSystem !== 'undefined') {
        flagSystem = new FlagSystem();
    }
    
    setupLeftLegend();
    
    console.log('🎯 Enhanced military systems initialized');
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initializeClusteringSystem();
    
    // Override drawAllEventMarkers immediately since clustering is our primary mode
    if (typeof drawAllEventMarkersOptimized === 'function') {
        window.drawAllEventMarkers = drawAllEventMarkersOptimized;
        console.log('⚡ Clustering optimization active - drawAllEventMarkers overridden');
    }
});

    // Setup left legend for NATO symbols
function setupLeftLegend() {
    const leftLegendContent = document.getElementById('left-legend-content');
    if (leftLegendContent && flagSystem && typeof flagSystem.generateFlagLegends === 'function') {
        const flagsHTML = flagSystem.generateFlagLegends();
        if (flagsHTML && flagsHTML.trim() !== '') {
            leftLegendContent.innerHTML = flagsHTML;
        } else {
            leftLegendContent.innerHTML = '<div class="error-message" style="padding: 15px; background: rgba(231, 76, 60, 0.2); border-radius: 4px; text-align: center; color: white; font-size: 12px;">⚠️ Nation flags temporarily unavailable</div>';
        }
    }
}

// Generate legacy dropdown options content
function generateLegacyDropdownOptions() {
    return `
        <select class="legacy-dropdown">
            <option value="territory">Territory Control</option>
            <option value="military">Military Factions</option>
            <option value="events">Event Types</option>
        </select>
    `;
}

// Get all events within radius of coordinates
function getNearbyEvents(coordinates, radius = 0.02) {
    const allEvents = typeof getFilteredEventsForYear === 'function'
        ? getFilteredEventsForYear(window.mapState?.currentYear || mapState?.currentYear || 2023)
        : (typeof getAllTimelineEvents === 'function' ? getAllTimelineEvents() : []);
    const [lat, lng] = coordinates;

    return allEvents.filter(event => {
        if (!event.geography || !event.geography.coordinates) {
            return false;
        }

        const [eventLat, eventLng] = event.geography.coordinates;
        const latDiff = Math.abs(eventLat - lat);
        const lngDiff = Math.abs(eventLng - lng);

        return latDiff <= radius && lngDiff <= radius;
    });
}

// Export clustering utilities for global access
window.IntensityClusterer = IntensityClusterer;
window.createEnhancedMilitaryMarker = createEnhancedMilitaryMarkerOptimized;
window.drawAllEventMarkersOptimized = drawAllEventMarkersOptimized;
window.getNearbyEvents = getNearbyEvents;