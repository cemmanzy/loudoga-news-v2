import { groq } from "next-sanity";

export const authorMetadataQuery = groq`
*[
  _type == "author" &&
  slug.current == $slug
][0]{
  name,
  "slug": slug.current
}
`;