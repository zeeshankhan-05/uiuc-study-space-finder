import React from 'react';
import CampusMapViewer from '../components/CampusMapViewer';

export default function Map() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Click a building to see room availability</h2>
      <CampusMapViewer />
    </div>
  );
}
