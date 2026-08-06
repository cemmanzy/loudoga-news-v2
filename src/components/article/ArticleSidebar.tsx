import Link from "next/link";

import LatestNewsSidebar from "./LatestNewsSidebar";

interface Props {
  mostRead: {
    title: string;
    slug: string;
    views: number;
  }[];

  latest: {
    _id: string;
    title: string;
    slug: string;
    publishedAt: string;
  }[];
}

export default function ArticleSidebar({
  mostRead,
  latest,
}: Props) {
  return (
    <aside className="sticky top-24 space-y-8">

      {/* Most Read */}

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center justify-between">

          <h2 className="border-l-4 border-[#C8102E] pl-3 text-2xl font-bold">
            Most Read
          </h2>

          <span className="rounded-full bg-[#C8102E] px-3 py-1 text-xs font-bold uppercase text-white">
            Today
          </span>

        </div>

        <div className="space-y-5">

          {mostRead.map((article, index) => (

            <Link
              key={article.slug}
              href={`/article/${article.slug}`}
              className="group flex gap-4"
            >

              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#C8102E] text-lg font-black text-white">

                {index + 1}

              </span>

              <div>

                <h3 className="font-bold leading-6 transition group-hover:text-[#C8102E]">

                  {article.title}

                </h3>

                <p className="mt-1 text-xs text-gray-500">

                  {article.views.toLocaleString()} views

                </p>

              </div>

            </Link>

          ))}

        </div>

      </section>

      {/* Latest News */}

      <LatestNewsSidebar articles={latest} />

      {/* Advertisement */}

      <section className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">

        <p className="text-xs uppercase tracking-widest text-gray-400">

          Advertisement

        </p>

        <div className="mt-6 rounded-xl bg-gray-200 py-20 font-semibold text-gray-500">

          300 × 250

        </div>

      </section>

      {/* Newsletter */}

      <section className="rounded-2xl bg-[#111827] p-8 text-center text-white">

        <h3 className="text-2xl font-bold">

          Stay Updated

        </h3>

        <p className="mt-4 text-gray-300">

          Get breaking news delivered to your inbox.

        </p>

        <button className="mt-6 w-full rounded-xl bg-[#C8102E] py-3 font-bold transition hover:bg-[#a90d27]">

          Subscribe

        </button>

      </section>

    </aside>
  );
}