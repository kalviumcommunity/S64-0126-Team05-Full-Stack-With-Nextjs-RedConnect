"use client";

import Link from "next/link";

function ArrowLeftIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
        </svg>
    );
}

export default function SafetyPage() {
    const guidelines = [
        { title: "Before Donation", items: ["Eat a healthy meal", "Drink plenty of water", "Get a good night's sleep", "Bring a valid ID"] },
        { title: "During Donation", items: ["Inform staff of any medications", "Relax and stay calm", "The process takes about 10 minutes", "Notify staff if you feel unwell"] },
        { title: "After Donation", items: ["Rest for 10-15 minutes", "Drink extra fluids for 24 hours", "Avoid heavy lifting for 5 hours", "Apply pressure if bleeding occurs"] },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0f] transition-colors">
            {/* Header */}
            <header className="bg-white dark:bg-[#111118] shadow-sm dark:shadow-none sticky top-0 z-10 border-b border-gray-100 dark:border-[#1f1f2e]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition">
                        <ArrowLeftIcon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium">Back to Home</span>
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">Safety Guidelines</h1>
                    <div className="w-20 hidden sm:block"></div>
                </div>
            </header>

            <main>
                {/* Hero */}
                <section className="py-12 sm:py-20 px-4 bg-red-50 dark:bg-red-900/10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">Safety Guidelines</h1>
                        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Your safety is our top priority. Follow these guidelines to ensure a safe and comfortable donation experience.
                        </p>
                    </div>
                </section>

                {/* Guidelines */}
                <section className="py-12 sm:py-16 px-4">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        {guidelines.map((section) => (
                            <div key={section.title} className="bg-gray-50 dark:bg-[#111118] p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-[#1f1f2e]">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">{section.title}</h3>
                                <ul className="space-y-3">
                                    {section.items.map((item) => (
                                        <li key={item} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                                            <span className="text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Important Note */}
                <section className="py-12 sm:py-16 px-4 bg-gray-50 dark:bg-[#111118]">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-yellow-50 dark:bg-yellow-900/15 border border-yellow-200 dark:border-yellow-800/30 rounded-2xl p-6 sm:p-8">
                            <h3 className="text-lg sm:text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-3">⚠️ Important Notice</h3>
                            <p className="text-yellow-700 dark:text-yellow-200/80">
                                If you have any medical conditions, are taking medications, or have traveled to certain regions recently, please consult with our medical staff before donating. Your health and safety come first.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
