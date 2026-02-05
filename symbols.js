// NATO Military Symbols Library (APP-6 Standard)
// Complete SVG symbol definitions for military units and operations

class NATOSymbolLibrary {
    constructor() {
        this.affiliationColors = {
            friendly: '#0066CC',    // Blue
            hostile: '#CC0000',      // Red
            neutral: '#00AA00',      // Green
            unknown: '#FFAA00'       // Yellow/Amber
        };

        this.frameShapes = {
            friend: 'rectangle',
            hostile: 'diamond', 
            neutral: 'square',
            unknown: 'quatrefoil'
        };
    }

    // Generate complete NATO symbol
    generateSymbol(affiliation, unitType, size = 'unit', modifiers = {}) {
        const frame = this.getFrame(affiliation);
        const icon = this.getIcon(unitType);
        const color = this.affiliationColors[affiliation] || this.affiliationColors.unknown;
        
        return {
            svg: this.createSymbolSVG(frame, icon, color, size, modifiers),
            metadata: {
                affiliation,
                unitType,
                size,
                color,
                modifiers
            }
        };
    }

    // Get frame shape based on affiliation
    getFrame(affiliation) {
        switch(affiliation) {
            case 'friendly':
            case 'friend':
                return 'rectangle';
            case 'hostile':
            case 'enemy':
                return 'diamond';
            case 'neutral':
                return 'square';
            case 'unknown':
                return 'quatrefoil';
            default:
                return 'rectangle';
        }
    }

    // Get unit icon
    getIcon(unitType) {
        const icons = {
            // Ground Units
            'infantry': this.createInfantryIcon(),
            'armor': this.createArmorIcon(),
            'mechanized_infantry': this.createMechanizedInfantryIcon(),
            'artillery': this.createArtilleryIcon(),
            'air_defense': this.createAirDefenseIcon(),
            'engineers': this.createEngineerIcon(),
            'signals': this.createSignalsIcon(),
            'recon': this.createReconIcon(),
            'anti_tank': this.createAntiTankIcon(),
            'mortar': this.createMortarIcon(),
            'headquarters': this.createHeadquartersIcon(),
            'supply': this.createSupplyIcon(),
            'medical': this.createMedicalIcon(),
            'maintenance': this.createMaintenanceIcon(),
            'military_police': this.createMilitaryPoliceIcon(),
            'chemical': this.createChemicalIcon(),
            
            // Air Units
            'fighter': this.createFighterIcon(),
            'helicopter': this.createHelicopterIcon(),
            'transport': this.createTransportIcon(),
            'bomber': this.createBomberIcon(),
            
            // Naval Units
            'surface': this.createSurfaceIcon(),
            'submarine': this.createSubmarineIcon(),
            
            // Installations
            'base': this.createBaseIcon(),
            'checkpoint': this.createCheckpointIcon(),
            'settlement': this.createSettlementIcon(),
            'observation_post': this.createObservationPostIcon(),
            
            // Operations
            'attack': this.createAttackIcon(),
            'ambush': this.createAmbushIcon(),
            'fortification': this.createFortificationIcon(),
            'minefield': this.createMinefieldIcon(),
            'obstacle': this.createObstacleIcon()
        };
        
        return icons[unitType] || this.createUnknownIcon();
    }

    // Create SVG frame shape
    createFrameSVG(shape, color, size = 40) {
        const frames = {
            'rectangle': `<rect x="${size*0.1}" y="${size*0.1}" width="${size*0.8}" height="${size*0.8}" 
                         fill="${color}" fill-opacity="0.7" stroke="${color}" stroke-width="2"/>`,
            
            'diamond': `<rect x="${size*0.1}" y="${size*0.1}" width="${size*0.8}" height="${size*0.8}" 
                        fill="${color}" fill-opacity="0.7" stroke="${color}" stroke-width="2" 
                        transform="rotate(45 ${size/2} ${size/2})"/>`,
            
            'square': `<rect x="${size*0.15}" y="${size*0.15}" width="${size*0.7}" height="${size*0.7}" 
                       fill="${color}" fill-opacity="0.7" stroke="${color}" stroke-width="2"/>`,
            
            'quatrefoil': this.createQuatrefoilSVG(color, size)
        };
        
        return frames[shape] || frames.rectangle;
    }

