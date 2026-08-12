"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUnsubscribed, setIsUnsubscribed] =
    useState(false);

  const handleUnsubscribe = async () => {
    if (!token) {
      setMessage(
        "This unsubscribe link is invalid or missing a token."
      );
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "/api/newsletter/unsubscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to unsubscribe. Please try again."
        );
      }

      setMessage(
        result.message ||
          "You have successfully unsubscribed."
      );

      setIsUnsubscribed(true);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">
          Unsubscribe from Loudoga News
        </h1>

        <p className="mt-4 text-gray-600">
          You are about to unsubscribe from future Loudoga News
          newsletters.
        </p>

        {!token ? (
          <p className="mt-6 text-sm text-red-600">
            This unsubscribe link is invalid or incomplete.
          </p>
        ) : isUnsubscribed ? (
          <div className="mt-8 rounded-lg bg-green-50 p-4 text-center text-green-700">
            {message}
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={handleUnsubscribe}
              disabled={isLoading}
              className="mt-8 w-full rounded-lg bg-[#C8102E] px-4 py-3 font-semibold text-white transition hover:bg-[#a50d25] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading
                ? "Unsubscribing..."
                : "Confirm Unsubscribe"}
            </button>

            {message && (
              <p className="mt-4 text-center text-sm text-red-600">
                {message}
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}