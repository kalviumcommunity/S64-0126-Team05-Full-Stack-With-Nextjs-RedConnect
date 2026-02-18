"use client";

import Image from "next/image";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
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

function MessageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="w-full bg-white px-8 py-4 flex justify-between items-center border-b border-gray-100">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800">Hospital Overview</h1>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative hidden md:block">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search donors, units, or requests..."
            className="pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm w-80 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-red-100 focus:bg-white transition"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 transition relative">
            <BellIcon className="w-5 h-5" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 transition">
            <MessageIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Profile separator */}
        <div className="h-8 w-px bg-gray-200"></div>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-gray-900 leading-none">Dr. Sarah Miller</p>
            <p className="text-xs text-red-600 font-medium uppercase tracking-wide mt-1">Blood Bank Manager</p>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&q=80"
              alt="Profile"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
