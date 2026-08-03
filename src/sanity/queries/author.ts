import { groq } from "next-sanity";

export const authorQuery = groq`
*[
  _type=="author" &&
  slug.current==$slug
][0]{

  _id,

  name,

  slug,

  photo,

  position,

  bio,

  socialLinks,

  "articles": *[
    _type=="article" &&
    author._ref==^._id
  ]
  | order(publishedAt desc){

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

    "categories": categories[]->{
      title,
      "slug": slug.current
    }

  }

}
`;