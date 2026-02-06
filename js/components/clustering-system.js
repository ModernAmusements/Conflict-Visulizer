// NATO Military Symbols and Clustering System Integration
// Intensity-based clustering with NATO APP-6 compliance and national flag integration

// Global L variable reference (assuming Leaflet is loaded)
let L = window.L || {};

// Initialize the enhanced military systems when available
let natoSymbolLibrary, flagSystem;

// Enhanced map state with clustering - make globally accessible
window.clusterState = {
    enabled: true,
    showFlags: true,
    clusters: [],
    minClusterSize: 30, // pixels
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
    return `
        <div class="enhanced-popup">
            <h4>${event.title || 'Unknown Event'}</h4>
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

    // Enhanced popup for cluster
    const popupContent = createClusterPopup(cluster);
    marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'cluster-popup'
    });

    return marker;
}

// Create detailed popup for cluster
function createClusterPopup(cluster) {
    const eventsByDate = cluster.events.sort((a, b) => {
        const yearA = getEventYear(a.date);
        const yearB = getEventYear(b.date);
        return yearA - yearB;
    });

    const totalCasualties = cluster.totalCasualties;
    const highIntensityEvents = cluster.events.filter(e => 
        new IntensityClusterer().calculateEventIntensity(e) === 'high'
    ).length;

    let popupHtml = `
        <div class="cluster-popup">
            <h6>Cluster Details (${cluster.events.length} events)</h6>
            <div class="cluster-summary">
                <span class="cluster-stat">
                    Total Casualties: <strong>${totalCasualties}</strong>
                </span>
                <span class="cluster-stat">
                    High Intensity: <strong>${highIntensityEvents}</strong>
                </span>
            </div>
            <div class="cluster-events-list">
    `;

    // Add individual event summaries
    eventsByDate.slice(0, 5).forEach(event => {
        const { affiliation, unitType, nation } = determineMilitaryDetails(event);
        const year = getEventYear(event.date);
        const casualties = new IntensityClusterer().getEventCasualties(event);
        
        popupHtml += `
            <div class="cluster-event-item">
                <div class="cluster-event-title">${event.title}</div>
                <div class="cluster-event-details">
                    <span>${year}</span>
                    <span>${casualties} casualties</span>
                    ${nation ? `<span class="event-flag">${flagSystem.getFlagElement(nation, 16)}</span>` : ''}
                </div>
            </div>
        `;
    });

    if (eventsByDate.length > 5) {
        popupHtml += `
            <div class="cluster-more">
                <em>... and ${eventsByDate.length - 5} more events</em>
            </div>
        `;
    }

    popupHtml += `
            </div>
        </div>
    `;

    popupHtml += '</div>';
    return popupHtml;
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
    const { showFlags = window.clusterState.showFlags, enableClustering = window.clusterState.enabled } = options;

    // Determine affiliation and unit type
    const { affiliation, unitType, nation } = determineMilitaryDetails(event);

    // Calculate size based on zoom level and intensity
    const currentZoom = mapState.map ? mapState.map.getZoom() : 7;
    const baseSize = 20;
    const zoomScale = Math.max(0.5, Math.min(1.5, currentZoom / 7));
    const finalSize = Math.round(baseSize * zoomScale);

    // Get cached symbol with dynamic sizing
    const symbolData = performanceOptimizer.getCachedSymbol(affiliation, unitType, finalSize);
    const flagElement = showFlags && nation ? flagSystem.getFlagElement(nation, Math.round(24 * zoomScale)) : '';

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

    // Enhanced popup for cluster
    const popupContent = createClusterPopup(cluster);
    marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'cluster-popup'
    });

    return marker;
}

// Optimized event marker drawing with performance improvements
function drawAllEventMarkersOptimized(events) {
    if (!mapState.markerLayer) return;

    console.log('🎯 Drawing optimized enhanced military markers...');
    
    const currentZoom = mapState.map.getZoom();
    const shouldCluster = currentZoom < 9 && window.clusterState.enabled;
    
    // Performance optimization: only redraw if zoom changed significantly
    if (Math.abs(currentZoom - performanceOptimizer.lastZoom) < 1) {
        console.log('⏭️ Skipping redraw - zoom change too small');
        return;
    }
    
    performanceOptimizer.lastZoom = currentZoom;
    
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
            
            const marker = createEnhancedMilitaryMarkerOptimized(event, {
                showFlags: window.clusterState.showFlags,
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

    // Initialize enhanced systems with performance optimization and error handling
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Leaflet reference
    L = window.L;
    
    // Wait for original map initialization
    setTimeout(() => {
        // Initialize systems if available
        if (typeof NATOSymbolLibrary !== 'undefined') {
            natoSymbolLibrary = new NATOSymbolLibrary();
        } else {
            console.warn('⚠️ NATO Symbol Library not available');
        }
        
        if (typeof FlagSystem !== 'undefined') {
            flagSystem = new FlagSystem();
        } else {
            console.warn('⚠️ Flag System not available');
        }
        
        if (typeof mapState === 'undefined') {
            console.warn('⚠️ Map State not initialized');
        }
        
        console.log('🎯 Initializing enhanced military systems with performance optimization...');
        setupLeftLegend();
        
        // Replace original marker function with optimized version
        window.drawAllEventMarkers = drawAllEventMarkersOptimized;
        window.createEnhancedMilitaryMarker = createEnhancedMilitaryMarkerOptimized;
        
        console.log('⚡ Performance optimizations enabled');
        
        // Initialize flag legend if flag system is available
        if (flagSystem && flagSystem.generateFlagLegends) {
            console.log('🏳 National flag system initialized');
        } else {
            console.warn('⚠️ National flag system unavailable');
        }
    }, 1000);
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

// Export clustering utilities for global access
window.IntensityClusterer = IntensityClusterer;
window.createEnhancedMilitaryMarker = createEnhancedMilitaryMarkerOptimized;