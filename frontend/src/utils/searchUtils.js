/**
 * Search utilities for building search functionality
 * Updated to work with new building ID system
 */

import { getAllBuildingData } from './buildingMapper';

// Common building abbreviations and aliases for better search
const buildingAliases = {
  'grainger': 'Grainger Engineering Library',
  'siebel': 'Siebel Center for Computer Science',
  'ece': 'Electrical & Computer Engineering Building',
  'cs': 'Siebel Center for Computer Science',
  'computer science': 'Siebel Center for Computer Science',
  'engineering': 'Electrical & Computer Engineering Building',
  'library': 'Grainger Engineering Library',
  'union': 'Illini Union',
  'krannert': 'Krannert Center for Performing Arts',
  'museum': 'Krannert Art Museum',
  'spurlock': 'Spurlock Museum',
  'armory': 'Armory',
  'davenport': 'Davenport Hall',
  'lincoln': 'Lincoln Hall',
  'gregory': 'Gregory Hall',
  'altgeld': 'Altgeld Hall',
  'noyes': 'Noyes Laboratory',
  'chemistry': 'Chemistry Annex',
  'materials': 'Materials Science & Engineering Building',
  'mechanical': 'Mechanical Engineering Laboratory',
  'civil': 'Civil & Environmental Engineering Building',
  'architecture': 'Architecture Building',
  'education': 'Education Building',
  'kinley': 'David Kinley Hall',
  'henry': 'Henry Administration Building',
  'wohlers': 'Wohlers Hall',
  'smith': 'Smith Memorial Hall',
  'music': 'Music Building',
  'recreation': 'Campus Recreation Center East',
  'cif': 'Campus Instructional Facility',
  'bif': 'Business Instructional Facility',
  'agricultural': 'Agricultural Engineering Sciences Building',
  'animal': 'Animal Sciences Laboratory',
  'bevier': 'Bevier Hall',
  'burrill': 'Burrill Hall',
  'mumford': 'Mumford Hall',
  'plant': 'Plant Sciences Laboratory',
  'veterinary': 'Veterinary Teaching Hospital',
  'talbot': 'Talbot Laboratory',
  'newmark': 'Newmark Civil Engineering Building',
  'roger adams': 'Roger Adams Laboratory',
  'nuclear': 'Nuclear Radiations Laboratory',
  'ceramics': 'Ceramics Building',
  'astronomy': 'Astronomy Building',
  'flagg': 'Flagg Hall',
  'freer': 'Freer Hall',
  'harding': 'Harding Band Building',
  'speech': 'Speech & Hearing Science Building',
  'medical': 'Medical Sciences Building',
  'early childhood': 'Early Childhood Development Laboratory',
  'graduate school': 'Graduate School of Library & Information Science',
  'government': 'Institute of Government & Public Affairs Building',
  'labor': 'Institute of Labor & Industrial Relations',
  'literatures': 'Literatures, Cultures, & Linguistics',
  'loomis': 'Loomis Laboratory',
  'stock': 'Stock Pavilion',
  'weston': 'Weston Hall',
  'wymer': 'Wymer Hall',
  'noble': 'Noble Hall',
  'christopher': 'Christopher Hall',
  'allen': 'Allen Residence Hall',
  'illinois street': 'Illinois Street Residence Long',
  'lincoln avenue': 'Lincoln Avenue Residence Hall',
  'campbell': 'Campbell Hall',
  'dance': 'Dance Studio',
  'fab lab': 'FAB LAB Art-East Annex Studio',
  'arr': 'ARR Art-East Annex Studio',
  'everitt': 'Everitt Laboratory',
  'beckman': 'Beckman Institute',
  'richmond': 'Richmond Studio',
  'coordinated': 'Coordinated Science Laboratory',
  'digital': 'Digital Computer Laboratory',
  'psychology': 'Psychology Building',
  'ice': 'Ice Arena',
  'business': 'Business Instructional Facility',
  'huff': 'Huff Hall',
  'design': 'Siebel Center for Design',
  'art': 'Art and Design Building',
  'english': 'English Building',
  'natural history': 'Natural History Building',
  'transportation': 'Transportation Building',
  'temple': 'Temple Hoyne Buell Hall',
  'david': 'David Kinley Hall',
  'student': 'Student Dining & Residential Program',
  'campus': 'Campus Instructional Facility',
  'meat': 'Meat Science Laboratory',
  'soybean': 'National Soybean Research Center',
  'sidney': 'Sidney Lu Mechanical Engineering Building',
  'roger': 'Roger Adams Laboratory',
  'early': 'Early Childhood Development Laboratory',
  'graduate': 'Graduate School of Library & Information Science',
  'institute': 'Institute of Government & Public Affairs Building',
  'illinois': 'Illinois Street Residence Long',
  'fab': 'FAB LAB Art-East Annex Studio'
};

