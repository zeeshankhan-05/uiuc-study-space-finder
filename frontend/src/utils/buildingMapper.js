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
  
  // Find the reverse mapping
  for (const [path, name] of Object.entries(buildingPathToName)) {
    if (name === buildingName) {
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

