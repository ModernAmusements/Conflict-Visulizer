// CSV data will be loaded dynamically
let csvDataLoaded = false;
let hamasAttackEvents = [];

// Function to parse CSV text into array of objects
function parseCSV(text) {
    const lines = text.trim().split('\n');
    const headers = lines[0].split('\t');
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '') continue;
        
        const values = lines[i].split('\t');
        const row = {};
        
        headers.forEach((header, index) => {
            // Clean up quotes and whitespace
            let value = values[index] || '';
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }
            // Replace any remaining quotes
            value = value.replace(/""/g, '"').replace(/"/g, '');
            
            // Clean up header names for JavaScript
            let cleanHeader = header.trim().replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
            row[cleanHeader] = value.trim();
        });
        
        data.push(row);
    }
    
    return data;
}

// Function to load and parse CSV data
async function loadHamasAttacksCSV() {
    if (csvDataLoaded) return hamasAttackEvents;
    
    try {
        console.log('🔄 Loading Hamas attacks CSV...');
        const response = await fetch('data/Hamasterrorattacks.csv');
        const csvText = await response.text();
        const parsedData = parseCSV(csvText);
        
        console.log('📊 CSV loaded:', parsedData.length, 'entries');
        
        hamasAttackEvents = parsedData.map(row => convertCSVToEvent(row));
        csvDataLoaded = true;
        
        console.log('✅ Converted to events:', hamasAttackEvents.length, 'attack events');
        return hamasAttackEvents;
        
    } catch (error) {
        console.error('❌ Error loading CSV:', error);
        return [];
    }
}

// Function to convert CSV row to event object
function convertCSVToEvent(row) {
    // Helper function to extract year from date format
    function extractYear(dateStr) {
        if (!dateStr) return 1993; // Default year
        if (dateStr.includes('/')) {
            const parts = dateStr.split('/');
            const year = parseInt(parts[2]);
            if (isNaN(year)) return 1993;
            return year >= 90 ? 1900 + year : 2000 + year;
        }
        return parseInt(dateStr) || 1993;
    }

    // Helper function to get coordinates for locations
    function getCoordinates(location, description = '') {
        // Comprehensive location mapping with coordinates
        const locationMap = {
            // Major Regions
            'West Bank': [31.7585, 35.2433],
            'Gaza Strip': [31.3899, 34.3428],
            'Israel': [31.7683, 35.2137],
            'Palestine': [31.7683, 35.2137],
            'Palestinian': [31.7683, 35.2137],
            
            // Israeli Cities
            'Tel Aviv': [32.0853, 34.7818],
            'Jerusalem': [31.7785, 35.2353],
            'Haifa': [32.7940, 34.9896],
            'Beersheba': [31.2518, 34.7915],
            'Ashkelon': [31.6693, 34.5715],
            'Sderot': [31.5225, 34.6070],
            'Afula': [32.6086, 35.2882],
            'Netanya': [32.3245, 34.8570],
            'Hadera': [32.4342, 34.9190],
            'Kfar Saba': [32.1760, 34.9076],
            'Lod': [31.9525, 34.8989],
            'Ramat Efal': [32.0853, 34.8418],
            'RamatEfal': [32.0853, 34.8418],
            'Ashdod': [31.8040, 34.6553],
            'Netivot': [31.4200, 34.5917],
            'Ofakim': [31.3133, 34.6233],
            'Kiryat Malakhi': [31.7317, 34.7467],
            'Yavne': [31.7500, 34.7370],
            'Rehovot': [31.8928, 34.8113],
            'Rishon LeZion': [31.9718, 34.7893],
            'Petah Tikva': [32.0840, 34.8878],
            'Bnei Brak': [32.0833, 34.8333],
            'Bat Yam': [31.9738, 34.7723],
            'Holon': [31.9719, 34.7713],
            'Ben Gurion': [31.9913, 34.9067],
            
            // West Bank Cities
            'Nablus': [32.2105, 35.2844],
            'Hebron': [31.7659, 35.1674],
            'Ramallah': [31.9522, 35.2332],
            'Jenin': [32.4975, 35.3017],
            'Tulkarm': [32.3075, 35.0078],
            'Qalqilya': [32.1847, 34.9722],
            'Bethlehem': [31.7059, 35.2027],
            'Bethany': [31.7181, 35.2581],
            'Al-Bira': [31.9514, 35.2331],
            'Kiryat Malachi': [31.7317, 34.7467],
            'Moshav': [31.8000, 34.7500],
            'Moshad': [32.0833, 35.5833],
            'Moshad Mehola': [32.0833, 35.5833],
            
            // Gaza Cities
            'Gaza City': [31.3899, 34.3428],
            'Khan Younis': [31.3400, 34.3083],
            'Rafah': [31.2967, 34.2528],
            'Deir al-Balah': [31.4167, 34.3500],
            'Jabaliya': [31.4500, 34.4000],
            'Beit Hanoun': [31.5500, 34.5333],
            
            // Syrian/Lebanese Locations
            'Damascus': [33.5138, 36.2765],
            'Lebanon': [33.8547, 35.8623],
            'Lebanese': [33.8547, 35.8623],
            'Syrian': [35.0, 38.0],
            'Syria': [35.0, 38.0],
            'Golan': [33.0, 35.7],
            
            // Egyptian Locations
            'Egypt': [30.0444, 31.2357],
            'Egyptian': [30.0444, 31.2357],
            'Sinai': [29.5, 34.0],
            'Suez': [29.9667, 32.5500],
        };
        
        // Search in location field first
        const locLower = (location || '').toLowerCase();
        for (const [key, coords] of Object.entries(locationMap)) {
            if (locLower.includes(key.toLowerCase())) {
                return coords;
            }
        }
        
        // If not found, search in description for location keywords
        const descLower = (description || '').toLowerCase();
        const descLocationMap = {
            'jerusalem': [31.7785, 35.2353],
            'tel aviv': [32.0853, 34.7818],
            'haifa': [32.7940, 34.9896],
            'gaza': [31.3899, 34.3428],
            'khan younis': [31.3400, 34.3083],
            'rafah': [31.2967, 34.2528],
            'nablus': [32.2105, 35.2844],
            'hebron': [31.7659, 35.1674],
            'ramallah': [31.9522, 35.2332],
            'jenin': [32.4975, 35.3017],
            'bethlehem': [31.7059, 35.2027],
            'west bank': [31.7585, 35.2433],
            'israel': [31.7683, 35.2137],
        };
        
        for (const [key, coords] of Object.entries(descLocationMap)) {
            if (descLower.includes(key)) {
                return coords;
            }
        }
        
        return [31.7683, 35.2137]; // Default to central Israel
    }

    // Helper function to determine intensity based on casualties
    function getIntensity(totalKilled, totalWounded) {
        const killed = parseInt(totalKilled) || 0;
        const wounded = parseInt(totalWounded) || 0;
        const total = killed + wounded;
        if (total >= 20) return 'high';
        if (total >= 5) return 'medium';
        return 'low';
    }

    const year = extractYear(row.Date);
    const coordinates = getCoordinates(row.Location, row.Description || '');
    const intensity = getIntensity(row.Totalkilled, row.Totalwounded);
    
    return {
        date: year.toString(),
        title: `Hamas Attack: ${row.Attacktype || 'Unknown Attack'} in ${row.Location}`,
        description: (row.Description || `${row.Attacktype || 'Attack'} using ${row.Weapon || 'Unknown Weapon'}. Total casualties: ${row.Totalcasualties || '0'}`).substring(0, 300),
        category: 'military',
        era: year <= 2005 ? '1987-2005' : '2006-2023',
        impact: (row.Context || `Attack resulted in ${row.Totalkilled || '0'} killed and ${row.Totalwounded || '0'} wounded`).substring(0, 200),
        geography: {
            type: 'attack',
            coordinates: coordinates,
            affectedArea: [
                [coordinates[0] - 0.2, coordinates[1] - 0.2],
                [coordinates[0] + 0.2, coordinates[1] + 0.2]
            ],
            intensity: intensity,
            icon: 'attack'
        },
        territoryControl: { israeli: 85, palestinian: 15, hamas: 2 },
        source: 'Hamas Attacks Database',
        casualties: {
            totalKilled: parseInt(row.Totalkilled) || 0,
            israelisKilled: parseInt(row.Israeliskilled) || 0,
            palestiniansKilled: parseInt(row.Palestinianskilled) || 0,
            totalWounded: parseInt(row.Totalwounded) || 0,
            israelisWounded: parseInt(row.Israeliswounded) || 0,
            palestiniansWounded: parseInt(row.Palestinianswounded) || 0,
            totalCasualties: parseInt(row.Totalcasualties) || 0
        },
        attackDetails: {
            type: row.Attacktype || 'Unknown',
            weapon: row.Weapon || 'Unknown',
            claimedBy: row.Claimedby || 'Unknown',
            targetType: row.Targettype || 'Unknown'
        }
    };
}

// Function to get all events including CSV attacks
async function getAllEvents() {
    const csvEvents = await loadHamasAttacksCSV(); // Use async loader
    const allEvents = [...timelineEvents, ...csvEvents];
    
    // Enhance all events with military classifications
    allEvents.forEach(event => enhanceEventWithMilitaryData(event));
    
    console.log('📊 Total events combined:', allEvents.length);
    console.log('📊 Hamas attacks:', csvEvents.length);
    console.log('📊 Timeline events:', timelineEvents.length);
    console.log('🎯 Enhanced all events with military classifications');
    
    return allEvents;
}

// Synchronous version for functions that need immediate access
function getAllEventsSync() {
    if (csvDataLoaded) {
        return [...timelineEvents, ...hamasAttackEvents];
    }
    // If CSV not loaded yet, return just timeline events
    return timelineEvents;
}

// Detect which nations are involved in an event
function detectInvolvedNations(event) {
    const nations = [];
    const eventText = (event.title + ' ' + event.description + ' ' + (event.attackDetails?.claimedBy || '')).toLowerCase();
    
    // Check for Israeli involvement
    if (eventText.includes('israel') || 
        eventText.includes('idf') || 
        eventText.includes('israeli') ||
        (event.territoryControl && event.territoryControl.israeli > 50) ||
        (event.casualties && event.casualties.israelisKilled > 0) ||
        (event.casualties && event.casualties.israelisWounded > 0)) {
        nations.push('israel');
    }
    
    // Check for Palestinian involvement
    if (eventText.includes('palestin') || 
        eventText.includes('gaza') ||
        eventText.includes('west bank') ||
        (event.territoryControl && event.territoryControl.palestinian > 10) ||
        (event.casualties && event.casualties.palestiniansKilled > 0) ||
        (event.casualties && event.casualties.palestiniansWounded > 0) ||
        (event.attackDetails && event.attackDetails.claimedBy && event.attackDetails.claimedBy.toLowerCase().includes('hamas'))) {
        nations.push('palestine');
    }
    
    // Check for Hamas specifically
    if (eventText.includes('hamas') || 
        (event.attackDetails && event.attackDetails.claimedBy && event.attackDetails.claimedBy.toLowerCase().includes('hamas'))) {
        if (!nations.includes('palestine')) {
            nations.push('palestine');
        }
    }
    
    // Check for Egyptian involvement
    if (eventText.includes('egypt') || eventText.includes('egyptian')) {
        nations.push('egypt');
    }
    
    // Check for Syrian involvement
    if (eventText.includes('syria') || eventText.includes('syrian')) {
        nations.push('syria');
    }
    
    // Check for Jordanian involvement
    if (eventText.includes('jordan') || eventText.includes('jordanian')) {
        nations.push('jordan');
    }
    
    // Check for Lebanese involvement
    if (eventText.includes('leban') || eventText.includes('hezbollah')) {
        nations.push('lebanon');
    }
    
    // Check for US involvement
    if (eventText.includes('united states') || eventText.includes('usa') || eventText.includes('america')) {
        nations.push('usa');
    }
    
    // Check for UK involvement
    if (eventText.includes('britain') || eventText.includes('uk') || eventText.includes('united kingdom')) {
        nations.push('uk');
    }
    
    // Check for UN involvement
    if (eventText.includes('united nations') ||
        (eventText.includes('un ') && (eventText.includes('resolution') || eventText.includes('peace') || eventText.includes('security council'))) ||
        eventText.includes('un intervention') ||
        eventText.includes('un peacekeeping')) {
        nations.push('un');
    }
    
    return [...new Set(nations)]; // Remove duplicates
}

function createFlagOverlayForEvent(event, markerSize = 40) {
    const involvedNations = detectInvolvedNations(event);
    if (involvedNations.length === 0) return '';

    const flagEmojis = {
        israel: '🇮🇱',
        palestine: '🇵🇸',
        hamas: '⚡',
        egypt: '🇪🇬',
        syria: '🇸🇾',
        jordan: '🇯🇴',
        lebanon: '🇱🇧',
        usa: '🇺🇸',
        uk: '🇬🇧',
        un: '🇺🇳'
    };

    const flagElement = involvedNations.slice(0, 2).map(nation => {
        const emoji = flagEmojis[nation.toLowerCase()] || '🏳️';
        return `<span class="flag-emoji">${emoji}</span>`;
    }).join('');

    return `
        <div class="event-flag-beside">
            ${flagElement}
        </div>
    `;
}


