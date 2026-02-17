"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/lib/fetcher";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function AddUser() {
  const { data } = useSWR<User[]>("/api/users", fetcher);
  const [name, setName] = useState("");

  const addUser = async () => {
    if (!name) return;

    // Optimistic update
    mutate(
      "/api/users",
      [...(data || []), { id: Date.now(), name, email: "temp@user.com" }],
      false
    );

    // Actual API call
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email: "temp@user.com" }),
    });

    // Revalidate after update
    mutate("/api/users");
    setName("");
  };

  return (
    <div className="mt-4">
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
