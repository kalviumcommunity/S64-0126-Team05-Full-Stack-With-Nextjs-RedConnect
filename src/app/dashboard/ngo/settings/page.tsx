"use client";

import { UserCircle, Bell, Shield, Map, HelpCircle } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Portal Settings</h1>
                <p className="text-sm text-gray-500">Customize your NGO profile, team access, and communication preferences.</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100">
                <div className="p-6 flex items-center justify-between hover:bg-gray-50 transition cursor-pointer group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-50 text-red-600 rounded-xl group-hover:bg-red-100 transition">
                            <UserCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Organization Profile</h3>
                            <p className="text-sm text-gray-500">Update mission statement, logo, and contact details.</p>
                        </div>
                    </div>
                    <button className="text-sm font-bold text-red-600 hover:text-red-700 transition cursor-pointer">Edit</button>
                </div>

                <div className="p-6 flex items-center justify-between hover:bg-gray-50 transition cursor-pointer group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-100 transition">
                            <Bell className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Campaign Notifications</h3>
                            <p className="text-sm text-gray-500">Set alert thresholds for volunteer sign-ups and drive metrics.</p>
                        </div>
                    </div>
                    <button className="text-sm font-bold text-red-600 hover:text-red-700 transition cursor-pointer">Manage</button>
                </div>

                <div className="p-6 flex items-center justify-between hover:bg-gray-50 transition cursor-pointer group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:bg-purple-100 transition">
                            <Shield className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Access Control</h3>
                            <p className="text-sm text-gray-500">Manage team member roles and system permissions.</p>
                        </div>
                    </div>
                    <button className="text-sm font-bold text-red-600 hover:text-red-700 transition cursor-pointer">Invite</button>
                </div>

                <div className="p-6 flex items-center justify-between hover:bg-gray-50 transition cursor-pointer group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-50 text-orange-600 rounded-xl group-hover:bg-orange-100 transition">
                            <Map className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Regional Visibility</h3>
                            <p className="text-sm text-gray-500">Define search radius and operational areas for drives.</p>
                        </div>
                    </div>
                    <button className="text-sm font-bold text-red-600 hover:text-red-700 transition cursor-pointer">Configure</button>
                </div>
            </div>

            <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 shadow-sm border-dashed">
                <div className="flex items-center gap-3 text-gray-500">
                    <HelpCircle className="w-5 h-5" />
                    <p className="text-sm font-medium">Need help with your NGO setup?</p>
                </div>
                <button className="text-sm font-bold text-red-600 hover:text-red-700 transition cursor-pointer">Contact Support</button>
            </div>

            <div className="pt-4 flex justify-end">
                <button className="px-8 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition shadow-lg shadow-red-200 cursor-pointer">
                    Submit Changes
                </button>
            </div>
        </div>
    );
}
