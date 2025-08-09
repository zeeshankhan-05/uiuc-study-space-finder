import React from "react";
import campusMap from "../assets/uiuc-campus-map.svg";

export default function CampusMap({ onBuildingClick }) {
  return (
    <div className="relative w-full max-w-6xl mx-auto mt-6">
      {/* Background Map */}
      <img src={campusMap} alt="UIUC Campus Map" className="w-full h-auto" />
      <div
        onClick={() => onBuildingClick("Gregory Hall")}
        className="absolute cursor-pointer bg-blue-500 opacity-30 hover:opacity-60 transition"
        style={{
          top: "40%",
          left: "35%",
          width: "60px",
          height: "60px",
          borderRadius: "10px",
          backgroundColor: "rgba(0,0,255,0.3)",
        }}
      ></div>

      {/* TODO: Clickable overlays go here */}
    </div>
  );
}
