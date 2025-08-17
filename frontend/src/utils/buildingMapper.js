/**
 * Comprehensive building mapping system for UIUC Study Space Finder
 * Handles building ID generation, name standardization, and routing
 */

// Comprehensive building data with standardized names and IDs
const buildingData = {
  // Main Campus Buildings
  'beckman-institute': {
    id: 'beckman-institute',
    fullName: 'Beckman Institute',
    displayName: 'Beckman Institute',
    path: '/beckman-institute/'
  },
  'richmond-studio': {
    id: 'richmond-studio',
    fullName: 'Richmond Studio',
    displayName: 'Richmond Studio',
    path: '/richmond-studio/'
  },
  'siebel-center-computer-science': {
    id: 'siebel-center-computer-science',
    fullName: 'Siebel Center for Computer Science',
    displayName: 'Siebel Center for Computer Science',
    path: '/siebel-center-computer-science/'
  },
  'coordinated-science-laboratory': {
    id: 'coordinated-science-laboratory',
    fullName: 'Coordinated Science Laboratory',
    displayName: 'Coordinated Science Laboratory',
    path: '/coordinated-science-lab/'
  },
  'digital-computer-laboratory': {
    id: 'digital-computer-laboratory',
    fullName: 'Digital Computer Laboratory',
    displayName: 'Digital Computer Laboratory',
    path: '/digital-computer-lab/'
  },
  'electrical-computer-engineering-building': {
    id: 'electrical-computer-engineering-building',
    fullName: 'Electrical & Computer Engineering Building',
    displayName: 'Electrical & Computer Engineering Building',
    path: '/electrical-computer-engineering-building/'
  },
  'psychology-building': {
    id: 'psychology-building',
    fullName: 'Psychology Building',
    displayName: 'Psychology Building',
    path: '/psychology-building/'
  },
  'ice-arena': {
    id: 'ice-arena',
    fullName: 'Ice Arena',
    displayName: 'Ice Arena',
    path: '/ice-arena/'
  },
  'armory': {
    id: 'armory',
    fullName: 'Armory',
    displayName: 'Armory',
    path: '/armory/'
  },
  'grainger-engineering-library': {
    id: 'grainger-engineering-library',
    fullName: 'Grainger Engineering Library',
    displayName: 'Grainger Engineering Library',
    path: '/library/'
  },
  'business-instructional-facility': {
    id: 'business-instructional-facility',
    fullName: 'Business Instructional Facility',
    displayName: 'Business Instructional Facility',
    path: '/gies-college-business-instructional-facility/'
  },
  'huff-hall': {
    id: 'huff-hall',
    fullName: 'Huff Hall',
    displayName: 'Huff Hall',
    path: '/huff-hall/'
  },
  'siebel-center-design': {
    id: 'siebel-center-design',
    fullName: 'Siebel Center for Design',
    displayName: 'Siebel Center for Design',
    path: '/siebel-center-design/'
  },
  'art-design-building': {
    id: 'art-design-building',
    fullName: 'Art and Design Building',
    displayName: 'Art and Design Building',
    path: '/art-design-building'
  },
  'davenport-hall': {
    id: 'davenport-hall',
    fullName: 'Davenport Hall',
    displayName: 'Davenport Hall',
    path: '/davenport-hall/'
  },
  'lincoln-hall': {
    id: 'lincoln-hall',
    fullName: 'Lincoln Hall',
    displayName: 'Lincoln Hall',
    path: '/lincoln-hall/'
  },
  'gregory-hall': {
    id: 'gregory-hall',
    fullName: 'Gregory Hall',
    displayName: 'Gregory Hall',
    path: '/gregory-hall/'
  },
  'english-building': {
    id: 'english-building',
    fullName: 'English Building',
    displayName: 'English Building',
    path: '/english-building/'
  },
  'altgeld-hall': {
    id: 'altgeld-hall',
    fullName: 'Altgeld Hall',
    displayName: 'Altgeld Hall',
    path: '/altgeld-hall/'
  },
  'natural-history-building': {
    id: 'natural-history-building',
    fullName: 'Natural History Building',
    displayName: 'Natural History Building',
    path: '/natural-history-building/'
  },
  'noyes-laboratory': {
    id: 'noyes-laboratory',
    fullName: 'Noyes Laboratory',
    displayName: 'Noyes Laboratory',
    path: '/noyes-laboratory/'
  },
  'chemistry-annex': {
    id: 'chemistry-annex',
    fullName: 'Chemistry Annex',
    displayName: 'Chemistry Annex',
    path: '/chemistry-annex/'
  },
  'materials-science-engineering-building': {
    id: 'materials-science-engineering-building',
    fullName: 'Materials Science & Engineering Building',
    displayName: 'Materials Science & Engineering Building',
    path: '/materials-science-engineering-building/'
  },
  'mechanical-engineering-laboratory': {
    id: 'mechanical-engineering-laboratory',
    fullName: 'Mechanical Engineering Laboratory',
    displayName: 'Mechanical Engineering Laboratory',
    path: '/mechanical-engineering-laboratory/'
  },
  'civil-environmental-engineering-building': {
    id: 'civil-environmental-engineering-building',
    fullName: 'Civil & Environmental Engineering Building',
    displayName: 'Civil & Environmental Engineering Building',
    path: '/civil-environmental-engineering-building/'
  },
  'transportation-building': {
    id: 'transportation-building',
    fullName: 'Transportation Building',
    displayName: 'Transportation Building',
    path: '/transportation-building/'
  },
  'architecture-building': {
    id: 'architecture-building',
    fullName: 'Architecture Building',
    displayName: 'Architecture Building',
    path: '/architecture-building/'
  },
  'temple-hoyne-buell-hall': {
    id: 'temple-hoyne-buell-hall',
    fullName: 'Temple Hoyne Buell Hall',
    displayName: 'Temple Hoyne Buell Hall',
    path: '/temple-hoyne-buell-hall/'
  },
  'education-building': {
    id: 'education-building',
    fullName: 'Education Building',
    displayName: 'Education Building',
    path: '/education-building/'
  },
  'david-kinley-hall': {
    id: 'david-kinley-hall',
    fullName: 'David Kinley Hall',
    displayName: 'David Kinley Hall',
    path: '/david-kinley-hall/'
  },
  'henry-administration-building': {
    id: 'henry-administration-building',
    fullName: 'Henry Administration Building',
    displayName: 'Henry Administration Building',
    path: '/henry-administration-building/'
  },
  'wohlers-hall': {
    id: 'wohlers-hall',
    fullName: 'Wohlers Hall',
    displayName: 'Wohlers Hall',
    path: '/wohlers-hall/'
  },
  'smith-memorial-hall': {
    id: 'smith-memorial-hall',
    fullName: 'Smith Memorial Hall',
    displayName: 'Smith Memorial Hall',
    path: '/smith-memorial-hall/'
  },
  'music-building': {
    id: 'music-building',
    fullName: 'Music Building',
    displayName: 'Music Building',
    path: '/music-building/'
  },
  'krannert-center-performing-arts': {
    id: 'krannert-center-performing-arts',
    fullName: 'Krannert Center for Performing Arts',
    displayName: 'Krannert Center for Performing Arts',
    path: '/krannert-center-performing-arts/'
  },
  'krannert-art-museum': {
    id: 'krannert-art-museum',
    fullName: 'Krannert Art Museum',
    displayName: 'Krannert Art Museum',
    path: '/krannert-art-museum/'
  },
  'spurlock-museum': {
    id: 'spurlock-museum',
    fullName: 'Spurlock Museum',
    displayName: 'Spurlock Museum',
    path: '/spurlock-museum/'
  },
  'illini-union': {
    id: 'illini-union',
    fullName: 'Illini Union',
    displayName: 'Illini Union',
    path: '/illini-union/'
  },
  'student-dining-residential-program': {
    id: 'student-dining-residential-program',
    fullName: 'Student Dining & Residential Program',
    displayName: 'Student Dining & Residential Program',
    path: '/student-dining-residential-program/'
  },
  'campus-recreation-center-east': {
    id: 'campus-recreation-center-east',
    fullName: 'Campus Recreation Center East',
    displayName: 'Campus Recreation Center East',
    path: '/campus-recreation-center-east/'
  },
  'campus-instructional-facility': {
    id: 'campus-instructional-facility',
    fullName: 'Campus Instructional Facility',
    displayName: 'Campus Instructional Facility',
    path: '/campus-instructional-facility/'
  },
  'agricultural-engineering-sciences-building': {
    id: 'agricultural-engineering-sciences-building',
    fullName: 'Agricultural Engineering Sciences Building',
    displayName: 'Agricultural Engineering Sciences Building',
    path: '/agricultural-engineering-sciences-building/'
  },
  'animal-sciences-laboratory': {
    id: 'animal-sciences-laboratory',
    fullName: 'Animal Sciences Laboratory',
    displayName: 'Animal Sciences Laboratory',
    path: '/animal-sciences-laboratory/'
  },
  'bevier-hall': {
    id: 'bevier-hall',
    fullName: 'Bevier Hall',
    displayName: 'Bevier Hall',
    path: '/bevier-hall/'
  },
  'burrill-hall': {
    id: 'burrill-hall',
    fullName: 'Burrill Hall',
    displayName: 'Burrill Hall',
    path: '/burrill-hall/'
  },
  'mumford-hall': {
    id: 'mumford-hall',
    fullName: 'Mumford Hall',
    displayName: 'Mumford Hall',
    path: '/mumford-hall/'
  },
  'plant-sciences-laboratory': {
    id: 'plant-sciences-laboratory',
    fullName: 'Plant Sciences Laboratory',
    displayName: 'Plant Sciences Laboratory',
    path: '/plant-sciences-laboratory/'
  },
  'meat-science-laboratory': {
    id: 'meat-science-laboratory',
    fullName: 'Meat Science Laboratory',
    displayName: 'Meat Science Laboratory',
    path: '/meat-science-laboratory/'
  },
  'national-soybean-research-center': {
    id: 'national-soybean-research-center',
    fullName: 'National Soybean Research Center',
    displayName: 'National Soybean Research Center',
    path: '/national-soybean-research-center/'
  },
  'veterinary-teaching-hospital': {
    id: 'veterinary-teaching-hospital',
    fullName: 'Veterinary Teaching Hospital',
    displayName: 'Veterinary Teaching Hospital',
    path: '/veterinary-teaching-hospital/'
  },
  'veterinary-medicine-basic-sciences-building': {
    id: 'veterinary-medicine-basic-sciences-building',
    fullName: 'Veterinary Medicine Basic Sciences Building',
    displayName: 'Veterinary Medicine Basic Sciences Building',
    path: '/veterinary-medicine-basic-sciences-building/'
  },
  'talbot-laboratory': {
    id: 'talbot-laboratory',
    fullName: 'Talbot Laboratory',
    displayName: 'Talbot Laboratory',
    path: '/talbot-laboratory/'
  },
  'newmark-civil-engineering-building': {
    id: 'newmark-civil-engineering-building',
    fullName: 'Newmark Civil Engineering Building',
    displayName: 'Newmark Civil Engineering Building',
    path: '/newmark-civil-engineering-building/'
  },
  'sidney-lu-mechanical-engineering-building': {
    id: 'sidney-lu-mechanical-engineering-building',
    fullName: 'Sidney Lu Mechanical Engineering Building',
    displayName: 'Sidney Lu Mechanical Engineering Building',
    path: '/sidney-lu-mechanical-engineering-building/'
  },
  'roger-adams-laboratory': {
    id: 'roger-adams-laboratory',
    fullName: 'Roger Adams Laboratory',
    displayName: 'Roger Adams Laboratory',
    path: '/roger-adams-laboratory/'
  },
  'nuclear-radiations-laboratory': {
    id: 'nuclear-radiations-laboratory',
    fullName: 'Nuclear Radiations Laboratory',
    displayName: 'Nuclear Radiations Laboratory',
    path: '/nuclear-radiations-laboratory/'
  },
  'ceramics-building': {
    id: 'ceramics-building',
    fullName: 'Ceramics Building',
    displayName: 'Ceramics Building',
    path: '/ceramics-building/'
  },
  'ceramics-kiln-house': {
    id: 'ceramics-kiln-house',
    fullName: 'Ceramics Kiln House',
    displayName: 'Ceramics Kiln House',
    path: '/ceramics-kiln-house/'
  },
  'astronomy-building': {
    id: 'astronomy-building',
    fullName: 'Astronomy Building',
    displayName: 'Astronomy Building',
    path: '/astronomy-building/'
  },
  'flagg-hall': {
    id: 'flagg-hall',
    fullName: 'Flagg Hall',
    displayName: 'Flagg Hall',
    path: '/flagg-hall/'
  },
  'freer-hall': {
    id: 'freer-hall',
    fullName: 'Freer Hall',
    displayName: 'Freer Hall',
    path: '/freer-hall/'
  },
  'harding-band-building': {
    id: 'harding-band-building',
    fullName: 'Harding Band Building',
    displayName: 'Harding Band Building',
    path: '/harding-band-building/'
  },
  'speech-hearing-science-building': {
    id: 'speech-hearing-science-building',
    fullName: 'Speech & Hearing Science Building',
    displayName: 'Speech & Hearing Science Building',
    path: '/speech-hearing-science-building/'
  },
  'medical-sciences-building': {
    id: 'medical-sciences-building',
    fullName: 'Medical Sciences Building',
    displayName: 'Medical Sciences Building',
    path: '/medical-sciences-building/'
  },
  'early-childhood-development-laboratory': {
    id: 'early-childhood-development-laboratory',
    fullName: 'Early Childhood Development Laboratory',
    displayName: 'Early Childhood Development Laboratory',
    path: '/early-childhood-development-laboratory/'
  },
  'graduate-school-library-information-science': {
    id: 'graduate-school-library-information-science',
    fullName: 'Graduate School of Library & Information Science',
    displayName: 'Graduate School of Library & Information Science',
    path: '/graduate-school-library-information-science/'
  },
  'institute-government-public-affairs-building': {
    id: 'institute-government-public-affairs-building',
    fullName: 'Institute of Government & Public Affairs Building',
    displayName: 'Institute of Government & Public Affairs Building',
    path: '/institute-government-public-affairs-building/'
  },
  'institute-labor-industrial-relations': {
    id: 'institute-labor-industrial-relations',
    fullName: 'Institute of Labor & Industrial Relations',
    displayName: 'Institute of Labor & Industrial Relations',
    path: '/institute-labor-industrial-relations/'
  },
  'literatures-cultures-linguistics': {
    id: 'literatures-cultures-linguistics',
    fullName: 'Literatures, Cultures, & Linguistics',
    displayName: 'Literatures, Cultures, & Linguistics',
    path: '/literatures-cultures-linguistics/'
  },
  'loomis-laboratory': {
    id: 'loomis-laboratory',
    fullName: 'Loomis Laboratory',
    displayName: 'Loomis Laboratory',
    path: '/loomis-laboratory/'
  },
  'stock-pavilion': {
    id: 'stock-pavilion',
    fullName: 'Stock Pavilion',
    displayName: 'Stock Pavilion',
    path: '/stock-pavilion/'
  },
  'weston-hall': {
    id: 'weston-hall',
    fullName: 'Weston Hall',
    displayName: 'Weston Hall',
    path: '/weston-hall/'
  },
  'wymer-hall': {
    id: 'wymer-hall',
    fullName: 'Wymer Hall',
    displayName: 'Wymer Hall',
    path: '/wymer-hall/'
  },
  'noble-hall': {
    id: 'noble-hall',
    fullName: 'Noble Hall',
    displayName: 'Noble Hall',
    path: '/noble-hall/'
  },
  'christopher-hall': {
    id: 'christopher-hall',
    fullName: 'Christopher Hall',
    displayName: 'Christopher Hall',
    path: '/christopher-hall/'
  },
  'allen-residence-hall': {
    id: 'allen-residence-hall',
    fullName: 'Allen Residence Hall',
    displayName: 'Allen Residence Hall',
    path: '/allen-residence-hall/'
  },
  'illinois-street-residence-long': {
    id: 'illinois-street-residence-long',
    fullName: 'Illinois Street Residence Long',
    displayName: 'Illinois Street Residence Long',
    path: '/illinois-street-residence-long/'
  },
  'lincoln-avenue-residence-hall': {
    id: 'lincoln-avenue-residence-hall',
    fullName: 'Lincoln Avenue Residence Hall',
    displayName: 'Lincoln Avenue Residence Hall',
    path: '/lincoln-avenue-residence-hall/'
  },
  'campbell-hall': {
    id: 'campbell-hall',
    fullName: 'Campbell Hall',
    displayName: 'Campbell Hall',
    path: '/campbell-hall/'
  },
  'dance-studio': {
    id: 'dance-studio',
    fullName: 'Dance Studio',
    displayName: 'Dance Studio',
    path: '/dance-studio/'
  },
  'fab-lab-art-east-annex-studio': {
    id: 'fab-lab-art-east-annex-studio',
    fullName: 'FAB LAB Art-East Annex Studio',
    displayName: 'FAB LAB Art-East Annex Studio',
    path: '/fab-lab-art-east-annex-studio/'
  },
  'arr-art-east-annex-studio': {
    id: 'arr-art-east-annex-studio',
    fullName: 'ARR Art-East Annex Studio',
    displayName: 'ARR Art-East Annex Studio',
    path: '/arr-art-east-annex-studio/'
  },
  'everitt-laboratory': {
    id: 'everitt-laboratory',
    fullName: 'Everitt Laboratory',
    displayName: 'Everitt Laboratory',
    path: '/everitt-laboratory/'
  }
};

