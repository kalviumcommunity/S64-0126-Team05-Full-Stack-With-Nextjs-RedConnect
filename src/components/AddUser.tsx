"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/lib/fetcher";

interface AddUserProps {
  onSuccess?: () => void;
}

/**
 * AddUser Component - Demonstrates SWR optimistic updates
 *
 * Optimistic UI Pattern:
 * 1. Update UI immediately (show new user in list)
 * 2. Send API request in background
 * 3. Revalidate data when API response arrives
 * 4. Show error if API fails
 *
 * This makes the UI feel instant even with network latency.
 */
export default function AddUser({ onSuccess }: AddUserProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Get current users data from SWR cache
  const { data: usersData } = useSWR("/api/users?page=1&limit=50", fetcher);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email) {
      setErrorMessage("Name and email are required");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Step 1: Create optimistic user object
      const optimisticUser = {
        id: `temp-${Date.now()}`, // Temporary ID
        name,
        email,
        phone: phone || null,
        createdAt: new Date().toISOString(),
      };

      // Step 2: Update UI immediately with optimistic data
      // mutate() with false as third param updates cache without revalidation
      const currentData = usersData || { data: [], meta: { total: 0, page: 1, limit: 50 } };
      const optimisticData = {
        ...currentData,
        data: [optimisticUser, ...currentData.data],
        meta: {
          ...currentData.meta,
          total: (currentData.meta?.total || 0) + 1,
        },
      };

      console.log("[SWR] Optimistic update:", optimisticUser);
      mutate("/api/users?page=1&limit=50", optimisticData, false);

      // Step 3: Send API request
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        throw new Error("Authentication token not found. Please log in.");
      }

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create user");
      }

      console.log("[SWR] User created successfully:", result);

      // Step 4: Revalidate data (fetch fresh data from server)
      // This replaces the optimistic data with real data
      await mutate("/api/users?page=1&limit=50");

      // Clear form
      setName("");
      setEmail("");
      setPhone("");
      setSuccessMessage(`User "${name}" created successfully!`);

      // Trigger callback
      onSuccess?.();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to create user";
      console.error("[SWR] Error creating user:", error);
      setErrorMessage(errorMsg);

      // Step 5: Revalidate on error to restore correct data
      mutate("/api/users?page=1&limit=50");

      // Clear error message after 5 seconds
      setTimeout(() => setErrorMessage(""), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-6 p-6 bg-white border border-gray-200 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Add New User</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter user name"
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone (optional)
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-700 text-sm font-medium">{successMessage}</p>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm font-medium">{errorMessage}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "Creating..." : "Add User"}
        </button>

        {/* Optimistic Update Info */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
          <p className="font-medium">💡 Optimistic Update Pattern:</p>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>UI updates instantly while submitting</li>
            <li>API request sends in background</li>
            <li>Data revalidates when response arrives</li>
            <li>Automatic error recovery on failure</li>
          </ul>
        </div>
      </form>
    </div>
  );
}
