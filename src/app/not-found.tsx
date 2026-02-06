import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center mt-10 text-red-600">
      <h1 className="text-2xl font-bold">404 — Page Not Found</h1>
      <p>Oops! This route doesn&apos;t exist.</p>
      <Link href="/" className="mt-4 text-blue-600 hover:underline">
        Back to Home
      </Link>
    </main>
  );
}
