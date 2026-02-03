const timelineEvents = [
    // Early Period (1900-1947)
    {
        date: "1900-1917",
        title: "Early Zionist Immigration",
        description: "First and Second Aliyah waves bring Jewish immigrants to Palestine, then part of Ottoman Empire. Early tensions begin over land and resources.",
        category: "social",
        era: "1900-1947",
        impact: "Sets the foundation for competing national aspirations in the same territory.",
        geography: {
            type: "settlement",
            coordinates: [31.7683, 35.2137],
            affectedArea: [[31.5, 34.8], [32.2, 35.5]],
            intensity: "low",
            icon: "settlement"
        },
        territoryControl: { israeli: 5, palestinian: 95 }
    },
    {
        date: "1917",
        title: "Balfour Declaration",
        description: "British government declares support for establishment of 'national home for the Jewish people' in Palestine, while protecting rights of existing non-Jewish communities.",
        category: "political",
        era: "1900-1947",
        impact: "International recognition of Zionist goals creates tension with Arab population.",
        geography: {
            type: "political",
            coordinates: [31.7683, 35.2137],
            affectedArea: [[31.2, 34.8], [32.2, 35.5]],
            intensity: "medium",
            icon: "declaration"
        },
        territoryControl: { israeli: 6, palestinian: 94 }
    },
    {
        date: "1920-1939",
        title: "Arab Revolts and Growing Tensions",
        description: "Multiple Arab uprisings against Jewish immigration and British rule. 1936-1939 Arab Revolt is particularly significant.",
        category: "military",
        era: "1900-1947",
        impact: "Violent conflicts establish pattern of resistance and counter-resistance.",
        geography: {
            type: "attack",
            coordinates: [32.2222, 35.2544],
            affectedArea: [[31.7, 34.9], [32.5, 35.4]],
            intensity: "medium",
            icon: "rebellion"
        },
        territoryControl: { israeli: 8, palestinian: 92 }
    },
    {
        date: "1947",
        title: "UN Partition Plan",
        description: "UN proposes dividing Palestine into separate Jewish and Arab states, with Jerusalem under international administration.",
        category: "political",
        era: "1900-1947",
        impact: "Jewish leadership accepts, Arab leadership rejects - setting stage for war.",
        geography: {
            type: "border",
            coordinates: [31.7683, 35.2137],
            affectedArea: [[31.2, 34.2], [32.5, 35.6]],
            intensity: "high",
            icon: "partition"
        },
        territoryControl: { israeli: 55, palestinian: 45 }
    },

    // Formation & Early Wars (1948-1966)
    {
        date: "1948",
        title: "Israeli Declaration of Independence & War",
        description: "Israel declares independence on May 14. Arab states invade, leading to 1948 Arab-Israeli War. 750,000 Palestinians displaced (Nakba).",
        category: "military",
        era: "1948-1966",
        impact: "Establishes Israel as a state, creates Palestinian refugee crisis, defines regional conflict.",
        geography: {
            type: "attack",
            coordinates: [32.0833, 34.7667],
            affectedArea: [[31.0, 34.0], [33.0, 35.8]],
            intensity: "high",
            icon: "war"
        },
        territoryControl: { israeli: 78, palestinian: 22 }
    },
    {
        date: "1956",
        title: "Suez Crisis",
        description: "Israel, UK, and France attack Egypt over Suez Canal. Israel gains access to Straits of Tiran.",
        category: "military",
        era: "1948-1966",
        impact: "Demonstrates Israel's military capability and regional dynamics.",
        geography: {
            type: "attack",
            coordinates: [29.5500, 34.9500],
            affectedArea: [[29.0, 34.0], [30.5, 35.5]],
            intensity: "medium",
            icon: "military"
        },
        territoryControl: { israeli: 78, palestinian: 22 }
    },

    // Occupation & Rise of Resistance (1967-1986)
    {
        date: "1967",
        title: "Six-Day War",
        description: "Israel launches preemptive strike against Egypt, Jordan, Syria. Captures West Bank, Gaza, East Jerusalem, Golan Heights, Sinai.",
        category: "military",
        era: "1967-1986",
        impact: "Israeli occupation of Palestinian territories begins, setting stage for future resistance movements.",
        geography: {
            type: "territory_change",
            coordinates: [31.7683, 35.2137],
            affectedArea: [[29.5, 34.2], [33.5, 35.8]],
            intensity: "high",
            icon: "conquest"
        },
        territoryControl: { israeli: 85, palestinian: 15 }
    },
    {
        date: "1973",
        title: "Yom Kippur War",
        description: "Egypt and Syria launch surprise attack on Israel. Initial Arab successes, eventual Israeli counterattack.",
        category: "military",
        era: "1967-1986",
        impact: "Leads to peace process, but also strengthens hardline positions on both sides.",
        geography: {
            type: "attack",
            coordinates: [31.2500, 34.2500],
            affectedArea: [[29.5, 32.5], [33.0, 35.8]],
            intensity: "high",
            icon: "war"
        },
        territoryControl: { israeli: 85, palestinian: 15 }
    },
    {
        date: "1967-1987",
        title: "Early Palestinian Resistance",
        description: "PLO becomes dominant Palestinian organization. Various resistance groups form, including early Islamic resistance movements.",
        category: "political",
        era: "1967-1986",
        impact: "Establishes organized Palestinian resistance against Israeli occupation.",
        geography: {
            type: "political",
            coordinates: [31.9522, 35.2332],
            affectedArea: [[31.7, 35.0], [32.2, 35.4]],
            intensity: "medium",
            icon: "resistance"
        },
        territoryControl: { israeli: 85, palestinian: 15 }
    },

    // First Intifada & Hamas Formation (1987-2005)
    {
        date: "1987",
        title: "First Intifada Begins",
        description: "Palestinian uprising against Israeli occupation begins in Gaza and spreads to West Bank. Mass protests, strikes, and civil disobedience.",
        category: "social",
        era: "1987-2005",
        impact: "Shifts Palestinian resistance to popular uprising, draws international attention.",
        geography: {
            type: "social",
            coordinates: [31.5000, 34.4500],
            affectedArea: [[31.2, 34.2], [31.8, 35.6]],
            intensity: "high",
            icon: "uprising"
        },
        territoryControl: { israeli: 85, palestinian: 15 }
    },
    {
        date: "1987",
        title: "Hamas Founded",
        description: "Sheikh Ahmed Yassin establishes Hamas as an offshoot of Muslim Brotherhood. Initially focused on social welfare and education.",
        category: "political",
        era: "1987-2005",
        impact: "Introduces Islamic resistance movement with both political and military wings.",
        geography: {
            type: "political",
            coordinates: [31.3899, 34.3428],
            affectedArea: [[31.2, 34.2], [31.6, 34.5]],
            intensity: "medium",
            icon: "formation"
        },
        territoryControl: { israeli: 85, palestinian: 15 }
    },
    {
        date: "1988",
        title: "Hamas Charter Published",
        description: "Hamas releases its founding charter calling for destruction of Israel and establishment of Islamic state in all of historic Palestine.",
        category: "political",
        era: "1987-2005",
        impact: "Establishes Hamas's uncompromising ideological position against Israel's existence.",
        geography: {
            type: "political",
            coordinates: [31.3899, 34.3428],
            affectedArea: [[31.2, 34.2], [31.6, 34.5]],
            intensity: "medium",
            icon: "charter"
        },
        territoryControl: { israeli: 85, palestinian: 15 }
    },
    {
        date: "1993",
        title: "Oslo Accords",
        description: "Israel and PLO sign peace agreement. Hamas opposes accord, escalates attacks against Israeli civilians.",
        category: "political",
        era: "1987-2005",
        impact: "Creates division between secular Palestinian leadership and Hamas opposition.",
        geography: {
            type: "political",
            coordinates: [32.0853, 34.7818],
            affectedArea: [[31.5, 34.5], [32.5, 35.2]],
            intensity: "medium",
            icon: "peace"
        },
        territoryControl: { israeli: 85, palestinian: 15 }
    },
    {
        date: "1994-2000",
        title: "Hamas Suicide Bombing Campaign",
        description: "Hamas conducts series of suicide bombings targeting Israeli civilians, particularly during Second Intifada period.",
        category: "military",
        era: "1987-2005",
        impact: "Demonstrates Hamas's tactical evolution and commitment to armed struggle.",
        geography: {
            type: "attack",
            coordinates: [32.0853, 34.7818],
            affectedArea: [[31.7, 34.5], [32.3, 35.0]],
            intensity: "high",
            icon: "bombing"
        },
        territoryControl: { israeli: 85, palestinian: 15 }
    },
    {
        date: "2000",
        title: "Second Intifada Begins",
        description: "After failure of Camp David talks, Palestinians launch Second Intifada. Hamas becomes major armed resistance group.",
        category: "military",
        era: "1987-2005",
        impact: "Extremely violent period with thousands dead on both sides, hardens positions.",
        geography: {
            type: "attack",
            coordinates: [31.7683, 35.2137],
            affectedArea: [[31.5, 34.8], [32.5, 35.5]],
            intensity: "high",
            icon: "uprising"
        },
        territoryControl: { israeli: 85, palestinian: 15 }
    },

    // Gaza Conflicts & Wars (2006-2023)
    {
        date: "2005",
        title: "Israel Disengages from Gaza",
        description: "Israel removes settlements and military from Gaza, but maintains control over borders, airspace, and waters.",
        category: "political",
        era: "2006-2023",
        impact: "Hamas claims victory, but Gaza remains under Israeli control and blockade.",
        geography: {
            type: "territory_change",
            coordinates: [31.3899, 34.3428],
            affectedArea: [[31.2, 34.2], [31.6, 34.5]],
            intensity: "medium",
            icon: "disengagement"
        },
        territoryControl: { israeli: 85, palestinian: 15 }
    },
    {
        date: "2006",
        title: "Hamas Wins Palestinian Elections",
        description: "Hamas wins parliamentary elections, surprising international community. Israel and West cut off aid to Palestinian Authority.",
        category: "political",
        era: "2006-2023",
        impact: "Creates political crisis and leads to Hamas-Fatah conflict.",
        geography: {
            type: "political",
            coordinates: [31.9522, 35.2332],
            affectedArea: [[31.7, 35.0], [32.2, 35.4]],
            intensity: "medium",
            icon: "election"
        },
        territoryControl: { israeli: 85, palestinian: 15 }
    },
    {
        date: "2007",
        title: "Hamas Takes Control of Gaza",
        description: "Hamas forces Fatah out of Gaza in violent conflict. Israel and Egypt impose blockade on Gaza.",
        category: "military",
        era: "2006-2023",
        impact: "Divides Palestinian territories politically, creates open-air prison conditions in Gaza.",
        geography: {
            type: "territory_change",
            coordinates: [31.3899, 34.3428],
            affectedArea: [[31.2, 34.2], [31.6, 34.5]],
            intensity: "high",
            icon: "hamas_control"
        },
        territoryControl: { israeli: 85, palestinian: 15, hamas: 2 }
    },
    {
        date: "2008-2009",
        title: "First Gaza War (Cast Lead)",
        description: "Israel launches major military operation in response to Hamas rocket fire. 1,400 Palestinians and 13 Israelis killed.",
        category: "military",
        era: "2006-2023",
        impact: "Establishes pattern of periodic large-scale conflicts between Israel and Hamas.",
        geography: {
            type: "attack",
            coordinates: [31.3899, 34.3428],
            affectedArea: [[31.2, 34.2], [31.6, 34.5]],
            intensity: "high",
            icon: "war"
        },
        territoryControl: { israeli: 85, palestinian: 15, hamas: 2 }
    },
    {
        date: "2012",
        title: "Operation Pillar of Defense",
        description: "Israeli operation targeting Hamas rocket capabilities. Ahmed Jabari, Hamas military commander, killed.",
        category: "military",
        era: "2006-2023",
        impact: "Demonstrates Israel's intelligence capabilities and targeted killing strategy.",
        geography: {
            type: "attack",
            coordinates: [31.3899, 34.3428],
            affectedArea: [[31.2, 34.2], [31.6, 34.5]],
            intensity: "high",
            icon: "military"
        },
        territoryControl: { israeli: 85, palestinian: 15, hamas: 2 }
    },
    {
        date: "2014",
        title: "Operation Protective Edge",
        description: "50-day war between Israel and Hamas. 2,251 Palestinians and 73 Israelis killed. Massive destruction in Gaza.",
        category: "military",
        era: "2006-2023",
        impact: "One of deadliest conflicts, leads to international investigations and criticism.",
        geography: {
            type: "attack",
            coordinates: [31.3899, 34.3428],
            affectedArea: [[31.2, 34.2], [31.6, 34.5]],
            intensity: "high",
            icon: "war"
        },
        territoryControl: { israeli: 85, palestinian: 15, hamas: 2 }
    },
    {
        date: "2018-2019",
        title: "Great March of Return",
        description: "Palestinian protests along Gaza border. Israeli forces kill over 200 protesters, including medics and journalists.",
        category: "social",
        era: "2006-2023",
        impact: "International criticism of Israel's use of live fire against civilian protesters.",
        geography: {
            type: "social",
            coordinates: [31.3500, 34.3000],
            affectedArea: [[31.2, 34.2], [31.5, 34.4]],
            intensity: "medium",
            icon: "protest"
        },
        territoryControl: { israeli: 85, palestinian: 15, hamas: 2 }
    },
    {
        date: "2021",
        title: "Gaza War and Jerusalem Tensions",
        description: "Conflict sparked by Jerusalem evictions and Al-Aqsa clashes. Hamas fires rockets, Israel responds with airstrikes.",
        category: "military",
        era: "2006-2023",
        impact: "Shows interconnection between Jerusalem issues and Gaza conflicts.",
        geography: {
            type: "attack",
            coordinates: [31.7683, 35.2137],
            affectedArea: [[31.2, 34.2], [32.5, 35.8]],
            intensity: "high",
            icon: "war"
        },
        territoryControl: { israeli: 85, palestinian: 15, hamas: 2 }
    },

    // Recent Developments (2024-2025)
    {
        date: "October 7, 2023",
        title: "October 7 Hamas Attack",
        description: "Hamas launches unprecedented attack on Israel, killing 1,200 people and taking 250 hostages. Largest single-day attack on Israel.",
        category: "military",
        era: "2024-2025",
        impact: "Triggers major regional conflict and humanitarian crisis in Gaza.",
        geography: {
            type: "attack",
            coordinates: [31.3525, 34.3050],
            affectedArea: [[31.2, 34.2], [32.0, 35.0]],
            intensity: "high",
            icon: "major_attack"
        },
        territoryControl: { israeli: 85, palestinian: 15, hamas: 2 }
    },
    {
        date: "2023-2024",
        title: "Gaza War and Humanitarian Crisis",
        description: "Israel launches extensive military operation in Gaza. Over 30,000 Palestinians killed, massive displacement and infrastructure destruction.",
        category: "military",
        era: "2024-2025",
        impact: "Creates worst humanitarian crisis in Gaza's history, international pressure for ceasefire.",
        geography: {
            type: "attack",
            coordinates: [31.3899, 34.3428],
            affectedArea: [[31.0, 34.0], [31.6, 34.5]],
            intensity: "high",
            icon: "war"
        },
        territoryControl: { israeli: 85, palestinian: 15, hamas: 2 }
    },
    {
        date: "2024",
        title: "International Court Cases and Diplomacy",
        description: "ICJ orders Israel to prevent genocide in Gaza. South Africa brings case. International diplomatic efforts intensify.",
        category: "political",
        era: "2024-2025",
        impact: "Signifies growing international legal and diplomatic pressure on conflict parties.",
        geography: {
            type: "political",
            coordinates: [32.0853, 34.7818],
            affectedArea: [[31.5, 34.5], [32.5, 35.2]],
            intensity: "medium",
            icon: "legal"
        },
        territoryControl: { israeli: 85, palestinian: 15, hamas: 2 }
    },
    {
        date: "2025",
        title: "Ongoing Conflict and Regional Implications",
        description: "Conflict continues with regional spillover in Lebanon, Syria, Yemen. Ceasefire negotiations ongoing, humanitarian crisis persists.",
        category: "political",
        era: "2024-2025",
        impact: "Demonstrates how Israel-Hamas conflict affects broader Middle East stability.",
        geography: {
            type: "political",
            coordinates: [31.7683, 35.2137],
            affectedArea: [[29.0, 34.0], [35.0, 36.0]],
            intensity: "medium",
            icon: "regional"
        },
        territoryControl: { israeli: 85, palestinian: 15, hamas: 2 }
    }
];

