import { v4 as uuidv4 } from 'uuid';

// Syllable data for name generation
const syllables = {
    prefixes: ["Zy", "No", "Al", "Cy", "Ve", "Ka", "Lo", "Mi", "Xa", "Re", "Neo", "Flux", "Zen", "Hyper", "Vex", "Astro", "Bit", "Cloud", "Data", "Echo", "Ira", "Kryo", "Luma", "Meta", "Nova", "Omni", "Proto", "Quantum", "Sync", "Volt", "Nexus", "Orion", "Titan", "Solar", "Plasma"],
    middles: ["ron", "va", "pha", "ber", "ga", "li", "th", "mo", "xi", "na", "cor", "tra", "dyn", "ly", "sys", "tech", "vortex", "pulse", "grid", "node", "link", "byte", "core", "flow", "morph", "phase", "shift", "wave"],
    suffixes: ["X", "Blaze", "77", "Storm", "Core", "Vance", "Dax", "Ray", "Lin", "Tera", "Prime", "Void", "Helix", "Alpha", "Beta", "Sigma", "Delta", "Omega", "Zero", "One", "Net", "Web", "Zone", "Star", "Dust", "Node", "Link"]
};

const firstNamesPool = ["Aiden", "Bryn", "Cael", "Dara", "Eris", "Fael", "Gale", "Hera", "Ione", "Jace", "Kael", "Lyra", "Mira", "Nyx", "Orin", "Phaea", "Quin", "Rhea", "Sora", "Tyne", "Ura", "Veda", "Wren", "Xael", "Yara", "Zane"];
const lastNamesPool = ["Vortex", "Starlight", "Shadow", "Neon", "Cyber", "Binary", "Quantum", "Aether", "Solar", "Lunar", "Plasma", "Matrix", "Echo", "Nova", "Flux", "Zenith", "Apex", "Prism", "Pulse", "Rift"];

const futuristicCities = ["Neon Valley", "Cyberia", "Pulse Point", "Static Hill", "Data Port", "Silicon Ridge", "Aetheria", "Neural City", "Binary Bay", "Cloud Reach", "Glitch Garden", "Vector Void", "Logic Lake", "Macro Metro", "Nano Node", "Prism Peak", "Echo Enclave", "Quantum Quarter", "Titan Terrace"];
const countries = ["Alpha Prime", "Sector 7", "New Eden", "Zion City", "The Collective", "Neo-Japan", "United Mar-Sys", "Titan Colony", "Europa Hub", "Lunar Spire", "Venusian Cloud", "Belt Station 4", "Orion Nexus", "Solaris Republic", "Andromeda Reach"];

const bioFragments = {
    roles: ["Full-stack neural architect", "Cybernetic security specialist", "Holographic interface designer", "Data-splicing engineer", "Quantum-stream analyst", "Synthetic DNA encoder", "Augmented reality sculptor", "Sub-space frequency tuner", "AI-Human liaison", "Deep-net navigator"],
    obsessions: ["data mining", "neon lights", "circuitry art", "virtual racing", "techno-meditation", "retro-coding", "bot-herding", "signal-chasing", "memory-weaving", "glitch-hunting"],
    traits: ["always seeking the next glitch", "living in the wires", "obsessed with high-latency hacks", "dreaming of silicon dreams", "transcending the meat-space", "optimized for speed", "locked in a feedback loop", "syncing with the grid", "navigating the void"]
};

const skillsPool = ["Quantum Coding", "Neural Mapping", "Cyber Security", "AI Orchestration", "Data Splicing", "Bio-Hacking", "Holographic Art", "Sub-grid Navigation", "Blockchain Weaving", "Satellite Hijacking", "Firmware Ghosting", "Vector Debugging", "Kernel Overclocking", "Nano-Bot Swarming", "Aether Synthesis"];
const interestsPool = ["Techno-Meditation", "Virtual Racing", "Circuitry Art", "Retro-Hardware", "Holographic Cinema", "Neural Synthesizers", "Static Photography", "Drone Modding", "Crypto-Archaeology", "Deep-Net Diving", "Zero-G Gardening", "Synthetic Bio-Art"];
const traitsPool = ["Analytical", "Rebellious", "Visionary", "Calculative", "Empathetic", "Stoic", "Highly Focused", "Unpredictable", "Pragmatic", "Idealistic", "Efficient", "Eccentric", "Adaptable", "Mysterious"];

