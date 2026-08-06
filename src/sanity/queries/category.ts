import { groq } from "next-sanity";

export const categoryQuery = groq`
*[
  _type == "article" &&
  $slug in categories[]->slug.current
]
| order(publishedAt desc){

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
    name
  },

  "categories": categories[]->{
    title,
    "slug": slug.current
  }

}
`;