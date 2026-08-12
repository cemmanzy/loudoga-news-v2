import { groq } from "next-sanity";

export const activeSubscribersQuery = groq`
  *[
    _type == "subscriber" &&
    status == "active"
  ]{
    _id,
    email,
    unsubscribeToken
  }
`;