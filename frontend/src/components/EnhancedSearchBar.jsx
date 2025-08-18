import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { searchBuildings, debounce } from "../utils/searchUtils";
import SearchDropdown from "./SearchDropdown";

/**
 * Enhanced search bar component with building search functionality
 * Updated to work with new building ID system
 * @param {Object} props - Component props
 * @param {Function} props.onBuildingSelect - Callback when a building is selected
 * @param {string} props.placeholder - Placeholder text for the search input
 * @param {string} props.buttonText - Text for the search button
 */
export default function EnhancedSearchBar({
  onBuildingSelect,
  placeholder = "Search buildings, rooms, or locations...",
  buttonText = "Search",
}) {
  const navigate = useNavigate();

  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);

  // Refs
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const containerRef = useRef(null);

  // Debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce(async (query) => {
        if (!query || query.trim().length < 2) {
          setSearchResults([]);
          setIsDropdownVisible(false);
          setIsLoading(false);
          return;
        }

        setIsLoading(true);

        try {
          const results = searchBuildings(query, 10);
          setSearchResults(results);
          setIsDropdownVisible(results.length > 0);
          setSelectedIndex(0);
        } catch (error) {
          console.error("Search error:", error);
          setSearchResults([]);
          setIsDropdownVisible(false);
        } finally {
          setIsLoading(false);
        }
      }, 300),
    []
  );

  // Handle search query changes
  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  // Handle building selection with navigation
  const handleBuildingSelect = useCallback(
    (building) => {
      setSearchQuery(building.name);
      setIsDropdownVisible(false);
      setSelectedIndex(0);

      // Navigate to building page using new ID system
      if (building.id) {
        navigate(`/building/${building.id}`);
      }

      if (onBuildingSelect) {
        onBuildingSelect(building);
      }

      // Focus back to input for better UX
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    },
    [navigate, onBuildingSelect]
  );
  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (!isDropdownVisible || searchResults.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < searchResults.length - 1 ? prev + 1 : 0
          );
          break;

        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : searchResults.length - 1
          );
          break;

        case "Enter":
          e.preventDefault();
          if (searchResults[selectedIndex]) {
            handleBuildingSelect(searchResults[selectedIndex]);
          }
          break;

        case "Escape":
          e.preventDefault();
          setIsDropdownVisible(false);
          inputRef.current?.blur();
          break;

        default:
          break;
      }
    },
    [isDropdownVisible, searchResults, selectedIndex, handleBuildingSelect]
  );

  // Handle input focus
  const handleInputFocus = useCallback(() => {
    setHasFocus(true);
    if (searchResults.length > 0) {
      setIsDropdownVisible(true);
    }
  }, [searchResults.length]);

  // Handle input blur
  const handleInputBlur = useCallback(() => {
    setHasFocus(false);
    // Delay hiding dropdown to allow for clicks
    setTimeout(() => {
      if (!hasFocus) {
        setIsDropdownVisible(false);
      }
    }, 150);
  }, [hasFocus]);

  // Handle search button click
  const handleSearchClick = useCallback(() => {
    if (searchResults.length > 0 && selectedIndex >= 0) {
      handleBuildingSelect(searchResults[selectedIndex]);
    } else if (searchQuery.trim()) {
      // If no results but query exists, try to search anyway
      const results = searchBuildings(searchQuery.trim(), 1);
      if (results.length > 0) {
        handleBuildingSelect(results[0]);
      }
    }
  }, [searchResults, selectedIndex, searchQuery, handleBuildingSelect]);

  // Handle clear search
  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
    setIsDropdownVisible(false);
    setSelectedIndex(0);
    inputRef.current?.focus();
  }, []);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Search Container */}
      <div className="bg-white rounded-2xl shadow-modern-lg border border-storm-gray-lighter overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-uiuc-orange border-t-transparent"></div>
              ) : (
                <svg
                  className="h-6 w-6 text-storm-gray"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              )}
            </div>

            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full pl-16 pr-12 py-5 text-lg border-0 focus:outline-none focus:ring-2 focus:ring-uiuc-orange focus:ring-offset-2 bg-transparent"
              aria-label="Search buildings"
              aria-expanded={isDropdownVisible}
              aria-haspopup="listbox"
              role="combobox"
              autoComplete="off"
            />

            {/* Clear button */}
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-storm-gray hover:text-storm-gray-dark transition-colors"
                aria-label="Clear search"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearchClick}
            className="bg-gradient-to-r from-uiuc-orange to-uiuc-orange-light hover:from-uiuc-orange-light hover:to-uiuc-orange text-white px-8 py-5 font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-modern-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            disabled={!searchQuery.trim()}
          >
            {buttonText}
          </button>
        </div>
      </div>

      {/* Search Dropdown */}
      <SearchDropdown
        ref={dropdownRef}
        results={searchResults}
        selectedIndex={selectedIndex}
        onSelect={handleBuildingSelect}
        onClose={() => setIsDropdownVisible(false)}
        isVisible={isDropdownVisible}
        query={searchQuery}
      />

      {/* No results message */}
      {searchQuery.trim().length >= 2 &&
        !isLoading &&
        searchResults.length === 0 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-storm-gray-lighter rounded-xl shadow-modern-lg p-4 text-center">
            <div className="text-storm-gray">
              <svg
                className="mx-auto h-8 w-8 text-storm-gray-light mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
                />
              </svg>
              <p className="text-sm">
                No buildings found matching "{searchQuery}"
              </p>
              <p className="text-xs text-storm-gray-light mt-1">
                Try a different search term or check spelling
              </p>
            </div>
          </div>
        )}
    </div>
  );
}
