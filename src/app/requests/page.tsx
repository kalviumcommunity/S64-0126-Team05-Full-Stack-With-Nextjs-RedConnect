"use client";

import { useState } from "react";
import { toast } from "sonner";

interface BloodRequest {
  id: string;
  requestId: string;
  hospital: string;
  bloodType: string;
  units: number;
  priority: "CRITICAL" | "HIGH" | "NORMAL";
  requestDate: string;
  requiredBy: string;
  status: "PENDING" | "FULFILLED" | "PARTIAL" | "CANCELLED";
  notes?: string;
}

export default function BloodRequests() {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<"CRITICAL" | "HIGH" | "NORMAL">(
    "NORMAL"
  );
  const [filterStatus, setFilterStatus] = useState<"ALL" | "PENDING" | "FULFILLED" | "PARTIAL" | "CANCELLED">("ALL");

  const mockRequests: BloodRequest[] = [
    {
      id: "1",
      requestId: "#REQ-2024-001",
      hospital: "City General Hospital",
      bloodType: "O-",
      units: 20,
      priority: "CRITICAL",
      requestDate: "Oct 24, 2024",
      requiredBy: "Oct 24, 2024 (URGENT)",
      status: "PENDING",
      notes: "Emergency surgery scheduled",
    },
    {
      id: "2",
      requestId: "#REQ-2024-002",
      hospital: "St. Jude Medical Center",
      bloodType: "A+",
      units: 15,
      priority: "HIGH",
      requestDate: "Oct 24, 2024",
      requiredBy: "Oct 25, 2024",
      status: "PARTIAL",
      notes: "Trauma patient, ongoing treatment",
    },
    {
      id: "3",
      requestId: "#REQ-2024-003",
      hospital: "Central Hospital",
      bloodType: "B+",
      units: 10,
      priority: "NORMAL",
      requestDate: "Oct 23, 2024",
      requiredBy: "Oct 26, 2024",
      status: "FULFILLED",
    },
    {
      id: "4",
      requestId: "#REQ-2024-004",
      hospital: "Westside Hospital",
      bloodType: "AB-",
      units: 5,
      priority: "HIGH",
      requestDate: "Oct 23, 2024",
      requiredBy: "Oct 24, 2024",
      status: "FULFILLED",
    },
    {
      id: "5",
      requestId: "#REQ-2024-005",
      hospital: "North General Hospital",
      bloodType: "O+",
      units: 8,
      priority: "NORMAL",
      requestDate: "Oct 22, 2024",
      requiredBy: "Oct 25, 2024",
      status: "CANCELLED",
      notes: "Patient condition improved, no longer needed",
    },
  ];

  const filteredRequests = mockRequests.filter((req) =>
    filterStatus === "ALL" ? true : req.status === filterStatus
  );

  const stats = {
    critical: mockRequests.filter((r) => r.status === "PENDING" && r.priority === "CRITICAL")
      .length,
    pending: mockRequests.filter((r) => r.status === "PENDING").length,
    fulfilled: mockRequests.filter((r) => r.status === "FULFILLED").length,
    totalUnits: mockRequests.reduce((sum, r) => sum + r.units, 0),
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "CRITICAL":
        return "bg-red-100 text-red-800";
      case "HIGH":
        return "bg-orange-100 text-orange-800";
      case "NORMAL":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "text-orange-600";
      case "FULFILLED":
        return "text-green-600";
      case "PARTIAL":
        return "text-blue-600";
      case "CANCELLED":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  const handleCreateRequest = () => {
    toast.success("Blood request submitted successfully!");
    setShowRequestModal(false);
  };

  const handleFulfillRequest = (): void => {
    toast.success("Request marked as fulfilled");
  };

  const handleCancelRequest = (): void => {
    toast.info("Request cancelled");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Blood Requests
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage incoming and outgoing blood requests across the network
          </p>
        </div>
        <button
          onClick={() => setShowRequestModal(true)}
          className="px-6 py-3 bg-brand-DEFAULT text-white rounded-lg hover:bg-brand-dark transition font-semibold flex items-center gap-2"
        >
          ➕ New Request
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-xs font-semibold text-gray-600 tracking-wider mb-2">
            CRITICAL PENDING
          </p>
          <p className="text-3xl font-bold text-red-600">{stats.critical}</p>
          <p className="text-xs text-gray-600 mt-2">Requiring immediate action</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-xs font-semibold text-gray-600 tracking-wider mb-2">
            TOTAL PENDING
          </p>
          <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
          <p className="text-xs text-gray-600 mt-2">Awaiting fulfillment</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-xs font-semibold text-gray-600 tracking-wider mb-2">
            FULFILLED TODAY
          </p>
          <p className="text-3xl font-bold text-green-600">{stats.fulfilled}</p>
          <p className="text-xs text-gray-600 mt-2">Successfully completed</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-xs font-semibold text-gray-600 tracking-wider mb-2">
            TOTAL UNITS REQUESTED
          </p>
          <p className="text-3xl font-bold text-blue-600">{stats.totalUnits}</p>
          <p className="text-xs text-gray-600 mt-2">Across all requests</p>
        </div>
      </div>

      {/* Requests List with Filters */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            All Requests
          </h2>
          <div className="flex gap-2">
            {(["ALL", "PENDING", "FULFILLED", "PARTIAL", "CANCELLED"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 rounded text-xs font-semibold transition ${
                  filterStatus === status
                    ? "bg-brand-DEFAULT text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {filteredRequests.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-2">
              No requests found
            </p>
            <p className="text-sm text-gray-600">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                    REQUEST ID
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                    HOSPITAL
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                    BLOOD TYPE
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                    UNITS
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                    PRIORITY
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                    REQUIRED BY
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                    STATUS
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-4 text-sm font-bold text-gray-900">
                      {request.requestId}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      {request.hospital}
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        {request.bloodType}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">
                      {request.units} units
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(
                          request.priority
                        )}`}
                      >
                        {request.priority}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      {request.requiredBy}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`text-xs font-bold tracking-wider ${getStatusColor(
                          request.status
                        )}`}
                      >
                        {request.status === "PENDING" && "● "}
                        {request.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        {request.status === "PENDING" && (
                          <>
                            <button
                              onClick={() => handleFulfillRequest(request.id)}
                              className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition"
                            >
                              ✓ Fulfill
                            </button>
                            <button
                              onClick={() => handleCancelRequest(request.id)}
                              className="px-2 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-700 transition"
                            >
                              ✕ Cancel
                            </button>
                          </>
                        )}
                        <button className="px-2 py-1 border border-gray-300 rounded text-xs hover:bg-gray-100 transition">
                          👁️ View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* New Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 overflow-y-auto max-h-96">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              New Blood Request
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Type
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-DEFAULT">
                  <option>Select blood type</option>
                  <option>O-</option>
                  <option>O+</option>
                  <option>A-</option>
                  <option>A+</option>
                  <option>B-</option>
                  <option>B+</option>
                  <option>AB-</option>
                  <option>AB+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Units
                </label>
                <input
                  type="number"
                  placeholder="e.g., 10"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-DEFAULT"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={selectedPriority}
                  onChange={(e) =>
                    setSelectedPriority(e.target.value as "CRITICAL" | "HIGH" | "NORMAL")
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-DEFAULT"
                >
                  <option value="NORMAL">Normal</option>
                  <option value="HIGH">High</option>
                  <option value="CRITICAL">Critical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required By
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-DEFAULT"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  placeholder="Any additional details..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-DEFAULT h-24 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowRequestModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRequest}
                className="flex-1 px-4 py-2 bg-brand-DEFAULT text-white rounded-lg hover:bg-brand-dark transition font-medium"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
