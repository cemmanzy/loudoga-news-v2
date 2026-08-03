import { getHero } from "./hero";
import { getLatest } from "./latest";
import { getMostRead } from "./mostRead";
import { getHomepageCategories } from "./homepageCategories";
import { getBreaking } from "./breaking";
import { getTrending } from "./trending";

export async function getHomepage() {
  const [
    hero,
    latest,
    mostRead,
    sections,
    breaking,
    trending,
  ] = await Promise.all([
    getHero(),
    getLatest(),
    getMostRead(),
    getHomepageCategories(),
    getBreaking(),
    getTrending(),
  ]);

  return {
    hero,
    latest,
    mostRead,
    sections,
    breaking,
    trending,
  };
}