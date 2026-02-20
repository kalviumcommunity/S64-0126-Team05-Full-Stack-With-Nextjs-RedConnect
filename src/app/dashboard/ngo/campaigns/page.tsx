"use client";

import { useState } from "react";
import Image from "next/image";
import {
    Plus,
    Search,
    Filter,
    MapPin,
    Calendar,
    Users,
    MoreVertical
} from "lucide-react";

const campaigns = [
    {
        id: 1,
        title: "Central Metro Hospital Drive",
        location: "New York, Downtown",
        donorsReached: 85,
        donorsGoal: 100,
        status: "Active",
        type: "Blood Drive",
        date: "Oct 24, 2024",
    },
    {
        id: 2,
        title: "University Campus Drive",
        location: "East Campus Quad",
        donorsReached: 42,
        donorsGoal: 200,
        status: "Scheduled",
        type: "Awareness",
        date: "Oct 28, 2024",
    },
    {
        id: 3,
        title: "Community Center Meetup",
        location: "Westside Hub",
        donorsReached: 120,
        donorsGoal: 120,
        status: "Completed",
        type: "Recruitment",
        date: "Oct 15, 2024",
    }
];

export default function CampaignsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Campaign Management</h1>
                    <p className="text-sm text-gray-500">Plan and track your blood donation campaigns and awareness drives.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-xl text-sm font-semibold text-white hover:bg-red-700 transition shadow-md shadow-red-200">
                    <Plus className="w-4 h-4" />
                    New Campaign
                </button>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search campaigns..."
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

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-red-100 transition">
                        <div className="flex justify-between items-start mb-4">
                            <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${campaign.status === 'Active' ? 'bg-green-100 text-green-700' :
                                    campaign.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                                        'bg-gray-100 text-gray-700'
                                }`}>
                                {campaign.status}
                            </span>
                            <button className="text-gray-400 hover:text-gray-600">
                                <MoreVertical className="w-4 h-4" />
                            </button>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">{campaign.title}</h3>
                        <div className="space-y-2 mb-6">
                            <p className="text-xs text-gray-500 flex items-center gap-2">
                                <MapPin className="w-3.5 h-3.5" /> {campaign.location}
                            </p>
                            <p className="text-xs text-gray-500 flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5" /> {campaign.date}
                            </p>
                        </div>

                        <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-2">
                            <span>Progress</span>
                            <span>{campaign.donorsReached} / {campaign.donorsGoal}</span>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mb-6">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${campaign.status === 'Active' ? 'bg-red-500' : 'bg-gray-400'
                                    }`}
                                style={{ width: `${(campaign.donorsReached / campaign.donorsGoal) * 100}%` }}
                            ></div>
                        </div>

                        <button className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-900 text-xs font-bold rounded-lg transition">
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
