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
    `Advertise with ${siteConfig.name} and reach our audience through news, media, digital, and promotional opportunities.`;

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
              Advertise With Us
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
            {settings?.advertiseTitle ??
              "Advertise With Us"}
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
            Connect your brand with the Loud Oga
            News & TV audience through our media,
            publicity, digital, and promotional
            opportunities.
          </p>
        </div>

        {/* =====================================
            MAIN CONTENT
        ====================================== */}

        <div
          className="
            mt-12
            grid
            gap-10

            lg:grid-cols-[minmax(0,1fr)_360px]
            lg:gap-16
          "
        >
          {/* =================================
              ADVERTISING CONTENT
          ================================= */}

          <article
            className="
              min-w-0
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
            {settings?.advertiseContent?.length ? (
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
                  value={settings.advertiseContent}
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
                  Advertising opportunities
                </h2>

                <p
                  className="
                    mt-4
                    leading-7
                    text-gray-600
                    dark:text-gray-300
                  "
                >
                  Our advertising information and
                  available media opportunities will
                  be published here once the content
                  has been configured in Sanity.
                </p>
              </div>
            )}
          </article>

          {/* =================================
              ADVERTISING SUMMARY
          ================================= */}

          <aside
            className="
              h-fit
              rounded-2xl
              border
              border-gray-200
              bg-gray-50
              p-6

              dark:border-gray-700
              dark:bg-[#111827]

              sm:p-7
            "
          >
            <div className="flex items-center gap-3">
              <span
                className="
                  h-8
                  w-1.5
                  rounded-full
                  bg-[#C8102E]
                "
              />

              <h2
                className="
                  text-2xl
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                Advertising
              </h2>
            </div>

            <div className="mt-6 space-y-4">
              <p
                className="
                  text-sm
                  leading-6
                  text-gray-600
                  dark:text-gray-300
                "
              >
                Promote your brand, organization,
                product, event, or campaign through
                Loud Oga News & TV.
              </p>

              <div
                className="
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  p-4

                  dark:border-gray-700
                  dark:bg-[#0F172A]
                "
              >
                <p
                  className="
                    text-sm
                    font-bold
                    text-gray-900
                    dark:text-white
                  "
                >
                  Available opportunities
                </p>

                <ul
                  className="
                    mt-3
                    space-y-2
                    text-sm
                    leading-6
                    text-gray-600
                    dark:text-gray-300
                  "
                >
                  <li>• Digital advertising</li>
                  <li>• News and media coverage</li>
                  <li>• Event publicity</li>
                  <li>• Brand promotion</li>
                  <li>• Public relations</li>
                  <li>• Sponsored content</li>
                </ul>
              </div>

              <div
                className="
                  rounded-xl
                  bg-[#C8102E]
                  p-5
                  text-white
                "
              >
                <p className="text-sm font-bold">
                  Ready to work with us?
                </p>

                <p className="mt-2 text-sm leading-6 text-white/90">
                  Contact the Loud Oga News & TV team
                  for advertising, publicity, media
                  coverage, and partnership enquiries.
                </p>
              </div>
            </div>
          </aside>
        </div>

      </Container>
    </main>
  );
}