// Strategic Map Variables
let mapContainer;
let mapState = {
    currentYear: 1900,
    isPlaying: false,
    playInterval: null,
    showAttacks: true,
    showPolitical: true,
    showSocial: true,
    showTerritory: true,
    showSettlements: true,
    showCities: true,
    playSpeed: 1000,
    map: null,
    territoryLayer: null,
    markerLayer: null,
    cityLayer: null
};

// Initialize the timeline
function initializeTimeline() {
    const timelineContainer = document.getElementById('timeline');
    
    // Clear existing content
    timelineContainer.innerHTML = '';
    
    // Create timeline events
    timelineEvents.forEach((event, index) => {
        const eventElement = createTimelineEvent(event, index);
        timelineContainer.appendChild(eventElement);
    });
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize map
    initializeMap();
    
    // Add scroll animations
    observeTimelineEvents();
}

function createTimelineEvent(event, index) {
    const eventDiv = document.createElement('div');
    eventDiv.className = `timeline-event ${event.category}`;
    eventDiv.dataset.era = event.era;
    eventDiv.dataset.category = event.category;
    
    eventDiv.innerHTML = `
        <div class="event-marker"></div>
        <div class="event-content">
            <div class="event-date">${event.date}</div>
            <h3 class="event-title">${event.title}</h3>
            <p class="event-description">${event.description}</p>
            <div class="event-impact">
                <strong>Impact:</strong> ${event.impact}
            </div>
        </div>
    `;
    
    // Add animation delay
    eventDiv.style.animationDelay = `${index * 0.1}s`;
    
    return eventDiv;
}

