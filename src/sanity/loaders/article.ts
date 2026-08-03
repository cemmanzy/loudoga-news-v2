import { client } from "../lib/client";
import { articleQuery } from "../queries/article";

import type { Article } from "@/types/article";

export async function getArticle(slug: string): Promise<Article> {
  return client.fetch(articleQuery, {
    slug,
  });
}