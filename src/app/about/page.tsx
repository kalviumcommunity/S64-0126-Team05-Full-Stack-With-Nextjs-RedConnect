"use client";

import Link from "next/link";
import Image from "next/image";

function ArrowLeftIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
        </svg>
    );
}

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition">
                        <ArrowLeftIcon className="w-5 h-5" />
                        <span className="font-medium">Back to Home</span>
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">About RedConnect</h1>
                    <div className="w-20"></div>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section className="py-20 px-4 bg-red-50">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Connecting Life, One Drop at a Time</h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            RedConnect is a revolutionary platform designed to bridge the gap between blood donors, hospitals, and NGOs. We believe that technology can solve the critical issues of blood shortage and wastage.
                        </p>
                    </div>
                </section>

                {/* Our Story */}
                <section className="py-16 px-4">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1516574187841-693083f049cb?q=80&w=2070&auto=format&fit=crop"
                                    alt="Medical team working together"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                            <p className="text-gray-600 mb-4 text-lg">
                                Founded in 2024, RedConnect emerged from a simple observation: while there are millions of willing blood donors, the logistics of connecting them to patients in need remains inefficient.
                            </p>
                            <p className="text-gray-600 text-lg">
                                We built a real-time inventory management system that allows hospitals to track their blood supplies and request donations instantly. For donors, we provide a seamless way to find nearby donation centers and track the impact of their contribution.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Vision & Mission */}
                <section className="py-16 px-4 bg-gray-50">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-bold text-red-600 mb-4">Our Vision</h3>
                            <p className="text-gray-600">To create a world where no life is lost due to the unavailability of blood. A connected ecosystem where help is always just a click away.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-bold text-red-600 mb-4">Our Mission</h3>
                            <p className="text-gray-600">To empower donors, modernize blood banks, and ensure rapid response times for medical emergencies through cutting-edge technology.</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