function setupEventListeners() {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter events
            const filter = this.id.replace('filter-', '');
            filterTimeline(filter);
        });
    });
    
    // Era selector
    const eraSelect = document.getElementById('era-select');
    if (eraSelect) {
        eraSelect.addEventListener('change', function() {
            filterByEra(this.value);
        });
    }
}

function filterTimeline(filter) {
    const events = document.querySelectorAll('.timeline-event');
    
    events.forEach(event => {
        if (filter === 'all') {
            event.classList.remove('hidden');
        } else {
            event.classList.toggle('hidden', event.dataset.category !== filter);
        }
    });
}

function filterByEra(era) {
    const events = document.querySelectorAll('.timeline-event');
    
    events.forEach(event => {
        if (era === 'all') {
            event.classList.remove('hidden');
        } else {
            event.classList.toggle('hidden', event.dataset.era !== era);
        }
    });
}

function observeTimelineEvents() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1
    });
    
    const events = document.querySelectorAll('.timeline-event');
    events.forEach(event => {
        event.style.animationPlayState = 'paused';
        observer.observe(event);
    });
}

// Initialize Strategic Map
function initializeMap() {
    mapContainer = document.getElementById('map');
    
    // Check if Leaflet is available
    if (typeof L === 'undefined') {
        console.error('Leaflet library not loaded');
        return;
    }
    
    // Create actual Leaflet map
    mapState.map = L.map('map').setView([31.5, 35.0], 7);
    
    // Add dark military-style tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(mapState.map);
    
    // Add military grid overlay
    addMilitaryGrid();
    
    // Add legend
    addMapLegend();
    
    setupMapControls();
    updateMapForYear(1900);
}

