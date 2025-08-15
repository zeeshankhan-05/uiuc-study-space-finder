/**
 * Utility to map building paths from SVG to building names from API
 */

// Mapping from SVG paths to API building names
const buildingPathToName = {
  "/beckman-institute/": "Beckman Institute",
  "/richmond-studio/": "Richmond Studio",
  "/siebel-center-computer-science/": "Siebel Center for Comp Sci",
  "/coordinated-science-lab/": "Coordinated Science Lab",
  "/digital-computer-lab/": "Digital Computer Laboratory",
  "/electrical-computer-engineering-building/": "Electrical & Computer Eng Bldg",
  "/psychology-building/": "Psychology Building",
  "/ice-arena/": "Ice Arena",
  "/armory/": "Armory",
  "/library/": "Library",
  "/gies-college-business-instructional-facility/": "Business Instructional Fac",
  "/huff-hall/": "Huff Hall",
  "/siebel-center-design/": "Siebel Center for Design",
  "/art-design-building": "Art and Design Building",
  "/davenport-hall/": "Davenport Hall",
  "/lincoln-hall/": "Lincoln Hall",
  "/gregory-hall/": "Gregory Hall",
  "/english-building/": "English Building",
  "/altgeld-hall/": "Altgeld Hall",
  "/natural-history-building/": "Natural History Building",
  "/noyes-laboratory/": "Noyes Laboratory",
  "/chemistry-annex/": "Chemistry Annex",
  "/materials-science-engineering-building/": "Materials Science & Eng Bld",
  "/mechanical-engineering-laboratory/": "Mechanical Engineering Lab",
  "/civil-environmental-engineering-building/": "Civil & Envir Eng Bldg",
  "/transportation-building/": "Transportation Building",
  "/architecture-building/": "Architecture Building",
  "/temple-hoyne-buell-hall/": "Temple Hoyne Buell Hall",
  "/education-building/": "Education Building",
  "/david-kinley-hall/": "David Kinley Hall",
  "/henry-administration-building/": "Henry Administration Bldg",
  "/wohlers-hall/": "Wohlers Hall",
  "/smith-memorial-hall/": "Smith Memorial Hall",
  "/music-building/": "Music Building",
  "/krannert-center-performing-arts/": "Krannert Center for Perf Arts",
  "/krannert-art-museum/": "Krannert Art Museum",
  "/spurlock-museum/": "Spurlock Museum",
  "/illini-union/": "Illini Union",
  "/student-dining-residential-program/": "Student Dining & Res Program",
  "/campus-recreation-center-east/": "Campus Recreation Center East",
  "/campus-instructional-facility/": "Campus Instructional Facility",
  "/business-instructional-facility/": "Business Instructional Fac",
  "/agricultural-engineering-sciences-building/": "Agricultural Engr Sciences Bld",
  "/animal-sciences-laboratory/": "Animal Sciences Laboratory",
  "/bevier-hall/": "Bevier Hall",
  "/burrill-hall/": "Burrill Hall",
  "/mumford-hall/": "Mumford Hall",
  "/plant-sciences-laboratory/": "Plant Sciences Laboratory",
  "/meat-science-laboratory/": "Meat Science Laboratory",
  "/national-soybean-research-center/": "National Soybean Res Ctr",
  "/veterinary-teaching-hospital/": "Veterinary Teaching Hospital",
  "/veterinary-medicine-basic-sciences-building/": "Vet Med Basic Sciences Bldg",
  "/talbot-laboratory/": "Talbot Laboratory",
  "/newmark-civil-engineering-building/": "Newmark Civil Engineering Bldg",
  "/sidney-lu-mechanical-engineering-building/": "Sidney Lu Mech Engr Bldg",
  "/roger-adams-laboratory/": "Roger Adams Laboratory",
  "/nuclear-radiations-laboratory/": "Nuclear Radiations Laboratory",
  "/ceramics-building/": "Ceramics Building",
  "/ceramics-kiln-house/": "Ceramics Kiln House",
  "/astronomy-building/": "Astronomy Building",
  "/flagg-hall/": "Flagg Hall",
  "/freer-hall/": "Freer Hall",
  "/harding-band-building/": "Harding Band Building",
  "/speech-hearing-science-building/": "Speech & Hearing Science Bldg",
  "/medical-sciences-building/": "Medical Sciences Building",
  "/early-childhood-development-laboratory/": "Early Child Development Lab",
  "/graduate-school-library-information-science/": "Grad Sch of Lib & Info Science",
  "/institute-government-public-affairs-building/": "Inst Gov & Public Affairs Bldg",
  "/institute-labor-industrial-relations/": "Inst Labor & Industrial Rel",
  "/literatures-cultures-linguistics/": "Literatures, Cultures, & Ling",
  "/loomis-laboratory/": "Loomis Laboratory",
  "/stock-pavilion/": "Stock Pavilion",
  "/weston-hall/": "Weston Hall",
  "/wymer-hall/": "Wymer Hall",
  "/noble-hall/": "Noble Hall",
  "/christopher-hall/": "Christopher Hall",
  "/allen-residence-hall/": "Allen Residence Hall",
  "/illinois-street-residence-long/": "Illinois Street Residence Lng",
  "/lincoln-avenue-residence-hall/": "Lincoln Avenue Residence Hall",
  "/campbell-hall/": "Campbell Hall",
  "/dance-studio/": "Dance Studio",
  "/fab-lab-art-east-annex-studio/": "FAB LAB Art-East Annex, Studio",
  "/arr-art-east-annex-studio/": "ARR Art-East Annex, Studio",
};

