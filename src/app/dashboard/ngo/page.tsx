"use client";

import Image from "next/image";
import Link from "next/link";
import {
    BarChart3,
    TrendingUp,
    MoreVertical,
    MapPin,
    Calendar,
    Users,
    Mail
} from "lucide-react";

/* ── Mock Data ── */
const activeCampaigns = [
    {
        id: 1,
        title: "Central Metro Hospital Drive",
        location: "New York, Downtown",
        donorsReached: 85,
        donorsGoal: 100,
        donorsImages: [
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&q=80",
        ],
        status: "CRITICAL",
    },
    {
        id: 2,
        title: "University Campus Drive",
        location: "East Campus Quad",
        donorsReached: 42,
        donorsGoal: 200,
        status: "SCHEDULED",
        startsIn: "3 days",
    },
];

const recentSignUps = [
    {
        id: 1,
        name: "Sarah Jenkins",
        type: "Type O- Negative",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80",
    },
    {
        id: 2,
        name: "Marcus Chen",
        type: "Type B+ Positive",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
    },
    {
        id: 3,
        name: "Elena Rodriguez",
        type: "Type A+ Positive",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80",
    },
];

const chartData = [
    { month: "JAN", value: 30 },
    { month: "FEB", value: 45 },
    { month: "MAR", value: 35 },
    { month: "APR", value: 60 },
    { month: "MAY", value: 80 },
    { month: "JUN", value: 55 },
];

