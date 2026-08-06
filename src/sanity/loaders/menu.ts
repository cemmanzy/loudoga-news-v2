import { client } from "../lib/client";
import { menuQuery } from "../queries/menu";

import type { MenuCategory } from "@/types/menu";

export async function getMenu(): Promise<MenuCategory[]> {
  return client.fetch(menuQuery);
}