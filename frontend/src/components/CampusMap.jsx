import React from "react";
import campusMap from "../assets/uiuc-campus-map.png";

export default function CampusMap({ onBuildingClick }) {
  const width = 1040;
  const height = 1508;

  return (
    <div className="max-w-full mx-auto mt-6">
      <svg
        width="100%"
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background map image */}
        <image href={campusMap} width={width} height={height} />

        {/* Polygon for Beckman Institute */}
        <polygon
          points="411 25 508 24 512 46 488 45 488 69 385 69 384 52"
          fill="transparent"
          stroke="blue"
          strokeWidth={2}
          className="cursor-pointer"
          onClick={() => onBuildingClick("BeckmanInstitute")}
          onMouseEnter={(e) => (e.target.style.fill = "rgba(0, 0, 255, 0.3)")}
          onMouseLeave={(e) => (e.target.style.fill = "transparent")}
        >
          <title>Beckman Institute</title>
        </polygon>
      </svg>
    </div>
  );
}
