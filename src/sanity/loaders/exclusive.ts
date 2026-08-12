import { sanityFetch } from "../lib/client";
import { exclusiveQuery } from "../queries/exclusive";

import type { Article } from "@/types/article";

export async function getExclusive(): Promise<Article[]> {
  return sanityFetch({
    query: exclusiveQuery,
    tags: ["article"],
  });
}