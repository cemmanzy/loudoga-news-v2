import type { Article } from "@/types/article";

import SectionTitle from "../ui/SectionTitle";
import RelatedArticleCard from "../cards/RelatedArticleCard";

interface Props {
  articles: Article[];
}

export default function RelatedArticles({
  articles,
}: Props) {
  if (!articles.length) return null;

  return (
    <section className="mt-20 border-t pt-12">

      <SectionTitle>
        Related Articles
      </SectionTitle>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

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