// Add military grid overlay
function addMilitaryGrid() {
    const gridLayer = L.layerGroup();
    
    // Create grid lines
    for (let lat = 29; lat <= 33; lat += 0.5) {
        L.polyline([[lat, 34], [lat, 36]], {
            color: 'rgba(255,255,255,0.1)',
            weight: 1,
            dashArray: '5, 5'
        }).addTo(gridLayer);
    }
    
    for (let lng = 34; lng <= 36; lng += 0.5) {
        L.polyline([[29, lng], [33, lng]], {
            color: 'rgba(255,255,255,0.1)',
            weight: 1,
            dashArray: '5, 5'
        }).addTo(gridLayer);
    }
    
    gridLayer.addTo(mapState.map);
}

// Add comprehensive map legend
function addMapLegend() {
    const legend = L.control({ position: 'topright' });
    
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'map-legend');
        div.innerHTML = `
            <div style="background: rgba(44, 62, 80, 0.95); padding: 12px; border-radius: 8px; color: white; font-size: 11px; min-width: 180px;">
                <div style="margin-bottom: 8px; font-weight: bold; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 5px;">TERRITORY CONTROL</div>
                <div style="display: flex; align-items: center; margin-bottom: 4px;">
                    <div style="width: 12px; height: 12px; background: rgba(52, 152, 219, 0.3); border: 2px solid rgba(52, 152, 219, 0.7); margin-right: 5px;"></div>
                    <span>Israeli Control</span>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 4px;">
                    <div style="width: 12px; height: 12px; background: rgba(155, 89, 182, 0.3); border: 2px solid rgba(155, 89, 182, 0.7); margin-right: 5px;"></div>
                    <span>Palestinian Control</span>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 4px;">
                    <div style="width: 12px; height: 12px; background: rgba(231, 76, 60, 0.4); border: 2px solid rgba(231, 76, 60, 0.8); margin-right: 5px;"></div>
                    <span>Hamas Control</span>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 6px;">
                    <div style="width: 12px; height: 12px; background: rgba(255, 165, 0, 0.3); border: 2px dashed rgba(255, 165, 0, 0.7); margin-right: 5px;"></div>
                    <span>Occupied Areas</span>
                </div>
                <div style="margin-bottom: 6px; font-weight: bold; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 5px;">EVENT MARKERS</div>
                <div style="display: flex; align-items: center; margin-bottom: 4px;">
                    <div style="width: 12px; height: 12px; background: #e74c3c; border: 2px solid white; border-radius: 50%; margin-right: 5px;"></div>
                    <span>Military/Attack</span>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 4px;">
                    <div style="width: 12px; height: 12px; background: #9b59b6; border: 2px solid white; border-radius: 50%; margin-right: 5px;"></div>
                    <span>Political Events</span>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 4px;">
                    <div style="width: 12px; height: 12px; background: #f39c12; border: 2px solid white; border-radius: 50%; margin-right: 5px;"></div>
                    <span>Social Events</span>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 4px;">
                    <div style="width: 12px; height: 12px; background: #3498db; border: 1px solid white; border-radius: 50%; margin-right: 5px;"></div>
                    <span>Settlements</span>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 4px;">
                    <div style="width: 12px; height: 12px; background: #27ae60; border: 2px solid white; border-radius: 50%; margin-right: 5px;"></div>
                    <span>Territory Changes</span>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 6px;">
                    <div style="width: 12px; height: 12px; background: #f39c12; border: 2px solid white; border-radius: 50%; margin-right: 5px;"></div>
                    <span>Major Cities</span>
                </div>
                <div style="margin-top: 8px; font-weight: bold; text-align: center; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 5px; font-size: 10px;">
                    Total Events: ${timelineEvents.length}
                </div>
            </div>
        `;
        return div;
    };
    
    legend.addTo(mapState.map);
}

