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

function SocialIcon({ platform }: SocialIconProps) {
  const name = platform.toLowerCase();

  if (name.includes("facebook")) return <FaFacebookF />;
  if (name.includes("instagram")) return <FaInstagram />;
  if (name.includes("linkedin")) return <FaLinkedinIn />;
  if (name.includes("telegram")) return <FaTelegram />;
  if (name.includes("tiktok")) return <FaTiktok />;
  if (name.includes("youtube")) return <FaYoutube />;
  if (name === "x" || name.includes("twitter")) return <FaXTwitter />;

  return null;
}

export default async function Footer() {
  const [categories, settings] = await Promise.all([
    getCategories(),
    getSiteSettings(),
  ]);

  return (
    <footer className="mt-20 bg-[#0F172A] text-white">

      {/* Main Footer */}

      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">

          {/* Brand */}

          <div>

            <h2 className="text-3xl font-black tracking-tight">
              <span className="text-[#C8102E]">
                LOUD OGA
              </span>{" "}
              NEWS
            </h2>

            <p className="mt-4 max-w-sm text-lg font-semibold text-white">
              Trusted Journalism • Breaking News
            </p>

            <p className="mt-4 max-w-md text-sm leading-7 text-gray-400">
              {settings?.description ||
                "Bringing you trusted news, accurate reporting and important stories that matter."}
            </p>

            {/* Subscribe CTA */}

            <div className="mt-7">

              <Link
                href="/subscribe"
                className="inline-flex items-center rounded-full bg-[#C8102E] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#a90d27]"
              >
                Subscribe to Loud oga News
              </Link>

            </div>

          </div>

          {/* Categories */}

          <div>

            <h3 className="mb-6 text-lg font-bold">
              Categories
            </h3>

            <ul className="grid grid-cols-2 gap-x-5 gap-y-3 text-sm text-gray-400">

              {categories.map((category) => (
                <li key={category._id}>

                  <Link
                    href={`/category/${category.slug}`}
                    className="transition hover:text-[#C8102E]"
                  >
                    {category.title}
                  </Link>

                </li>
              ))}

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="mb-6 text-lg font-bold">
              Contact
            </h3>

            <div className="space-y-4 text-sm text-gray-400">

              {settings?.email && (
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Email
                  </p>

                  <a
                    href={`mailto:${settings.email}`}
                    className="transition hover:text-white"
                  >
                    {settings.email}
                  </a>
                </div>
              )}

              {settings?.phone && (
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Phone
                  </p>

                  <a
                    href={`tel:${settings.phone}`}
                    className="transition hover:text-white"
                  >
                    {settings.phone}
                  </a>
                </div>
              )}

              {settings?.address && (
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Address
                  </p>

                  <p className="whitespace-pre-line leading-6">
                    {settings.address}
                  </p>
                </div>
              )}

            </div>

          </div>

          {/* Follow Us */}

          <div>

            <h3 className="mb-6 text-lg font-bold">
              Follow Us
            </h3>

            <p className="mb-5 text-sm leading-6 text-gray-400">
              Follow Loud oga News for breaking stories, updates and
              exclusive reports.
            </p>

            <div className="flex flex-wrap gap-3">

              {settings?.socialLinks?.map((social) => {
                const icon = (
                  <SocialIcon platform={social.platform} />
                );

                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    title={social.platform}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 bg-[#111827] text-gray-300 transition hover:border-[#C8102E] hover:bg-[#C8102E] hover:text-white"
                  >
                    {icon || (
                      <span className="text-xs font-bold uppercase">
                        {social.platform.slice(0, 2)}
                      </span>
                    )}
                  </a>
                );
              })}

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Bar */}

      <div className="border-t border-gray-800">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">

          <p>
            {settings?.copyright ||
              `© ${new Date().getFullYear()} Loud oga News. All rights reserved.`}
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