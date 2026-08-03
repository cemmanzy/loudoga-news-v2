import { client } from "../lib/client";
import { heroQuery } from "../queries/hero";

import type { Article } from "@/types/article";

export async function getHero(): Promise<Article | null> {
  return client.fetch(heroQuery);
}