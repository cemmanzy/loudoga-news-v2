import { client } from "../lib/client";
import { authorQuery } from "../queries/author";

import type { Article } from "@/types/article";

export interface AuthorProfile {
  _id: string;

  name: string;

  slug: string;

  photo?: any;

  position?: string;

  bio?: string;

  socialLinks?: unknown[];

  articles: Article[];
}

export async function getAuthor(
  slug: string
): Promise<AuthorProfile | null> {
  return client.fetch(authorQuery, {
    slug,
  });
}