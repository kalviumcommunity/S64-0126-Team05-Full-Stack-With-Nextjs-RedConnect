"use client";

import { useState } from "react";
import {
    Package,
    Search,
    Filter,
    Download,
    AlertTriangle,
    ShieldCheck
} from "lucide-react";

const inventory = [
    { id: "KIT-901", item: "Donor Kits", quantity: 450, status: "Healthy", lastUpdated: "2 hours ago" },
    { id: "BAG-202", item: "Blood Bags (450ml)", quantity: 120, status: "Warning", lastUpdated: "5 hours ago" },
    { id: "COL-303", item: "Cooling Boxes", quantity: 8, status: "Critical", lastUpdated: "1 day ago" },
    { id: "TBT-404", item: "Test Tubes", quantity: 2000, status: "Healthy", lastUpdated: "3 hours ago" },
];

export default function InventoryPage() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Resource Inventory</h1>
                    <p className="text-sm text-gray-500">Manage campaign supplies, medical kits, and mobilization resources.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-xl text-sm font-semibold text-white hover:bg-red-700 transition shadow-md shadow-red-200 cursor-pointer">
                    <Download className="w-4 h-4" />
                    Export Inventory
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                        <Package className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Total Items</p>
                        <h3 className="text-2xl font-bold text-gray-900">2,578</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Low Stock</p>
                        <h3 className="text-2xl font-bold text-gray-900">2 Units</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Status</p>
                        <h3 className="text-2xl font-bold text-gray-900">Operational</h3>
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search items..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-red-500 transition"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition">
                    <Filter className="w-4 h-4" />
                    Filters
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">Item Name</th>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">In Stock</th>
                                <th className="px-6 py-4">Last Updated</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {inventory.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-bold text-gray-900">{item.item}</td>
                                    <td className="px-6 py-4 text-gray-500">{item.id}</td>
                                    <td className="px-6 py-4 text-gray-700 font-bold">{item.quantity}</td>
                                    <td className="px-6 py-4 text-gray-500">{item.lastUpdated}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.status === 'Healthy' ? 'bg-green-50 text-green-700 border border-green-100' :
                                                item.status === 'Warning' ? 'bg-orange-50 text-orange-700 border border-orange-100' :
                                                    'bg-red-50 text-red-700 border border-red-100'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-red-600 hover:text-red-700 font-bold transition cursor-pointer">Manage</button>
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
