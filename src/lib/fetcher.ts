import { logger } from "./logger";

/**
 * Custom error type for API errors with status and response data
 */
interface ApiError extends Error {
  status?: number;
  response?: unknown;
}

/**
 * Fetcher function for SWR - handles client-side API requests with JWT token
 * Returns cached data immediately and revalidates in the background
 *
 * @param url - API endpoint URL
 * @returns Parsed JSON response
 * @throws Error if response is not ok
 */
export const fetcher = async (url: string) => {
  try {
    // Get JWT token from localStorage (set after login)
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Add Authorization header if token exists
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(url, {
      headers,
      credentials: "include", // Include cookies if needed
    });

    // Log cache behavior
    logger.info(`Fetching from ${url}`, { status: res.status });

    if (!res.ok) {
      const error = new Error(`Failed to fetch: ${res.statusText}`) as ApiError;
      error.status = res.status;
      error.response = await res.json().catch(() => null);
      throw error;
    }

    return res.json();
  } catch (error) {
    logger.error(`Fetch error for ${url}`, { error });
    throw error;
  }
};

/**
 * Fetcher function with error logging for better debugging
 * Use this version when you need detailed error information
 *
 * @param url - API endpoint URL
 * @returns Parsed JSON response
 */
export const fetcherWithLogging = async (url: string) => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    console.log(`[SWR] Fetching: ${url}`);

    const res = await fetch(url, {
      headers,
      credentials: "include",
    });

    console.log(`[SWR] Response status: ${res.status}`);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error(`[SWR] Fetch failed:`, { status: res.status, error: errorData });
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    console.log(`[SWR] Data fetched successfully:`, { dataKeys: Object.keys(data) });

    return data;
  } catch (error) {
    console.error(`[SWR] Fetch error for ${url}:`, error);
    throw error;
  }
};
