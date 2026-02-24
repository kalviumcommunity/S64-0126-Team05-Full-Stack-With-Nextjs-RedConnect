"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

/* ── Types ── */
interface BloodInventoryItem {
    id: string;
    hospitalName: string;
    distance: number;
    address: string;
    bloodGroup: string;
    component: "Whole Blood" | "Plasma" | "Platelets";
    units: number;
    lastUpdated: string;
    isLive: boolean;
    isCritical: boolean;
}

/* ── Mock Data ── */
const MOCK_DATA: BloodInventoryItem[] = [
    { id: "1", hospitalName: "City General Hospital", distance: 2.4, address: "124 Medical Dr.", bloodGroup: "A+", component: "Whole Blood", units: 12, lastUpdated: "5 MINS AGO", isLive: true, isCritical: false },
    { id: "2", hospitalName: "St. Jude Medical Center", distance: 4.1, address: "88 West Avenue", bloodGroup: "O-", component: "Whole Blood", units: 2, lastUpdated: "12 MINS AGO", isLive: false, isCritical: true },
    { id: "3", hospitalName: "Red Cross NGO Center", distance: 6.8, address: "45 NGO Plaza", bloodGroup: "B+", component: "Platelets", units: 28, lastUpdated: "1 MIN AGO", isLive: true, isCritical: false },
    { id: "4", hospitalName: "Memorial Hospital", distance: 8.5, address: "1200 Main St.", bloodGroup: "AB+", component: "Plasma", units: 5, lastUpdated: "30 MINS AGO", isLive: true, isCritical: false },
    { id: "5", hospitalName: "Community Health Clinic", distance: 12.0, address: "3300 Health Blvd.", bloodGroup: "O+", component: "Whole Blood", units: 15, lastUpdated: "1 HOUR AGO", isLive: true, isCritical: false },
    { id: "6", hospitalName: "University Medical Center", distance: 1.2, address: "500 University Ave.", bloodGroup: "A-", component: "Whole Blood", units: 8, lastUpdated: "10 MINS AGO", isLive: true, isCritical: false },
    { id: "7", hospitalName: "Lakeside Medical", distance: 22.5, address: "789 Lakeview Dr.", bloodGroup: "B-", component: "Plasma", units: 4, lastUpdated: "2 HOURS AGO", isLive: false, isCritical: true },
];

/* ── Icons ── */

function SearchIcon({ className }: { className?: string }) {
    return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>);
}
function MapIcon({ className }: { className?: string }) {
    return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" /></svg>);
}
function FilterIcon({ className }: { className?: string }) {
    return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>);
}
function HeartLogoIcon({ className }: { className?: string }) {
    return (<svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>);
}
function RefreshIcon({ className }: { className?: string }) {
    return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>);
}
function StarIcon({ className }: { className?: string }) {
    return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>);
}
function MapPinIcon({ className }: { className?: string }) {
    return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>);
}
function ChevronDownIcon({ className }: { className?: string }) {
    return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>);
}

/* ── Components ── */