export default function NGODashboard() {
    return (
        <div className="space-y-8">
            {/* Title & Stats */}
            <div className="flex flex-col md:flex-row items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">NGO Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your active blood drives and donor mobilization in real-time.</p>
                </div>

                <div className="flex gap-4">
                    <div className="bg-white dark:bg-[#111118] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-[#1f1f2e] min-w-[160px] transition-colors">
                        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">TOTAL UNITS</p>
                        <div className="flex items-end gap-2">
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">1,420</span>
                            <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded flex items-center">
                                <TrendingUp className="w-3 h-3 mr-0.5" /> 12%
                            </span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#111118] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-[#1f1f2e] min-w-[160px] transition-colors">
                        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">VOLUNTEERS</p>
                        <div className="flex items-end gap-2">
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">342</span>
                            <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded flex items-center">
                                <TrendingUp className="w-3 h-3 mr-0.5" /> 5%
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Active Campaigns */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-red-600 dark:text-red-500" /> Active Campaigns
                    </h3>
                    <Link href="/dashboard/ngo/campaigns">
                        <button className="text-sm font-bold text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 transition">
                            View all drives
                        </button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Campaign Cards */}
                    {activeCampaigns.map((campaign) => (
                        <div key={campaign.id} className={`bg-white dark:bg-[#111118] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-[#1f1f2e] relative overflow-hidden transition-colors ${campaign.status === 'CRITICAL' ? 'border-l-4 border-l-red-600 dark:border-l-red-500' : 'border-l-4 border-l-orange-400 dark:border-l-orange-500'}`}>
                            <div className="flex justify-between items-start mb-4">
                                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${campaign.status === 'CRITICAL' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                                    }`}>
                                    {campaign.status}
                                </span>
                                <button className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>

                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{campaign.title}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mb-6">
                                <MapPin className="w-3.5 h-3.5" /> {campaign.location}
                            </p>

                            <div className="flex items-end justify-between text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">
                                <span>{campaign.status === 'CRITICAL' ? 'Donors Reached' : 'Sign-ups'}</span>
                                <span className={campaign.status === 'CRITICAL' ? 'text-red-600 dark:text-red-500' : 'text-orange-600 dark:text-orange-500'}>
                                    {campaign.donorsReached} <span className="text-gray-400 dark:text-gray-600">/ {campaign.donorsGoal}</span>
                                </span>
                            </div>

                            <div className="w-full bg-gray-100 dark:bg-[#16161f] h-2 rounded-full overflow-hidden mb-6 transition-colors">
                                <div
                                    className={`h-full rounded-full transition-all ${campaign.status === 'CRITICAL' ? 'bg-red-600 dark:bg-red-500' : 'bg-orange-400 dark:bg-orange-500'}`}
                                    style={{ width: `${(campaign.donorsReached / campaign.donorsGoal) * 100}%` }}
                                ></div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex -space-x-2">
                                    {campaign.donorsImages && campaign.donorsImages.map((img, i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#111118] overflow-hidden shadow-sm">
                                            <Image src={img} alt="Donor" width={32} height={32} className="object-cover" />
                                        </div>
                                    ))}
                                    {campaign.donorsReached > 2 && (
                                        <div className="w-8 h-8 rounded-full border-2 border-white dark:border-[#111118] bg-gray-100 dark:bg-[#16161f] flex items-center justify-center text-[10px] font-bold text-gray-600 dark:text-gray-400 transition-colors">
                                            +{campaign.donorsReached - 2}
                                        </div>
                                    )}
                                    {campaign.startsIn && (
                                        <span className="flex items-center gap-1.5 text-xs text-orange-600 dark:text-orange-500 font-medium ml-4">
                                            <Calendar className="w-3.5 h-3.5" /> Starts in {campaign.startsIn}
                                        </span>
                                    )}
                                </div>
                                <button className="px-4 py-2 bg-gray-100 dark:bg-[#16161f] hover:bg-gray-200 dark:hover:bg-[#1f1f2e] text-gray-900 dark:text-gray-100 text-xs font-bold rounded-lg transition-colors shadow-sm">
                                    {campaign.status === 'CRITICAL' ? 'Manage' : 'Details'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Charts & Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-[#111118] rounded-2xl shadow-sm border border-gray-100 dark:border-[#1f1f2e] p-6 transition-colors">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-red-600 dark:text-red-500" /> Units Collected Over Time
                        </h3>
                        <select className="bg-gray-50 dark:bg-[#16161f] border-none text-xs font-bold text-gray-600 dark:text-gray-400 rounded-lg py-1.5 pl-3 pr-8 focus:ring-1 focus:ring-red-200 dark:focus:ring-red-900/40 shadow-sm transition-colors cursor-pointer">
                            <option>Last 6 Months</option>
                            <option>Last Year</option>
                        </select>
                    </div>

                    <div className="h-64 flex items-end justify-between gap-4 px-4">
                        {chartData.map((data, index) => (
                            <div key={index} className="flex flex-col items-center gap-2 flex-1 group">
                                <div
                                    className="w-full bg-red-200 dark:bg-red-900/20 rounded-t-sm group-hover:bg-red-300 dark:group-hover:bg-red-900/40 transition-all relative"
                                    style={{
                                        height: `${data.value}%`,
                                        backgroundColor: index >= 4 ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#ef4444' : '#ef4444') : undefined
                                    }}
                                ></div>
                                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-600">{data.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Sign-ups */}
                <div className="bg-white dark:bg-[#111118] rounded-2xl shadow-sm border border-gray-100 dark:border-[#1f1f2e] p-6 transition-colors">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <Users className="w-5 h-5 text-red-600 dark:text-red-500" /> Recent Sign-ups
                    </h3>
                    <div className="space-y-4">
                        {recentSignUps.map((user) => (
                            <div key={user.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#16161f] transition border border-transparent hover:border-gray-100 dark:hover:border-[#1f1f2e]">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
                                        <Image src={user.image} alt={user.name} width={40} height={40} className="object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">{user.name}</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-red-400 dark:bg-red-500"></span>
                                            {user.type}
                                        </p>
                                    </div>
                                </div>
                                <button className="text-gray-400 dark:text-gray-600 hover:text-red-600 dark:hover:text-red-500 transition p-1.5 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg">
                                    <Mail className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-50 dark:border-[#1f1f2e] text-center">
                        <Link href="/dashboard/ngo/volunteers">
                            <button className="text-xs font-bold text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 transition">
                                View all volunteers
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white dark:bg-[#111118] rounded-2xl shadow-sm border border-gray-100 dark:border-[#1f1f2e] p-6 transition-colors">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 dark:text-white">Drive Map</h3>
                    <span className="text-[10px] font-bold uppercase text-gray-400 dark:text-gray-600 tracking-wide">3 Drives Active</span>
                </div>
                <div className="w-full h-48 bg-gray-100 dark:bg-[#16161f] rounded-xl relative overflow-hidden transition-colors shadow-inner">
                    <Image
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=400&fit=crop&q=80"
                        alt="Map"
                        fill
                        className="object-cover opacity-50 dark:opacity-20 grayscale"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#1c1c26] px-4 py-2 rounded-lg shadow-md flex items-center gap-2 border border-gray-100 dark:border-[#1f1f2e] transition-colors">
                        <MapPin className="w-4 h-4 text-red-600 dark:text-red-500" />
                        <span className="text-xs font-bold text-gray-900 dark:text-gray-100">Downtown Hub</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
