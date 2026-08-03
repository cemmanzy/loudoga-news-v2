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
    <Link href={`/article/${article.slug}`}>

      <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:shadow-lg md:flex-row">
        {article.featuredImage?.image && (
          <img
            src={urlFor(article.featuredImage.image).width(600).url()}
            alt={article.featuredImage.alt || article.title}
            className="h-52 w-full rounded-xl object-cover md:h-40 md:w-60"
          />
        )}

        <div className="flex flex-1 flex-col">

          {article.categories?.[0] && (
            <span className="mb-3 inline-block rounded-full bg-[#C8102E] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">

              {article.categories[0].title}

            </span>
          )}

          <h3 className="text-xl font-bold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-[#C8102E]">

            {article.title}

          </h3>

          <p className="mt-3 line-clamp-3 text-gray-600">

            {article.excerpt}

          </p>

          <div className="mt-auto pt-5 text-sm text-gray-500">

            <span className="font-semibold text-gray-700">
              {article.author?.name}
            </span>

            <span className="mx-2">•</span>

            <span>
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>

          </div>

        </div>

      </article>

    </Link>
  );
}