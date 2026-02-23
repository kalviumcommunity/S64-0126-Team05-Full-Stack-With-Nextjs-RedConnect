"use client";

import Link from "next/link";

/* ── Icons ── */

function UserPlusIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" />
            <line x1="23" y1="11" x2="17" y2="11" />
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

function MapPinIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}

function HeartIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
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

/* ── How It Works Page ── */

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-white">
            <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition">
                        <ArrowLeftIcon className="w-5 h-5" />
                        <span className="font-medium">Back to Home</span>
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">How It Works</h1>
                    <div className="w-20"></div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Be a Hero in 4 Simple Steps</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Donating blood is safe, simple, and saves lives. Here is how you can get started with RedConnect.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            icon: UserPlusIcon,
                            title: "1. Register",
                            description: "Create your donor profile. It takes less than 2 minutes to join our community of life-savers."
                        },
                        {
                            icon: SearchIcon,
                            title: "2. Find Center",
                            description: "Use our real-time map to find nearby hospitals or blood donation drives needing your blood type."
                        },
                        {
                            icon: MapPinIcon,
                            title: "3. Donate",
                            description: "Visit the center. The donation process is quick, sterile, and monitored by professionals."
                        },
                        {
                            icon: HeartIcon,
                            title: "4. Save Lives",
                            description: "Your single donation can save up to three lives. Track your impact on your dashboard."
                        }
                    ].map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 bg-red-50 rounded-2xl border border-red-100">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-red-600 shadow-sm mb-6">
                                <step.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-20 bg-gray-900 rounded-3xl p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-6">Ready to make a difference?</h2>
                    <Link href="/signup" className="inline-block bg-red-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-red-700 transition shadow-lg shadow-red-600/20">
                        Become a Donor Today
                    </Link>
                </div>
            </main>
        </div>
    );
}
