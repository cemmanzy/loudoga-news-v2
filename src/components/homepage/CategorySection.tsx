import Link from "next/link";

import type { Article } from "@/types/article";
import { urlFor } from "@/sanity/lib/image";

import SectionTitle from "../ui/SectionTitle";

interface Props {
  title: string;
  href: string;
  articles: Article[];
}

export default function CategorySection({
  title,
  href,
  articles,
}: Props) {
  if (!articles.length) return null;

  const featured = articles[0];
  const others = articles.slice(1, 7);

  return (
    <section>
      <SectionTitle href={href}>
        {title}
      </SectionTitle>

      {/* =====================================
          FEATURED ONLY
          ===================================== */}

      {others.length === 0 ? (
        <Link
          href={`/article/${featured.slug}`}
          className="group mt-8 block w-full"
        >
          {featured.featuredImage?.image && (
            <div className="overflow-hidden rounded-2xl">
              <img
                src={urlFor(
                  featured.featuredImage.image
                )
                  .width(1400)
                  .url()}
                alt={
                  featured.featuredImage.alt ||
                  featured.title
                }
                className="
                  h-64
                  w-full
                  object-cover
                  transition
                  duration-500
                  group-hover:scale-[1.02]

                  sm:h-80

                  lg:h-[420px]
                "
              />
            </div>
          )}

          {/* Title */}

          <h2
            className="
              mt-5
              max-w-4xl
              text-3xl
              font-extrabold
              leading-tight
              text-gray-900
              transition
              group-hover:text-[#C8102E]

              dark:text-white

              lg:text-4xl
            "
          >
            {featured.title}
          </h2>

          {/* Excerpt */}

          {featured.excerpt && (
            <p
              className="
                mt-4
                max-w-3xl
                line-clamp-3
                leading-7
                text-gray-600
                dark:text-gray-300
              "
            >
              {featured.excerpt}
            </p>
          )}

          {/* Meta */}

          <div
            className="
              mt-5
              flex
              items-center
              gap-3
              text-sm
              text-gray-500
              dark:text-gray-400
            "
          >
            {featured.author?.name && (
              <>
                <span
                  className="
                    font-semibold
                    text-gray-700
                    dark:text-gray-200
                  "
                >
                  {featured.author.name}
                </span>

                <span>•</span>
              </>
            )}

            <span>
              {new Date(
                featured.publishedAt
              ).toLocaleDateString(
                "en-US",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              )}
            </span>
          </div>
        </Link>
      ) : (

        /* =====================================
           FEATURED + SUPPORTING STORIES
           ===================================== */

        <div
          className="
            mt-8
            grid
            w-full
            grid-cols-1
            gap-10

            lg:grid-cols-[1.35fr_1fr]
          "
        >

          {/* =================================
              FEATURED STORY
              ================================= */}

          <Link
            href={`/article/${featured.slug}`}
            className="group block w-full"
          >

            {featured.featuredImage?.image && (
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={urlFor(
                    featured.featuredImage.image
                  )
                    .width(1200)
                    .url()}
                  alt={
                    featured.featuredImage.alt ||
                    featured.title
                  }
                  className="
                    h-64
                    w-full
                    object-cover
                    transition
                    duration-500
                    group-hover:scale-[1.02]

                    sm:h-80

                    lg:h-[380px]
                  "
                />
              </div>
            )}

            {/* Title */}

            <h2
              className="
                mt-5
                text-3xl
                font-extrabold
                leading-tight
                text-gray-900
                transition
                group-hover:text-[#C8102E]

                dark:text-white

                lg:text-4xl
              "
            >
              {featured.title}
            </h2>

            {/* Excerpt */}

            {featured.excerpt && (
              <p
                className="
                  mt-4
                  line-clamp-3
                  leading-7
                  text-gray-600
                  dark:text-gray-300
                "
              >
                {featured.excerpt}
              </p>
            )}

            {/* Meta */}

            <div
              className="
                mt-5
                flex
                items-center
                gap-3
                text-sm
                text-gray-500
                dark:text-gray-400
              "
            >
              {featured.author?.name && (
                <>
                  <span
                    className="
                      font-semibold
                      text-gray-700
                      dark:text-gray-200
                    "
                  >
                    {featured.author.name}
                  </span>

                  <span>•</span>
                </>
              )}

              <span>
                {new Date(
                  featured.publishedAt
                ).toLocaleDateString(
                  "en-US",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </span>
            </div>

          </Link>

          {/* =================================
              SUPPORTING STORIES
              ================================= */}

          <div className="space-y-5">

            {others.map((article) => (

              <Link
                key={article._id}
                href={`/article/${article.slug}`}
                className="
                  group
                  flex
                  w-full
                  gap-4
                  border-b
                  border-gray-200
                  pb-5
                  transition
                  last:border-b-0

                  dark:border-gray-700
                "
              >

                {/* Image */}

                {article.featuredImage?.image && (
                  <div
                    className="
                      h-24
                      w-32
                      flex-shrink-0
                      overflow-hidden
                      rounded-xl
                    "
                  >
                    <img
                      src={urlFor(
                        article.featuredImage.image
                      )
                        .width(400)
                        .url()}
                      alt={
                        article.featuredImage.alt ||
                        article.title
                      }
                      className="
                        h-full
                        w-full
                        object-cover
                        transition
                        duration-300
                        group-hover:scale-105
                      "
                    />
                  </div>
                )}

                {/* Content */}

                <div className="min-w-0 flex-1">

                  <h3
                    className="
                      font-bold
                      leading-6
                      text-gray-900
                      transition
                      group-hover:text-[#C8102E]

                      dark:text-white
                    "
                  >
                    {article.title}
                  </h3>

                  {/* Meta */}

                  <div
                    className="
                      mt-2
                      text-xs
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    {article.author?.name && (
                      <>
                        <span
                          className="
                            font-semibold
                            text-gray-700
                            dark:text-gray-300
                          "
                        >
                          {article.author.name}
                        </span>

                        <span className="mx-2">
                          •
                        </span>
                      </>
                    )}

                    <span>
                      {new Date(
                        article.publishedAt
                      ).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "short",
                        }
                      )}
                    </span>
                  </div>

                </div>

              </Link>

            ))}

          </div>

        </div>
      )}
    </section>
  );
}