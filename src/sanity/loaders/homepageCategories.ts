import { getCategories } from "./categories";
import { getCategory } from "./category";

export async function getHomepageCategories() {
  const categories = await getCategories();

  const sections = await Promise.all(
    categories.map(async (category) => ({
      title: category.title,
      slug: category.slug,
      articles: await getCategory(category.title),
    }))
  );

  return sections.filter(
    (section) => section.articles.length > 0
  );
}