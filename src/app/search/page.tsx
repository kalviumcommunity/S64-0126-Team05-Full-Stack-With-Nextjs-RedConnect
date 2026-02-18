"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ── Icons ── */

function SearchIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    );
}

function MapIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
            <line x1="8" y1="2" x2="8" y2="18" />
            <line x1="16" y1="6" x2="16" y2="22" />
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

function HeartLogoIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
    );
}

function RefreshIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 4v6h-6" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
        </svg>
    );
}

function StarIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}

function MapPinIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}

function ChevronDownIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}

/* ── Components ── */

function SearchHeader() {
    return (
        <header className="w-full bg-white shadow-sm z-50 relative sticky top-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-red-600 text-white p-1.5 rounded-lg">
                        <HeartLogoIcon className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold text-gray-900">RedConnect</span>
                </Link>

                {/* Search Bar */}
                <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm transition duration-150 ease-in-out"
                        placeholder="Search hospitals or cities..."
                    />
                </div>

                {/* Nav Links + Profile */}
                <div className="flex items-center gap-6">
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                        <Link href="/search" className="text-gray-900 hover:text-red-600">Find Blood</Link>
                        <Link href="/signup" className="hover:text-red-600">Register Donor</Link>
                        <Link href="#" className="hover:text-red-600">About Us</Link>
                    </nav>

                    <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
                        <Link href="/dashboard">
                            <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition shadow-sm">
                                My Profile
                            </button>
                        </Link>
                        <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden border border-gray-200">
                            <Image
                                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&q=80"
                                alt="Current user"
                                width={36}
                                height={36}
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default function SearchPage() {
    const [distance, setDistance] = useState(15);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <SearchHeader />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* ── Filter Sidebar ── */}
                    <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
                        <div className="flex items-center gap-2 text-red-600 mb-6">
                            <FilterIcon className="w-5 h-5" />
                            <h2 className="font-bold text-lg">Filter Results</h2>
                        </div>

                        {/* Blood Group */}
                        <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Blood Group</h3>
                            <div className="grid grid-cols-4 gap-2">
                                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                                    <button
                                        key={bg}
                                        className={`h-9 rounded-lg text-sm font-medium border transition-all ${bg === "A+" // Selected state mockup
                                                ? "bg-red-600 text-white border-red-600 shadow-sm"
                                                : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-600"
                                            }`}
                                    >
                                        {bg}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Components */}
                        <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Components</h3>
                            <div className="space-y-2">
                                {["Whole Blood", "Plasma", "Platelets"].map((comp, i) => (
                                    <label key={comp} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            defaultChecked={i === 0}
                                            className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                        />
                                        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition">{comp}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Distance Radius */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Distance Radius</h3>
                                <span className="text-xs font-bold text-red-600">{distance} km</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="50"
                                value={distance}
                                onChange={(e) => setDistance(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                            />
                            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                                <span>1 km</span>
                                <span>50 km</span>
                            </div>
                        </div>

                        {/* Reset Button */}
                        <button className="w-full py-3 bg-gray-100 hovering:bg-gray-200 text-gray-600 font-semibold rounded-xl flex items-center justify-center gap-2 transition hover:bg-gray-200">
                            <RefreshIcon className="w-4 h-4" />
                            Reset Filters
                        </button>
                    </aside>

                    {/* ── Main Content ── */}
                    <div className="flex-1">
                        {/* Content Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Real-time Blood Inventory</h1>
                                <p className="text-gray-500 mt-1">Showing 14 available centers near your current location.</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-50 flex items-center gap-2 transition">
                                    <MapIcon className="w-4 h-4" />
                                    View Map
                                </button>
                                <button className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg shadow-sm hover:bg-red-700 flex items-center gap-2 transition shadow-red-600/20">
                                    <StarIcon className="w-4 h-4" />
                                    Emergency Request
                                </button>
                            </div>
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Card 1 */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex flex-col items-center justify-center w-16 h-16 bg-red-50 text-red-600 rounded-xl border border-red-100">
                                        <span className="text-2xl font-bold leading-none">A+</span>
                                        <span className="text-[10px] font-bold uppercase mt-1">Blood Group</span>
                                    </div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-1.5"></span>
                                        LIVE
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-1">City General Hospital</h3>
                                <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                                    <MapPinIcon className="w-4 h-4" />
                                    2.4 km away • 124 Medical Dr.
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <div>
                                        <span className="text-2xl font-bold text-gray-900">12</span>
                                        <span className="text-xs text-gray-500 ml-1">Units</span>
                                        <p className="text-[10px] text-gray-400 mt-0.5">UPDATED 5 MINS AGO</p>
                                    </div>
                                    <button className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition">
                                        Request
                                    </button>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm hover:shadow-md transition relative overflow-hidden">
                                {/* Critical overlay accent */}
                                <div className="absolute top-0 right-0 w-20 h-20 bg-red-600 blur-3xl opacity-5 rounded-full -mr-10 -mt-10"></div>

                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex flex-col items-center justify-center w-16 h-16 bg-red-600 text-white rounded-xl shadow-lg shadow-red-600/20">
                                        <span className="text-2xl font-bold leading-none">O-</span>
                                        <span className="text-[10px] font-bold uppercase mt-1 opacity-90">Blood Group</span>
                                    </div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700 uppercase tracking-wide border border-red-200">
                                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-1.5 animate-pulse"></span>
                                        Critical
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-1">St. Jude Medical Center</h3>
                                <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                                    <MapPinIcon className="w-4 h-4" />
                                    4.1 km away • 88 West Avenue
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <div>
                                        <span className="text-2xl font-bold text-red-600">02</span>
                                        <span className="text-xs text-gray-500 ml-1">Units</span>
                                        <p className="text-[10px] text-gray-400 mt-0.5">UPDATED 12 MINS AGO</p>
                                    </div>
                                    <button className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition shadow-lg shadow-red-600/10">
                                        Request
                                    </button>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex flex-col items-center justify-center w-16 h-16 bg-red-50 text-red-600 rounded-xl border border-red-100">
                                        <span className="text-2xl font-bold leading-none">B+</span>
                                        <span className="text-[10px] font-bold uppercase mt-1">Blood Group</span>
                                    </div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-1.5"></span>
                                        LIVE
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-1">Red Cross NGO Center</h3>
                                <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                                    <MapPinIcon className="w-4 h-4" />
                                    6.8 km away • 45 NGO Plaza
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <div>
                                        <span className="text-2xl font-bold text-gray-900">28</span>
                                        <span className="text-xs text-gray-500 ml-1">Units</span>
                                        <p className="text-[10px] text-gray-400 mt-0.5">UPDATED 1 MIN AGO</p>
                                    </div>
                                    <button className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition">
                                        Request
                                    </button>
                                </div>
                            </div>

                            {/* Skeletons/Placeholders for more */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 border-dashed flex flex-col justify-center gap-4 opacity-60">
                                <div className="flex justify-between">
                                    <div className="h-16 w-16 bg-gray-200 rounded-xl" />
                                    <div className="h-6 w-16 bg-gray-200 rounded-full" />
                                </div>
                                <div className="h-6 w-3/4 bg-gray-200 rounded-md" />
                                <div className="h-4 w-1/2 bg-gray-200 rounded-md" />
                                <div className="h-12 w-full bg-gray-200 rounded-lg mt-auto" />
                            </div>
                        </div>

                        {/* Load More */}
                        <div className="mt-8 flex justify-center">
                            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition shadow-sm">
                                Load More Centers
                                <ChevronDownIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
