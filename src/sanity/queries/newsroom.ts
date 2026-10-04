import { groq } from "next-sanity";

export const newsroomQuery = groq`
  *[_type == "newsroom"]
    | order(order asc, _createdAt asc)
  {
    _id,
    name,
    role,
    photo,
    bio,
    email,
    socialUrl,
    order
  }
`;