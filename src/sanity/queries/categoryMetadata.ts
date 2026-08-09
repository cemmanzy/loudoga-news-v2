import { groq } from "next-sanity";

export const categoryMetadataQuery = groq`
*[
  _type == "category" &&
  slug.current == $slug
][0]{
  title,
  "slug": slug.current
}
`;