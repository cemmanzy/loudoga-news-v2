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

  const staticRoutes = [
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/advertise`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/subscribe`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
    {
      url: `${siteConfig.url}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    ...staticRoutes,

    ...categoryRoutes,

    ...articleRoutes,
  ];
}