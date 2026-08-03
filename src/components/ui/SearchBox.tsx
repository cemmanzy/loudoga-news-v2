"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

import { urlFor } from "@/sanity/lib/image";

interface SearchResult {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;

  featuredImage?: {
    image: any;
  };

  categories?: {
    title: string;
    slug: string;
  }[];
}

export default function SearchBox() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`
        );

        const data = await res.json();

        setResults(data);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative hidden lg:block w-[420px]">

      <div className="flex items-center rounded-full border border-gray-300 bg-white px-4 py-3">

        <FaSearch className="text-gray-500" />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && query.trim()) {
              router.push(
                `/search?q=${encodeURIComponent(query)}`
              );

              setResults([]);
            }
          }}
          placeholder="Search news..."
          className="ml-3 w-full bg-transparent outline-none"
        />

      </div>

      {loading && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border bg-white p-4 text-center text-sm text-gray-500 shadow-xl">
          Searching...
        </div>
      )}

      {!loading &&
        query.trim().length >= 2 &&
        results.length === 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border bg-white p-4 text-center text-sm text-gray-500 shadow-xl">
            No articles found.
          </div>
        )}

      {!loading && results.length > 0 && (

        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[500px] overflow-y-auto rounded-xl border bg-white shadow-2xl">

          {results.map((article) => (

            <Link
              key={article._id}
              href={`/article/${article.slug}`}
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
              className="flex items-start gap-4 border-b p-4 transition hover:bg-gray-50 last:border-b-0"
            >

              {article.featuredImage?.image && (

                <img
                  src={urlFor(article.featuredImage.image).width(200).url()}
                  alt={article.title}
                  className="h-20 w-24 flex-shrink-0 rounded-lg object-cover"
                />

              )}

              <div className="flex flex-1 flex-col justify-center min-w-0">

                {article.categories?.[0] && (

                  <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[#C8102E]">
                    {article.categories[0].title}
                  </p>

                )}

                <h3 className="line-clamp-2 font-semibold text-gray-900">
                  {article.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                  {article.excerpt}
                </p>

              </div>

            </Link>

          ))}

        </div>

      )}

    </div>
  );
}