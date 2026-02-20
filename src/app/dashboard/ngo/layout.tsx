"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutGrid,
    Megaphone,
    Package,
    Users,
    BarChart3,
    Search,
    Bell,
    Settings,
} from "lucide-react";

export default function NGOLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const links = [
        { href: "/dashboard/ngo", label: "Dashboard", icon: LayoutGrid },
        { href: "/dashboard/ngo/campaigns", label: "Campaigns", icon: Megaphone },
        { href: "/dashboard/ngo/inventory", label: "Inventory", icon: Package },
        { href: "/dashboard/ngo/volunteers", label: "Volunteers", icon: Users },
        { href: "/dashboard/ngo/reports", label: "Reports", icon: BarChart3 },
    ];

    return (
        <div className="flex h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">
            {/* ── Sidebar ── */}
            <aside className="w-64 bg-white border-r border-gray-100 flex-shrink-0 flex flex-col h-full">
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-red-600 text-white p-1.5 rounded-lg">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="font-bold text-lg text-gray-900 leading-none">RedConnect</h1>
                        <p className="text-xs text-gray-500">NGO Portal</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1 py-4">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors relative ${isActive
                                    ? "bg-red-50 text-red-600"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                            >
                                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 rounded-r-lg"></div>}
                                <Icon className={`w-5 h-5 ${isActive ? "text-red-600" : "text-gray-400"}`} />
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4">
                    <Link href="/dashboard/ngo/campaigns">
                        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-red-600/20 flex items-center justify-center gap-2 transition cursor-pointer">
                            <div className="bg-white/20 p-1 rounded-full">
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            Create Campaign
                        </button>
                    </Link>
                </div>
            </aside>

            {/* ── Main Content ── */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 flex-shrink-0">
                    <h2 className="text-xl font-bold text-gray-900">
                        {links.find(l => l.href === pathname)?.label || "Campaign Management"}
                    </h2>

                    <div className="flex items-center gap-6">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search campaigns..."
                                className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg text-sm w-64 text-gray-700 focus:ring-2 focus:ring-red-100 focus:bg-white transition"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 transition">
                                <Bell className="w-5 h-5" />
                            </button>
                            <Link href="/dashboard/ngo/settings">
                                <button className="p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 transition">
                                    <Settings className="w-5 h-5" />
                                </button>
                            </Link>
                        </div>

                        <div className="h-8 w-px bg-gray-200"></div>

                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                            <Image
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80"
                                alt="Profile"
                                width={40}
                                height={40}
                                className="object-cover"
                            />
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
