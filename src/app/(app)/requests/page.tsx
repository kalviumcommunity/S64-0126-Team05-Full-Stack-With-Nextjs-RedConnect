"use client";

import { useState } from "react";

/* ── Icons ── */

function ExternalLinkIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
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

const initialRequests = [
    { id: "REQ-2045", entity: "St. Jude Medical", group: "O-", volume: "450ml", type: "Urgent", status: "Pending", time: "Oct 24, 14:32" },
    { id: "REQ-2044", entity: "City Heart Center", group: "A+", volume: "900ml", type: "Regular", status: "Approved", time: "Oct 24, 12:15" },
    { id: "REQ-2043", entity: "Westside Clinic", group: "B-", volume: "450ml", type: "Emergency", status: "Fulfilled", time: "Oct 23, 18:45" },
    { id: "REQ-2042", entity: "General Hospital", group: "O+", volume: "1350ml", type: "Routine", status: "Cancelled", time: "Oct 23, 11:20" },
];

export default function RequestsPage() {
    const [activeTab, setActiveTab] = useState<"All" | "Pending" | "Completed">("All");

    const requests = initialRequests.filter(item => {
        if (activeTab === "Pending") return item.status === "Pending";
        if (activeTab === "Completed") return item.status === "Fulfilled" || item.status === "Cancelled";
        return true;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Blood Requests</h1>
                    <p className="text-sm text-gray-500">Manage incoming and outgoing blood transfer requests.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-xl text-sm font-semibold text-white hover:bg-red-700 transition shadow-md shadow-red-200">
                    <PlusIcon className="w-4 h-4" />
                    New Request
                </button>
            </div>

            <div className="flex border-b border-gray-100">
                {["All", "Pending", "Completed"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-6 py-4 text-sm font-medium transition-all relative ${activeTab === tab ? "text-red-600" : "text-gray-500 hover:text-gray-900"
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                        )}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">Request ID</th>
                                <th className="px-6 py-4">Source / Entity</th>
                                <th className="px-6 py-4">Blood Group</th>
                                <th className="px-6 py-4">Volume</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {requests.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-medium text-gray-900">{item.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${item.entity.includes("St.") ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
                                                }`}>
                                                {item.entity.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{item.entity}</p>
                                                <p className="text-[10px] text-gray-500">{item.time}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-red-50 text-red-700 px-2.5 py-1 rounded font-bold text-xs border border-red-100">
                                            {item.group}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{item.volume}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${item.type === 'Urgent' ? 'text-red-600 bg-red-50' :
                                                item.type === 'Emergency' ? 'text-orange-600 bg-orange-50' :
                                                    'text-gray-600 bg-gray-50'
                                            }`}>
                                            {item.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Pending' ? 'bg-yellow-500' :
                                                    item.status === 'Approved' ? 'bg-blue-500' :
                                                        item.status === 'Fulfilled' ? 'bg-green-500' :
                                                            'bg-gray-400'
                                                }`} />
                                            <span className="font-medium text-gray-700">{item.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-gray-900">
                                            <ExternalLinkIcon className="w-4 h-4" />
                                        </button>
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
