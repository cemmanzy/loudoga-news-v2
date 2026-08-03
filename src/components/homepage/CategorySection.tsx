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

  return (
    <section className="mt-16">

      <SectionTitle href={href}>
        {title}
      </SectionTitle>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        {articles.map((article) => (

          <Link
            key={article._id}
            href={`/article/${article.slug}`}
            className="group"
          >

            {article.featuredImage?.image && (
              <img
                src={urlFor(article.featuredImage.image).width(600).url()}
                alt={article.featuredImage.alt || article.title}
                className="h-52 w-full rounded-xl object-cover"
              />
            )}

            <h3 className="mt-4 text-lg font-bold leading-7 transition group-hover:text-[#C8102E]">

              {article.title}

            </h3>

            <p className="mt-3 line-clamp-3 text-gray-600">

              {article.excerpt}

            </p>

          </Link>

        ))}

      </div>

    </section>
  );
}