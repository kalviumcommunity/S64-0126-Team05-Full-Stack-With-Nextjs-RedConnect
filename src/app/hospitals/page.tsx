"use client";

import Link from "next/link";
import { useState } from "react";

/* ── Icons ── */

function MapPinIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}

function PhoneIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    );
}

function SearchIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    );
}

function ArrowLeftIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
        </svg>
    );
}


/* ── Hospitals Page ── */

export default function HospitalsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const hospitals = [
        {
            id: 1,
            name: "City General Hospital",
            address: "124 Medical Dr, Downtown",
            phone: "+1 (555) 123-4567",
            distance: "2.4 km",
            type: "Public",
        },
        {
            id: 2,
            name: "St. Jude Medical Center",
            address: "88 West Avenue, Uptown",
            phone: "+1 (555) 987-6543",
            distance: "4.1 km",
            type: "Private",
        },
        {
            id: 3,
            name: "Community Health Clinic",
            address: "45 North St, Suburbs",
            phone: "+1 (555) 555-0199",
            distance: "6.8 km",
            type: "Public",
        },
        {
            id: 4,
            name: "Veteran's Memorial Hospital",
            address: "101 Veterans Way",
            phone: "+1 (555) 222-3333",
            distance: "8.2 km",
            type: "Government",
        },
        {
            id: 5,
            name: "Children's Speciality Hospital",
            address: "55 Kids Lane",
            phone: "+1 (555) 444-5555",
            distance: "12.5 km",
            type: "Speciality",
        },
    ];

    const filteredHospitals = hospitals.filter((hospital) =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* ── Header ── */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition">
                        <ArrowLeftIcon className="w-5 h-5" />
                        <span className="font-medium">Back to Home</span>
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Partner Hospitals</h1>
                    <div className="w-20"></div> {/* Spacer for centering */}
                </div>
            </header>


            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                {/* Search Bar */}
                <div className="max-w-xl mx-auto mb-8 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 sm:text-sm shadow-sm transition duration-150 ease-in-out"
                        placeholder="Search hospitals by name or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Hospitals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredHospitals.map((hospital) => (
                        <div key={hospital.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 Hover:shadow-md transition">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                                    <span className="font-bold text-lg">H</span>
                                </div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {hospital.type}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{hospital.name}</h3>
                            <div className="space-y-2 text-sm text-gray-500">
                                <div className="flex items-start gap-2">
                                    <MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <span>{hospital.address}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-semibold bg-gray-100 px-2 py-0.5 rounded text-gray-600">{hospital.distance} away</span>
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                                <a href={`tel:${hospital.phone}`} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600 transition">
                                    <PhoneIcon className="w-4 h-4" />
                                    Call Now
                                </a>
                                <button className="text-sm font-medium text-red-600 hover:text-red-700 transition">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}

                    {filteredHospitals.length === 0 && (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500 text-lg">No hospitals found matching "{searchTerm}".</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
