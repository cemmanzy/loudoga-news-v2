import { groq } from "next-sanity";

export const breakingQuery = groq`
*[
  _type=="article" &&
  breaking==true
]
| order(publishedAt desc)[0...10]{

  _id,

  title,

  "slug": slug.current

}
`;