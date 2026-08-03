import Hero from "./Hero";
import BreakingNews from "./BreakingNews";
import LatestNews from "./LatestNews";
import TrendingNews from "./TrendingNews";
import MostRead from "./MostRead";
import CategorySection from "./CategorySection";

import Container from "../ui/Container";

import type { Article } from "@/types/article";
import type { BreakingArticle } from "@/sanity/loaders/breaking";

interface Props {
  hero: Article | null;

  breaking: BreakingArticle[];

  latest: Article[];

  trending: Article[];

  mostRead: {
    title: string;
    slug: string;
    views: number;
  }[];

  sections: {
    title: string;
    slug: string;
    articles: Article[];
  }[];
}

export default function Homepage({
  hero,
  breaking,
  latest,
  trending,
  mostRead,
  sections,
}: Props) {
  return (
    <>
      <BreakingNews articles={breaking} />

      {hero && <Hero article={hero} />}

      <Container className="my-16">

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">

          <LatestNews articles={latest} />

          <MostRead articles={mostRead} />

        </div>

        <TrendingNews articles={trending} />

        {sections.map((section) => (
          <CategorySection
            key={section.slug}
            title={section.title}
            href={`/category/${section.slug}`}
            articles={section.articles}
          />
        ))}

      </Container>
    </>
  );
}