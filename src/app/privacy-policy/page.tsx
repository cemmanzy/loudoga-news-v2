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

  const privacyTitle =
    settings?.privacyTitle ?? "Privacy Policy";

  const title =
    `${privacyTitle} | ${siteConfig.name}`;

  const description =
    `Read the ${privacyTitle.toLowerCase()} of ${siteConfig.name} to understand how we handle information and protect your privacy.`;

  return {
    title,

    description,

    alternates: {
      canonical: `${siteConfig.url}/privacy-policy`,
    },

    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/privacy-policy`,
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

export default async function PrivacyPolicyPage() {
  const settings = await getSiteSettings();

  return (
    <Container>
      <h1 className="mb-10 text-5xl font-black">
        {settings?.privacyTitle ?? "Privacy Policy"}
      </h1>

      <article className="prose prose-lg max-w-none">
        <PortableText
          value={settings?.privacyContent ?? []}
        />
      </article>
    </Container>
  );
}