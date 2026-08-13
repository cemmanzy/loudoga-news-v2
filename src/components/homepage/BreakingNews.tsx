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
    <div className="w-full overflow-hidden border-y bg-[#C8102E] text-white">

      <div className="mx-auto flex min-w-0 max-w-7xl items-center gap-3 px-3 py-3 sm:gap-4 sm:px-4">

        <span className="flex-shrink-0 rounded bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#C8102E] sm:px-3 sm:text-xs">
          Breaking
        </span>

        <div className="min-w-0 flex-1 overflow-hidden">

          <div className="flex min-w-max gap-10 whitespace-nowrap animate-marquee">

            {articles.map((article) => (
              <Link
                key={article._id}
                href={`/article/${article.slug}`}
                className="flex-shrink-0 hover:underline"
              >
                {article.title}
              </Link>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}