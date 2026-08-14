import Link from "next/link";

interface Props {
  children: React.ReactNode;
  href?: string;
}

export default function SectionTitle({
  children,
  href,
}: Props) {
  return (
    <div
      className="
        mb-8
        flex
        items-center
        justify-between
        border-b
        border-gray-200
        pb-4
        dark:border-gray-700
      "
    >

      {/* Section Heading */}

      <div className="flex items-center gap-3">

        {/* Red Indicator */}

        <div
          className="
            h-8
            w-1.5
            rounded-full
            bg-[#C8102E]
          "
        />

        {/* Title */}

        <h2
          className="
            text-3xl
            font-extrabold
            tracking-tight
            text-gray-900
            dark:text-white
          "
        >
          {children}
        </h2>

      </div>

      {/* View All */}

      {href && (
        <Link
          href={href}
          className="
            group
            flex
            items-center
            gap-2
            text-sm
            font-bold
            uppercase
            tracking-wide
            text-[#C8102E]
            transition
            hover:gap-3
          "
        >
          View All

          <span
            className="
              transition
              group-hover:translate-x-1
            "
          >
            →
          </span>

        </Link>
      )}

    </div>
  );
}