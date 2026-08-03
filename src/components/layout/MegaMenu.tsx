import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";

interface Props {
  title: string;
  slug: string;

  articles: {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    publishedAt: string;

    featuredImage?: {
      image: any;
      alt?: string;
    };

    author?: {
      name: string;
    };
  }[];
}

export default function MegaMenu({
  title,
  slug,
  articles,
}: Props) {
  if (!articles.length) return null;

  const featured = articles[0];
  const others = articles.slice(1);

  return (
    <div className="absolute left-0 top-full z-[9999] mt-1 w-[700px] rounded-2xl border border-gray-200 bg-white/95 p-6 opacity-0 shadow-[0_25px_70px_rgba(0,0,0,0.15)] backdrop-blur-sm transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 translate-y-4 pointer-events-none group-hover:pointer-events-auto">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between border-b pb-4">

        <h3 className="text-lg font-bold uppercase text-[#C8102E]">
          {title}
        </h3>

        <Link
          href={`/category/${slug}`}
          className="text-sm font-semibold text-[#C8102E] hover:underline"
        >
          View All →
        </Link>

      </div>

      <div className="grid grid-cols-[1.4fr_1fr] gap-8">

        {/* Featured Story */}

        <div>

          {featured.featuredImage?.image && (

            <img
              src={urlFor(featured.featuredImage.image).width(800).url()}
              alt={featured.featuredImage.alt ?? featured.title}
              className="mb-4 h-44 w-full rounded-xl object-cover"
            />

          )}

          <Link href={`/article/${featured.slug}`}>

            <h4 className="text-2xl font-bold leading-tight transition duration-200 hover:text-[#C8102E]">
              {featured.title}

            </h4>

          </Link>

          <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">

            {featured.author?.name && (

              <>
                <span>{featured.author.name}</span>
                <span>•</span>
              </>

            )}

            <time>

              {new Date(featured.publishedAt).toLocaleDateString()}

            </time>

          </div>

          <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">

            {featured.excerpt}

          </p>

        </div>

        {/* Other Stories */}

        <div className="space-y-5">

          {others.map((article) => (

            <Link
              key={article._id}
              href={`/article/${article.slug}`}
              className="flex gap-3 rounded-lg border-b border-gray-100 p-2 transition duration-200 hover:bg-gray-50 last:border-b-0"
            >

              {article.featuredImage?.image && (

                <img
                  src={urlFor(article.featuredImage.image).width(150).url()}
                  alt={article.featuredImage.alt ?? article.title}
                  className="h-16 w-20 rounded-lg object-cover"
                />

              )}

              <div className="flex-1">

                <h5 className="font-semibold leading-5 transition duration-200 group-hover:text-[#C8102E]">

                  {article.title}

                </h5>

                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">

                  {article.author?.name && (

                    <>
                      <span>{article.author.name}</span>
                      <span>•</span>
                    </>

                  )}

                  <span>

                    {new Date(article.publishedAt).toLocaleDateString()}

                  </span>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </div>
  );
}