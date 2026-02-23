"use client";

/* ── Icons ── */

function UserIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}

function BellIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
    );
}

function ShieldIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    );
}

export default function SettingsPage() {
    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Hospital Settings</h1>
                <p className="text-sm text-gray-500">Manage your hospital profile, notifications, and security preferences.</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100">
                <div className="p-6 flex items-center justify-between hover:bg-gray-50 transition cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                            <UserIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Hospital Profile</h3>
                            <p className="text-sm text-gray-500">Update name, address, and contact information.</p>
                        </div>
                    </div>
                    <button className="text-sm font-semibold text-red-600">Edit</button>
                </div>

                <div className="p-6 flex items-center justify-between hover:bg-gray-50 transition cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <BellIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Notifications</h3>
                            <p className="text-sm text-gray-500">Configure alert preferences for urgent requests.</p>
                        </div>
                    </div>
                    <button className="text-sm font-semibold text-red-600">Manage</button>
                </div>

                <div className="p-6 flex items-center justify-between hover:bg-gray-50 transition cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                            <ShieldIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Security & Privacy</h3>
                            <p className="text-sm text-gray-500">Manage passwords and account permissions.</p>
                        </div>
                    </div>
                    <button className="text-sm font-semibold text-red-600">Update</button>
                </div>
            </div>

            <div className="pt-4">
                <button className="px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition shadow-lg shadow-red-200">
                    Save All Changes
                </button>
            </div>
        </div>
    );
}
