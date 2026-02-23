"use client";

import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";

/**
 * Application Providers Wrapper
 * 
 * This component wraps all client-side providers at the root level,
 * including the Sonner toast notification system, theme provider,
 * and any other global providers (context, themes, etc.).
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Toaster
        position="top-right"
        expand={false}
        richColors
        closeButton
        duration={4000}
      />
      {children}
    </ThemeProvider>
  );
}
