import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  _type?: string;
};

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;

    if (!secret) {
      return NextResponse.json(
        {
          message:
            "Missing environment variable SANITY_REVALIDATE_SECRET",
        },
        {
          status: 500,
        }
      );
    }

    const { isValidSignature, body } =
      await parseBody<WebhookPayload>(
        req,
        secret,
        true
      );

    if (!isValidSignature) {
      return NextResponse.json(
        {
          message: "Invalid webhook signature",
        },
        {
          status: 401,
        }
      );
    }

    if (!body?._type) {
      return NextResponse.json(
        {
          message: "Webhook payload is missing _type.",
        },
        {
          status: 400,
        }
      );
    }

    if (body._type === "article") {
      revalidateTag("article", "max");
    }

    return NextResponse.json({
      success: true,
      revalidated: body._type === "article",
      type: body._type,
    });
  } catch (error) {
    console.error(
      "Sanity webhook revalidation error:",
      error
    );

    return NextResponse.json(
      {
        message: "Unable to revalidate content.",
      },
      {
        status: 500,
      }
    );
  }
}