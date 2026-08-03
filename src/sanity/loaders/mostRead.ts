import { client } from "../lib/client";
import { mostReadQuery } from "../queries/mostRead";

export async function getMostRead() {
  return client.fetch(mostReadQuery);
}