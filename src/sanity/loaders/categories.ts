import { client } from "../lib/client";
import { categoriesQuery } from "../queries/categories";

export interface Category {
  _id: string;
  title: string;
  slug: string;
}

export async function getCategories(): Promise<Category[]> {
  return client.fetch(categoriesQuery);
}