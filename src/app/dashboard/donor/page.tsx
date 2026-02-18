"use client";

import Image from "next/image";
import Link from "next/link";
import {
    Search,
    MapPin,
    Calendar,
    Clock,
    ChevronRight,
    Droplet,
    Share2,
    Award,
    Repeat
} from "lucide-react";

/* ── Mock Data ── */
const donationHistory = [
    {
        id: 1,
        date: "15 Mar 2024",
        location: "St. Jude Medical Center",
        component: "Whole Blood",
        status: "Pending",
    },
    {
        id: 2,
        date: "05 Jan 2024",
        location: "Red Cross Mobile Drive",
        component: "Platelets",
        status: "Completed",
    },
    {
        id: 3,
        date: "12 Oct 2023",
        location: "City General Hospital",
        component: "Whole Blood",
        status: "Completed",
    },
    {
        id: 4,
        date: "10 Aug 2023",
        location: "Blood Care Clinic",
        component: "Plasma",
        status: "Completed",
    },
];

const nearestCenters = [
    {
        id: 1,
        name: "Downtown General",
        distance: "0.8 miles away",
        waitTime: "< 15M",
        mapImage: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=150&h=150&fit=crop&q=80",
    },
    {
        id: 2,
        name: "Memorial NGO Hub",
        distance: "2.4 miles away",
        waitTime: "~45M",
        mapImage: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=150&h=150&fit=crop&q=80",
    },
];

