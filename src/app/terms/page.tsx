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

export default function TermsPage() {
    const sections = [
        {
            title: "1. Acceptance of Terms",
            content: "By accessing and using RedConnect, you agree to be bound by these Terms of Use. If you do not agree, please do not use our services."
        },
        {
            title: "2. User Responsibilities",
            content: "Users must provide accurate information, maintain account security, and use the platform responsibly. Medical professionals must verify their credentials through our verification process."
        },
        {
            title: "3. Blood Donation",
            content: "All blood donations must comply with local health regulations. RedConnect facilitates connections but does not perform medical procedures. Donors must meet eligibility criteria."
        },
        {
            title: "4. Limitation of Liability",
            content: "RedConnect is a platform for connection and coordination. We are not liable for medical outcomes, donation complications, or third-party actions. Users should always consult medical professionals."
        },
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
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">Terms of Use</h1>
                    <div className="w-20 hidden sm:block"></div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Terms of Use</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 sm:mb-10">Last updated: January 2024</p>

                <div className="space-y-8">
                    {sections.map((section) => (
                        <div key={section.title} className="bg-gray-50 dark:bg-[#111118] p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-[#1f1f2e]">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">{section.title}</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{section.content}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 sm:mt-10 text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Questions about our terms?{" "}
                        <Link href="/contact" className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium">
                            Contact us
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
}
