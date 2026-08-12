import { sanityFetch } from "../lib/client";
import { featuredQuery } from "../queries/featured";

import type { Article } from "@/types/article";

export async function getFeatured(): Promise<Article[]> {
  return sanityFetch({
    query: featuredQuery,
    tags: ["article"],
  });
}