function SearchHeader() {
    return (
        <header className="w-full bg-white dark:bg-[#111118] shadow-sm dark:shadow-none z-50 sticky top-0 border-b border-transparent dark:border-[#1f1f2e] transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                    <div className="bg-red-600 text-white p-1.5 rounded-lg">
                        <HeartLogoIcon className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:inline">RedConnect</span>
                </Link>

                {/* Search Bar */}
                <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-[#1f1f2e] rounded-lg leading-5 bg-gray-50 dark:bg-[#16161f] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-[#111118] focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm transition duration-150 ease-in-out"
                        placeholder="Search hospitals or cities..."
                    />
                </div>

                {/* Nav Links + Profile */}
                <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
                    <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
                        <Link href="/search" className="text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-400">Find Blood</Link>
                        <Link href="/signup" className="hover:text-red-600 dark:hover:text-red-400">Register Donor</Link>
                        <Link href="/about" className="hover:text-red-600 dark:hover:text-red-400">About Us</Link>
                    </nav>

                    <div className="flex items-center gap-3 pl-4 sm:pl-6 border-l border-gray-100 dark:border-[#1f1f2e]">
                        <Link href="/dashboard">
                            <button className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition shadow-sm whitespace-nowrap">
                                My Profile
                            </button>
                        </Link>
                        <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-[#16161f] overflow-hidden border border-gray-200 dark:border-[#1f1f2e] flex-shrink-0">
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
    const [distance, setDistance] = useState(50);
    const [selectedBloodGroup, setSelectedBloodGroup] = useState<string | null>(null);
    const [selectedComponents, setSelectedComponents] = useState<string[]>([]);

    const filteredResults = useMemo(() => {
        return MOCK_DATA.filter((item) => {
            if (item.distance > distance) return false;
            if (selectedBloodGroup && item.bloodGroup !== selectedBloodGroup) return false;
            if (selectedComponents.length > 0 && !selectedComponents.includes(item.component)) return false;
            return true;
        });
    }, [distance, selectedBloodGroup, selectedComponents]);

    const handleBloodGroupToggle = (bg: string) => {
        setSelectedBloodGroup((prev) => (prev === bg ? null : bg));
    };

    const handleComponentToggle = (comp: string) => {
        setSelectedComponents((prev) =>
            prev.includes(comp) ? prev.filter((c) => c !== comp) : [...prev, comp]
        );
    };

    const handleResetFilters = () => {
        setDistance(50);
        setSelectedBloodGroup(null);
        setSelectedComponents([]);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] font-sans transition-colors">
            <SearchHeader />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Filter Sidebar */}
                    <aside className="w-full lg:w-64 flex-shrink-0 space-y-6 sm:space-y-8">
                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-4 sm:mb-6">
                            <FilterIcon className="w-5 h-5" />
                            <h2 className="font-bold text-lg">Filter Results</h2>
                        </div>

                        {/* Blood Group */}
                        <div>
                            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Blood Group</h3>
                            <div className="grid grid-cols-4 gap-2">
                                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                                    <button
                                        key={bg}
                                        onClick={() => handleBloodGroupToggle(bg)}
                                        className={`h-9 rounded-lg text-sm font-medium border transition-all ${selectedBloodGroup === bg
                                            ? "bg-red-600 text-white border-red-600 shadow-sm"
                                            : "bg-white dark:bg-[#111118] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-[#1f1f2e] hover:border-red-300 dark:hover:border-red-800 hover:text-red-600 dark:hover:text-red-400"
                                            }`}
                                    >
                                        {bg}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Components */}
                        <div>
                            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Components</h3>
                            <div className="space-y-2">
                                {["Whole Blood", "Plasma", "Platelets"].map((comp) => (
                                    <label key={comp} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={selectedComponents.includes(comp)}
                                            onChange={() => handleComponentToggle(comp)}
                                            className="w-4 h-4 rounded border-gray-300 dark:border-[#1f1f2e] text-red-600 focus:ring-red-500 bg-white dark:bg-[#16161f]"
                                        />
                                        <span className={`text-sm transition ${selectedComponents.includes(comp) ? "text-gray-900 dark:text-white font-medium" : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"}`}>{comp}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Distance Radius */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Distance Radius</h3>
                                <span className="text-xs font-bold text-red-600 dark:text-red-400">{distance} km</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="50"
                                value={distance}
                                onChange={(e) => setDistance(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-gray-200 dark:bg-[#1f1f2e] rounded-lg appearance-none cursor-pointer accent-red-600"
                            />
                            <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                                <span>1 km</span>
                                <span>50 km</span>
                            </div>
                        </div>

                        {/* Reset Button */}
                        <button
                            onClick={handleResetFilters}
                            className="w-full py-3 bg-gray-100 dark:bg-[#16161f] hover:bg-gray-200 dark:hover:bg-[#1f1f2e] text-gray-600 dark:text-gray-300 font-semibold rounded-xl flex items-center justify-center gap-2 transition"
                        >
                            <RefreshIcon className="w-4 h-4" />
                            Reset Filters
                        </button>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        {/* Content Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div className="min-w-0">
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">Real-time Blood Inventory</h1>
                                <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Showing {filteredResults.length} available centers near your location.</p>
                            </div>
                            <div className="flex gap-3 flex-shrink-0">
                                <button className="px-3 sm:px-4 py-2 bg-white dark:bg-[#111118] border border-gray-200 dark:border-[#1f1f2e] text-gray-700 dark:text-gray-300 font-medium rounded-lg shadow-sm dark:shadow-none hover:bg-gray-50 dark:hover:bg-[#16161f] flex items-center gap-2 transition text-sm">
                                    <MapIcon className="w-4 h-4 flex-shrink-0" />
                                    <span className="hidden sm:inline">View Map</span>
                                </button>
                                <button className="px-3 sm:px-4 py-2 bg-red-600 text-white font-medium rounded-lg shadow-sm hover:bg-red-700 flex items-center gap-2 transition text-sm whitespace-nowrap">
                                    <StarIcon className="w-4 h-4 flex-shrink-0" />
                                    <span className="hidden sm:inline">Emergency</span> Request
                                </button>
                            </div>
                        </div>

                        {/* Cards Grid */}
                        {filteredResults.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                {filteredResults.map((item) => (
                                    <div key={item.id} className={`bg-white dark:bg-[#111118] p-5 sm:p-6 rounded-2xl border shadow-sm dark:shadow-none hover:shadow-md dark:hover:border-[#2a2a3e] transition relative overflow-hidden ${item.isCritical ? "border-red-100 dark:border-red-900/30" : "border-gray-100 dark:border-[#1f1f2e]"}`}>
                                        {item.isCritical && (
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-red-600 blur-3xl opacity-5 dark:opacity-10 rounded-full -mr-10 -mt-10"></div>
                                        )}

                                        <div className="flex justify-between items-start mb-4 gap-2">
                                            <div className={`flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl border flex-shrink-0 ${item.isCritical ? "bg-red-600 text-white shadow-lg shadow-red-600/20 border-transparent" : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/30"}`}>
                                                <span className="text-xl sm:text-2xl font-bold leading-none">{item.bloodGroup}</span>
                                                <span className={`text-[9px] sm:text-[10px] font-bold uppercase mt-1 ${item.isCritical ? "opacity-90" : ""}`}>Blood Group</span>
                                            </div>
                                            {item.isCritical ? (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 uppercase tracking-wide border border-red-200 dark:border-red-800/40 flex-shrink-0">
                                                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-1.5 animate-pulse"></span>
                                                    Critical
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 flex-shrink-0">
                                                    <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-1.5"></span>
                                                    LIVE
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">{item.hospitalName}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-4 line-clamp-1">
                                            <MapPinIcon className="w-4 h-4 flex-shrink-0" />
                                            {item.distance} km away • {item.address}
                                        </p>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-[#1f1f2e] gap-4">
                                            <div className="min-w-0">
                                                <span className={`text-xl sm:text-2xl font-bold ${item.isCritical ? "text-red-600 dark:text-red-400" : "text-gray-900 dark:text-white"}`}>{item.units < 10 && item.units > 0 ? `0${item.units}` : item.units}</span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">Units</span>
                                                <div className="flex flex-col">
                                                    <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">UPDATED {item.lastUpdated}</p>
                                                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">{item.component}</p>
                                                </div>
                                            </div>
                                            <button className={`px-4 sm:px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition flex-shrink-0 text-sm ${item.isCritical ? "shadow-lg shadow-red-600/10" : ""}`}>
                                                Request
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center bg-white dark:bg-[#111118] rounded-2xl border border-gray-100 dark:border-[#1f1f2e]">
                                <div className="bg-gray-50 dark:bg-[#16161f] p-4 rounded-full mb-4">
                                    <SearchIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">No results found</h3>
                                <p className="text-gray-500 dark:text-gray-400 max-w-sm mt-1">
                                    We couldn&apos;t find any blood centers matching your current filters. Try increasing the search radius or changing the blood group.
                                </p>
                                <button onClick={handleResetFilters} className="mt-6 text-red-600 dark:text-red-400 font-medium hover:text-red-700 dark:hover:text-red-300">
                                    Clear all filters
                                </button>
                            </div>
                        )}

                        {/* Load More */}
                        {filteredResults.length > 6 && (
                            <div className="mt-8 flex justify-center">
                                <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#111118] border border-gray-200 dark:border-[#1f1f2e] rounded-xl text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-[#16161f] transition shadow-sm dark:shadow-none">
                                    Load More Centers
                                    <ChevronDownIcon className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