// Building name standardization mapping
const buildingNameStandardization = {
  // Common abbreviations to full names
  'Admin': 'Administration Building',
  'Eng': 'Engineering',
  'Lab': 'Laboratory',
  'Lib': 'Library',
  'Ctr': 'Center',
  'Bldg': 'Building',
  'Fac': 'Facility',
  'Inst': 'Institute',
  'Res': 'Residence',
  'Sci': 'Science',
  'Tech': 'Technology',
  'Univ': 'University',
  'Col': 'College',
  'Sch': 'School',
  'Dept': 'Department',
  'Div': 'Division',
  'Prog': 'Program'
};

/**
 * Generate a clean, URL-friendly building ID from a building name
 * @param {string} buildingName - The building name to convert
 * @returns {string} The URL-friendly building ID
 */
export const generateBuildingId = (buildingName) => {
  if (!buildingName) return '';
  
  return buildingName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, '-')        // Replace spaces with hyphens
    .trim();
};

/**
 * Standardize a building name by expanding abbreviations
 * @param {string} buildingName - The building name to standardize
 * @returns {string} The standardized building name
 */
export const standardizeBuildingName = (buildingName) => {
  if (!buildingName) return buildingName;
  
  let standardized = buildingName;
  
  // Apply standardization rules
  Object.entries(buildingNameStandardization).forEach(([abbreviation, fullName]) => {
    const regex = new RegExp(`\\b${abbreviation}\\b`, 'gi');
    standardized = standardized.replace(regex, fullName);
  });
  
  return standardized;
};

