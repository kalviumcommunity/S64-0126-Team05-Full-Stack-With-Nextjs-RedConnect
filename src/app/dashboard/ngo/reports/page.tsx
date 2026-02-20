"use client";

import { BarChart3, TrendingUp, Users, PieChart } from "lucide-react";

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Campaign Analytics</h1>
                <p className="text-sm text-gray-500">Monitor donor mobilization efficiency and campaign performance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[300px] flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-red-600" /> Mobilization Trends
                        </h3>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                        <div className="p-4 bg-red-50 text-red-600 rounded-full mb-4">
                            <BarChart3 className="w-8 h-8" />
                        </div>
                        <p className="text-sm text-gray-500">Visual trends of donor sign-ups across different regions will appear here.</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[300px] flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <Users className="w-5 h-5 text-blue-600" /> Volunteer Distribution
                        </h3>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                        <div className="p-4 bg-blue-50 text-blue-600 rounded-full mb-4">
                            <PieChart className="w-8 h-8" />
                        </div>
                        <p className="text-sm text-gray-500">Breakdown of volunteers by skills and availability will be displayed here.</p>
                    </div>
                </div>
            </div>

            <div className="bg-red-600 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg shadow-red-200">
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
