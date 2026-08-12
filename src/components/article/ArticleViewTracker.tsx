"use client";

import { useEffect } from "react";

interface ArticleViewTrackerProps {
  slug: string;
}

export default function ArticleViewTracker({
  slug,
}: ArticleViewTrackerProps) {
  useEffect(() => {
    async function trackView() {
      try {
        const storageKey = `loudoga-viewed-${slug}`;

        // Prevent repeated views during the same browser session.
        const alreadyViewed =
          sessionStorage.getItem(storageKey);

        if (alreadyViewed) {
          console.log(
            "Article already viewed in this session."
          );
          return;
        }

        const response = await fetch(
          "/api/articles/view",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              slug,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ??
              `View tracking failed with status ${response.status}`
          );
        }

        // Only mark the article as viewed after
        // the server successfully records it.
        sessionStorage.setItem(
          storageKey,
          "true"
        );

        console.log(
          "Article view recorded:",
          data
        );
      } catch (error) {
        console.error(
          "Failed to track article view:",
          error
        );
      }
    }

    if (slug) {
      trackView();
    }
  }, [slug]);

  return null;
}