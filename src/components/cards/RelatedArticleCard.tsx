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
      className="group block w-full overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
    >
      {article.featuredImage?.image && (
        <img
          src={urlFor(article.featuredImage.image).width(700).url()}
          alt={article.featuredImage.alt || article.title}
          className="h-48 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-52"
        />
      )}

      <div className="p-4 sm:p-5">

        {article.categories?.[0] && (
          <span className="text-xs font-bold uppercase tracking-wide text-[#C8102E]">
            {article.categories[0].title}
          </span>
        )}

        <h3 className="mt-2 line-clamp-2 text-lg font-bold leading-tight text-gray-900 group-hover:text-[#C8102E] sm:mt-3 sm:text-xl">
          {article.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600 sm:text-base">
          {article.excerpt}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500 sm:text-sm">

          <span>
            {article.author?.name}
          </span>

          <span>
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>

        </div>

      </div>
    </Link>
  );
}