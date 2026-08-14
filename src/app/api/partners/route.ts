import { NextResponse } from "next/server";

const TO_EMAIL = process.env.SPONSOR_TO_EMAIL || "arun.tikoo@gmail.com";
const FROM_EMAIL =
  process.env.SPONSOR_FROM_EMAIL || "Chicago Fire Watch <onboarding@resend.dev>";

type PartnerBody = {
  name?: string;
  email?: string;
  storeName?: string;
  storeUrl?: string;
  whatYouSell?: string;
  partnershipInterest?: string;
  monthlyVisitors?: string;
  trackingReady?: string;
  message?: string;
  /** Honeypot — must stay empty */
  company_url?: string;
};

export async function POST(request: Request) {
  let body: PartnerBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (body.company_url && String(body.company_url).trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const storeName = String(body.storeName || "").trim();
  const storeUrl = String(body.storeUrl || "").trim();
  const whatYouSell = String(body.whatYouSell || "").trim();
  const partnershipInterest = String(body.partnershipInterest || "Not sure").trim();
  const monthlyVisitors = String(body.monthlyVisitors || "").trim();
  const trackingReady = String(body.trackingReady || "").trim();
  const message = String(body.message || "").trim();

  if (!name || !email || !storeName || !storeUrl) {
    return NextResponse.json(
      { error: "Name, email, store name, and store URL are required" },
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
    "New Chicago Fire Watch retail partner interest",
    "",
    `Contact name: ${name}`,
    `Email: ${email}`,
    `Store name: ${storeName}`,
    `Store URL: ${storeUrl}`,
    `What they sell: ${whatYouSell || "—"}`,
    `Partnership interest: ${partnershipInterest}`,
    `Approx. monthly visitors: ${monthlyVisitors || "—"}`,
    `Tracking link/code ready: ${trackingReady || "—"}`,
    "",
    "Message:",
    message || "—",
  ].join("\n");

  const subject = `CFW Retail Partner Interest — ${storeName}`;

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
    console.error("Partners API error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
