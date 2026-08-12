import { getHero } from "./hero";
import { getLatest } from "./latest";
import { getMostRead } from "./mostRead";
import { getHomepageCategories } from "./homepageCategories";
import { getBreaking } from "./breaking";
import { getTrending } from "./trending";
import { getFeatured } from "./featured";
import { getEditorsPick } from "./editorsPick";
import { getExclusive } from "./exclusive";

export async function getHomepage() {
  const [
    hero,
    latest,
    mostRead,
    sections,
    breaking,
    trending,
    featured,
    editorsPick,
    exclusive,
  ] = await Promise.all([
    getHero(),
    getLatest(),
    getMostRead(),
    getHomepageCategories(),
    getBreaking(),
    getTrending(),
    getFeatured(),
    getEditorsPick(),
    getExclusive(),
  ]);

  return {
    hero,
    latest,
    mostRead,
    sections,
    breaking,
    trending,
    featured,
    editorsPick,
    exclusive,
  };
}