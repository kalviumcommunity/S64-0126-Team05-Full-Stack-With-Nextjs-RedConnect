"use client";

import { useState } from "react";

interface MonthlyData {
  month: string;
  donations: number;
  donors: number;
  requests: number;
}

interface BloodTypeStats {
  type: string;
  available: number;
  used: number;
  shortage: boolean;
}

export default function Reports() {
  const [selectedMetric, setSelectedMetric] = useState("donations");
  const [dateRange, setDateRange] = useState("6months");

  const monthlyData: MonthlyData[] = [
    { month: "May", donations: 245, donors: 92, requests: 18 },
    { month: "Jun", donations: 312, donors: 115, requests: 22 },
    { month: "Jul", donations: 278, donors: 105, requests: 20 },
    { month: "Aug", donations: 345, donors: 128, requests: 25 },
    { month: "Sep", donations: 401, donors: 145, requests: 28 },
    { month: "Oct", donations: 456, donors: 168, requests: 32 },
  ];

  const bloodTypeStats: BloodTypeStats[] = [
    { type: "O+", available: 145, used: 89, shortage: false },
    { type: "O-", available: 12, used: 34, shortage: true },
    { type: "A+", available: 98, used: 54, shortage: false },
    { type: "A-", available: 28, used: 15, shortage: false },
    { type: "B+", available: 76, used: 42, shortage: false },
    { type: "B-", available: 19, used: 8, shortage: false },
    { type: "AB+", available: 34, used: 18, shortage: false },
    { type: "AB-", available: 8, used: 3, shortage: true },
  ];

  const topDonors = [
    { name: "Sarah Anderson", bloodType: "O-", donations: 12, impact: 45 },
    { name: "Marcus Johnson", bloodType: "A+", donations: 11, impact: 42 },
    { name: "Emily Chen", bloodType: "B+", donations: 10, impact: 38 },
    { name: "David Kumar", bloodType: "O+", donations: 9, impact: 34 },
    { name: "Jessica Brown", bloodType: "A-", donations: 8, impact: 30 },
  ];

  const topHospitals = [
    { name: "City General Hospital", requests: 45, received: 40, fulfillmentRate: 89 },
    { name: "St. Jude Medical Center", requests: 38, received: 35, fulfillmentRate: 92 },
    { name: "Central Hospital", requests: 32, received: 31, fulfillmentRate: 97 },
    { name: "Westside Hospital", requests: 28, received: 26, fulfillmentRate: 93 },
    { name: "North General Hospital", requests: 22, received: 20, fulfillmentRate: 91 },
  ];

  const getMaxValue = () => {
    return Math.max(...monthlyData.map((d) => d[selectedMetric as keyof MonthlyData] as number));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Comprehensive analytics of the RedConnect blood donation network
          </p>
        </div>
        <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-semibold flex items-center gap-2">
          📥 Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 flex gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Range
          </label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-DEFAULT"
          >
            <option value="30days">Last 30 Days</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Metric
          </label>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-DEFAULT"
          >
            <option value="donations">Donations</option>
            <option value="donors">Donors</option>
            <option value="requests">Requests</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-xs font-semibold text-gray-600 tracking-wider mb-2">
            TOTAL DONATIONS
          </p>
          <p className="text-3xl font-bold text-red-600">2,337</p>
          <p className="text-xs text-gray-600 mt-2">↗ 12.5% from last period</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-xs font-semibold text-gray-600 tracking-wider mb-2">
            REGISTERED DONORS
          </p>
          <p className="text-3xl font-bold text-blue-600">753</p>
          <p className="text-xs text-gray-600 mt-2">↗ 8.3% from last period</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-xs font-semibold text-gray-600 tracking-wider mb-2">
            FULFILLMENT RATE
          </p>
          <p className="text-3xl font-bold text-green-600">92.4%</p>
          <p className="text-xs text-gray-600 mt-2">↗ 2.1% from last period</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-xs font-semibold text-gray-600 tracking-wider mb-2">
            LIVES IMPACTED
          </p>
          <p className="text-3xl font-bold text-purple-600">8,864</p>
          <p className="text-xs text-gray-600 mt-2">↗ 15.2% from last period</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Trend
          </h2>

          <div className="space-y-6">
            {monthlyData.map((data) => (
              <div key={data.month}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {data.month}
                  </span>
                  <span className="text-sm font-bold text-brand-DEFAULT">
                    {data[selectedMetric as keyof MonthlyData]}
                  </span>
                </div>
                <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all"
                    style={{
                      width: `${((data[selectedMetric as keyof MonthlyData] as number) / getMaxValue()) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blood Type Availability */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Blood Type Status
          </h2>

          <div className="space-y-3">
            {bloodTypeStats.map((stat) => (
              <div
                key={stat.type}
                className={`p-3 rounded-lg border ${
                  stat.shortage
                    ? "bg-red-50 border-red-200"
                    : "bg-green-50 border-green-200"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p
                      className={`font-bold ${
                        stat.shortage
                          ? "text-red-800"
                          : "text-green-800"
                      }`}
                    >
                      {stat.type} {stat.shortage && "⚠️"}
                    </p>
                    <p
                      className={`text-xs ${
                        stat.shortage
                          ? "text-red-700"
                          : "text-green-700"
                      }`}
                    >
                      Available: {stat.available} | Used: {stat.used}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold text-sm ${
                        stat.shortage
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {Math.round((stat.available / (stat.available + stat.used)) * 100)}%
                    </p>
                    <p className="text-xs text-gray-600">
                      in stock
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Donors and Hospitals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Donors */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Top Donors
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">
                    NAME
                  </th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">
                    TYPE
                  </th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">
                    DONATIONS
                  </th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">
                    IMPACT
                  </th>
                </tr>
              </thead>
              <tbody>
                {topDonors.map((donor, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-3">
                      <p className="font-medium text-gray-900">
                        {donor.name}
                      </p>
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-block bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs">
                        {donor.bloodType}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-medium text-gray-900">
                      {donor.donations}
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-green-600 font-semibold">
                        {donor.impact} lives
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Hospitals */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Top Hospitals
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">
                    HOSPITAL
                  </th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">
                    REQUESTS
                  </th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">
                    RECEIVED
                  </th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">
                    RATE
                  </th>
                </tr>
              </thead>
              <tbody>
                {topHospitals.map((hospital, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-3">
                      <p className="font-medium text-gray-900">
                        {hospital.name}
                      </p>
                    </td>
                    <td className="py-3 px-3 text-gray-900">
                      {hospital.requests}
                    </td>
                    <td className="py-3 px-3 text-gray-900">
                      {hospital.received}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-green-600">
                        {hospital.fulfillmentRate}%
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
  );
}
