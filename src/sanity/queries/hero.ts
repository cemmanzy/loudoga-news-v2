import { groq } from "next-sanity";

export const heroQuery = groq`
*[
  _type=="article" &&
  featured==true
]
| order(publishedAt desc)[0]{

  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  featuredImage,

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