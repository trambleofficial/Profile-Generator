import { v4 as uuidv4 } from 'uuid';
import * as gen from '../utils/generators.js';

/**
 * Generates a single fictional user profile
 */
export const createProfile = () => {
    const firstName = gen.generateFictionalName();
    const lastName = gen.generateLastName();
    const displayName = `${firstName} ${lastName}`;
    const username = gen.generateUsername(firstName);
    const age = gen.getRandomInt(18, 65);
    const profileId = uuidv4();
    const country = gen.getRandomElement(gen.countries);
    const city = gen.getRandomElement(gen.futuristicCities);

    const emailDomains = ["neurogrid.ai", "vortex.io", "cybercore.net", "aether.sh", "nexus.dev"];
    const domain = gen.getRandomElement(emailDomains);

    return {
        id: profileId,
        username: username,
        display_name: displayName,
        first_name: firstName,
        last_name: lastName,
        alias: gen.getRandomElement([firstName, `${firstName.charAt(0)}.${lastName}`, username.toUpperCase()]),
        gender: gen.getRandomElement(['Masculine', 'Feminine', 'Non-Binary', 'Other', 'Android', 'Synthetic']),
        age: age,
        dob: gen.generateDOB(age),
        email: `${username}@${domain}`,
        phone: gen.generatePhone(),
        address: gen.generateAddress(city, country),
        country: country,
        city: city,
        bio: gen.generateBio(),
        skills: gen.getRandomSet(gen.skillsPool, 5, 8),
        interests: gen.getRandomSet(gen.interestsPool, 3, 5),
        personality_traits: gen.getRandomSet(gen.traitsPool, 3, 4),
        languages: gen.getRandomSet(gen.languagesPool, 1, 3),
        hobbies: gen.getRandomSet(gen.hobbyPool, 2, 4),
        trust_score: gen.getRandomInt(65, 99),
        
        // --- NEW FULL PROFILE DATA ---
        medical: gen.generateMedicalProfile(),
        financial: gen.generateFinancialProfile(),
        psychological: gen.generatePsychProfile(),
        citizenship: gen.generateCitizenshipProfile(),
        equipment: gen.generateEquipmentProfile(),

        social_links: {
            instagram: `https://insta-mesh.com/${username}`,
            twitter: `https://vortex.io/${username}`,
            github: `https://git-core.dev/${username}`,
            linked_in: `https://neural-net.com/in/${username}`
        },
        avatar_url: `https://robohash.org/${profileId}?set=set${gen.getRandomInt(1, 4)}&bgset=bg${gen.getRandomInt(1, 2)}`,
        experience: gen.generateExperience(),
        education: gen.generateEducation(),
        created_at: new Date().toISOString()
    };
};

/**
 * Generates bulk profiles
 * @param {number} count - Number of profiles to generate (1-1000)
 */
export const generateBulkProfiles = (count = 1) => {
    const safeCount = Math.min(Math.max(1, count), 1000);
    const profiles = [];
    for (let i = 0; i < safeCount; i++) {
        profiles.push(createProfile());
    }
    return profiles;
};
