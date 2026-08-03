import type { Article } from "@/types/article";

import SectionTitle from "../ui/SectionTitle";
import RelatedArticleCard from "../cards/RelatedArticleCard";

interface Props {
  articles: Article[];
}

export default function TrendingNews({
  articles,
}: Props) {
  if (!articles.length) return null;

  return (
    <section className="mt-20">

      <SectionTitle>

        🔥 Trending News

      </SectionTitle>

      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">

        {articles.map((article) => (

          <div
            key={article._id}
            className="min-w-[350px] max-w-[350px] flex-shrink-0"
          >

            <RelatedArticleCard article={article} />

          </div>

        ))}

      </div>

    </section>
  );
}