import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center">
        <p className="text-8xl font-black text-[#C8102E]">
          404
        </p>

        <h1 className="mt-6 text-4xl font-bold">
          Page Not Found
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          href="/"
          className="mt-10 inline-flex rounded-xl bg-[#C8102E] px-8 py-4 font-semibold text-white transition hover:bg-[#a90d27]"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}