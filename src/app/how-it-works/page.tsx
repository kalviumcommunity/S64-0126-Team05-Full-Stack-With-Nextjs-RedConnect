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

export default function HowItWorksPage() {
    const steps = [
        { number: "01", title: "Sign Up", description: "Create your free account as a Donor, Hospital, or NGO. It takes less than 2 minutes.", icon: "👤" },
        { number: "02", title: "Find or Request Blood", description: "Donors can find nearby donation drives. Hospitals can create urgent blood requests instantly.", icon: "🔍" },
        { number: "03", title: "Connect & Donate", description: "Our system matches requests with available donors in real-time for the fastest response.", icon: "🤝" },
        { number: "04", title: "Save Lives", description: "Every donation makes an impact. Track your contribution and the lives you've helped save.", icon: "❤️" },
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
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">How It Works</h1>
                    <div className="w-20 hidden sm:block"></div>
                </div>
            </header>

            <main>
                {/* Hero */}
                <section className="py-12 sm:py-20 px-4 bg-red-50 dark:bg-red-900/10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">How RedConnect Works</h1>
                        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            A simple, fast, and reliable way to connect blood donors with those in need.
                        </p>
                    </div>
                </section>

                {/* Steps */}
                <section className="py-12 sm:py-16 px-4">
                    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
                        {steps.map((step) => (
                            <div key={step.number} className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 bg-gray-50 dark:bg-[#111118] p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-[#1f1f2e]">
                                <div className="flex items-center gap-4 sm:flex-col sm:items-center flex-shrink-0">
                                    <span className="text-3xl sm:text-4xl">{step.icon}</span>
                                    <span className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full">STEP {step.number}</span>
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="py-12 sm:py-16 px-4 bg-red-600 dark:bg-red-700">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to make a difference?</h2>
                        <p className="text-red-100 mb-8 max-w-xl mx-auto">Join our community of donors and hospitals working together to save lives.</p>
                        <Link href="/signup" className="inline-block bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition shadow-lg">
                            Get Started Now
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