// Enhanced event data processor with military classifications
function enhanceEventWithMilitaryData(event) {
    if (!event) return event;
    
    // Add military classification metadata
    event.militaryClassification = {
        affiliation: 'unknown',
        unitType: 'unknown',
        nation: 'unknown',
        equipment: 'unknown',
        size: 'unit',
        status: 'active'
    };
    
    // Analyze event to determine military details
    const title = (event.title || '').toLowerCase();
    const description = (event.description || '').toLowerCase();
    const category = (event.category || '').toLowerCase();
    
    // Determine affiliation based on event content
    if (title.includes('hamas') || title.includes('palestinian') || 
        description.includes('hamas') || description.includes('palestinian')) {
        event.militaryClassification.affiliation = 'hostile'; // From Israeli perspective
        event.militaryClassification.nation = 'palestine';
    } else if (title.includes('idf') || title.includes('israeli') || 
               description.includes('idf') || description.includes('israeli')) {
        event.militaryClassification.affiliation = 'friendly'; // Israeli perspective
        event.militaryClassification.nation = 'israel';
    } else if (title.includes('egypt') || title.includes('syrian') || 
               title.includes('jordan') || title.includes('lebanon')) {
        event.militaryClassification.affiliation = 'neutral';
        event.militaryClassification.nation = 
            title.includes('egypt') ? 'egypt' :
            title.includes('syria') ? 'syria' :
            title.includes('jordan') ? 'jordan' : 'lebanon';
    }
    
    // Determine unit type based on event characteristics
    if (event.geography && event.geography.type) {
        const geoType = event.geography.type.toLowerCase();
        
        switch(geoType) {
            case 'attack':
                if (title.includes('bombing') || title.includes('suicide') || 
                    title.includes('explosive')) {
                    event.militaryClassification.unitType = 'infantry';
                    event.militaryClassification.equipment = 'explosives';
                } else if (title.includes('armor') || title.includes('tank') || 
                           title.includes('vehicle')) {
                    event.militaryClassification.unitType = 'armor';
                    event.militaryClassification.equipment = 'vehicles';
                } else if (title.includes('artillery') || title.includes('mortar') || 
                           title.includes('rocket')) {
                    event.militaryClassification.unitType = 'artillery';
                    event.militaryClassification.equipment = 'artillery';
                } else if (title.includes('ambush') || title.includes('raid')) {
                    event.militaryClassification.unitType = 'recon';
                    event.militaryClassification.equipment = 'small_arms';
                } else {
                    event.militaryClassification.unitType = 'infantry';
                    event.militaryClassification.equipment = 'small_arms';
                }
                break;
                
            case 'settlement':
                event.militaryClassification.unitType = 'settlement';
                event.militaryClassification.equipment = 'civilian';
                break;
                
            case 'political':
                event.militaryClassification.unitType = 'headquarters';
                event.militaryClassification.equipment = 'command';
                break;
                
            case 'territory_change':
                event.militaryClassification.unitType = 'checkpoint';
                event.militaryClassification.equipment = 'security';
                break;
                
            case 'social':
                event.militaryClassification.unitType = 'observation_post';
                event.militaryClassification.equipment = 'surveillance';
                break;
                
            default:
                event.militaryClassification.unitType = 'infantry';
                event.militaryClassification.equipment = 'small_arms';
        }
    }
    
    // Special handling for known operations
    if (title.includes('six-day war') || title.includes('yom kippur')) {
        event.militaryClassification.unitType = 'armor';
        event.militaryClassification.equipment = 'combined_arms';
        event.militaryClassification.size = 'division';
    } else if (title.includes('intifada') || title.includes('uprising')) {
        event.militaryClassification.unitType = 'infantry';
        event.militaryClassification.equipment = 'small_arms';
        event.militaryClassification.size = 'battalion';
    } else if (title.includes('operation')) {
        event.militaryClassification.unitType = 'infantry';
        event.militaryClassification.equipment = 'combined_arms';
        event.militaryClassification.size = 'brigade';
    }
    
    // Determine unit size based on casualties if available
    if (event.casualties && event.casualties.totalCasualties) {
        const casualties = event.casualties.totalCasualties;
        if (casualties >= 100) {
            event.militaryClassification.size = 'division';
        } else if (casualties >= 50) {
            event.militaryClassification.size = 'brigade';
        } else if (casualties >= 20) {
            event.militaryClassification.size = 'battalion';
        } else if (casualties >= 10) {
            event.militaryClassification.size = 'company';
        } else if (casualties >= 5) {
            event.militaryClassification.size = 'platoon';
        } else {
            event.militaryClassification.size = 'squad';
        }
    }
    
    // Add intensity calculation
    if (event.casualties) {
        const total = event.casualties.totalCasualties || 0;
        if (total >= 20) {
            event.militaryClassification.intensity = 'high';
        } else if (total >= 5) {
            event.militaryClassification.intensity = 'medium';
        } else {
            event.militaryClassification.intensity = 'low';
        }
    } else {
        event.militaryClassification.intensity = 'low';
    }
    
    return event;
}

// parseHamasAttacksFromCSV function removed - using async CSV loading instead

