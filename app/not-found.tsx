import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-4xl font-bold text-red-500 mb-4">404 - Not Found</h1>
      <p className="text-lg text-gray-600">
        Sorry, the page you&apos;re looking for does not exist.
      </p>
      <Link href="/" className="mt-6 inline-block text-blue-600 underline">
        Go back to home
      </Link>
    </div>
  );
}
