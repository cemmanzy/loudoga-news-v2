import { client } from "../lib/client";
import { activeSubscribersQuery } from "../queries/subscribers";

export interface NewsletterSubscriber {
  _id: string;
  email: string;
  unsubscribeToken: string;
}

export async function getActiveSubscribers(): Promise<
  NewsletterSubscriber[]
> {
  return client.fetch(activeSubscribersQuery);
}