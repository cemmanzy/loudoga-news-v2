import type { Article } from "@/types/article";

import SectionTitle from "../ui/SectionTitle";
import HorizontalArticleCard from "../cards/HorizontalArticleCard";

interface Props {
  articles: Article[];
}

export default function LatestNews({
  articles,
}: Props) {
  return (
    <section className="w-full">
      <SectionTitle>
        Latest News
      </SectionTitle>

      <div className="grid w-full gap-6">
        {articles.length > 0 ? (
          articles.map((article) => (
            <HorizontalArticleCard
              key={article._id}
              article={article}
            />
          ))
        ) : (
          <div
            className="
              w-full
              rounded-lg
              border
              border-dashed
              border-gray-300
              py-16
              text-center
              dark:border-gray-700
            "
          >
            <h3
              className="
                text-xl
                font-semibold
                text-gray-700
                dark:text-gray-200
              "
            >
              No articles available
            </h3>

            <p
              className="
                mt-2
                text-gray-500
                dark:text-gray-400
              "
            >
              Publish articles in Sanity and they will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}