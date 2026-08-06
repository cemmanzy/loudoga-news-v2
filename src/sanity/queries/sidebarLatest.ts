import { groq } from "next-sanity";

export const sidebarLatestQuery = groq`
*[
  _type=="article"
]
| order(publishedAt desc)[0...5]{

  _id,
  title,
  "slug": slug.current,
  publishedAt

}
`;