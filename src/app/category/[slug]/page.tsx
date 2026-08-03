import { notFound } from "next/navigation";

import { getCategory } from "@/sanity/loaders/category";

import CategoryPage from "@/components/category/CategoryPage";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({
  params,
}: Props) {
  const { slug } = await params;

  const articles = await getCategory(
    slug.charAt(0).toUpperCase() + slug.slice(1)
  );

  if (!articles.length) {
    notFound();
  }

  return (
    <CategoryPage
      title={slug}
      articles={articles}
    />
  );
}