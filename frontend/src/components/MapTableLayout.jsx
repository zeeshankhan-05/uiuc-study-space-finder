import React, { useState, useRef } from "react";
import CampusMap from "./CampusMap";
import BuildingModal from "./BuildingModal";

export default function MapTableLayout({
  rooms = [],
  searchQuery = "",
  setSearchQuery,
  showOpenOnly = false,
  setShowOpenOnly,
  selectedBuilding = null,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  loading = false,
  error = "",
  onRefresh,
}) {
  const [showModal, setShowModal] = useState(false);
  const mapRef = useRef(null);

  // Show modal when building is selected
  React.useEffect(() => {
    if (selectedBuilding) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [selectedBuilding]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* Full-Width Map Layout */}
      <div className="w-full">
        {/* MAP SECTION - Full Width */}
        <section className="w-full">
          {/* Map Container - Full Width with optimized height */}
          <div className="relative w-full h-[700px] lg:h-[800px] xl:h-[900px]">
            <CampusMap ref={mapRef} />
          </div>
        </section>

        {/* No Building Selected State - Removed */}
      </div>

      {/* Building Modal */}
      {showModal && (
        <BuildingModal
          selectedBuilding={selectedBuilding}
          rooms={rooms}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showOpenOnly={showOpenOnly}
          setShowOpenOnly={setShowOpenOnly}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          loading={loading}
          error={error}
          onRefresh={onRefresh}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
