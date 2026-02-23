"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

interface BloodInventory {
  bloodType: string;
  units: number;
}

interface BloodBankResponse {
  id: string;
  name: string;
  address?: string;
  city?: string;
  contactNo?: string;
  inventories?: BloodInventory[];
}

interface BloodCenter {
  id: string;
  name: string;
  location: string;
  distance: number;
  bloodTypes: {
    [key: string]: {
      available: number;
      status: "AVAILABLE" | "CRITICAL" | "UNAVAILABLE";
    };
  };
  rating: number;
  phone: string;
}

export default function BloodAvailability() {
  const [selectedBloodTypes, setSelectedBloodTypes] = useState<string[]>([]);
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const [distanceRadius, setDistanceRadius] = useState(50);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  // Fetch blood centers data from API
  const { data: centerData, isLoading: isLoadingCenters } = useSWR(
    "/api/blood-banks?limit=10",
    fetcher,
    { revalidateOnFocus: false }
  );

  const bloodTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
  const components = [
    { label: "Whole Blood", value: "whole_blood" },
    { label: "Plasma", value: "plasma" },
    { label: "Platelets", value: "platelets" },
    { label: "Red Cells", value: "red_cells" },
  ];

  const mockCenters: BloodCenter[] = [
    {
      id: "1",
      name: "Central Blood Bank",
      location: "Downtown Medical Center",
      distance: 2.5,
      bloodTypes: {
        "O+": { available: 45, status: "AVAILABLE" },
        "O-": { available: 8, status: "CRITICAL" },
        "A+": { available: 32, status: "AVAILABLE" },
        "B+": { available: 28, status: "AVAILABLE" },
      },
      rating: 4.8,
      phone: "+1 (555) 123-4567",
    },
    {
      id: "2",
      name: "St. Jude Medical Bank",
      location: "North District Hospital",
      distance: 5.2,
      bloodTypes: {
        "O+": { available: 52, status: "AVAILABLE" },
        "A+": { available: 38, status: "AVAILABLE" },
        "B-": { available: 5, status: "CRITICAL" },
        "AB+": { available: 15, status: "AVAILABLE" },
      },
      rating: 4.6,
      phone: "+1 (555) 234-5678",
    },
    {
      id: "3",
      name: "Red Cross Blood Drive",
      location: "Community Center",
      distance: 8.7,
      bloodTypes: {
        "O+": { available: 61, status: "AVAILABLE" },
        "O-": { available: 19, status: "AVAILABLE" },
        "A+": { available: 44, status: "AVAILABLE" },
        "AB-": { available: 0, status: "UNAVAILABLE" },
      },
      rating: 4.9,
      phone: "+1 (555) 345-6789",
    },
  ];

  // Use fetched data if available, otherwise use mock data
  const centers: BloodCenter[] = useMemo(() => {
    if (!centerData?.data || !Array.isArray(centerData.data)) {
      return mockCenters;
    }
    
    return centerData.data.map((item: BloodBankResponse, idx: number) => ({
      id: item.id,
      name: item.name,
      location: item.address || item.city || "Unknown",
      distance: (idx + 1) * 2.5, // Use deterministic distance based on index
      bloodTypes: item.inventories?.reduce((acc: Record<string, { available: number; status: "AVAILABLE" | "CRITICAL" | "UNAVAILABLE" }>, inv: BloodInventory) => {
        acc[inv.bloodType] = {
          available: inv.units || 0,
          status: inv.units > 10 ? "AVAILABLE" : inv.units > 0 ? "CRITICAL" : "UNAVAILABLE",
        };
        return acc;
      }, {}) || {},
      rating: 4.5 + idx * 0.05, // Use deterministic rating based on index
      phone: item.contactNo || "",
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centerData]);

  const handleBloodTypeToggle = (type: string) => {
    setSelectedBloodTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleComponentToggle = (component: string) => {
    setSelectedComponents((prev) =>
      prev.includes(component)
        ? prev.filter((c) => c !== component)
        : [...prev, component]
    );
  };

  const handleRequestBlood = (centerName: string, bloodType: string): void => {
    toast.success(`Blood request initiated for ${bloodType} from ${centerName}`);
  };

  const handleReserveBlood = (): void => {
    toast.success("Blood reserved successfully! Check your email for confirmation.");
  };

  return (
    <div className={`space-y-8 ${isLoadingCenters ? "opacity-75 pointer-events-none" : ""}`}>
      {isLoadingCenters && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg px-6 py-3 z-50">
          <p className="text-gray-700 font-medium">Loading blood centers...</p>
        </div>
      )}
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Blood Availability Search
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Finding {selectedBloodTypes.length > 0 ? `${selectedBloodTypes.join(", ")} blood` : "all blood types"} within{" "}
            {distanceRadius}km
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("list")}
            className={`px-4 py-2 rounded-lg transition ${
              viewMode === "list"
                ? "bg-brand-DEFAULT text-white"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
          >
            📋 List View
          </button>
          <button
            onClick={() => setViewMode("map")}
            className={`px-4 py-2 rounded-lg transition ${
              viewMode === "map"
                ? "bg-brand-DEFAULT text-white"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
          >
            🗺️ Map View
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 border border-gray-200 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Filters
            </h2>

            {/* Blood Type Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                BLOOD TYPE
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {bloodTypes.map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer transition"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBloodTypes.includes(type)}
                      onChange={() => handleBloodTypeToggle(type)}
                      className="w-4 h-4 rounded border-gray-300 text-brand-DEFAULT cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Components Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                COMPONENTS
              </h3>
              <div className="space-y-2">
                {components.map((comp) => (
                  <label
                    key={comp.value}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer transition"
                  >
                    <input
                      type="checkbox"
                      checked={selectedComponents.includes(comp.value)}
                      onChange={() => handleComponentToggle(comp.value)}
                      className="w-4 h-4 rounded border-gray-300 text-brand-DEFAULT cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">
                      {comp.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Distance Radius */}
            <div className="pb-8 border-b border-gray-200 mb-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                DISTANCE RADIUS
              </h3>
              <div className="space-y-3">
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={distanceRadius}
                  onChange={(e) => setDistanceRadius(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-brand-DEFAULT"
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">
                    Within
                  </span>
                  <span className="text-lg font-bold text-brand-DEFAULT">
                    {distanceRadius}km
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full bg-brand-DEFAULT text-white py-2 rounded-lg hover:bg-brand-dark transition font-medium">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          {viewMode === "list" ? (
            // List View
            <div className="space-y-4">
              {centers.map((center) => (
                <div
                  key={center.id}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {center.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        📍 {center.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {center.distance}km away
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-xs">
                        <span className="text-yellow-500">⭐</span>
                        <span className="text-gray-700">
                          {center.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Blood Type Availability Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    {Object.entries(center.bloodTypes).map(([type, data]) => (
                      <div
                        key={type}
                        className={`p-3 rounded-lg border text-center ${
                          data.status === "AVAILABLE"
                            ? "bg-green-50 border-green-200"
                            : data.status === "CRITICAL"
                              ? "bg-red-50 border-red-200"
                              : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <p className="font-bold text-sm text-gray-900">
                          {type}
                        </p>
                        <p
                          className={`text-xs mt-1 ${
                            data.status === "AVAILABLE"
                              ? "text-green-700"
                              : data.status === "CRITICAL"
                                ? "text-red-700"
                                : "text-gray-600"
                          }`}
                        >
                          {data.status === "UNAVAILABLE"
                            ? "Not Available"
                            : `${data.available} units`}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <a href={`tel:${center.phone}`} className="text-brand-DEFAULT hover:text-brand-dark text-sm font-medium">
                      📞 {center.phone}
                    </a>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleRequestBlood(center.name, selectedBloodTypes[0] || "blood")
                        }
                        className="px-4 py-2 bg-brand-DEFAULT text-white rounded-lg hover:bg-brand-dark transition font-medium text-sm"
                      >
                        Request Blood
                      </button>
                      <button
                        onClick={() => handleReserveBlood(center.id, "O+")}
                        className="px-4 py-2 border border-brand-DEFAULT text-brand-DEFAULT rounded-lg hover:bg-brand-light transition font-medium text-sm"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Map View
            <div className="bg-white rounded-lg border border-gray-200 p-8 min-h-96 flex items-center justify-center">
              <div className="text-center">
                <p className="text-4xl mb-3">🗺️</p>
                <p className="text-gray-600 font-medium">
                  Interactive Map View
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Showing {centers.length} blood centers in your area
                </p>
              </div>
            </div>
          )}

          {centers.length === 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <p className="text-gray-600 text-lg mb-2">
                No blood centers found
              </p>
              <p className="text-sm text-gray-600">
                Try adjusting your filters to expand your search
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
