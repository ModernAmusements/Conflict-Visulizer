const timelineEvents = [
    // Early Period (1900-1947)
    {
        date: "1900-1917",
        title: "Early Zionist Immigration",
        description: "First and Second Aliyah waves bring Jewish immigrants to Palestine, then part of Ottoman Empire. Early tensions begin over land and resources.",
        category: "social",
        era: "1900-1947",
        impact: "Sets the foundation for competing national aspirations in the same territory."
    },
    {
        date: "1917",
        title: "Balfour Declaration",
        description: "British government declares support for establishment of 'national home for the Jewish people' in Palestine, while protecting rights of existing non-Jewish communities.",
        category: "political",
        era: "1900-1947",
        impact: "International recognition of Zionist goals creates tension with Arab population."
    },
    {
        date: "1920-1939",
        title: "Arab Revolts and Growing Tensions",
        description: "Multiple Arab uprisings against Jewish immigration and British rule. 1936-1939 Arab Revolt is particularly significant.",
        category: "military",
        era: "1900-1947",
        impact: "Violent conflicts establish pattern of resistance and counter-resistance."
    },
    {
        date: "1947",
        title: "UN Partition Plan",
        description: "UN proposes dividing Palestine into separate Jewish and Arab states, with Jerusalem under international administration.",
        category: "political",
        era: "1900-1947",
        impact: "Jewish leadership accepts, Arab leadership rejects - setting stage for war."
    },

    // Formation & Early Wars (1948-1966)
    {
        date: "1948",
        title: "Israeli Declaration of Independence & War",
        description: "Israel declares independence on May 14. Arab states invade, leading to 1948 Arab-Israeli War. 750,000 Palestinians displaced (Nakba).",
        category: "military",
        era: "1948-1966",
        impact: "Establishes Israel as a state, creates Palestinian refugee crisis, defines regional conflict."
    },
    {
        date: "1956",
        title: "Suez Crisis",
        description: "Israel, UK, and France attack Egypt over Suez Canal. Israel gains access to Straits of Tiran.",
        category: "military",
        era: "1948-1966",
        impact: "Demonstrates Israel's military capability and regional dynamics."
    },

    // Occupation & Rise of Resistance (1967-1986)
    {
        date: "1967",
        title: "Six-Day War",
        description: "Israel launches preemptive strike against Egypt, Jordan, Syria. Captures West Bank, Gaza, East Jerusalem, Golan Heights, Sinai.",
        category: "military",
        era: "1967-1986",
        impact: "Israeli occupation of Palestinian territories begins, setting stage for future resistance movements."
    },
    {
        date: "1967-1987",
        title: "Early Palestinian Resistance",
        description: "PLO becomes dominant Palestinian organization. Various resistance groups form, including early Islamic resistance movements.",
        category: "political",
        era: "1967-1986",
        impact: "Establishes organized Palestinian resistance against Israeli occupation."
    },
    {
        date: "1973",
        title: "Yom Kippur War",
        description: "Egypt and Syria launch surprise attack on Israel. Initial Arab successes, eventual Israeli counterattack.",
        category: "military",
        era: "1967-1986",
        impact: "Leads to peace process, but also strengthens hardline positions on both sides."
    },

    // First Intifada & Hamas Formation (1987-2005)
    {
        date: "1987",
        title: "First Intifada Begins",
        description: "Palestinian uprising against Israeli occupation begins in Gaza and spreads to West Bank. Mass protests, strikes, and civil disobedience.",
        category: "social",
        era: "1987-2005",
        impact: "Shifts Palestinian resistance to popular uprising, draws international attention."
    },
    {
        date: "1987",
        title: "Hamas Founded",
        description: "Sheikh Ahmed Yassin establishes Hamas as an offshoot of Muslim Brotherhood. Initially focused on social welfare and education.",
        category: "political",
        era: "1987-2005",
        impact: "Introduces Islamic resistance movement with both political and military wings."
    },
    {
        date: "1988",
        title: "Hamas Charter Published",
        description: "Hamas releases its founding charter calling for destruction of Israel and establishment of Islamic state in all of historic Palestine.",
        category: "political",
        era: "1987-2005",
        impact: "Establishes Hamas's uncompromising ideological position against Israel's existence."
    },
    {
        date: "1993",
        title: "Oslo Accords",
        description: "Israel and PLO sign peace agreement. Hamas opposes accord, escalates attacks against Israeli civilians.",
        category: "political",
        era: "1987-2005",
        impact: "Creates division between secular Palestinian leadership and Hamas opposition."
    },
    {
        date: "1994-2000",
        title: "Hamas Suicide Bombing Campaign",
        description: "Hamas conducts series of suicide bombings targeting Israeli civilians, particularly during Second Intifada period.",
        category: "military",
        era: "1987-2005",
        impact: "Demonstrates Hamas's tactical evolution and commitment to armed struggle."
    },
    {
        date: "2000",
        title: "Second Intifada Begins",
        description: "After failure of Camp David talks, Palestinians launch Second Intifada. Hamas becomes major armed resistance group.",
        category: "military",
        era: "1987-2005",
        impact: "Extremely violent period with thousands dead on both sides, hardens positions."
    },

    // Gaza Conflicts & Wars (2006-2023)
    {
        date: "2005",
        title: "Israel Disengages from Gaza",
        description: "Israel removes settlements and military from Gaza, but maintains control over borders, airspace, and waters.",
        category: "political",
        era: "2006-2023",
        impact: "Hamas claims victory, but Gaza remains under Israeli control and blockade."
    },
    {
        date: "2006",
        title: "Hamas Wins Palestinian Elections",
        description: "Hamas wins parliamentary elections, surprising international community. Israel and West cut off aid to Palestinian Authority.",
        category: "political",
        era: "2006-2023",
        impact: "Creates political crisis and leads to Hamas-Fatah conflict."
    },
    {
        date: "2007",
        title: "Hamas Takes Control of Gaza",
        description: "Hamas forces Fatah out of Gaza in violent conflict. Israel and Egypt impose blockade on Gaza.",
        category: "military",
        era: "2006-2023",
        impact: "Divides Palestinian territories politically, creates open-air prison conditions in Gaza."
    },
    {
        date: "2008-2009",
        title: "First Gaza War (Cast Lead)",
        description: "Israel launches major military operation in response to Hamas rocket fire. 1,400 Palestinians and 13 Israelis killed.",
        category: "military",
        era: "2006-2023",
        impact: "Establishes pattern of periodic large-scale conflicts between Israel and Hamas."
    },
    {
        date: "2012",
        title: "Operation Pillar of Defense",
        description: "Israeli operation targeting Hamas rocket capabilities. Ahmed Jabari, Hamas military commander, killed.",
        category: "military",
        era: "2006-2023",
        impact: "Demonstrates Israel's intelligence capabilities and targeted killing strategy."
    },
    {
        date: "2014",
        title: "Operation Protective Edge",
        description: "50-day war between Israel and Hamas. 2,251 Palestinians and 73 Israelis killed. Massive destruction in Gaza.",
        category: "military",
        era: "2006-2023",
        impact: "One of deadliest conflicts, leads to international investigations and criticism."
    },
    {
        date: "2018-2019",
        title: "Great March of Return",
        description: "Palestinian protests along Gaza border. Israeli forces kill over 200 protesters, including medics and journalists.",
        category: "social",
        era: "2006-2023",
        impact: "International criticism of Israel's use of live fire against civilian protesters."
    },
    {
        date: "2021",
        title: "Gaza War and Jerusalem Tensions",
        description: "Conflict sparked by Jerusalem evictions and Al-Aqsa clashes. Hamas fires rockets, Israel responds with airstrikes.",
        category: "military",
        era: "2006-2023",
        impact: "Shows interconnection between Jerusalem issues and Gaza conflicts."
    },

    // Recent Developments (2024-2025)
    {
        date: "October 7, 2023",
        title: "October 7 Hamas Attack",
        description: "Hamas launches unprecedented attack on Israel, killing 1,200 people and taking 250 hostages. Largest single-day attack on Israel.",
        category: "military",
        era: "2024-2025",
        impact: "Triggers major regional conflict and humanitarian crisis in Gaza."
    },
    {
        date: "2023-2024",
        title: "Gaza War and Humanitarian Crisis",
        description: "Israel launches extensive military operation in Gaza. Over 30,000 Palestinians killed, massive displacement and infrastructure destruction.",
        category: "military",
        era: "2024-2025",
        impact: "Creates worst humanitarian crisis in Gaza's history, international pressure for ceasefire."
    },
    {
        date: "2024",
        title: "International Court Cases and Diplomacy",
        description: "ICJ orders Israel to prevent genocide in Gaza. South Africa brings case. International diplomatic efforts intensify.",
        category: "political",
        era: "2024-2025",
        impact: "Signifies growing international legal and diplomatic pressure on conflict parties."
    },
    {
        date: "2025",
        title: "Ongoing Conflict and Regional Implications",
        description: "Conflict continues with regional spillover in Lebanon, Syria, Yemen. Ceasefire negotiations ongoing, humanitarian crisis persists.",
        category: "political",
        era: "2024-2025",
        impact: "Demonstrates how Israel-Hamas conflict affects broader Middle East stability."
    }
];

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
    eraSelect.addEventListener('change', function() {
        filterByEra(this.value);
    });
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeTimeline);

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});