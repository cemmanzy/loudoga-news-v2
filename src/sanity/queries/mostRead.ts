import { groq } from "next-sanity";

export const mostReadQuery = groq`
*[_type=="article"]
| order(views desc)[0...5]{

  _id,
  title,
  "slug": slug.current,
  views
}
`;