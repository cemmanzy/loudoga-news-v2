import Container from "../ui/Container";

import HorizontalArticleCard from "../cards/HorizontalArticleCard";

import { getSearchResults } from "@/sanity/loaders/searchPage";

interface Props {
  query: string;
}

export default async function SearchPage({
  query,
}: Props) {
  const articles = await getSearchResults(query);

  return (
    <Container className="py-16">

      <h1 className="text-5xl font-black">
        Search Results
      </h1>

      <p className="mt-4 text-gray-600">
        {articles.length} article{articles.length !== 1 ? "s" : ""} found for

        <span className="ml-2 font-bold">
          "{query}"
        </span>
      </p>

      <div className="mt-12 space-y-6">

        {articles.length ? (

          articles.map((article) => (

            <HorizontalArticleCard
              key={article._id}
              article={article}
            />

          ))

        ) : (

          <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">

            No articles found.

          </div>

        )}

      </div>

    </Container>
  );
}