import Image from "next/image";
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

      <article className="group relative overflow-hidden rounded-3xl shadow-lg">

        {article.featuredImage?.image && (
          <img
  src={urlFor(article.featuredImage.image).width(1800).url()}
  alt={article.featuredImage?.alt || article.title}
  className="h-[260px] w-full object-cover transition duration-700 group-hover:scale-105 md:h-[450px] lg:h-[480px]"
/>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">

          <Badge>
            {article.categories[0]?.title ?? "News"}
          </Badge>

          <h1 className="mt-5 max-w-4xl text-3xl font-black leading-tight text-white md:text-6xl">

            {article.title}

          </h1>

          <p className="mt-4 hidden max-w-3xl text-lg leading-8 text-gray-200 md:block">

            {article.excerpt}

          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-200">

  <span>
    By <strong>{article.author.name}</strong>
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