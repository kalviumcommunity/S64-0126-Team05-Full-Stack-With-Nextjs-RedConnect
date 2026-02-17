"use client";

interface LoaderProps {
  isLoading: boolean;
  message?: string;
  variant?: "spinner" | "dots" | "pulse";
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
}

/**
 * Accessible Loader Component
 *
 * Features:
 * - Multiple spinner variants for different use cases
 * - ARIA live region for screen reader announcements
 * - Non-blocking by default (can be full-screen if needed)
 * - Accessible status messages
 * - Smooth animations
 *
 * Variants:
 * - spinner: Rotating circular spinner
 * - dots: Bouncing dots animation
 * - pulse: Fading pulse effect
 *
 * Usage:
 * ```
 * <Loader
 *   isLoading={isLoading}
 *   message="Saving your data..."
 *   variant="spinner"
 * />
 * ```
 */
export function Loader({
  isLoading,
  message = "Loading...",
  variant = "spinner",
  fullScreen = false,
  size = "md",
}: LoaderProps) {
  if (!isLoading) return null;

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const spinnerContent = (
    <>
      {variant === "spinner" && (
        <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-200 border-t-blue-600`} />
      )}

      {variant === "dots" && (
        <div className="flex gap-2">
          <div className="h-3 w-3 animate-bounce rounded-full bg-blue-600" style={{ animationDelay: "0s" }} />
          <div className="h-3 w-3 animate-bounce rounded-full bg-blue-600" style={{ animationDelay: "0.2s" }} />
          <div className="h-3 w-3 animate-bounce rounded-full bg-blue-600" style={{ animationDelay: "0.4s" }} />
        </div>
      )}

      {variant === "pulse" && (
        <div className={`${sizeClasses[size]} animate-pulse rounded-full bg-blue-600`} />
      )}
    </>
  );

  if (fullScreen) {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        {spinnerContent}
        {message && (
          <p className="mt-4 text-lg font-medium text-gray-700">{message}</p>
        )}
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-8"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {spinnerContent}
      {message && (
        <p className="text-sm font-medium text-gray-600">{message}</p>
      )}
    </div>
  );
}

/**
 * Inline Loading Skeleton Component
 * 
 * Useful for showing content placeholders while data is loading
 */
export function LoadingSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-4" role="status" aria-live="polite">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-20 animate-pulse rounded-lg bg-gray-200" />
      ))}
    </div>
  );
}