    // Create quatrefoil (four-petal) frame for unknown units
    createQuatrefoilSVG(color, size) {
        const cx = size / 2;
        const cy = size / 2;
        const r = size * 0.15;
        
        return `
            <g fill="${color}" fill-opacity="0.7" stroke="${color}" stroke-width="2">
                <circle cx="${cx}" cy="${cy - r}" r="${r}"/>
                <circle cx="${cx + r}" cy="${cy}" r="${r}"/>
                <circle cx="${cx}" cy="${cy + r}" r="${r}"/>
                <circle cx="${cx - r}" cy="${cy}" r="${r}"/>
            </g>
        `;
    }

    // Infantry icon (X in frame)
    createInfantryIcon() {
        return `
            <g stroke="white" stroke-width="2" fill="none">
                <line x1="30%" y1="30%" x2="70%" y2="70%"/>
                <line x1="70%" y1="30%" x2="30%" y2="70%"/>
            </g>
        `;
    }

    // Armor icon (oval/ellipse)
    createArmorIcon() {
        return `
            <ellipse cx="50%" cy="50%" rx="35%" ry="25%" 
                     fill="none" stroke="white" stroke-width="2"/>
        `;
    }

    // Mechanized infantry (X inside oval)
    createMechanizedInfantryIcon() {
        return `
            <g>
                <ellipse cx="50%" cy="50%" rx="35%" ry="25%" 
                         fill="none" stroke="white" stroke-width="2"/>
                <g stroke="white" stroke-width="1.5" fill="none">
                    <line x1="35%" y1="35%" x2="65%" y2="65%"/>
                    <line x1="65%" y1="35%" x2="35%" y2="65%"/>
                </g>
            </g>
        `;
    }

    // Artillery icon (circle)
    createArtilleryIcon() {
        return `
            <circle cx="50%" cy="50%" r="30%" 
                    fill="none" stroke="white" stroke-width="2"/>
        `;
    }

    // Air defense icon (inverted V)
    createAirDefenseIcon() {
        return `
            <path d="M 30 70 L 50 30 L 70 70" 
                  fill="none" stroke="white" stroke-width="2"/>
        `;
    }

    // Engineers icon (castle symbol)
    createEngineerIcon() {
        return `
            <g stroke="white" stroke-width="1.5" fill="white">
                <rect x="35%" y="40%" width="30%" height="30%"/>
                <polygon points="35%,40% 50%,30% 65%,40%"/>
                <rect x="40%" y="45%" width="8%" height="15%"/>
                <rect x="52%" y="45%" width="8%" height="15%"/>
            </g>
        `;
    }

    // Signals/Communications icon (lightning bolt)
    createSignalsIcon() {
        return `
            <path d="M 45 25 L 55 50 L 50 50 L 55 75 L 45 50 L 50 50" 
                  fill="white" stroke="none"/>
        `;
    }

    // Reconnaissance icon (scout symbol)
    createReconIcon() {
        return `
            <g stroke="white" stroke-width="1.5" fill="white">
                <circle cx="50%" cy="40%" r="15%"/>
                <path d="M 35 60 Q 50 55 65 60 L 70 75 L 30 75 Z"/>
            </g>
        `;
    }

    // Anti-tank icon (target with arrow)
    createAntiTankIcon() {
        return `
            <g stroke="white" stroke-width="2" fill="none">
                <circle cx="50%" cy="50%" r="20%"/>
                <line x1="25%" y1="50%" x2="75%" y2="50%"/>
                <polygon points="75%,50% 65%,45% 65%,55%" fill="white"/>
            </g>
        `;
    }

    // Mortar icon (small circle with base)
    createMortarIcon() {
        return `
            <g stroke="white" stroke-width="1.5" fill="white">
                <circle cx="50%" cy="35%" r="12%"/>
                <rect x="45%" y="35%" width="10%" height="20%"/>
                <rect x="40%" y="55%" width="20%" height="5%"/>
            </g>
        `;
    }

    // Headquarters icon (rectangle)
    createHeadquartersIcon() {
        return `
            <rect x="30%" y="40%" width="40%" height="20%" 
                  fill="white" stroke="none"/>
        `;
    }

    // Supply icon (U-shape)
    createSupplyIcon() {
        return `
            <path d="M 30 50 Q 50 30 70 50 L 70 70 L 30 70 Z" 
                  fill="white" stroke="none"/>
        `;
    }

