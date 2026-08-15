import type { Metadata } from "next";

import Homepage from "@/components/homepage/Homepage";

import { siteConfig } from "@/config/site";
import { getHomepage } from "@/sanity/loaders/homepage";
import { getSiteSettings } from "@/sanity/loaders/siteSettings";

/* ------------------------------------ */
/* Homepage SEO */
/* ------------------------------------ */

export const metadata: Metadata = {
  title: siteConfig.name,

  description: siteConfig.description,

  alternates: {
    canonical: siteConfig.url,
  },

  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
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
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

/* ------------------------------------ */
/* Page */
/* ------------------------------------ */

export default async function Home() {
  const [homepage, settings] = await Promise.all([
    getHomepage(),
    getSiteSettings(),
  ]);

  return (
    <Homepage
      {...homepage}
      liveEnabled={settings?.liveEnabled}
      liveTitle={settings?.liveTitle}
      liveYoutubeUrl={settings?.liveYoutubeUrl}
    />
  );
}