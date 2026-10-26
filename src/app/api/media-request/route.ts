import { NextResponse } from "next/server";

const TO_EMAIL = process.env.MEDIA_TO_EMAIL || "press@chicagofirewatch.com";
const FROM_EMAIL =
  process.env.SPONSOR_FROM_EMAIL || "Chicago Fire Watch <onboarding@resend.dev>";

type MediaBody = {
  outletName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  story?: string;
  assets?: string[];
  intendedUse?: string;
  deadline?: string;
  notes?: string;
  acknowledgement?: boolean;
  /** Honeypot — must stay empty */
  company_url?: string;
};

export async function POST(request: Request) {
  let body: MediaBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (body.company_url && String(body.company_url).trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const outletName = String(body.outletName || "").trim();
  const contactName = String(body.contactName || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const story = String(body.story || "").trim();
  const assets = Array.isArray(body.assets) ? body.assets.filter(Boolean).map(String) : [];
  const intendedUse = String(body.intendedUse || "").trim();
  const deadline = String(body.deadline || "").trim();
  const notes = String(body.notes || "").trim();
  const acknowledgement = Boolean(body.acknowledgement);

  if (!outletName || !contactName || !email || !story || assets.length === 0 || !intendedUse || !deadline || !acknowledgement) {
    return NextResponse.json(
      { error: "All required fields must be filled, including at least one asset type and the acknowledgement." },
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
    "New Chicago Fire Watch media / licensing request",
    "",
    `Outlet name: ${outletName}`,
    `Contact name: ${contactName}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    `Story / topic: ${story}`,
    `Assets wanted: ${assets.join(", ")}`,
    `Intended use and platforms: ${intendedUse}`,
    `Deadline: ${deadline}`,
    "",
    "Notes:",
    notes || "—",
    "",
    "Acknowledgement: Yes (agreed to credit and license terms)",
  ].join("\n");

  const subject = `Media request: ${outletName} — ${story} (deadline ${deadline})`;

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
    console.error("Media request API error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
