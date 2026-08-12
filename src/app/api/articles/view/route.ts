import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const writeClient = createClient({
  projectId:
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:
    process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2026-08-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

export async function POST(request: Request) {
  try {
    const { slug } = await request.json();

    if (
      typeof slug !== "string" ||
      !slug.trim()
    ) {
      return NextResponse.json(
        {
          message: "Article slug is required.",
        },
        {
          status: 400,
        }
      );
    }

    const normalizedSlug = slug.trim();

    const article = await writeClient.fetch<{
      _id: string;
      views?: number;
    }>(
      `*[
        _type == "article" &&
        slug.current == $slug
      ][0]{
        _id,
        views
      }`,
      {
        slug: normalizedSlug,
      }
    );

    if (!article) {
      return NextResponse.json(
        {
          message: "Article not found.",
        },
        {
          status: 404,
        }
      );
    }

    const updatedViews =
      (article.views ?? 0) + 1;

    await writeClient
      .patch(article._id)
      .set({
        views: updatedViews,
      })
      .commit();

    return NextResponse.json({
      success: true,
      views: updatedViews,
    });
  } catch (error) {
    console.error(
      "Article view tracking error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Unable to record article view.",
      },
      {
        status: 500,
      }
    );
  }
}