/**
 * Calculate similarity score between two strings using Levenshtein distance
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} Similarity score (0-1, higher is more similar)
 */
function calculateSimilarity(str1, str2) {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
}

/**
 * Calculate Levenshtein distance between two strings
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} Levenshtein distance
 */
function levenshteinDistance(str1, str2) {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

/**
 * Search buildings based on query with fuzzy matching
 * Updated to work with new building ID system
 * @param {string} query - Search query
 * @param {number} maxResults - Maximum number of results to return
 * @returns {Array} Array of search results with building info
 */
export function searchBuildings(query, maxResults = 10) {
  if (!query || query.trim().length < 2) {
    return [];
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  const results = [];
  const buildingData = getAllBuildingData();
  
  // Use a Set to track unique building names and avoid duplicates
  const seenBuildings = new Set();
  
  // Check aliases first for exact matches
  if (buildingAliases[normalizedQuery]) {
    const aliasMatch = buildingAliases[normalizedQuery];
    if (!seenBuildings.has(aliasMatch)) {
      // Find the building data for this alias
      const building = buildingData.find(b => b.displayName === aliasMatch);
      if (building) {
        results.push({
          name: building.displayName,
          id: building.id,
          score: 1.0,
          highlight: normalizedQuery
        });
        seenBuildings.add(building.displayName);
      }
    }
  }
  
  // Search through building data
  for (const building of buildingData) {
    // Skip if we've already seen this building
    if (seenBuildings.has(building.displayName)) {
      continue;
    }
    
    const normalizedName = building.displayName.toLowerCase();
    const normalizedFullName = building.fullName.toLowerCase();
    
    // Exact match on display name
    if (normalizedName === normalizedQuery) {
      results.push({
        name: building.displayName,
        id: building.id,
        score: 1.0,
        highlight: normalizedQuery
      });
      seenBuildings.add(building.displayName);
      continue;
    }
    
    // Exact match on full name
    if (normalizedFullName === normalizedQuery) {
      results.push({
        name: building.displayName,
        id: building.id,
        score: 1.0,
        highlight: normalizedQuery
      });
      seenBuildings.add(building.displayName);
      continue;
    }
    
    // Starts with query
    if (normalizedName.startsWith(normalizedQuery) || normalizedFullName.startsWith(normalizedQuery)) {
      results.push({
        name: building.displayName,
        id: building.id,
        score: 0.9,
        highlight: normalizedQuery
      });
      seenBuildings.add(building.displayName);
      continue;
    }
    
    // Contains query
    if (normalizedName.includes(normalizedQuery) || normalizedFullName.includes(normalizedQuery)) {
      results.push({
        name: building.displayName,
        id: building.id,
        score: 0.7,
        highlight: normalizedQuery
      });
      seenBuildings.add(building.displayName);
      continue;
    }
    
    // Fuzzy match for typos
    const similarity = Math.max(
      calculateSimilarity(normalizedQuery, normalizedName),
      calculateSimilarity(normalizedQuery, normalizedFullName)
    );
    if (similarity > 0.6) {
      results.push({
        name: building.displayName,
        id: building.id,
        score: similarity * 0.5,
        highlight: normalizedQuery
      });
      seenBuildings.add(building.displayName);
    }
  }
  
  // Sort by score (highest first) and limit results
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}

/**
 * Highlight matching text in building names
 * @param {string} buildingName - Full building name
 * @param {string} query - Search query
 * @returns {string} HTML string with highlighted text
 */
export function highlightMatch(buildingName, query) {
  if (!query || !buildingName) return buildingName;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return buildingName.replace(regex, '<mark class="bg-uiuc-orange/20 text-uiuc-blue font-semibold px-1 rounded">$1</mark>');
}

/**
 * Debounce function to limit search frequency
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
