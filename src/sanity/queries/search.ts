import { groq } from "next-sanity";

export const searchQuery = groq`
*[
  _type=="article" &&
  (
    title match $search + "*" ||
    excerpt match $search + "*"
  )
]
| order(publishedAt desc)[0...8]{

  _id,

  title,

  "slug": slug.current,

  excerpt,

  publishedAt,

  featuredImage{
    image,
    caption,
    photoCredit,
    alt
  },

  "author": author->{
    name,
    "slug": slug.current
  },

  "categories": categories[]->{
    title,
    "slug": slug.current
  }

}
`;