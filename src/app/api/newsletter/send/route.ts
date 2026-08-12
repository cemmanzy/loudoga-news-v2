import { NextResponse } from "next/server";
import { toHTML } from "@portabletext/to-html";
import type { TypedObject } from "@portabletext/types";

import { resend } from "@/lib/resend";
import { getActiveSubscribers } from "@/sanity/loaders/subscribers";
import { client } from "@/sanity/lib/client";

interface Newsletter {
  _id: string;
  subject: string;
  previewText?: string;
  content: TypedObject[];
  status: "draft" | "sending" | "sent";
}

export async function POST(request: Request) {
  try {
    const { newsletterId } = await request.json();

    if (!newsletterId) {
      return NextResponse.json(
        {
          message: "Newsletter ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const newsletter = await client.fetch<Newsletter>(
      `*[
        _type == "newsletter" &&
        _id == $newsletterId
      ][0]{
        _id,
        subject,
        previewText,
        content,
        status
      }`,
      {
        newsletterId,
      }
    );

    if (!newsletter) {
      return NextResponse.json(
        {
          message: "Newsletter not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (newsletter.status === "sent") {
      return NextResponse.json(
        {
          message: "This newsletter has already been sent.",
        },
        {
          status: 400,
        }
      );
    }

    if (newsletter.status === "sending") {
      return NextResponse.json(
        {
          message:
            "This newsletter is already being processed. Please do not send it again.",
        },
        {
          status: 400,
        }
      );
    }

    const writeClient = client.withConfig({
      token: process.env.SANITY_API_WRITE_TOKEN,
      useCdn: false,
    });

    // Lock the newsletter before sending.
    // This prevents accidental duplicate sends.
    await writeClient
      .patch(newsletter._id)
      .set({
        status: "sending",
      })
      .commit();

    const subscribers = await getActiveSubscribers();

    if (!subscribers.length) {
      // Return the newsletter to draft because nobody received an email.
      await writeClient
        .patch(newsletter._id)
        .set({
          status: "draft",
        })
        .commit();

      return NextResponse.json(
        {
          message: "There are no active subscribers.",
        },
        {
          status: 400,
        }
      );
    }

    const newsletterContent = toHTML(newsletter.content, {
      components: {
        block: {
          h2: ({ children }) =>
            `<h2 style="
              margin: 32px 0 12px;
              color: #171717;
              font-size: 22px;
              line-height: 1.35;
              font-weight: 700;
            ">
              ${children}
            </h2>`,

          normal: ({ children }) =>
            `<p style="
              margin: 0 0 18px;
              color: #444444;
              font-size: 16px;
              line-height: 1.75;
            ">
              ${children}
            </p>`,
        },

        marks: {
          link: ({ children, value }) => {
            const href =
              typeof value?.href === "string"
                ? value.href
                : "#";

            return `<a
              href="${href}"
              style="
                display: inline-block;
                margin: 4px 0 12px;
                padding: 12px 20px;
                background: #C8102E;
                color: #ffffff;
                font-size: 14px;
                font-weight: 700;
                text-decoration: none;
                border-radius: 6px;
              "
            >
              ${children}
            </a>`;
          },
        },
      },
    });

    const siteUrl = (
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000"
    ).replace(/\/$/, "");

    const currentYear = new Date().getFullYear();

    const results = await Promise.allSettled(
      subscribers.map((subscriber) => {
        const unsubscribeUrl =
          `${siteUrl}/unsubscribe?token=${encodeURIComponent(
            subscriber.unsubscribeToken
          )}`;

        const html = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8" />

              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />

              <meta
                name="x-apple-disable-message-reformatting"
              />

              <title>${newsletter.subject}</title>
            </head>

            <body
              style="
                margin: 0;
                padding: 0;
                background: #f3f4f6;
                font-family:
                  Arial,
                  Helvetica,
                  sans-serif;
              "
            >
              <!-- Email Wrapper -->
              <div
                style="
                  width: 100%;
                  background: #f3f4f6;
                  padding: 30px 10px;
                  box-sizing: border-box;
                "
              >
                <!-- Main Container -->
                <div
                  style="
                    max-width: 680px;
                    margin: 0 auto;
                    background: #ffffff;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow:
                      0 4px 18px
                      rgba(0, 0, 0, 0.08);
                  "
                >
                  <!-- Header -->
                  <div
                    style="
                      background: #C8102E;
                      padding: 32px 30px;
                      text-align: center;
                    "
                  >
                    <a
                      href="${siteUrl}"
                      style="
                        color: #ffffff;
                        text-decoration: none;
                      "
                    >
                      <div
                        style="
                          font-size: 30px;
                          font-weight: 800;
                          letter-spacing: -0.5px;
                        "
                      >
                        Loudoga News
                      </div>

                      <div
                        style="
                          margin-top: 8px;
                          font-size: 13px;
                          color: rgba(255, 255, 255, 0.85);
                          letter-spacing: 1px;
                          text-transform: uppercase;
                        "
                      >
                        Stories That Matter
                      </div>
                    </a>
                  </div>

                  <!-- Main Content -->
                  <div
                    style="
                      padding: 40px 32px;
                    "
                  >
                    <!-- Newsletter Label -->
                    <div
                      style="
                        display: inline-block;
                        margin-bottom: 18px;
                        padding: 6px 12px;
                        background: #fff1f3;
                        color: #C8102E;
                        font-size: 12px;
                        font-weight: 700;
                        letter-spacing: 0.8px;
                        text-transform: uppercase;
                        border-radius: 20px;
                      "
                    >
                      Loudoga Newsletter
                    </div>

                    <!-- Subject -->
                    <h1
                      style="
                        margin: 0 0 16px;
                        color: #171717;
                        font-size: 30px;
                        line-height: 1.3;
                        font-weight: 800;
                      "
                    >
                      ${newsletter.subject}
                    </h1>

                    ${
                      newsletter.previewText
                        ? `
                          <p
                            style="
                              margin: 0 0 30px;
                              color: #6b7280;
                              font-size: 17px;
                              line-height: 1.65;
                            "
                          >
                            ${newsletter.previewText}
                          </p>
                        `
                        : ""
                    }

                    <!-- Divider -->
                    <div
                      style="
                        width: 100%;
                        height: 1px;
                        background: #e5e7eb;
                        margin: 0 0 30px;
                      "
                    ></div>

                    <!-- Newsletter Content -->
                    <div>
                      ${newsletterContent}
                    </div>

                    <!-- Bottom CTA -->
                    <div
                      style="
                        margin-top: 38px;
                        padding-top: 28px;
                        border-top:
                          1px solid #e5e7eb;
                        text-align: center;
                      "
                    >
                      <p
                        style="
                          margin: 0 0 16px;
                          color: #555555;
                          font-size: 15px;
                          line-height: 1.6;
                        "
                      >
                        Stay informed with the latest news,
                        stories, interviews and features from
                        Loudoga News.
                      </p>

                      <a
                        href="${siteUrl}"
                        style="
                          display: inline-block;
                          padding: 13px 24px;
                          background: #171717;
                          color: #ffffff;
                          text-decoration: none;
                          font-size: 14px;
                          font-weight: 700;
                          border-radius: 6px;
                        "
                      >
                        Visit Loudoga News
                      </a>
                    </div>
                  </div>

                  <!-- Footer -->
                  <div
                    style="
                      padding: 28px 30px;
                      background: #f8f8f8;
                      border-top:
                        1px solid #e5e7eb;
                      text-align: center;
                    "
                  >
                    <p
                      style="
                        margin: 0 0 10px;
                        color: #555555;
                        font-size: 13px;
                        line-height: 1.6;
                      "
                    >
                      © ${currentYear} Loudoga News.
                      All rights reserved.
                    </p>

                    <p
                      style="
                        margin: 0 0 14px;
                        color: #777777;
                        font-size: 12px;
                        line-height: 1.6;
                      "
                    >
                      You are receiving this email because you
                      subscribed to receive updates from Loudoga News.
                    </p>

                    <a
                      href="${unsubscribeUrl}"
                      style="
                        color: #C8102E;
                        font-size: 12px;
                        font-weight: 600;
                        text-decoration: underline;
                      "
                    >
                      Unsubscribe from this newsletter
                    </a>
                  </div>
                </div>

                <!-- Bottom spacing -->
                <div
                  style="
                    height: 20px;
                  "
                ></div>
              </div>
            </body>
          </html>
        `;

        return resend.emails.send({
          from:
            "Loudoga News <newsletter@loudoganews.com>",
          to: [subscriber.email],
          subject: newsletter.subject,
          html,
        });
      })
    );

    const successfulEmails = results.filter(
      (result) =>
        result.status === "fulfilled" &&
        result.value.data?.id &&
        !result.value.error
    ).length;

    if (successfulEmails === 0) {
      // No emails were sent, so allow the newsletter
      // to be tried again.
      await writeClient
        .patch(newsletter._id)
        .set({
          status: "draft",
        })
        .commit();

      return NextResponse.json(
        {
          message: "Failed to send the newsletter.",
        },
        {
          status: 500,
        }
      );
    }

    // Mark the newsletter as successfully sent.
    await writeClient
      .patch(newsletter._id)
      .set({
        status: "sent",
        sentAt: new Date().toISOString(),
        recipientCount: successfulEmails,
      })
      .commit();

    return NextResponse.json({
      success: true,
      message:
        `Newsletter sent successfully to ${successfulEmails} subscriber(s).`,
      recipientCount: successfulEmails,
    });
  } catch (error) {
    console.error(
      "Newsletter sending error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "The newsletter process encountered an error. Check its status in Sanity before trying again.",
      },
      {
        status: 500,
      }
    );
  }
}