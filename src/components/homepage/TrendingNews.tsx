import type { Article } from "@/types/article";

import SectionTitle from "../ui/SectionTitle";
import RelatedArticleCard from "../cards/RelatedArticleCard";

interface Props {
  articles: Article[];
}

export default function TrendingNews({ articles }: Props) {
  if (!articles.length) return null;

  return (
    <section className="w-full">
      <SectionTitle>
        🔥 Trending News
      </SectionTitle>

      <div className="flex w-full gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {articles.map((article) => (
          <div
            key={article._id}
            className="min-w-[280px] max-w-[280px] flex-shrink-0 sm:min-w-[350px] sm:max-w-[350px]"
          >
            <RelatedArticleCard article={article} />
          </div>
        ))}
      </div>
    </section>
  );
}