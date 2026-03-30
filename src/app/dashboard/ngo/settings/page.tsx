"use client";

import { UserCircle, Bell, Shield, Map, HelpCircle } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Portal Settings</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Customize your NGO profile, team access, and communication preferences.</p>
            </div>

            <div className="bg-white dark:bg-[#111118] rounded-2xl border border-gray-100 dark:border-[#1f1f2e] shadow-sm divide-y divide-gray-100 dark:divide-[#1f1f2e] transition-colors">
                <div className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#16161f] transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-500 rounded-xl group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors">
                            <UserCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">Organization Profile</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Update mission statement, logo, and contact details.</p>
                        </div>
                    </div>
                    <button className="text-sm font-bold text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors cursor-pointer">Edit</button>
                </div>

                <div className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#16161f] transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-500 rounded-xl group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                            <Bell className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">Campaign Notifications</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Set alert thresholds for volunteer sign-ups and drive metrics.</p>
                        </div>
                    </div>
                    <button className="text-sm font-bold text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors cursor-pointer">Manage</button>
                </div>

                <div className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#16161f] transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-500 rounded-xl group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors">
                            <Shield className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">Access Control</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Manage team member roles and system permissions.</p>
                        </div>
                    </div>
                    <button className="text-sm font-bold text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors cursor-pointer">Invite</button>
                </div>

                <div className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#16161f] transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-500 rounded-xl group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30 transition-colors">
                            <Map className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">Regional Visibility</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Define search radius and operational areas for drives.</p>
                        </div>
                    </div>
                    <button className="text-sm font-bold text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors cursor-pointer">Configure</button>
                </div>
            </div>

            <div className="flex items-center justify-between p-6 bg-white dark:bg-[#111118] rounded-2xl border border-gray-100 dark:border-[#1f1f2e] shadow-sm border-dashed transition-colors">
                <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                    <HelpCircle className="w-5 h-5" />
                    <p className="text-sm font-medium">Need help with your NGO setup?</p>
                </div>
                <button className="text-sm font-bold text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors cursor-pointer">Contact Support</button>
            </div>

            <div className="pt-4 flex justify-end">
                <button className="px-8 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition shadow-lg shadow-red-200 cursor-pointer">
                    Submit Changes
                </button>
            </div>
        </div>
    );
}
