import Link from "next/link";

import type { BreakingArticle } from "@/sanity/loaders/breaking";

interface Props {
  articles: BreakingArticle[];
}

export default function BreakingNews({
  articles,
}: Props) {
  if (!articles.length) return null;

  return (
    <section
      aria-label="Breaking news"
      className="w-full overflow-hidden border-y border-[#C8102E] bg-[#C8102E] text-white"
    >
      <div className="mx-auto flex min-w-0 max-w-7xl items-center px-3 sm:px-4">

        {/* Breaking Label */}

        <div className="relative z-20 flex flex-shrink-0 items-center bg-[#C8102E] py-3 pr-5 sm:pr-7">

          <span className="rounded bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#C8102E] sm:px-4 sm:text-xs">
            Breaking
          </span>

        </div>

        {/* Moving News */}

        <div className="relative z-10 min-w-0 flex-1 overflow-hidden">

          <div className="breaking-marquee flex w-max whitespace-nowrap">

            {/* First set */}

            <div className="flex flex-shrink-0 items-center gap-8 pr-8 sm:gap-10 sm:pr-10">
              {articles.map((article) => (
                <Link
                  key={`first-${article._id}`}
                  href={`/article/${article.slug}`}
                  className="flex-shrink-0 text-sm font-medium transition hover:underline sm:text-base"
                >
                  {article.title}
                </Link>
              ))}
            </div>

            {/* Duplicate set for seamless loop */}

            <div
              className="flex flex-shrink-0 items-center gap-10 pr-10"
              aria-hidden="true"
            >
              {articles.map((article) => (
                <Link
                  key={`second-${article._id}`}
                  href={`/article/${article.slug}`}
                  tabIndex={-1}
                  className="flex-shrink-0 text-sm font-medium transition hover:underline sm:text-base"
                >
                  {article.title}
                </Link>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}