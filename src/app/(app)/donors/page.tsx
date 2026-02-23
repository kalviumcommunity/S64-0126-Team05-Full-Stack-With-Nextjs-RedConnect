"use client";

import { useState } from "react";

/* ── Icons ── */

function SearchIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    );
}

function CalendarIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    );
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Donor Logs</h1>
                    <p className="text-sm text-gray-500">Track and manage donor history and donation records.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition shadow-sm">
                    <CalendarIcon className="w-4 h-4" />
                    Filter by Date
                </button>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search donors by name or ID..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-red-500 transition"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">Donor ID</th>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Blood Group</th>
                                <th className="px-6 py-4">Volume</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {donors.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-medium text-gray-900">{item.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs">
                                                {item.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="font-medium text-gray-700">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-red-50 text-red-700 px-2.5 py-1 rounded font-bold text-xs border border-red-100">
                                            {item.group}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{item.volume}</td>
                                    <td className="px-6 py-4 text-gray-500">{item.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.status === 'Verified' ? 'bg-green-50 text-green-700 border border-green-100' :
                                                'bg-yellow-50 text-yellow-700 border border-yellow-100'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-red-600 hover:text-red-700 font-semibold transition">View Profile</button>
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
