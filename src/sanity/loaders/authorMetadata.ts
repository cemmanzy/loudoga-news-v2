import { client } from "../lib/client";
import { authorMetadataQuery } from "../queries/authorMetadata";

export interface AuthorMetadata {
  name: string;
  slug: string;
}

export async function getAuthorMetadata(
  slug: string
): Promise<AuthorMetadata | null> {
  return client.fetch(authorMetadataQuery, {
    slug,
  });
}