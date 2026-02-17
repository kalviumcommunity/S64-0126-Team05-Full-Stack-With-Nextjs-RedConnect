
import Link from "next/link";
import Footer from "@/components/layout/Footer";

export default function LandingPage() {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <p className="text-brand-DEFAULT font-semibold text-xs sm:text-sm tracking-widest mb-4">
              REAL-TIME INVENTORY MANAGEMENT
            </p>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
              Connecting Life, One Drop at a Time
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
              RedConnect bridges the gap between donors, hospitals, and NGOs with real-time inventory management. Ensure every emergency finds its match.
            </p>
            <div className="flex gap-3 sm:gap-4 flex-wrap">
              <Link
                href="/blood-availability"
                className="bg-brand-DEFAULT text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-brand-dark transition text-sm sm:text-base"
              >
                Find Blood
              </Link>
              <Link
                href="/signup"
                className="border-2 border-brand-DEFAULT text-brand-DEFAULT px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-red-50 transition text-sm sm:text-base"
              >
                Become a Donor
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-red-50 via-orange-50 to-red-100 dark:from-red-950 dark:via-red-900 dark:to-red-800 rounded-lg p-6 sm:p-8">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 sm:h-72 md:h-80 flex items-center justify-center transition">
                <div className="text-center">
                  <div className="w-28 sm:w-32 h-28 sm:h-32 bg-gradient-to-br from-red-200 via-red-300 to-red-400 rounded-lg mx-auto flex items-center justify-center">
                    <span className="text-5xl sm:text-6xl">🩸</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sm:p-8 text-center transition">
            <p className="text-brand-DEFAULT font-semibold text-xs tracking-widest mb-2 sm:mb-4">
              LIVES SAVED
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">50,000+</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sm:p-8 text-center transition">
            <p className="text-brand-DEFAULT font-semibold text-xs tracking-widest mb-2 sm:mb-4">
              ACTIVE DONORS
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">12,000+</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sm:p-8 text-center transition sm:col-span-2 md:col-span-1">
            <p className="text-brand-DEFAULT font-semibold text-xs tracking-widest mb-2 sm:mb-4">
              PARTNER HOSPITALS
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">450+</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 md:py-20 transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
              Ensuring every drop counts through technology and community-driven healthcare.
            </p>
          </div>

          {/* Mission Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1 */}
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 sm:p-8 text-center transition">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 sm:w-8 h-7 sm:h-8 text-brand-DEFAULT" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Fast</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Real-time updates on blood inventory across all partner hospitals, reducing response time by 60%.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 sm:p-8 text-center transition">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 sm:w-8 h-7 sm:h-8 text-brand-DEFAULT" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Reliable</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                A verified network of donors and secure management systems designed for mission-critical medical needs.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 sm:p-8 text-center transition sm:col-span-2 md:col-span-1">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 sm:w-8 h-7 sm:h-8 text-brand-DEFAULT" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Impactful</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Every donation contributes directly to saving lives in your community. One drop can save three lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-DEFAULT dark:bg-red-900 py-12 sm:py-16 md:py-20 transition">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Immediate Assistance Needed?
          </h2>
          <p className="text-red-100 dark:text-red-200 text-base sm:text-lg mb-6 sm:mb-8">
            Check real-time availability of blood types in your local area and connect with nearby hospitals instantly.
          </p>
          <div className="flex gap-3 sm:gap-4 flex-wrap justify-center">
            <Link
              href="/blood-availability"
              className="bg-white text-brand-DEFAULT px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-sm sm:text-base"
            >
              Search Blood Availability
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-brand-dark transition text-sm sm:text-base"
            >
              Emergency Contact
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
