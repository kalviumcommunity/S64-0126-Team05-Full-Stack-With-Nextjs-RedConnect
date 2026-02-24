"use client";

import { useState } from "react";

/* ── Icons ── */

function SearchIcon({ className }: { className?: string }) {
    return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>);
}
function FilterIcon({ className }: { className?: string }) {
    return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>);
}
function DownloadIcon({ className }: { className?: string }) {
    return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>);
}
function PlusIcon({ className }: { className?: string }) {
    return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>);
}

/* ── Data ── */

const initialInventory = [
    { id: "INV-101", group: "A+", units: 15, status: "Healthy", expiry: "2024-03-25" },
    { id: "INV-102", group: "A-", units: 4, status: "Critical", expiry: "2024-03-20" },
    { id: "INV-103", group: "B+", units: 22, status: "Healthy", expiry: "2024-04-02" },
    { id: "INV-104", group: "B-", units: 2, status: "Critical", expiry: "2024-03-15" },
    { id: "INV-105", group: "O+", units: 45, status: "Healthy", expiry: "2024-04-10" },
    { id: "INV-106", group: "O-", units: 1, status: "Critical", expiry: "2024-03-12" },
    { id: "INV-107", group: "AB+", units: 10, status: "Warning", expiry: "2024-03-28" },
    { id: "INV-108", group: "AB-", units: 3, status: "Critical", expiry: "2024-03-18" },
];

export default function InventoryPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const inventory = initialInventory.filter(item =>
        item.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="min-w-0">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Blood Inventory</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage and monitor real-time blood stock levels.</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                    <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white dark:bg-[#111118] border border-gray-200 dark:border-[#1f1f2e] rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#16161f] transition shadow-sm dark:shadow-none">
                        <DownloadIcon className="w-4 h-4 flex-shrink-0" />
                        <span className="hidden sm:inline">Export Report</span>
                    </button>
                    <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-600 rounded-xl text-sm font-semibold text-white hover:bg-red-700 transition shadow-md shadow-red-200 dark:shadow-red-900/20">
                        <PlusIcon className="w-4 h-4 flex-shrink-0" />
                        Add Stock
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-[#111118] p-4 rounded-2xl border border-gray-100 dark:border-[#1f1f2e] shadow-sm dark:shadow-none flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search by ID or Blood Group..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-[#16161f] border-none rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 transition"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-[#16161f] rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1f1f2e] transition">
                    <FilterIcon className="w-4 h-4" />
                    Filters
                </button>
            </div>

            <div className="bg-white dark:bg-[#111118] rounded-2xl border border-gray-100 dark:border-[#1f1f2e] shadow-sm dark:shadow-none overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[600px]">
                        <thead className="bg-gray-50 dark:bg-[#16161f] text-gray-500 dark:text-gray-400 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-5 sm:px-6 py-4">Inventory ID</th>
                                <th className="px-5 sm:px-6 py-4">Blood Group</th>
                                <th className="px-5 sm:px-6 py-4">Units Available</th>
                                <th className="px-5 sm:px-6 py-4">Expiry Date</th>
                                <th className="px-5 sm:px-6 py-4">Status</th>
                                <th className="px-5 sm:px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-[#1f1f2e]">
                            {inventory.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-[#16161f] transition">
                                    <td className="px-5 sm:px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{item.id}</td>
                                    <td className="px-5 sm:px-6 py-4">
                                        <span className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-2.5 py-1 rounded font-bold text-xs border border-red-100 dark:border-red-900/30">
                                            {item.group}
                                        </span>
                                    </td>
                                    <td className="px-5 sm:px-6 py-4 text-gray-700 dark:text-gray-300 font-medium">{item.units} Units</td>
                                    <td className="px-5 sm:px-6 py-4 text-gray-500 dark:text-gray-400 whitespace-nowrap">{item.expiry}</td>
                                    <td className="px-5 sm:px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.status === 'Healthy' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-900/30' :
                                            item.status === 'Warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border border-yellow-100 dark:border-yellow-900/30' :
                                                'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/30'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-5 sm:px-6 py-4">
                                        <button className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-semibold transition">Manage</button>
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
