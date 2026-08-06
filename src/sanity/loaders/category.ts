import { client } from "../lib/client";
import { categoryQuery } from "../queries/category";

import type { Article } from "@/types/article";

export async function getCategory(
  slug: string
): Promise<Article[]> {
  return client.fetch(categoryQuery, {
    slug,
  });
}