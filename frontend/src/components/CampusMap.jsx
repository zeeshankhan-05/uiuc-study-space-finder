import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import campusMap from "../assets/campusMapWithBuildings.svg?raw";
import campusMapImage from "../assets/uiuc-campus-map.png";
import { mapBuildingPathToName } from "../utils/buildingMapper";
import "./CampusMap.css";

export default function CampusMap() {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [tooltip, setTooltip] = useState({ show: false, text: "", x: 0, y: 0 });

  // Click handler
  const handleBuildingClick = useCallback(
    (buildingPath) => {
      if (buildingPath && buildingPath !== "#") {
        setSelectedBuilding(buildingPath); // highlight
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

  const hideTooltip = () => {
    setTooltip({ show: false, text: "", x: 0, y: 0 });
  };

  // Highlight selected building
  const updateBuildingHighlight = useCallback(() => {
    if (mapRef.current) {
      const polygons = mapRef.current.querySelectorAll(".image-mapper-shape");

      polygons.forEach((polygon) => {
        polygon.classList.remove("selected-building");
        const parentLink = polygon.closest("a");
        if (parentLink && selectedBuilding) {
          const href = parentLink.getAttribute("xlink:href");
          if (href === selectedBuilding) {
            polygon.classList.add("selected-building");
          }
        }
      });
    }
  }, [selectedBuilding]);

  // Resize fix
  const handleResize = useCallback(() => {
    if (mapRef.current) {
      const svg = mapRef.current.querySelector("svg");
      if (svg) {
        svg.style.width = "100%";
        svg.style.height = "auto";
      }
    }
  }, []);

  // Process SVG: add <title> to <a> using mapBuildingPathToName
  const processedSVG = campusMap
    .replace(
      /xlink:href="\.\/uiuc-campus-map\.png"/g,
      `xlink:href="${campusMapImage}"`
    )
    .replace(/target="---"/g, "")
    .replace(/<a xlink:href="([^"]*)"[^>]*>/g, (match, href) => {
      if (href && href !== "#") {
        const buildingName = mapBuildingPathToName(href);
        return `<a onclick="window.handleBuildingClick('${href}')" style="cursor: pointer;"><title>${buildingName}</title>`;
      }
      return match;
    });
  useEffect(() => {
    window.handleBuildingClick = handleBuildingClick;

    if (mapRef.current) {
      const polygons = mapRef.current.querySelectorAll(".image-mapper-shape");

      polygons.forEach((polygon) => {
        polygon.style.cursor = "pointer";

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

        const parentLink = polygon.closest("a");
        if (parentLink) {
          const titleElement = parentLink.querySelector("title");
          const title = titleElement?.textContent;
          if (title) {
            polygon.addEventListener("mouseenter", (e) =>
              showTooltip(e, title)
            );
            polygon.addEventListener("mouseleave", hideTooltip);
          }
        }
      });
    }

    // Resize observer
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(containerRef.current);

      return () => {
        delete window.handleBuildingClick;
        resizeObserver.disconnect();
      };
    }

    return () => {
      delete window.handleBuildingClick;
    };
  }, [handleBuildingClick, handleResize, processedSVG.length]);

  useEffect(() => {
    updateBuildingHighlight();
  }, [selectedBuilding, updateBuildingHighlight]);

  return (
    <div ref={containerRef} className="w-full h-full campus-map-container">
      {/* SVG map with building polygons */}
      <div
        ref={mapRef}
        className="w-full h-full"
        dangerouslySetInnerHTML={{ __html: processedSVG }}
      />

      {/* Tooltip */}
      {tooltip.show && (
        <div
          className="absolute bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none z-50"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
