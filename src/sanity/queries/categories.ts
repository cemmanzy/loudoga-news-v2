import { groq } from "next-sanity";

export const categoriesQuery = groq`
*[
  _type == "category"
]
| order(title asc){

  _id,

  title,

  "slug": slug.current

}
`;