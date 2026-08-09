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

  const contactTitle =
    settings?.contactTitle ?? "Contact Us";

  const title =
    `${contactTitle} | ${siteConfig.name}`;

  const description =
    `Contact ${siteConfig.name} for news tips, enquiries, feedback, advertising, and other information.`;

  return {
    title,

    description,

    alternates: {
      canonical: `${siteConfig.url}/contact`,
    },

    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/contact`,
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

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <Container>
      <h1 className="mb-10 text-5xl font-black">
        {settings?.contactTitle ?? "Contact Us"}
      </h1>

      <article className="prose prose-lg max-w-none">
        <PortableText
          value={settings?.contactContent ?? []}
        />
      </article>

      <div className="mt-12 rounded-xl border bg-gray-50 p-6">
        <h2 className="mb-4 text-2xl font-bold">
          Contact Information
        </h2>

        <div className="space-y-3">
          {settings?.email && (
            <p>
              <strong>Email:</strong> {settings.email}
            </p>
          )}

          {settings?.phone && (
            <p>
              <strong>Phone:</strong> {settings.phone}
            </p>
          )}

          {settings?.address && (
            <p>
              <strong>Address:</strong> {settings.address}
            </p>
          )}
        </div>
      </div>
    </Container>
  );
}