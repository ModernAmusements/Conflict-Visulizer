// National Flag Icons System for Conflict Map
// SVG flag definitions for all nations involved in the conflict

class FlagSystem {
    constructor() {
        this.nations = {
            israel: {
                name: 'Israel',
                flag: this.createIsraelFlag(),
                color: '#0038B8'
            },
            palestine: {
                name: 'Palestine',
                flag: this.createPalestineFlag(),
                color: '#009C48'
            },
            egypt: {
                name: 'Egypt',
                flag: this.createEgyptFlag(),
                color: '#CE1126'
            },
            syria: {
                name: 'Syria',
                flag: this.createSyriaFlag(),
                color: '#DC143C'
            },
            jordan: {
                name: 'Jordan',
                flag: this.createJordanFlag(),
                color: '#007A3D'
            },
            lebanon: {
                name: 'Lebanon',
                flag: this.createLebanonFlag(),
                color: '#DC143C'
            },
            usa: {
                name: 'United States',
                flag: this.createUSAFlag(),
                color: '#B22234'
            },
            uk: {
                name: 'United Kingdom',
                flag: this.createUKFlag(),
                color: '#012169'
            },
            un: {
                name: 'United Nations',
                flag: this.createUNFlag(),
                color: '#0077B6'
            }
        };
    }

    // Get flag SVG for a nation
    getFlag(nation) {
        const flagData = this.nations[nation.toLowerCase()];
        return flagData ? flagData.flag : this.createDefaultFlag();
    }

    // Get flag as HTML element with enhanced visibility
    getFlagElement(nation, size = 32) {
        const flagSVG = this.getFlag(nation);
        const aspectRatio = 0.67; // Standard flag aspect ratio
        
        return `
            <div class="flag-icon-enhanced" style="width: ${size}px; height: ${size * aspectRatio}px;" 
                 data-nation="${nation}">
                <div class="flag-wrapper" style="position: relative; width: 100%; height: 100%; border: 1px solid rgba(255,255,255,0.3); box-shadow: 0 2px 4px rgba(0,0,0,0.3); overflow: hidden;">
                    ${flagSVG}
                </div>
            </div>
        `;
    }

    // Create Israeli flag
    createIsraelFlag() {
        return `
            <svg viewBox="0 0 660 480" xmlns="http://www.w3.org/2000/svg">
                <rect width="660" height="480" fill="white"/>
                <rect width="660" height="60" fill="#0038B8"/>
                <rect y="420" width="660" height="60" fill="#0038B8"/>
                <g fill="#0038B8">
                    <path d="M 330 150 L 265 260 L 395 260 Z"/>
                    <path d="M 265 220 L 395 220 L 330 330 Z"/>
                </g>
            </svg>
        `;
    }

    // Create Palestinian flag
    createPalestineFlag() {
        return `
            <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="200" fill="#000000"/>
                <rect width="300" height="133.33" fill="#FFFFFF"/>
                <rect width="300" height="66.67" fill="#007A3D"/>
                <polygon points="0,0 60,100 0,200" fill="#CE1126"/>
            </svg>
        `;
    }

    // Create Egyptian flag
    createEgyptFlag() {
        return `
            <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
                <rect width="900" height="600" fill="#CE1126"/>
                <rect y="200" width="900" height="200" fill="white"/>
                <rect y="400" width="900" height="200" fill="#000000"/>
                <g transform="translate(450,300)">
                    <circle r="100" fill="#FFCD00"/>
                    <text y="40" font-family="Arial" font-size="120" font-weight="bold" 
                          text-anchor="middle" fill="#000000">☪</text>
                </g>
            </svg>
        `;
    }

    // Create Syrian flag
    createSyriaFlag() {
        return `
            <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
                <rect width="900" height="600" fill="#DC143C"/>
                <rect y="200" width="900" height="200" fill="white"/>
                <rect y="400" width="900" height="200" fill="#000000"/>
                <polygon points="300,200 300,400 450,300" fill="#007A3D"/>
            </svg>
        `;
    }

    // Create Jordan flag
    createJordanFlag() {
        return `
            <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
                <rect width="900" height="600" fill="#000000"/>
                <rect y="200" width="900" height="200" fill="white"/>
                <rect y="400" width="900" height="200" fill="#007A3D"/>
                <polygon points="0,0 300,300 0,600" fill="#CE1126"/>
                <polygon points="150,150 225,300 150,450 75,300" fill="white"/>
            </svg>
        `;
    }

    // Create Lebanese flag
    createLebanonFlag() {
        return `
            <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
                <rect width="900" height="200" fill="#DC143C"/>
                <rect y="200" width="900" height="200" fill="white"/>
                <rect y="400" width="900" height="200" fill="#DC143C"/>
                <polygon points="450,100 500,250 550,100 500,200" fill="#00AA00"/>
            </svg>
        `;
    }

