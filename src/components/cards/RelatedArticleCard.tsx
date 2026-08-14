import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import type { Article } from "@/types/article";

interface Props {
  article: Article;
}

export default function RelatedArticleCard({
  article,
}: Props) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="
        group
        block
        w-full
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
      "
    >

      {/* =====================================
          IMAGE
          ===================================== */}

      {article.featuredImage?.image && (
        <div className="overflow-hidden">
          <img
            src={urlFor(
              article.featuredImage.image
            )
              .width(900)
              .url()}
            alt={
              article.featuredImage.alt ||
              article.title
            }
            className="
              h-48
              w-full
              object-cover
              transition
              duration-500
              group-hover:scale-105

              sm:h-52

              lg:h-52
            "
          />
        </div>
      )}

      {/* =====================================
          CONTENT
          ===================================== */}

      <div
        className="
          flex
          min-h-[250px]
          flex-col
          p-4

          sm:p-5
        "
      >

        {/* =================================
            CATEGORY
            ================================= */}

        {article.categories?.[0] && (
          <span
            className="
              text-xs
              font-bold
              uppercase
              tracking-wide
              text-[#C8102E]
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
            mt-2
            line-clamp-2
            text-lg
            font-bold
            leading-tight
            text-gray-900
            transition

            group-hover:text-[#C8102E]

            dark:text-white

            sm:mt-3
            sm:text-xl
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
            justify-between
            gap-2
            pt-5
            text-xs
            text-gray-500

            dark:text-gray-400

            sm:text-sm
          "
        >

          <span
            className="
              font-medium
              text-gray-700
              dark:text-gray-300
            "
          >
            {article.author?.name}
          </span>

          <span>
            {new Date(
              article.publishedAt
            ).toLocaleDateString(
              "en-US",
              {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              }
            )}
          </span>

        </div>

      </div>

    </Link>
  );
}