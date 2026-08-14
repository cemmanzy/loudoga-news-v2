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
import ArticleStructuredData from "@/components/article/ArticleStructuredData";
import BreadcrumbStructuredData from "@/components/article/BreadcrumbStructuredData";
import ArticleViewTracker from "@/components/article/ArticleViewTracker";

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
    <>
      {/* View Tracking */}

      <ArticleViewTracker
        slug={article.slug}
      />

      {/* Article Structured Data */}

      <ArticleStructuredData
        title={article.title}
        description={article.excerpt}
        url={`${siteConfig.url}/article/${article.slug}`}
        image={
          article.imageUrl ||
          (article.featuredImage?.image
            ? urlFor(article.featuredImage.image)
                .width(1200)
                .height(630)
                .url()
            : undefined)
        }
        datePublished={article.publishedAt}
        dateModified={article.publishedAt}
        authorName={article.author?.name}
      />

      {/* Breadcrumb Structured Data */}

      <BreadcrumbStructuredData
        categoryTitle={
          article.categories?.[0]?.title
        }
        categorySlug={
          article.categories?.[0]?.slug
        }
        articleTitle={article.title}
        articleUrl={`${siteConfig.url}/article/${article.slug}`}
        siteUrl={siteConfig.url}
      />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_340px] xl:gap-16">

          {/* ================================= */}
          {/* MAIN ARTICLE */}
          {/* ================================= */}

          <article className="min-w-0">

            {/* Breadcrumbs */}

            <div className="mb-6">
              <Breadcrumbs
                category={article.categories?.[0]}
                title={article.title}
              />
            </div>

            {/* Category */}

            {article.categories?.[0] && (
              <Link
                href={`/category/${article.categories[0].slug}`}
                className="
                  inline-flex
                  rounded-full
                  bg-[#C8102E]
                  px-4
                  py-1.5
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-white
                  transition
                  hover:bg-[#a90d27]
                "
              >
                {article.categories[0].title}
              </Link>
            )}

            {/* Title */}

            <h1
              className="
                mt-5
                max-w-5xl
                text-4xl
                font-black
                leading-[1.08]
                tracking-tight
                text-[#111827]

                sm:text-5xl

                lg:text-6xl
              "
            >
              {article.title}
            </h1>

            {/* Excerpt under title */}

            {article.excerpt && (
              <p
                className="
                  mt-6
                  max-w-4xl
                  text-lg
                  leading-8
                  text-gray-600

                  lg:text-xl
                  lg:leading-9
                "
              >
                {article.excerpt}
              </p>
            )}

            {/* Author / Date / Reading Time */}

            <div
              className="
                mt-7
                flex
                flex-wrap
                items-center
                gap-x-3
                gap-y-2
                border-b
                border-gray-200
                pb-6
                text-sm
                text-gray-500
              "
            >
              <Link
                href={`/author/${article.author.slug}`}
                className="
                  font-bold
                  text-gray-900
                  transition
                  hover:text-[#C8102E]
                "
              >
                By {article.author.name}
              </Link>

              <span>•</span>

              <span>
                {new Date(
                  article.publishedAt
                ).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>

              <span>•</span>

              <span className="font-medium">
                {readingTime}
              </span>
            </div>

            {/* Share */}

            <div className="py-5">
              <ShareButtons
                title={article.title}
              />
            </div>

            {/* ================================= */}
            {/* FEATURED IMAGE */}
            {/* ================================= */}

            {article.featuredImage?.image && (
              <figure className="mt-2">

                <div className="overflow-hidden rounded-2xl lg:rounded-3xl">
                  <img
                    src={urlFor(
                      article.featuredImage.image
                    )
                      .width(1800)
                      .url()}
                    alt={
                      article.featuredImage.alt ||
                      article.title
                    }
                    className="
                      h-auto
                      w-full
                      object-cover
                    "
                  />
                </div>

                {(article.featuredImage.caption ||
                  article.featuredImage.photoCredit) && (
                  <figcaption
                    className="
                      mt-3
                      flex
                      flex-wrap
                      justify-between
                      gap-2
                      text-xs
                      leading-5
                      text-gray-500
                    "
                  >
                    {article.featuredImage.caption && (
                      <span>
                        {article.featuredImage.caption}
                      </span>
                    )}

                    {article.featuredImage.photoCredit && (
                      <span>
                        Photo:{" "}
                        {article.featuredImage.photoCredit}
                      </span>
                    )}
                  </figcaption>
                )}

              </figure>
            )}

            {/* ================================= */}
            {/* ARTICLE BODY */}
            {/* ================================= */}

            <div className="mt-10">

              <article
                className="
                  prose
                  prose-lg
                  max-w-none

                  prose-headings:font-black
                  prose-headings:tracking-tight
                  prose-headings:text-[#111827]

                  prose-p:leading-8
                  prose-p:text-gray-700

                  prose-a:text-[#C8102E]
                  prose-a:no-underline
                  hover:prose-a:underline

                  prose-strong:text-[#111827]

                  prose-blockquote:border-l-[#C8102E]
                  prose-blockquote:text-gray-700

                  prose-img:rounded-2xl
                "
              >
                <PortableText
                  value={article.body ?? []}
                  components={
                    portableTextComponents
                  }
                />
              </article>

            </div>

            {/* ================================= */}
            {/* RELATED ARTICLES */}
            {/* ================================= */}

            {related.length > 0 && (
              <section
                className="
                  mt-16
                  border-t
                  border-gray-200
                  pt-12
                "
              >
                <RelatedArticles
                  articles={related}
                />
              </section>
            )}

          </article>

          {/* ================================= */}
          {/* SIDEBAR */}
          {/* ================================= */}

          <aside className="hidden lg:block">

            <div className="sticky top-24 space-y-8">

              <ArticleSidebar
                mostRead={mostRead}
                latest={latest}
              />

            </div>

          </aside>

        </div>
      </main>
    </>
  );
}