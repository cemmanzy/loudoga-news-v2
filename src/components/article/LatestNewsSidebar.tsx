import Link from "next/link";

interface Props {
  articles: {
    _id: string;
    title: string;
    slug: string;
    publishedAt: string;
  }[];
}

export default function LatestNewsSidebar({
  articles,
}: Props) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="mb-5 flex items-center justify-between">

        <h2 className="border-l-4 border-[#C8102E] pl-3 text-2xl font-bold">
          Latest News
        </h2>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold uppercase text-gray-700">
          Live
        </span>

      </div>

      <div className="space-y-5">

        {articles.map((article) => (

          <Link
            key={article._id}
            href={`/article/${article.slug}`}
            className="group block border-b border-gray-100 pb-4 last:border-b-0"
          >

            <h3 className="font-semibold leading-6 transition group-hover:text-[#C8102E]">

              {article.title}

            </h3>

            <p className="mt-2 text-xs text-gray-500">

              {new Date(article.publishedAt).toLocaleDateString(
                "en-US",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              )}

            </p>

          </Link>

        ))}

      </div>

    </section>
  );
}