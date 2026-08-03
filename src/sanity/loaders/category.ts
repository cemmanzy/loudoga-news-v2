import { client } from "../lib/client";
import { categoryQuery } from "../queries/category";

import type { Article } from "@/types/article";

export async function getCategory(category: string): Promise<Article[]> {
  return client.fetch(categoryQuery, {
    category,
  });
}