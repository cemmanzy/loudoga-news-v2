import Link from "next/link";

interface Props {
  category?: {
    title: string;
    slug: string;
  };

  title: string;
}

export default function Breadcrumbs({
  category,
  title,
}: Props) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8 text-sm text-gray-500"
    >
      <ol className="flex flex-wrap items-center gap-2">

        <li>
          <Link
            href="/"
            className="transition hover:text-[#C8102E]"
          >
            Home
          </Link>
        </li>

        {category && (
          <>
            <li>/</li>

            <li>
              <Link
                href={`/category/${category.slug}`}
                className="transition hover:text-[#C8102E]"
              >
                {category.title}
              </Link>
            </li>
          </>
        )}

        <li>/</li>

        <li className="max-w-md truncate font-semibold text-gray-800">
          {title}
        </li>

      </ol>
    </nav>
  );
}