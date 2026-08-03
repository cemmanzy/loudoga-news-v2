import { client } from "../lib/client";
import { articlesQuery } from "../queries/articles";
import type { Article } from "@/types/article";

export async function getArticles(): Promise<Article[]> {
  return client.fetch(articlesQuery);
}