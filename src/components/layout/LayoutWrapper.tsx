import type { ReactNode } from "react";

import Header from "./Header";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}

