import { NextResponse } from "next/server";

import { client } from "@/sanity/lib/client";

import type { QueryParams } from "@sanity/client";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        {
          message: "A valid unsubscribe token is required.",
        },
        {
          status: 400,
        }
      );
    }

    const normalizedToken = token.trim();

    const writeClient = client.withConfig({
      token: process.env.SANITY_API_WRITE_TOKEN,
      useCdn: false,
    });

  const subscriber = await writeClient.fetch<
  {
    _id: string;
    status: string;
  } | null
>(
  `*[
    _type == "subscriber" &&
    unsubscribeToken == $token
  ][0]{
    _id,
    status
  }` as string,
  {
  token: normalizedToken,
} as unknown as QueryParams
);

    if (!subscriber) {
      return NextResponse.json(
        {
          message: "This unsubscribe link is invalid or has expired.",
        },
        {
          status: 404,
        }
      );
    }

    if (subscriber.status === "unsubscribed") {
      return NextResponse.json({
        success: true,
        message: "You have already been unsubscribed.",
      });
    }

    await writeClient
      .patch(subscriber._id)
      .set({
        status: "unsubscribed",
      })
      .commit();

    return NextResponse.json({
      success: true,
      message:
        "You have successfully unsubscribed from Loudoga News.",
    });
  } catch (error) {
    console.error("Newsletter unsubscribe error:", error);

    return NextResponse.json(
      {
        message:
          "Unable to unsubscribe at this time. Please try again later.",
      },
      {
        status: 500,
      }
    );
  }
}