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
    <main className="py-12 sm:py-16 lg:py-20">
      <Container>

        {/* =====================================
            PAGE HEADER
        ====================================== */}

        <div className="max-w-3xl">
          <div
            className="
              mb-5
              flex
              items-center
              gap-3
            "
          >
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
              Get in touch
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
            {settings?.contactTitle ?? "Contact Us"}
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
            Whether you have a news tip, enquiry,
            feedback, advertising request, or simply
            want to reach the Loud Oga News team,
            we'd love to hear from you.
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
              CONTACT CONTENT
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
            {settings?.contactContent?.length ? (
              <div
                className="
                  prose
                  prose-lg
                  max-w-none

                  prose-headings:font-black
                  prose-headings:tracking-tight
                  prose-headings:text-gray-900

                  prose-p:text-gray-700
                  prose-p:leading-8

                  prose-strong:text-gray-900

                  prose-a:text-[#C8102E]
                  prose-a:no-underline
                  hover:prose-a:underline

                  dark:prose-headings:text-white
                  dark:prose-p:text-gray-300
                  dark:prose-strong:text-white
                "
              >
                <PortableText
                  value={settings.contactContent}
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
                  Get in touch with Loud Oga News
                </h2>

                <p
                  className="
                    mt-4
                    leading-7
                    text-gray-600
                    dark:text-gray-300
                  "
                >
                  Contact us for news tips, press
                  enquiries, advertising opportunities,
                  media coverage, partnerships, and
                  general enquiries.
                </p>
              </div>
            )}
          </article>

          {/* =================================
              CONTACT INFORMATION
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
                Contact Information
              </h2>
            </div>

            <div
              className="
                mt-7
                space-y-6
              "
            >
              {/* Email */}

              {settings?.email && (
                <div>
                  <p
                    className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    Email
                  </p>

                  <a
                    href={`mailto:${settings.email}`}
                    className="
                      mt-2
                      block
                      break-words
                      text-sm
                      font-semibold
                      text-gray-900
                      transition
                      hover:text-[#C8102E]

                      dark:text-gray-100
                    "
                  >
                    {settings.email}
                  </a>
                </div>
              )}

              {/* Phone */}

              {settings?.phone && (
                <div>
                  <p
                    className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    Phone
                  </p>

                  <a
                    href={`tel:${settings.phone}`}
                    className="
                      mt-2
                      block
                      text-sm
                      font-semibold
                      text-gray-900
                      transition
                      hover:text-[#C8102E]

                      dark:text-gray-100
                    "
                  >
                    {settings.phone}
                  </a>
                </div>
              )}

              {/* Address */}

              {settings?.address && (
                <div>
                  <p
                    className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    Address
                  </p>

                  <p
                    className="
                      mt-2
                      whitespace-pre-line
                      text-sm
                      leading-6
                      text-gray-700
                      dark:text-gray-300
                    "
                  >
                    {settings.address}
                  </p>
                </div>
              )}

              {/* Empty state */}

              {!settings?.email &&
                !settings?.phone &&
                !settings?.address && (
                  <p
                    className="
                      text-sm
                      leading-6
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    Contact details will be
                    displayed here once they are
                    configured in Sanity.
                  </p>
                )}
            </div>

            {/* CTA */}

            <div
              className="
                mt-8
                border-t
                border-gray-200
                pt-6

                dark:border-gray-700
              "
            >
              <p
                className="
                  text-sm
                  leading-6
                  text-gray-600
                  dark:text-gray-400
                "
              >
                For advertising, media coverage,
                partnerships, and other business
                enquiries, please use the contact
                details provided above.
              </p>
            </div>
          </aside>
        </div>

      </Container>
    </main>
  );
}