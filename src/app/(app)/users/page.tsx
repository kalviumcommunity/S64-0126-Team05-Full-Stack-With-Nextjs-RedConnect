"use client";

import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import AddUser from "@/components/AddUser";

/**
 * User type definition for type-safe data handling
 */
interface User {
  id: string | number;
  name: string;
  email: string;
  phone?: string | null;
  createdAt?: string;
  [key: string]: unknown;
}

/**
 * Users page with SWR client-side data fetching
 * Demonstrates:
 * - Stale-While-Revalidate pattern for efficient data fetching
 * - Automatic caching and revalidation on tab focus
 * - Error handling and loading states
 * - Integration with AddUser component for optimistic updates
 */
export default function UsersList() {
  // SWR key structure: "/api/users" maps to the API endpoint
  // SWR automatically caches the response and revalidates when tab regains focus
  const { data, error, isLoading, mutate } = useSWR(
    "/api/users?page=1&limit=50",
    fetcher,
    {
      revalidateOnFocus: true, // Refetch when user switches back to this tab
      revalidateOnReconnect: true, // Refetch when connection is restored
      refreshInterval: 0, // No auto-refresh (0 = disabled)
      dedupingInterval: 60000, // Prevent duplicate requests within 60 seconds
      onError: (error) => {
        console.error("[SWR] Error fetching users:", error);
      },
    }
  );

  // Determine UI state based on SWR hook status
  const isError = error;
  const isEmpty = data?.data?.length === 0;

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <nav className="flex gap-4 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="text-blue-600 hover:underline">
          Home
        </Link>
        <span>/</span>
        <span className="font-semibold">Users</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">User List</h1>
        <p className="text-gray-600">
          Protected list — only visible when logged in. Data is cached with SWR and revalidated on tab focus.
        </p>
      </div>

      {/* Add User Form - triggers optimistic updates */}
      <AddUser onSuccess={() => mutate()} />

      {/* Loading State */}
      {isLoading && (
        <div className="mt-6 p-4 border-l-4 border-blue-500 bg-blue-50">
          <p className="text-blue-700 font-medium">Loading users...</p>
          <p className="text-sm text-blue-600 mt-1">Fetching from cache or server</p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="mt-6 p-4 border-l-4 border-red-500 bg-red-50">
          <p className="text-red-700 font-medium">Failed to load users</p>
          <p className="text-sm text-red-600 mt-1">
            {error?.message || "An unexpected error occurred"}
          </p>
          <button
            onClick={() => mutate()}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && isEmpty && (
        <div className="mt-6 p-4 border-l-4 border-yellow-500 bg-yellow-50">
          <p className="text-yellow-700 font-medium">No users found</p>
          <p className="text-sm text-yellow-600 mt-1">Create one using the form above</p>
        </div>
      )}

      {/* Users List */}
      {!isLoading && !isError && data?.data && data.data.length > 0 && (
        <div className="mt-8">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Total Users: {data.meta?.total || data.data.length}
            </h2>
            <button
              onClick={() => mutate()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              title="Manually refresh users list"
            >
              Refresh
            </button>
          </div>

          <div className="grid gap-4">
            {data.data.map((user: User) => (
              <div
                key={user.id}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    {user.phone && <p className="text-sm text-gray-500 mt-1">{user.phone}</p>}
                  </div>
                  <Link
                    href={`/users/${user.id}`}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-sm"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination info */}
          {data.meta && (
            <div className="mt-6 p-4 bg-gray-50 rounded text-center text-sm text-gray-600">
              Page {data.meta.page} of {data.meta.totalPages} • {data.meta.total} total users
            </div>
          )}
        </div>
      )}

      {/* Debug info - Cache status indicator */}
      <div className="mt-8 p-4 bg-gray-100 rounded text-xs text-gray-600 font-mono">
        <p>SWR Status: {isLoading ? "Loading" : isError ? "Error" : "Ready"}</p>
        <p>Cache Revalidation: On Tab Focus (revalidateOnFocus: true)</p>
        <p>Last Updated: {data ? new Date().toLocaleTimeString() : "N/A"}</p>
      </div>
    </main>
  );
}
