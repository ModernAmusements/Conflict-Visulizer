// Sample CSV data (first 20 entries for demonstration)
const sampleCSVData = [
    {
        IncidentID: "0",
        Date: "16/04/93",
        Location: "West Bank",
        AttackType: "Suicide attack",
        Weapon: "Bomb",
        TotalKilled: "2",
        IsraelisKilled: "0",
        PalestiniansKilled: "2",
        TotalWounded: "9",
        IsraelisWounded: "8",
        TotalCasualties: "11",
        ClaimedBy: "Hamas/Qassam Brigades",
        Description: "Van parked between two buses, one civilian, one military, at Moshad Mehola roadside cafeteria. Referred to as the first apparent suicide car-bomb attempt inside the territories. Used cooking gas canisters. # killed includes bomber himself",
        Context: "Peace talks and Intifada, Palestinian requests to slow peace process",
        TargetType: "Mixed"
    },
    {
        IncidentID: "1",
        Date: "21/11/92",
        Location: "Israel",
        AttackType: "Non-suicide attack",
        Weapon: "Bomb",
        TotalKilled: "0",
        TotalWounded: "0",
        TotalCasualties: "0",
        ClaimedBy: "IQB w/ al-Aqsa Martyrs Brigade",
        Description: "3 attackers drove a VW with cooking gas canisters to Tel Aviv. They failed to stop at a checkpoint and were followed/stopped by police/civil guard in Tel Aviv suburb Ramat Efal. Police detonated bomb safely, 2 perps arrested, 1 escaped.",
        Context: "Peace talks, 1st Intifada",
        TargetType: "Civilian"
    },
    {
        IncidentID: "2",
        Date: "07/12/92",
        Location: "Gaza Strip",
        AttackType: "Non-suicide attack",
        Weapon: "Gun",
        TotalKilled: "3",
        IsraelisKilled: "3",
        TotalWounded: "0",
        TotalCasualties: "3",
        ClaimedBy: "Hamas/Qassam Brigades",
        Description: "3 soldiers in a Jeep shot by gunmen. Also retaliatory: 3 Hamas activists killed week before.",
        Context: "The attack commemorated the intifada anniversary, the founding of Hamas on December 14, 1987, and the deaths of three Hamas activists killed by soldiers last week.",
        TargetType: "Military"
    },
    {
        IncidentID: "3",
        Date: "13/12/92",
        Location: "Israel",
        AttackType: "Kidnapping/Hostage-taking",
        Weapon: "Other/NA",
        TotalKilled: "1",
        IsraelisKilled: "1",
        TotalWounded: "0",
        TotalCasualties: "1",
        ClaimedBy: "Hamas/Qassam Brigades",
        Description: "A border police officer (Sgt-Maj Nissim Toledano) in Lod was kidnapped. Hamas members gave his ID card to Red Crescent workers in al-Bira near Ramallah with a letter demanding Sheikh Yassin's release. Found dead Dec 15.",
        Context: "Sheikh Yassin was serving life in prison on terrorism charges. Resulted in deportation to southern Lebanon of over 400 Hamas activists.",
        TargetType: "Govt"
    },
    {
        IncidentID: "4",
        Date: "18/09/92",
        Location: "Gaza Strip",
        AttackType: "Non-suicide attack",
        Weapon: "Knife",
        TotalKilled: "0",
        TotalWounded: "1",
        IsraelisWounded: "1",
        TotalCasualties: "1",
        ClaimedBy: "Hamas/Qassam Brigades",
        Description: "A hitchhiking soldier was attacked by Palestinians dressed as Orthodox Jews. The terrorists took Alon Karavani's M-16 rifle and uniform before stabbing him and leaving him for dead.",
        Context: "First Intifada",
        TargetType: "Military"
    },
    {
        IncidentID: "5",
        Date: "03/01/93",
        Location: "Israel",
        AttackType: "Non-suicide attack",
        Weapon: "Other/NA",
        TotalKilled: "1",
        IsraelisKilled: "1",
        TotalWounded: "0",
        TotalCasualties: "1",
        ClaimedBy: "Hamas/Qassam Brigades",
        Description: "A police spokesman said Haim Nahmani, an agent for the domestic Shin Beth intelligence service, was stabbed and beaten with a hammer in a home in West Jerusalem while he was on assignment.",
        Context: "Background: expulsion of 415 Hamas activists to S. Lebanon",
        TargetType: "Govt"
    },
    {
        IncidentID: "6",
        Date: "31/01/93",
        Location: "Gaza Strip",
        AttackType: "Non-suicide attack",
        Weapon: "Gun",
        TotalKilled: "2",
        IsraelisKilled: "2",
        TotalWounded: "1",
        IsraelisWounded: "1",
        TotalCasualties: "3",
        ClaimedBy: "Hamas/Qassam Brigades",
        Description: "Two Hamas gunmen hid in bushes waiting to open fire on an army predawn patrol. Two soldiers were killed, a third was wounded.",
        Context: "Just over a month after mass deportation to s. Lebanon of Hamas activists (400+), continuing peace process.",
        TargetType: "Military"
    },
    {
        IncidentID: "7",
        Date: "12/02/93",
        Location: "Gaza Strip",
        AttackType: "Non-suicide attack",
        Weapon: "Gun",
        TotalKilled: "0",
        TotalWounded: "2",
        IsraelisWounded: "2",
        TotalCasualties: "2",
        ClaimedBy: "Hamas/Qassam Brigades",
        Description: "Two Israeli soldiers were shot and wounded in Gaza City.",
        Context: "Was carried out in revenge for the army's destruction of several Palestinian homes with anti-tank rockets, HAMAS said in a communique issued in Amman.",
        TargetType: "Military"
    },
    {
        IncidentID: "8",
        Date: "12/05/93",
        Location: "West Bank",
        AttackType: "Non-suicide attack",
        Weapon: "Knife",
        TotalKilled: "0",
        TotalWounded: "2",
        IsraelisWounded: "2",
        TotalCasualties: "2",
        ClaimedBy: "Hamas/Qassam Brigades",
        Description: "A Hamas commando attacked the soldiers with knives, stole their weapons, and returned safely.",
        Context: "HAMAS said the attack was to avenge the killing of six of its militants by Israeli soldiers in the Gaza Strip.",
        TargetType: "Military"
    },
    {
        IncidentID: "9",
        Date: "01/07/93",
        Location: "West Bank",
        AttackType: "Kidnapping/Hostage-taking",
        Weapon: "Gun",
        TotalKilled: "4",
        IsraelisKilled: "2",
        PalestiniansKilled: "2",
        TotalWounded: "3",
        IsraelisWounded: "1",
        PalestiniansWounded: "2",
        TotalCasualties: "7",
        ClaimedBy: "Hamas/Qassam Brigades",
        Description: "3 Militants opened fire on a bus. 1 Israeli woman, the driver, and a Palestinian man later reported to be a Hamas activist wounded (woman died next day). 2 of them then comandeered an Israeli woman's car w/ her in it -- all 3 then killed in gunfire.",
        Context: "Wanted to hold the passengers hostage to demand the release of 100 Palestinian prisoners, including 50 HAMAS member and Sheikh Abdel Karim Obeid, a Hezbollah leader kidnapped by Israeli commandos in 1989.",
        TargetType: "Civilian"
    }
];

