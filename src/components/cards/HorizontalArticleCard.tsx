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
      <article className="group flex w-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:flex-row">

        {article.featuredImage?.image && (
          <img
            src={urlFor(article.featuredImage.image).width(700).url()}
            alt={article.featuredImage.alt || article.title}
            className="h-52 w-full object-cover sm:h-48 sm:w-64 sm:flex-shrink-0"
          />
        )}

        <div className="flex flex-1 flex-col p-4 sm:p-6">

          {article.categories?.[0] && (
            <span className="mb-3 inline-flex w-fit rounded-full bg-[#C8102E] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
              {article.categories[0].title}
            </span>
          )}

          <h3 className="text-xl font-bold leading-tight text-gray-900 transition group-hover:text-[#C8102E] sm:text-3xl">
            {article.title}
          </h3>

          <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600 sm:mt-4 sm:text-base sm:leading-7">
            {article.excerpt}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-5 text-xs text-gray-500 sm:gap-3 sm:pt-6 sm:text-sm">

            <span className="font-semibold text-gray-900">
              {article.author?.name}
            </span>

            <span>•</span>

            <span>
              {new Date(article.publishedAt).toLocaleDateString(
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