import type { MetadataRoute } from "next";

import { client } from "@/sanity/lib/client";
import { siteConfig } from "@/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await client.fetch(`
    *[_type == "article"]{
      "slug": slug.current,
      _updatedAt
    }
  `);

  const categories = await client.fetch(`
    *[_type == "category"]{
      "slug": slug.current,
      _updatedAt
    }
  `);

  const articleRoutes = articles.map(
    (article: {
      slug: string;
      _updatedAt: string;
    }) => ({
      url: `${siteConfig.url}/article/${article.slug}`,
      lastModified: new Date(article._updatedAt),
      changeFrequency: "daily" as const,
      priority: 0.8,
    })
  );

  const categoryRoutes = categories.map(
    (category: {
      slug: string;
      _updatedAt: string;
    }) => ({
      url: `${siteConfig.url}/category/${category.slug}`,
      lastModified: new Date(category._updatedAt),
      changeFrequency: "daily" as const,
      priority: 0.7,
    })
  );

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    ...categoryRoutes,

    ...articleRoutes,
  ];
}