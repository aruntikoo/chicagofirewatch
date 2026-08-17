import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getRedis } from "@/lib/redis";
import { updateDraft } from "@/lib/poll-catalog";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  if (!getRedis()) {
    return NextResponse.json(
      { error: "Redis required for admin poll catalog" },
      { status: 503 }
    );
  }

  try {
    const { id } = await context.params;
    const body = await request.json().catch(() => ({}));

    const patch: {
      question?: string;
      options?: { label: string; id?: string }[];
      startsAt?: string;
      endsAt?: string;
    } = {};

    if (typeof body?.question === "string") patch.question = body.question;
    if (typeof body?.startsAt === "string") patch.startsAt = body.startsAt;
    if (typeof body?.endsAt === "string") patch.endsAt = body.endsAt;

    if (Array.isArray(body?.options)) {
      patch.options = body.options
        .map((o: unknown) => {
          if (typeof o === "string") return { label: o };
          if (o && typeof o === "object" && "label" in o) {
            const obj = o as { label: string; id?: string };
            return {
              label: String(obj.label || ""),
              id: obj.id ? String(obj.id) : undefined,
            };
          }
          return null;
        })
        .filter(Boolean) as { label: string; id?: string }[];
    }

    const poll = await updateDraft(id, patch);
    return NextResponse.json({ poll });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Update failed";
    console.error("Admin poll PATCH:", err);
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
