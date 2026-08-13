import Link from "next/link";

interface Props {
  articles: {
    title: string;
    slug: string;
    views: number;
  }[];
}

export default function MostRead({
  articles,
}: Props) {
  return (
    <aside className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:sticky lg:top-6">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="border-l-4 border-[#C8102E] pl-3 text-2xl font-bold text-gray-900">
          Most Read
        </h2>

        <span className="rounded-full bg-[#C8102E]/10 px-3 py-1 text-xs font-bold uppercase text-[#C8102E]">
  All Time
</span>

      </div>

      <div className="space-y-5">

        {articles.map((article, index) => (

          <Link
            key={article.slug}
            href={`/article/${article.slug}`}
            className="group flex gap-4 rounded-xl border-b border-gray-100 pb-5 transition hover:bg-gray-50 last:border-b-0"
          >

            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#C8102E] text-xl font-black text-white">

              {index + 1}

            </span>

            <div className="flex-1">

              <h3 className="font-bold leading-6 text-gray-900 transition group-hover:text-[#C8102E]">

                {article.title}

              </h3>

              <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">

                <span>
  {article.views.toLocaleString()}{" "}
  {article.views === 1 ? "view" : "views"}
</span>
              </div>

            </div>

          </Link>

        ))}

      </div>

    </aside>
  );
}