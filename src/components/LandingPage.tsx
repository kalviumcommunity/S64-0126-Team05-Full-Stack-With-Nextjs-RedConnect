
import Link from "next/link";
import Footer from "@/components/layout/Footer";

export default function LandingPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <p className="text-red-600 font-semibold text-sm tracking-widest mb-4">
              REAL-TIME INVENTORY MANAGEMENT
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Connecting Life, One Drop at a Time
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              RedConnect bridges the gap between donors, hospitals, and NGOs with real-time inventory management. Ensure every emergency finds its match.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/blood-availability"
                className="bg-red-600 text-white px-8 py-3 rounded font-semibold hover:bg-red-700 transition"
              >
                Find Blood
              </Link>
              <Link
                href="/register-donor"
                className="border-2 border-red-600 text-red-600 px-8 py-3 rounded font-semibold hover:bg-red-50 transition"
              >
                Become a Donor
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-8">
              <div className="bg-gray-300 rounded-lg h-64 md:h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-red-200 to-red-300 rounded-lg mx-auto flex items-center justify-center">
                    <span className="text-6xl">🩸</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-red-600 font-semibold text-xs tracking-widest mb-2">
              LIVES SAVED
            </p>
            <p className="text-4xl font-bold text-gray-900">50,000+</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-red-600 font-semibold text-xs tracking-widest mb-2">
              ACTIVE DONORS
            </p>
            <p className="text-4xl font-bold text-gray-900">12,000+</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-red-600 font-semibold text-xs tracking-widest mb-2">
              PARTNER HOSPITALS
            </p>
            <p className="text-4xl font-bold text-gray-900">450+</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Ensuring every drop counts through technology and community-driven healthcare.
            </p>
          </div>

          {/* Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fast</h3>
              <p className="text-gray-600 text-sm">
                Real-time updates on blood inventory across all partner hospitals, reducing response time by 60%.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Reliable</h3>
              <p className="text-gray-600 text-sm">
                A verified network of donors and secure management systems designed for mission-critical medical needs.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Impactful</h3>
              <p className="text-gray-600 text-sm">
                Every donation contributes directly to saving lives in your community. One drop can save three lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Immediate Assistance Needed?
          </h2>
          <p className="text-red-100 text-lg mb-8">
            Check real-time availability of blood types in your local area and connect with nearby hospitals instantly.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              href="/search-blood-availability"
              className="bg-white text-red-600 px-8 py-3 rounded font-semibold hover:bg-gray-100 transition"
            >
              Search Blood Availability
            </Link>
            <Link
              href="/emergency-contact"
              className="border-2 border-white text-white px-8 py-3 rounded font-semibold hover:bg-red-700 transition"
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