    // Create USA flag
    createUSAFlag() {
        return `
            <svg viewBox="0 0 1235 650" xmlns="http://www.w3.org/2000/svg">
                <rect width="1235" height="650" fill="#B22234"/>
                <rect y="50" width="1235" height="50" fill="white"/>
                <rect y="150" width="1235" height="50" fill="white"/>
                <rect y="250" width="1235" height="50" fill="white"/>
                <rect y="350" width="1235" height="50" fill="white"/>
                <rect y="450" width="1235" height="50" fill="white"/>
                <rect y="550" width="1235" height="50" fill="white"/>
                <rect width="494" height="350" fill="#3C3B6E"/>
                <!-- Simplified stars pattern -->
                <g fill="white">
                    <circle cx="50" cy="50" r="15"/>
                    <circle cx="100" cy="50" r="15"/>
                    <circle cx="150" cy="50" r="15"/>
                    <circle cx="200" cy="50" r="15"/>
                    <circle cx="250" cy="50" r="15"/>
                    <circle cx="300" cy="50" r="15"/>
                    <circle cx="350" cy="50" r="15"/>
                    <circle cx="400" cy="50" r="15"/>
                    <circle cx="450" cy="50" r="15"/>
                    <circle cx="75" cy="100" r="15"/>
                    <circle cx="125" cy="100" r="15"/>
                    <circle cx="175" cy="100" r="15"/>
                    <circle cx="225" cy="100" r="15"/>
                    <circle cx="275" cy="100" r="15"/>
                    <circle cx="325" cy="100" r="15"/>
                    <circle cx="375" cy="100" r="15"/>
                    <circle cx="425" cy="100" r="15"/>
                    <circle cx="50" cy="150" r="15"/>
                    <circle cx="100" cy="150" r="15"/>
                    <circle cx="150" cy="150" r="15"/>
                    <circle cx="200" cy="150" r="15"/>
                    <circle cx="250" cy="150" r="15"/>
                    <circle cx="300" cy="150" r="15"/>
                    <circle cx="350" cy="150" r="15"/>
                    <circle cx="400" cy="150" r="15"/>
                    <circle cx="450" cy="150" r="15"/>
                </g>
            </svg>
        `;
    }

    // Create UK flag
    createUKFlag() {
        return `
            <svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
                <rect width="1200" height="600" fill="#012169"/>
                <path d="M 0 0 L 1200 600 M 1200 0 L 0 600" stroke="white" stroke-width="120"/>
                <path d="M 0 0 L 1200 600 M 1200 0 L 0 600" stroke="#C8102E" stroke-width="80"/>
                <path d="M 600 0 L 600 600 M 0 300 L 1200 300" stroke="white" stroke-width="200"/>
                <path d="M 600 0 L 600 600 M 0 300 L 1200 300" stroke="#C8102E" stroke-width="120"/>
            </svg>
        `;
    }

    // Create UN flag
    createUNFlag() {
        return `
            <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
                <rect width="600" height="400" fill="#0077B6"/>
                <circle cx="300" cy="200" r="80" fill="white"/>
                <g transform="translate(300,200)" fill="#0077B6">
                    <circle r="60" fill="none" stroke-width="8"/>
                    <path d="M -40,0 L 40,0 M 0,-40 L 0,40" stroke-width="6"/>
                    <path d="M -28,-28 L 28,28 M 28,-28 L -28,28" stroke-width="6"/>
                    <circle cy="-50" r="5"/>
                    <circle cx="43" cy="-25" r="5"/>
                    <circle cx="43" cy="25" r="5"/>
                    <circle cy="50" r="5"/>
                    <circle cx="-43" cy="25" r="5"/>
                    <circle cx="-43" cy="-25" r="5"/>
                </g>
            </svg>
        `;
    }

    // Default flag for unknown nations
    createDefaultFlag() {
        return `
            <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="200" fill="#808080"/>
                <text x="150" y="110" font-family="Arial" font-size="60" font-weight="bold" 
                      text-anchor="middle" fill="white">?</text>
            </svg>
        `;
    }

    // Create flag legend entry
    createFlagLegend(nation) {
        const flagData = this.nations[nation.toLowerCase()];
        if (!flagData) return '';
        
        return `
            <div class="legend-flag-item">
                <div class="legend-flag-icon">
                    ${this.getFlagElement(nation, 24)}
                </div>
                <span class="legend-flag-label">${flagData.name}</span>
            </div>
        `;
    }

    // Generate all flag legends
    generateFlagLegends() {
        const legends = Object.keys(this.nations).map(nation => 
            this.createFlagLegend(nation)
        ).join('');
        
        return `
            <div class="flag-legend">
                <h4>National Forces</h4>
                <div class="flag-grid">
                    ${legends}
                </div>
            </div>
        `;
    }

    // Get nation color for UI elements
    getNationColor(nation) {
        const flagData = this.nations[nation.toLowerCase()];
        return flagData ? flagData.color : '#808080';
    }

    // Create flag marker for map with NATO symbol
    createFlaggedNATOMarker(affiliation, unitType, nation, size = 40) {
        const natoLib = new NATOSymbolLibrary();
        const natoSymbol = natoLib.generateSymbol(affiliation, unitType, 'unit');
        const flagElement = this.getFlagElement(nation, 16);
        
        return `
            <div class="flagged-military-marker" data-nation="${nation}" 
                 data-affiliation="${affiliation}" data-unit-type="${unitType}">
                <div class="nato-symbol-container">
                    ${natoSymbol.svg}
                </div>
                <div class="flag-overlay">
                    ${flagElement}
                </div>
            </div>
        `;
    }
}

// Export for use in main application
window.FlagSystem = FlagSystem;