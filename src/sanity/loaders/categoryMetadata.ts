import { client } from "../lib/client";
import { categoryMetadataQuery } from "../queries/categoryMetadata";

export interface CategoryMetadata {
  title: string;
  slug: string;
}

export async function getCategoryMetadata(
  slug: string
): Promise<CategoryMetadata | null> {
  return client.fetch(categoryMetadataQuery, {
    slug,
  });
}