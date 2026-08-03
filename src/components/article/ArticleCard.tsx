import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import type { Article } from "@/types/article";

interface Props {
  article: Article;
}

export default function ArticleCard({
  article,
}: Props) {
  return (
    <article className="border-b py-8">

      {article.featuredImage?.image && (
        <img
  src={urlFor(article.featuredImage.image).width(500).url()}
  alt={article.title}
  className="h-28 w-36 rounded-lg object-cover md:h-36 md:w-52"
/>
      )}

      <Link href={`/article/${article.slug}`}>
        <h2 className="text-3xl font-bold hover:text-red-600 transition">

          {article.title}

        </h2>
      </Link>

      <p className="text-gray-600 mt-4">

        {article.excerpt}

      </p>

      <div className="mt-4 text-sm text-gray-500">

        {article.author.name}

      </div>

    </article>
  );
}