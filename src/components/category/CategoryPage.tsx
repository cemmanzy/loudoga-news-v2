import Link from "next/link";

import type { Article } from "@/types/article";
import { urlFor } from "@/sanity/lib/image";

import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import HorizontalArticleCard from "../cards/HorizontalArticleCard";

interface Props {
  title: string;
  articles: Article[];
}

export default function CategoryPage({
  title,
  articles,
}: Props) {
  if (!articles.length) return null;

  const featured = articles[0];
  const remaining = articles.slice(1);

  return (
    <Container className="my-16">

      <SectionTitle>
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </SectionTitle>

      {/* Featured Story */}

      <Link
        href={`/article/${featured.slug}`}
        className="group mb-14 block"
      >

        {featured.featuredImage?.image && (
          <img
            src={urlFor(featured.featuredImage.image).width(1400).url()}
            alt={featured.featuredImage.alt || featured.title}
            className="h-[500px] w-full rounded-2xl object-cover"
          />
        )}

        <h1 className="mt-6 text-4xl font-black leading-tight transition group-hover:text-[#C8102E]">

          {featured.title}

        </h1>

        <p className="mt-5 max-w-4xl text-xl leading-9 text-gray-600">

          {featured.excerpt}

        </p>

        <div className="mt-6 flex items-center gap-3 text-sm text-gray-500">

          <span className="font-semibold">

            {featured.author?.name}

          </span>

          <span>•</span>

          <span>

            {new Date(featured.publishedAt).toLocaleDateString(
              "en-US",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}

          </span>

        </div>

      </Link>

      {/* Other Articles */}

      <div className="space-y-8">

        {remaining.map((article) => (

          <HorizontalArticleCard
            key={article._id}
            article={article}
          />

        ))}

      </div>

    </Container>
  );
}