/**
 * Get building data by ID
 * @param {string} buildingId - The building ID
 * @returns {Object|null} Building data object or null if not found
 */
export const getBuildingById = (buildingId) => {
  return buildingData[buildingId] || null;
};

/**
 * Get building data by path (for backward compatibility)
 * @param {string} buildingPath - The building path from SVG
 * @returns {Object|null} Building data object or null if not found
 */
export const getBuildingByPath = (buildingPath) => {
  if (!buildingPath) return null;
  
  // Find building by path
  for (const [_id, building] of Object.entries(buildingData)) {
    if (building.path === buildingPath) {
      return building;
    }
  }
  
  return null;
};

/**
 * Get building data by full name
 * @param {string} buildingName - The building name
 * @returns {Object|null} Building data object or null if not found
 */
export const getBuildingByName = (buildingName) => {
  if (!buildingName) return null;
  
  // First try exact match
  for (const [_id, building] of Object.entries(buildingData)) {
    if (building.fullName === buildingName || building.displayName === buildingName) {
      return building;
    }
  }
  
  // Try with standardized name
  const standardizedName = standardizeBuildingName(buildingName);
  for (const [_id, building] of Object.entries(buildingData)) {
    if (building.fullName === standardizedName || building.displayName === standardizedName) {
      return building;
    }
  }
  
  return null;
};

