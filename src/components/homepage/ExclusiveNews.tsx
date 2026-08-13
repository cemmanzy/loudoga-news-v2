import type { Article } from "@/types/article";

import SectionTitle from "../ui/SectionTitle";
import RelatedArticleCard from "../cards/RelatedArticleCard";

interface Props {
  articles: Article[];
}

export default function ExclusiveNews({
  articles,
}: Props) {
  if (!articles.length) return null;

  return (
    <section>
      <SectionTitle>
        Exclusive
      </SectionTitle>

      <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <RelatedArticleCard
            key={article._id}
            article={article}
          />
        ))}
      </div>
    </section>
  );
}