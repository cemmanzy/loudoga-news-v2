import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import type { Article } from "@/types/article";

import Badge from "../ui/Badge";

interface Props {
  article: Article;
}

export default function HeroArticleCard({
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
          relative
          overflow-hidden
          rounded-b-3xl
          lg:rounded-3xl
          shadow-lg
        "
      >
        {/* Hero Image */}

        {article.featuredImage?.image && (
          <img
            src={urlFor(article.featuredImage.image)
              .width(2200)
              .url()}
            alt={
              article.featuredImage?.alt ||
              article.title
            }
            className="
              h-[300px]
              w-full
              object-cover
              transition
              duration-700
              group-hover:scale-[1.02]

              md:h-[480px]

              lg:h-[560px]
            "
          />
        )}

        {/* Dark overlay */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/95
            via-black/45
            to-black/5
          "
        />

        {/* Extra desktop side gradient */}

        <div
          className="
            absolute
            inset-0
            hidden
            bg-gradient-to-r
            from-black/35
            via-transparent
            to-transparent
            lg:block
          "
        />

        {/* Content */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            p-6

            md:p-10

            lg:max-w-5xl
            lg:p-14
          "
        >
          {/* Category */}

          <Badge>
            {article.categories?.[0]?.title ?? "News"}
          </Badge>

          {/* Headline */}

          <h1
            className="
              mt-4
              max-w-5xl
              text-3xl
              font-black
              leading-[1.05]
              tracking-tight
              text-white

              md:text-5xl

              lg:text-6xl
              xl:text-7xl
            "
          >
            {article.title}
          </h1>

          {/* Excerpt */}

          {article.excerpt && (
            <p
              className="
                mt-4
                hidden
                max-w-3xl
                text-base
                leading-7
                text-gray-200

                md:block

                lg:text-lg
                lg:leading-8
              "
            >
              {article.excerpt}
            </p>
          )}

          {/* Meta */}

          <div
            className="
              mt-5
              flex
              flex-wrap
              items-center
              gap-3
              text-sm
              text-gray-200

              lg:mt-6
            "
          >
            <span>
              By{" "}
              <strong className="font-semibold text-white">
                {article.author.name}
              </strong>
            </span>

            <span className="text-gray-400">
              •
            </span>

            <span>
              {new Date(
                article.publishedAt
              ).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Hover indicator */}

        <div
          className="
            absolute
            bottom-0
            left-0
            h-1
            w-0
            bg-[#C8102E]
            transition-all
            duration-500
            group-hover:w-full
          "
        />
      </article>
    </Link>
  );
}