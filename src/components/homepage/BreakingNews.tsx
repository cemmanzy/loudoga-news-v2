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
    <div className="border-y bg-[#C8102E] text-white">

      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">

        <span className="rounded bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#C8102E]">

          Breaking

        </span>

        <div className="flex-1 overflow-hidden">

          <div className="flex gap-10 whitespace-nowrap animate-marquee">

            {articles.map((article) => (
              <Link
                key={article._id}
                href={`/article/${article.slug}`}
                className="hover:underline"
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