import { NextResponse } from "next/server";

import { resend } from "@/lib/resend";

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Loudoga News <newsletter@loudoganews.com>",
      to: ["goodswillemmy@gmail.com"],
      subject: "Loudoga News Newsletter Test",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #C8102E;">Loudoga News</h1>

          <h2>Your newsletter system is working! 🎉</h2>

          <p>
            This is a test email sent from the Loudoga News newsletter system.
          </p>

          <p>
            Your Resend integration and verified domain are working correctly.
          </p>

          <hr />

          <p style="color: #666; font-size: 14px;">
            © ${new Date().getFullYear()} Loudoga News
          </p>
        </div>
      `,
    });

    if (error) {
      console.error(error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to send test email.",
      },
      { status: 500 }
    );
  }
}