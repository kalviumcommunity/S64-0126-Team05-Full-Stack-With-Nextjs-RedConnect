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

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white">
            <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition">
                        <ArrowLeftIcon className="w-5 h-5" />
                        <span className="font-medium">Back to Home</span>
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Privacy Policy</h1>
                    <div className="w-20"></div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="prose prose-gray max-w-none text-gray-600">
                    <p className="mb-4">Last updated: February 18, 2026</p>
                    <p className="mb-6">
                        At RedConnect, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>
                    <p className="mb-4">
                        We may collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
                    <p className="mb-4">
                        We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Facilitate account creation and logon process.</li>
                        <li>Post testimonials.</li>
                        <li>Request feedback.</li>
                        <li>Enable user-to-user communications.</li>
                        <li>Manage user accounts.</li>
                    </ul>
                </div>
            </main>
        </div>
    );
}
