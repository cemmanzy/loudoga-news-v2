import Hero from "./Hero";
import BreakingNews from "./BreakingNews";
import LatestNews from "./LatestNews";
import TrendingNews from "./TrendingNews";
import FeaturedNews from "./FeaturedNews";
import EditorsPick from "./EditorsPick";
import ExclusiveNews from "./ExclusiveNews";
import MostRead from "./MostRead";
import CategorySection from "./CategorySection";

import Container from "../ui/Container";

import type { Article } from "@/types/article";
import type { BreakingArticle } from "@/sanity/loaders/breaking";


interface Props {
  hero: Article[];

  breaking: BreakingArticle[];

  latest: Article[];

  trending: Article[];

  featured: Article[];

  editorsPick: Article[];

  exclusive: Article[];

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
  featured,
  editorsPick,
  exclusive,
  mostRead,
  sections,
}: Props) {
  return (
    <>
      {hero.length > 0 && <Hero articles={hero} />}

    {breaking.length > 0 && (
      <BreakingNews articles={breaking} />
    )}

    <Container className="my-16">
      <div className="grid min-w-0 grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]">
        <LatestNews articles={latest} />

        <MostRead articles={mostRead} />
      </div>

      <section className="mt-16">
        <TrendingNews articles={trending} />
      </section>

      <section className="mt-20 border-t border-gray-200 pt-16">
  <EditorsPick articles={editorsPick} />
</section>

<section className="mt-20 border-t border-gray-200 pt-16">
  <ExclusiveNews articles={exclusive} />
</section>

      <section className="mt-20 border-t border-gray-200 pt-16">
        <FeaturedNews articles={featured} />
      </section>

      <div className="mt-16">
        {sections.map((section, index) => (
          <div
            key={section.slug}
            className={
              index === 0
                ? ""
                : "mt-20 border-t border-gray-200 pt-16"
            }
          >
            <CategorySection
              title={section.title}
              href={`/category/${section.slug}`}
              articles={section.articles}
            />
          </div>
        ))}
      </div>
    </Container>
    </>
  );
}