import { sanityFetch } from "../lib/client";
import { mostReadQuery } from "../queries/mostRead";

export async function getMostRead() {
  return sanityFetch({
    query: mostReadQuery,
    tags: ["article"],
  });
}