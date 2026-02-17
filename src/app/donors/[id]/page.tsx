"use client";

import { useState } from "react";
import { toast } from "sonner";

interface DonationRecord {
  id: string;
  date: string;
  center: string;
  volume: string;
  status: "COMPLETED" | "PENDING" | "CANCELLED";
}

interface Milestone {
  name: string;
  icon: string;
  description: string;
  achieved: boolean;
}

export default function DonorProfile({ params }: { params: { id: string } }) {
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const donorData = {
    id: params.id,
    name: "Sarah Anderson",
    bloodType: "O-",
    avatar: "👩‍⚕️",
    joinDate: "January 2022",
    totalDonations: 12,
    totalUnitsContributed: 6000,
    certification: "Gold Certified Donor",
    certificationBadge: "🏅",
    impact: {
      livesImpacted: 45,
      emergencyDonations: 3,
      regularDonations: 9,
    },
    stats: {
      consistency: "95%",
      reliability: "100%",
      communityRating: "4.9",
    },
    nearestCenter: {
      name: "Central Blood Bank",
      distance: 2.5,
      address: "Downtown Medical Center",
      hours: "9:00 AM - 6:00 PM",
    },
    upcomingAppointment: {
      dateTime: "October 28, 2024 at 2:30 PM",
      center: "Central Blood Bank",
      status: "SCHEDULED",
    },
  };

  const donations: DonationRecord[] = [
    {
      id: "1",
      date: "Oct 15, 2024",
      center: "Central Blood Bank",
      volume: "450 ml",
      status: "COMPLETED",
    },
    {
      id: "2",
      date: "Sep 20, 2024",
      center: "St. Jude Medical",
      volume: "450 ml",
      status: "COMPLETED",
    },
    {
      id: "3",
      date: "Aug 10, 2024",
      center: "Red Cross",
      volume: "450 ml",
      status: "COMPLETED",
    },
    {
      id: "4",
      date: "Jul 05, 2024",
      center: "Central Blood Bank",
      volume: "450 ml",
      status: "COMPLETED",
    },
  ];

  const milestones: Milestone[] = [
    {
      name: "First Drip",
      icon: "🩸",
      description: "Complete your first donation",
      achieved: true,
    },
    {
      name: "5 Timer",
      icon: "⭐",
      description: "Donate 5 times",
      achieved: true,
    },
    {
      name: "Hero Class",
      icon: "🦸",
      description: "Complete 10 donations",
      achieved: true,
    },
    {
      name: "Lifesaver",
      icon: "💚",
      description: "Save 50+ lives",
      achieved: false,
    },
  ];

  const handleScheduleDonation = () => {
    toast.success("Donation scheduled! Check your email for confirmation.");
    setShowScheduleModal(false);
  };

  const handleShareStats = () => {
    toast.success("Stats copied to clipboard!");
  };

  return (
    <div className="space-y-8">
      {/* Header Profile Card */}
      <div className="bg-gradient-to-r from-brand-DEFAULT to-brand-dark rounded-lg p-8 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-6">
            <div className="text-7xl">{donorData.avatar}</div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{donorData.name}</h1>
              <div className="space-y-2">
                <p className="text-brand-light flex items-center gap-2">
                  <span>🩸 Blood Type: {donorData.bloodType}</span>
                </p>
                <p className="text-brand-light flex items-center gap-2">
                  <span>{donorData.certificationBadge} {donorData.certification}</span>
                </p>
                <p className="text-brand-light text-sm">
                  Member since {donorData.joinDate}
                </p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold mb-1">{donorData.totalDonations}</p>
            <p className="text-brand-light">Total Donations</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Stats & Actions */}
        <div className="lg:col-span-1 space-y-6">
          {/* Impact Stats */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Impact Metrics
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Lives Impacted</span>
                <span className="text-2xl font-bold text-brand-DEFAULT">
                  {donorData.impact.livesImpacted}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">
                  Emergency Donations
                </span>
                <span className="text-2xl font-bold text-orange-600">
                  {donorData.impact.emergencyDonations}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">
                  Regular Donations
                </span>
                <span className="text-2xl font-bold text-green-600">
                  {donorData.impact.regularDonations}
                </span>
              </div>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Performance
            </h2>
            <div className="space-y-4">
              {Object.entries(donorData.stats).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <span className="text-sm font-bold text-brand-DEFAULT">
                      {value}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-green-600"
                      style={{
                        width: value === "100%" ? "100%" : value === "95%" ? "95%" : "98%",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => setShowScheduleModal(true)}
              className="w-full bg-brand-DEFAULT text-white py-3 rounded-lg hover:bg-brand-dark transition font-semibold flex items-center justify-center gap-2"
            >
              📅 Schedule Donation
            </button>
            <button
              onClick={handleShareStats}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2"
            >
              📊 Share Stats
            </button>
          </div>

          {/* Nearest Center */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-sm font-semibold text-blue-900 mb-3">
              Nearest Blood Center
            </h3>
            <div className="space-y-2">
              <p className="font-semibold text-blue-900">
                {donorData.nearestCenter.name}
              </p>
              <p className="text-sm text-blue-800">
                📍 {donorData.nearestCenter.address}
              </p>
              <p className="text-sm text-blue-800">
                📏 {donorData.nearestCenter.distance}km away
              </p>
              <p className="text-sm text-blue-800">
                🕐 {donorData.nearestCenter.hours}
              </p>
              <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                Get Directions
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Donations & Milestones */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Appointment */}
          {donorData.upcomingAppointment && (
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-green-900 mb-2">
                    ✓ Appointment Scheduled
                  </h3>
                  <p className="text-green-800 mb-1">
                    <strong>{donorData.upcomingAppointment.dateTime}</strong>
                  </p>
                  <p className="text-sm text-green-800">
                    📍 {donorData.upcomingAppointment.center}
                  </p>
                </div>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium text-sm">
                  Reschedule
                </button>
              </div>
            </div>
          )}

          {/* Milestones */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Achievements
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {milestones.map((milestone, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border text-center ${
                    milestone.achieved
                      ? "bg-yellow-50 border-yellow-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="text-3xl mb-2">{milestone.icon}</div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">
                    {milestone.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {milestone.description}
                  </p>
                  {milestone.achieved && (
                    <p className="text-xs text-yellow-700 mt-2 font-bold">
                      ✓ ACHIEVED
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Donation History */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Donation History
              </h2>
              <a
                href="#"
                className="text-brand-DEFAULT hover:text-brand-dark text-sm font-medium"
              >
                View All
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                      DATE
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                      CENTER
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                      VOLUME
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation) => (
                    <tr
                      key={donation.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="py-4 px-4 text-sm text-gray-700">
                        {donation.date}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">
                        {donation.center}
                      </td>
                      <td className="py-4 px-4 text-sm font-medium text-gray-900">
                        {donation.volume}
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-xs font-bold text-green-600 tracking-wider">
                          ✓ {donation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Schedule Donation
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-DEFAULT"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time
                </label>
                <input
                  type="time"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-DEFAULT"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Center
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-DEFAULT">
                  <option>Central Blood Bank</option>
                  <option>St. Jude Medical</option>
                  <option>Red Cross</option>
                </select>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-800">
                  💡 <strong>Tip:</strong> You can donate every 56 days to maintain optimum
                  health.
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleDonation}
                className="flex-1 px-4 py-2 bg-brand-DEFAULT text-white rounded-lg hover:bg-brand-dark transition font-medium"
              >
                Confirm Slot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