// Setup map control listeners
function setupMapControls() {
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const timelineSlider = document.getElementById('timeline-slider');
    const speedSelect = document.getElementById('speed-select');
    
    if (playBtn) playBtn.addEventListener('click', startMapAnimation);
    if (pauseBtn) pauseBtn.addEventListener('click', pauseMapAnimation);
    if (timelineSlider) timelineSlider.addEventListener('input', handleSliderChange);
    if (speedSelect) speedSelect.addEventListener('change', handleSpeedChange);
    
    // Layer controls - handle all event types
    const showAttacks = document.getElementById('show-attacks');
    const showPolitical = document.getElementById('show-political');
    const showSocial = document.getElementById('show-social');
    const showTerritory = document.getElementById('show-territory');
    const showSettlements = document.getElementById('show-settlements');
    const showCities = document.getElementById('show-cities');
    
    if (showAttacks) {
        showAttacks.addEventListener('change', (e) => {
            mapState.showAttacks = e.target.checked;
            updateMapForYear(mapState.currentYear);
        });
    }
    
    if (showPolitical) {
        showPolitical.addEventListener('change', (e) => {
            mapState.showPolitical = e.target.checked;
            updateMapForYear(mapState.currentYear);
        });
    }
    
    if (showSocial) {
        showSocial.addEventListener('change', (e) => {
            mapState.showSocial = e.target.checked;
            updateMapForYear(mapState.currentYear);
        });
    }
    
    if (showTerritory) {
        showTerritory.addEventListener('change', (e) => {
            mapState.showTerritory = e.target.checked;
            updateMapForYear(mapState.currentYear);
        });
    }
    
    if (showSettlements) {
        showSettlements.addEventListener('change', (e) => {
            mapState.showSettlements = e.target.checked;
            updateMapForYear(mapState.currentYear);
        });
    }
    
    if (showCities) {
        showCities.addEventListener('change', (e) => {
            mapState.showCities = e.target.checked;
            updateMapForYear(mapState.currentYear);
        });
    }
}

