"use client";

import { useState } from "react";
import Link from "next/link";

/* ── Icons ── */

function ClipboardIcon({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /><path d="M9 14l2 2 4-4" /></svg>);
}
function StarIcon({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>);
}
function HeartHandIcon({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /><path d="M2.5 12.5l3.5 3.5 7-7" transform="translate(4 4)" opacity="0.5" /></svg>);
}
function ArrowUpIcon({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>);
}
function PlusIcon({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>);
}
function RefreshIcon({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>);
}
function ClockIcon({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>);
}
function InfoIcon({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>);
}
function HospitalIcon({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M5 21V7l8-4 8 4v14" /><path d="M10 9a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" /><line x1="9" y1="21" x2="9" y2="15" /><line x1="15" y1="21" x2="15" y2="15" /></svg>);
}

/* ── Dashboard Content ── */

export default function Dashboard() {
  const [view, setView] = useState<"Daily" | "Weekly">("Weekly");

  const stockLevels = [
    { group: "A+", level: 75, status: "normal" },
    { group: "A-", level: 45, status: "critical" },
    { group: "B+", level: 60, status: "normal" },
    { group: "B-", level: 30, status: "critical" },
    { group: "O+", level: 85, status: "normal" },
    { group: "O-", level: 20, status: "critical" },
    { group: "AB+", level: 50, status: "normal" },
    { group: "AB-", level: 40, status: "critical" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Card 1: Total Blood Units */}
        <div className="bg-white dark:bg-[#111118] p-5 sm:p-6 rounded-2xl border border-gray-100 dark:border-[#1f1f2e] shadow-sm dark:shadow-none flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Total Blood Units</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">1,240 <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Units</span></h3>
            <p className="flex items-center text-sm font-medium text-green-600 dark:text-green-400">
              <ArrowUpIcon className="w-4 h-4 mr-1 flex-shrink-0" />
              +5.2% from last week
            </p>
          </div>
          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-600 dark:text-red-400 flex-shrink-0">
            <ClipboardIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
        </div>

        {/* Card 2: Emergency Requests */}
        <div className="bg-white dark:bg-[#111118] p-5 sm:p-6 rounded-2xl border border-gray-100 dark:border-[#1f1f2e] shadow-sm dark:shadow-none flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Emergency Requests</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">8 <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</span></h3>
            <p className="flex items-center text-sm font-medium text-red-600 dark:text-red-400">
              <InfoIcon className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="truncate">Critical: 2 immediate priority</span>
            </p>
          </div>
          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-600 dark:text-red-400 flex-shrink-0">
            <StarIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
        </div>

        {/* Card 3: Successful Matches */}
        <div className="bg-white dark:bg-[#111118] p-5 sm:p-6 rounded-2xl border border-gray-100 dark:border-[#1f1f2e] shadow-sm dark:shadow-none flex items-start justify-between gap-4 sm:col-span-2 lg:col-span-1">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Successful Matches</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">452 <span className="text-sm font-medium text-gray-500 dark:text-gray-400">This Month</span></h3>
            <p className="flex items-center text-sm font-medium text-green-600 dark:text-green-400">
              <ArrowUpIcon className="w-4 h-4 mr-1 flex-shrink-0" />
              +12% conversion rate
            </p>
          </div>
          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-600 dark:text-red-400 flex-shrink-0">
            <HeartHandIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Blood Stock Chart (Span 2/3) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111118] p-5 sm:p-6 rounded-2xl border border-gray-100 dark:border-[#1f1f2e] shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between mb-6 sm:mb-8 gap-4">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate">Blood Stock Levels by Group</h3>
            <div className="flex bg-gray-100 dark:bg-[#16161f] p-1 rounded-lg flex-shrink-0">
              <button
                onClick={() => setView("Daily")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${view === "Daily" ? "bg-white dark:bg-[#111118] text-gray-900 dark:text-white shadow-sm" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
              >
                Daily
              </button>
              <button
                onClick={() => setView("Weekly")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${view === "Weekly" ? "bg-red-600 text-white shadow-sm" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
              >
                Weekly
              </button>
            </div>
          </div>

          {/* Chart Simulation */}
          <div className="h-48 sm:h-64 flex items-end justify-between px-2 sm:px-4 pb-4 gap-2 sm:gap-4">
            {stockLevels.map((item) => (
              <div key={item.group} className="flex flex-col items-center flex-1 group relative">
                <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap">
                  {item.level} units
                </div>
                <div
                  className={`w-full max-w-[40px] rounded-t-lg transition-all duration-500 ${item.status === "critical" ? "bg-red-700 hover:bg-red-800" : "bg-red-500 hover:bg-red-600"}`}
                  style={{ height: `${item.level}%` }}
                />
                <span className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 mt-2 sm:mt-3">{item.group}</span>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Normal Stock</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-700" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Critical Stock</span>
            </div>
          </div>
        </div>

        {/* Right: Quick Actions & Alerts (Span 1/3) */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-[#111118] p-5 sm:p-6 rounded-2xl border border-gray-100 dark:border-[#1f1f2e] shadow-sm dark:shadow-none">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/requests" className="w-full">
                <button className="w-full flex items-center gap-4 p-3 sm:p-4 rounded-xl border border-gray-100 dark:border-[#1f1f2e] hover:border-red-100 dark:hover:border-red-900/30 hover:bg-red-50/50 dark:hover:bg-red-900/10 transition group text-left">
                  <div className="p-2.5 sm:p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition flex-shrink-0">
                    <PlusIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white group-hover:text-red-700 dark:group-hover:text-red-400 truncate">Request Blood</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Initiate urgent transfer</p>
                  </div>
                </button>
              </Link>

              <Link href="/inventory" className="w-full">
                <button className="w-full flex items-center gap-4 p-3 sm:p-4 rounded-xl border border-gray-100 dark:border-[#1f1f2e] hover:border-blue-100 dark:hover:border-blue-900/30 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition group text-left">
                  <div className="p-2.5 sm:p-3 bg-gray-50 dark:bg-[#16161f] text-gray-600 dark:text-gray-400 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition flex-shrink-0">
                    <RefreshIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 truncate">Update Inventory</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Manual stock adjustment</p>
                  </div>
                </button>
              </Link>

              <Link href="/requests" className="w-full">
                <button className="w-full flex items-center gap-4 p-3 sm:p-4 rounded-xl border border-gray-100 dark:border-[#1f1f2e] hover:border-green-100 dark:hover:border-green-900/30 hover:bg-green-50/50 dark:hover:bg-green-900/10 transition group text-left">
                  <div className="p-2.5 sm:p-3 bg-gray-50 dark:bg-[#16161f] text-gray-600 dark:text-gray-400 rounded-lg group-hover:bg-green-100 dark:group-hover:bg-green-900/20 group-hover:text-green-600 dark:group-hover:text-green-400 transition flex-shrink-0">
                    <ClockIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-400 truncate">Schedule Drive</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Plan donation campaign</p>
                  </div>
                </button>
              </Link>
            </div>
          </div>

          {/* Global Update Alert */}
          <div className="bg-red-600 p-5 sm:p-6 rounded-2xl shadow-lg relative overflow-hidden text-white">
            <div className="absolute -bottom-4 -right-4 bg-red-500 rounded-full p-4 transform rotate-12 opacity-50">
              <HospitalIcon className="w-24 h-24 text-red-900" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <InfoIcon className="w-5 h-5 flex-shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">Global Update</span>
              </div>
              <p className="text-sm font-medium leading-relaxed mb-4">
                System-wide shortage of O-Negative reported. Please prioritize local donation requests for this type.
              </p>
              <Link href="/reports">
                <button className="px-4 py-2 bg-white text-red-700 text-xs font-bold rounded-lg hover:bg-gray-100 transition shadow-sm">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-[#111118] rounded-2xl border border-gray-100 dark:border-[#1f1f2e] shadow-sm dark:shadow-none overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-gray-100 dark:border-[#1f1f2e] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h3>
          <Link href="/requests">
            <button className="text-sm font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition whitespace-nowrap">
              View All Activities
            </button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[600px]">
            <thead className="bg-gray-50 dark:bg-[#16161f] text-gray-500 dark:text-gray-400 uppercase text-xs font-semibold">
              <tr>
                <th className="px-5 sm:px-6 py-4">Transaction ID</th>
                <th className="px-5 sm:px-6 py-4">Source / Entity</th>
                <th className="px-5 sm:px-6 py-4">Blood Group</th>
                <th className="px-5 sm:px-6 py-4">Volume</th>
                <th className="px-5 sm:px-6 py-4">Date &amp; Time</th>
                <th className="px-5 sm:px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#1f1f2e]">
              <tr className="hover:bg-gray-50 dark:hover:bg-[#16161f] transition">
                <td className="px-5 sm:px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">#TX-90214</td>
                <td className="px-5 sm:px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs flex-shrink-0">S</div>
                    <span className="font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">St. Jude Medical</span>
                  </div>
                </td>
                <td className="px-5 sm:px-6 py-4">
                  <span className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-2.5 py-1 rounded font-semibold text-xs border border-red-100 dark:border-red-900/30">O-</span>
                </td>
                <td className="px-5 sm:px-6 py-4 text-gray-600 dark:text-gray-300">450ml</td>
                <td className="px-5 sm:px-6 py-4 text-gray-500 dark:text-gray-400 whitespace-nowrap">Oct 24, 14:32</td>
                <td className="px-5 sm:px-6 py-4">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
                    Urgent
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
