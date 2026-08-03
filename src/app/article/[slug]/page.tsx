import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

import { getArticle } from "@/sanity/loaders/article";
import { urlFor } from "@/sanity/lib/image";
import { portableTextComponents } from "@/components/article/PortableTextComponents";
import { getRelated } from "@/sanity/loaders/related";
import RelatedArticles from "@/components/article/RelatedArticles";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticlePage({
  params,
}: Props) {
  const { slug } = await params;

  const article = await getArticle(slug);

  const related = await getRelated(
  article.slug,
  article.categories?.[0]?.title ?? ""
);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">

      {article.categories?.[0] && (
        <Link
          href={`/category/${article.categories[0].slug}`}
          className="inline-block rounded-full bg-[#C8102E] px-4 py-2 text-sm font-bold text-white"
        >
          {article.categories[0].title}
        </Link>
      )}

      <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">

        {article.title}

      </h1>

      <p className="mt-6 text-xl leading-8 text-gray-600">

        {article.excerpt}

      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-gray-500">

        <Link
  href={`/author/${article.author.slug}`}
  className="font-semibold text-gray-800 hover:text-[#C8102E]"
>
  By {article.author.name}
</Link>

        <span>•</span>

        <span>
          {new Date(article.publishedAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>

      </div>

      {article.featuredImage?.image && (
        <figure className="mt-10">

          <img
            src={urlFor(article.featuredImage.image).width(1600).url()}
            alt={article.featuredImage.alt || article.title}
            className="w-full rounded-2xl object-cover"
          />

          {(article.featuredImage.caption ||
            article.featuredImage.photoCredit) && (
            <figcaption className="mt-3 flex flex-wrap justify-between gap-2 text-sm text-gray-500">

              <span>
                {article.featuredImage.caption}
              </span>

              <span>
                Photo: {article.featuredImage.photoCredit}
              </span>

            </figcaption>
          )}

        </figure>
      )}

      <article className="prose prose-lg mt-12 max-w-none prose-headings:font-bold prose-img:rounded-xl">

        <PortableText
          value={article.body ?? []}
          components={portableTextComponents}
       />

      </article>

      <RelatedArticles articles={related} />

    </main>
  );
}