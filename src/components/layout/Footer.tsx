import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
  FaTiktok,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

import { getCategories } from "@/sanity/loaders/categories";
import { getSiteSettings } from "@/sanity/loaders/siteSettings";

interface SocialIconProps {
  platform: string;
}

function SocialIcon({
  platform,
}: SocialIconProps) {
  const name = platform.toLowerCase();

  if (name.includes("facebook")) {
    return <FaFacebookF />;
  }

  if (name.includes("instagram")) {
    return <FaInstagram />;
  }

  if (name.includes("linkedin")) {
    return <FaLinkedinIn />;
  }

  if (name.includes("telegram")) {
    return <FaTelegram />;
  }

  if (name.includes("tiktok")) {
    return <FaTiktok />;
  }

  if (name.includes("youtube")) {
    return <FaYoutube />;
  }

  if (
    name === "x" ||
    name.includes("twitter")
  ) {
    return <FaXTwitter />;
  }

  return null;
}

export default async function Footer() {
  const [categories, settings] =
    await Promise.all([
      getCategories(),
      getSiteSettings(),
    ]);

  return (
    <footer
      className="
        mt-20
        border-t
        border-gray-800
        bg-[#0F172A]
        text-white
      "
    >
      {/* =========================================
          MAIN FOOTER
      ========================================== */}

      <div
        className="
          mx-auto
          max-w-7xl
          px-6
          py-16

          lg:py-20
        "
      >
        <div
          className="
            grid
            gap-12

            md:grid-cols-2

            lg:grid-cols-2

            xl:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]
          "
        >
          {/* =====================================
              BRAND
          ====================================== */}

          <div>
            <h2
              className="
                text-3xl
                font-black
                tracking-tight
              "
            >
              <span className="text-[#C8102E]">
                LOUD OGA
              </span>{" "}
              NEWS
            </h2>

            <p
              className="
                mt-4
                max-w-sm
                text-lg
                font-semibold
                text-white
              "
            >
              Trusted Journalism • Breaking News
            </p>

            <p
              className="
                mt-4
                max-w-md
                text-sm
                leading-7
                text-gray-400
              "
            >
              {settings?.description ||
                "Bringing you trusted news, accurate reporting and important stories that matter."}
            </p>

            {/* Subscribe CTA */}

            <div className="mt-7">
              <Link
                href="/subscribe"
                className="
                  inline-flex
                  items-center
                  rounded-full
                  bg-[#C8102E]
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-white
                  transition
                  hover:bg-[#A90D27]
                "
              >
                Subscribe to Loud Oga News
              </Link>
            </div>
          </div>

          {/* =====================================
              CATEGORIES
          ====================================== */}

          <div>
            <h3
              className="
                mb-6
                text-lg
                font-bold
                text-white
              "
            >
              Categories
            </h3>

            <ul
              className="
                grid
                grid-cols-2
                gap-x-5
                gap-y-3
                text-sm
                text-gray-400
              "
            >
              {categories.map(
                (category) => (
                  <li key={category._id}>
                    <Link
                      href={`/category/${category.slug}`}
                      className="
                        transition
                        hover:text-[#C8102E]
                      "
                    >
                      {category.title}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* =====================================
              QUICK LINKS
          ====================================== */}

          <div>
            <h3
              className="
                mb-6
                text-lg
                font-bold
                text-white
              "
            >
              Quick Links
            </h3>

            <ul
              className="
                space-y-3
                text-sm
                text-gray-400
              "
            >
              <li>
                <Link
                  href="/"
                  className="
                    transition
                    hover:text-[#C8102E]
                  "
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="
                    transition
                    hover:text-[#C8102E]
                  "
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="
                    transition
                    hover:text-[#C8102E]
                  "
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy-policy"
                  className="
                    transition
                    hover:text-[#C8102E]
                  "
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="
                    transition
                    hover:text-[#C8102E]
                  "
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="/advertise"
                  className="
                    transition
                    hover:text-[#C8102E]
                  "
                >
                  Advertise With Us
                </Link>
              </li>
            </ul>
          </div>

          {/* =====================================
              CONTACT
          ====================================== */}

          <div>
            <h3
              className="
                mb-6
                text-lg
                font-bold
                text-white
              "
            >
              Contact
            </h3>

            <div
              className="
                space-y-4
                text-sm
                text-gray-400
              "
            >
              {settings?.email && (
                <div>
                  <p
                    className="
                      mb-1
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-gray-500
                    "
                  >
                    Email
                  </p>

                  <a
                    href={`mailto:${settings.email}`}
                    className="
                      break-words
                      transition
                      hover:text-white
                    "
                  >
                    {settings.email}
                  </a>
                </div>
              )}

              {settings?.phone && (
                <div>
                  <p
                    className="
                      mb-1
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-gray-500
                    "
                  >
                    Phone
                  </p>

                  <a
                    href={`tel:${settings.phone}`}
                    className="
                      transition
                      hover:text-white
                    "
                  >
                    {settings.phone}
                  </a>
                </div>
              )}

              {settings?.address && (
                <div>
                  <p
                    className="
                      mb-1
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-gray-500
                    "
                  >
                    Address
                  </p>

                  <p className="whitespace-pre-line leading-6">
                    {settings.address}
                  </p>
                </div>
              )}

              {!settings?.email &&
                !settings?.phone &&
                !settings?.address && (
                  <p className="leading-6 text-gray-500">
                    Contact details will appear here
                    once they are added in Sanity.
                  </p>
                )}
            </div>
          </div>

          {/* =====================================
              FOLLOW US
          ====================================== */}

          <div>
            <h3
              className="
                mb-6
                text-lg
                font-bold
                text-white
              "
            >
              Follow Us
            </h3>

            <p
              className="
                mb-5
                text-sm
                leading-6
                text-gray-400
              "
            >
              Follow Loud Oga News for breaking
              stories, updates and exclusive
              reports.
            </p>

            <div className="flex flex-wrap gap-3">
              {settings?.socialLinks?.map(
                (social) => {
                  const icon = (
                    <SocialIcon
                      platform={social.platform}
                    />
                  );

                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.platform}
                      title={social.platform}
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-gray-700
                        bg-[#111827]
                        text-gray-300
                        transition
                        hover:border-[#C8102E]
                        hover:bg-[#C8102E]
                        hover:text-white
                      "
                    >
                      {icon || (
                        <span
                          className="
                            text-xs
                            font-bold
                            uppercase
                          "
                        >
                          {social.platform.slice(
                            0,
                            2
                          )}
                        </span>
                      )}
                    </a>
                  );
                }
              )}

              {!settings?.socialLinks?.length && (
                <p className="text-sm text-gray-500">
                  Social links will appear here once
                  they are added in Sanity.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          BOTTOM BAR
      ========================================== */}

      <div className="border-t border-gray-800">
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            gap-3
            px-6
            py-6
            text-sm
            text-gray-500

            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <p>
            {settings?.copyright ||
              `© ${new Date().getFullYear()} Loud Oga News. All rights reserved.`}
          </p>

          {settings?.tagline && (
            <p className="font-medium text-gray-400">
              {settings.tagline}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}