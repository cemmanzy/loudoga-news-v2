import { sanityFetch } from "../lib/client";
import { newsroomQuery } from "../queries/newsroom";

export interface NewsroomMember {
  _id: string;
  name: string;
  role: string;
  photo?: any;
  bio?: string;
  email?: string;
  socialUrl?: string;
  order?: number;
}

export async function getNewsroom(): Promise<NewsroomMember[]> {
  return sanityFetch({
    query: newsroomQuery,
    revalidate: 60,
  });
}