import React, { useState } from "react";
import MapTableLayout from "../components/MapTableLayout";

export default function Map() {
  // State for room table functionality (kept for potential future use)
  const [searchQuery, setSearchQuery] = useState("");
  const [showOpenOnly, setShowOpenOnly] = useState(false);

  return (
    <div>
      <MapTableLayout
        rooms={[]}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showOpenOnly={showOpenOnly}
        setShowOpenOnly={setShowOpenOnly}
        selectedBuilding={null}
        selectedDate={new Date("2025-08-25")}
        setSelectedDate={() => {}}
        selectedTime="12:00"
        setSelectedTime={() => {}}
        loading={false}
        error=""
        onRefresh={() => {}}
      />
    </div>
  );
}
