import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import campusMap from "../assets/campusMapWithBuildings.svg?raw";
import campusMapImage from "../assets/uiuc-campus-map.png";
import { mapBuildingPathToName } from "../utils/buildingMapper";
import "./CampusMap.css";

export default function CampusMap() {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [tooltip, setTooltip] = useState({ show: false, text: "", x: 0, y: 0 });

  // Function to handle building clicks
  const handleBuildingClick = useCallback(
    (buildingPath) => {
      if (buildingPath && buildingPath !== "#") {
        // Map the building path to the API building name
        const buildingName = mapBuildingPathToName(buildingPath);
        if (buildingName) {
          navigate(`/building/${encodeURIComponent(buildingName)}`);
        } else {
          console.warn("Unknown building path:", buildingPath);
        }
      }
    },
    [navigate]
  );

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
  }, [handleBuildingClick, processedSVG.length]);

  return (
    <div className="w-full campus-map-container">
      {/* Interactive SVG Map */}
      <div
        ref={mapRef}
        className="w-full h-auto max-h-96 md:max-h-none"
        dangerouslySetInnerHTML={{ __html: processedSVG }}
      />

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
