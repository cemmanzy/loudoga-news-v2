import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

/* ------------------------------------ */
/* SEO Metadata */
/* ------------------------------------ */

export const metadata: Metadata = {
  title: `Subscribe | ${siteConfig.name}`,

  description:
    `Subscribe to ${siteConfig.name} to receive the latest breaking news, stories, and updates.`,

  alternates: {
    canonical: `${siteConfig.url}/subscribe`,
  },

  openGraph: {
    title: `Subscribe | ${siteConfig.name}`,

    description:
      `Subscribe to ${siteConfig.name} to receive the latest breaking news, stories, and updates.`,

    url: `${siteConfig.url}/subscribe`,

    siteName: siteConfig.name,

    type: "website",

    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: `Subscribe | ${siteConfig.name}`,

    description:
      `Subscribe to ${siteConfig.name} to receive the latest breaking news, stories, and updates.`,

    images: [siteConfig.ogImage],
  },
};

/* ------------------------------------ */
/* Page */
/* ------------------------------------ */

export default function SubscribePage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div>
        <h1 className="text-5xl font-black">
          Subscribe
        </h1>

        <p className="mt-6 text-xl text-gray-600">
          Newsletter subscriptions will be available soon.
        </p>
      </div>
    </main>
  );
}