// Mapping from duplicate building names to their clean versions
const duplicateBuildingNameMap = {
  // Bevier Hall duplicates
  "Bevier Hall 103 Bevier Hall": "Bevier Hall",
  "Bevier Hall 166 Bevier Hall": "Bevier Hall", 
  "Bevier Hall 180 Bevier Hall": "Bevier Hall",
  "Bevier Hall 108 Bevier Hall": "Bevier Hall",
  
  // Noyes Laboratory duplicates
  "Noyes Laboratory 204 Noyes Laboratory": "Noyes Laboratory",
  "Noyes Laboratory 203 Noyes Laboratory": "Noyes Laboratory",
  "Noyes Laboratory 304 Noyes Laboratory": "Noyes Laboratory",
  "Noyes Laboratory 300 Noyes Laboratory": "Noyes Laboratory",
  "Noyes Laboratory 301 Noyes Laboratory": "Noyes Laboratory",
  "Noyes Laboratory 303 Noyes Laboratory": "Noyes Laboratory",
  "Noyes Laboratory 217 Noyes Laboratory": "Noyes Laboratory",
  
  // Campus Instructional Facility duplicates
  "Campus Instructional Facility 3025 Campus Instructional Facility": "Campus Instructional Facility",
  "Campus Instructional Facility 4029 Campus Instructional Facility": "Campus Instructional Facility",
  
  // Agricultural Engineering duplicates
  "Agricultural Engr Sciences Bld 208 Agricultural Engr Sciences Bld": "Agricultural Engr Sciences Bld",
  "Agricultural Engr Sciences Bld 272 Agricultural Engr Sciences Bld": "Agricultural Engr Sciences Bld",
  "Agricultural Engr Sciences Bld 242 Agricultural Engr Sciences Bld": "Agricultural Engr Sciences Bld",
  "Agricultural Engr Sciences Bld 248 Agricultural Engr Sciences Bld": "Agricultural Engr Sciences Bld",
  
  // Music Building duplicates
  "Music Building 0359 Music Building": "Music Building",
  "Music Building 0304 Music Building": "Music Building",
  "Music Building 3000 Music Building": "Music Building",
  "Music Building 4032 Music Building": "Music Building",
  "Music Building 4040 Music Building": "Music Building",
  "Music Building 4060 Music Building": "Music Building",
  "Music Building 3060 Music Building": "Music Building",
  "Music Building 4000 Music Building": "Music Building",
  
  // Smith Memorial Hall duplicates
  "Smith Memorial Hall 106 Smith Memorial Hall": "Smith Memorial Hall",
  "Smith Memorial Hall 112 Smith Memorial Hall": "Smith Memorial Hall",
  "Smith Memorial Hall 209 Smith Memorial Hall": "Smith Memorial Hall",
  "Smith Memorial Hall 205 Smith Memorial Hall": "Smith Memorial Hall",
  "Smith Memorial Hall 220 Smith Memorial Hall": "Smith Memorial Hall",
  "Smith Memorial Hall 201 Smith Memorial Hall": "Smith Memorial Hall",
  "Smith Memorial Hall 10 Smith Memorial Hall": "Smith Memorial Hall",
  "Smith Memorial Hall 203 Smith Memorial Hall": "Smith Memorial Hall",
  "Smith Memorial Hall 7 Smith Memorial Hall": "Smith Memorial Hall",
  "Smith Memorial Hall 102 Smith Memorial Hall": "Smith Memorial Hall",
  "Smith Memorial Hall 210 Smith Memorial Hall": "Smith Memorial Hall",
  "Smith Memorial Hall 200 Smith Memorial Hall": "Smith Memorial Hall",
  "Smith Memorial Hall 101 Smith Memorial Hall": "Smith Memorial Hall",
  
  // Other common duplicates
  "Armory 100 Armory 101 Armory": "Armory",
  "Armory 146 Armory": "Armory",
  "Davenport Hall 338 Davenport Hall": "Davenport Hall",
  "Christopher Hall 3 Christopher Hall": "Christopher Hall",
  "Gregory Hall 13 Gregory Hall": "Gregory Hall",
  "Burrill Hall 7 Burrill Hall": "Burrill Hall",
  "Transportation Building 207 Transportation Building": "Transportation Building",
  "Temple Hoyne Buell Hall 227 Temple Hoyne Buell Hall": "Temple Hoyne Buell Hall",
  "Krannert Center for Perf Arts 3605 Krannert Center for Perf Arts": "Krannert Center for Perf Arts",
  "Everitt Laboratory 3109 Everitt Laboratory": "Everitt Laboratory",
  "Roger Adams Laboratory 116 Roger Adams Laboratory": "Roger Adams Laboratory",
  "Sidney Lu Mech Engr Bldg 1043 Sidney Lu Mech Engr Bldg": "Sidney Lu Mech Engr Bldg",
  "David Kinley Hall 317 David Kinley Hall": "David Kinley Hall",
  "David Kinley Hall 119 David Kinley Hall": "David Kinley Hall",
  "Education Building 37 Education Building": "Education Building",
  "Education Building 17 Education Building n.a.": "Education Building",
  "Natural History Building 2090 Natural History Building": "Natural History Building",
  "Natural History Building 4016 Natural History Building": "Natural History Building",
  "Natural History Building 2083 Natural History Building": "Natural History Building",
  "Natural History Building 4074 Natural History Building": "Natural History Building",
  "Natural History Building 4072 Natural History Building": "Natural History Building",
  "Plant Sciences Laboratory 1103 Plant Sciences Laboratory": "Plant Sciences Laboratory",
  "Veterinary Teaching Hospital 217 Veterinary Teaching Hospital": "Veterinary Teaching Hospital",
  "Veterinary Teaching Hospital 100 Veterinary Teaching Hospital 100 Veterinary Teaching Hospital": "Veterinary Teaching Hospital",
  "Veterinary Teaching Hospital 100 Veterinary Teaching Hospital 100 Veterinary Teaching Hospital 100 Veterinary Teaching Hospital": "Veterinary Teaching Hospital",
  
  // Add more duplicates as needed...
};

