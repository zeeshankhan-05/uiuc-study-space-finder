import React, { forwardRef } from "react";
import { highlightMatch } from "../utils/searchUtils";

/**
 * SearchDropdown component for displaying building search results
 * @param {Object} props - Component props
 * @param {Array} props.results - Array of search results
 * @param {number} props.selectedIndex - Currently selected result index
 * @param {Function} props.onSelect - Callback when a result is selected
 * @param {Function} props.onClose - Callback to close the dropdown
 * @param {boolean} props.isVisible - Whether the dropdown is visible
 * @param {string} props.query - Current search query for highlighting
 */
const SearchDropdown = forwardRef(function SearchDropdown(
  { results, selectedIndex, onSelect, isVisible, query },
  ref
) {
  if (!isVisible || !results.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-storm-gray-lighter rounded-xl shadow-modern-lg overflow-hidden"
      role="listbox"
      aria-label="Building search results"
      aria-expanded="true"
    >
      {/* Results list */}
      <ul className="max-h-80 overflow-y-auto">
        {results.map((result, index) => (
          <li
            key={`${result.name}-${index}`}
            className={`
              px-4 py-3 cursor-pointer transition-colors duration-150
              ${
                index === selectedIndex
                  ? "bg-uiuc-orange/10 border-l-4 border-l-uiuc-orange"
                  : "hover:bg-storm-gray-lighter/50"
              }
              ${index === 0 ? "rounded-t-xl" : ""}
              ${index === results.length - 1 ? "rounded-b-xl" : ""}
            `}
            role="option"
            aria-selected={index === selectedIndex}
            onClick={() => onSelect(result)}
          >
            <div className="flex-1">
              {/* Building name with highlighted match */}
              <div
                className="text-storm-gray font-medium"
                dangerouslySetInnerHTML={{
                  __html: highlightMatch(result.name, query),
                }}
              />
            </div>
          </li>
        ))}
      </ul>

      {/* Results count */}
      <div className="px-4 py-2 bg-storm-gray-lighter/30 border-t border-storm-gray-lighter text-xs text-storm-gray text-center">
        {results.length} building{results.length !== 1 ? "s" : ""} found
      </div>
    </div>
  );
});

export default SearchDropdown;
