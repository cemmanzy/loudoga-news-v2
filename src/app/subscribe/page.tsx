import type { Metadata } from "next";

import Container from "@/components/ui/Container";
import SubscribeForm from "@/components/subscribe/SubscribeForm";
import { siteConfig } from "@/config/site";

/* ------------------------------------ */
/* SEO Metadata */
/* ------------------------------------ */

export const metadata: Metadata = {
  title: `Subscribe | ${siteConfig.name}`,

  description: `Subscribe to ${siteConfig.name} to receive the latest breaking news, stories, and updates.`,

  alternates: {
    canonical: `${siteConfig.url}/subscribe`,
  },

  openGraph: {
    title: `Subscribe | ${siteConfig.name}`,

    description: `Subscribe to ${siteConfig.name} to receive the latest breaking news, stories, and updates.`,

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

    description: `Subscribe to ${siteConfig.name} to receive the latest breaking news, stories, and updates.`,

    images: [siteConfig.ogImage],
  },
};

/* ------------------------------------ */
/* Page */
/* ------------------------------------ */

export default function SubscribePage() {
  return (
    <main className="py-16 md:py-24">
      <Container className="max-w-3xl">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 md:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#C8102E]">
            Loudoga News Newsletter
          </p>

          <h1 className="mt-4 text-4xl font-black md:text-5xl">
            Stay informed. Stay ahead.
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Subscribe to receive the latest news, breaking stories, exclusive
            reports, trending topics, and important updates from Loudoga News
            directly in your inbox.
          </p>

          <SubscribeForm />

          <p className="mt-5 text-xs leading-5 text-gray-500">
            By subscribing, you agree to receive news and updates from Loudoga
            News. You can unsubscribe at any time.
          </p>
        </div>
      </Container>
    </main>
  );
}