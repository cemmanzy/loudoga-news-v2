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
      className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
    >
      {article.featuredImage?.image && (
        <img
          src={urlFor(article.featuredImage.image).width(700).url()}
          alt={article.title}
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      )}

      <div className="p-5">

        {article.categories?.[0] && (
          <span className="text-xs font-bold uppercase tracking-wide text-[#C8102E]">

            {article.categories[0].title}

          </span>
        )}

        <h3 className="mt-3 line-clamp-2 text-xl font-bold group-hover:text-[#C8102E]">

          {article.title}

        </h3>

        <p className="mt-3 line-clamp-3 text-gray-600">

          {article.excerpt}

        </p>

        <div className="mt-5 flex items-center justify-between text-sm text-gray-500">

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