"use client";

import Link from "next/link";
import { useState } from "react";

/* ── Icons ── */

function PhoneIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
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

/* ── Contact Page ── */

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission logic
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* ── Header ── */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition">
                        <ArrowLeftIcon className="w-5 h-5" />
                        <span className="font-medium">Back to Home</span>
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Emergency Contact</h1>
                    <div className="w-20"></div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Emergency Info */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">We are here to help.</h2>
                        <p className="text-gray-600 mb-8 text-lg">
                            If you have a medical emergency, please call your local emergency number immediately. For blood availability inquiries, supply coordination, or technical support, use the contact details below.
                        </p>

                        <div className="space-y-6">
                            <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                                <h3 className="font-bold text-red-700 text-lg mb-2">Emergency Hotline (24/7)</h3>
                                <div className="flex items-center gap-3">
                                    <PhoneIcon className="w-6 h-6 text-red-600" />
                                    <span className="text-2xl font-bold text-red-600">1-800-RED-HELP</span>
                                </div>
                                <p className="text-sm text-red-600/80 mt-2">For urgent blood requests only.</p>
                            </div>

                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="font-bold text-gray-900 text-lg mb-2">General Inquiries</h3>
                                <div className="flex items-center gap-3 mb-2">
                                    <a href="mailto:support@redconnect.com" className="text-gray-600 hover:text-red-600 transition">support@redconnect.com</a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-600">+1 (555) 123-4567</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="block w-full rounded-lg border-gray-300 border px-4 py-2 focus:border-red-500 focus:ring-red-500 shadow-sm"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="block w-full rounded-lg border-gray-300 border px-4 py-2 focus:border-red-500 focus:ring-red-500 shadow-sm"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="block w-full rounded-lg border-gray-300 border px-4 py-2 focus:border-red-500 focus:ring-red-500 shadow-sm"
                                    placeholder="How can we help you?"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition shadow-md"
                            >
                                {submitted ? "Message Sent!" : "Send Message"}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
