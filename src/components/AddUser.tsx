"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/lib/fetcher";
import Cookies from "js-cookie";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function AddUser() {
  const { data } = useSWR<User[]>("/api/users", fetcher);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const addUser = async () => {
    if (!name) return;
    
    setError("");

    // Optimistic update
    mutate(
      "/api/users",
      [...(data || []), { id: Date.now(), name, email: "temp@user.com" }],
      false
    );

    try {
      const token = Cookies.get("auth_token");
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ name, email: "temp@user.com" }),
      });

      if (!response.ok) {
        throw new Error("Failed to add user. Please try again.");
      }
      
      // Revalidate after update
      mutate("/api/users");
      setName("");
    } catch (err) {
      // Rollback optimistic update on error
      mutate("/api/users");
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="mt-4">
      {error && (
        <div className="mb-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter user name"
        className="border px-2 py-1 mr-2"
      />
      <button
        onClick={addUser}
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        Add User
      </button>
    </div>
  );
}
