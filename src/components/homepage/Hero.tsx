import type { Article } from "@/types/article";

import HeroCarousel from "./HeroCarousel";

interface Props {
  articles: Article[];
}

export default function Hero({
  articles,
}: Props) {
  if (!articles.length) return null;

  return (
    <section
      id="hero-section"
      className="mb-16"
    >
      <HeroCarousel articles={articles} />
    </section>
  );
}