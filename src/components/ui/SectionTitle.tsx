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
    <div className="mb-8 flex items-center justify-between">

      <h2 className="border-l-4 border-[#C8102E] pl-3 text-3xl font-bold text-gray-900">
        {children}
      </h2>

      {href && (
        <Link
          href={href}
          className="text-sm font-semibold text-[#C8102E] transition hover:underline"
        >
          View All →
        </Link>
      )}

    </div>
  );
}