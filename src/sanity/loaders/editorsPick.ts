import { sanityFetch } from "../lib/client";
import { editorsPickQuery } from "../queries/editorsPick";

import type { Article } from "@/types/article";

export async function getEditorsPick(): Promise<Article[]> {
  return sanityFetch({
    query: editorsPickQuery,
    tags: ["article"],
  });
}