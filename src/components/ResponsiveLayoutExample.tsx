/**
 * ResponsiveLayoutExample.tsx
 * 
 * Demonstrates all responsive design patterns used in RedConnect:
 * - Mobile-first breakpoints (xs, sm, md, lg, xl)
 * - Responsive typography
 * - Responsive spacing
 * - Responsive grids
 * - Dark mode support
 * 
 * This component serves as a reference for implementing responsive layouts
 * throughout the application.
 */

'use client';

import { useTheme } from './ThemeProvider';

export default function ResponsiveLayoutExample() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      {/* SECTION 1: Typography Responsive Scale */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="mb-8">
          <p className="text-xs sm:text-sm md:text-base font-semibold text-brand-DEFAULT tracking-widest mb-4">
            RESPONSIVE TYPOGRAPHY
          </p>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Heading Scales Across Breakpoints
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
            This heading uses responsive typography: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl</code>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">MOBILE (xs-sm)</p>
            <p className="text-xl font-bold">24px (Heading)</p>
            <p className="text-base">16px (Body)</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">DESKTOP (lg+)</p>
            <p className="text-4xl font-bold">60px (Heading)</p>
            <p className="text-lg">20px (Body)</p>
          </div>
        </div>
      </section>

      {/* SECTION 2: Responsive Spacing & Padding */}
      <section className="bg-gray-50 dark:bg-gray-800 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">
            Responsive Spacing
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Padding and margins scale with breakpoints for consistent spacing:
          </p>

          <div className="space-y-4">
            {/* Container with responsive padding */}
            <div className="bg-white dark:bg-gray-900 border-2 border-brand-DEFAULT rounded-lg p-4 sm:p-6 md:p-8 lg:p-12">
              <p className="text-sm font-semibold text-brand-DEFAULT mb-2">Padding: p-4 sm:p-6 md:p-8 lg:p-12</p>
              <p className="text-gray-600 dark:text-gray-400">
                Mobile: 16px • Tablet: 24px • Desktop: 32px • Large: 48px
              </p>
            </div>

            {/* Responsive gaps in flex */}
            <div>
              <p className="text-sm font-semibold text-brand-DEFAULT mb-3">Gap: gap-4 sm:gap-6 md:gap-8</p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
                <div className="flex-1 bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  Item 1
                </div>
                <div className="flex-1 bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  Item 2
                </div>
                <div className="flex-1 bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  Item 3
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Responsive Grid Layouts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-12 sm:py-16 md:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">
          Responsive Grid Systems
        </h2>

        {/* 2-column to 3-column transition */}
        <div className="mb-12">
          <p className="text-sm font-semibold text-brand-DEFAULT mb-4">
            Grid: grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center hover:shadow-lg dark:hover:shadow-gray-900 transition"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-brand-light to-brand-DEFAULT rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">{num}</span>
                </div>
                <h3 className="font-semibold mb-2">Card {num}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  1 col (xs-sm) • 2 cols (md) • 3 cols (lg+)
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 1-column to 2-column with aside */}
        <div>
          <p className="text-sm font-semibold text-brand-DEFAULT mb-4">
            Complex Layout: grid-cols-1 md:grid-cols-3 md:gap-8
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="md:col-span-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-bold mb-4">Main Content (md:col-span-2)</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Takes up 2 columns on desktop (66% width), full width on mobile
              </p>
              <div className="space-y-3">
                <div className="h-16 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-600 rounded"></div>
                <div className="h-16 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-600 rounded"></div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-bold mb-4">Sidebar (md:col-span-1)</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                Takes up 1 column on desktop (33% width), full width on mobile
              </p>
              <div className="space-y-2">
                <div className="h-8 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-600 rounded"></div>
                <div className="h-8 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-600 rounded"></div>
                <div className="h-8 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-600 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Responsive Navigation Pattern */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">
            Navigation Responsiveness
          </h2>

          <div className="space-y-6">
            {/* Hidden mobile, shown desktop */}
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
              <p className="text-sm font-semibold text-brand-DEFAULT mb-4">
                Pattern: hidden sm:flex md:gap-8
              </p>
              <div className="hidden sm:flex gap-4 md:gap-8 flex-wrap">
                <span className="px-4 py-2 bg-brand-DEFAULT text-white rounded-lg text-sm">Link 1 (hidden xs-sm)</span>
                <span className="px-4 py-2 bg-brand-DEFAULT text-white rounded-lg text-sm">Link 2 (shown sm+)</span>
                <span className="px-4 py-2 bg-brand-DEFAULT text-white rounded-lg text-sm">Link 3</span>
              </div>
            </div>

            {/* Mobile only */}
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
              <p className="text-sm font-semibold text-brand-DEFAULT mb-4">
                Pattern: sm:hidden (mobile menu)
              </p>
              <button className="sm:hidden w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                ☰ Mobile Menu (hidden on sm+)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Dark Mode Example */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Dark Mode Example
          </h2>
          <button
            onClick={toggleTheme}
            className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            title={isDark ? "Switch to light" : "Switch to dark"}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Card 1 */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 sm:p-8">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl">🩸</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Semantic Color Names
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Use semantic class names: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">dark:bg-gray-800</code>
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 sm:p-8">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl">✨</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Automatic Persistence
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Theme preference saved in localStorage and synced across tabs
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 rounded-lg p-6 sm:p-8 md:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Gradient with Dark Mode
            </h3>
            <p className="text-gray-700 dark:text-gray-100">
              Gradients also support dark variants: <code className="bg-white dark:bg-gray-700 px-2 py-1 rounded text-xs">from-red-50 dark:from-red-900</code>
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: Touch Target Sizing */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">
            Touch Target Sizing
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Minimum 44x44px touch targets for mobile accessibility
          </p>

          <div className="space-y-4">
            <button className="w-full md:w-auto px-6 py-2 bg-brand-DEFAULT text-white rounded-lg hover:bg-brand-dark transition font-medium">
              Too Small (32px height)
            </button>
            <button className="w-full md:w-auto px-6 py-3 bg-brand-DEFAULT text-white rounded-lg hover:bg-brand-dark transition font-medium">
              Optimal (44px height) ✓
            </button>
            <button className="w-full md:w-auto px-8 py-4 bg-brand-DEFAULT text-white rounded-lg hover:bg-brand-dark transition font-medium text-lg">
              Extra Large (56px height)
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 7: Responsive Typography in Context */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-12 sm:py-16 md:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">
          Line Length & Readability
        </h2>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 sm:p-8">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Optimal line length: 60-80 characters. Container limits width with max-w-3xl:
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-3xl">
            RedConnect bridges the gap between donors, hospitals, and NGOs with real-time inventory management. 
            Every detail has been carefully designed to ensure fast access, fresh data, and scalable infrastructure, 
            especially in life-critical scenarios where every minute counts.
          </p>
        </div>
      </section>

      {/* SECTION 8: CSS Classes Reference */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">
            Responsive Design Classes Reference
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
              <h3 className="font-bold mb-4 text-brand-DEFAULT">Breakpoint Prefixes</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">xs:</code> 320px minimum</li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">sm:</code> 640px minimum</li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">md:</code> 768px minimum</li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">lg:</code> 1024px minimum</li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">xl:</code> 1280px minimum</li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">2xl:</code> 1536px minimum</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
              <h3 className="font-bold mb-4 text-brand-DEFAULT">Common Patterns</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 font-mono">
                <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">hidden sm:flex</code></li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">grid-cols-1 md:grid-cols-2</code></li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">text-lg md:text-2xl lg:text-4xl</code></li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">p-4 sm:p-6 md:p-8 lg:p-12</code></li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">dark:bg-gray-900</code></li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">dark:hover:text-white</code></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-DEFAULT py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build Responsive Interfaces?
          </h2>
          <p className="text-red-100 text-base sm:text-lg mb-8 sm:mb-12 leading-relaxed">
            Use these patterns and the Tailwind CSS configuration as a reference for all responsive components throughout RedConnect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-brand-DEFAULT font-semibold rounded-lg hover:bg-gray-100 transition">
              View Documentation
            </button>
            <button className="px-6 sm:px-8 py-2 sm:py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-brand-dark transition">
              Test Responsiveness
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
