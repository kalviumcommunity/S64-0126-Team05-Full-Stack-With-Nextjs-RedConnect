"use client";

import { useState } from "react";
import {
    Plus,
    Search,
    Filter,
    MapPin,
    Calendar,
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
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Campaign Management</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Plan and track your blood donation campaigns and awareness drives.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-xl text-sm font-semibold text-white hover:bg-red-700 transition shadow-md shadow-red-200">
                    <Plus className="w-4 h-4" />
                    New Campaign
                </button>
            </div>

            <div className="bg-white dark:bg-[#111118] p-4 rounded-2xl border border-gray-100 dark:border-[#1f1f2e] shadow-sm flex flex-col md:flex-row gap-4 transition-colors">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search campaigns..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-[#16161f] border-none rounded-xl text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-600 focus:ring-2 focus:ring-red-500 dark:focus:ring-red-900/40 transition"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-[#16161f] rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1f1f2e] transition">
                    <Filter className="w-4 h-4" />
                    Filters
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-white dark:bg-[#111118] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-[#1f1f2e] hover:border-red-100 dark:hover:border-red-900/40 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${campaign.status === 'Active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                                campaign.status === 'Scheduled' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                                    'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
                                }`}>
                                {campaign.status}
                            </span>
                            <button className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition">
                                <MoreVertical className="w-4 h-4" />
                            </button>
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">{campaign.title}</h3>
                        <div className="space-y-2 mb-6">
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                <MapPin className="w-3.5 h-3.5" /> {campaign.location}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5" /> {campaign.date}
                            </p>
                        </div>

                        <div className="flex items-center justify-between text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">
                            <span>Progress</span>
                            <span>{campaign.donorsReached} / {campaign.donorsGoal}</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-[#16161f] h-1.5 rounded-full overflow-hidden mb-6 transition-colors">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${campaign.status === 'Active' ? 'bg-red-500' : 'bg-gray-400 dark:bg-gray-600'
                                    }`}
                                style={{ width: `${(campaign.donorsReached / campaign.donorsGoal) * 100}%` }}
                            ></div>
                        </div>

                        <button className="w-full py-2 bg-gray-50 dark:bg-[#16161f] hover:bg-gray-100 dark:hover:bg-[#1f1f2e] text-gray-900 dark:text-gray-100 text-xs font-bold rounded-lg transition-colors shadow-sm">
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
