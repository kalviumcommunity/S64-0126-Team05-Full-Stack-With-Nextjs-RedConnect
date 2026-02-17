"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  icon: string;
  section: "main" | "platform" | "management";
}

const navigationLinks: NavItem[] = [
  // Main
  { href: "/dashboard", label: "Overview", icon: "📊", section: "main" },
  { href: "/blood-availability", label: "Blood Search", icon: "🔍", section: "main" },
  
  // Platform
  { href: "/donors", label: "Donor Profiles", icon: "👥", section: "platform" },
  { href: "/campaigns", label: "Campaigns", icon: "📢", section: "platform" },
  
  // Management
  { href: "/requests", label: "Requests", icon: "📥", section: "management" },
  { href: "/reports", label: "Reports", icon: "📈", section: "management" },
  { href: "/settings", label: "Settings", icon: "⚙️", section: "management" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  const mainLinks = navigationLinks.filter((l) => l.section === "main");
  const platformLinks = navigationLinks.filter((l) => l.section === "platform");
  const managementLinks = navigationLinks.filter((l) => l.section === "management");

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-white border-r border-gray-200 p-6 overflow-y-auto transition-all duration-300">
      {/* Logo Section */}
      <div className="mb-8">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <span className="text-2xl">🩸</span>
          <div>
            <h1 className="text-lg font-bold text-gray-900">
              RedConnect
            </h1>
            <p className="text-xs text-gray-500">Blood Network</p>
          </div>
        </Link>
      </div>

      {/* Navigation Sections */}
      <nav className="space-y-8">
        {/* Main Section */}
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 px-2">
            Main
          </h2>
          <ul className="space-y-1">
            {mainLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive(link.href)
                      ? "bg-brand-DEFAULT text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="font-medium">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Platform Section */}
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 px-2">
            Platform
          </h2>
          <ul className="space-y-1">
            {platformLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive(link.href)
                      ? "bg-brand-DEFAULT text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="font-medium">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Management Section */}
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 px-2">
            Management
          </h2>
          <ul className="space-y-1">
            {managementLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive(link.href)
                      ? "bg-brand-DEFAULT text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="font-medium">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Footer Help Section */}
      <div className="pt-6 border-t border-gray-200">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-xs text-blue-800 font-medium mb-2">
            💡 Need Help?
          </p>
          <p className="text-xs text-blue-700 mb-3">
            Check our documentation and FAQs
          </p>
          <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-xs font-semibold">
            View Docs
          </button>
        </div>
      </div>
    </aside>
  );
}

