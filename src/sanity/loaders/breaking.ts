import { client } from "../lib/client";
import { breakingQuery } from "../queries/breaking";

export interface BreakingArticle {
  _id: string;
  title: string;
  slug: string;
}

export async function getBreaking(): Promise<BreakingArticle[]> {
  return client.fetch(breakingQuery);
}