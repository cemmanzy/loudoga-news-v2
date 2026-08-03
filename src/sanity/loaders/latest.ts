import { client } from "../lib/client";
import { latestQuery } from "../queries/latest";

import type { Article } from "@/types/article";

export async function getLatest(): Promise<Article[]> {
  return client.fetch(latestQuery);
}