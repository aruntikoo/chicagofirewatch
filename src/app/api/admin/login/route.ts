import { NextRequest, NextResponse } from "next/server";
import {
  checkAdminPassword,
  createAdminSessionToken,
  isAdminConfigured,
  setAdminCookie,
} from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      {
        error:
          "Admin not configured. Set ADMIN_PASSWORD (and optionally ADMIN_SESSION_SECRET) on Vercel.",
      },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const password = typeof body?.password === "string" ? body.password : "";

  if (!checkAdminPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = await createAdminSessionToken();
  if (!token) {
    return NextResponse.json({ error: "Could not create session" }, { status: 500 });
  }

  const res = NextResponse.json({ ok: true });
  setAdminCookie(res, token);
  return res;
}
