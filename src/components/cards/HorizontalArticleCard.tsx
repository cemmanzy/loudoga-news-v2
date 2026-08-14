import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import type { Article } from "@/types/article";

interface Props {
  article: Article;
}

export default function HorizontalArticleCard({
  article,
}: Props) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="block w-full"
    >
      <article
        className="
          group
          flex
          w-full
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-gray-200
          bg-white
          transition-all
          duration-300

          hover:-translate-y-1
          hover:shadow-xl

          dark:border-gray-700
          dark:bg-[#111827]
          dark:hover:bg-[#162033]

          sm:flex-row
        "
      >

        {/* =====================================
            IMAGE
            ===================================== */}

        {article.featuredImage?.image && (
          <img
            src={urlFor(
              article.featuredImage.image
            )
              .width(800)
              .url()}
            alt={
              article.featuredImage.alt ||
              article.title
            }
            className="
              h-52
              w-full
              object-cover
              transition
              duration-500
              group-hover:scale-[1.02]

              sm:h-52
              sm:w-64
              sm:flex-shrink-0

              lg:h-52
              lg:w-72
            "
          />
        )}

        {/* =====================================
            CONTENT
            ===================================== */}

        <div
          className="
            flex
            min-w-0
            flex-1
            flex-col
            p-4

            sm:p-5
            lg:p-6
          "
        >

          {/* =================================
              CATEGORY
              ================================= */}

          {article.categories?.[0] && (
            <span
              className="
                mb-3
                inline-flex
                w-fit
                rounded-full
                bg-[#C8102E]
                px-3
                py-1
                text-xs
                font-bold
                uppercase
                tracking-wide
                text-white
              "
            >
              {article.categories[0].title}
            </span>
          )}

          {/* =================================
              TITLE
              ================================= */}

          <h3
            className="
              text-xl
              font-bold
              leading-tight
              text-gray-900
              transition

              group-hover:text-[#C8102E]

              dark:text-white

              sm:text-2xl

              lg:text-[25px]
              lg:leading-[1.15]
            "
          >
            {article.title}
          </h3>

          {/* =================================
              EXCERPT
              ================================= */}

          {article.excerpt && (
            <p
              className="
                mt-3
                line-clamp-3
                text-sm
                leading-6
                text-gray-600

                dark:text-gray-300

                sm:text-[15px]
                sm:leading-6
              "
            >
              {article.excerpt}
            </p>
          )}

          {/* =================================
              META
              ================================= */}

          <div
            className="
              mt-auto
              flex
              flex-wrap
              items-center
              gap-2
              pt-4
              text-xs
              text-gray-500

              dark:text-gray-400

              sm:gap-3
              sm:pt-5
              sm:text-sm
            "
          >

            <span
              className="
                font-semibold
                text-gray-900
                dark:text-gray-100
              "
            >
              {article.author?.name}
            </span>

            <span>•</span>

            <span>
              {new Date(
                article.publishedAt
              ).toLocaleDateString(
                "en-US",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </span>

          </div>

        </div>

      </article>
    </Link>
  );
}