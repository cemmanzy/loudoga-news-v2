import { client } from "../lib/client";
import { sidebarLatestQuery } from "../queries/sidebarLatest";

export async function getSidebarLatest() {
  return client.fetch(sidebarLatestQuery);
}