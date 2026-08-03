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