interface BreadcrumbStructuredDataProps {
  categoryTitle?: string;
  categorySlug?: string;
  articleTitle: string;
  articleUrl: string;
  siteUrl: string;
}

export default function BreadcrumbStructuredData({
  categoryTitle,
  categorySlug,
  articleTitle,
  articleUrl,
  siteUrl,
}: BreadcrumbStructuredDataProps) {
  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },
  ];

  if (categoryTitle && categorySlug) {
    itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: categoryTitle,
      item: `${siteUrl}/category/${categorySlug}`,
    });
  }

  itemListElement.push({
    "@type": "ListItem",
    position: itemListElement.length + 1,
    name: articleTitle,
    item: articleUrl,
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}