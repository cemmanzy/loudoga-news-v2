import { sanityFetch } from "../lib/client";
import { trendingQuery } from "../queries/trending";

import type { Article } from "@/types/article";

export async function getTrending(): Promise<Article[]> {
  return sanityFetch({
    query: trendingQuery,
    tags: ["article"],
  });
}