/**
 * Clean a building name by removing duplicates and normalizing it
 * @param {string} buildingName - The building name from JSON data
 * @returns {string} The cleaned building name
 */
export const cleanBuildingName = (buildingName) => {
  if (!buildingName) return buildingName;
  
  // Check if this is a known duplicate
  if (duplicateBuildingNameMap[buildingName]) {
    return duplicateBuildingNameMap[buildingName];
  }
  
  // Generic duplicate detection for unknown cases
  const words = buildingName.split(' ');
  for (let i = 0; i < words.length; i++) {
    if (words[i].replace('-', '').match(/^\d+$/)) {
      // Found a number, check if the words after it duplicate the words before it
      const beforeNumber = words.slice(0, i).join(' ');
      const afterNumber = words.slice(i + 1).join(' ');
      
      if (beforeNumber && afterNumber.startsWith(beforeNumber)) {
        return beforeNumber;
      }
    }
  }
  
  return buildingName;
};

/**
 * Convert a building path from SVG to the corresponding building name from API
 * @param {string} buildingPath - The building path from SVG (e.g., "/beckman-institute/")
 * @returns {string} The building name for API calls (e.g., "Beckman Institute")
 */
export const mapBuildingPathToName = (buildingPath) => {
  if (!buildingPath) return null;
  
  // Normalize the path
  const normalizedPath = buildingPath.startsWith('/') ? buildingPath : `/${buildingPath}`;
  const normalizedPathWithSlash = normalizedPath.endsWith('/') ? normalizedPath : `${normalizedPath}/`;
  
  return buildingPathToName[normalizedPathWithSlash] || buildingPathToName[normalizedPath] || buildingPath;
};

/**
 * Convert a building name from API to the corresponding building path for SVG
 * @param {string} buildingName - The building name from API (e.g., "Beckman Institute")
 * @returns {string} The building path for SVG (e.g., "/beckman-institute/")
 */
export const mapBuildingNameToPath = (buildingName) => {
  if (!buildingName) return null;
  
  // Clean the building name first
  const cleanedName = cleanBuildingName(buildingName);
  
  // Find the reverse mapping
  for (const [path, name] of Object.entries(buildingPathToName)) {
    if (name === cleanedName) {
      return path;
    }
  }
  
  return null;
};

/**
 * Get all available building names from the mapping
 * @returns {Array<string>} Array of building names
 */
export const getAvailableBuildingNames = () => {
  return Object.values(buildingPathToName);
};

/**
 * Get the clean building name for API calls, handling duplicates
 * @param {string} buildingName - The building name from JSON data
 * @returns {string} The clean building name for API calls
 */
export const getCleanBuildingNameForAPI = (buildingName) => {
  return cleanBuildingName(buildingName);
};

