"use client";

import { Toaster } from "sonner";

/**
 * Application Providers Wrapper
 * 
 * This component wraps all client-side providers at the root level,
 * including the Sonner toast notification system and any other
 * global providers (context, themes, etc.).
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster
        position="top-right"
        expand={false}
        richColors
        closeButton
        duration={4000}
      />
      {children}
    </>
  );
}
