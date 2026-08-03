import { client } from "../lib/client";
import { trendingQuery } from "../queries/trending";

import type { Article } from "@/types/article";

export async function getTrending(): Promise<Article[]> {
  return client.fetch(trendingQuery);
}