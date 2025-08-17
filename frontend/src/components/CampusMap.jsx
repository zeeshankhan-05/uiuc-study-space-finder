import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  forwardRef,
} from "react";
import { useNavigate } from "react-router-dom";
import campusMap from "../assets/campusMapWithBuildings.svg?raw";
import campusMapImage from "../assets/uiuc-campus-map.png";
import { getBuildingByPath } from "../utils/buildingMapper";

const CampusMap = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  // Map interaction state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isHoveringBuilding, setIsHoveringBuilding] = useState(false);
  const [hoveredBuilding, setHoveredBuilding] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  // Touch support for mobile devices
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0, distance: 0 });
  const [isPinching, setIsPinching] = useState(false);
  const [lastTouchTime, setLastTouchTime] = useState(0);

  const MIN_ZOOM = 0.25;
  const MAX_ZOOM = 2.5;
  const ZOOM_STEP = 0.1;

  // Enhanced zoom functionality
  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
  }, []);

  // Wheel zoom handler
  const handleWheelZoom = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    const SENSITIVITY = 0.0025;
    const delta = e.deltaY * SENSITIVITY;

    setZoom((prev) => {
      const newZoom = prev - delta;
      return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));
    });
  }, []);

  const resetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  // Improved pan functionality
  const handleMouseDown = useCallback(
    (e) => {
      // Only handle left mouse button and prevent dragging when hovering over buildings
      if (e.button !== 0 || isHoveringBuilding) return;

      e.preventDefault();
      e.stopPropagation();

      setIsDragging(true);
      setDragStart({
        x: e.clientX - pan.x,
        y: e.clientY - pan.y,
      });

      // Update cursor immediately
      if (containerRef.current) {
        containerRef.current.style.cursor = "grabbing";
      }
    },
    [isHoveringBuilding, pan.x, pan.y]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging || isHoveringBuilding) return;

      e.preventDefault();
      e.stopPropagation();

      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    },
    [isDragging, isHoveringBuilding, dragStart.x, dragStart.y]
  );

  const handleMouseUp = useCallback(
    (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      setIsDragging(false);

      // Reset cursor
      if (containerRef.current) {
        containerRef.current.style.cursor = isHoveringBuilding
          ? "pointer"
          : "grab";
      }
    },
    [isHoveringBuilding]
  );

  // Touch handling
  const handleTouchStart = useCallback(
    (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        setTouchStart({
          x: touch.clientX - pan.x,
          y: touch.clientY - pan.y,
          distance: 0,
        });
        setLastTouchTime(Date.now());
      } else if (e.touches.length === 2) {
        setIsPinching(true);
        const distance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        setTouchStart({
          x: 0,
          y: 0,
          distance: distance,
        });
      }
    },
    [pan.x, pan.y]
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (isHoveringBuilding) return;

      if (e.touches.length === 1 && !isPinching) {
        const touch = e.touches[0];
        setPan({
          x: touch.clientX - touchStart.x,
          y: touch.clientY - touchStart.y,
        });
      } else if (e.touches.length === 2 && isPinching) {
        const distance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );

        if (touchStart.distance > 0) {
          const scale = distance / touchStart.distance;
          const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom * scale));
          setZoom(newZoom);
        }
      }
    },
    [isHoveringBuilding, isPinching, touchStart, zoom]
  );

  const handleTouchEnd = useCallback(
    (e) => {
      setIsPinching(false);
      setTouchStart({ x: 0, y: 0, distance: 0 });

      // Prevent click events after touch
      const currentTime = Date.now();
      if (currentTime - lastTouchTime < 300) {
        e.preventDefault();
      }
    },
    [lastTouchTime]
  );

  // Building click handler
  const handleBuildingClick = useCallback(
    (buildingPath) => {
      console.log("Building clicked:", buildingPath);
      if (buildingPath && buildingPath !== "#") {
        // Skip Grainger Library
        if (buildingPath === "/library/" || buildingPath === "/library") {
          return;
        }

        setSelectedBuilding(buildingPath);
        const buildingData = getBuildingByPath(buildingPath);
        console.log("Building data found:", buildingData);
        if (buildingData) {
          const navigationPath = `/building/${buildingData.id}`;
          console.log("Navigating to:", navigationPath);
          navigate(navigationPath);
        } else {
          console.warn("Unknown building path:", buildingPath);
        }
      }
    },
    [navigate]
  );

  // Method to center map on a specific building
  const centerOnBuilding = useCallback((buildingPath) => {
    if (!buildingPath) return;

    if (svgRef.current) {
      const buildingElement = svgRef.current.querySelector(
        `[data-building-path="${buildingPath}"]`
      );
      if (buildingElement) {
        const bbox = buildingElement.getBBox();
        const container = containerRef.current;

        if (container && bbox) {
          const centerX = bbox.x + bbox.width / 2;
          const centerY = bbox.y + bbox.height / 2;

          const containerRect = container.getBoundingClientRect();
          const panX = containerRect.width / 2 - centerX;
          const panY = containerRect.height / 2 - centerY;

          setPan({ x: panX, y: panY });
          setZoom(1.5);

          setSelectedBuilding(buildingPath);
          setTimeout(() => {
            setSelectedBuilding(null);
          }, 2000);
        }
      }
    }
  }, []);

  // Expose centerOnBuilding method to parent components
  React.useImperativeHandle(
    ref,
    () => ({
      centerOnBuilding,
    }),
    [centerOnBuilding]
  );

  // Building hover detection
  const handleBuildingHover = useCallback(
    (isHovering, buildingPath = null) => {
      setIsHoveringBuilding(isHovering);
      setHoveredBuilding(buildingPath);

      // Update cursor based on hover state
      if (containerRef.current) {
        if (isHovering) {
          containerRef.current.style.cursor = "pointer";
        } else {
          containerRef.current.style.cursor = isDragging ? "grabbing" : "grab";
        }
      }
    },
    [isDragging]
  );

  // Update building highlight
  const updateBuildingHighlight = useCallback(() => {
    if (svgRef.current) {
      const polygons = svgRef.current.querySelectorAll(".image-mapper-shape");
      polygons.forEach((polygon) => {
        polygon.classList.remove("selected-building", "hovered-building");

        const parentLink = polygon.closest("a");
        if (parentLink) {
          const buildingPath = parentLink.getAttribute("data-building-path");

          if (buildingPath === selectedBuilding) {
            polygon.classList.add("selected-building");
          }

          if (buildingPath === hoveredBuilding) {
            polygon.classList.add("hovered-building");
          }
        }
      });
    }
  }, [selectedBuilding, hoveredBuilding]);

  // Process SVG with building interactions
  const processedSVG = campusMap
    .replace(
      /xlink:href="\.\/uiuc-campus-map\.png"/g,
      `xlink:href="${campusMapImage}"`
    )
    .replace(/target="---"/g, "")
    .replace(/<a xlink:href="([^"]*)"[^>]*>/g, (match, href) => {
      if (href && href !== "#") {
        // Skip Grainger Library
        if (href === "/library/" || href === "/library") {
          return `<a style="cursor: default; pointer-events: none;" aria-label="Grainger Engineering Library (Not Available)" role="button" tabindex="-1"><title>Grainger Engineering Library (Not Available)</title>`;
        }

        const buildingData = getBuildingByPath(href);
        if (buildingData) {
          return `<a style="cursor: pointer;" aria-label="Click to view ${buildingData.displayName} study spaces" role="button" tabindex="0" data-building-path="${href}"><title>${buildingData.displayName}</title>`;
        }
        return `<a style="cursor: pointer;" aria-label="Click to view building study spaces" role="button" tabindex="0" data-building-path="${href}"><title>${href}</title>`;
      }
      return match;
    });

  // Setup building event listeners - FIXED VERSION
  useEffect(() => {
    console.log("Setting up building event listeners...");

    // Capture the ref value at the beginning of the effect
    const currentSvgRef = svgRef.current;

    // Wait for SVG to be rendered
    const setupEventListeners = () => {
      if (currentSvgRef) {
        const polygons = currentSvgRef.querySelectorAll(".image-mapper-shape");
        console.log("Found", polygons.length, "polygons");

        polygons.forEach((polygon, index) => {
          const parentLink = polygon.closest("a");
          if (parentLink) {
            const buildingPath = parentLink.getAttribute("data-building-path");
            console.log(`Polygon ${index}:`, buildingPath);

            // Skip Grainger Library
            if (buildingPath === "/library/" || buildingPath === "/library") {
              polygon.style.cursor = "default";
              polygon.style.pointerEvents = "none";
              return;
            }

            // Ensure building is clickable
            polygon.style.cursor = "pointer";
            polygon.style.pointerEvents = "auto";

            // Click handler
            const handlePolygonClick = (e) => {
              e.preventDefault();
              e.stopPropagation();

              const buildingPath =
                parentLink.getAttribute("data-building-path");
              if (
                buildingPath &&
                buildingPath !== "#" &&
                buildingPath !== "/library/" &&
                buildingPath !== "/library"
              ) {
                handleBuildingClick(buildingPath);
              }
            };

            // Keyboard handler
            const handleKeyDown = (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                const buildingPath =
                  parentLink.getAttribute("data-building-path");
                if (
                  buildingPath &&
                  buildingPath !== "#" &&
                  buildingPath !== "/library/" &&
                  buildingPath !== "/library"
                ) {
                  handleBuildingClick(buildingPath);
                }
              }
            };

            // Hover handlers
            const handleMouseEnter = (e) => {
              e.preventDefault();
              e.stopPropagation();
              const buildingPath =
                parentLink.getAttribute("data-building-path");
              handleBuildingHover(true, buildingPath);
            };

            const handleMouseLeave = (e) => {
              e.preventDefault();
              e.stopPropagation();
              handleBuildingHover(false, null);
            };

            // Add event listeners
            polygon.addEventListener("mouseenter", handleMouseEnter);
            polygon.addEventListener("mouseleave", handleMouseLeave);
            polygon.addEventListener("click", handlePolygonClick);
            polygon.addEventListener("keydown", handleKeyDown);

            // Touch support
            polygon.addEventListener("touchstart", (e) => {
              e.preventDefault();
              e.stopPropagation();
              const buildingPath =
                parentLink.getAttribute("data-building-path");
              handleBuildingHover(true, buildingPath);
            });

            polygon.addEventListener("touchend", (e) => {
              e.preventDefault();
              e.stopPropagation();
              const buildingPath =
                parentLink.getAttribute("data-building-path");
              handleBuildingClick(buildingPath);
              setTimeout(() => {
                handleBuildingHover(false, null);
              }, 300);
            });

            // Store cleanup function on the element
            polygon._cleanup = () => {
              polygon.removeEventListener("mouseenter", handleMouseEnter);
              polygon.removeEventListener("mouseleave", handleMouseLeave);
              polygon.removeEventListener("click", handlePolygonClick);
              polygon.removeEventListener("keydown", handleKeyDown);
              polygon.removeEventListener("touchstart", handlePolygonClick);
              polygon.removeEventListener("touchend", handlePolygonClick);
            };
          }
        });
      }
    };

    // Use a small delay to ensure SVG is rendered
    const timer = setTimeout(setupEventListeners, 100);

    return () => {
      clearTimeout(timer);
      // Clean up event listeners using the captured ref value
      if (currentSvgRef) {
        const polygons = currentSvgRef.querySelectorAll(".image-mapper-shape");
        polygons.forEach((polygon) => {
          if (polygon._cleanup) {
            polygon._cleanup();
          }
        });
      }
    };
  }, [handleBuildingClick, handleBuildingHover]); // Removed processedSVG.length dependency

  // Update building highlight when selection or hover changes
  useEffect(() => {
    updateBuildingHighlight();
  }, [selectedBuilding, hoveredBuilding, updateBuildingHighlight]);

  // Apply transform to SVG container
  useEffect(() => {
    if (svgRef.current) {
      const transform = `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`;
      svgRef.current.style.transform = transform;
      svgRef.current.style.transformOrigin = "center";
      svgRef.current.style.transition = isDragging
        ? "none"
        : "transform 0.1s ease-out";
    }
  }, [zoom, pan, isDragging]);

  // Manage cursor styles based on dragging state
  useEffect(() => {
    if (containerRef.current) {
      if (isDragging) {
        containerRef.current.style.cursor = "grabbing";
      } else if (isHoveringBuilding) {
        containerRef.current.style.cursor = "pointer";
      } else {
        containerRef.current.style.cursor = "grab";
      }
    }
  }, [isDragging, isHoveringBuilding]);

  // Mouse event handlers for panning
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Mouse event handlers
    const mouseDownHandler = (e) => handleMouseDown(e);
    const mouseMoveHandler = (e) => handleMouseMove(e);
    const mouseUpHandler = (e) => handleMouseUp(e);

    // Touch event handlers
    const touchStartHandler = (e) => handleTouchStart(e);
    const touchMoveHandler = (e) => handleTouchMove(e);
    const touchEndHandler = (e) => handleTouchEnd(e);

    // Wheel event handler
    const wheelHandler = (e) => handleWheelZoom(e);

    // Add event listeners
    container.addEventListener("mousedown", mouseDownHandler);
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);

    container.addEventListener("touchstart", touchStartHandler, {
      passive: false,
    });
    container.addEventListener("touchmove", touchMoveHandler, {
      passive: false,
    });
    container.addEventListener("touchend", touchEndHandler);

    container.addEventListener("wheel", wheelHandler, {
      passive: false,
    });

    return () => {
      // Clean up event listeners
      if (container) {
        container.removeEventListener("mousedown", mouseDownHandler);
        container.removeEventListener("touchstart", touchStartHandler);
        container.removeEventListener("touchmove", touchMoveHandler);
        container.removeEventListener("touchend", touchEndHandler);
        container.removeEventListener("wheel", wheelHandler);
      }

      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };
  }, [
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleWheelZoom,
  ]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative overflow-hidden map-container ${isDragging ? "dragging" : ""}`}
    >
      {/* SVG map with building polygons */}
      <div
        ref={svgRef}
        className="w-full h-full map-svg-container"
        dangerouslySetInnerHTML={{ __html: processedSVG }}
      />

      {/* Interactive Controls Overlay */}
      <div className="absolute top-4 right-2 flex flex-col space-y-2 z-10 map-controls">
        {/* Zoom In */}
        <button
          onClick={handleZoomIn}
          disabled={zoom >= MAX_ZOOM}
          className="w-10 h-10 bg-white hover:bg-gray-50 border border-storm-gray-lighter rounded-lg shadow-modern flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
        >
          <svg
            className="w-5 h-5 text-storm-gray"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>

        {/* Zoom Out */}
        <button
          onClick={handleZoomOut}
          disabled={zoom <= MIN_ZOOM}
          className="w-10 h-10 bg-white hover:bg-gray-50 border border-storm-gray-lighter rounded-lg shadow-modern flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
        >
          <svg
            className="w-5 h-5 text-storm-gray"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
        </button>

        {/* Reset View */}
        <button
          onClick={resetView}
          className="w-10 h-10 bg-white hover:bg-gray-50 border border-storm-gray-lighter rounded-lg shadow-modern flex items-center justify-center transition-all hover:shadow-lg"
          title="Reset View"
        >
          <svg
            className="w-5 h-5 text-storm-gray"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>

      {/* Zoom Level Indicator */}
      <div className="absolute bottom-4 left-0 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-modern text-sm text-storm-gray zoom-indicator">
        {Math.round(zoom * 100)}%
      </div>
    </div>
  );
});

export default CampusMap;