const companiesPool = ["NeuroLink Corp", "Static Systems", "Vortex Industries", "Alpha Stream", "Quantum Logic", "Silicon Soul", "Neo-Tech Solutions", "Aether Dynamics", "CyberCore Inc", "Bio-Digital", "Plasma Peak Systems", "Titan Tech"];
const universityPool = ["Neon Institute of Technology", "Cyberia State University", "Zion Academy of Sciences", "New Eden Polytechnic", "The Collective University", "Mar-Sys Technical College", "Lunar Academy of Arts", "Solaris Engineering School"];
const jobTitlesPool = ["Junior Architect", "Senior Developer", "Lead Interface Designer", "Security Analyst", "Data Scientist", "System Integrator", "Research Fellow", "Product Owner", "Grid Controller", "Protocol Enforcer"];

const languagesPool = ["Standard English", "Binary-Code", "Neo-Mandarin", "Lunar-Dialect", "Synthesized Spanish", "Quantum-Script", "Data-Stream", "Old-Earth French"];
const hobbyPool = ["Glitch Art", "Drone Racing", "AI Training", "Retro-Gaming", "Cyber-Gardening", "Signal Analysis", "Holodeck Sculpting", "Memory Editing"];

// --- NEW DATA POOLS ---
const medicalPool = {
    bloodTypes: ["A+", "B+", "AB+", "O-", "Synthetic-O", "Liquid-Gold", "Blue-Plasma"],
    neuralStability: ["Stable", "Hyper-Aware", "Jittery", "Degraded", "Optimized", "Overclocked"],
    augmentations: ["Optical Zoom (10x)", "Neural Link v4", "Sub-dermal Armor", "Reflex Booster", "Memory Bank (2TB)", "Voice Synthesizer", "Oxygen Filter", "Cardiac Regulator"]
};

const financialPool = {
    currencies: ["Credits", "Ether-Dust", "Nano-Bits", "Global-Yen", "Void-Coin"],
    tiers: ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Obsidian"],
    primaryBank: ["First Lunar Savings", "Neo-Swiss Crypto", "Silicon Valley Digital", "Aether Financial", "Orbital Trust"]
};

const psychologicalPool = {
    alignments: ["Lawful Good", "Neutral Good", "Chaotic Good", "Lawful Neutral", "True Neutral", "Chaotic Neutral", "Lawful Evil", "Neutral Evil", "Chaotic Evil"],
    coreDrives: ["Knowledge", "Power", "Survival", "Rebellion", "Harmony", "Creation", "Chaos", "Order"],
    stressTolerance: ["High", "Medium", "Low", "Extreme", "Shattered"]
};

const equipmentPool = {
    handhelds: ["Neural Interface Deck", "Data Splicer", "Plasma Torch", "Compact Drone Controller", "Sonic Multitool"],
    transport: ["Hover-Cycle", "Mag-Lev Pod", "Urban Glider", "Sub-orbital Shuttle", "Heavy-Duty Exo-Rig"]
};

const citizenshipPool = {
    clearanceLevels: ["Level 1 (Public)", "Level 2 (Internal)", "Level 3 (Secret)", "Level 4 (Top Secret)", "Level 5 (Admin)"],
    status: ["Citizen", "Permanent Resident", "Synthetic Entity", "Refugee", "Diplomat", "Exile"]
};

export const generateExperience = () => {
    const count = getRandomInt(1, 3);
    const exp = [];
    for (let i = 0; i < count; i++) {
        exp.push({
            company: getRandomElement(companiesPool),
            role: getRandomElement(jobTitlesPool),
            years: getRandomInt(1, 10),
            description: `Specialized in ${getRandomElement(bioFragments.obsessions)} and ${getRandomElement(skillsPool).toLowerCase()}.`
        });
    }
    return exp;
};

