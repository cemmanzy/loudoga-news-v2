import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";

import { resend } from "@/lib/resend";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2026-08-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const normalizedEmail =
      typeof email === "string"
        ? email.trim().toLowerCase()
        : "";

    if (!normalizedEmail) {
      return NextResponse.json(
        {
          message: "Please enter your email address.",
        },
        {
          status: 400,
        }
      );
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      return NextResponse.json(
        {
          message: "Please enter a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    const existingSubscriber = await writeClient.fetch(
      `*[
        _type == "subscriber" &&
        email == $email
      ][0]`,
      {
        email: normalizedEmail,
      }
    );

    if (existingSubscriber) {
      return NextResponse.json(
        {
          message:
            "This email is already subscribed to Loudoga News.",
        },
        {
          status: 409,
        }
      );
    }

    // Generate the subscriber's unique unsubscribe token.
    const unsubscribeToken = randomUUID();

    // Save the subscriber first.
    await writeClient.create({
      _type: "subscriber",
      email: normalizedEmail,
      unsubscribeToken,
      subscribedAt: new Date().toISOString(),
      status: "active",
    });

    const siteUrl = (
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000"
    ).replace(/\/$/, "");

    const unsubscribeUrl =
      `${siteUrl}/unsubscribe?token=${encodeURIComponent(
        unsubscribeToken
      )}`;

    // Send the welcome email.
    const { error } = await resend.emails.send({
      from: "Loudoga News <newsletter@loudoganews.com>",
      to: [normalizedEmail],
      subject: "Welcome to Loudoga News!",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>Welcome to Loudoga News</title>
          </head>

          <body
            style="
              margin: 0;
              padding: 0;
              background: #f5f5f5;
              font-family: Arial, sans-serif;
            "
          >
            <div
              style="
                max-width: 650px;
                margin: 0 auto;
                padding: 30px 15px;
              "
            >
              <div
                style="
                  background: #ffffff;
                  border-radius: 12px;
                  overflow: hidden;
                "
              >
                <div
                  style="
                    background: #C8102E;
                    padding: 30px;
                    text-align: center;
                  "
                >
                  <h1
                    style="
                      margin: 0;
                      color: #ffffff;
                      font-size: 28px;
                    "
                  >
                    Loudoga News
                  </h1>
                </div>

                <div
                  style="
                    padding: 35px 30px;
                    color: #222222;
                  "
                >
                  <h2
                    style="
                      margin-top: 0;
                      font-size: 26px;
                    "
                  >
                    Welcome to Loudoga News! 🎉
                  </h2>

                  <p
                    style="
                      font-size: 16px;
                      line-height: 1.7;
                    "
                  >
                    Thank you for subscribing to Loudoga News.
                    Your subscription has been successfully confirmed.
                  </p>

                  <p
                    style="
                      font-size: 16px;
                      line-height: 1.7;
                    "
                  >
                    You'll now receive our latest stories, breaking news,
                    important updates, and featured content directly in
                    your inbox.
                  </p>

                  <p
                    style="
                      font-size: 16px;
                      line-height: 1.7;
                    "
                  >
                    We're glad to have you with us.
                  </p>
                </div>

                <div
                  style="
                    padding: 25px 30px;
                    background: #f8f8f8;
                    text-align: center;
                    color: #777777;
                    font-size: 13px;
                  "
                >
                  <p
                    style="
                      margin: 0 0 10px;
                    "
                  >
                    © ${new Date().getFullYear()} Loudoga News
                  </p>

                  <p
                    style="
                      margin: 0 0 12px;
                    "
                  >
                    You are receiving this email because you subscribed
                    to Loudoga News.
                  </p>

                  <p style="margin: 0;">
                    <a
                      href="${unsubscribeUrl}"
                      style="
                        color: #C8102E;
                        text-decoration: underline;
                      "
                    >
                      Unsubscribe from Loudoga News
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    // The subscription remains successful even if email delivery
    // temporarily fails, because the subscriber was already saved.
    if (error) {
      console.error(
        "Welcome email sending error:",
        error
      );
    }

    return NextResponse.json(
      {
        message:
          "Successfully subscribed to Loudoga News! Please check your email for a welcome message.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Newsletter subscription error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Something went wrong. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}