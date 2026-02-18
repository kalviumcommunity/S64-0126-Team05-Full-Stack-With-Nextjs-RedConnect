"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";

/* ────────────────── Icons ────────────────── */

function BloodDropIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
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

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ────────────────── Landing Page ────────────────── */

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      {/* ── Header ── */}
      <header className="w-full fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-card-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BloodDropIcon className="w-6 h-6 text-accent" />
            <span className="text-lg font-semibold text-foreground">RedConnect</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#about" className="text-foreground hover:text-accent transition">About</Link>
            <Link href="#blood-availability" className="text-foreground hover:text-accent transition">Blood Availability</Link>
            <Link href="#hospitals" className="text-foreground hover:text-accent transition">Hospitals</Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/signup"
              className="hidden sm:inline-flex px-4 py-2 rounded-lg bg-accent text-white font-medium hover:bg-accent-hover transition shadow-sm"
            >
              Signup
            </Link>
            <Link
              href="/login"
              className="hidden sm:inline-flex px-4 py-2 rounded-lg bg-transparent border border-accent text-accent font-medium hover:bg-accent/10 transition"
            >
              Login
            </Link>
            {/* Mobile menu button */}
            <button
              id="mobile-menu-toggle"
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center bg-muted text-foreground hover:bg-card-border transition cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-card-border px-6 py-4 space-y-3 transition-colors duration-300">
            <Link href="#about" className="block text-foreground hover:text-accent transition" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link href="#blood-availability" className="block text-foreground hover:text-accent transition" onClick={() => setMobileMenuOpen(false)}>Blood Availability</Link>
            <Link href="#hospitals" className="block text-foreground hover:text-accent transition" onClick={() => setMobileMenuOpen(false)}>Hospitals</Link>
            <div className="flex gap-3 pt-2">
              <Link href="/signup" className="inline-flex px-4 py-2 rounded-lg bg-accent text-white font-medium hover:bg-accent-hover transition shadow-sm">Signup</Link>
              <Link href="/login" className="inline-flex px-4 py-2 rounded-lg bg-transparent border border-accent text-accent font-medium hover:bg-accent/10 transition">Login</Link>
            </div>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
          <div className="flex-1 text-center md:text-left">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-accent mb-3">
              Real-Time Inventory Management
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-5">
              Connecting Life,
              <br />
              One Drop at a Time
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto md:mx-0 mb-8">
              RedConnect bridges the gap between donors, hospitals, and NGOs with real-time inventory management. Ensure every emergency finds its match.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Link
                href="/search"
                className="inline-flex px-5 sm:px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent-hover transition shadow-md"
              >
                Find Blood
              </Link>
              <Link
                href="/login"
                className="inline-flex px-5 sm:px-6 py-3 rounded-lg bg-transparent border border-accent text-accent font-medium hover:bg-accent/10 transition shadow-md"
              >
                Become a Donor
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center w-full">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80"
                alt="Healthcare professional with blood donation"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 500px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-muted transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { label: "LIVES SAVED", value: "50,000+" },
            { label: "ACTIVE DONORS", value: "12,000+" },
            { label: "PARTNER HOSPITALS", value: "450+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card-bg rounded-xl p-6 sm:p-8 shadow-md text-center border border-card-border transition-colors duration-300"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                {stat.label}
              </p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Our Mission ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-muted transition-colors duration-300" id="about">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Our Mission
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            Ensuring every drop counts through technology and community-driven healthcare.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: ClockIcon,
                title: "Fast",
                description:
                  "Real-time updates on blood inventory across all partner hospitals, reducing response time by 60%.",
              },
              {
                icon: ShieldIcon,
                title: "Reliable",
                description:
                  "A verified network of donors and secure management systems designed for mission-critical medical needs.",
              },
              {
                icon: HeartIcon,
                title: "Impactful",
                description:
                  "Every donation contributes directly to saving lives in your local community. One donor can save three lives.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-card-bg rounded-xl p-6 sm:p-8 shadow-md border border-card-border relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white mb-5">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-accent rounded-2xl sm:rounded-3xl py-10 sm:py-14 px-6 sm:px-8 md:px-16 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
              Immediate Assistance Needed?
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base">
              Check real-time availability of blood types in your local area and connect with nearby hospitals instantly.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
              <Link
                href="#blood-availability"
                className="inline-flex justify-center px-6 py-3 rounded-lg bg-white text-accent font-medium hover:bg-gray-100 transition"
              >
                Search Blood Availability
              </Link>
              <Link
                href="#emergency"
                className="inline-flex justify-center px-6 py-3 rounded-lg bg-transparent border-2 border-white text-white font-medium hover:bg-white/10 transition"
              >
                Emergency Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="mt-auto bg-card-bg border-t border-card-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-8 sm:mb-10">
            <div className="sm:col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <BloodDropIcon className="w-6 h-6 text-accent" />
                <span className="text-lg font-semibold text-foreground">RedConnect</span>
              </Link>
              <p className="text-sm text-muted-foreground mb-4 max-w-xs">
                The world&apos;s most advanced blood inventory management and donor connection platform.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-card-border transition"
                  aria-label="Share"
                >
                  <GlobeIcon className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-card-border transition"
                  aria-label="Email"
                >
                  <MailIcon className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-card-border transition"
                  aria-label="Contact"
                >
                  <MailIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4 uppercase text-sm tracking-wider">
                Platform
              </h4>
              <ul className="space-y-2">
                {["About Us", "How it works", "Safety Guidelines"].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-muted-foreground hover:text-accent transition">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4 uppercase text-sm tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/search" className="text-muted-foreground hover:text-accent transition">
                    Find Blood
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-muted-foreground hover:text-accent transition">
                    Register Donor
                  </Link>
                </li>
                <li>
                  <Link href="#hospitals" className="text-muted-foreground hover:text-accent transition">
                    Partner Hospitals
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4 uppercase text-sm tracking-wider">
                Legal
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-accent transition">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-accent transition">Terms of Use</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-6 sm:pt-8 border-t border-card-border text-center">
            <p className="text-sm text-muted-foreground">
              ©2024 RedConnect. Designed for impact. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
