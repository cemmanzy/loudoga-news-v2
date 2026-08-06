"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center px-6">

      <div className="text-center">

        <h1 className="text-5xl font-black text-[#C8102E]">
          Something went wrong
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          An unexpected error occurred while loading this page.
        </p>

        <button
          onClick={reset}
          className="mt-10 rounded-xl bg-[#C8102E] px-8 py-4 font-semibold text-white transition hover:bg-[#a90d27]"
        >
          Try Again
        </button>

      </div>

    </main>
  );
}