/**
 * Get all available building names
 * @returns {Array<string>} Array of building display names
 */
export const getAvailableBuildingNames = () => {
  return Object.values(buildingData).map(building => building.displayName);
};

/**
 * Get all available building IDs
 * @returns {Array<string>} Array of building IDs
 */
export const getAvailableBuildingIds = () => {
  return Object.keys(buildingData);
};

/**
 * Get all building data
 * @returns {Array<Object>} Array of building data objects
 */
export const getAllBuildingData = () => {
  return Object.values(buildingData);
};

/**
 * Clean a building name by removing duplicates and normalizing it
 * @param {string} buildingName - The building name from JSON data
 * @returns {string} The cleaned building name
 */
export const cleanBuildingName = (buildingName) => {
  if (!buildingName) return buildingName;
  
  // Remove common duplicate patterns
  const duplicatePatterns = [
    /^(.+?)\s+\d+\s+\1$/, // "Building 123 Building"
    /^(.+?)\s+\d+\s+\1\s+\d+\s+\1$/, // "Building 123 Building 123 Building"
    /^(.+?)\s+\d+\s+\1\s+\d+\s+\1\s+\d+\s+\1$/ // "Building 123 Building 123 Building 123 Building"
  ];
  
  for (const pattern of duplicatePatterns) {
    const match = buildingName.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return buildingName;
};

/**
 * Convert a building name from API to the corresponding building ID for navigation
 * @param {string} buildingName - The building name from API
 * @returns {string|null} The building ID for navigation or null if not found
 */
export const getBuildingIdForNavigation = (buildingName) => {
  if (!buildingName) return null;
  
  // Clean the building name first
  const cleanedName = cleanBuildingName(buildingName);
  
  // Try to find by name
  const building = getBuildingByName(cleanedName);
  if (building) {
    return building.id;
  }
  
  // Try with standardized name
  const standardizedName = standardizeBuildingName(cleanedName);
  const standardizedBuilding = getBuildingByName(standardizedName);
  if (standardizedBuilding) {
    return standardizedBuilding.id;
  }
  
  return null;
};

/**
 * Get the clean building name for API calls, handling duplicates
 * @param {string} buildingName - The building name from JSON data
 * @returns {string} The clean building name for API calls
 */
export const getCleanBuildingNameForAPI = (buildingName) => {
  return cleanBuildingName(buildingName);
};

