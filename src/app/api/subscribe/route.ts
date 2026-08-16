import { NextRequest, NextResponse } from "next/server";

/**
 * Simple email capture endpoint.
 * Currently logs the submission and returns success.
 * Replace the body with a call to your email provider (Buttondown, Resend,
 * Mailchimp, ConvertKit, etc.) when ready for production.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";

    if (!email || !/[^\s@]+@[^\s@]+\.[^\s@]+/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // TODO: Forward to your email service of choice.
    // Example (Resend):
    // await resend.contacts.create({ email, audienceId: "..." });
    //
    // Example (Buttondown):
    // await fetch("https://api.buttondown.email/v1/subscribers", { ... });

    console.log("[subscribe]", email, new Date().toISOString());

    return NextResponse.json({
      success: true,
      message: "Thanks for joining the Chicago Fire Watch community.",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
