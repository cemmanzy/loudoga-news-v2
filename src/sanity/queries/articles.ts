import { groq } from "next-sanity";

export const articlesQuery = groq`
*[_type=="article"]
| order(publishedAt desc){

  _id,

  title,

  "slug": slug.current,

  excerpt,

  publishedAt,

  featured,

  breaking,

  featuredImage,

  "author": author->{
    name
  },

  "categories": categories[]->{
    title,
    "slug": slug.current
  }

}
`;

export const recentArticlesForNewsletterQuery = groq`
  *[
    _type == "article" &&
    defined(slug.current) &&
    defined(publishedAt)
  ]
  | order(publishedAt desc)[0...5]{
    _id,
    title,
    excerpt,
    "slug": slug.current,
    publishedAt,
    "categories": categories[]->{
      title
    }
  }
`;