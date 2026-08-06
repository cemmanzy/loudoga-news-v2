import type { Metadata } from "next";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

import { siteConfig } from "@/config/site";

import { getArticle } from "@/sanity/loaders/article";
import { getRelated } from "@/sanity/loaders/related";
import { getArticleMostRead } from "@/sanity/loaders/articleMostRead";
import { getSidebarLatest } from "@/sanity/loaders/sidebarLatest";

import { urlFor } from "@/sanity/lib/image";
import { calculateReadingTime } from "@/sanity/lib/readingTime";

import { portableTextComponents } from "@/components/article/PortableTextComponents";
import RelatedArticles from "@/components/article/RelatedArticles";
import ShareButtons from "@/components/article/ShareButtons";
import ArticleSidebar from "@/components/article/ArticleSidebar";
import Breadcrumbs from "@/components/article/Breadcrumbs";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

/* ------------------------------------ */
/* Dynamic SEO */
/* ------------------------------------ */

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const article = await getArticle(slug);

  return {
    title: article.title,

    description:
      article.excerpt || siteConfig.description,

    alternates: {
      canonical: `${siteConfig.url}/article/${article.slug}`,
    },

    openGraph: {
      title: article.title,
      description:
        article.excerpt || siteConfig.description,

      url: `${siteConfig.url}/article/${article.slug}`,

      siteName: siteConfig.name,

      type: "article",

      publishedTime: article.publishedAt,

      images: article.imageUrl
        ? [
            {
              url: article.imageUrl,
              width: 1200,
              height: 630,
            },
          ]
        : [
            {
              url: siteConfig.ogImage,
            },
          ],
    },

    twitter: {
      card: "summary_large_image",
      title: article.title,
      description:
        article.excerpt || siteConfig.description,

      images: article.imageUrl
        ? [article.imageUrl]
        : [siteConfig.ogImage],
    },
  };
}

/* ------------------------------------ */
/* Page */
/* ------------------------------------ */

export default async function ArticlePage({
  params,
}: Props) {
  const { slug } = await params;

  const article = await getArticle(slug);

  const articleText =
    article.body
      ?.map((block: any) =>
        block.children
          ?.map((child: any) => child.text)
          .join(" ")
      )
      .join(" ") ?? "";

  const readingTime =
    calculateReadingTime(articleText);

  const related = await getRelated(
    article.slug,
    article.categories?.[0]?.title ?? ""
  );

  const mostRead =
    await getArticleMostRead();

  const latest =
    await getSidebarLatest();

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">

      <div className="grid gap-12 lg:grid-cols-[2fr_360px]">

        {/* LEFT COLUMN */}

        <div>

          <Breadcrumbs
            category={article.categories?.[0]}
            title={article.title}
          />

          {article.categories?.[0] && (
            <Link
              href={`/category/${article.categories[0].slug}`}
              className="inline-block rounded-full bg-[#C8102E] px-4 py-2 text-sm font-bold text-white"
            >
              {article.categories[0].title}
            </Link>
          )}

          {/* Title */}

          <h1 className="mt-6 text-4xl font-extrabold leading-tight lg:text-5xl">
            {article.title}
          </h1>

          {/* Author / Date / Reading Time */}

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-gray-500">

            <Link
              href={`/author/${article.author.slug}`}
              className="font-semibold text-gray-800 transition hover:text-[#C8102E]"
            >
              By {article.author.name}
            </Link>

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

            <span>•</span>

            <span className="font-medium">
              {readingTime}
            </span>

          </div>

          {/* Share Buttons */}

          <ShareButtons
            title={article.title}
          />

          {/* Featured Image */}

          {article.featuredImage?.image && (

            <figure className="mt-8">

              <img
                src={urlFor(article.featuredImage.image)
                  .width(1600)
                  .url()}
                alt={
                  article.featuredImage.alt ||
                  article.title
                }
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

          {/* Excerpt */}

          <p className="mt-8 text-xl leading-8 text-gray-600">
            {article.excerpt}
          </p>

          {/* Article Body */}

          <article className="prose prose-lg mt-10 max-w-none prose-headings:font-bold prose-img:rounded-xl">

            <PortableText
              value={article.body ?? []}
              components={portableTextComponents}
            />

          </article>

          {/* Related Articles */}

          <RelatedArticles
            articles={related}
          />

        </div>

        {/* RIGHT SIDEBAR */}

        <aside className="hidden lg:block">

          <div className="sticky top-24">

            <ArticleSidebar
              mostRead={mostRead}
              latest={latest}
            />

          </div>

        </aside>

      </div>

    </main>
  );
}