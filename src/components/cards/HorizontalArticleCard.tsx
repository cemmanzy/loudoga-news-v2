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

      <article className="group flex overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

        {article.featuredImage?.image && (
          <img
            src={urlFor(article.featuredImage.image).width(700).url()}
            alt={article.featuredImage.alt || article.title}
            className="h-48 w-64 flex-shrink-0 object-cover"
          />
        )}

        <div className="flex flex-1 flex-col p-6">

          {article.categories?.[0] && (
            <span className="mb-3 inline-flex w-fit rounded-full bg-[#C8102E] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
              {article.categories[0].title}
            </span>
          )}

          <h3 className="text-3xl font-bold leading-tight text-gray-900 transition group-hover:text-[#C8102E]">

            {article.title}

          </h3>

          <p className="mt-4 line-clamp-3 text-gray-600 leading-7">

            {article.excerpt}

          </p>

          <div className="mt-auto flex items-center gap-3 pt-6 text-sm text-gray-500">

            <span className="font-semibold text-gray-900">

              {article.author?.name}

            </span>

            <span>•</span>

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