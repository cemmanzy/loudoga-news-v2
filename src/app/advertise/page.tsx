import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";

import { siteConfig } from "@/config/site";

import Container from "@/components/ui/Container";
import { getSiteSettings } from "@/sanity/loaders/siteSettings";

/* ------------------------------------ */
/* SEO Metadata */
/* ------------------------------------ */

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const advertiseTitle =
    settings?.advertiseTitle ?? "Advertise With Us";

  const title =
    `${advertiseTitle} | ${siteConfig.name}`;

  const description =
    `Advertise with ${siteConfig.name} and reach our growing audience through effective news and media advertising opportunities.`;

  return {
    title,

    description,

    alternates: {
      canonical: `${siteConfig.url}/advertise`,
    },

    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/advertise`,
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
      title,
      description,
      images: [siteConfig.ogImage],
    },
  };
}

/* ------------------------------------ */
/* Page */
/* ------------------------------------ */

export default async function AdvertisePage() {
  const settings = await getSiteSettings();

  return (
    <Container>
      <h1 className="mb-10 text-5xl font-black">
        {settings?.advertiseTitle ?? "Advertise With Us"}
      </h1>

      <article className="prose prose-lg max-w-none">
        <PortableText
          value={settings?.advertiseContent ?? []}
        />
      </article>
    </Container>
  );
}