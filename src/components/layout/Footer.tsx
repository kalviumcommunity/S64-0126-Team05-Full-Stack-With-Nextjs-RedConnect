import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">●</span>
              </div>
              <span className="font-bold text-white">RedConnect</span>
            </div>
            <p className="text-sm">
              The world&aposs most advanced blood inventory management and donor connection platform.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-white font-semibold mb-4">PLATFORM</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition">How it works</Link></li>
              <li><Link href="#" className="hover:text-white transition">Safety Guidelines</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">QUICK LINKS</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition">Find Blood</Link></li>
              <li><Link href="#" className="hover:text-white transition">Register Donor</Link></li>
              <li><Link href="#" className="hover:text-white transition">Partner Hospitals</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">LEGAL</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-700 pt-8 flex items-center justify-between flex-wrap gap-4">
          <p className="text-sm">© 2026 RedConnect. Designed by Impact. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-gray-400 hover:text-white transition">
              <span className="sr-only">Facebook</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5c-.563-.074-1.396-.135-2.477-.135-2.418 0-4.155 1.447-4.155 4.102V8z" />
              </svg>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition">
              <span className="sr-only">Twitter</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
              </svg>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition">
              <span className="sr-only">Email</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
