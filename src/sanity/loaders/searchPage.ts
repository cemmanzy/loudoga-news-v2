import { searchArticles } from "./search";

export async function getSearchResults(query: string) {
  if (!query.trim()) {
    return [];
  }

  return searchArticles(query);
}