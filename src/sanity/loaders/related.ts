import { client } from "../lib/client";
import { relatedQuery } from "../queries/related";

import type { Article } from "@/types/article";

export async function getRelated(
  slug: string,
  category: string
): Promise<Article[]> {
  return client.fetch(relatedQuery, {
    slug,
    category,
  });
}