import { groq } from "next-sanity";

export const latestQuery = groq`
*[
  _type == "article"
]
| order(publishedAt desc)[0...6]{

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