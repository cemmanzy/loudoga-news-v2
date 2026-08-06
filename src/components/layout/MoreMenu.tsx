import Link from "next/link";

interface Props {
  categories: {
    _id: string;
    title: string;
    slug: string;
  }[];
}

export default function MoreMenu({
  categories,
}: Props) {
  return (
    <div className="group relative overflow-visible">
      <button className="font-semibold transition hover:text-[#C8102E]">

        More ▾

      </button>

      <div className="absolute right-0 top-full z-[99999] mt-2 w-72 rounded-xl border border-gray-200 bg-white py-3 shadow-2xl opacity-0 invisible transition-all duration-200 group-hover:visible group-hover:opacity-100">

        {categories.map((category) => (

          <Link
            key={category._id}
            href={`/category/${category.slug}`}
            className="block rounded-lg px-3 py-2 transition hover:bg-gray-100 hover:text-[#C8102E]"
          >

            {category.title}

          </Link>

        ))}

      </div>

    </div>
  );
}