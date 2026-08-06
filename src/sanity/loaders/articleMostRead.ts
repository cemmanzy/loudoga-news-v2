import { client } from "../lib/client";
import { mostReadQuery } from "../queries/mostRead";

export async function getArticleMostRead() {
  return client.fetch(mostReadQuery);
}