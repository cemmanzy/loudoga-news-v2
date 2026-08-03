import type { Article } from "@/types/article";

import HeroArticleCard from "../cards/HeroArticleCard";

interface Props {
  article: Article;
}

export default function Hero({
  article,
}: Props) {
  return (
    <section className="mb-16">

      <HeroArticleCard article={article} />

    </section>
  );
}