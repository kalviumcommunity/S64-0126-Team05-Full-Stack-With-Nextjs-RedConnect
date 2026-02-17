"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

interface KPI {
  label: string;
  value: string | number;
  change: number;
  icon: string;
  color: string;
}

interface DonationItem {
  id?: string;
  hospitalName?: string;
  name?: string;
  bloodType?: string;
  createdAt?: string;
}

interface ActivityItem {
  id: string;
  txId: string;
  source: string;
  bloodGroup: string;
  volume: string;
  date: string;
  time: string;
  status: "URGENT" | "COMPLETED" | "PENDING";
}

export default function HospitalDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("Daily");

  // Fetch blood donation data for activities
  const { data: donationData, isLoading: isLoadingDonations } = useSWR(
    "/api/blood-donation?limit=10",
    fetcher,
    { revalidateOnFocus: false }
  );

  const isLoading = isLoadingDonations;

  const kpis: KPI[] = [
    {
      label: "TOTAL BLOOD UNITS",
      value: "1,240",
      change: 5.2,
      icon: "🩸",
      color: "text-red-600",
    },
    {
      label: "EMERGENCY REQUESTS",
      value: "8",
      change: -2.4,
      icon: "🆘",
      color: "text-orange-600",
    },
    {
      label: "SUCCESSFUL MATCHES",
      value: "452",
      change: 12,
      icon: "✓",
      color: "text-green-600",
    },
  ];

  const activities: ActivityItem[] = useMemo(() => {
    if (!donationData?.data || !Array.isArray(donationData.data)) {
      return [
        {
          id: "1",
          txId: "#TX-90214",
          source: "St. Jude Medical",
          bloodGroup: "O-",
          volume: "450ml",
          date: "Oct 20",
          time: "02:30 PM",
          status: "COMPLETED" as const,
        },
        {
          id: "2",
          txId: "#TX-90213",
          source: "Emergency Ward",
          bloodGroup: "AB+",
          volume: "450ml",
          date: "Oct 19",
          time: "11:15 AM",
          status: "URGENT" as const,
        },
        {
          id: "3",
          txId: "#TX-90212",
          source: "Blood Bank",
          bloodGroup: "B-",
          volume: "450ml",
          date: "Oct 18",
          time: "08:45 AM",
          status: "PENDING" as const,
        },
      ];
    }

    return donationData.data.slice(0, 3).map((item: DonationItem, idx: number) => {
      const createdAtDate = item.createdAt ? new Date(item.createdAt) : new Date();
      return {
        id: item.id || String(idx + 1),
        txId: `#TX-${90214 - idx}`,
        source: item.hospitalName || item.name || "Blood Bank",
        bloodGroup: item.bloodType || "O-",
        volume: "450ml",
        date: createdAtDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        time: createdAtDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        status: (["URGENT", "COMPLETED", "PENDING"] as const)[idx % 3],
      };
    });
  }, [donationData]);

  const bloodTypePercentages = useMemo(() => {
    return ["A+", "A-", "B+", "B-", "O+", "O-", "AB+"].map(
      (bloodType, idx) => ({
        bloodType,
        percentage: ((idx + 1) * 14) % 100,
      })
    );
  }, []);

  return (
    <div className={`space-y-8 ${isLoading ? "opacity-75 pointer-events-none" : ""}`}>
      {isLoading && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg px-6 py-3 z-50">
          <p className="text-gray-700 font-medium">Loading dashboard data...</p>
        </div>
      )}
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Hospital Overview
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Showing 14 available centers near your current location.
          </p>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search donors, units, or requests..."
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-DEFAULT w-64"
          />
          <button className="p-2 hover:bg-gray-100 rounded-lg transition">
            🔔
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition">
            ⚫
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg p-6 border border-gray-200"
          >
            <p className="text-xs font-semibold text-gray-600 tracking-wider mb-2">
              {kpi.label}
            </p>
            <div className="flex items-end justify-between">
              <div>
                <p className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</p>
                <p className="text-xs text-gray-600 mt-1">
                  {kpi.change > 0 ? "↗" : "↘"}{" "}
                  {Math.abs(kpi.change).toFixed(1)}% from last week
                </p>
              </div>
              <span className="text-4xl">{kpi.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Blood Stock Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Blood Stock Levels by Group
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedPeriod("Daily")}
                className={`px-3 py-1 rounded text-sm transition ${
                  selectedPeriod === "Daily"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setSelectedPeriod("Weekly")}
                className={`px-3 py-1 rounded text-sm transition ${
                  selectedPeriod === "Weekly"
                    ? "bg-brand-DEFAULT text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Weekly
              </button>
            </div>
          </div>

          {/* Simple Bar Chart */}
          <div className="space-y-6">
            {bloodTypePercentages.map(({ bloodType, percentage }) => (
              <div key={bloodType}>
                <p className="text-sm font-medium text-gray-900 mb-2">
                  {bloodType}
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-8 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full"
                      style={{
                        width: `${percentage}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 w-12 text-right">
                    {percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Alert */}
        <div className="space-y-6">
          {/* Quick Actions*/}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition text-left">
                <span className="text-2xl">📥</span>
                <div>
                  <p className="font-medium text-gray-900">
                    Request Blood
                  </p>
                  <p className="text-xs text-gray-600">
                    Initiate urgent transfer
                  </p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition text-left">
                <span className="text-2xl">🔄</span>
                <div>
                  <p className="font-medium text-gray-900">
                    Update Inventory
                  </p>
                  <p className="text-xs text-gray-600">
                    Manual stock adjustment
                  </p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition text-left">
                <span className="text-2xl">📅</span>
                <div>
                  <p className="font-medium text-gray-900">
                    Schedule Drive
                  </p>
                  <p className="text-xs text-gray-600">
                    Plan donation campaign
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Global Update Alert */}
          <div className="bg-brand-DEFAULT text-white rounded-lg p-6">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl">⚠️</span>
              <div>
                <h4 className="font-semibold mb-2">GLOBAL UPDATE</h4>
                <p className="text-sm">
                  System-wide shortage of O-Negative reported. Please prioritize local
                  donation requests for this type.
                </p>
              </div>
            </div>
            <button className="bg-white text-brand-DEFAULT px-4 py-1.5 rounded text-sm font-medium hover:bg-gray-100 transition">
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h2>
          <a href="#" className="text-brand-DEFAULT hover:text-brand-dark text-sm font-medium">
            View All Activities
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                  TRANSACTION ID
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                  SOURCE / ENTITY
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                  BLOOD GROUP
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                  VOLUME
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                  DATE & TIME
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr
                  key={activity.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">
                    {activity.txId}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700">
                    {activity.source}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      {activity.bloodGroup}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700">
                    {activity.volume}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700">
                    {activity.date}, {activity.time}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-xs font-bold tracking-wider ${
                        activity.status === "URGENT"
                          ? "text-red-600"
                          : activity.status === "COMPLETED"
                            ? "text-green-600"
                            : "text-orange-600"
                      }`}
                    >
                      {activity.status === "URGENT" && "● "}
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
