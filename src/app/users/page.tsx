"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import AddUser from "@/components/AddUser";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UsersResponse {
  data: User[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function UsersPage() {
  const { data, error, isLoading } = useSWR<UsersResponse>("/api/users", fetcher);

  if (error) return <div>Failed to load users.</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold">User List</h1>
      <p className="mb-4">Protected list — only visible when logged in.</p>
      <AddUser />
      <ul className="mt-4 flex flex-col gap-2">
        {data?.data?.map((user) => (
          <li key={user.id}>
            {user.name} — {user.email}
          </li>
        ))}
      </ul>
    </main>
  );
}
