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

  const termsTitle =
    settings?.termsTitle ?? "Terms & Conditions";

  const title =
    `${termsTitle} | ${siteConfig.name}`;

  const description =
    `Read the ${termsTitle.toLowerCase()} for ${siteConfig.name}, including information about website use, content, and user responsibilities.`;

  return {
    title,

    description,

    alternates: {
      canonical: `${siteConfig.url}/terms`,
    },

    openGraph: {
      title,

      description,

      url: `${siteConfig.url}/terms`,

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

export default async function TermsPage() {
  const settings = await getSiteSettings();

  return (
    <main className="py-12 sm:py-16 lg:py-20">
      <Container>

        {/* =====================================
            PAGE HEADER
        ====================================== */}

        <div className="max-w-3xl">
          <div className="mb-5 flex items-center gap-3">
            <span
              className="
                h-8
                w-1.5
                rounded-full
                bg-[#C8102E]
              "
            />

            <span
              className="
                text-sm
                font-bold
                uppercase
                tracking-widest
                text-[#C8102E]
              "
            >
              Legal
            </span>
          </div>

          <h1
            className="
              text-4xl
              font-black
              tracking-tight
              text-gray-900
              dark:text-white

              sm:text-5xl

              lg:text-6xl
            "
          >
            {settings?.termsTitle ??
              "Terms & Conditions"}
          </h1>

          <p
            className="
              mt-5
              text-lg
              leading-8
              text-gray-600
              dark:text-gray-300
            "
          >
            These terms explain the rules and
            conditions that apply when using the
            Loud Oga News & TV website and its
            services.
          </p>
        </div>

        {/* =====================================
            TERMS CONTENT
        ====================================== */}

        <article
          className="
            mt-12
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-6
            shadow-sm

            dark:border-gray-700
            dark:bg-[#111827]

            sm:p-8

            lg:p-10
          "
        >
          {settings?.termsContent?.length ? (
            <div
              className="
                prose
                prose-lg
                max-w-none

                prose-headings:font-black
                prose-headings:tracking-tight
                prose-headings:text-gray-900

                prose-p:leading-8
                prose-p:text-gray-700

                prose-strong:text-gray-900

                prose-a:text-[#C8102E]
                prose-a:no-underline
                hover:prose-a:underline

                prose-li:text-gray-700

                dark:prose-headings:text-white
                dark:prose-p:text-gray-300
                dark:prose-strong:text-white
                dark:prose-li:text-gray-300
              "
            >
              <PortableText
                value={settings.termsContent}
              />
            </div>
          ) : (
            <div>
              <h2
                className="
                  text-2xl
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                Terms & Conditions
              </h2>

              <p
                className="
                  mt-4
                  text-lg
                  leading-8
                  text-gray-600
                  dark:text-gray-300
                "
              >
                Our Terms & Conditions will be
                published here once they have been
                configured in Sanity.
              </p>
            </div>
          )}
        </article>

      </Container>
    </main>
  );
}