    // Medical icon (Red Cross)
    createMedicalIcon() {
        return `
            <g fill="white" stroke="none">
                <rect x="45%" y="30%" width="10%" height="40%"/>
                <rect x="30%" y="45%" width="40%" height="10%"/>
            </g>
        `;
    }

    // Maintenance icon (wrench)
    createMaintenanceIcon() {
        return `
            <g stroke="white" stroke-width="2" fill="none">
                <path d="M 35 45 L 45 35 L 55 45 L 50 50 L 60 60 L 50 70 L 40 60 Z"/>
                <circle cx="40%" cy="50%" r="8%"/>
            </g>
        `;
    }

    // Military Police icon (MP in frame)
    createMilitaryPoliceIcon() {
        return `
            <g fill="white" stroke="none" font-family="Arial" font-size="10" font-weight="bold">
                <text x="50%" y="55%" text-anchor="middle">MP</text>
            </g>
        `;
    }

    // Chemical unit icon (gas mask)
    createChemicalIcon() {
        return `
            <g stroke="white" stroke-width="1.5" fill="none">
                <circle cx="50%" cy="35%" r="15%"/>
                <rect x="40%" y="45%" width="20%" height="15%"/>
                <path d="M 40% 55% Q 30% 65% 35% 75%"/>
                <path d="M 60% 55% Q 70% 65% 65% 75%"/>
            </g>
        `;
    }

    // Fighter aircraft icon
    createFighterIcon() {
        return `
            <g stroke="white" stroke-width="1.5" fill="none">
                <path d="M 50 25 L 35 60 L 50 55 L 65 60 Z"/>
                <path d="M 35 60 L 20 70 L 30 65"/>
                <path d="M 65 60 L 80 70 L 70 65"/>
            </g>
        `;
    }

    // Helicopter icon
    createHelicopterIcon() {
        return `
            <g stroke="white" stroke-width="1.5" fill="none">
                <ellipse cx="50%" cy="55%" rx="20%" ry="15%"/>
                <path d="M 30 50 L 70 50"/>
                <path d="M 50 40 L 35 35 M 50 40 L 65 35"/>
                <circle cx="50%" cy="55%" r="8%"/>
            </g>
        `;
    }

    // Transport aircraft icon
    createTransportIcon() {
        return `
            <g stroke="white" stroke-width="1.5" fill="none">
                <path d="M 30 45 L 35 60 L 65 60 L 70 45 Z"/>
                <rect x="40%" y="50%" width="20%" height="10%"/>
                <path d="M 45 45 L 40 35 M 55 45 L 60 35"/>
            </g>
        `;
    }

    // Bomber aircraft icon
    createBomberIcon() {
        return `
            <g stroke="white" stroke-width="1.5" fill="none">
                <path d="M 50 25 L 35 60 L 50 55 L 65 60 Z"/>
                <circle cx="40%" cy="45%" r="5%"/>
                <circle cx="60%" cy="45%" r="5%"/>
                <circle cx="50%" cy="65%" r="5%"/>
            </g>
        `;
    }

    // Surface naval vessel icon
    createSurfaceIcon() {
        return `
            <g stroke="white" stroke-width="2" fill="none">
                <path d="M 20 50 L 80 50"/>
                <path d="M 25 50 L 30 40 M 50 50 L 50 35 M 70 50 L 70 40"/>
            </g>
        `;
    }

    // Submarine icon
    createSubmarineIcon() {
        return `
            <g stroke="white" stroke-width="1.5" fill="white">
                <ellipse cx="50%" cy="50%" rx="30%" ry="15%"/>
                <rect x="45%" y="35%" width="10%" height="15%"/>
                <path d="M 45% 35% Q 50% 30% 55% 35%" fill="none" stroke="white"/>
            </g>
        `;
    }

    // Military base/installation icon
    createBaseIcon() {
        return `
            <g stroke="white" stroke-width="2" fill="none">
                <rect x="25%" y="35%" width="50%" height="30%"/>
                <path d="M 35 35 L 35 25 M 50 35 L 50 25 M 65 35 L 65 25"/>
            </g>
        `;
    }

