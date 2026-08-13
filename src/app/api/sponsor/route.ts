import { NextResponse } from "next/server";

const TO_EMAIL = process.env.SPONSOR_TO_EMAIL || "arun.tikoo@gmail.com";
const FROM_EMAIL =
  process.env.SPONSOR_FROM_EMAIL || "Chicago Fire Watch <onboarding@resend.dev>";

type SponsorBody = {
  name?: string;
  business?: string;
  email?: string;
  website?: string;
  tier?: string;
  message?: string;
  /** Honeypot — must stay empty */
  company_url?: string;
};

export async function POST(request: Request) {
  let body: SponsorBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Honeypot: bots often fill hidden fields
  if (body.company_url && String(body.company_url).trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const business = String(body.business || "").trim();
  const website = String(body.website || "").trim();
  const tier = String(body.tier || "Not sure").trim();
  const message = String(body.message || "").trim();

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Email service is not configured. Please try again later." },
      { status: 503 }
    );
  }

  const text = [
    "New Chicago Fire Watch sponsorship interest",
    "",
    `Name: ${name}`,
    `Business: ${business || "—"}`,
    `Email: ${email}`,
    `Website: ${website || "—"}`,
    `Tier interest: ${tier}`,
    "",
    "Message:",
    message || "—",
  ].join("\n");

  const subject = `CFW Sponsorship Interest — ${business || name}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject,
        text,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend error:", res.status, errText);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Sponsor API error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