// Function to convert CSV data to timeline events
function parseHamasAttacksFromCSV() {
    // Helper function to extract year from date format
    function extractYear(dateStr) {
        if (dateStr.includes('/')) {
            const parts = dateStr.split('/');
            const year = parseInt(parts[2]);
            return year >= 90 ? 1900 + year : 2000 + year;
        }
        return parseInt(dateStr);
    }

    // Helper function to get coordinates for locations
    function getCoordinates(location) {
        const locationMap = {
            'West Bank': [31.7585, 35.2433],
            'Israel': [31.7683, 35.2137],
            'Gaza Strip': [31.3899, 34.3428],
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
            'Moshad Mehola': [32.0833, 35.5833]
        };
        
        for (const [key, coords] of Object.entries(locationMap)) {
            if (location.toLowerCase().includes(key.toLowerCase())) {
                return coords;
            }
        }
        return [31.7683, 35.2137]; // Default to central Israel
    }

    // Helper function to determine intensity based on casualties
    function getIntensity(totalKilled, totalWounded) {
        const total = parseInt(totalKilled || 0) + parseInt(totalWounded || 0);
        if (total >= 20) return 'high';
        if (total >= 5) return 'medium';
        return 'low';
    }

    const events = [];

    console.log('🔍 Processing CSV data:', sampleCSVData.length, 'entries');

    sampleCSVData.forEach((row, index) => {
        const year = extractYear(row.Date);
        const coordinates = getCoordinates(row.Location);
        const intensity = getIntensity(row.TotalKilled, row.TotalWounded);
        
        const event = {
            date: year.toString(),
            title: `Hamas Attack: ${row.AttackType} in ${row.Location}`,
            description: row.Description || `${row.AttackType} using ${row.Weapon}. Total casualties: ${row.TotalCasualties}`,
            category: 'military',
            era: year <= 2005 ? '1987-2005' : '2006-2023',
            impact: row.Context || `Attack resulted in ${row.TotalKilled} killed and ${row.TotalWounded} wounded`,
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
                totalKilled: parseInt(row.TotalKilled) || 0,
                israelisKilled: parseInt(row.IsraelisKilled) || 0,
                palestiniansKilled: parseInt(row.PalestiniansKilled) || 0,
                totalWounded: parseInt(row.TotalWounded) || 0,
                israelisWounded: parseInt(row.IsraelisWounded) || 0,
                palestiniansWounded: parseInt(row.PalestiniansWounded) || 0,
                totalCasualties: parseInt(row.TotalCasualties) || 0
            },
            attackDetails: {
                type: row.AttackType,
                weapon: row.Weapon,
                claimedBy: row.ClaimedBy,
                targetType: row.TargetType
            }
        };

        events.push(event);
    });

    console.log('✅ Generated', events.length, 'Hamas attack events');
    return events;
}

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

