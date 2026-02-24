"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function HospitalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M5 21V7l8-4v18" />
      <path d="M19 21V11l-6-4" />
      <path d="M9 9h1" />
      <path d="M9 13h1" />
      <path d="M9 17h1" />
    </svg>
  );
}

/* ────────────────── Animated Counter ────────────────── */

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const numericTarget = parseInt(target.replace(/[^0-9]/g, ""));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const increment = numericTarget / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericTarget) {
        setCount(numericTarget);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, numericTarget]);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl md:text-5xl font-black text-white tabular-nums">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

/* ────────────────── Landing Page ────────────────── */

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-white relative">
      {/* ── Background Video ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover"
        style={{ zIndex: -2 }}
      >
        <source src="/35461-405897690_medium.mp4" type="video/mp4" />
      </video>

      {/* ── Dark Vignette Overlay ── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -1,
          background: `
            radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 70%, rgba(0,0,0,0.95) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.8) 100%)
          `,
        }}
      />

      {/* ── Header ── */}
      <header
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/70 backdrop-blur-xl border-b border-white/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <BloodDropIcon className="w-7 h-7 text-red-500 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xl font-bold text-white tracking-tight">RedConnect</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium tracking-wide">About</Link>
            <Link href="/search" className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium tracking-wide">Blood Availability</Link>
            <Link href="/hospitals" className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium tracking-wide">Hospitals</Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/signup"
              className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-red-600 text-white text-sm font-semibold hover:bg-red-500 transition-all duration-300 shadow-lg shadow-red-600/30 hover:shadow-red-500/50 hover:scale-105"
            >
              Signup
            </Link>
            <Link
              href="/login"
              className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              Login
            </Link>
            {/* Mobile menu button */}
            <button
              id="mobile-menu-toggle"
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/80 backdrop-blur-2xl border-t border-white/10 px-6 py-5 space-y-3 animate-[fadeIn_0.2s_ease-out]">
            <Link href="/about" className="block text-white/80 hover:text-white transition py-1" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link href="/search" className="block text-white/80 hover:text-white transition py-1" onClick={() => setMobileMenuOpen(false)}>Blood Availability</Link>
            <Link href="/hospitals" className="block text-white/80 hover:text-white transition py-1" onClick={() => setMobileMenuOpen(false)}>Hospitals</Link>
            <div className="flex gap-3 pt-3">
              <Link href="/signup" className="inline-flex px-5 py-2.5 rounded-full bg-red-600 text-white text-sm font-semibold hover:bg-red-500 transition shadow-lg shadow-red-600/30">Signup</Link>
              <Link href="/login" className="inline-flex px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold hover:bg-white/20 transition">Login</Link>
            </div>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/20 border border-red-500/30 backdrop-blur-sm mb-8 animate-[fadeIn_0.6s_ease-out]">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-red-400">
              Real-Time Inventory Management
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[0.95] mb-6 sm:mb-8 animate-[fadeIn_0.8s_ease-out]">
            Connecting Life,
            <br />
            <span className="bg-gradient-to-r from-red-500 via-red-400 to-rose-400 bg-clip-text text-transparent">
              One Drop at a Time
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed animate-[fadeIn_1s_ease-out]">
            RedConnect bridges the gap between donors, hospitals, and NGOs with real-time inventory management. Ensure every emergency finds its match.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-5 mb-16 animate-[fadeIn_1.2s_ease-out]">
            <Link
              href="/search"
              className="group inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-red-600 text-white font-semibold text-base sm:text-lg hover:bg-red-500 transition-all duration-300 shadow-2xl shadow-red-600/40 hover:shadow-red-500/60 hover:scale-105"
            >
              Find Blood
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-base sm:text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              Become a Donor
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDownIcon className="w-6 h-6 text-white/40" />
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              { label: "Lives Saved", value: "50000", suffix: "+", icon: HeartIcon },
              { label: "Active Donors", value: "12000", suffix: "+", icon: UsersIcon },
              { label: "Partner Hospitals", value: "450", suffix: "+", icon: HospitalIcon },
            ].map((stat) => (
              <div
                key={stat.label}
                className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 sm:p-10 border border-white/10 text-center transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-600/10"
              >
                <div className="w-14 h-14 rounded-2xl bg-red-600/20 flex items-center justify-center text-red-400 mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-7 h-7" />
                </div>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="text-sm font-semibold uppercase tracking-wider text-white/50 mt-3">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Mission ── */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6" id="about">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-widest text-red-400 mb-4">
              What drives us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5">
              Our Mission
            </h2>
            <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Ensuring every drop counts through technology and community-driven healthcare.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: ClockIcon,
                title: "Fast",
                description:
                  "Real-time updates on blood inventory across all partner hospitals, reducing response time by 60%.",
                gradient: "from-orange-500 to-red-600",
              },
              {
                icon: ShieldIcon,
                title: "Reliable",
                description:
                  "A verified network of donors and secure management systems designed for mission-critical medical needs.",
                gradient: "from-red-500 to-rose-600",
              },
              {
                icon: HeartIcon,
                title: "Impactful",
                description:
                  "Every donation contributes directly to saving lives in your local community. One donor can save three lives.",
                gradient: "from-rose-500 to-pink-600",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-7 sm:p-9 border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-600/10 overflow-hidden"
              >
                {/* Subtle gradient glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-r from-red-700 via-red-600 to-rose-600 rounded-3xl py-12 sm:py-16 px-6 sm:px-10 md:px-16 text-center overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Immediate Assistance Needed?
              </h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-8 text-sm sm:text-base md:text-lg leading-relaxed">
                Check real-time availability of blood types in your local area and connect with nearby hospitals instantly.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
                <Link
                  href="/search"
                  className="inline-flex justify-center items-center gap-2 px-7 py-3.5 rounded-full bg-white text-red-600 font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:scale-105"
                >
                  Search Blood Availability
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex justify-center items-center gap-2 px-7 py-3.5 rounded-full bg-transparent border-2 border-white/60 text-white font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 hover:scale-105"
                >
                  Emergency Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="mt-auto bg-black/50 backdrop-blur-2xl border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-8 sm:mb-10">
            <div className="sm:col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4 group">
                <BloodDropIcon className="w-7 h-7 text-red-500 group-hover:scale-110 transition-transform" />
                <span className="text-lg font-bold text-white">RedConnect</span>
              </Link>
              <p className="text-sm text-white/50 mb-5 max-w-xs leading-relaxed">
                The world&apos;s most advanced blood inventory management and donor connection platform.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all duration-300"
                  aria-label="Share"
                >
                  <GlobeIcon className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all duration-300"
                  aria-label="Email"
                >
                  <MailIcon className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all duration-300"
                  aria-label="Contact"
                >
                  <MailIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-widest">
                Platform
              </h4>
              <ul className="space-y-2.5">
                <li><Link href="/about" className="text-white/50 hover:text-red-400 transition text-sm">About Us</Link></li>
                <li><Link href="/how-it-works" className="text-white/50 hover:text-red-400 transition text-sm">How it works</Link></li>
                <li><Link href="/safety" className="text-white/50 hover:text-red-400 transition text-sm">Safety Guidelines</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-widest">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/search" className="text-white/50 hover:text-red-400 transition text-sm">
                    Find Blood
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="text-white/50 hover:text-red-400 transition text-sm">
                    Register Donor
                  </Link>
                </li>
                <li>
                  <Link href="/hospitals" className="text-white/50 hover:text-red-400 transition text-sm">
                    Partner Hospitals
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-widest">
                Legal
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/privacy" className="text-white/50 hover:text-red-400 transition text-sm">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms" className="text-white/50 hover:text-red-400 transition text-sm">Terms of Use</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-6 sm:pt-8 border-t border-white/10 text-center">
            <p className="text-sm text-white/40">
              ©2024 RedConnect. Designed for impact. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
