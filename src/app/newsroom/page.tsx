import type { Metadata } from "next";
import Link from "next/link";

import { getNewsroom } from "@/sanity/loaders/newsroom";
import { urlFor } from "@/sanity/lib/image";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Newsroom",
  description:
    "Meet the people behind Loud Oga News & TV — the team responsible for our journalism, reporting and media operations.",
  alternates: {
    canonical: `${siteConfig.url}/newsroom`,
  },
};

export default async function NewsroomPage() {
  const members = await getNewsroom();

  return (
    <main className="min-h-screen bg-white dark:bg-[#0F172A]">
      {/* =========================================
          HERO
      ========================================== */}

      <section className="border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <span
              className="
                inline-flex
                rounded-full
                bg-[#C8102E]
                px-4
                py-1.5
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-white
              "
            >
              Loud Oga News & TV
            </span>

            <h1
              className="
                mt-5
                text-4xl
                font-black
                tracking-tight
                text-[#111827]
                dark:text-white
                sm:text-5xl
                lg:text-6xl
              "
            >
              Our Newsroom
            </h1>

            <p
              className="
                mt-6
                max-w-2xl
                text-lg
                leading-8
                text-gray-600
                dark:text-gray-300
              "
            >
              Meet the people behind Loud Oga News & TV. Our newsroom
              brings together the team responsible for reporting,
              journalism, editorial direction and digital media.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          TEAM
      ========================================== */}

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        {members.length > 0 ? (
          <div
            className="
              grid
              gap-8
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >
            {members.map((member) => {
              const imageUrl = member.photo
                ? urlFor(member.photo)
                    .width(700)
                    .height(700)
                    .fit("crop")
                    .url()
                : null;

              return (
                <article
                  key={member._id}
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    shadow-sm
                    transition
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                    dark:border-gray-700
                    dark:bg-[#111827]
                  "
                >
                  {/* Photo */}

                  <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={member.name}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition
                          duration-500
                          hover:scale-105
                        "
                      />
                    ) : (
                      <div
                        className="
                          flex
                          h-full
                          w-full
                          items-center
                          justify-center
                          bg-[#C8102E]
                          text-5xl
                          font-black
                          text-white
                        "
                      >
                        {member.name
                          .split(" ")
                          .map((word) => word[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Content */}

                  <div className="p-6">
                    <h2
                      className="
                        text-xl
                        font-black
                        text-[#111827]
                        dark:text-white
                      "
                    >
                      {member.name}
                    </h2>

                    <p
                      className="
                        mt-2
                        text-sm
                        font-bold
                        uppercase
                        tracking-wide
                        text-[#C8102E]
                      "
                    >
                      {member.role}
                    </p>

                    {member.bio && (
                      <p
                        className="
                          mt-4
                          text-sm
                          leading-7
                          text-gray-600
                          dark:text-gray-300
                        "
                      >
                        {member.bio}
                      </p>
                    )}

                    {(member.email || member.socialUrl) && (
                      <div
                        className="
                          mt-5
                          flex
                          flex-wrap
                          gap-3
                          border-t
                          border-gray-200
                          pt-4
                          dark:border-gray-700
                        "
                      >
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="
                              text-sm
                              font-semibold
                              text-gray-700
                              transition
                              hover:text-[#C8102E]
                              dark:text-gray-300
                            "
                          >
                            Email
                          </a>
                        )}

                        {member.socialUrl && (
                          <a
                            href={member.socialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              text-sm
                              font-semibold
                              text-gray-700
                              transition
                              hover:text-[#C8102E]
                              dark:text-gray-300
                            "
                          >
                            Social Profile
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-gray-300
              px-6
              py-16
              text-center
              dark:border-gray-700
            "
          >
            <h2
              className="
                text-2xl
                font-black
                text-[#111827]
                dark:text-white
              "
            >
              Our newsroom team is coming soon
            </h2>

            <p
              className="
                mx-auto
                mt-3
                max-w-xl
                text-gray-600
                dark:text-gray-400
              "
            >
              The people behind Loud Oga News & TV will be listed
              here once their profiles are added in Sanity Studio.
            </p>

            <Link
              href="/"
              className="
                mt-6
                inline-flex
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
              Back to Home
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}