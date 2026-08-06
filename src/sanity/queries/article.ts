import { groq } from "next-sanity";

export const articleQuery = groq`
*[
  _type=="article" &&
  slug.current==$slug
][0]{

  _id,

  title,

  "slug": slug.current,

  excerpt,

  body,

  publishedAt,

  featured,

  breaking,

  featuredImage,

  "imageUrl": featuredImage.image.asset->url,

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