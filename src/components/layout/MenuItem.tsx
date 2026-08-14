import Link from "next/link";

import MegaMenu from "./MegaMenu";

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

export default function MenuItem({
  title,
  slug,
  articles,
}: Props) {
  return (
    <div className="group relative flex h-12 items-center">

      <Link
        href={`/category/${slug}`}
        className="
          rounded-md
          px-2
          py-1
          transition
          duration-200
          hover:bg-gray-100
          hover:text-[#C8102E]
          dark:hover:bg-gray-800
          dark:hover:text-[#C8102E]
        "
      >
        {title}
      </Link>

      <MegaMenu
        title={title}
        slug={slug}
        articles={articles}
      />

    </div>
  );
}