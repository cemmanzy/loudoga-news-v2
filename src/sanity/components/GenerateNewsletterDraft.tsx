"use client";

import { useState } from "react";

export function GenerateNewsletterDraft() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [message, setMessage] = useState("");
  const [newsletterId, setNewsletterId] = useState<string | null>(
    null
  );

  const handleGenerate = async () => {
    const confirmed = window.confirm(
      "Generate a new newsletter draft using the 5 latest articles?"
    );

    if (!confirmed) {
      return;
    }

    setIsGenerating(true);
    setMessage("");
    setNewsletterId(null);

    try {
      const response = await fetch(
        "/api/newsletter/generate-draft",
        {
          method: "POST",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to generate newsletter draft."
        );
      }

      setNewsletterId(result.newsletterId);

      setMessage(
        "Newsletter draft created successfully."
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while generating the draft."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOpenNewsletter = () => {
    if (!newsletterId) {
      return;
    }

    window.location.href =
      `/studio/structure/newsletter;${newsletterId}`;
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "700px",
      }}
    >
      <h1>Generate Newsletter Draft</h1>

      <p>
        Create a newsletter draft automatically from the
        5 most recent articles.
      </p>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={isGenerating}
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1.25rem",
          cursor: isGenerating
            ? "not-allowed"
            : "pointer",
        }}
      >
        {isGenerating
          ? "Generating Draft..."
          : "Generate Newsletter Draft"}
      </button>

      {message && (
        <p
          style={{
            marginTop: "1rem",
          }}
        >
          {message}
        </p>
      )}

      {newsletterId && (
        <button
          type="button"
          onClick={handleOpenNewsletter}
          style={{
            marginTop: "1rem",
            padding: "0.75rem 1.25rem",
            cursor: "pointer",
          }}
        >
          Open Generated Newsletter
        </button>
      )}
    </div>
  );
}