// Start map animation
function startMapAnimation() {
    if (mapState.isPlaying) return;
    
    mapState.isPlaying = true;
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    
    if (playBtn) playBtn.classList.add('hidden');
    if (pauseBtn) pauseBtn.classList.remove('hidden');
    
    mapState.playInterval = setInterval(() => {
        if (mapState.currentYear >= 2025) {
            pauseMapAnimation();
            return;
        }
        mapState.currentYear++;
        const slider = document.getElementById('timeline-slider');
        const yearDisplay = document.getElementById('current-year');
        
        if (slider) slider.value = mapState.currentYear;
        if (yearDisplay) yearDisplay.textContent = mapState.currentYear;
        updateMapForYear(mapState.currentYear);
    }, mapState.playSpeed);
}

// Pause map animation
function pauseMapAnimation() {
    mapState.isPlaying = false;
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    
    if (playBtn) playBtn.classList.remove('hidden');
    if (pauseBtn) pauseBtn.classList.add('hidden');
    
    if (mapState.playInterval) {
        clearInterval(mapState.playInterval);
        mapState.playInterval = null;
    }
}

// Handle slider change
function handleSliderChange(e) {
    mapState.currentYear = parseInt(e.target.value);
    const yearDisplay = document.getElementById('current-year');
    if (yearDisplay) yearDisplay.textContent = mapState.currentYear;
    updateMapForYear(mapState.currentYear);
}

// Handle speed change
function handleSpeedChange(e) {
    mapState.playSpeed = parseInt(e.target.value);
    if (mapState.isPlaying) {
        pauseMapAnimation();
        startMapAnimation();
    }
}

// Update map for specific year
function updateMapForYear(year) {
    // Clear previous layers
    if (mapState.territoryLayer) {
        mapState.map.removeLayer(mapState.territoryLayer);
    }
    if (mapState.markerLayer) {
        mapState.map.removeLayer(mapState.markerLayer);
    }
    if (mapState.cityLayer) {
        mapState.map.removeLayer(mapState.cityLayer);
    }
    
    // Create new layers
    mapState.territoryLayer = L.layerGroup();
    mapState.markerLayer = L.layerGroup();
    mapState.cityLayer = L.layerGroup();
    
    // Get events for this year and earlier
    const relevantEvents = timelineEvents.filter(event => {
        const eventYear = parseInt(event.date.split('-')[0]);
        return eventYear <= year;
    });
    
    // Draw territory control
    if (mapState.showTerritory) {
        drawTerritoryControl(relevantEvents);
    }
    
    // Draw all event markers
    drawAllEventMarkers(relevantEvents);
    
    // Draw cities
    if (mapState.showCities) {
        addMajorCities();
    }
    
    // Add layers to map
    mapState.territoryLayer.addTo(mapState.map);
    mapState.markerLayer.addTo(mapState.map);
    mapState.cityLayer.addTo(mapState.map);
    
    // Update statistics
    updateStatistics(relevantEvents);
}

