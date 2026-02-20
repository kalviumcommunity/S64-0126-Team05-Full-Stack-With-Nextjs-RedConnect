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

function FilterIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
    );
}

function DownloadIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
    );
}

function PlusIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    );
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Blood Inventory</h1>
                    <p className="text-sm text-gray-500">Manage and monitor real-time blood stock levels.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition shadow-sm">
                        <DownloadIcon className="w-4 h-4" />
                        Export Report
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-xl text-sm font-semibold text-white hover:bg-red-700 transition shadow-md shadow-red-200">
                        <PlusIcon className="w-4 h-4" />
                        Add Stock
                    </button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by ID or Blood Group..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-red-500 transition"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition">
                    <FilterIcon className="w-4 h-4" />
                    Filters
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">Inventory ID</th>
                                <th className="px-6 py-4">Blood Group</th>
                                <th className="px-6 py-4">Units Available</th>
                                <th className="px-6 py-4">Expiry Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {inventory.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-medium text-gray-900">{item.id}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-red-50 text-red-700 px-2.5 py-1 rounded font-bold text-xs border border-red-100">
                                            {item.group}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700 font-medium">{item.units} Units</td>
                                    <td className="px-6 py-4 text-gray-500">{item.expiry}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.status === 'Healthy' ? 'bg-green-50 text-green-700 border border-green-100' :
                                            item.status === 'Warning' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' :
                                                'bg-red-100 text-red-700 border border-red-200'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-red-600 hover:text-red-700 font-semibold transition">Manage</button>
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
