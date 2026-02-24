"use client";

import { useState } from "react";

/* ── Icons ── */

function SearchIcon({ className }: { className?: string }) {
    return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>);
}
function CalendarIcon({ className }: { className?: string }) {
    return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>);
}

/* ── Data ── */

const initialDonors = [
    { id: "D-90342", name: "John Doe", group: "O-", volume: "450ml", date: "2024-03-20", status: "Verified" },
    { id: "D-90341", name: "Jane Smith", group: "A+", volume: "450ml", date: "2024-03-19", status: "Verified" },
    { id: "D-90340", name: "Robert Wilson", group: "B+", volume: "450ml", date: "2024-03-18", status: "Pending" },
    { id: "D-90339", name: "Emily Brown", group: "O+", volume: "450ml", date: "2024-03-18", status: "Verified" },
    { id: "D-90338", name: "Michael Kelly", group: "AB-", volume: "450ml", date: "2024-03-17", status: "Verified" },
];

export default function DonorsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const donors = initialDonors.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="min-w-0">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Donor Logs</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Track and manage donor history and donation records.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#111118] border border-gray-200 dark:border-[#1f1f2e] rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#16161f] transition shadow-sm dark:shadow-none flex-shrink-0">
                    <CalendarIcon className="w-4 h-4 flex-shrink-0" />
                    Filter by Date
                </button>
            </div>

            <div className="bg-white dark:bg-[#111118] p-4 rounded-2xl border border-gray-100 dark:border-[#1f1f2e] shadow-sm dark:shadow-none">
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search donors by name or ID..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-[#16161f] border-none rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 transition"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-[#111118] rounded-2xl border border-gray-100 dark:border-[#1f1f2e] shadow-sm dark:shadow-none overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[650px]">
                        <thead className="bg-gray-50 dark:bg-[#16161f] text-gray-500 dark:text-gray-400 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-5 sm:px-6 py-4">Donor ID</th>
                                <th className="px-5 sm:px-6 py-4">Name</th>
                                <th className="px-5 sm:px-6 py-4">Blood Group</th>
                                <th className="px-5 sm:px-6 py-4">Volume</th>
                                <th className="px-5 sm:px-6 py-4">Date</th>
                                <th className="px-5 sm:px-6 py-4">Status</th>
                                <th className="px-5 sm:px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-[#1f1f2e]">
                            {donors.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-[#16161f] transition">
                                    <td className="px-5 sm:px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{item.id}</td>
                                    <td className="px-5 sm:px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400 font-bold text-xs flex-shrink-0">
                                                {item.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 sm:px-6 py-4">
                                        <span className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-2.5 py-1 rounded font-bold text-xs border border-red-100 dark:border-red-900/30">
                                            {item.group}
                                        </span>
                                    </td>
                                    <td className="px-5 sm:px-6 py-4 text-gray-600 dark:text-gray-300">{item.volume}</td>
                                    <td className="px-5 sm:px-6 py-4 text-gray-500 dark:text-gray-400 whitespace-nowrap">{item.date}</td>
                                    <td className="px-5 sm:px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.status === 'Verified' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-900/30' :
                                            'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border border-yellow-100 dark:border-yellow-900/30'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-5 sm:px-6 py-4">
                                        <button className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-semibold transition">View Profile</button>
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
