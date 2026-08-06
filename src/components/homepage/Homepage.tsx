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

        <div className="mt-16">

  {sections.map((section, index) => (

    <div
      key={section.slug}
      className={index === 0 ? "" : "mt-20 border-t border-gray-200 pt-16"}
    >

      <CategorySection
        title={section.title}
        href={`/category/${section.slug}`}
        articles={section.articles}
      />

    </div>

  ))}

</div>

<div className="mt-20">

  <TrendingNews articles={trending} />

</div>

      </Container>
    </>
  );
}