// Combine timeline events with CSV attack data
function getAllEvents() {
    const csvEvents = parseHamasAttacksFromCSV();
    const allEvents = [...timelineEvents, ...csvEvents];
    console.log('📊 Total events combined:', allEvents.length);
    console.log('📊 Hamas attacks:', csvEvents.length);
    console.log('📊 Timeline events:', timelineEvents.length);
    return allEvents;
}

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
    isUpdating: false // Add this important flag
};

// Initialize the timeline
function initializeTimeline() {
    const timelineContainer = document.getElementById('timeline');
    
    // Clear existing content
    timelineContainer.innerHTML = '';
    
    // Get all events including CSV attacks
    const allEvents = getAllEvents();
    
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
    console.log('🚀 Initializing map with year 1994');
    updateMapForYear(1994); // Start at 1994 to show Hamas attacks
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
function addMapLegend() {
    const legend = L.control({ position: 'topright' });
    
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'map-legend');
        console.log('Creating legend...');
        const legendContent = `<div style="background: rgba(44, 62, 80, 0.95); padding: 15px; border-radius: 8px; color: white; font-size: 11px; min-width: 240px; max-height: 600px; overflow-y: auto;">
            <div style="margin-bottom: 8px; font-weight: bold; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 5px;">TERRITORY CONTROL</div>
            <div style="display: flex; align-items: center; margin-bottom: 4px;"><div style="width: 12px; height: 12px; background: rgba(52, 152, 219, 0.3); border: 2px solid rgba(52, 152, 219, 0.7); margin-right: 5px;"></div><span>Israeli Control</span></div>
            <div style="display: flex; align-items: center; margin-bottom: 4px;"><div style="width: 12px; height: 12px; background: rgba(155, 89, 182, 0.3); border: 2px solid rgba(155, 89, 182, 0.7); margin-right: 5px;"></div><span>Palestinian Control</span></div>
            <div style="display: flex; align-items: center; margin-bottom: 4px;"><div style="width: 12px; height: 12px; background: rgba(231, 76, 60, 0.4); border: 2px solid rgba(231, 76, 60, 0.8); margin-right: 5px;"></div><span>Hamas Control</span></div>
            <div style="display: flex; align-items: center; margin-bottom: 6px;"><div style="width: 12px; height: 12px; background: rgba(255, 165, 0, 0.3); border: 2px dashed rgba(255, 165, 0, 0.7); margin-right: 5px;"></div><span>Occupied Areas</span></div>
            <div style="margin-bottom: 6px; font-weight: bold; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 5px;">EVENT MARKERS</div>
            <div style="display: flex; align-items: center; margin-bottom: 4px;"><svg width="12" height="12" viewBox="0 0 24 24" style="margin-right: 5px;"><polygon points="12,2 22,20 2,20" fill="#e74c3c" stroke="white" stroke-width="1"/></svg><span>Military/Attack</span></div>
            <div style="display: flex; align-items: center; margin-bottom: 4px;"><svg width="12" height="12" viewBox="0 0 24 24" style="margin-right: 5px;"><polygon points="12,2 22,20 2,20" fill="#dc2626" stroke="white" stroke-width="1"/></svg><span>Hamas Attacks</span></div>
            <div style="display: flex; align-items: center; margin-bottom: 4px;"><svg width="12" height="12" viewBox="0 0 24 24" style="margin-right: 5px;"><polygon points="12,2 22,12 12,22 2,12" fill="#9b59b6" stroke="white" stroke-width="1"/></svg><span>Political Events</span></div>
            <div style="display: flex; align-items: center; margin-bottom: 4px;"><svg width="12" height="12" viewBox="0 0 24 24" style="margin-right: 5px;"><polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" fill="#f39c12" stroke="white" stroke-width="1"/></svg><span>Social Events</span></div>
            <div style="display: flex; align-items: center; margin-bottom: 4px;"><svg width="12" height="12" viewBox="0 0 24 24" style="margin-right: 5px;"><rect x="4" y="4" width="16" height="16" fill="#3498db" stroke="white" stroke-width="1"/></svg><span>Settlements</span></div>
            <div style="display: flex; align-items: center; margin-bottom: 4px;"><svg width="12" height="12" viewBox="0 0 24 24" style="margin-right: 5px;"><polygon points="12,2 20,7 20,17 12,22 4,17 4,7" fill="#27ae60" stroke="white" stroke-width="1"/></svg><span>Territory Changes</span></div>
            <div style="display: flex; align-items: center; margin-bottom: 4px;"><svg width="12" height="12" viewBox="0 0 24 24" style="margin-right: 5px;"><circle cx="12" cy="12" r="10" fill="#f39c12" stroke="white" stroke-width="1"/></svg><span>Major Cities</span></div>

            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.2); font-size: 10px; color: #9ca3af;">
                <div style="font-weight: bold; margin-bottom: 5px; text-align: center;">MILITARY FACTIONS:</div>
                <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; font-size: 9px;">
                    ${Object.entries(militaryFactions).map(([key, faction]) => {
                        let icon = '';
                        if (faction.symbol === '★') {
                            icon = `<polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" fill="${faction.color}" stroke="white" stroke-width="0.5"/>`;
                        } else if (faction.symbol === '▲') {
                            icon = `<polygon points="12,2 22,20 2,20" fill="${faction.color}" stroke="white" stroke-width="0.5"/>`;
                        } else if (faction.symbol === '●') {
                            icon = `<circle cx="12" cy="12" r="8" fill="${faction.color}" stroke="white" stroke-width="0.5"/>`;
                        } else if (faction.symbol === '⬟') {
                            icon = `<polygon points="12,2 22,12 12,22 2,12" fill="${faction.color}" stroke="white" stroke-width="0.5"/>`;
                        } else if (faction.symbol === '⬢') {
                            icon = `<polygon points="12,2 20,7 20,17 12,22 4,17 4,7" fill="${faction.color}" stroke="white" stroke-width="0.5"/>`;
                        }
                        return `<div style="display: flex; align-items: center;"><svg width="12" height="12" viewBox="0 0 24 24" style="margin-right: 4px;">${icon}</svg><span>${faction.name}</span></div>`;
                    }).join('')}
                </div>
            </div>
            <div style="margin-top: 8px; font-weight: bold; text-align: center; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 5px; font-size: 10px;">
                Total Events: ${getAllEvents().length}
            </div>
            <div style="margin-top: 8px; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; text-align: center; font-size: 9px;">
                TEST: Military Factions Section
            </div>
        </div>`;
        console.log('Legend content created, length:', legendContent.length);
        console.log('Factions section included:', legendContent.includes('MILITARY FACTIONS:'));
        console.log('TEST section included:', legendContent.includes('TEST: Military Factions Section'));
        div.innerHTML = legendContent;
        console.log('Legend innerHTML set');
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
    const showMovements = document.getElementById('show-movements');
    
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
    
    if (showMovements) {
        showMovements.addEventListener('change', (e) => {
            mapState.showMovements = e.target.checked;
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

// Add helper function to prevent year parsing issues
function getEventYear(dateString) {
    // Handle "October 7, 2023" format
    const yearMatch = dateString.match(/\d{4}/);
    if (yearMatch) {
        return parseInt(yearMatch[0]);
    }
    
    // Handle "1948" or "1967" format
    const year = parseInt(dateString.split('-')[0]);
    return isNaN(year) ? 0 : year;
}

// Update map for specific year with recursion prevention
function updateMapForYear(year) {
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
        
        // Create new layers
        mapState.territoryLayer = L.layerGroup();
        mapState.markerLayer = L.layerGroup();
        mapState.cityLayer = L.layerGroup();
        mapState.movementLayer = L.layerGroup();
        
        // Get events for this year and earlier
        const allEvents = getAllEvents();
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
function groupEventsByCoordinates(events, threshold = 0.01) {
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

// Calculate offset positions in a spiral pattern
function getSpiralOffset(index, total, spacing = 0.008) {
    if (total === 1) return { latOffset: 0, lngOffset: 0 };
    
    const angle = index * (2 * Math.PI / 3); // 120 degrees between markers
    const radius = spacing * Math.ceil(index / 3); // Increase radius every 3 markers
    
    const latOffset = radius * Math.cos(angle);
    const lngOffset = radius * Math.sin(angle);
    
    return { latOffset, lngOffset };
}

// Draw all event markers with proper layer management and overlap handling
function drawAllEventMarkers(events) {
    // Group events by coordinates to handle overlaps
    const eventGroups = groupEventsByCoordinates(events);
    
    eventGroups.forEach(group => {
        group.forEach((event, indexInGroup) => {
            if (!event.geography || !event.geography.coordinates) return;
            
            let markerType = 'default';
            let markerColor = '#95a5a6';
            let shouldShow = false;
            
            // Determine marker type, color, and visibility based on event type and category
            if (event.category === 'military' || event.geography.type === 'attack') {
                markerType = 'attack';
                // Special handling for Hamas attacks
                if (event.title && event.title.includes('Hamas Attack:')) {
                    markerColor = '#dc2626'; // Darker red for Hamas attacks
                } else {
                    markerColor = '#e74c3c'; // Regular red for other attacks
                }
                shouldShow = mapState.showAttacks;
            } else if (event.geography.type === 'settlement') {
                markerType = 'settlement';
                markerColor = '#3498db';
                shouldShow = mapState.showSettlements;
            } else if (event.category === 'political') {
                markerType = 'political';
                markerColor = '#9b59b6';
                shouldShow = mapState.showPolitical;
            } else if (event.category === 'social') {
                markerType = 'social';
                markerColor = '#f39c12';
                shouldShow = mapState.showSocial;
            } else if (event.geography.type === 'territory_change') {
                markerType = 'territory_change';
                markerColor = '#27ae60';
                shouldShow = mapState.showTerritory;
            }
            
            // Only create marker if it should be shown
            if (shouldShow) {
                // Calculate offset for overlapping markers
                const { latOffset, lngOffset } = getSpiralOffset(indexInGroup, group.length);
                const adjustedCoords = [
                    event.geography.coordinates[0] + latOffset,
                    event.geography.coordinates[1] + lngOffset
                ];
                
                const marker = L.marker(
                    adjustedCoords, 
                    {
                        icon: createMarkerIcon(markerType, markerColor, 20, event.geography.intensity)
                    }
                );
                
                // Create enhanced popup content with overlap information
                const overlapInfo = group.length > 1 ? 
                    `<div style="font-size: 11px; color: #e74c3c; margin-top: 5px;">
                        <em>⚠️ ${group.length} events at this location</em>
                    </div>` : '';
                
                // Enhanced popup content for Hamas attacks
                const isHamasAttack = event.title && event.title.includes('Hamas Attack:');
                const additionalInfo = isHamasAttack && event.casualties ? 
                    `<div style="margin-top: 5px; padding: 5px; background: rgba(220, 38, 38, 0.1); border-radius: 3px; font-size: 11px;">
                        <strong>Casualties:</strong><br>
                        • Total Killed: ${event.casualties.totalKilled}<br>
                        ${event.casualties.israelisKilled ? `• Israelis Killed: ${event.casualties.israelisKilled}<br>` : ''}
                        ${event.casualties.palestiniansKilled ? `• Palestinians Killed: ${event.casualties.palestiniansKilled}<br>` : ''}
                        • Total Wounded: ${event.casualties.totalWounded}<br>
                        • Total Casualties: ${event.casualties.totalCasualties}
                    </div>` : '';

                const attackDetails = isHamasAttack && event.attackDetails ? 
                    `<div style="margin-top: 5px; padding: 5px; background: rgba(52, 152, 219, 0.1); border-radius: 3px; font-size: 11px;">
                        <strong>Attack Details:</strong><br>
                        • Type: ${event.attackDetails.type}<br>
                        • Weapon: ${event.attackDetails.weapon}<br>
                        • Claimed by: ${event.attackDetails.claimedBy}<br>
                        • Target: ${event.attackDetails.targetType}
                    </div>` : '';
                
                const popupContent = `
                    <div style="max-width: 250px;">
                        <strong style="color: ${isHamasAttack ? '#dc2626' : '#000'};">${event.title}</strong><br>
                        <span style="color: #7f8c8d; font-size: 12px;">${event.date}</span><br>
                        ${event.source ? `<span style="color: #666; font-size: 10px;">Source: ${event.source}</span><br>` : ''}
                        <hr style="margin: 5px 0;">
                        <span style="font-size: 13px;">${event.description}</span><br>
                        <hr style="margin: 5px 0;">
                        <em style="font-size: 12px; color: #34495e;"><strong>Impact:</strong> ${event.impact}</em>
                        ${attackDetails}
                        ${additionalInfo}
                        ${overlapInfo}
                    </div>
                `;
                
                marker.bindPopup(popupContent);
                
                // Add pulsing animation for high-intensity events
                if (event.geography.intensity === 'high') {
                    let pulsing = true;
                    setInterval(() => {
                        if (pulsing) {
                            const currentSize = 20;
                            const newSize = currentSize === 20 * 1.3 ? 20 : 20 * 1.3;
                            marker.setIcon(createMarkerIcon(markerType, markerColor, newSize, 'high'));
                        }
                    }, 1000);
                }
                
                marker.addTo(mapState.markerLayer);
            }
        });
    });
}

// Get faction-specific colors and symbols
function getFactionColor(faction) {
    const factions = {
        'idf': {
            color: '#2563eb',           // IDF Blue
            symbol: 'star',              // Star of David influence
            name: 'Israeli Defense Force'
        },
        'hamas': {
            color: '#dc2626',           // Hamas Red
            symbol: 'triangle',           // Triangle attack symbol
            name: 'Hamas'
        },
        'egyptian_syrian': {
            color: '#ea580c',           // Egypt/Syria Orange
            symbol: 'diamond',            // Diamond coalition
            name: 'Egypt-Syria Coalition'
        },
        'arab_forces': {
            color: '#f97316',           // Arab Forces Dark Orange
            symbol: 'diamond',            // Diamond coalition
            name: 'Arab Forces'
        },
        'pij': {
            color: '#ea580c',           // PIJ Orange
            symbol: 'triangle',           // Triangle militant
            name: 'Palestinian Islamic Jihad'
        },
        'hezbollah': {
            color: '#7c3aed',           // Hezbollah Purple
            symbol: 'star',              // Star resistance
            name: 'Hezbollah'
        },
        'fatah': {
            color: '#16a34a',           // Fatah Green
            symbol: 'circle',            // Circle governance
            name: 'Fatah/Palestinian Authority'
        },
        'iran': {
            color: '#991b1b',           // Iran Dark Red
            symbol: 'hexagon',            // Hexagon support
            name: 'Iran (Supporter)'
        }
    };
    return factions[faction] || { 
        color: '#6b7280', 
        symbol: 'circle', 
        name: 'Unknown Faction' 
    };
}

// Draw military movement paths with animations (fixed recursion prevention)
function drawMovementPaths(events) {
    if (!mapState.showMovements) {
        console.log('🚀 Movement display is disabled');
        return;
    }
    
    const movementEvents = events.filter(event => event.movementData);
    console.log('🎯 Drawing movements for year - found:', movementEvents.length, 'events with movement data');
    
    // Process each movement event only once
    movementEvents.forEach(event => {
        const movement = event.movementData;
        
        // Get faction info (color + symbol)
        const faction = getFactionColor(movement.faction);
        
        console.log('📊 Processing movement:', event.title, '| Faction:', faction.name, '| Points:', movement.coordinates.length);
        
        // Create animated movement path
        const path = L.polyline(movement.coordinates, {
            color: faction.color,
            weight: 4,
            opacity: 0.9,
            dashArray: getFactionDashPattern(faction.symbol)
        });
        
        // Add faction markers at each coordinate (without overlapping duplicates)
        const processedCoordinates = new Set();
        movement.coordinates.forEach((coord, index) => {
            if (index < movement.coordinates.length - 1) {
                const coordKey = `${coord[0]},${coord[1]}`;
                
                // Skip duplicate coordinates for this movement
                if (processedCoordinates.has(coordKey)) {
                    console.log('⏭ Skipping duplicate coordinate:', coordKey);
                    return;
                }
                
                processedCoordinates.add(coordKey);
                
                const nextCoord = movement.coordinates[index + 1];
                const bearing = calculateBearing(coord, nextCoord);
                
                const markerIcon = createFactionMarker(faction, bearing);
                const marker = L.marker(coord, {
                    icon: markerIcon,
                    opacity: 1,
                    zIndexOffset: 1000 // Ensure markers appear above other layers
                });
                
                // Add tooltip for better visibility
                marker.bindTooltip(faction.name, {
                    permanent: false,
                    direction: 'top',
                    offset: [0, -16]
                });
                
                marker.addTo(mapState.movementLayer);
                console.log('Marker added for', event.title, 'at', coord, '- Type:', faction.name);
            }
        });
        
        // Enhanced popup with movement details
        path.bindPopup(`
            <div style="max-width: 250px; background: #1a1a1a; color: #e1e8ed; padding: 10px; border-radius: 8px;">
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <div style="background: ${faction.color}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 500; margin-right: 8px;">
                        ${faction.name}
                    </div>
                </div>
                <strong>${event.title}</strong><br>
                <span style="color: #9ca3af; font-size: 12px;">${event.date}</span><br>
                <hr style="margin: 8px 0; border-color: #374151;">
                <span style="color: #b0b8c0; font-size: 13px;">
                    <strong>Operation:</strong> ${movement.type.replace(/_/g, ' ').toUpperCase()}<br>
                    <strong>Duration:</strong> ${movement.startTime} to ${movement.endTime}<br>
                    <strong>Waypoints:</strong> ${movement.coordinates.length}
                </span>
            </div>
        `);
        
        path.addTo(mapState.movementLayer);
    });
    
    console.log('✅ Movement layer now contains:', mapState.movementLayer.getLayers().length, 'unique markers');
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
    
    // Read checkbox states from HTML and sync with mapState
    if (showAttacks) {
        mapState.showAttacks = showAttacks.checked;
        console.log('🔧 showAttacks.checked:', showAttacks.checked);
    }
    if (showPolitical) {
        mapState.showPolitical = showPolitical.checked;
        console.log('🔧 showPolitical.checked:', showPolitical.checked);
    }
    if (showSocial) {
        mapState.showSocial = showSocial.checked;
        console.log('🔧 showSocial.checked:', showSocial.checked);
    }
    if (showTerritory) {
        mapState.showTerritory = showTerritory.checked;
        console.log('🔧 showTerritory.checked:', showTerritory.checked);
    }
    if (showSettlements) {
        mapState.showSettlements = showSettlements.checked;
        console.log('🔧 showSettlements.checked:', showSettlements.checked);
    }
    if (showCities) {
        mapState.showCities = showCities.checked;
        console.log('🔧 showCities.checked:', showCities.checked);
    }
    if (showMovements) {
        mapState.showMovements = showMovements.checked;
        console.log('🔧 showMovements.checked:', showMovements.checked);
    }
    
    console.log('🔧 Final mapState:', {
        currentYear: mapState.currentYear,
        showAttacks: mapState.showAttacks,
        showPolitical: mapState.showPolitical,
        showSocial: mapState.showSocial,
        showTerritory: mapState.showTerritory,
        showSettlements: mapState.showSettlements,
        showCities: mapState.showCities,
        showMovements: mapState.showMovements
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTimeline();
    initializeCheckboxStates();
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