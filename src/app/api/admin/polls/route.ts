import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import {
  createDraft,
  isPollOpen,
  readCatalog,
  readCounts,
} from "@/lib/poll-catalog";
import { getRedis } from "@/lib/redis";

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const catalog = await readCatalog();
    const redis = getRedis();

    const items = await Promise.all(
      catalog.map(async (poll) => {
        const counts =
          poll.status === "draft" ? {} : await readCounts(poll);
        const total = Object.values(counts).reduce(
          (a, b) => a + (typeof b === "number" ? b : 0),
          0
        );
        return {
          ...poll,
          open: isPollOpen(poll),
          counts,
          total,
        };
      })
    );

    return NextResponse.json({
      items,
      redisConfigured: Boolean(redis),
    });
  } catch (err) {
    console.error("Admin polls GET:", err);
    return NextResponse.json({ error: "Failed to load polls" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  if (!getRedis()) {
    return NextResponse.json(
      { error: "Redis required for admin poll catalog" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const question = typeof body?.question === "string" ? body.question.trim() : "";
    const startsAt =
      typeof body?.startsAt === "string" ? body.startsAt : new Date().toISOString();
    const endsAt =
      typeof body?.endsAt === "string"
        ? body.endsAt
        : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    let options: { label: string; id?: string }[] = [];
    if (Array.isArray(body?.options)) {
      options = body.options
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

    options = options.filter((o) => o.label.trim().length > 0);

    if (!question || question.length < 5) {
      return NextResponse.json(
        { error: "Question is required (min 5 chars)" },
        { status: 400 }
      );
    }
    if (options.length < 2) {
      return NextResponse.json(
        { error: "At least 2 options required" },
        { status: 400 }
      );
    }
    if (options.length > 6) {
      return NextResponse.json(
        { error: "Maximum 6 options" },
        { status: 400 }
      );
    }

    const poll = await createDraft({
      question,
      options,
      startsAt,
      endsAt,
      id: typeof body?.id === "string" ? body.id : undefined,
    });

    return NextResponse.json({ poll }, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to create draft";
    console.error("Admin polls POST:", err);
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
