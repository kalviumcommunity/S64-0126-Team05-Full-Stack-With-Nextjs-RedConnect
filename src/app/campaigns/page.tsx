"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Campaign {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  status: "CRITICAL" | "SCHEDULED" | "ACTIVE" | "COMPLETED";
  targetUnits: number;
  collectedUnits: number;
  donors: number;
  image?: string;
}

interface AnalyticsData {
  month: string;
  unitsCollected: number;
}

interface CampaignFormData {
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  targetUnits: string;
}

export default function NGOCampaigns() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filteredStatus, setFilteredStatus] = useState<"ALL" | "CRITICAL" | "SCHEDULED" | "ACTIVE" | "COMPLETED">("ALL");

  // Initialize form
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      location: "",
      startDate: "",
      endDate: "",
      targetUnits: "",
    },
  });

  const mockCampaigns: Campaign[] = [
    {
      id: "1",
      name: "Holiday Blood Drive 2024",
      location: "Downtown Community Center",
      startDate: "Oct 20, 2024",
      endDate: "Nov 15, 2024",
      status: "ACTIVE",
      targetUnits: 500,
      collectedUnits: 342,
      donors: 128,
    },
    {
      id: "2",
      name: "Emergency O-Negative Campaign",
      location: "Multiple Hospitals",
      startDate: "Oct 15, 2024",
      endDate: "Oct 30, 2024",
      status: "CRITICAL",
      targetUnits: 200,
      collectedUnits: 45,
      donors: 18,
    },
    {
      id: "3",
      name: "Spring Health Initiative",
      location: "University Campus",
      startDate: "Mar 1, 2025",
      endDate: "Mar 31, 2025",
      status: "SCHEDULED",
      targetUnits: 300,
      collectedUnits: 0,
      donors: 0,
    },
    {
      id: "4",
      name: "Summer Camp Blood Drive",
      location: "Central Park",
      startDate: "Jun 1, 2024",
      endDate: "Jun 30, 2024",
      status: "COMPLETED",
      targetUnits: 250,
      collectedUnits: 278,
      donors: 105,
    },
  ];

  const analyticsData: AnalyticsData[] = [
    { month: "May", unitsCollected: 180 },
    { month: "Jun", unitsCollected: 278 },
    { month: "Jul", unitsCollected: 220 },
    { month: "Aug", unitsCollected: 245 },
    { month: "Sep", unitsCollected: 310 },
    { month: "Oct", unitsCollected: 387 },
  ];

  const activeCampaigns = mockCampaigns.filter((c) =>
    filteredStatus === "ALL" ? true : c.status === filteredStatus
  );

  const totalUnitsCollected = mockCampaigns.reduce((sum, c) => sum + c.collectedUnits, 0);
  const totalDonors = mockCampaigns.reduce((sum, c) => sum + c.donors, 0);
  const activeCampaignCount = mockCampaigns.filter((c) => c.status === "ACTIVE").length;

  const handleCreateCampaign = async (formData: CampaignFormData): Promise<void> => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/blood-donation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${typeof window !== "undefined" ? localStorage.getItem("token") : ""}`,
        },
        body: JSON.stringify({
          bloodType: "Mixed",
          quantity: parseInt(formData.targetUnits),
          hospitalName: formData.location,
          status: "ACTIVE",
          donationDate: formData.startDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create campaign");
      }

      await response.json();
      toast.success("Campaign created successfully!");
      reset();
      setShowCreateModal(false);
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast.error("Failed to create campaign. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCampaign = (): void => {
    toast.info("Edit campaign modal opened");
  };

  const handleDeleteCampaign = (): void => {
    toast.success("Campaign deleted successfully");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CRITICAL":
        return "bg-red-100 text-red-800";
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "SCHEDULED":
        return "bg-blue-100 text-blue-800";
      case "COMPLETED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "CRITICAL":
        return "⚠️";
      case "ACTIVE":
        return "🔴";
      case "SCHEDULED":
        return "📅";
      case "COMPLETED":
        return "✓";
      default:
        return "•";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with CTA */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Campaign Management
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage and track your blood donation campaigns
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-brand-DEFAULT text-white rounded-lg hover:bg-brand-dark transition font-semibold flex items-center gap-2"
        >
          ➕ Create Campaign
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-xs font-semibold text-gray-600 tracking-wider mb-2">
            TOTAL UNITS COLLECTED
          </p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-red-600">{totalUnitsCollected}</p>
              <p className="text-xs text-gray-600 mt-1">
                ↗ 12.5% from last month
              </p>
            </div>
            <span className="text-4xl">🩸</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-xs font-semibold text-gray-600 tracking-wider mb-2">
            TOTAL DONORS REGISTERED
          </p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-blue-600">{totalDonors}</p>
              <p className="text-xs text-gray-600 mt-1">
                ↗ 8.2% from last month
              </p>
            </div>
            <span className="text-4xl">👥</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-xs font-semibold text-gray-600 tracking-wider mb-2">
            ACTIVE CAMPAIGNS
          </p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-green-600">{activeCampaignCount}</p>
              <p className="text-xs text-gray-600 mt-1">
                Running campaigns
              </p>
            </div>
            <span className="text-4xl">📢</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts & Analytics */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Units Collected Over Time
          </h2>

          {/* Simple Bar Chart */}
          <div className="space-y-6">
            {analyticsData.map((data) => (
              <div key={data.month}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {data.month}
                  </span>
                  <span className="text-sm font-bold text-brand-DEFAULT">
                    {data.unitsCollected} units
                  </span>
                </div>
                <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full"
                    style={{
                      width: `${(data.unitsCollected / 400) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              📊 Showing 6-month trend with consistent growth in donor participation
            </p>
          </div>
        </div>

        {/* Donor Signups Sidebar */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Donor Sign-ups
          </h2>

          <div className="space-y-3">
            {[
              { name: "Emily Chen", bloodType: "O+", time: "2 mins ago" },
              { name: "Marcus Johnson", bloodType: "A-", time: "15 mins ago" },
              { name: "Sarah Williams", bloodType: "B+", time: "28 mins ago" },
              { name: "David Kumar", bloodType: "AB+", time: "1 hour ago" },
              { name: "Jessica Brown", bloodType: "O-", time: "2 hours ago" },
            ].map((donor, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brand-DEFAULT rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {donor.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {donor.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {donor.bloodType}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-600">{donor.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campaigns List with Filters */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Active Campaigns
          </h2>
          <div className="flex gap-2">
            {(["ALL", "ACTIVE", "CRITICAL", "SCHEDULED", "COMPLETED"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilteredStatus(status)}
                className={`px-3 py-1 rounded text-xs font-semibold transition ${
                  filteredStatus === status
                    ? "bg-brand-DEFAULT text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {activeCampaigns.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-2">
              No campaigns found
            </p>
            <p className="text-sm text-gray-600">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                {/* Campaign Header with Status */}
                <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {campaign.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        📍 {campaign.location}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                        campaign.status
                      )}`}
                    >
                      {getStatusIcon(campaign.status)} {campaign.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    {campaign.startDate} - {campaign.endDate}
                  </p>
                </div>

                {/* Progress & Stats */}
                <div className="p-6 space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Units Progress
                      </span>
                      <span className="text-sm font-bold text-brand-DEFAULT">
                        {campaign.collectedUnits} / {campaign.targetUnits}
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full transition-all"
                        style={{
                          width: `${(campaign.collectedUnits / campaign.targetUnits) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-800">Donors</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {campaign.donors}
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-xs text-green-800">% Complete</p>
                      <p className="text-2xl font-bold text-green-600">
                        {Math.round(
                          (campaign.collectedUnits / campaign.targetUnits) * 100
                        )}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-6 pb-6 flex gap-2">
                  <button
                    onClick={() => handleEditCampaign(campaign.id)}
                    className="flex-1 px-4 py-2 bg-brand-DEFAULT text-white rounded-lg hover:bg-brand-dark transition font-medium text-sm"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCampaign(campaign.id)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium text-sm"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 overflow-y-auto max-h-96">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Create New Campaign
            </h2>

            <form onSubmit={handleSubmit(handleCreateCampaign)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Holiday Blood Drive 2024"
                  {...register("name", { required: "Campaign name is required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-DEFAULT"
                />
                {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g., Downtown Community Center"
                  {...register("location", { required: "Location is required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-DEFAULT"
                />
                {errors.location && <span className="text-xs text-red-500">{errors.location.message}</span>}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    {...register("startDate", { required: "Start date is required" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-DEFAULT"
                  />
                  {errors.startDate && <span className="text-xs text-red-500">{errors.startDate.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    {...register("endDate", { required: "End date is required" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-DEFAULT"
                  />
                  {errors.endDate && <span className="text-xs text-red-500">{errors.endDate.message}</span>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Units
                </label>
                <input
                  type="number"
                  placeholder="e.g., 500"
                  {...register("targetUnits", { required: "Target units is required", min: { value: 1, message: "Must be greater than 0" } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-DEFAULT"
                />
                {errors.targetUnits && <span className="text-xs text-red-500">{errors.targetUnits.message}</span>}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-brand-DEFAULT text-white rounded-lg hover:bg-brand-dark transition font-medium disabled:opacity-50"
                >
                  {isSubmitting ? "Creating..." : "Create Campaign"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
