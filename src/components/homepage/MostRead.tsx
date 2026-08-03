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
    <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 border-l-4 border-[#C8102E] pl-3 text-2xl font-bold text-gray-900">
        Most Read
      </h2>

      <div className="space-y-6">

        {articles.map((article, index) => (

          <Link
            key={article.slug}
            href={`/article/${article.slug}`}
            className="group flex gap-4 rounded-lg p-2 transition hover:bg-gray-50"
          >

            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C99700] text-lg font-black text-white">

              {index + 1}

            </span>

            <div className="flex-1">

              <h3 className="font-semibold leading-6 text-gray-900 transition group-hover:text-[#C8102E]">

                {article.title}

              </h3>

              <p className="mt-2 text-xs text-gray-500">

                {article.views.toLocaleString()} views

              </p>

            </div>

          </Link>

        ))}

      </div>

    </aside>
  );
}