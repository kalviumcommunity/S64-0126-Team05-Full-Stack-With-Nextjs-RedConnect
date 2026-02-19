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
    return (
        <div className="min-h-screen bg-white">
            <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition">
                        <ArrowLeftIcon className="w-5 h-5" />
                        <span className="font-medium">Back to Home</span>
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Safety Guidelines</h1>
                    <div className="w-20"></div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="prose prose-red max-w-none">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Is it safe to donate blood?</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Yes. Donating blood is a safe process. A new sterile needle is used for each donor and is discarded directly after use. You cannot get HIV or any other infectious disease from donating blood.
                    </p>

                    <div className="space-y-8">
                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Before Donation</h3>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                <li><strong>Hydrate:</strong> Drink an extra 16 oz. of water before your appointment.</li>
                                <li><strong>Eat Healthy:</strong> Eat a healthy meal, avoiding fatty foods like hamburgers, fries, or ice cream.</li>
                                <li><strong>Rest:</strong> Get a good night's sleep the night before.</li>
                                <li><strong>Bring ID:</strong> Have your ID ready when you arrive.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">During Donation</h3>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                <li><strong>Relax:</strong> The process is simple and relatively painless. Listen to music or read a book.</li>
                                <li><strong>Communicate:</strong> If you feel lightheaded or uncomfortable, tell the staff immediately.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">After Donation</h3>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                <li><strong>Snack:</strong> Enjoy a snack and a drink in the refreshment area for 10-15 minutes.</li>
                                <li><strong>Hydrate:</strong> Drink extra fluids for the next 24 hours.</li>
                                <li><strong>Avoid Strenuous Activity:</strong> Avoid heavy lifting or vigorous exercise for the rest of the day.</li>
                                <li><strong>Bandage:</strong> Keep the bandage on your arm for at least 4 hours.</li>
                            </ul>
                        </section>
                    </div>

                    <div className="mt-12 bg-yellow-50 p-6 rounded-xl border border-yellow-100">
                        <h3 className="text-xl font-bold text-yellow-800 mb-2">Eligibility</h3>
                        <p className="text-yellow-700">
                            To donate blood, you generally must be at least 17 years old, weigh at least 110 lbs, and be in good health. Specific eligibility criteria may vary by location and health history.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
