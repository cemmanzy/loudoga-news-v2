import Link from "next/link";

import type { Article } from "@/types/article";
import { urlFor } from "@/sanity/lib/image";

import SectionTitle from "../ui/SectionTitle";

interface Props {
  title: string;
  href: string;
  articles: Article[];
}

export default function CategorySection({
  title,
  href,
  articles,
}: Props) {
  if (!articles.length) return null;

  const featured = articles[0];
  const others = articles.slice(1, 7);

  return (
    <section>
      <SectionTitle href={href}>
        {title}
      </SectionTitle>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.35fr_1fr]">

        {/* Featured Story */}

        <Link
          href={`/article/${featured.slug}`}
          className="group"
        >
          {featured.featuredImage?.image && (
            <img
              src={urlFor(featured.featuredImage.image).width(1000).url()}
              alt={featured.featuredImage.alt || featured.title}
              className="h-80 w-full rounded-2xl object-cover transition duration-300 group-hover:scale-[1.02]"
            />
          )}

          <h2 className="mt-5 text-3xl font-extrabold leading-tight transition group-hover:text-[#C8102E]">
            {featured.title}
          </h2>

          <p className="mt-4 line-clamp-3 text-gray-600 leading-7">
            {featured.excerpt}
          </p>

          <div className="mt-5 flex items-center gap-3 text-sm text-gray-500">

            {featured.author?.name && (
              <>
                <span className="font-semibold">
                  {featured.author.name}
                </span>

                <span>•</span>
              </>
            )}

            <span>
              {new Date(featured.publishedAt).toLocaleDateString(
                "en-US",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              )}
            </span>

          </div>

        </Link>

        {/* Supporting Stories */}

        <div className="space-y-5">

          {others.map((article) => (

            <Link
              key={article._id}
              href={`/article/${article.slug}`}
              className="group flex gap-4 border-b border-gray-200 pb-5 last:border-b-0"
            >

              {article.featuredImage?.image && (
                <img
                  src={urlFor(article.featuredImage.image).width(300).url()}
                  alt={article.featuredImage.alt || article.title}
                  className="h-24 w-32 flex-shrink-0 rounded-xl object-cover"
                />
              )}

              <div className="flex-1">

                <h3 className="font-bold leading-6 transition group-hover:text-[#C8102E]">

                  {article.title}

                </h3>

                <div className="mt-2 text-xs text-gray-500">

                  {article.author?.name && (
                    <span className="font-semibold">
                      {article.author.name}
                    </span>
                  )}

                  {article.author?.name && (
                    <span className="mx-2">•</span>
                  )}

                  <span>
                    {new Date(article.publishedAt).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "short",
                      }
                    )}
                  </span>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}