// Enhanced timeline events with military classifications
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
        date: "1920",
        title: "San Remo Conference: British Mandate Formalized",
        description: "Allied powers officially assign Palestine to British administration. Borders defined, beginning of systematic British rule.",
        category: "political",
        era: "1900-1947",
        impact: "International recognition of British control, establishment of legal framework.",
        geography: {
            type: "political",
            coordinates: [31.7683, 35.2137],
            affectedArea: [[31.2, 34.8], [32.2, 35.5]],
            intensity: "medium",
            icon: "treaty"
        },
        territoryControl: { israeli: 6, palestinian: 94 }
    },
    {
        date: "1921",
        title: "Jaffa Riots: First Major Intercommunal Violence",
        description: "Arab mobs attack Jewish population in Jaffa. 47 Jews killed, 146 injured. Marks new phase of violence.",
        category: "military",
        era: "1900-1947",
        impact: "First major intercommunal violence of Mandate period.",
        geography: {
            type: "attack",
            coordinates: [32.0833, 34.7500],
            affectedArea: [[32.0, 34.6], [32.2, 34.9]],
            intensity: "medium",
            icon: "riot"
        },
        territoryControl: { israeli: 6, palestinian: 94 }
    },
    {
        date: "1922",
        title: "First British White Paper",
        description: "Churchill White Paper limits Jewish immigration to economic capacity. Tensions between Zionist and Arab communities increase.",
        category: "political",
        era: "1900-1947",
        impact: "British policy restrictions fuel nationalist sentiments on both sides.",
        geography: {
            type: "political",
            coordinates: [31.7683, 35.2137],
            affectedArea: [[31.2, 34.8], [32.2, 35.5]],
            intensity: "medium",
            icon: "policy"
        },
        territoryControl: { israeli: 6, palestinian: 94 }
    },
    {
        date: "1929",
        title: "Western Wall Riots",
        description: "Violent clashes between Arabs and Jews over access to Western Wall. 133 Jews killed, 339 injured. Hebron Jewish community attacked.",
        category: "military",
        era: "1900-1947",
        impact: "First major intercommunal violence under British Mandate.",
        geography: {
            type: "attack",
            coordinates: [31.7785, 35.2353],
            affectedArea: [[31.7, 35.2], [31.8, 35.3]],
            intensity: "high",
            icon: "riot"
        },
        territoryControl: { israeli: 7, palestinian: 93 }
    },
    {
        date: "1933",
        title: "Arab General Strike and Riots",
        description: "Six-month general strike against British rule and Jewish immigration. Widespread protests and violence across Palestine.",
        category: "social",
        era: "1900-1947",
        impact: "Demonstrates growing Palestinian nationalism and resistance.",
        geography: {
            type: "social",
            coordinates: [31.9522, 35.2332],
            affectedArea: [[31.5, 34.8], [32.5, 35.8]],
            intensity: "high",
            icon: "uprising"
        },
        territoryControl: { israeli: 7, palestinian: 93 }
    },
    {
        date: "1936",
        title: "Arab Higher Committee Formed",
        description: "Grand Mufti Haj Amin al-Husseini forms political leadership. Coordinates Arab resistance to British Mandate and Jewish immigration.",
        category: "political",
        era: "1900-1947",
        impact: "Creates unified Arab political leadership during crucial period.",
        geography: {
            type: "political",
            coordinates: [31.9522, 35.2332],
            affectedArea: [[31.7, 35.0], [32.2, 35.4]],
            intensity: "medium",
            icon: "formation"
        },
        territoryControl: { israeli: 8, palestinian: 92 }
    },
    {
        date: "1936-1939",
        title: "Arab Revolt (Great Uprising)",
        description: "Major three-year rebellion against British rule and Jewish immigration. Over 5,000 Arabs, 400 Jews killed. British harsh crackdown.",
        category: "military",
        era: "1900-1947",
        impact: "Establishes pattern of armed resistance and British counter-insurgency tactics.",
        geography: {
            type: "attack",
            coordinates: [32.2222, 35.2544],
            affectedArea: [[31.7, 34.9], [32.5, 35.4]],
            intensity: "high",
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
        title: "Altalena Affair: Irgun Ship Sunk",
        description: "IDF fires on Irgun weapons ship Altalena off Tel Aviv. 16 Irgun members killed. Creates schism in Israeli leadership.",
        category: "military",
        era: "1948-1966",
        impact: "First major internal Israeli conflict, establishes state authority over paramilitary groups.",
        geography: {
            type: "attack",
            coordinates: [32.0853, 34.7818],
            affectedArea: [[32.0, 34.6], [32.2, 34.9]],
            intensity: "medium",
            icon: "internal"
        },
        territoryControl: { israeli: 78, palestinian: 22 }
    },
    {
        date: "1949",
        title: "Lausanne Conference: Failed Peace Talks",
        description: "Israel and Arab states meet in Switzerland to resolve 1948 war. No agreement reached. Armistice lines become de facto borders.",
        category: "political",
        era: "1948-1966",
        impact: "Establishes pattern of failed diplomatic efforts, solidifies armistice borders.",
        geography: {
            type: "political",
            coordinates: [46.5167, 6.6333], // Lausanne, Switzerland
            affectedArea: [[46.4, 6.5], [46.6, 6.8]],
            intensity: "medium",
            icon: "conference"
        },
        territoryControl: { israeli: 78, palestinian: 22 }
    },
    {
        date: "1950",
        title: "Jordan Annexes West Bank",
        description: "Jordan formally annexes West Bank and East Jerusalem. Palestinian representation and autonomy issues increase.",
        category: "political",
        era: "1948-1966",
        impact: "Creates complex sovereignty issues over Palestinian territories.",
        geography: {
            type: "territory_change",
            coordinates: [31.9522, 35.2332],
            affectedArea: [[31.7, 35.0], [32.4, 35.5]],
            intensity: "medium",
            icon: "annexation"
        },
        territoryControl: { israeli: 78, palestinian: 22 }
    },
    {
        date: "1954",
        title: "Lavon Affair: Failed Israeli Operation",
        description: "Israeli intelligence operation in Egypt fails, leading to political scandal. Defense Minister Pinhas Lavon resigns.",
        category: "military",
        era: "1948-1966",
        impact: "Demonstrates early Israeli covert operations and political accountability.",
        geography: {
            type: "attack",
            coordinates: [30.0500, 31.2500], // Cairo, Egypt
            affectedArea: [[30.0, 31.0], [30.5, 32.0]],
            intensity: "medium",
            icon: "covert"
        },
        territoryControl: { israeli: 78, palestinian: 22 }
    },
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
            icon: "independence"
        },
        movementData: {
            type: "multi_front_invasion",
            faction: "arab_forces",
            coordinates: [
                [30.0500, 31.2500], // Egyptian forces from Cairo
                [31.7683, 35.2137], // Attack on Jerusalem
                [32.0833, 34.7667], // Central front
                [33.5000, 36.2500], // Syrian forces from Damascus
                [32.4280, 35.3048], // Lebanese forces
                [31.2000, 35.0000]  // Jordanian forces from Amman
            ],
            startTime: "1948-05-15",
            endTime: "1948-07-20"
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
        movementData: {
            type: "preemptive_strike",
            faction: "idf",
            coordinates: [
                [32.0853, 34.7818], // Tel Aviv (IDF command)
                [30.0500, 31.2500], // Egyptian airfields
                [33.5000, 36.2500], // Syrian airfields
                [35.9300, 35.5000], // Syrian Golan advance
                [31.3525, 34.3050], // Gaza Strip
                [31.7683, 35.2137]  // Jerusalem capture
            ],
            startTime: "1967-06-05",
            endTime: "1967-06-10"
        },
        territoryControl: { israeli: 85, palestinian: 15 }
    },
    {
        date: "1967",
        title: "UN Security Council Resolution 242",
        description: "UN calls for Israeli withdrawal from territories occupied in Six-Day War. 'Land for peace' principle established.",
        category: "political",
        era: "1967-1986",
        impact: "International legal framework for Middle East peace process.",
        geography: {
            type: "political",
            coordinates: [40.7128, -74.0060], // New York (UN Headquarters)
            affectedArea: [[40.5, -74.5], [41.0, -73.5]],
            intensity: "medium",
            icon: "resolution"
        },
        territoryControl: { israeli: 85, palestinian: 15 }
    },
    {
        date: "1968",
        title: "Karameh Pass Battle: PLO Emerges",
        description: "IDF attacks PLO base in Jordan. First major Israeli-PLO confrontation. PLO regroups, gains legitimacy.",
        category: "military",
        era: "1967-1986",
        impact: "Establishes PLO as major military and political force.",
        geography: {
            type: "attack",
            coordinates: [31.7828, 35.2334],
            affectedArea: [[31.7, 35.0], [31.9, 35.4]],
            intensity: "medium",
            icon: "battle"
        },
        territoryControl: { israeli: 85, palestinian: 15 }
    },
    {
        date: "1970",
        title: "War of Attrition: Border Conflict",
        description: "Three-year low-intensity war between Egypt and Israel along Suez Canal. Both sides suffer casualties but no territorial changes.",
        category: "military",
        era: "1967-1986",
        impact: "Establishes pattern of border skirmishes and air combat.",
        geography: {
            type: "attack",
            coordinates: [30.4500, 32.4000],
            affectedArea: [[29.8, 32.0], [31.0, 33.0]],
            intensity: "medium",
            icon: "border"
        },
        territoryControl: { israeli: 85, palestinian: 15 }
    },

    // Occupation & Rise of Resistance (1967-1986) - Removed duplicate Six-Day War entry
    {
        date: "1972",
        title: "Munich Olympics Attack",
        description: "Black September group kills 11 Israeli athletes at Munich Olympics. International outrage, increases Israeli security concerns.",
        category: "military",
        era: "1967-1986",
        impact: "Introduces Palestinian militancy to international stage.",
        geography: {
            type: "attack",
            coordinates: [48.1351, 11.5820], // Munich, Germany
            affectedArea: [[48.0, 11.5], [48.2, 11.6]],
            intensity: "high",
            icon: "terrorism"
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
        movementData: {
            type: "surprise_attack",
            faction: "egyptian_syrian",
            coordinates: [
                [30.0500, 31.2500], // Egyptian forces from Suez
                [29.5000, 32.5500], // Egyptian Sinai crossing
                [33.5000, 36.2500], // Syrian forces from Damascus
                [33.1000, 35.7000], // Syrian Golan advance
                [31.2500, 34.2500]  // Central Israel
            ],
            startTime: "1973-10-06",
            endTime: "1973-10-25"
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
    {
        date: "1975",
        title: "Sinai Interim Agreement",
        description: "Israel and Egypt sign disengagement agreement. Israel withdraws from Sinai, establishes diplomatic relations.",
        category: "political",
        era: "1967-1986",
        impact: "First major peace agreement between Israel and Arab state.",
        geography: {
            type: "territory_change",
            coordinates: [30.0500, 31.2500], // Sinai
            affectedArea: [[29.5, 32.5], [30.5, 33.0]],
            intensity: "medium",
            icon: "disengagement"
        },
        territoryControl: { israeli: 85, palestinian: 15 }
    },
    {
        date: "1978",
        title: "Camp David Accords Signed",
        description: "Egypt becomes first Arab state to sign peace treaty with Israel. Returns Sinai, establishes normal relations.",
        category: "political",
        era: "1967-1986",
        impact: "Breakthrough in Arab-Israeli diplomacy, Egyptian model for others.",
        geography: {
            type: "territory_change",
            coordinates: [30.0500, 31.2500], // Sinai
            affectedArea: [[29.5, 32.5], [30.5, 33.0]],
            intensity: "high",
            icon: "peace"
        },
        territoryControl: { israeli: 85, palestinian: 15 }
    },
    {
        date: "1981",
        title: "Osirak Nuclear Reactor Bombed",
        description: "Israeli airstrike destroys Iraqi nuclear reactor. Establishes Israel's policy against regional nuclear proliferation.",
        category: "military",
        era: "1967-1986",
        impact: "Sets precedent for Israeli preemptive strikes on nuclear facilities.",
        geography: {
            type: "attack",
            coordinates: [33.0650, 44.3000], // Osirak, Iraq
            affectedArea: [[33.0, 44.0], [33.2, 44.5]],
            intensity: "high",
            icon: "nuclear"
        },
        territoryControl: { israeli: 85, palestinian: 15 }
    },
    {
        date: "1982",
        title: "Lebanon War: First Israeli Invasion",
        description: "Israel invades Lebanon to expel PLO. 15,000 killed, 30,000 wounded. PLO relocates to Tunisia.",
        category: "military",
        era: "1967-1986",
        impact: "Establishes Israeli military presence in Lebanon for decades.",
        geography: {
            type: "attack",
            coordinates: [33.8869, 35.5131], // Beirut
            affectedArea: [[33.5, 35.0], [34.5, 36.0]],
            intensity: "high",
            icon: "invasion"
        },
        territoryControl: { israeli: 85, palestinian: 15 }
    },
    {
        date: "1985",
        title: "Operation Wooden Leg: Israeli Retaliation",
        description: "IDF raids PLO headquarters in Tunisia in response to terrorist attacks. 60 Palestinians killed.",
        category: "military",
        era: "1967-1986",
        impact: "Demonstrates Israel's long-reach counter-terrorism capabilities.",
        geography: {
            type: "attack",
            coordinates: [36.8000, 10.2000], // Tunis
            affectedArea: [[36.5, 10.0], [37.0, 10.5]],
            intensity: "medium",
            icon: "retaliation"
        },
        territoryControl: { israeli: 85, palestinian: 15 }
    },

    // First Intifada & Hamas Formation (1987-2005) - Removed duplicate entries
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
        date: "1988",
        title: "Jordan Renounces Claims to West Bank",
        description: "King Hussein officially renounces Jordan's claim to West Bank in favor of Palestinian representation. Major policy shift.",
        category: "political",
        era: "1987-2005",
        impact: "Opens path for Palestinian leadership in West Bank, clears sovereignty issues.",
        geography: {
            type: "political",
            coordinates: [31.9522, 35.2332],
            affectedArea: [[31.7, 35.0], [32.2, 35.4]],
            intensity: "medium",
            icon: "policy"
        },
        territoryControl: { israeli: 85, palestinian: 15 }
    },
    {
        date: "1991",
        title: "Madrid Peace Conference",
        description: "US and USSR co-host conference after Gulf War. Israel, Arab states, Palestinians meet for comprehensive peace talks.",
        category: "political",
        era: "1987-2005",
        impact: "First attempt at comprehensive Arab-Israeli peace since 1978.",
        geography: {
            type: "political",
            coordinates: [40.4168, -3.7038], // Madrid
            affectedArea: [[40.3, -4.0], [40.5, -3.0]],
            intensity: "medium",
            icon: "conference"
        },
        territoryControl: { israeli: 85, palestinian: 15 }
    },
    {
        date: "1993",
        title: "Oslo Accords",
        description: "Israel and PLO sign peace agreement. Mutual recognition, Palestinian self-rule established. Hamas opposes accord.",
        category: "political",
        era: "1987-2005",
        impact: "Creates division between secular Palestinian leadership and Hamas opposition.",
        geography: {
            type: "political",
            coordinates: [59.9139, 10.7522], // Oslo
            affectedArea: [[59.8, 10.6], [60.0, 11.0]],
            intensity: "high",
            icon: "peace"
        },
        territoryControl: { israeli: 85, palestinian: 15 }
    },
    {
        date: "1994",
        title: "Gaza-Jericho Agreement: Palestinian Autonomy",
        description: "Oslo II establishes Palestinian Authority control over Gaza Strip and Jericho. First self-government in decades.",
        category: "political",
        era: "1987-2005",
        impact: "Creates Palestinian Authority as governing body for self-rule areas.",
        geography: {
            type: "territory_change",
            coordinates: [31.3899, 34.3428],
            affectedArea: [[31.2, 34.2], [31.6, 34.5]],
            intensity: "medium",
            icon: "autonomy"
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
        title: "Camp David Summit Failure",
        description: "Clinton hosts Barak and Arafat at Camp David. Final status of Jerusalem and refugee issue unresolved. Summit collapses.",
        category: "political",
        era: "1987-2005",
        impact: "Major missed opportunity for peace, leads to Second Intifada.",
        geography: {
            type: "political",
            coordinates: [39.6010, -77.4733], // Camp David, USA
            affectedArea: [[39.5, -77.8], [40.0, -77.0]],
            intensity: "high",
            icon: "summit"
        },
        territoryControl: { israeli: 85, palestinian: 15 }
    },
    {
        date: "2000",
        title: "Second Intifada Begins",
        description: "After Camp David failure, Palestinians launch uprising. Hamas becomes major armed resistance group. Arafat loses control.",
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
        title: "Hamas Wins Palestinian Elections: PA-Hamas Split",
        description: "Hamas wins 2006 parliamentary elections, ending Fatah's dominance. This creates unprecedented political split between West Bank (PA/Fatah) and Gaza (Hamas), leading to civil war and 17-year Gaza blockade.",
        category: "political",
        era: "2006-2023",
        impact: "Without Hamas rival, Fatah would remain sole Palestinian representative, enabling unified governance and avoiding Gaza-West Bank division that complicates peace negotiations.",
        geography: {
            type: "political",
            coordinates: [31.9522, 35.2332],
            affectedArea: [[31.7, 35.0], [32.2, 35.4]],
            intensity: "high",
            icon: "election"
        },
        territoryControl: { israeli: 85, palestinian: 15 }
    },
    {
        date: "2006",
        title: "Lebanon War: Second Israeli Invasion",
        description: "Israel responds to Hezbollah rocket fire with massive invasion of Lebanon. 1,200 Lebanese killed, 165 Israelis killed.",
        category: "military",
        era: "2006-2023",
        impact: "Establishes Hezbollah as major threat, creates pattern of periodic border wars.",
        geography: {
            type: "attack",
            coordinates: [33.8869, 35.5131], // Beirut
            affectedArea: [[33.5, 35.0], [34.5, 36.0]],
            intensity: "high",
            icon: "invasion"
        },
        movementData: {
            type: "cross_border_invasion",
            faction: "idf",
            coordinates: [
                [33.0000, 35.5000], // Northern Israel border
                [33.8869, 35.5131], // Beirut advance
                [33.2000, 35.2000], // Southern Lebanon
                [33.5000, 35.8000], // Beka Valley
                [33.3000, 35.4000]  // Litani River area
            ],
            startTime: "2006-07-12",
            endTime: "2006-08-14"
        },
        territoryControl: { israeli: 85, palestinian: 15, hamas: 2 }
    },
    {
        date: "2006",
        title: "Palestinian President Abbas Elected",
        description: "Mahmoud Abbas elected to replace Yasser Arafat after his death. Represents moderate Palestinian leadership.",
        category: "political",
        era: "2006-2023",
        impact: "Creates hope for peace process, though limited by Hamas control of Gaza.",
        geography: {
            type: "political",
            coordinates: [31.9522, 35.2332],
            affectedArea: [[31.7, 35.0], [32.2, 35.4]],
            intensity: "medium",
            icon: "election"
        },
        territoryControl: { israeli: 85, palestinian: 15, hamas: 2 }
    },
    {
        date: "2006",
        title: "Israel-Lebanon War Cross-border Conflict",
        description: "Conflict between Israel and Hezbollah along border. Ongoing artillery exchanges, casualties on both sides.",
        category: "military",
        era: "2006-2023",
        impact: "Establishes Hezbollah as persistent threat to Israeli border communities.",
        geography: {
            type: "attack",
            coordinates: [33.0585, 35.3594], // Border area
            affectedArea: [[33.0, 35.0], [33.3, 35.7]],
            intensity: "medium",
            icon: "border"
        },
        territoryControl: { israeli: 85, palestinian: 15, hamas: 2 }
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
        date: "2008",
        title: "Gaza Blockade Tightened",
        description: "Israel imposes sea and air blockade on Gaza after Hamas takes control. Creates humanitarian crisis.",
        category: "political",
        era: "2006-2023",
        impact: "Establishes Gaza as sealed territory under Israeli-Egyptian control.",
        geography: {
            type: "political",
            coordinates: [31.3500, 34.3000], // Rafah crossing
            affectedArea: [[31.2, 34.2], [31.5, 34.4]],
            intensity: "high",
            icon: "blockade"
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
        date: "2010",
        title: "Gaza Flotilla Attack",
        description: "Israeli forces board Turkish flotilla attempting to break Gaza blockade. 9 Turkish activists killed. International condemnation.",
        category: "military",
        era: "2006-2023",
        impact: "Increases international pressure on Gaza blockade, damages Israel-Turkey relations.",
        geography: {
            type: "attack",
            coordinates: [31.5000, 32.0000], // Mediterranean
            affectedArea: [[31.3, 31.8], [31.7, 32.2]],
            intensity: "medium",
            icon: "naval"
        },
        territoryControl: { israeli: 85, palestinian: 15, hamas: 2 }
    },
    {
        date: "2011",
        title: "Arab Spring: Regional Upheaval",
        description: "Popular uprisings across Arab world. Palestinian statehood bid at UN. Israel concerned about regional instability.",
        category: "social",
        era: "2006-2023",
        impact: "Reshapes Middle East politics, creates new opportunities and threats.",
        geography: {
            type: "social",
            coordinates: [30.0500, 31.2500], // Egypt (Tahrir Square)
            affectedArea: [[29.5, 30.5], [30.5, 32.0]],
            intensity: "high",
            icon: "uprising"
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
        date: "2012",
        title: "UN Palestinian State Recognition",
        description: "UN General Assembly upgrades Palestinian status to 'non-member observer state'. Major diplomatic victory for Palestinians.",
        category: "political",
        era: "2006-2023",
        impact: "Provides platform for Palestinian statehood at international level.",
        geography: {
            type: "political",
            coordinates: [40.7128, -74.0060], // UN Headquarters
            affectedArea: [[40.5, -74.5], [41.0, -73.5]],
            intensity: "medium",
            icon: "recognition"
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
        date: "2015",
        title: "Jerusalem Stabbing Intifada",
        description: "Series of lone-wolf attacks against Israelis in Jerusalem. Heightened security measures, tensions at holy sites.",
        category: "military",
        era: "2006-2023",
        impact: "Shifts conflict tactics to individual attacks, creates new security challenges.",
        geography: {
            type: "attack",
            coordinates: [31.7785, 35.2353],
            affectedArea: [[31.7, 35.1], [31.9, 35.4]],
            intensity: "medium",
            icon: "terrorism"
        },
        territoryControl: { israeli: 85, palestinian: 15, hamas: 2 }
    },
    {
        date: "2016",
        title: "UN Security Council Resolution 2334",
        description: "UN condemns Israeli settlements as illegal obstacle to peace. First UN resolution focused on settlement activity.",
        category: "political",
        era: "2006-2023",
        impact: "International legal pressure on settlement expansion increases.",
        geography: {
            type: "political",
            coordinates: [40.7128, -74.0060], // UN Headquarters
            affectedArea: [[40.5, -74.5], [41.0, -73.5]],
            intensity: "medium",
            icon: "resolution"
        },
        territoryControl: { israeli: 85, palestinian: 15, hamas: 2 }
    },
    {
        date: "2017",
        title: "US Embassy Moved to Jerusalem",
        description: "Trump recognizes Jerusalem as Israeli capital, moves embassy. International controversy, Palestinian protests.",
        category: "political",
        era: "2006-2023",
        impact: "Changes 70-year US policy, creates major diplomatic shift.",
        geography: {
            type: "political",
            coordinates: [31.7683, 35.2137],
            affectedArea: [[31.7, 35.1], [31.9, 35.4]],
            intensity: "high",
            icon: "embassy"
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
        date: "2019",
        title: "Netanyahu Campaign Promise: West Bank Annexation",
        description: "Netanyahu promises to annex West Bank if re-elected. Major shift in Israeli policy toward two-state solution.",
        category: "political",
        era: "2006-2023",
        impact: "International alarm over potential end to two-state solution.",
        geography: {
            type: "political",
            coordinates: [31.9522, 35.2332],
            affectedArea: [[31.7, 35.0], [32.2, 35.4]],
            intensity: "medium",
            icon: "annexation"
        },
        territoryControl: { israeli: 85, palestinian: 15, hamas: 2 }
    },
    {
        date: "2020",
        title: "Abraham Accords: Historic Normalization",
        description: "UAE, Bahrain, Morocco, Sudan normalize relations with Israel. Trump administration brokered deals. Palestinians angered.",
        category: "political",
        era: "2006-2023",
        impact: "Breaks decades of Arab consensus, creates new regional dynamics.",
        geography: {
            type: "political",
            coordinates: [24.7136, 46.6753], // Abu Dhabi
            affectedArea: [[20.0, 40.0], [30.0, 50.0]],
            intensity: "high",
            icon: "normalization"
        },
        territoryControl: { israeli: 85, palestinian: 15, hamas: 2 }
    },
    {
        date: "2021",
        title: "Jerusalem Evictions and Sheikh Jarrah Crisis",
        description: "Israeli police evict Palestinian families from Sheikh Jarrah neighborhood. Leads to Gaza war and international condemnations.",
        category: "political",
        era: "2006-2023",
        impact: "Shows interconnection between Jerusalem issues and Gaza conflicts.",
        geography: {
            type: "political",
            coordinates: [31.7828, 35.2353],
            affectedArea: [[31.7, 35.1], [31.9, 35.4]],
            intensity: "medium",
            icon: "eviction"
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
    {
        date: "2022",
        title: "Abraham Accords Summit & Implementation",
        description: "Summit in Negev with Israel, US, UAE, Bahrain. Implementation of normalization deals continues despite criticism.",
        category: "political",
        era: "2006-2023",
        impact: "Establishes new regional cooperation frameworks excluding Palestinians.",
        geography: {
            type: "political",
            coordinates: [30.8500, 34.7500], // Negev
            affectedArea: [[30.5, 34.5], [31.0, 35.0]],
            intensity: "medium",
            icon: "summit"
        },
        territoryControl: { israeli: 85, palestinian: 15, hamas: 2 }
    },
    {
        date: "2022",
        title: "UN Investigates War Crimes Allegations",
        description: "UN opens investigations into possible war crimes in Gaza and occupied territories. Israel and Hamas both face scrutiny.",
        category: "political",
        era: "2006-2023",
        impact: "Increases international legal pressure on conflict parties.",
        geography: {
            type: "political",
            coordinates: [40.7128, -74.0060], // UN Headquarters
            affectedArea: [[40.5, -74.5], [41.0, -73.5]],
            intensity: "medium",
            icon: "legal"
        },
        territoryControl: { israeli: 85, palestinian: 15, hamas: 2 }
    },
    {
        date: "2023",
        title: "Ben-Gvir National Security Minister",
        description: "Far-right extremist Itamar Ben-Gvir appointed National Security Minister. Changes Israeli policing policies.",
        category: "political",
        era: "2006-2023",
        impact: "Shifts Israeli government further right, increases tensions with Palestinians.",
        geography: {
            type: "political",
            coordinates: [31.7683, 35.2137],
            affectedArea: [[31.7, 35.1], [31.9, 35.4]],
            intensity: "medium",
            icon: "appointment"
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
        movementData: {
            type: "ground_incursion",
            faction: "hamas",
            coordinates: [
                [31.3525, 34.3050], // Gaza Strip starting point
                [31.4000, 34.3500], // Kfar Aza
                [31.4500, 34.3800], // Sderot
                [31.5500, 34.5000], // Ofakim
                [31.3000, 34.2800], // Khan Younis area
                [31.2500, 34.2500]  // Reaching deeper into Israel
            ],
            startTime: "2023-10-07",
            endTime: "2023-10-08"
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
    currentYear: 1994, // Start at 1994 to show Hamas attacks
    showAttacks: true,
    showPolitical: true,
    showSocial: true,
    showTerritory: true,
    showSettlements: true,
    showCities: true,
    showMovements: true, // Enable faction markers by default
    playSpeed: 1000,
    map: null,
    territoryLayer: null,
    markerLayer: null,
    cityLayer: null,
    movementLayer: null,
    flagLayer: null,
    isUpdating: false // Add this important flag
};

// Initialize the timeline
async function initializeTimeline() {
    const timelineContainer = document.getElementById('timeline');
    
    // Clear existing content
    timelineContainer.innerHTML = '';
    
    // Get all events including CSV attacks (now async)
    const allEvents = await getAllEvents();
    
    // Create timeline events
    allEvents.forEach((event, index) => {
        const eventElement = createTimelineEvent(event, index);
        timelineContainer.appendChild(eventElement);
    });
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize map
    initializeMap();
    
    // Add scroll animations
    // observeTimelineEvents();
}

function createTimelineEvent(event, index) {
    'use strict';
    
    const eventDiv = document.createElement('div');
    eventDiv.className = `timeline-event ${event.category}`;
    eventDiv.dataset.era = event.era;
    eventDiv.dataset.category = event.category;
    
    // Create military symbol for military events using existing NATOSymbolLibrary
    let militarySymbolHtml = '';
    if (event.category === 'military' && event.militaryClassification && typeof NATOSymbolLibrary !== 'undefined') {
        try {
            const natoLibrary = new NATOSymbolLibrary();
            const symbol = natoLibrary.createSymbol(
                event.militaryClassification.unitType || 'infantry',
                event.militaryClassification.affiliation || 'neutral',
                { size: event.militaryClassification.size || 'squad' }
            );
            const symbolData = natoSymbolLibrary.generateSymbol(symbol.affiliation, symbol.unitType, 'unit');
            const svgSymbol = symbolData.svg;
            militarySymbolHtml = `<div class="military-symbol-container">${svgSymbol}</div>`;
        } catch (error) {
            console.warn('Failed to create military symbol:', error);
            militarySymbolHtml = '<div class="default-marker"></div>';
        }
    } else {
        militarySymbolHtml = '<div class="default-marker"></div>';
    }
    
    eventDiv.innerHTML = `
        <div class="event-marker">
            ${militarySymbolHtml}
        </div>
        <div class="event-content">
            <div class="event-date">${event.date}</div>
            <h3 class="event-title">${event.title}</h3>
            <p class="event-description">${event.description}</p>
            ${event.militaryClassification ? `
                <div class="military-classification">
                    <span class="classification-badge ${event.militaryClassification.intensity}">
                        ${event.militaryClassification.unitType} - ${event.militaryClassification.size}
                    </span>
                    ${event.casualties ? `
                        <span class="casualty-count">
                            ${event.casualties.totalCasualties || 0} casualties
                        </span>
                    ` : ''}
                </div>
            ` : ''}
            <div class="event-impact">
                <strong style="color: #000;">Impact:</strong> <span style="color: #e74c3c;">${event.impact}</span>
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
async function initializeMap() {
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
    
    // Add comprehensive legend with dropdown (single legend window)
    addMapLegend();
    
    setupMapControls();
    console.log('🚀 Initializing map with year 1994');
    await updateMapForYear(1994); // Start at 1994 to show Hamas attacks
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

// Define military factions with their symbols and colors
const militaryFactions = {
    'IDF': {
        name: 'IDF',
        symbol: '★',
        color: '#2563eb'
    },
    'Israeli Defense Force': {
        name: 'IDF',
        symbol: '★',
        color: '#2563eb'
    },
    'Hamas': {
        name: 'Hamas',
        symbol: '▲',
        color: '#dc2626'
    },
    'Palestinian Authority': {
        name: 'Palestinian Authority',
        symbol: '●',
        color: '#16a34a'
    },
    'Fatah': {
        name: 'Palestinian Authority',
        symbol: '●',
        color: '#16a34a'
    },
    'Hezbollah': {
        name: 'Hezbollah',
        symbol: '★',
        color: '#7c3aed'
    },
    'Iran': {
        name: 'Iran',
        symbol: '⬢',
        color: '#991b1b'
    },
    'Arab Forces': {
        name: 'Arab Forces',
        symbol: '⬟',
        color: '#f97316'
    },
    'Egypt-Syria Coalition': {
        name: 'Egypt-Syria Coalition',
        symbol: '⬟',
        color: '#ea580c'
    }
};

// Add comprehensive map legend
// Dual legend system: Enhanced NATO legend + Original military factions dropdown
function addMapLegend() {
    // Enhanced NATO legend is already in HTML, just initialize it
    if (typeof setupEnhancedLegend === 'function') {
        setupEnhancedLegend();
    }
    
    // Original legend as dropdown for compatibility
    const legend = L.control({ position: 'topright' });
    
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'legacy-map-legend');
        
        const legendContent = `
            <div style="background: rgba(0, 0, 0, 0.95); padding: 12px; border-radius: 8px; color: white; font-size: 11px; min-width: 200px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <select id="legend-dropdown" style="flex: 1; margin-right: 8px; padding: 4px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; border-radius: 4px; cursor: pointer;">
                        <option value="military">Military Symbols</option>
                        <option value="territory">Territory Control</option>
                        <option value="factions">Military Factions</option>
                        <option value="events">Event Types</option>
                    </select>
                    <button id="legend-hide-btn" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 11px;">✕</button>
                </div>
                <div id="legend-content-area">
                </div>
            </div>
        `;
        
        div.innerHTML = legendContent;
        
        // Setup hide button
        const hideBtn = div.querySelector('#legend-hide-btn');
        const toggleBtn = document.getElementById('toggle-legend-btn');
        if (hideBtn) {
            hideBtn.addEventListener('click', () => {
                legend.remove();
                // Show toggle button
                if (toggleBtn) {
                    toggleBtn.classList.remove('hidden');
                }
                window.legendVisible = false;
            });
        }
        
        // Setup dropdown
        const dropdown = div.querySelector('#legend-dropdown');
        const contentArea = div.querySelector('#legend-content-area');
        
        if (dropdown && contentArea) {
            dropdown.addEventListener('change', (e) => {
                switch(e.target.value) {
                    case 'military':
                        contentArea.innerHTML = generateMilitarySymbolsLegend();
                        break;
                    case 'territory':
                        contentArea.innerHTML = generateTerritoryLegend();
                        break;
                    case 'factions':
                        contentArea.innerHTML = generateMilitaryFactionsLegend();
                        break;
                    case 'events':
                        contentArea.innerHTML = generateEventTypesLegend();
                        break;
                }
            });
            
            // Initialize with military symbols
            contentArea.innerHTML = generateMilitarySymbolsLegend();
        }

        // Mark legend as visible
        window.legendVisible = true;
        
        // Hide toggle button since legend is now shown
        if (toggleBtn) {
            toggleBtn.classList.add('hidden');
        }

        return div;
    };
    
    legend.addTo(mapState.map);
    
    // Store legend control for re-showing
    window.mapLegendControl = legend;
}
    
// Generate territory control legend content
function generateTerritoryLegend() {
    return `
        <div>
            <div style="font-weight: bold; margin-bottom: 8px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom:5px;">TERRITORY CONTROL</div>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
                <div style="display: flex; align-items: center; margin-bottom:6px;">
                    <div style="width: 12px; height: 12px; background: rgba(52, 152, 219, 0.3); border: 2px solid rgba(52, 152, 219, 0.7); margin-right: 8px;"></div>
                    <span>Israeli Control</span>
                </div>
                <div style="display: flex; align-items: center; margin-bottom:6px;">
                    <div style="width: 12px; height: 12px; background: rgba(155, 89, 182, 0.3); border: 2px solid rgba(155, 89, 182, 0.7); margin-right: 8px;"></div>
                    <span>Palestinian Control</span>
                </div>
                <div style="display: flex; align-items: center; margin-bottom:6px;">
                    <div style="width: 12px; height: 12px; background: rgba(231, 76, 60, 0.4); border: 2px solid rgba(231, 76, 60, 0.8); margin-right: 8px;"></div>
                    <span>Hamas Control</span>
                </div>
                <div style="display: flex; align-items: center; margin-bottom:6px;">
                    <div style="width: 12px; height: 12px; background: rgba(255, 165, 0, 0.3); border: 2px dashed rgba(255, 165, 0, 0.7); margin-right: 8px;"></div>
                    <span>Occupied Areas</span>
                </div>
            </div>
        </div>
    `;
}

// Generate military factions legend with NATO symbol shapes
function generateMilitaryFactionsLegend() {
    const factions = [
        { key: 'idf', name: 'IDF (Israel)', affiliation: 'friendly', color: '#2563eb' },
        { key: 'hamas', name: 'Hamas', affiliation: 'hostile', color: '#dc2626' },
        { key: 'egyptian_syrian', name: 'Egypt-Syria Coalition', affiliation: 'hostile', color: '#ea580c' },
        { key: 'arab_forces', name: 'Arab Forces', affiliation: 'hostile', color: '#f97316' },
        { key: 'pij', name: 'Palestinian Islamic Jihad', affiliation: 'hostile', color: '#ea580c' },
        { key: 'hezbollah', name: 'Hezbollah', affiliation: 'hostile', color: '#7c3aed' },
        { key: 'fatah', name: 'Fatah/PA', affiliation: 'neutral', color: '#16a34a' },
        { key: 'iran', name: 'Iran (Supporter)', affiliation: 'hostile', color: '#991b1b' }
    ];

    const frameShapes = {
        'friendly': 'rectangle',
        'hostile': 'diamond',
        'neutral': 'square',
        'unknown': 'quatrefoil'
    };

    return `
        <div>
            <div style="font-weight: bold; margin-bottom: 8px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 5px;">MILITARY FACTIONS</div>
            <div style="display: flex; flex-direction: column; gap: 6px; font-size: 11px;">
                ${factions.map(faction => {
                    const shape = frameShapes[faction.affiliation];
                    const frameSVG = getFrameSVG(shape, faction.color);
                    return `
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <svg width="20" height="20" viewBox="0 0 24 24" style="flex-shrink: 0;">${frameSVG}</svg>
                            <span>${faction.name}</span>
                        </div>
                    `;
                }).join('')}
            </div>
            <div style="margin-top: 12px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.2); font-size: 10px; color: #9ca3af;">
                <strong>NATO Frames:</strong><br>
                ■ Rectangle = Friendly<br>
                ◆ Diamond = Hostile<br>
                □ Square = Neutral
            </div>
        </div>
    `;
}

// Helper: Get NATO frame SVG shape
function getFrameSVG(shape, color) {
    switch (shape) {
        case 'rectangle':
            return `<rect x="2" y="2" width="20" height="20" fill="${color}" fill-opacity="0.8" stroke="white" stroke-width="1"/>`;
        case 'diamond':
            return `<rect x="2" y="2" width="20" height="20" fill="${color}" fill-opacity="0.8" stroke="white" stroke-width="1" transform="rotate(45 12 12)"/>`;
        case 'square':
            return `<rect x="4" y="4" width="16" height="16" fill="${color}" fill-opacity="0.8" stroke="white" stroke-width="1"/>`;
        default:
            return `<circle cx="12" cy="12" r="10" fill="${color}" fill-opacity="0.8" stroke="white" stroke-width="1"/>`;
    }
}

// Generate military symbols legend content
function generateMilitarySymbolsLegend() {
    const affiliations = [
        { key: 'friendly', name: 'Friendly Forces', color: '#0066CC' },
        { key: 'hostile', name: 'Hostile Forces', color: '#CC0000' },
        { key: 'neutral', name: 'Neutral Forces', color: '#00AA00' },
        { key: 'unknown', name: 'Unknown Forces', color: '#FFAA00' }
    ];
    
    const unitTypes = [
        { key: 'infantry', name: 'Infantry' },
        { key: 'armor', name: 'Armor' },
        { key: 'artillery', name: 'Artillery' },
        { key: 'headquarters', name: 'Headquarters' },
        { key: 'checkpoint', name: 'Checkpoint' },
        { key: 'settlement', name: 'Settlement' }
    ];
    
    let legendHTML = `
        <div>
            <div style="font-weight: bold; margin-bottom: 12px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom:5px;">MILITARY SYMBOLS (1994 NATO)</div>
            
            <div style="margin-bottom: 16px;">
                <div style="font-weight: bold; margin-bottom: 8px; color: #fff; font-size: 12px; text-align: center;">Affiliation Frames</div>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
    `;
    
    // Add affiliation symbols - using direct SVG creation like working functions
    affiliations.forEach(affiliation => {
        let frameIcon = '';
        if (affiliation.key === 'friendly') {
            frameIcon = `<rect x="8" y="8" width="24" height="24" fill="${affiliation.color}" fill-opacity="0.7" stroke="${affiliation.color}" stroke-width="2"/>`;
        } else if (affiliation.key === 'hostile') {
            frameIcon = `<rect x="8" y="8" width="24" height="24" fill="${affiliation.color}" fill-opacity="0.7" stroke="${affiliation.color}" stroke-width="2" transform="rotate(45 20 20)"/>`;
        } else if (affiliation.key === 'neutral') {
            frameIcon = `<rect x="10" y="10" width="20" height="20" fill="${affiliation.color}" fill-opacity="0.7" stroke="${affiliation.color}" stroke-width="2"/>`;
        } else {
            frameIcon = `<rect x="8" y="8" width="24" height="24" fill="${affiliation.color}" fill-opacity="0.7" stroke="${affiliation.color}" stroke-width="2"/>`;
        }
        
        legendHTML += `
            <div style="display: flex; align-items: center; gap: 8px; padding: 6px; background: rgba(255,255,255,0.05); border-radius: 4px;">
                    <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                            ${frameIcon}
                            <g stroke="white" stroke-width="2" fill="none">
                                <line x1="14" y1="14" x2="26" y2="26"/>
                                <line x1="26" y1="14" x2="14" y2="26"/>
                            </g>
                        </svg>
                    </div>
                    <span style="color: #e1e8ed; font-size: 11px;">${affiliation.name}</span>
                </div>
        `;
    });
    
    legendHTML += `
                </div>
            </div>
            
            <div style="margin-bottom: 16px;">
                <div style="font-weight: bold; margin-bottom: 8px; color: #fff; font-size: 12px; text-align: center;">Unit Types (Example)</div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
    `;
    
    // Add unit type examples - simple icons like working functions
    unitTypes.slice(0, 6).forEach(unitType => {
        let unitIcon = '';
        if (unitType.key === 'infantry') {
            unitIcon = `<g stroke="white" stroke-width="2" fill="none">
                            <line x1="14" y1="14" x2="26" y2="26"/>
                            <line x1="26" y1="14" x2="14" y2="26"/>
                        </g>`;
        } else if (unitType.key === 'armor') {
            unitIcon = `<ellipse cx="20" cy="20" rx="10" ry="7" fill="none" stroke="white" stroke-width="2"/>`;
        } else if (unitType.key === 'artillery') {
            unitIcon = `<circle cx="20" cy="20" r="8" fill="none" stroke="white" stroke-width="2"/>`;
        } else if (unitType.key === 'headquarters') {
            unitIcon = `<rect x="14" y="18" width="12" height="4" fill="white" stroke="none"/>`;
        } else if (unitType.key === 'checkpoint') {
            unitIcon = `<rect x="14" y="16" width="12" height="8" fill="none" stroke="white" stroke-width="2"/>`;
        } else if (unitType.key === 'settlement') {
            unitIcon = `<g stroke="white" stroke-width="1.5" fill="white">
                            <circle cx="20" cy="8" r="3"/>
                            <path d="M 12 24 L 20 16 L 28 24 L 28 32 L 12 32 Z"/>
                        </g>`;
        } else {
            unitIcon = `<g stroke="white" stroke-width="2" fill="none">
                            <line x1="14" y1="14" x2="26" y2="26"/>
                            <line x1="26" y1="14" x2="14" y2="26"/>
                        </g>`;
        }
        
        legendHTML += `
            <div style="display: flex; flex-direction: column; align-items: center; padding: 6px; background: rgba(255,255,255,0.05); border-radius: 4px;">
                    <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                            <rect x="8" y="8" width="24" height="24" fill="${affiliations[0].color}" fill-opacity="0.7" stroke="${affiliations[0].color}" stroke-width="2"/>
                            ${unitIcon}
                        </svg>
                    </div>
                    <span style="color: #e1e8ed; font-size: 10px; text-align: center;">${unitType.name}</span>
                </div>
        `;
    });
    
    legendHTML += `
                </div>
            </div>
        </div>
    `;
    
    return legendHTML;
}

// Generate national forces legend content
function generateNationalForcesLegend() {
    if (typeof window.FlagSystem === 'undefined') {
        return '<div style="padding: 10px; text-align: center;">Flag system not available</div>';
    }
    
    const flagSystem = new window.FlagSystem();
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
    
    const flagsHTML = nations.map(nation => `
        <div style="display: flex; align-items: center; gap: 8px; padding: 6px 8px; background: rgba(255,255,255,0.05); border-radius: 4px; margin-bottom: 4px;">
            <div style="width: 32px; height: 20px; border-radius: 2px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.2);">
                ${flagSystem.getFlagElement(nation.key, 24)}
            </div>
            <span style="color: #e1e8ed; font-size: 11px; font-weight: 500;">${nation.name}</span>
        </div>
    `).join('');
    
    return `
        <div>
            <div style="font-weight: bold; margin-bottom: 12px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom:5px;">NATIONAL FORCES</div>
            <div style="max-height: 400px; overflow-y: auto;">
                ${flagsHTML}
            </div>
        </div>
    `;
}

// Generate event types legend content
function generateEventTypesLegend() {
    return `
        <div>
            <div style="font-weight: bold; margin-bottom: 8px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom:5px;">EVENT TYPES</div>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
                <div style="display: flex; align-items: center; margin-bottom:6px;">
                    <div style="width: 12px; height: 12px; background: #e74c3c; border-radius: 2px; margin-right: 8px;"></div>
                    <span>Attacks</span>
                </div>
                <div style="display: flex; align-items: center; margin-bottom:6px;">
                    <div style="width: 12px; height: 12px; background: #3498db; border-radius: 2px; margin-right: 8px;"></div>
                    <span>Settlements</span>
                </div>
                <div style="display: flex; align-items: center; margin-bottom:6px;">
                    <div style="width: 12px; height: 12px; background: #9b59b6; border-radius: 2px; margin-right: 8px;"></div>
                    <span>Political</span>
                </div>
                <div style="display: flex; align-items: center; margin-bottom:6px;">
                    <div style="width: 12px; height: 12px; background: #f39c12; border-radius: 2px; margin-right: 8px;"></div>
                    <span>Social</span>
                </div>
                <div style="display: flex; align-items: center; margin-bottom:6px;">
                    <div style="width: 12px; height: 12px; background: #27ae60; border-radius: 2px; margin-right: 8px;"></div>
                    <span>Territory</span>
                </div>
            </div>
        </div>
    `;
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
    const showMovements = document.getElementById('show-movements');
    
    if (showAttacks) {
        showAttacks.addEventListener('change', async (e) => {
            mapState.showAttacks = e.target.checked;
            await updateMapForYear(mapState.currentYear);
        });
    }
    
    if (showPolitical) {
        showPolitical.addEventListener('change', async (e) => {
            mapState.showPolitical = e.target.checked;
            await updateMapForYear(mapState.currentYear);
        });
    }
    
    if (showSocial) {
        showSocial.addEventListener('change', async (e) => {
            mapState.showSocial = e.target.checked;
            await updateMapForYear(mapState.currentYear);
        });
    }
    
    if (showTerritory) {
        showTerritory.addEventListener('change', async (e) => {
            mapState.showTerritory = e.target.checked;
            await updateMapForYear(mapState.currentYear);
        });
    }
    
    if (showSettlements) {
        showSettlements.addEventListener('change', async (e) => {
            mapState.showSettlements = e.target.checked;
            await updateMapForYear(mapState.currentYear);
        });
    }
    
    if (showCities) {
        showCities.addEventListener('change', async (e) => {
            mapState.showCities = e.target.checked;
            await updateMapForYear(mapState.currentYear);
        });
    }
    
    if (showMovements) {
        showMovements.addEventListener('change', async (e) => {
            mapState.showMovements = e.target.checked;
            await updateMapForYear(mapState.currentYear);
        });
    }
    
    // Flag toggle control
    const showFlags = document.getElementById('show-flags');
    if (showFlags) {
        // Use existing clusterState from clustering system
        if (typeof clusterState !== 'undefined') {
            clusterState.showFlags = showFlags.checked;
        }
        
        showFlags.addEventListener('change', async (e) => {
            window.clusterState.showFlags = e.target.checked;
            console.log('🏳 Flag toggle:', e.target.checked);
            await updateMapForYear(mapState.currentYear);
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

        if (slider) {
            slider._isProgrammatic = true;
            slider.value = mapState.currentYear;
        }
        if (yearDisplay) yearDisplay.textContent = mapState.currentYear;
        updateMapForYear(mapState.currentYear);
        updateActiveTickMarks(mapState.currentYear);
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
async function handleSliderChange(e) {
    const slider = e.target;
    const yearDisplay = document.getElementById('current-year');

    // Check if this is a programmatic change (from animation)
    if (slider._isProgrammatic) {
        slider._isProgrammatic = false;
        mapState.currentYear = parseInt(slider.value);
        if (yearDisplay) yearDisplay.textContent = mapState.currentYear;
        await updateMapForYear(mapState.currentYear);
        updateActiveTickMarks(mapState.currentYear);
        return;
    }

    const currentValue = parseInt(slider.value);
    
    // Use years with coordinates for snapping (not all years)
    const eventYears = getYearsWithCoordinates();

    // Find the nearest event year with coordinates
    const nearestYear = findNearestEventYear(currentValue, eventYears);

    // Snap to nearest event year with coordinates if close enough (within 3 years)
    if (Math.abs(currentValue - nearestYear) <= 3 && eventYears.includes(nearestYear)) {
        slider.value = nearestYear;
        mapState.currentYear = nearestYear;
    } else {
        mapState.currentYear = currentValue;
    }

    if (yearDisplay) yearDisplay.textContent = mapState.currentYear;
    
    // Log for debugging
    const visibleEvents = await getAllEvents();
    const eventsThisYear = visibleEvents.filter(ev => {
        const evYear = getEventYear(ev.date);
        return evYear === mapState.currentYear && ev.geography?.coordinates;
    });
    console.log(`📅 Year ${mapState.currentYear}: ${eventsThisYear.length} events with coordinates`);
    
    await updateMapForYear(mapState.currentYear);
    updateActiveTickMarks(mapState.currentYear);
}

// Extract unique event years from timelineEvents
function getEventYears() {
    const years = new Set();
    const allEvents = getAllEventsSync();

    allEvents.forEach(event => {
        if (!event.date) return;

        const dateStr = event.date.toString();

        // Handle date ranges (e.g., "1900-1917", "2008-2009")
        if (dateStr.includes('-')) {
            const parts = dateStr.split('-');
            const startYear = parseInt(parts[0]);
            const endYear = parseInt(parts[1]);

            // Add start year
            if (!isNaN(startYear)) {
                years.add(startYear);
            }

            // For ranges longer than 5 years, also add intermediate decades
            if (!isNaN(startYear) && !isNaN(endYear) && (endYear - startYear) > 5) {
                for (let year = startYear + 10; year < endYear; year += 10) {
                    years.add(year);
                }
            }

            // Add end year if it's a significant event
            if (!isNaN(endYear)) {
                years.add(endYear);
            }
        } else {
            // Handle single year
            const year = parseInt(dateStr);
            if (!isNaN(year)) {
                years.add(year);
            }
        }
    });

    // Filter to only years within slider range
    return Array.from(years).filter(year => year >= 1900 && year <= 2025).sort((a, b) => a - b);
}

// Get years that have events WITH valid coordinates
function getYearsWithCoordinates() {
    const years = new Set();
    const allEvents = getAllEventsSync();

    allEvents.forEach(event => {
        // Only add years for events with valid coordinates
        if (event.geography && event.geography.coordinates) {
            const dateStr = event.date.toString();

            if (dateStr.includes('-')) {
                // For date ranges, use end year
                const parts = dateStr.split('-');
                const endYear = parseInt(parts[parts.length - 1]);
                if (!isNaN(endYear) && endYear >= 1900 && endYear <= 2025) {
                    years.add(endYear);
                }
            } else {
                const year = parseInt(dateStr);
                if (!isNaN(year) && year >= 1900 && year <= 2025) {
                    years.add(year);
                }
            }
        }
    });

    return Array.from(years).sort((a, b) => a - b);
}

// Find nearest event year
function findNearestEventYear(currentValue, eventYears) {
    if (eventYears.length === 0) return currentValue;

    let nearest = eventYears[0];
    let minDiff = Math.abs(currentValue - nearest);

    for (const year of eventYears) {
        const diff = Math.abs(currentValue - year);
        if (diff < minDiff) {
            minDiff = diff;
            nearest = year;
        }
    }

    return nearest;
}

// Create tick marks for event years
function createTickMarks() {
    const container = document.querySelector('.timeline-slider-container');
    if (!container) return;

    // Check if tick track already exists
    let trackContainer = container.querySelector('.slider-track-container');
    if (trackContainer) {
        trackContainer.remove();
    }

    const slider = document.getElementById('timeline-slider');
    if (!slider) return;

    // Create track container
    trackContainer = document.createElement('div');
    trackContainer.className = 'slider-track-container';

    // Get years with coordinates for snapping
    const yearsWithCoords = getYearsWithCoordinates();
    
    // Get all event years for display
    const allEventYears = getEventYears();
    const minYear = 1900;
    const maxYear = 2025;
    const sliderWidth = slider.offsetWidth;

    // Only show ticks for major decades to avoid overcrowding
    const decadeYears = allEventYears.filter(year => year % 10 === 0 || allEventYears.indexOf(year) % Math.ceil(allEventYears.length / 15) === 0);

    decadeYears.forEach(year => {
        // Create tick mark
        const tick = document.createElement('div');
        tick.className = 'slider-tick-mark';
        tick.dataset.year = year;
        
        // Mark years that have events with coordinates
        if (yearsWithCoords.includes(year)) {
            tick.classList.add('has-events');
        } else {
            tick.classList.add('no-events');
        }

        const position = ((year - minYear) / (maxYear - minYear)) * 100;
        tick.style.left = `${position}%`;

        trackContainer.appendChild(tick);

        // Create label for decade years
        if (year % 10 === 0) {
            const label = document.createElement('span');
            label.className = 'slider-tick-label';
            label.textContent = year;
            label.dataset.year = year;
            label.style.left = `${position}%`;
            trackContainer.appendChild(label);
        }
    });

    // Insert after slider
    slider.parentNode.insertBefore(trackContainer, slider.nextSibling);
}

// Update active tick marks based on current year
function updateActiveTickMarks(currentYear) {
    const ticks = document.querySelectorAll('.slider-tick-mark');
    const labels = document.querySelectorAll('.slider-tick-label');

    ticks.forEach(tick => {
        const year = parseInt(tick.dataset.year);
        if (!isNaN(year)) {
            tick.classList.toggle('active', year === currentYear);
        }
    });

    labels.forEach(label => {
        const year = parseInt(label.dataset.year);
        if (!isNaN(year)) {
            label.classList.toggle('active', year === currentYear);
        }
    });
}

// Initialize timeline tick marks
function initializeTimelineTicks() {
    // Wait for DOM to be ready
    setTimeout(() => {
        createTickMarks();

        // Update active ticks for initial year
        const slider = document.getElementById('timeline-slider');
        if (slider) {
            const initialYear = parseInt(slider.value) || 1994;
            updateActiveTickMarks(initialYear);
        }

        // Handle window resize to reposition ticks
        window.addEventListener('resize', () => {
            createTickMarks();
            const slider = document.getElementById('timeline-slider');
            if (slider) {
                updateActiveTickMarks(parseInt(slider.value) || 1994);
            }
        });
    }, 100);
}


// Handle speed change
function handleSpeedChange(e) {
    mapState.playSpeed = parseInt(e.target.value);
    if (mapState.isPlaying) {
        pauseMapAnimation();
        startMapAnimation();
    }
}

// Add helper function to prevent year parsing issues
function getEventYear(dateString) {
    if (!dateString) return new Date().getFullYear();
    // Handle date ranges like "1900-1917" or "2008-2009" - use the END year
    if (dateString.includes('-')) {
        const parts = dateString.split('-');
        const lastPart = parts[parts.length - 1];
        const year = parseInt(lastPart.trim());
        if (!isNaN(year)) {
            // Convert 2-digit years to 4-digit
            if (year < 100) {
                return year >= 90 ? 1900 + year : 2000 + year;
            }
            return year;
        }
    }
    // Handle single year like "2008" or "1993"
    const date = new Date(dateString);
    if (!isNaN(date.getFullYear())) {
        return date.getFullYear();
    }
    // Fallback: try to extract first 4 digits
    const match = dateString.match(/(\d{4})/);
    if (match) {
        return parseInt(match[1]);
    }
    return new Date().getFullYear();
}

// Get events filtered by year (events up to and including the year)
function getFilteredEventsForYear(year) {
    return timelineEvents.filter(event => {
        const eventYear = getEventYear(event.date);
        return eventYear <= year;
    });
}

// Update map for specific year with recursion prevention
async function updateMapForYear(year) {
    console.log('🔄 updateMapForYear called with year:', year);
    
    // Prevent recursive calls
    if (mapState.isUpdating) {
        console.log('🚫 Preventing recursive call');
        return;
    }
    
    mapState.isUpdating = true;
    
    try {
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
        if (mapState.movementLayer) {
            mapState.map.removeLayer(mapState.movementLayer);
        }
        if (mapState.flagLayer) {
            mapState.map.removeLayer(mapState.flagLayer);
        }
        
        // Create new layers
        mapState.territoryLayer = L.layerGroup();
        mapState.markerLayer = L.layerGroup();
        mapState.cityLayer = L.layerGroup();
        mapState.movementLayer = L.layerGroup();
        mapState.flagLayer = L.layerGroup();
        
        // Get events for this year and earlier (now async)
        const allEvents = await getAllEvents();
        const relevantEvents = allEvents.filter(event => {
            const eventYear = getEventYear(event.date);
            return eventYear <= year;
        });
        
        console.log('📊 Processing year:', year);
        console.log('📊 Total relevant events:', relevantEvents.length);
        console.log('📊 Hamas attacks in relevant events:', relevantEvents.filter(e => e.title && e.title.includes('Hamas Attack:')).length);
        console.log('📊 Events with movements:', 
            relevantEvents.filter(e => e.movementData).map(e => ({
                title: e.title,
                year: getEventYear(e.date),
                faction: e.movementData?.faction
            }))
        );
        
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
        
        // Draw military movements (only if enabled)
        if (mapState.showMovements) {
            console.log('🎯 Calling drawMovementPaths...');
            drawMovementPaths(relevantEvents);
        } else {
            console.log('⏸️ Movement display is disabled');
        }
        
        // Draw flags (only if enabled AND not using enhanced markers which already include flags)
        if (window.clusterState && window.clusterState.showFlags && typeof window.createEnhancedMilitaryMarker !== 'function') {
            console.log('🏁 Adding flags to map...');
            drawFlagsForEvents(relevantEvents);
        }
        
        // Add layers to map
        if (mapState.showTerritory) {
            mapState.territoryLayer.addTo(mapState.map);
        }
        mapState.markerLayer.addTo(mapState.map);
        if (mapState.showCities) {
            mapState.cityLayer.addTo(mapState.map);
        }
        if (mapState.showMovements) {
            mapState.movementLayer.addTo(mapState.map);
            console.log('✅ Movement layer added with', mapState.movementLayer.getLayers().length, 'unique markers');
        }
        if (window.clusterState && window.clusterState.showFlags && typeof window.createEnhancedMilitaryMarker !== 'function') {
            mapState.flagLayer.addTo(mapState.map);
            console.log('✅ Flag layer added');
        }
        
        // Update statistics
        updateStatistics(relevantEvents);
    } finally {
        mapState.isUpdating = false;
        console.log('✅ updateMapForYear completed');
    }
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
            const mandateArea = [
                [29.5, 34.2], [33.5, 34.2], [33.5, 35.8], [29.5, 35.8], [29.5, 34.2]
            ];
            L.polygon(mandateArea, {
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

// Create custom marker shapes as SVG icons
function createMarkerIcon(type, color, size = 20, intensity = 'medium') {
    const scale = intensity === 'high' ? 1.3 : intensity === 'low' ? 0.8 : 1;
    const actualSize = size * scale;
    
    let svgContent = '';
    let iconSize = [actualSize, actualSize];
    let iconAnchor = [actualSize/2, actualSize/2];
    
    switch(type) {
        case 'attack':
        case 'military':
            // Triangle pointing up for attacks
            svgContent = `
                <svg width="${actualSize}" height="${actualSize}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="12,2 22,20 2,20" fill="${color}" stroke="white" stroke-width="2"/>
                </svg>
            `;
            iconAnchor = [actualSize/2, actualSize-2];
            break;
            
        case 'settlement':
            // Square for settlements
            svgContent = `
                <svg width="${actualSize}" height="${actualSize}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="4" width="16" height="16" fill="${color}" stroke="white" stroke-width="2"/>
                </svg>
            `;
            break;
            
        case 'political':
            // Diamond for political events
            svgContent = `
                <svg width="${actualSize}" height="${actualSize}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="12,2 22,12 12,22 2,12" fill="${color}" stroke="white" stroke-width="2"/>
                </svg>
            `;
            break;
            
        case 'social':
            // Star for social events
            svgContent = `
                <svg width="${actualSize}" height="${actualSize}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" fill="${color}" stroke="white" stroke-width="2"/>
                </svg>
            `;
            break;
            
        case 'territory_change':
            // Hexagon for territory changes
            svgContent = `
                <svg width="${actualSize}" height="${actualSize}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="12,2 20,7 20,17 12,22 4,17 4,7" fill="${color}" stroke="white" stroke-width="2"/>
                </svg>
            `;
            break;
            
        default:
            // Circle fallback
            svgContent = `
                <svg width="${actualSize}" height="${actualSize}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="${color}" stroke="white" stroke-width="2"/>
                </svg>
            `;
            break;
    }
    
    return L.divIcon({
        html: svgContent,
        className: 'custom-marker',
        iconSize: iconSize,
        iconAnchor: iconAnchor,
        popupAnchor: [0, -actualSize/2]
    });
}

// Group events by coordinates to handle overlapping markers
function groupEventsByCoordinates(events, threshold = 0.05) {
    const groups = [];
    const processed = new Set();
    
    events.forEach((event, index) => {
        if (processed.has(index)) return;
        
        if (!event.geography || !event.geography.coordinates) return;
        
        const [lat, lng] = event.geography.coordinates;
        const currentGroup = [event];
        processed.add(index);
        
        // Find events with similar coordinates
        events.forEach((otherEvent, otherIndex) => {
            if (processed.has(otherIndex)) return;
            
            if (!otherEvent.geography || !otherEvent.geography.coordinates) return;
            
            const [otherLat, otherLng] = otherEvent.geography.coordinates;
            const distance = Math.sqrt(Math.pow(lat - otherLat, 2) + Math.pow(lng - otherLng, 2));
            
            if (distance < threshold) {
                currentGroup.push(otherEvent);
                processed.add(otherIndex);
            }
        });
        
        groups.push(currentGroup);
    });
    
    return groups;
}

// Calculate offset positions using improved hierarchical spiral pattern
// Uses zoom-based scaling and consistent spacing for all events
function getHierarchicalOffset(index, total, zoomLevel = 7) {
    if (total === 1) {
        return { latOffset: 0, lngOffset: 0, priority: 0 };
    }

    const baseSpacing = 0.08; // Base ~8km at zoom 7 (increased for better separation)
    const zoomScale = Math.max(0.5, Math.min(2, zoomLevel / 7));
    const spacing = baseSpacing * zoomScale;

    const angleStep = Math.PI * 2 / Math.min(total, 8);
    const radiusIncrement = spacing;

    const angle = index * angleStep;
    const radius = spacing + (index * radiusIncrement * 0.5);

    return {
        latOffset: Math.sin(angle) * radius,
        lngOffset: Math.cos(angle) * radius,
        priority: total - index
    };
}

// Sort events by priority for hierarchical positioning
// Priority: casualties > impact level > date (recent first)
function sortEventsByPriority(events) {
    return [...events].sort((a, b) => {
        const priorityA = calculateEventPriority(a);
        const priorityB = calculateEventPriority(b);
        return priorityB - priorityA;
    });
}

// Calculate numeric priority score for an event
function calculateEventPriority(event) {
    let score = 0;

    const casualties = event.casualties?.totalCasualties || 0;
    score += casualties * 100;

    const impactWeights = { high: 30, medium: 20, low: 10 };
    const impact = event.impact?.toLowerCase() || '';
    if (impact.includes('major') || impact.includes('significant')) {
        score += 30;
    } else if (impact.includes('moderate')) {
        score += 20;
    } else {
        score += 10;
    }

    const year = parseInt(event.date?.split('-')[0]) || 2000;
    const yearScore = (year - 1900) / 125;
    score += yearScore * 5;

    const isHamas = event.title?.toLowerCase().includes('hamas attack');
    if (isHamas) {
        score += 25;
    }

    return score;
}

// Cluster count threshold - use count badge for clusters >= this size
const CLUSTER_COUNT_THRESHOLD = 2;

// Create a count badge marker for large event clusters
function createClusterCountMarker(group, coordinates) {
    const count = group.length;

    // Detect dominant faction from events
    const factions = { idf: 0, hamas: 0, arab_forces: 0, egyptian_syrian: 0, iran: 0, hezbollah: 0, pij: 0, fatah: 0 };

    group.forEach(e => {
        const title = (e.title || '').toLowerCase();
        const desc = (e.description || '').toLowerCase();

        if (title.includes('idf') || title.includes('israel')) factions.idf++;
        else if (title.includes('hamas')) factions.hamas++;
        else if (title.includes('egypt') || title.includes('syria')) factions.egyptian_syrian++;
        else if (title.includes('arab') || title.includes('jordan') || title.includes('lebanon')) factions.arab_forces++;
        else if (title.includes('iran')) factions.iran++;
        else if (title.includes('hezbollah')) factions.hezbollah++;
        else if (title.includes('pij') || title.includes('islamic jihad')) factions.pij++;
        else if (title.includes('fatah') || title.includes('palestinian authority')) factions.fatah++;
        else if (desc.includes('israeli')) factions.idf++;
        else if (desc.includes('palestinian')) factions.hamas++;
    });

    // Find dominant faction
    const dominantFaction = Object.entries(factions).sort((a, b) => b[1] - a[1])[0];
    const factionKey = dominantFaction[0];
    const factionScore = dominantFaction[1];

    // Map faction to NATO affiliation
    const factionAffiliations = {
        idf: 'friendly',
        hamas: 'hostile',
        arab_forces: 'hostile',
        egyptian_syrian: 'hostile',
        iran: 'hostile',
        hezbollah: 'hostile',
        pij: 'hostile',
        fatah: 'neutral'
    };

    const affiliation = factionScore > 0 ? factionAffiliations[factionKey] || 'hostile' : 'unknown';

    // Get NATO symbol
    let symbolData;
    if (typeof NATOSymbolLibrary !== 'undefined') {
        symbolData = natoSymbolLibrary.generateSymbol(affiliation, 'infantry', 'unit');
    } else {
        const colors = { friendly: '#0066CC', hostile: '#CC0000', neutral: '#00AA00', unknown: '#FFAA00' };
        symbolData = { svg: `<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" fill="${colors[affiliation]}" fill-opacity="0.7" stroke="white" stroke-width="2" transform="rotate(45 20 20)"/><g stroke="white" stroke-width="2" fill="none"><line x1="12" y1="12" x2="28" y2="28"/><line x1="28" y1="12" x2="12" y2="28"/></g></svg>` };
    }

    const badgeHtml = `<div class="cluster-count-badge">${count}</div>`;

    const wrapper = document.createElement('div');
    wrapper.className = 'marker-wrapper';
    wrapper.innerHTML = symbolData.svg + badgeHtml;

    const icon = L.divIcon({
        html: wrapper.innerHTML,
        className: 'cluster-marker marker-wrapper',
        iconSize: [48, 48],
        iconAnchor: [24, 24],
        popupAnchor: [0, -24]
    });

    const marker = L.marker(coordinates, { icon });

    // Create popup content in card style
    const firstEvent = group[0];
    const involvedNations = detectInvolvedNations(firstEvent);
    const territory = firstEvent.territoryControl ?
        `<div class="event-territory">
            ${firstEvent.territoryControl.israeli ? `<div class="territory-item">🇮🇱 Israel: <span>${firstEvent.territoryControl.israeli}%</span></div>` : ''}
            ${firstEvent.territoryControl.palestinian ? `<div class="territory-item">🇵🇸 Palestine: <span>${firstEvent.territoryControl.palestinian}%</span></div>` : ''}
            ${firstEvent.territoryControl.hamas ? `<div class="territory-item">⚡ Hamas: <span>${firstEvent.territoryControl.hamas}%</span></div>` : ''}
        </div>` : '';

    const casualties = firstEvent.casualties ?
        `<div class="event-territory event-territory-compact">
            <div class="territory-item">💀 Killed: <span>${firstEvent.casualties.totalKilled || 0}</span></div>
            <div class="territory-item">🏥 Wounded: <span>${firstEvent.casualties.totalWounded || 0}</span></div>
        </div>` : '';

    const impact = firstEvent.impact ?
        `<div class="event-impact">
            <strong>Impact:</strong> ${firstEvent.impact}
        </div>` : '';

    const showAllButton = group.length > 1 ?
        `<button class="show-all-events-btn" data-coords="${coordinates[0]},${coordinates[1]}">
            Show all ${group.length} events →
        </button>` : '';

    // Store current cluster events by coordinates for button click handler
    if (group.length > 1) {
        clusterEventsMap.set(`${coordinates[0]},${coordinates[1]}`, group);
    }

    const popupContent = `
        <div class="popup-event-card">
            <span class="event-title">${firstEvent.title}</span>
            <div class="event-meta">
                <span class="event-date">📅 ${firstEvent.date}</span>
                <span class="event-category ${firstEvent.category || 'unknown'}">${(firstEvent.category || 'unknown').toUpperCase()}</span>
            </div>
            ${firstEvent.description ? `<div class="event-description">${firstEvent.description}</div>` : ''}
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

    marker.bindPopup(popupContent, {
        maxWidth: 320,
        className: 'military-popup'
    });

    marker.on('mouseover', function() {
        if (this._icon) this._icon.style.zIndex = '9999';
        if (this._shadow) this._shadow.style.zIndex = '9998';
    });

    marker.on('mouseout', function() {
        if (this._icon) this._icon.style.zIndex = 'auto';
        if (this._shadow) this._shadow.style.zIndex = 'auto';
    });

    const factionNames = { idf: 'IDF', hamas: 'Hamas', arab_forces: 'Arab Forces', egyptian_syria: 'Egypt-Syria', iran: 'Iran', hezbollah: 'Hezbollah', pij: 'PIJ', fatah: 'Fatah' };
    marker.bindTooltip(`${count} events - ${factionScore > 0 ? factionNames[factionKey] : 'Mixed'}`, {
        direction: 'top',
        offset: [0, -30]
    });

    return marker;
}

// Side panel state
let sidePanelOpen = false;
let sidePanelSelectedEvents = null;
const clusterEventsMap = new Map();

// Update side panel visual state
function updateSidePanelState() {
    const panel = document.getElementById('event-side-panel');
    const mapContainer = document.querySelector('.map-container');

    if (!panel) return;

    if (sidePanelOpen) {
        panel.classList.add('open');
        if (mapContainer) {
            mapContainer.classList.add('shifted');
        }
    } else {
        panel.classList.remove('open');
        if (mapContainer) {
            mapContainer.classList.remove('shifted');
        }
        sidePanelSelectedEvents = null;
    }
}

// Toggle side panel
function toggleSidePanel() {
    sidePanelOpen = !sidePanelOpen;
    updateSidePanelState();
}

// Handle "Show all events" button clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('show-all-events-btn')) {
        const coords = e.target.dataset.coords;
        // Check both local and global map
        const eventsMap = window.clusterEventsMap || clusterEventsMap;
        if (coords && eventsMap && eventsMap.has(coords)) {
            const events = eventsMap.get(coords);
            if (Array.isArray(events)) {
                openEventSidePanel(events);
            }
        }
    }
});

// Open side panel with events
function openEventSidePanel(eventGroup) {
    let panel = document.getElementById('event-side-panel');

    // Create panel if it doesn't exist
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'event-side-panel';
        document.body.appendChild(panel);
    }

    // Set selected events for toggle button logic
    sidePanelSelectedEvents = eventGroup;

    const totalEvents = eventGroup ? eventGroup.length : 0;

    // Handle empty state
    if (totalEvents === 0) {
        panel.innerHTML = `
            <div class="panel-header">
                <h3>📍 No Events</h3>
                <button id="panel-close-btn">✕</button>
            </div>
            <div class="panel-content" id="panel-scroll-content">
                <div class="panel-empty">
                    <p>No events found in current view.</p>
                    <p>Use the timeline slider to explore historical events.</p>
                </div>
            </div>
        `;
    } else {
        // Sort events in reverse chronological order (newest first)
        eventGroup.sort((a, b) => {
            const yearA = getEventYear(a.date);
            const yearB = getEventYear(b.date);
            return yearB - yearA;
        });
        
        panel.innerHTML = `
            <div class="panel-header">
                <h3>📍 ${totalEvents} Event${totalEvents !== 1 ? 's' : ''}</h3>
                <button id="panel-close-btn">✕</button>
            </div>
            <div class="panel-content" id="panel-scroll-content">
                ${eventGroup.map((event, index) => {
                    const involvedNations = detectInvolvedNations(event);
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

                    return `
                        <div class="panel-event" data-index="${index}">
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
                        </div>
                    `;
                }).join('')}
            </div>
            ${totalEvents > 3 ? '<div class="panel-scroll-indicator">Scroll for more ↓</div>' : ''}
        `;
    }

    // Add close button handler
    const closeBtn = document.getElementById('panel-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            toggleSidePanel();
        });
    }

    // Auto open when populated with events
    if (!sidePanelOpen) {
        sidePanelOpen = true;
        updateSidePanelState();
    }

    setTimeout(() => {
        const content = document.getElementById('panel-scroll-content');
        if (content) {
            content.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, 100);
}

// Initialize side panel (hidden by default)
function initializeSidePanel() {
    setupMapClickHandler();
}

// Setup map click to close sidepanel
function setupMapClickHandler() {
    if (mapState && mapState.map) {
        mapState.map.on('click', function() {
            if (sidePanelOpen) {
                toggleSidePanel();
            }
        });
    }
}

// Show all visible events in sidepanel
function showAllVisibleEvents() {
    const currentEvents = typeof getFilteredEventsForYear === 'function'
        ? getFilteredEventsForYear(mapState.currentYear)
        : timelineEvents;

    const visibleEvents = currentEvents.filter(event => {
        return event.geography && event.geography.coordinates;
    });

    if (visibleEvents.length === 0) {
        openEventSidePanel([]);
        return;
    }

    openEventSidePanel(visibleEvents);
}

// Draw all event markers with proper layer management and hierarchical positioning
function drawAllEventMarkers(events) {
    // Use optimized version from clustering system if available
    if (window.drawAllEventMarkers && window.drawAllEventMarkers !== drawAllEventMarkers) {
        return window.drawAllEventMarkers(events);
    }
    
    if (mapState.markerLayer) {
        mapState.markerLayer.clearLayers();
    }

    const currentZoom = mapState.map ? mapState.map.getZoom() : 7;
    const processedCoordinates = new Set();
    const uniqueEventKeys = new Set();

    const eventGroups = groupEventsByCoordinates(events);

    eventGroups.forEach(group => {
        const sortedEvents = sortEventsByPriority(group);

        if (group.length >= CLUSTER_COUNT_THRESHOLD) {
            const firstEvent = sortedEvents[0];
            if (firstEvent.geography && firstEvent.geography.coordinates) {
                const badgeMarker = createClusterCountMarker(sortedEvents, firstEvent.geography.coordinates);
                badgeMarker.addTo(mapState.markerLayer);
            }
            return;
        }

        sortedEvents.forEach((event, indexInGroup) => {
            if (!event.geography || !event.geography.coordinates) return;
            
            // Skip events that have movementData - they'll be drawn as movement markers
            if (event.movementData) return;
            
            const eventKey = `${event.geography.coordinates[0]},${event.geography.coordinates[1]}_${event.date}_${event.title}`;
            if (uniqueEventKeys.has(eventKey)) {
                return;
            }
            uniqueEventKeys.add(eventKey);

            let markerType = 'default';
            let markerColor = '#95a5a6';
            let shouldShow = false;

            if (event.category === 'military' || event.geography.type === 'attack') {
                markerType = 'attack';
                if (event.title && event.title.includes('Hamas Attack:')) {
                    markerColor = '#dc2626';
                } else {
                    markerColor = '#e74c3c';
                }
                shouldShow = mapState.showAttacks !== false;
            } else if (event.geography.type === 'settlement') {
                markerType = 'settlement';
                markerColor = '#3498db';
                shouldShow = mapState.showSettlements !== false;
            } else if (event.category === 'political') {
                markerType = 'political';
                markerColor = '#9b59b6';
                shouldShow = mapState.showPolitical !== false;
            } else if (event.category === 'social') {
                markerType = 'social';
                markerColor = '#f39c12';
                shouldShow = mapState.showSocial !== false;
            } else if (event.geography.type === 'territory_change') {
                markerType = 'territory_change';
                markerColor = '#27ae60';
                shouldShow = mapState.showTerritory !== false;
            }

            if (shouldShow) {
                const coordKey = `${event.geography.coordinates[0].toFixed(3)},${event.geography.coordinates[1].toFixed(3)}`;

                let adjustedCoords;
                if (processedCoordinates.has(coordKey)) {
                    const { latOffset, lngOffset } = getHierarchicalOffset(indexInGroup, sortedEvents.length, currentZoom);
                    adjustedCoords = [
                        event.geography.coordinates[0] + latOffset,
                        event.geography.coordinates[1] + lngOffset
                    ];
                } else {
                    const { latOffset, lngOffset } = getHierarchicalOffset(0, sortedEvents.length, currentZoom);
                    adjustedCoords = [
                        event.geography.coordinates[0] + latOffset,
                        event.geography.coordinates[1] + lngOffset
                    ];
                    processedCoordinates.add(coordKey);
                }

                const priority = calculateEventPriority(event);
                const isHighPriority = priority > 50;

                const flagOverlay = (window.clusterState && window.clusterState.showFlags && !processedCoordinates.has(coordKey))
                    ? createFlagOverlayForEvent(event, isHighPriority ? 36 : 28)
                    : '';

                const iconSize = isHighPriority ? 52 : 44;
                const iconAnchor = isHighPriority ? 26 : 22;

                const marker = L.marker(
                    adjustedCoords,
                    {
                        icon: (typeof window.createEnhancedMilitaryMarker === 'function')
                            ? (() => {
                                const baseIcon = window.createEnhancedMilitaryMarker(event, {
                                    showFlags: false,
                                    enableClustering: false
                                });

                                if (flagOverlay) {
                                    const wrapper = document.createElement('div');
                                    wrapper.className = 'marker-wrapper';
                                    wrapper.innerHTML = baseIcon.options.html + flagOverlay;
                                    return L.divIcon({
                                        html: wrapper.innerHTML,
                                        className: 'enhanced-military-marker-clean marker-wrapper marker-shadow',
                                        iconSize: [iconSize, iconSize],
                                        iconAnchor: [iconAnchor, iconAnchor]
                                    });
                                }
                                return baseIcon;
                            })()
                            : L.divIcon({
                                html: `<div class="basic-marker-clean marker-wrapper marker-border marker-shadow" style="background: ${markerColor};">${flagOverlay}</div>`,
                                className: 'basic-marker-icon-clean marker-wrapper',
                                iconSize: [iconSize, iconSize],
                                iconAnchor: [iconAnchor, iconAnchor]
                            })
                    }
                );

                const involvedNations = detectInvolvedNations(event);

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

                const popupContent = `
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
                    </div>
                `;

                marker.bindPopup(popupContent, {
                    maxWidth: 320,
                    className: 'military-popup'
                });

                // Handle popup open - check for nearby events and open sidepanel
                marker.on('popupopen', function() {
                    if (event.geography && event.geography.coordinates) {
                        const nearbyEvents = getNearbyEvents(event.geography.coordinates, 0.02);
                        if (nearbyEvents.length >= 2) {
                            openEventSidePanel(nearbyEvents);
                        }
                    }
                });

                marker.on('mouseover', function() {
                    if (this._icon) {
                        this._icon.style.zIndex = '9999';
                    }
                    if (this._shadow) {
                        this._shadow.style.zIndex = '9998';
                    }
                });

                marker.on('mouseout', function() {
                    if (this._icon) {
                        this._icon.style.zIndex = 'auto';
                    }
                    if (this._shadow) {
                        this._shadow.style.zIndex = 'auto';
                    }
                });

                marker.addTo(mapState.markerLayer);
            }
        });
    });
}

// Get faction-specific colors, symbols, and NATO affiliation
function getFactionColor(faction) {
    const factions = {
        'idf': {
            color: '#2563eb',           // IDF Blue
            symbol: 'star',              // Star of David influence
            affiliation: 'friendly',      // NATO: Friendly
            name: 'Israeli Defense Force'
        },
        'hamas': {
            color: '#dc2626',           // Hamas Red
            symbol: 'triangle',         // Triangle attack symbol
            affiliation: 'hostile',      // NATO: Hostile
            name: 'Hamas'
        },
        'egyptian_syrian': {
            color: '#ea580c',           // Egypt/Syria Orange
            symbol: 'diamond',          // Diamond coalition
            affiliation: 'hostile',     // NATO: Hostile
            name: 'Egypt-Syria Coalition'
        },
        'arab_forces': {
            color: '#f97316',           // Arab Forces Dark Orange
            symbol: 'diamond',          // Diamond coalition
            affiliation: 'hostile',     // NATO: Hostile
            name: 'Arab Forces'
        },
        'pij': {
            color: '#ea580c',           // PIJ Orange
            symbol: 'triangle',        // Triangle militant
            affiliation: 'hostile',     // NATO: Hostile
            name: 'Palestinian Islamic Jihad'
        },
        'hezbollah': {
            color: '#7c3aed',           // Hezbollah Purple
            symbol: 'star',             // Star resistance
            affiliation: 'hostile',     // NATO: Hostile
            name: 'Hezbollah'
        },
        'fatah': {
            color: '#16a34a',          // Fatah Green
            symbol: 'circle',          // Circle governance
            affiliation: 'neutral',    // NATO: Neutral
            name: 'Fatah/Palestinian Authority'
        },
        'iran': {
            color: '#991b1b',          // Iran Dark Red
            symbol: 'hexagon',         // Hexagon support
            affiliation: 'hostile',     // NATO: Hostile
            name: 'Iran (Supporter)'
        }
    };
    return factions[faction] || { 
        color: '#6b7280', 
        symbol: 'circle',
        affiliation: 'unknown',
        name: 'Unknown Faction' 
    };
}

// Calculate spiral offset for a coordinate to prevent overlapping markers
function getSpiralOffsetForCoord(coordKey, processedCoords) {
    const existing = processedCoords.get(coordKey);
    const baseRadius = 0.003; // ~300 meters base offset
    
    if (existing) {
        // Already processed at this coordinate - increment offset count and spiral
        const newIndex = existing.index + 1;
        const angle = newIndex * (2 * Math.PI / Math.max(newIndex + 2, 4));
        const radius = baseRadius * (1 + newIndex * 0.5);
        const offsets = {
            latOffset: Math.sin(angle) * radius,
            lngOffset: Math.cos(angle) * radius,
            index: newIndex
        };
        processedCoords.set(coordKey, offsets);
        return { latOffset: offsets.latOffset, lngOffset: offsets.lngOffset };
    }
    
    // First marker at this coordinate
    processedCoords.set(coordKey, { latOffset: 0, lngOffset: 0, index: 0 });
    return { latOffset: 0, lngOffset: 0 };
}

// Draw military movement paths with animations (fixed recursion prevention)
function drawMovementPaths(events) {
    if (!mapState.showMovements) {
        console.log('🚀 Movement display is disabled');
        return;
    }
    
    const movementEvents = events.filter(event => event.movementData);
    console.log('🎯 Drawing movements for year - found:', movementEvents.length, 'events with movement data');
    
    // Track all processed coordinates across ALL movements to prevent overlap
    const allProcessedCoords = new Map(); // coordKey -> { latOffset, lngOffset }
    
    // Process each movement event only once
    movementEvents.forEach((event, eventIndex) => {
        const movement = event.movementData;
        
        // Get faction info (color + symbol)
        const faction = getFactionColor(movement.faction);
        
        console.log('📊 Processing movement:', event.title, '| Faction:', faction.name, '| Points:', movement.coordinates.length);
        
        // Create thin military movement path with directional arrows
        const path = L.polyline(movement.coordinates, {
            color: faction.color,
            weight: 1.5, // Much thinner lines, visually subordinate to terrain
            opacity: 0.7, // Lower opacity to be less intrusive
            dashArray: getFactionDashPattern(faction.symbol)
        });
        
        // Add directional arrows to indicate movement direction
        for (let i = 0; i < movement.coordinates.length - 1; i++) {
            const start = movement.coordinates[i];
            const end = movement.coordinates[i + 1];
            const midPoint = [
                (start[0] + end[0]) / 2,
                (start[1] + end[1]) / 2
            ];
            
            // Calculate arrow direction
            const bearing = calculateBearing(start, end);
            const arrowIcon = createDirectionalArrow(faction.color, bearing);
            
            const arrowMarker = L.marker(midPoint, {
                icon: arrowIcon,
                opacity: 0.8,
                zIndexOffset: 500 + i
            });
            
            arrowMarker.addTo(mapState.movementLayer);
        }
        
        // Add faction markers at each coordinate with spiral offset to prevent overlap
        movement.coordinates.forEach((coord, index) => {
            if (index < movement.coordinates.length - 1) {
                const coordKey = `${coord[0].toFixed(4)},${coord[1].toFixed(4)}`;
                
                // Calculate spiral offset for this coordinate (tracks count per coordinate)
                const { latOffset, lngOffset } = getSpiralOffsetForCoord(coordKey, allProcessedCoords);
                
                // Apply offset to prevent overlap
                const adjustedCoord = [
                    coord[0] + latOffset,
                    coord[1] + lngOffset
                ];

                const nextCoord = movement.coordinates[index + 1];
                const bearing = calculateBearing(coord, nextCoord);

                const markerIcon = createMovementNATOSymbol(faction.color, faction.affiliation, 28);
                const marker = L.marker(adjustedCoord, {
                    icon: markerIcon,
                    opacity: 1,
                    zIndexOffset: 1000 + eventIndex * 10 + index
                });
                
                // Bind popup to marker
                const popupContent = `
                    <div style="max-width: 280px; background: #1a1a1a; color: #e1e8ed; padding: 12px; border-radius: 8px;">
                        <div style="display: flex; align-items: center; margin-bottom: 8px;">
                            <div style="width: 28px; height: 28px; margin-right: 10px; background: ${faction.color}; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <polygon points="12,2 22,8 18,8 18,16 6,16 6,8 2,8" fill="white" stroke="${faction.color}" stroke-width="1"/>
                                </svg>
                            </div>
                            <div>
                                <strong style="font-size: 14px;">${event.title}</strong><br>
                                <span style="color: #9ca3af; font-size: 12px;">${event.date}</span>
                            </div>
                        </div>
                        <div style="border-top: 1px solid #374151; padding-top: 8px; font-size: 12px;">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
                                <span style="color: #9ca3af;">Operation:</span>
                                <span style="text-transform: uppercase;">${movement.type.replace(/_/g, ' ')}</span>
                                <span style="color: #9ca3af;">Waypoint:</span>
                                <span>${index + 1} of ${movement.coordinates.length}</span>
                            </div>
                        </div>
                    </div>
                `;
                marker.bindPopup(popupContent, {
                    maxWidth: 300,
                    className: 'movement-popup'
                });
                
                marker.addTo(mapState.movementLayer);
            }
        });
        
        // Enhanced popup with NATO symbol and movement details
        path.bindPopup(`
            <div style="max-width: 280px; background: #1a1a1a; color: #e1e8ed; padding: 12px; border-radius: 8px;">
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <div style="width: 28px; height: 28px; margin-right: 10px; background: ${faction.color}; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <polygon points="12,2 22,8 18,8 18,16 6,16 6,8 2,8" fill="white" stroke="${faction.color}" stroke-width="1"/>
                        </svg>
                    </div>
                    <div>
                        <strong style="font-size: 14px;">${event.title}</strong><br>
                        <span style="color: #9ca3af; font-size: 12px;">${event.date}</span>
                    </div>
                </div>
                <div style="border-top: 1px solid #374151; padding-top: 8px; font-size: 12px;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
                        <span style="color: #9ca3af;">Operation:</span>
                        <span style="text-transform: uppercase;">${movement.type.replace(/_/g, ' ')}</span>
                        <span style="color: #9ca3af;">Duration:</span>
                        <span>${movement.startTime} → ${movement.endTime}</span>
                        <span style="color: #9ca3af;">Waypoints:</span>
                        <span>${movement.coordinates.length}</span>
                    </div>
                </div>
            </div>
        `);
        
        path.addTo(mapState.movementLayer);
    });
    
    console.log('✅ Movement layer now contains:', mapState.movementLayer.getLayers().length, 'unique markers');
}

// Create directional arrow marker for movement paths
function createDirectionalArrow(color, bearing) {
    const arrowSize = 12;
    
    return L.divIcon({
        html: `
            <div style="
                width: ${arrowSize}px; 
                height: ${arrowSize}px; 
                position: relative;
                transform: rotate(${bearing}deg);
            ">
                <div style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    border-left: ${arrowSize/2}px solid transparent;
                    border-right: ${arrowSize/2}px solid transparent;
                    border-bottom: ${arrowSize}px solid ${color};
                    transform: translate(-50%, -100%);
                    opacity: 0.8;
                "></div>
            </div>
        `,
        className: 'directional-arrow',
        iconSize: [arrowSize, arrowSize],
        iconAnchor: [arrowSize/2, arrowSize/2]
    });
}

// Calculate bearing between two coordinates for arrow direction
function calculateBearing(start, end) {
    const lat1 = start[0] * Math.PI / 180;
    const lat2 = end[0] * Math.PI / 180;
    const diffLng = (end[1] - start[1]) * Math.PI / 180;
    
    const x = Math.sin(diffLng) * Math.cos(lat2);
    const y = Math.cos(lat1) * Math.sin(lat2) - 
              Math.sin(lat1) * Math.cos(lat2) * Math.cos(diffLng);
    
    const bearing = Math.atan2(x, y) * 180 / Math.PI;
    return (bearing + 360) % 360;
}

// Get faction-specific dash patterns
function getFactionDashPattern(symbol) {
    const patterns = {
        'star': '12, 4',         // Solid with small gaps (IDF)
        'triangle': '8, 6',      // Short dashes (militant)
        'diamond': '10, 5',       // Medium dashes (coalition)
        'circle': '15, 3',       // Long dashes (governance)
        'hexagon': '6, 8'        // Short/long pattern (supporter)
    };
    return patterns[symbol] || '10, 5';
}

// Create faction-specific movement marker with proper SVG rendering
function createFactionMarker(faction, bearing) {
    const size = 16; // Increased from 14 for better visibility
    
    let svgPath = '';
    
    switch(faction.symbol) {
        case 'star': // IDF/Hezbollah - Star
            svgPath = `<polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" 
                         fill="${faction.color}" stroke="white" stroke-width="1.5"/>`;
            break;
            
        case 'triangle': // Hamas/PIJ - Triangle
            svgPath = `<polygon points="12,2 22,20 2,20" 
                         fill="${faction.color}" stroke="white" stroke-width="1.5"/>`;
            break;
            
        case 'diamond': // Arab Forces - Diamond
            svgPath = `<polygon points="12,2 22,12 12,22 2,12" 
                         fill="${faction.color}" stroke="white" stroke-width="1.5"/>`;
            break;
            
        case 'circle': // Fatah - Circle
            svgPath = `<circle cx="12" cy="12" r="9" 
                        fill="${faction.color}" stroke="white" stroke-width="1.5"/>`;
            break;
            
        case 'hexagon': // Iran - Hexagon
            svgPath = `<polygon points="12,2 20,7 20,17 12,22 4,17 4,7" 
                         fill="${faction.color}" stroke="white" stroke-width="1.5"/>`;
            break;
            
        default:
            svgPath = `<circle cx="12" cy="12" r="8" 
                        fill="${faction.color}" stroke="white" stroke-width="1.5"/>`;
    }
    
    const svgContent = `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" 
             xmlns="http://www.w3.org/2000/svg"
             style="display: block; transform: rotate(${bearing}deg); transform-origin: center;">
            ${svgPath}
        </svg>
    `;
    
    return L.divIcon({
        html: svgContent,
        className: 'faction-marker-icon',
        iconSize: [size, size],
        iconAnchor: [size/2, size/2],
        popupAnchor: [0, -size/2]
    });
}

// Create NATO symbol for military movement markers
function createMovementNATOSymbol(factionColor, factionAffiliation, size = 24) {
    if (typeof NATOSymbolLibrary === 'undefined') {
        console.warn('NATOSymbolLibrary not available, using fallback');
        return createFactionMarker({ color: factionColor, name: 'Movement' }, 0);
    }

    const natoLibrary = new NATOSymbolLibrary();

    const natoSymbol = natoLibrary.generateSymbol(factionAffiliation, 'infantry', 'unit');

    return L.divIcon({
        html: natoSymbol.svg,
        className: 'nato-movement-marker',
        iconSize: [size, size],
        iconAnchor: [size/2, size/2],
        popupAnchor: [0, -size/2]
    });
}

// Create arrow icon for movement direction (legacy)
function createMovementArrow(color, bearing) {
    const svgContent = `
        <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" 
             style="transform: rotate(${bearing}deg); transform-origin: center;">
            <polygon points="12,2 22,8 18,8 18,16 6,16 6,8 2,8" 
                     fill="${color}" stroke="white" stroke-width="1"/>
        </svg>
    `;
    
    return L.divIcon({
        html: svgContent,
        className: 'movement-arrow',
        iconSize: [16, 16],
        iconAnchor: [8, 8]
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
        const fillColor = '#f39c12';
        const size = city.importance === 'high' ? 10 : city.importance === 'medium' ? 7 : 5;
        
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

// Draw flags for events
function drawFlagsForEvents(events) {
    'use strict';
    
    // Clear existing flags first
    if (mapState.flagLayer) {
        mapState.flagLayer.clearLayers();
    }
    
    events.forEach(event => {
        if (event.geography && event.geography.coordinates) {
            const flagOverlay = createFlagOverlayForEvent(event);
            if (flagOverlay) {
                const flagIcon = L.divIcon({
                    html: flagOverlay,
                    className: 'event-flag-overlay',
                    iconSize: [40, 30],
                    iconAnchor: [20, 15]
                });
                
                const flagMarker = L.marker(event.geography.coordinates, {
                    icon: flagIcon,
                    zIndexOffset: 500
                });
                
                flagMarker.bindPopup(`
                    <strong>${event.title}</strong><br>
                    <small>${event.date}</small><br>
                    ${event.description ? event.description.substring(0, 100) + '...' : ''}
                `);
                
                mapState.flagLayer.addLayer(flagMarker);
            }
        }
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

// Initialize checkbox states with mapState
function initializeCheckboxStates() {
    const showAttacks = document.getElementById('show-attacks');
    const showPolitical = document.getElementById('show-political');
    const showSocial = document.getElementById('show-social');
    const showTerritory = document.getElementById('show-territory');
    const showSettlements = document.getElementById('show-settlements');
    const showCities = document.getElementById('show-cities');
    const showMovements = document.getElementById('show-movements');
    const showFlags = document.getElementById('show-flags');
    const legendSelect = document.getElementById('map-legend-select');
    const legendContentArea = document.getElementById('legend-content-area');

    // Update legend based on active filters
    function updateLegendForFilters() {
        if (!legendSelect || !legendContentArea) return;

        if (legendSelect.value === 'auto') {
            if (mapState.showTerritory) {
                legendContentArea.innerHTML = generateTerritoryLegend();
            } else if (mapState.showAttacks || mapState.showPolitical || mapState.showSocial) {
                legendContentArea.innerHTML = generateMilitarySymbolsLegend();
            } else {
                // Default to military symbols if no filters
                legendContentArea.innerHTML = generateMilitarySymbolsLegend();
            }
        }
    }

    // Sync legend dropdown with filters
    function syncLegendDropdown() {
        if (!legendSelect) return;
        if (legendSelect.value !== 'auto') return;

        if (mapState.showTerritory) {
            legendSelect.value = 'territory';
        } else if (mapState.showAttacks || mapState.showPolitical || mapState.showSocial) {
            legendSelect.value = 'military';
        }
    }

    async function refreshCurrentYear() {
        if (mapState.currentYear) {
            await updateMapForYear(mapState.currentYear);
        }
    }

    // Attach event listeners to all checkboxes
    if (showAttacks) {
        showAttacks.addEventListener('change', async (e) => {
            mapState.showAttacks = e.target.checked;
            syncLegendDropdown();
            await refreshCurrentYear();
        });
    }
    if (showPolitical) {
        showPolitical.addEventListener('change', async (e) => {
            mapState.showPolitical = e.target.checked;
            syncLegendDropdown();
            await refreshCurrentYear();
        });
    }
    if (showSocial) {
        showSocial.addEventListener('change', async (e) => {
            mapState.showSocial = e.target.checked;
            syncLegendDropdown();
            await refreshCurrentYear();
        });
    }
    if (showTerritory) {
        showTerritory.addEventListener('change', async (e) => {
            mapState.showTerritory = e.target.checked;
            syncLegendDropdown();
            updateLegendForFilters();
            await refreshCurrentYear();
        });
    }
    if (showSettlements) {
        showSettlements.addEventListener('change', async (e) => {
            mapState.showSettlements = e.target.checked;
            await refreshCurrentYear();
        });
    }
    if (showCities) {
        showCities.addEventListener('change', async (e) => {
            mapState.showCities = e.target.checked;
            await refreshCurrentYear();
        });
    }
    if (showMovements) {
        showMovements.addEventListener('change', async (e) => {
            mapState.showMovements = e.target.checked;
            await refreshCurrentYear();
        });
    }
    if (showFlags && window.clusterState) {
        showFlags.addEventListener('change', async (e) => {
            window.clusterState.showFlags = e.target.checked;
            await refreshCurrentYear();
        });
    }

    // Legend selector
    if (legendSelect) {
        legendSelect.addEventListener('change', async (e) => {
            if (!legendContentArea) return;

            switch(e.target.value) {
                case 'auto':
                    updateLegendForFilters();
                    break;
                case 'military':
                    legendContentArea.innerHTML = generateMilitarySymbolsLegend();
                    // Enable events
                    if (showAttacks) showAttacks.checked = true;
                    if (showPolitical) showPolitical.checked = true;
                    if (showSocial) showSocial.checked = true;
                    mapState.showAttacks = true;
                    mapState.showPolitical = true;
                    mapState.showSocial = true;
                    await refreshCurrentYear();
                    break;
                case 'territory':
                    legendContentArea.innerHTML = generateTerritoryLegend();
                    if (showTerritory) showTerritory.checked = true;
                    mapState.showTerritory = true;
                    await refreshCurrentYear();
                    break;
                case 'factions':
                    legendContentArea.innerHTML = generateMilitaryFactionsLegend();
                    break;
                case 'events':
                    legendContentArea.innerHTML = generateEventTypesLegend();
                    break;
            }
        });
    }

    // Initial legend sync
    setTimeout(() => {
        syncLegendDropdown();
        updateLegendForFilters();
    }, 100);
    
    // ===== Military Layer Controls =====
    const layerFriendly = document.getElementById('layer-friendly');
    const layerHostile = document.getElementById('layer-hostile');
    const layerNeutral = document.getElementById('layer-neutral');
    const layerAirspace = document.getElementById('layer-airspace');
    const layerTerrain = document.getElementById('layer-terrain');
    
    // Initialize military layer visibility in window.militaryLayers
    if (window.militaryLayers) {
        if (layerFriendly) {
            layerFriendly.checked = window.militaryLayers.visibility.friendly !== false;
            window.militaryLayers.visibility.friendly = layerFriendly.checked;
            layerFriendly.addEventListener('change', async (e) => {
                window.militaryLayers.visibility.friendly = e.target.checked;
                await refreshCurrentYear();
            });
        }
        if (layerHostile) {
            layerHostile.checked = window.militaryLayers.visibility.hostile !== false;
            window.militaryLayers.visibility.hostile = layerHostile.checked;
            layerHostile.addEventListener('change', async (e) => {
                window.militaryLayers.visibility.hostile = e.target.checked;
                await refreshCurrentYear();
            });
        }
        if (layerNeutral) {
            layerNeutral.checked = window.militaryLayers.visibility.neutral !== false;
            window.militaryLayers.visibility.neutral = layerNeutral.checked;
            layerNeutral.addEventListener('change', async (e) => {
                window.militaryLayers.visibility.neutral = e.target.checked;
                await refreshCurrentYear();
            });
        }
        if (layerAirspace) {
            layerAirspace.checked = window.militaryLayers.visibility.airspace === true;
            layerAirspace.addEventListener('change', async (e) => {
                window.militaryLayers.visibility.airspace = e.target.checked;
                await refreshCurrentYear();
            });
        }
        if (layerTerrain) {
            layerTerrain.checked = window.militaryLayers.visibility.terrain === true;
            layerTerrain.addEventListener('change', async (e) => {
                window.militaryLayers.visibility.terrain = e.target.checked;
                await refreshCurrentYear();
            });
        }
    }
    
    // ===== Priority & Data Quality Controls =====
    const priorityToggle = document.getElementById('priority-toggle');
    const priorityPanel = document.getElementById('priority-panel');
    const priorityFilter = document.getElementById('priority-filter');
    const ageFilter = document.getElementById('age-filter');
    
    if (priorityToggle && priorityPanel) {
        priorityToggle.addEventListener('click', () => {
            priorityPanel.classList.toggle('collapsed');
            const arrow = priorityToggle.querySelector('.toggle-arrow');
            if (arrow) {
                arrow.textContent = priorityPanel.classList.contains('collapsed') ? '▶' : '▼';
            }
        });
    }
    
    if (priorityFilter && window.militaryLayers) {
        priorityFilter.value = window.militaryLayers.priorityFilter || 'all';
        priorityFilter.addEventListener('change', async (e) => {
            window.militaryLayers.priorityFilter = e.target.value;
            console.log('🎯 Priority filter changed to:', e.target.value);
            await refreshCurrentYear();
        });
    }
    
    if (ageFilter && window.militaryLayers) {
        ageFilter.value = window.militaryLayers.maxAgeDays || 50000;
        ageFilter.addEventListener('change', async (e) => {
            window.militaryLayers.maxAgeDays = parseInt(e.target.value);
            console.log('🎯 Age filter changed to:', e.target.value, 'days');
            await refreshCurrentYear();
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize checkbox states FIRST so they're ready when map draws
    initializeCheckboxStates();
    // Then initialize map
    initializeMap();
    initializeTimelineTicks();
    // Initialize side panel (hidden by default)
    initializeSidePanel();
    
    // Legend toggle button
    const toggleLegendBtn = document.getElementById('toggle-legend-btn');
    if (toggleLegendBtn) {
        toggleLegendBtn.addEventListener('click', toggleLegend);
    }
});

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

// Function to toggle legend visibility
window.toggleLegend = function() {
    const toggleBtn = document.getElementById('toggle-legend-btn');
    
    if (window.legendVisible) {
        // Hide legend
        const legendEl = document.querySelector('.legacy-map-legend');
        if (legendEl) {
            legendEl.remove();
        }
        window.legendVisible = false;
        // Show toggle button
        if (toggleBtn) {
            toggleBtn.classList.remove('hidden');
        }
    } else {
        // Show legend
        addMapLegend();
        window.legendVisible = true;
        // Hide toggle button
        if (toggleBtn) {
            toggleBtn.classList.add('hidden');
        }
    }
};

// Export functions globally for clustering-system.js
window.getFilteredEventsForYear = getFilteredEventsForYear;

