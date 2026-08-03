import { groq } from "next-sanity";

export const menuQuery = groq`
*[_type=="category"]{

  _id,

  title,

  "slug": slug.current,

  "articles": *[
    _type=="article" &&
    references(^._id)
  ]
  | order(publishedAt desc)[0...4]{

    _id,

    title,

    excerpt,

    publishedAt,

    "slug": slug.current,

    featuredImage{
      image,
      alt
    },

    "author": author->{
      name
    }

  }

}
`;