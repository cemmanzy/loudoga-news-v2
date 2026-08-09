import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config/site";

import { getCategory } from "@/sanity/loaders/category";
import { getCategoryMetadata } from "@/sanity/loaders/categoryMetadata";

import CategoryPage from "@/components/category/CategoryPage";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

/* ------------------------------------ */
/* Dynamic Category SEO */
/* ------------------------------------ */

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const category = await getCategoryMetadata(slug);

  if (!category) {
    return {};
  }

  const description = `Latest ${category.title} news from ${siteConfig.name}.`;

  return {
    title: category.title,

    description,

    alternates: {
      canonical: `${siteConfig.url}/category/${category.slug}`,
    },

    openGraph: {
      title: `${category.title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/category/${category.slug}`,
      siteName: siteConfig.name,
      type: "website",

      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${category.title} | ${siteConfig.name}`,
      description,
      images: [siteConfig.ogImage],
    },
  };
}

/* ------------------------------------ */
/* Category Page */
/* ------------------------------------ */

export default async function Page({
  params,
}: Props) {
  const { slug } = await params;

  // Existing loader remains unchanged.
  // This still returns Article[] and continues powering the page.
  const articles = await getCategory(slug);

  if (!articles || articles.length === 0) {
    notFound();
  }

  // Get the real category title from Sanity.
  // The article loader is NOT changed.
  const category = await getCategoryMetadata(slug);

  return (
    <CategoryPage
      title={category?.title ?? slug}
      articles={articles}
    />
  );
}