import { NextRequest, NextResponse } from "next/server";

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

    const apiKey = process.env.BUTTONDOWN_API_KEY;
    if (!apiKey) {
      console.error("BUTTONDOWN_API_KEY is not set");
      return NextResponse.json(
        { error: "Email signup is not configured. Please try again later." },
        { status: 503 }
      );
    }

    // Create subscriber without forcing type: regular so ButtonDown
    // uses double opt-in (unactivated → confirmation email).
    const res = await fetch("https://api.buttondown.com/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        // Optional metadata so you can see source in the dashboard
        utm_source: "chicagofirewatch",
        utm_medium: "website",
        utm_campaign: "community_signup",
      }),
    });

    const data = await res.json().catch(() => ({}));

    // Already subscribed — treat as success for the user
    if (
      res.status === 400 &&
      typeof data === "object" &&
      data !== null &&
      (JSON.stringify(data).toLowerCase().includes("already") ||
        JSON.stringify(data).toLowerCase().includes("exist"))
    ) {
      return NextResponse.json({
        success: true,
        message:
          "You're already on the list (or check your inbox to confirm a previous signup).",
      });
    }

    if (!res.ok) {
      console.error("Buttondown error:", res.status, data);
      return NextResponse.json(
        {
          error:
            typeof data?.detail === "string"
              ? data.detail
              : "Could not complete signup. Please try again.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Check your inbox for a confirmation email to finish joining Chicago Fire Watch updates.",
    });
  } catch (err) {
    console.error("Subscribe API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
