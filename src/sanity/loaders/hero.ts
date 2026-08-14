import { sanityFetch } from "../lib/client";
import { heroQuery } from "../queries/hero";

import type { Article } from "@/types/article";

export async function getHero(): Promise<Article[]> {
  return sanityFetch({
    query: heroQuery,
    tags: ["article"],
  });
}