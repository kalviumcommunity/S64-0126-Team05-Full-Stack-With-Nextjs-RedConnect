"use client";

import { useState } from "react";
import Image from "next/image";
import {
    Users,
    Search,
    Filter,
    Mail,
    Phone,
    CheckCircle2,
    Clock
} from "lucide-react";

const volunteers = [
    {
        id: 1,
        name: "Sarah Jenkins",
        type: "Type O- Negative",
        email: "sarah.j@example.com",
        phone: "+1 234 567 890",
        status: "Verified",
        joined: "Oct 20, 2024",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80",
    },
    {
        id: 2,
        name: "Marcus Chen",
        type: "Type B+ Positive",
        email: "marcus.c@example.com",
        phone: "+1 234 567 891",
        status: "Pending",
        joined: "Oct 22, 2024",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
    },
    {
        id: 3,
        name: "Elena Rodriguez",
        type: "Type A+ Positive",
        email: "elena.r@example.com",
        phone: "+1 234 567 892",
        status: "Verified",
        joined: "Oct 18, 2024",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80",
    }
];

export default function VolunteersPage() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Volunteers</h1>
                    <p className="text-sm text-gray-500">Manage and coordinate with your volunteer network.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition shadow-sm">
                        Export List
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-xl text-sm font-semibold text-white hover:bg-red-700 transition shadow-md shadow-red-200">
                        Add Volunteer
                    </button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search volunteers by name or group..."
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
                                <th className="px-6 py-4">Volunteer</th>
                                <th className="px-6 py-4">Blood Type</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Joined</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {volunteers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
                                                <Image src={user.image} alt={user.name} width={40} height={40} className="object-cover" />
                                            </div>
                                            <span className="font-bold text-gray-900">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-red-50 text-red-700 px-2.5 py-1 rounded font-bold text-xs border border-red-100">
                                            {user.type.replace("Type ", "")}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <p className="text-gray-600 flex items-center gap-1.5"><Mail className="w-3 h-3" /> {user.email}</p>
                                            <p className="text-gray-400 text-xs flex items-center gap-1.5"><Phone className="w-3 h-3" /> {user.phone}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{user.joined}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit ${user.status === 'Verified' ? 'bg-green-50 text-green-700 border border-green-100' :
                                                'bg-yellow-50 text-yellow-700 border border-yellow-100'
                                            }`}>
                                            {user.status === 'Verified' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-red-600 hover:text-red-700 font-bold transition">Message</button>
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
