import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const ADMIN_COOKIE = "cfw_admin_session";
const MAX_AGE_SEC = 60 * 60 * 24 * 7; // 7 days

function getSecrets(): { password: string; secret: string } | null {
  const password = process.env.ADMIN_PASSWORD;
  const secret =
    process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!password || !secret) return null;
  return { password, secret };
}

function toBase64Url(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]!);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(s: string): Uint8Array {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmacSign(message: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(message)
  );
  return toBase64Url(sig);
}

async function hmacVerify(
  message: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const expected = await hmacSign(message, secret);
  if (expected.length !== signature.length) return false;
  let ok = 0;
  for (let i = 0; i < expected.length; i++) {
    ok |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return ok === 0;
}

export function isAdminConfigured(): boolean {
  return Boolean(getSecrets());
}

export function checkAdminPassword(password: string): boolean {
  const secrets = getSecrets();
  if (!secrets) return false;
  if (password.length !== secrets.password.length) {
    // still do a compare-length work to avoid trivial timing leak on length alone
  }
  const a = password;
  const b = secrets.password;
  let ok = a.length === b.length ? 0 : 1;
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    ok |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return ok === 0;
}

export async function createAdminSessionToken(): Promise<string | null> {
  const secrets = getSecrets();
  if (!secrets) return null;
  const expiry = String(Date.now() + MAX_AGE_SEC * 1000);
  const sig = await hmacSign(expiry, secrets.secret);
  return `${expiry}.${sig}`;
}

export async function verifyAdminSessionToken(
  token: string | undefined | null
): Promise<boolean> {
  if (!token) return false;
  const secrets = getSecrets();
  if (!secrets) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [expiry, sig] = parts;
  if (!expiry || !sig) return false;
  const exp = Number(expiry);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;
  return hmacVerify(expiry, sig, secrets.secret);
}

export function setAdminCookie(res: NextResponse, token: string) {
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SEC,
  });
}

export function clearAdminCookie(res: NextResponse) {
  res.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function requireAdmin(
  request?: NextRequest
): Promise<{ ok: true } | { ok: false; response: NextResponse }> {
  if (!isAdminConfigured()) {
    return {
      ok: false,
      response: NextResponse.json(
        {
          error:
            "Admin not configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET on Vercel.",
        },
        { status: 503 }
      ),
    };
  }

  let token: string | undefined;
  if (request) {
    token = request.cookies.get(ADMIN_COOKIE)?.value;
  } else {
    const jar = await cookies();
    token = jar.get(ADMIN_COOKIE)?.value;
  }

  const valid = await verifyAdminSessionToken(token);
  if (!valid) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  return { ok: true };
}
