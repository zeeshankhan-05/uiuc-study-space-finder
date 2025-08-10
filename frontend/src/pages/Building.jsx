import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Building() {
  const { buildingId } = useParams();
  const navigate = useNavigate();

  const formatBuildingName = (id) => {
    if (!id) return "Unknown Building";

    return id
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getBuildingDescription = () => {
    return "This building is part of the University of Illinois Urbana-Champaign campus.";
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Map
        </button>

        {/* Building header */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {formatBuildingName(buildingId)}
          </h1>
          <p className="text-gray-600 text-lg">
            University of Illinois Urbana-Champaign
          </p>
        </div>

        {/* Building content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Building description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed">
              {getBuildingDescription()}
            </p>
          </div>

          {/* Building details */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Details
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Building ID:</span>
                <span className="text-gray-900">{buildingId}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Campus:</span>
                <span className="text-gray-900">Urbana-Champaign</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">University:</span>
                <span className="text-gray-900">University of Illinois</span>
              </div>
            </div>
          </div>
        </div>

        {/* Study space information */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Study Spaces
          </h3>
          <p className="text-blue-800">
            Study space information for this building will be available soon.
            Check back for details about quiet study areas, group study rooms,
            and other learning spaces.
          </p>
        </div>
      </div>
    </div>
  );
}
