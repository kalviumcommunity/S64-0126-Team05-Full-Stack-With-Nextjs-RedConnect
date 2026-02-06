import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function UserProfile({ params }: Props) {
  const { id } = await params;
  // Mock fetch user data (replace with real API call when ready)
  const user = { id, name: "User " + id };

  return (
    <main className="flex flex-col items-center mt-10">
      <nav className="flex gap-2 mb-4 text-sm" aria-label="Breadcrumb">
        <Link href="/" className="text-blue-600 hover:underline">
          Home
        </Link>
        <span>/</span>
        <Link href="/users" className="text-blue-600 hover:underline">
          Users
        </Link>
        <span>/</span>
        <span>{user.name}</span>
      </nav>
      <h2 className="text-xl font-bold">User Profile</h2>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
    </main>
  );
}
