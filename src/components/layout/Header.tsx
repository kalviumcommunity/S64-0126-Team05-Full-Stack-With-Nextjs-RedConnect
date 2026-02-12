"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">●</span>
          </div>
          <span className="font-bold text-lg text-gray-900">RedConnect</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#about" className="text-gray-700 hover:text-gray-900 transition">
            About
          </Link>
          <Link href="#blood-availability" className="text-gray-700 hover:text-gray-900 transition">
            Blood Availability
          </Link>
          <Link href="#hospitals" className="text-gray-700 hover:text-gray-900 transition">
            Hospitals
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Link
            href="/signup"
            className="bg-red-600 text-white px-6 py-2 rounded font-medium hover:bg-red-700 transition"
          >
            Signup
          </Link>
          <Link
            href="/login"
            className="text-gray-700 hover:text-gray-900 font-medium transition"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}