// Draw territory control zones with real geographic polygons
function drawTerritoryControl(events) {
    // Find the most recent territory control data
    let latestTerritoryData = null;
    let latestEventYear = 0;
    
    events.forEach(event => {
        if (event.geography && event.geography.type === 'territory_change' && event.territoryControl) {
            const eventYear = parseInt(event.date.split('-')[0]);
            if (eventYear > latestEventYear) {
                latestEventYear = eventYear;
                latestTerritoryData = event;
            }
        }
    });
    
    if (latestTerritoryData) {
        const currentYear = latestEventYear;
        
        if (currentYear < 1948) {
            // Pre-1948: Ottoman/British Mandate Palestine
            const mandataArea = [
                [29.5, 34.2], [33.5, 34.2], [33.5, 35.8], [29.5, 35.8], [29.5, 34.2]
            ];
            L.polygon(mandataArea, {
                fillColor: 'rgba(155, 89, 182, 0.3)',
                color: 'rgba(155, 89, 182, 0.7)',
                weight: 2,
                fillOpacity: 0.3
            }).addTo(mapState.territoryLayer).bindPopup('Palestine under British Mandate');
            
        } else if (currentYear >= 1948 && currentYear < 1967) {
            // 1948-1967: Armistice lines
            const israel1948 = [
                [31.0, 34.3], [32.7, 34.3], [33.3, 35.0], [33.0, 35.6], [31.5, 35.6], [31.0, 35.2]
            ];
            L.polygon(israel1948, {
                fillColor: 'rgba(52, 152, 219, 0.3)',
                color: 'rgba(52, 152, 219, 0.7)',
                weight: 2,
                fillOpacity: 0.3
            }).addTo(mapState.territoryLayer).bindPopup('Israel (1948-1967)');
            
            const westBank = [
                [31.7, 35.0], [32.4, 35.0], [32.4, 35.5], [31.7, 35.5], [31.7, 35.0]
            ];
            L.polygon(westBank, {
                fillColor: 'rgba(155, 89, 182, 0.3)',
                color: 'rgba(155, 89, 182, 0.7)',
                weight: 2,
                fillOpacity: 0.3
            }).addTo(mapState.territoryLayer).bindPopup('West Bank (Jordanian control)');
            
            const gaza = [
                [31.2, 34.2], [31.6, 34.2], [31.6, 34.45], [31.2, 34.45], [31.2, 34.2]
            ];
            L.polygon(gaza, {
                fillColor: 'rgba(155, 89, 182, 0.3)',
                color: 'rgba(155, 89, 182, 0.7)',
                weight: 2,
                fillOpacity: 0.3
            }).addTo(mapState.territoryLayer).bindPopup('Gaza Strip (Egyptian control)');
            
        } else if (currentYear >= 1967 && currentYear < 2007) {
            // 1967-2007: After Six-Day War
            const israel1967 = [
                [29.5, 34.2], [33.5, 34.2], [33.5, 35.8], [29.5, 35.8], [29.5, 34.2]
            ];
            L.polygon(israel1967, {
                fillColor: 'rgba(52, 152, 219, 0.3)',
                color: 'rgba(52, 152, 219, 0.7)',
                weight: 2,
                fillOpacity: 0.3
            }).addTo(mapState.territoryLayer).bindPopup('Israel + Occupied Territories');
            
            // Mark occupied areas
            const westBank = [
                [31.7, 35.0], [32.4, 35.0], [32.4, 35.5], [31.7, 35.5], [31.7, 35.0]
            ];
            L.polygon(westBank, {
                fillColor: 'rgba(255, 165, 0, 0.3)',
                color: 'rgba(255, 165, 0, 0.7)',
                weight: 2,
                fillOpacity: 0.3,
                dashArray: '5, 5'
            }).addTo(mapState.territoryLayer).bindPopup('West Bank (Occupied)');
            
            const gaza = [
                [31.2, 34.2], [31.6, 34.2], [31.6, 34.45], [31.2, 34.45], [31.2, 34.2]
            ];
            L.polygon(gaza, {
                fillColor: 'rgba(255, 165, 0, 0.3)',
                color: 'rgba(255, 165, 0, 0.7)',
                weight: 2,
                fillOpacity: 0.3,
                dashArray: '5, 5'
            }).addTo(mapState.territoryLayer).bindPopup('Gaza Strip (Occupied)');
            
        } else if (currentYear >= 2007) {
            // 2007-present: Hamas control of Gaza
            const israel2007 = [
                [29.5, 34.2], [33.5, 34.2], [33.5, 35.8], [29.5, 35.8], [29.5, 34.2]
            ];
            L.polygon(israel2007, {
                fillColor: 'rgba(52, 152, 219, 0.2)',
                color: 'rgba(52, 152, 219, 0.7)',
                weight: 2,
                fillOpacity: 0.2
            }).addTo(mapState.territoryLayer).bindPopup('Israel');
            
            const westBank = [
                [31.7, 35.0], [32.4, 35.0], [32.4, 35.5], [31.7, 35.5], [31.7, 35.0]
            ];
            L.polygon(westBank, {
                fillColor: 'rgba(155, 89, 182, 0.3)',
                color: 'rgba(155, 89, 182, 0.7)',
                weight: 2,
                fillOpacity: 0.3,
                dashArray: '5, 5'
            }).addTo(mapState.territoryLayer).bindPopup('West Bank (PA Control)');
            
            const gaza = [
                [31.2, 34.2], [31.6, 34.2], [31.6, 34.45], [31.2, 34.45], [31.2, 34.2]
            ];
            L.polygon(gaza, {
                fillColor: 'rgba(231, 76, 60, 0.4)',
                color: 'rgba(231, 76, 60, 0.8)',
                weight: 2,
                fillOpacity: 0.4
            }).addTo(mapState.territoryLayer).bindPopup('Gaza Strip (Hamas Control)');
        }
    }
}

