import React from 'react';

// Try to import the SVG as a React component
let CampusMapComponent = null;
let svgUrl = null;

try {
  // Method 1: Try ReactComponent import
  const svgModule = require('../assets/uiuc-campus-map.svg');
  if (svgModule.ReactComponent) {
    CampusMapComponent = svgModule.ReactComponent;
    console.log('ReactComponent import successful');
  } else if (svgModule.default) {
    CampusMapComponent = svgModule.default;
    console.log('Default import successful');
  }
} catch (error) {
  console.log('Import failed:', error);
}

export default function CampusMapViewer() {
  console.log('CampusMapViewer component rendered');
  console.log('CampusMapComponent:', CampusMapComponent);
  
  return (
    <div className="w-full max-w-5xl mx-auto mt-6">
      <div className="border-2 border-red-500 p-4 mb-4">
        <h3 className="text-lg font-bold text-red-500">Debug Info:</h3>
        <p>CampusMapComponent type: {typeof CampusMapComponent}</p>
        <p>CampusMapComponent: {CampusMapComponent ? 'Loaded' : 'Not loaded'}</p>
      </div>
      
      {CampusMapComponent ? (
        <div className="border-2 border-blue-500 p-4">
          <h3 className="text-lg font-bold text-blue-500">ReactComponent Test:</h3>
          <CampusMapComponent className="w-full h-auto border-2 border-blue-500" />
        </div>
      ) : (
        <div className="border-2 border-red-500 p-8 text-center">
          <h3 className="text-xl font-bold text-red-500">SVG Component Not Loaded</h3>
          <p className="text-gray-600">The CampusMap SVG component failed to load</p>
        </div>
      )}
      
      {/* Fallback: Try loading as regular image */}
      <div className="mt-4 border-2 border-green-500 p-4">
        <h3 className="text-lg font-bold text-green-500">Direct Path Image Test:</h3>
        <img 
          src="/src/assets/uiuc-campus-map.svg" 
          alt="Campus Map" 
          className="w-full h-auto border-2 border-green-500"
          onLoad={() => console.log('Direct path image loaded successfully')}
          onError={(e) => console.log('Direct path image failed to load:', e)}
        />
      </div>
      
      {/* Try with relative path */}
      <div className="mt-4 border-2 border-purple-500 p-4">
        <h3 className="text-lg font-bold text-purple-500">Relative Path Test:</h3>
        <img 
          src="../assets/uiuc-campus-map.svg" 
          alt="Campus Map" 
          className="w-full h-auto border-2 border-purple-500"
          onLoad={() => console.log('Relative path image loaded successfully')}
          onError={(e) => console.log('Relative path image failed to load:', e)}
        />
      </div>
      
      {/* Try with absolute path */}
      <div className="mt-4 border-2 border-orange-500 p-4">
        <h3 className="text-lg font-bold text-orange-500">Absolute Path Test:</h3>
        <img 
          src="http://localhost:3000/src/assets/uiuc-campus-map.svg" 
          alt="Campus Map" 
          className="w-full h-auto border-2 border-orange-500"
          onLoad={() => console.log('Absolute path image loaded successfully')}
          onError={(e) => console.log('Absolute path image failed to load:', e)}
        />
      </div>
    </div>
  );
}
