import Link from "next/link";

import { getCategories } from "@/sanity/loaders/categories";
import { getSiteSettings } from "@/sanity/loaders/siteSettings";

export default async function Footer() {
  const [categories, settings] = await Promise.all([
    getCategories(),
    getSiteSettings(),
  ]);

  return (
    <footer className="mt-20 bg-[#0F172A] text-white">

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}

        <div>

          <h2 className="text-3xl font-black text-[#C8102E]">

            {settings?.siteName ?? "LOUDOGA NEWS"}

          </h2>

          <p className="mt-5 leading-7 text-gray-300">

            {settings?.description}

          </p>

          {settings?.email && (

            <p className="mt-5 text-sm text-gray-400">

              {settings.email}

            </p>

          )}

          {settings?.phone && (

            <p className="mt-2 text-sm text-gray-400">

              {settings.phone}

            </p>

          )}

        </div>

        {/* Categories */}

        <div>

          <h3 className="mb-5 text-lg font-bold">

            Categories

          </h3>

          <ul className="space-y-3 text-gray-300">

            {categories.map((category) => (

              <li key={category._id}>

                <Link
                  href={`/category/${category.slug}`}
                  className="hover:text-white"
                >

                  {category.title}

                </Link>

              </li>

            ))}

          </ul>

        </div>

        {/* Address */}

        <div>

          <h3 className="mb-5 text-lg font-bold">

            Contact

          </h3>

          <p className="whitespace-pre-line text-gray-300">

            {settings?.address}

          </p>

        </div>

        {/* Social */}

        <div>

          <h3 className="mb-5 text-lg font-bold">

            Follow Us

          </h3>

          <ul className="space-y-3">

            {settings?.socialLinks?.map((social) => (

              <li key={social.platform}>

                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="capitalize text-gray-300 hover:text-white"
                >

                  {social.platform}

                </a>

              </li>

            ))}

          </ul>

        </div>

      </div>

      <div className="border-t border-gray-800">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-sm text-gray-400">

          <p>

            {settings?.copyright ??
              `© ${new Date().getFullYear()} Loudoga News`}

          </p>

          <p>

            {settings?.tagline}

          </p>

        </div>

      </div>

    </footer>
  );
}