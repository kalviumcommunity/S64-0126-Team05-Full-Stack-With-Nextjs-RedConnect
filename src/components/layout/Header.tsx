"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "../ThemeProvider";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 transition-colors">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-DEFAULT rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">●</span>
          </div>
          <span className="font-bold text-lg text-gray-900 dark:text-white hidden xs:inline">
            RedConnect
          </span>
        </div>

        {/* Navigation Links - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#about"
            className="text-gray-700 dark:text-gray-300 hover:text-brand-DEFAULT dark:hover:text-accent-light transition"
          >
            About
          </Link>
          <Link
            href="#blood-availability"
            className="text-gray-700 dark:text-gray-300 hover:text-brand-DEFAULT dark:hover:text-accent-light transition"
          >
            Blood Availability
          </Link>
          <Link
            href="#hospitals"
            className="text-gray-700 dark:text-gray-300 hover:text-brand-DEFAULT dark:hover:text-accent-light transition"
          >
            Hospitals
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle theme"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
                /* Sun icon for dark mode */
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm5.657-9.193a1 1 0 00-1.414 0l-.707.707A1 1 0 005.05 6.464l.707-.707a1 1 0 001.414-1.414zM5 10a1 1 0 100-2H4a1 1 0 100 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                /* Moon icon for light mode */
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
          </button>

          {/* Auth Links - Hidden on small screens */}
          <Link
            href="/signup"
            className="hidden sm:inline-block bg-brand-DEFAULT text-white px-4 sm:px-6 py-2 rounded-lg font-medium hover:bg-brand-dark transition"
          >
            Signup
          </Link>
          <Link
            href="/login"
            className="hidden sm:inline-block text-gray-700 dark:text-gray-300 hover:text-brand-DEFAULT dark:hover:text-accent-light font-medium transition"
          >
            Login
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="#about"
              className="block text-gray-700 dark:text-gray-300 hover:text-brand-DEFAULT dark:hover:text-accent-light transition py-2"
            >
              About
            </Link>
            <Link
              href="#blood-availability"
              className="block text-gray-700 dark:text-gray-300 hover:text-brand-DEFAULT dark:hover:text-accent-light transition py-2"
            >
              Blood Availability
            </Link>
            <Link
              href="#hospitals"
              className="block text-gray-700 dark:text-gray-300 hover:text-brand-DEFAULT dark:hover:text-accent-light transition py-2"
            >
              Hospitals
            </Link>
            <hr className="my-3 border-gray-200 dark:border-gray-700" />
            <div className="space-y-2">
              <Link
                href="/signup"
                className="block w-full text-center bg-brand-DEFAULT text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-dark transition"
              >
                Signup
              </Link>
              <Link
                href="/login"
                className="block w-full text-center text-gray-700 dark:text-gray-300 hover:text-brand-DEFAULT dark:hover:text-accent-light font-medium transition py-2"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

