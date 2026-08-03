import type { Article } from "@/types/article";

import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import HorizontalArticleCard from "../cards/HorizontalArticleCard";

interface Props {
  articles: Article[];
}

export default function LatestNews({
  articles,
}: Props) {
  return (
    <Container className="my-16">

      <SectionTitle>
        Latest News
      </SectionTitle>

      <div className="grid gap-6">

        {articles.length > 0 ? (
          articles.map((article) => (
            <HorizontalArticleCard
              key={article._id}
              article={article}
            />
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-gray-300 py-16 text-center">

            <h3 className="text-xl font-semibold text-gray-700">
              No articles available
            </h3>

            <p className="mt-2 text-gray-500">
              Publish articles in Sanity and they will appear here.
            </p>

          </div>
        )}

      </div>

    </Container>
  );
}