import type { Metadata } from "next";

import SearchPage from "@/components/search/SearchPage";

export const metadata: Metadata = {
  title: "Search",
  robots: {
    index: false,
    follow: true,
  },
};

interface Props {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function Search({
  searchParams,
}: Props) {
  const { q = "" } = await searchParams;

  return (
    <SearchPage
      query={q}
    />
  );
}