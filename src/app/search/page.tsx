import Homepage from "@/components/search/SearchPage";

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
    <Homepage
      query={q}
    />
  );
}