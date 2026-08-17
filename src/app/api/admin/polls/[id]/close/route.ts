import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getRedis } from "@/lib/redis";
import { closePoll } from "@/lib/poll-catalog";

export async function POST(
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
    const poll = await closePoll(id);
    return NextResponse.json({ poll });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Close failed";
    console.error("Admin poll close:", err);
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
