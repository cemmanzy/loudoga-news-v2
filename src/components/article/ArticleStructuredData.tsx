interface ArticleStructuredDataProps {
  title: string;
  description?: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}

export default function ArticleStructuredData({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName,
}: ArticleStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",

    headline: title,

    description,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },

    ...(image && {
      image: [image],
    }),

    ...(datePublished && {
      datePublished,
    }),

    ...(dateModified && {
      dateModified,
    }),

    ...(authorName && {
      author: {
        "@type": "Person",
        name: authorName,
      },
    }),
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