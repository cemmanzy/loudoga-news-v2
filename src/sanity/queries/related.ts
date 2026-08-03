import { groq } from "next-sanity";

export const relatedQuery = groq`
*[
  _type == "article" &&
  slug.current != $slug &&
  $category in categories[]->title
]
| order(publishedAt desc)[0...3]{

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