import { client } from "../lib/client";
import { searchQuery } from "../queries/search";

import type { Article } from "@/types/article";

export async function searchArticles(
  search: string
): Promise<Article[]> {
  return client.fetch(searchQuery, {
    search,
  });
}