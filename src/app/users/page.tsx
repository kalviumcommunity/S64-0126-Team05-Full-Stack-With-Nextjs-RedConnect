import Link from "next/link";

export default function UsersList() {
  return (
    <main className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold">Users</h1>
      <p className="mb-4">Protected list — only visible when logged in.</p>
      <nav className="flex gap-4" aria-label="Breadcrumb">
        <Link href="/" className="text-blue-600 hover:underline">
          Home
        </Link>
        <span>/</span>
        <span>Users</span>
      </nav>
      <ul className="mt-4 flex flex-col gap-2">
        <li>
          <Link href="/users/1" className="text-blue-600 hover:underline">
            User 1
          </Link>
        </li>
        <li>
          <Link href="/users/2" className="text-blue-600 hover:underline">
            User 2
          </Link>
        </li>
      </ul>
    </main>
  );
}