export default function DonorDashboard() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            {/* ── Navbar ── */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-red-600 text-white p-1 rounded-md">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold tracking-tight">RedConnect</span>
                        </Link>

                        {/* Search */}
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search donors or hospitals"
                                className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg text-sm w-64 text-gray-700 focus:ring-2 focus:ring-red-100 focus:bg-white transition"
                            />
                        </div>

                        {/* Nav Links */}
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                            <Link href="/dashboard/donor" className="text-gray-900">Dashboard</Link>
                            <Link href="#" className="hover:text-gray-900 transition">Inventory</Link>
                            <Link href="#" className="hover:text-gray-900 transition">Hospitals</Link>
                            <Link href="#" className="hover:text-gray-900 transition">NGOs</Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition shadow-sm shadow-red-200">
                            Profile
                        </button>
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                            <Image
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80"
                                alt="Profile"
                                width={40}
                                height={40}
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* ── Profile Header Card ── */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                                    <Image
                                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&q=80"
                                        alt="Alexander West"
                                        width={96}
                                        height={96}
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-white">
                                    O+
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h1 className="text-2xl font-bold text-gray-900">Alexander West</h1>
                                    <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                        <Award className="w-3 h-3" /> CERTIFIED HERO
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mb-4">
                                    Member since 2021 • Blood Type: O-Negative (Rare)
                                </p>
                                <div className="flex gap-4">
                                    <div className="bg-gray-50 px-4 py-2 rounded-lg text-center min-w-[100px]">
                                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">UNITS DONATED</p>
                                        <p className="text-xl font-bold text-red-600">12</p>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-2 rounded-lg text-center min-w-[100px]">
                                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">LIVES SAVED</p>
                                        <p className="text-xl font-bold text-red-600">36</p>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-2 rounded-lg text-center min-w-[100px]">
                                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">LAST DONATION</p>
                                        <p className="text-xl font-bold text-gray-900">Mar 15</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 w-full md:w-auto">
                            <button className="flex-1 md:flex-none px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold rounded-lg text-sm transition flex items-center justify-center gap-2">
                                Edit Profile
                            </button>
                            <button className="flex-1 md:flex-none px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-sm transition flex items-center justify-center gap-2 shadow-sm shadow-red-200">
                                <Share2 className="w-4 h-4" /> Share Stats
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Eligibility Banner ── */}
                <div className="bg-red-50 border border-red-100 rounded-xl p-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white shrink-0">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">You are eligible to donate today!</h3>
                            <p className="text-sm text-gray-600">Help meet the urgent demand for O+ blood in your area.</p>
                        </div>
                    </div>
                    <button className="w-full sm:w-auto px-5 py-2 bg-transparent text-red-600 font-bold text-sm hover:text-red-700 transition">
                        Schedule Now
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ── Left Column (Main Content) ── */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Donation History */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                                <h2 className="text-lg font-bold text-gray-900">Donation History</h2>
                                <button className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center gap-1">
                                    <span className="text-lg">↓</span> Export Report
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4">Location</th>
                                            <th className="px-6 py-4">Component</th>
                                            <th className="px-6 py-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 text-sm">
                                        {donationHistory.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50/50 transition">
                                                <td className="px-6 py-4 text-gray-500">{item.date}</td>
                                                <td className="px-6 py-4 font-medium text-gray-900">{item.location}</td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-semibold">
                                                        {item.component}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 w-fit ${item.status === "Pending"
                                                        ? "bg-orange-100 text-orange-700"
                                                        : "bg-green-100 text-green-700"
                                                        }`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${item.status === "Pending" ? "bg-orange-500" : "bg-green-500"
                                                            }`}></span>
                                                        {item.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="px-6 py-4 border-t border-gray-100 text-center">
                                <button className="text-sm font-bold text-gray-500 hover:text-gray-900 transition">
                                    View All Donations
                                </button>
                            </div>
                        </div>

                        {/* Impact Journey */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-6">Your Impact Journey</h2>

                            {/* Progress Bar */}
                            <div className="mb-8">
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
                                    <div className="h-full bg-red-600 w-3/4 rounded-full relative">
                                        <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/20"></div>
                                    </div>
                                </div>
                                <div className="flex justify-between text-xs font-bold tracking-wide">
                                    <span className="text-gray-500">12 Units</span>
                                    <span className="text-red-600">3 UNITS UNTIL NEXT MILESTONE: GALLON CLUB</span>
                                </div>
                            </div>

                            {/* Milestones */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div className="border border-red-200 bg-red-50/30 rounded-xl p-4 flex flex-col items-center justify-center text-center h-32 relative overflow-hidden group">
                                    <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center mb-2 shadow-sm shadow-red-200">
                                        <Droplet className="w-5 h-5 fill-current" />
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wide">First Drop</span>
                                    <div className="absolute inset-x-0 bottom-0 h-1 bg-red-600"></div>
                                </div>

                                <div className="border border-red-200 bg-red-50/30 rounded-xl p-4 flex flex-col items-center justify-center text-center h-32 relative overflow-hidden group">
                                    <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center mb-2 shadow-sm shadow-red-200">
                                        <Repeat className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wide">5-Timer</span>
                                    <div className="absolute inset-x-0 bottom-0 h-1 bg-red-600"></div>
                                </div>

                                <div className="border border-red-200 bg-red-50/30 rounded-xl p-4 flex flex-col items-center justify-center text-center h-32 relative overflow-hidden group">
                                    <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center mb-2 shadow-sm shadow-red-200">
                                        <Award className="w-5 h-5 fill-current" />
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wide">Hero Class</span>
                                    <div className="absolute inset-x-0 bottom-0 h-1 bg-red-600"></div>
                                </div>

                                <div className="border border-gray-100 bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center text-center h-32 opacity-60 grayscale">
                                    <div className="w-10 h-10 rounded-full bg-white text-gray-300 flex items-center justify-center mb-2 shadow-sm">
                                        <Award className="w-5 h-5 fill-current" />
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Gallon Club</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* ── Right Column (Sidebar) ── */}
                    <div className="space-y-6">

                        {/* Schedule Donation Card */}
                        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 text-white shadow-lg shadow-red-600/20 relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-1">Schedule Donation</h3>
                                <p className="text-red-100 text-xs mb-6 max-w-[200px]">Find clinics near your current location</p>
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 p-2 rounded-full backdrop-blur-sm">
                                    <ChevronRight className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-black/10 rounded-full blur-xl"></div>
                        </div>

                        {/* Upcoming Appointment */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-red-600" /> Upcoming
                            </h3>
                            <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
                                <h4 className="font-bold text-gray-900 text-sm">St. Jude Medical Center</h4>
                                <p className="text-xs text-gray-500 mb-3">Blood Screening & Donation</p>
                                <div className="flex items-center gap-4 text-xs font-medium text-red-600">
                                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Feb 20, 2024</span>
                                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 09:00 AM</span>
                                </div>
                            </div>
                            <button className="w-full py-2.5 rounded-lg border border-red-600 text-red-600 font-bold text-xs hover:bg-red-50 transition uppercase tracking-wide">
                                Reschedule
                            </button>
                        </div>

                        {/* Nearest Centers */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-red-600" /> Nearest Centers
                            </h3>
                            <div className="space-y-4">
                                {nearestCenters.map(center => (
                                    <div key={center.id} className="flex gap-3">
                                        <div className="w-16 h-16 rounded-xl bg-gray-200 shrink-0 overflow-hidden relative">
                                            <Image
                                                src={center.mapImage}
                                                alt="Map"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-bold text-gray-900 text-sm truncate">{center.name}</h4>
                                            <p className="text-xs text-gray-500 mb-1">{center.distance}</p>
                                            <p className="text-[10px] font-bold text-green-600 uppercase tracking-wide">WAIT TIME: {center.waitTime}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Community Impact */}
                        <div className="bg-red-700 rounded-2xl p-6 text-white shadow-lg shadow-red-900/10">
                            <p className="text-xs font-bold uppercase tracking-wider text-red-200 mb-2">Community Impact</p>
                            <h3 className="text-4xl font-bold mb-4">4,821</h3>
                            <p className="text-sm text-red-100 leading-relaxed">
                                Donations in your city this month. You're part of something big, Alexander!
                            </p>
                        </div>

                    </div>
                </div>
            </main>

            {/* ── Footer ── */}
            <footer className="bg-white border-t border-gray-100 py-8 mt-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="bg-red-600 text-white p-1 rounded-md">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </div>
                        <span className="font-bold text-gray-900">RedConnect</span>
                    </div>
                    <p className="text-xs text-gray-500">
                        © 2024 RedConnect Donation Network. All rights reserved. Your health data is encrypted and secure.
                    </p>
                </div>
            </footer>
        </div>
    );
}
