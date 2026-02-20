"use client";

/* ── Icons ── */

function BarChartIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="20" x2="12" y2="10" />
            <line x1="18" y1="20" x2="18" y2="4" />
            <line x1="6" y1="20" x2="6" y2="16" />
        </svg>
    );
}

function TrendingUpIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
        </svg>
    );
}

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
                <p className="text-sm text-gray-500">View detailed analytics on blood stock trends and donation statistics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[300px] flex flex-col items-center justify-center text-center">
                    <div className="p-4 bg-red-50 text-red-600 rounded-full mb-4">
                        <BarChartIcon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Stock Trends</h3>
                    <p className="text-sm text-gray-500 mt-2">Visual representation of inventory changes over time will appear here.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[300px] flex flex-col items-center justify-center text-center">
                    <div className="p-4 bg-blue-50 text-blue-600 rounded-full mb-4">
                        <TrendingUpIcon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Donation Growth</h3>
                    <p className="text-sm text-gray-500 mt-2">Analytics on donor recruitment and retention will be displayed here.</p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-dashed border-gray-200 text-center">
                <p className="text-gray-500">More advanced reporting features are currently under development.</p>
            </div>
        </div>
    );
}