export const generateEducation = () => {
    return {
        institution: getRandomElement(universityPool),
        degree: getRandomElement(["B.S. in Neural Computing", "M.S. in Cybernetics", "Ph.D. in AI Ethics", "B.A. in Virtual Arts", "M.Eng in Quantum Mechanics"]),
        year: new Date().getFullYear() - getRandomInt(1, 15)
    };
};

export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
export const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const generateFictionalName = () => {
    if (Math.random() > 0.5) return getRandomElement(firstNamesPool);
    const usePrefix = Math.random() > 0.2;
    const useMiddle = Math.random() > 0.6;
    let name = "";
    if (usePrefix) name += getRandomElement(syllables.prefixes);
    if (useMiddle) name += getRandomElement(syllables.middles);
    name += getRandomElement(syllables.suffixes);
    return name;
};

export const generateLastName = () => {
    if (Math.random() > 0.4) return getRandomElement(lastNamesPool);
    return generateFictionalName();
};

export const generateUsername = (name) => {
    const styles = [
        () => `${name}_${getRandomInt(10, 999)}`,
        () => `Cyber${name}`,
        () => `${name}X`,
        () => `Neo_${name}`,
        () => `_${name}_`,
        () => `${name}${getRandomElement(syllables.suffixes)}`
    ];
    return getRandomElement(styles)().toLowerCase().replace(/\s/g, '');
};

export const generateBio = () => {
    return `${getRandomElement(bioFragments.roles)} ${getRandomElement(bioFragments.traits)}, ${getRandomElement(bioFragments.obsessions)}.`;
};

export const getRandomSet = (pool, min, max) => {
    const count = Math.min(getRandomInt(min, max), pool.length);
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

export const generatePhone = () => {
    return `+1-${getRandomInt(100, 999)}-${getRandomInt(100, 999)}-${getRandomInt(1000, 9999)}`;
};

export const generateDOB = (age) => {
    const year = new Date().getFullYear() - age;
    const month = getRandomInt(1, 12);
    const day = getRandomInt(1, 28);
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

export const generateAddress = (city, country) => {
    const streetNames = ["Neon Way", "Cyber Lane", "Binary Road", "Grid Street", "Pulse Ave", "Silicon Dr", "Aether Blvd", "Neural Ct"];
    return `${getRandomInt(1, 9999)} ${getRandomElement(streetNames)}, ${city}, ${country} ${getRandomInt(10000, 99999)}`;
};

// --- NEW GENERATORS ---
export const generateMedicalProfile = () => ({
    blood_type: getRandomElement(medicalPool.bloodTypes),
    neural_stability: getRandomElement(medicalPool.neuralStability),
    heart_rate: getRandomInt(60, 100),
    augmentations: getRandomSet(medicalPool.augmentations, 1, 3)
});

export const generateFinancialProfile = () => ({
    currency: getRandomElement(financialPool.currencies),
    credit_score: getRandomInt(300, 850),
    tier: getRandomElement(financialPool.tiers),
    bank: getRandomElement(financialPool.primaryBank),
    balance: (Math.random() * 100000).toFixed(2)
});

export const generatePsychProfile = () => ({
    alignment: getRandomElement(psychologicalPool.alignments),
    core_drive: getRandomElement(psychologicalPool.coreDrives),
    stress_tolerance: getRandomElement(psychologicalPool.stressTolerance)
});

export const generateCitizenshipProfile = () => ({
    clearance: getRandomElement(citizenshipPool.clearanceLevels),
    status: getRandomElement(citizenshipPool.status),
    record: getRandomElement(["Clean", "Minor Infractions", "Warrant Active", "Pardoned", "Expunged"])
});

export const generateEquipmentProfile = () => ({
    handheld: getRandomElement(equipmentPool.handhelds),
    transport: getRandomElement(equipmentPool.transport)
});

export { 
    futuristicCities, 
    countries, 
    skillsPool, 
    interestsPool, 
    traitsPool, 
    languagesPool, 
    hobbyPool 
};
