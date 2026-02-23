import type { ReactNode } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50/50">
      {/* Sidebar is fixed width */}
      <div className="w-64 flex-shrink-0 relative z-50">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
