"use client";

import { BarChart3, TrendingUp, Users, PieChart } from "lucide-react";

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Campaign Analytics</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Monitor donor mobilization efficiency and campaign performance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-[#111118] p-6 rounded-2xl border border-gray-100 dark:border-[#1f1f2e] shadow-sm min-h-[300px] flex flex-col transition-colors">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-red-600 dark:text-red-500" /> Mobilization Trends
                        </h3>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-500 rounded-full mb-4 transition-colors">
                            <BarChart3 className="w-8 h-8" />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Visual trends of donor sign-ups across different regions will appear here.</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#111118] p-6 rounded-2xl border border-gray-100 dark:border-[#1f1f2e] shadow-sm min-h-[300px] flex flex-col transition-colors">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Users className="w-5 h-5 text-blue-600 dark:text-blue-500" /> Volunteer Distribution
                        </h3>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-500 rounded-full mb-4 transition-colors">
                            <PieChart className="w-8 h-8" />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Breakdown of volunteers by skills and availability will be displayed here.</p>
                    </div>
                </div>
            </div>

            <div className="bg-red-600 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg shadow-red-200 dark:shadow-none transition-all">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-xl font-bold mb-2">Generate Custom Impact Report</h3>
                        <p className="text-white/80 text-sm max-w-md">Compile all campaign data and donor mobilization statistics into a professional PDF report for stakeholders.</p>
                    </div>
                    <button className="px-6 py-3 bg-white text-red-600 font-bold rounded-xl hover:bg-red-50 transition shadow-sm whitespace-nowrap cursor-pointer">
                        Generate Report
                    </button>
                </div>
                <div className="absolute -bottom-10 -right-10 bg-white/10 rounded-full p-20 transform rotate-12">
                    <BarChart3 className="w-40 h-40 text-white/5" />
                </div>
            </div>
        </div>
    );
}
