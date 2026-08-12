"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(
          data.message ||
            "Something went wrong. Please try again."
        );
        return;
      }

      setStatus("success");
      setMessage(data.message);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage(
        "Unable to connect. Please check your internet connection and try again."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          placeholder="Enter your email address"
          disabled={status === "loading"}
          className="w-full rounded-xl border border-gray-300 bg-white px-5 py-4 text-gray-900 outline-none transition focus:border-[#C8102E] focus:ring-2 focus:ring-[#C8102E]/20 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-xl bg-[#C8102E] px-8 py-4 font-semibold text-white transition hover:bg-[#a90d27] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading"
            ? "Subscribing..."
            : "Subscribe"}
        </button>
      </div>

      {message && (
        <p
          className={`mt-4 text-sm ${
            status === "success"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}