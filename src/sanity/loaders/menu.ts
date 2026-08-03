import { client } from "../lib/client";
import { menuQuery } from "../queries/menu";

export interface MenuCategory {
  _id: string;
  title: string;
  slug: string;

  articles: {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    publishedAt: string;

    featuredImage?: {
      image: any;
      alt?: string;
    };

    author?: {
      name: string;
    };
  }[];
}

export async function getMenu(): Promise<MenuCategory[]> {
  return client.fetch(menuQuery);
}