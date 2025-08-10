import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import campusMap from "../assets/campusMapWithBuildings.svg?raw";
import campusMapImage from "../assets/uiuc-campus-map.png";
import "./CampusMap.css";

export default function CampusMap() {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [tooltip, setTooltip] = useState({ show: false, text: "", x: 0, y: 0 });

  // Function to handle building clicks
  const handleBuildingClick = (buildingPath) => {
    if (buildingPath && buildingPath !== "#") {
      // Extract the building identifier from the path
      const buildingId = buildingPath.replace(/^\//, "").replace(/\/$/, "");
      navigate(`/building/${buildingId}`);
    }
  };

  // Function to show tooltip
  const showTooltip = (event, title) => {
    if (title) {
      setTooltip({
        show: true,
        text: title,
        x: event.clientX + 10,
        y: event.clientY - 30,
      });
    }
  };

  // Function to hide tooltip
  const hideTooltip = () => {
    setTooltip({ show: false, text: "", x: 0, y: 0 });
  };

  // Process the SVG content to fix image path and remove problematic target attributes
  const processedSVG = campusMap
    .replace(
      /xlink:href="\.\/uiuc-campus-map\.png"/g,
      `xlink:href="${campusMapImage}"`
    )
    .replace(/target="---"/g, "")
    .replace(/<a xlink:href="([^"]*)"[^>]*>/g, (match, href) => {
      if (href && href !== "#") {
        return `<a xlink:href="#" onclick="window.handleBuildingClick('${href}')" style="cursor: pointer;">`;
      }
      return match;
    });

  // Add the global click handler function and set up event listeners
  useEffect(() => {
    console.log("CampusMap mounted, processedSVG length:", processedSVG.length);
    console.log("Image path:", campusMapImage);

    window.handleBuildingClick = handleBuildingClick;

    // Add click event listeners to all building polygons after the SVG is rendered
    if (mapRef.current) {
      const polygons = mapRef.current.querySelectorAll(".image-mapper-shape");
      console.log("Found polygons:", polygons.length);

      polygons.forEach((polygon) => {
        polygon.style.cursor = "pointer";

        // Add click event
        polygon.addEventListener("click", (e) => {
          e.preventDefault();
          const parentLink = polygon.closest("a");
          if (parentLink) {
            const href = parentLink.getAttribute("xlink:href");
            if (href && href !== "#") {
              handleBuildingClick(href);
            }
          }
        });

        // Add hover events for tooltip
        const parentLink = polygon.closest("a");
        if (parentLink) {
          const title = parentLink.getAttribute("xlink:title");
          if (title) {
            polygon.addEventListener("mouseenter", (e) =>
              showTooltip(e, title)
            );
            polygon.addEventListener("mouseleave", hideTooltip);
          }
        }
      });
    }

    return () => {
      delete window.handleBuildingClick;
    };
  }, [navigate]);

  return (
    <div className="max-w-full mx-auto mt-6 campus-map-container">
      {/* Try both approaches - first the processed SVG, then fallback to image */}
      <div
        ref={mapRef}
        className="w-full h-full"
        dangerouslySetInnerHTML={{ __html: processedSVG }}
      />

      {/* Fallback image if SVG doesn't work */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500 mb-2">
          If the interactive map doesn't display, here's the campus map:
        </p>
        <img
          src={campusMapImage}
          alt="UIUC Campus Map"
          className="max-w-full h-auto mx-auto border border-gray-200 rounded-lg"
          style={{ maxHeight: "600px" }}
        />
      </div>

      {/* Tooltip */}
      {tooltip.show && (
        <div
          className="building-tooltip"
          style={{
            left: tooltip.x,
            top: tooltip.y,
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
