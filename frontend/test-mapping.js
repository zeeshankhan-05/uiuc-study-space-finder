// Test script to verify building mapping logic
import { getDatabaseBuildingName, getCleanBuildingNameForAPI } from './src/utils/buildingMapper.js';

// Test cases
const testBuildings = [
  'Noyes Laboratory',
  'Campbell Hall',
  'Siebel Center for Computer Science',
  'Electrical & Computer Engineering Building'
];

console.log('Testing building mapping logic:');
console.log('================================');

testBuildings.forEach(building => {
  const databaseName = getDatabaseBuildingName(building);
  const cleanName = getCleanBuildingNameForAPI(building);
  
  console.log(`\nFrontend: "${building}"`);
  console.log(`Database: "${databaseName}"`);
  console.log(`Clean API: "${cleanName}"`);
});
