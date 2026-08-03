import { groq } from "next-sanity";

export const categoryQuery = groq`
*[
  _type == "article" &&
  $category in categories[]->title
]
| order(publishedAt desc)[0...4]{

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