    // Checkpoint icon
    createCheckpointIcon() {
        return `
            <g stroke="white" stroke-width="2" fill="none">
                <rect x="30%" y="40%" width="40%" height="20%"/>
                <path d="M 40 60 L 40 75 M 60 60 L 60 75"/>
            </g>
        `;
    }

    // Settlement icon
    createSettlementIcon() {
        return `
            <g stroke="white" stroke-width="1.5" fill="white">
                <circle cx="50%" cy="45%" r="8%"/>
                <path d="M 35 60 L 50 50 L 65 60 L 65 75 L 35 75 Z"/>
            </g>
        `;
    }

    // Observation post icon
    createObservationPostIcon() {
        return `
            <g stroke="white" stroke-width="1.5" fill="none">
                <circle cx="50%" cy="50%" r="20%"/>
                <path d="M 40 40 L 60 60 M 60 40 L 40 60"/>
            </g>
        `;
    }

    // Attack operation icon
    createAttackIcon() {
        return `
            <g stroke="white" stroke-width="2" fill="none">
                <path d="M 30 50 L 70 50"/>
                <polygon points="70%,50% 60%,45% 60%,55%" fill="white"/>
            </g>
        `;
    }

    // Ambush operation icon
    createAmbushIcon() {
        return `
            <g stroke="white" stroke-width="1.5" fill="none">
                <path d="M 25 50 L 75 50"/>
                <path d="M 35 40 L 65 60"/>
                <path d="M 65 40 L 35 60"/>
            </g>
        `;
    }

    // Fortification icon
    createFortificationIcon() {
        return `
            <g stroke="white" stroke-width="1.5" fill="none">
                <path d="M 20 60 L 25 40 L 75 40 L 80 60"/>
                <path d="M 25 50 L 75 50"/>
            </g>
        `;
    }

    // Minefield icon
    createMinefieldIcon() {
        return `
            <g fill="white" stroke="white" stroke-width="1">
                <circle cx="30%" cy="40%" r="3%"/>
                <circle cx="70%" cy="40%" r="3%"/>
                <circle cx="50%" cy="55%" r="3%"/>
                <circle cx="35%" cy="65%" r="3%"/>
                <circle cx="65%" cy="65%" r="3%"/>
            </g>
        `;
    }

    // Obstacle icon
    createObstacleIcon() {
        return `
            <g stroke="white" stroke-width="2" fill="none">
                <path d="M 25 45 L 35 55 L 45 45 L 55 55 L 65 45 L 75 55"/>
            </g>
        `;
    }

    // Unknown unit icon (question mark)
    createUnknownIcon() {
        return `
            <g fill="white" stroke="none" font-family="Arial" font-size="16" font-weight="bold">
                <text x="50%" y="60%" text-anchor="middle">?</text>
            </g>
        `;
    }

    // Create complete symbol SVG with frame and icon
    createSymbolSVG(frame, icon, color, size, modifiers) {
        const frameSVG = this.createFrameSVG(frame, color, size);
        const sizeModifier = this.createSizeModifier(size, modifiers.size);
        
        return `
            <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" 
                 xmlns="http://www.w3.org/2000/svg">
                ${frameSVG}
                ${icon}
                ${sizeModifier}
            </svg>
        `;
    }

    // Create size modifier for unit hierarchy
    createSizeModifier(baseSize, unitSize) {
        const modifiers = {
            'squad': '',
            'platoon': '',
            'company': `<rect x="45%" y="5%" width="10%" height="5%" fill="white"/>`,
            'battalion': `<rect x="45%" y="5%" width="10%" height="5%" fill="white"/>
                         <rect x="45%" y="12%" width="10%" height="5%" fill="white"/>`,
            'brigade': `<rect x="45%" y="5%" width="10%" height="5%" fill="white"/>
                       <rect x="45%" y="12%" width="10%" height="5%" fill="white"/>
                       <rect x="45%" y="19%" width="10%" height="5%" fill="white"/>`,
            'division': `<rect x="40%" y="5%" width="20%" height="3%" fill="white"/>
                       <rect x="40%" y="10%" width="20%" height="3%" fill="white"/>
                       <rect x="40%" y="15%" width="20%" height="3%" fill="white"/>`
        };
        
        return modifiers[unitSize] || '';
    }
}

// Export for use in main application
window.NATOSymbolLibrary = NATOSymbolLibrary;