// Draw all event markers with proper layer management
function drawAllEventMarkers(events) {
    events.forEach(event => {
        if (!event.geography || !event.geography.coordinates) return;
        
        let markerOptions = {
            radius: 8,
            fillColor: '#95a5a6',
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        };
        
        let shouldShow = false;
        
        // Determine marker style and visibility based on event type and category
        if (event.category === 'military' || event.geography.type === 'attack') {
            markerOptions.fillColor = '#e74c3c';
            markerOptions.radius = event.geography.intensity === 'high' ? 10 : 8;
            shouldShow = mapState.showAttacks;
        } else if (event.geography.type === 'settlement') {
            markerOptions.fillColor = '#3498db';
            markerOptions.radius = 6;
            markerOptions.weight = 1;
            shouldShow = mapState.showSettlements;
        } else if (event.category === 'political') {
            markerOptions.fillColor = '#9b59b6';
            markerOptions.radius = 7;
            shouldShow = mapState.showPolitical;
        } else if (event.category === 'social') {
            markerOptions.fillColor = '#f39c12';
            markerOptions.radius = 7;
            shouldShow = mapState.showSocial;
        } else if (event.geography.type === 'territory_change') {
            markerOptions.fillColor = '#27ae60';
            markerOptions.radius = 9;
            shouldShow = mapState.showTerritory;
        }
        
        // Only create marker if it should be shown
        if (shouldShow) {
            const marker = L.circleMarker(
                [event.geography.coordinates[0], event.geography.coordinates[1]], 
                markerOptions
            );
            
            // Create enhanced popup content
            const popupContent = `
                <div style="max-width: 250px;">
                    <strong style="color: #2c3e50;">${event.title}</strong><br>
                    <span style="color: #7f8c8d; font-size: 12px;">${event.date}</span><br>
                    <hr style="margin: 5px 0;">
                    <span style="font-size: 13px;">${event.description}</span><br>
                    <hr style="margin: 5px 0;">
                    <em style="font-size: 12px; color: #34495e;"><strong>Impact:</strong> ${event.impact}</em>
                </div>
            `;
            
            marker.bindPopup(popupContent);
            
            // Add pulsing animation for high-intensity events
            if (event.geography.intensity === 'high') {
                setInterval(() => {
                    const currentRadius = marker.getRadius();
                    marker.setRadius(currentRadius === markerOptions.radius ? markerOptions.radius + 3 : markerOptions.radius);
                }, 1000);
            }
            
            marker.addTo(mapState.markerLayer);
        }
    });
}

// Add major cities as reference points
function addMajorCities() {
    const cities = [
        { name: 'Jerusalem', coords: [31.7683, 35.2137], importance: 'high', type: 'capital' },
        { name: 'Tel Aviv', coords: [32.0853, 34.7818], importance: 'high', type: 'economic' },
        { name: 'Gaza City', coords: [31.3899, 34.3428], importance: 'medium', type: 'coastal' },
        { name: 'Ramallah', coords: [31.9522, 35.2332], importance: 'medium', type: 'administrative' },
        { name: 'Hebron', coords: [31.7659, 35.1674], importance: 'medium', type: 'religious' },
        { name: 'Haifa', coords: [32.7940, 34.9896], importance: 'medium', type: 'port' },
        { name: 'Beersheba', coords: [31.2529, 34.7915], importance: 'low', type: 'southern' },
        { name: 'Nablus', coords: [32.2105, 35.2844], importance: 'low', type: 'westbank' }
    ];
    
    cities.forEach(city => {
        let fillColor = '#f39c12';
        let size = city.importance === 'high' ? 10 : city.importance === 'medium' ? 7 : 5;
        
        const marker = L.circleMarker(city.coords, {
            radius: size,
            fillColor: fillColor,
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        });
        
        marker.bindPopup(`
            <strong>${city.name}</strong><br>
            <small>Type: ${city.type}</small><br>
            <small>Importance: ${city.importance}</small>
        `);
        
        marker.addTo(mapState.cityLayer);
    });
}

// Update statistics with comprehensive event counting
function updateStatistics(events) {
    const militaryEvents = events.filter(e => e.category === 'military').length;
    const politicalEvents = events.filter(e => e.category === 'political').length;
    const socialEvents = events.filter(e => e.category === 'social').length;
    const totalEvents = events.length;
    
    // Find latest territory control data
    let latestTerritory = { israeli: 0, palestinian: 100, hamas: 0 };
    let latestEventYear = 0;
    
    events.forEach(event => {
        if (event.territoryControl) {
            const eventYear = parseInt(event.date.split('-')[0]);
            if (eventYear > latestEventYear) {
                latestEventYear = eventYear;
                latestTerritory = event.territoryControl;
            }
        }
    });
    
    // Update territory percentages
    const israeliTerritory = document.getElementById('israeli-territory');
    const palestinianTerritory = document.getElementById('palestinian-territory');
    const conflictCount = document.getElementById('conflict-count');
    
    if (israeliTerritory) israeliTerritory.textContent = `${latestTerritory.israeli}%`;
    if (palestinianTerritory) palestinianTerritory.textContent = `${latestTerritory.palestinian}%`;
    if (conflictCount) conflictCount.textContent = `${totalEvents} (${militaryEvents} military)`;
    
    // Update legend with current event counts
    updateLegendCounts(events);
}

// Update legend with current event counts
function updateLegendCounts(events) {
    const militaryCount = events.filter(e => e.category === 'military').length;
    const politicalCount = events.filter(e => e.category === 'political').length;
    const socialCount = events.filter(e => e.category === 'social').length;
    
    // Update the legend if it exists
    const legendElement = document.querySelector('.map-legend');
    if (legendElement) {
        const countsHTML = `
            <div style="margin-top: 8px; font-weight: bold; text-align: center; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 5px; font-size: 10px;">
                Current Events: ${events.length}<br>
                <span style="color: #e74c3c;">Military: ${militaryCount}</span> | 
                <span style="color: #9b59b6;">Political: ${politicalCount}</span> | 
                <span style="color: #f39c12;">Social: ${socialCount}</span>
            </div>
        `;
        
        const existingCounts = legendElement.querySelector('div[style*="border-top"]');
        if (existingCounts) {
            existingCounts.outerHTML = countsHTML;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeTimeline);

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});