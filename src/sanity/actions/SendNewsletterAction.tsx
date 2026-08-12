"use client";

import { useState } from "react";
import type { DocumentActionComponent } from "sanity";

export const SendNewsletterAction: DocumentActionComponent = (
  props
) => {
  const [isSending, setIsSending] = useState(false);

  // Check both the draft and published versions.
  // This prevents a sent newsletter from being sent again.
  const draftStatus = props.draft?.status as string | undefined;
  const publishedStatus = props.published?.status as string | undefined;

  const isAlreadySent =
    draftStatus === "sent" ||
    publishedStatus === "sent";

  const isCurrentlySending =
    draftStatus === "sending" ||
    publishedStatus === "sending";

  // Only show this action for newsletter documents.
  if (props.type !== "newsletter") {
    return null;
  }

  // Never allow a sent or currently sending newsletter
  // to be sent again.
  if (isAlreadySent || isCurrentlySending) {
    return null;
  }

  const handleSend = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to send this newsletter to all active subscribers? This action cannot be undone."
    );

    if (!confirmed) return;

    setIsSending(true);

    try {
      const response = await fetch("/api/newsletter/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newsletterId: props.id,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to send newsletter."
        );
      }

      window.alert(
        `Newsletter sent successfully to ${result.recipientCount} subscriber(s).`
      );

      window.location.reload();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while sending the newsletter.";

      window.alert(message);
    } finally {
      setIsSending(false);
    }
  };

  return {
    label: isSending ? "Sending..." : "Send Newsletter",
    tone: "critical",
    disabled: isSending,
    onHandle: handleSend,
  };
};