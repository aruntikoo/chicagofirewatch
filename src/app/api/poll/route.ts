import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import {
  countKey,
  getDisplayPoll,
  getPollById,
  isPollOpen,
  readCounts,
  votersKey,
  type CatalogPoll,
} from "@/lib/poll-catalog";

function isValidSessionId(id: unknown): id is string {
  return (
    typeof id === "string" &&
    id.length >= 8 &&
    id.length <= 128 &&
    /^[a-zA-Z0-9_-]+$/.test(id)
  );
}

function emptyCounts(poll: CatalogPoll): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const opt of poll.options) counts[opt.id] = 0;
  return counts;
}

function serializePoll(poll: CatalogPoll, open: boolean) {
  return {
    id: poll.id,
    question: poll.question,
    options: poll.options,
    status: poll.status === "draft" ? "closed" : poll.status,
    startsAt: poll.startsAt,
    endsAt: poll.endsAt,
    open,
  };
}

export async function GET(request: NextRequest) {
  try {
    const poll = await getDisplayPoll();
    if (!poll || poll.status === "draft") {
      return NextResponse.json({ error: "No poll configured" }, { status: 404 });
    }

    const open = isPollOpen(poll);
    const sessionId = request.nextUrl.searchParams.get("sessionId");
    const redis = getRedis();

    if (!redis) {
      return NextResponse.json({
        poll: serializePoll(poll, open),
        counts: emptyCounts(poll),
        total: 0,
        hasVoted: false,
        selected: null,
        configured: false,
      });
    }

    const counts = await readCounts(poll);
    const total = Object.values(counts).reduce((a, b) => a + b, 0);

    let hasVoted = false;
    let selected: string | null = null;

    if (isValidSessionId(sessionId)) {
      const voted = await redis.sismember(votersKey(poll.id), sessionId);
      hasVoted = Boolean(voted);
      if (hasVoted) {
        const sel = await redis.get<string>(`poll:${poll.id}:choice:${sessionId}`);
        if (typeof sel === "string") selected = sel;
      }
    }

    return NextResponse.json({
      poll: serializePoll(poll, open),
      counts,
      total,
      hasVoted,
      selected,
      configured: true,
    });
  } catch (err) {
    console.error("Poll GET error:", err);
    return NextResponse.json({ error: "Failed to load poll" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const sessionId = body?.sessionId;
    const optionId = body?.optionId;
    const pollId = typeof body?.pollId === "string" ? body.pollId : null;

    if (!isValidSessionId(sessionId)) {
      return NextResponse.json({ error: "Invalid sessionId" }, { status: 400 });
    }
    if (typeof optionId !== "string" || optionId.length < 1 || optionId.length > 64) {
      return NextResponse.json({ error: "Invalid optionId" }, { status: 400 });
    }

    const poll = pollId ? await getPollById(pollId) : await getDisplayPoll();
    if (!poll || poll.status === "draft") {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }

    const open = isPollOpen(poll);
    if (!open) {
      const redis = getRedis();
      const counts = redis ? await readCounts(poll) : emptyCounts(poll);
      const total = Object.values(counts).reduce((a, b) => a + b, 0);
      return NextResponse.json(
        {
          error: "Poll is closed",
          poll: serializePoll(poll, false),
          counts,
          total,
          hasVoted: false,
          selected: null,
          configured: Boolean(redis),
        },
        { status: 403 }
      );
    }

    if (!poll.options.some((o) => o.id === optionId)) {
      return NextResponse.json({ error: "Unknown option" }, { status: 400 });
    }

    const redis = getRedis();
    if (!redis) {
      return NextResponse.json(
        {
          error: "Voting backend not configured",
          poll: serializePoll(poll, open),
          counts: emptyCounts(poll),
          total: 0,
          hasVoted: false,
          selected: null,
          configured: false,
        },
        { status: 503 }
      );
    }

    const added = await redis.sadd(votersKey(poll.id), sessionId);
    if (added === 1) {
      await redis.incr(countKey(poll.id, optionId));
      await redis.set(`poll:${poll.id}:choice:${sessionId}`, optionId);
    }

    const counts = await readCounts(poll);
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    const selected =
      added === 1
        ? optionId
        : (await redis.get<string>(`poll:${poll.id}:choice:${sessionId}`)) ?? null;

    return NextResponse.json({
      poll: serializePoll(poll, open),
      counts,
      total,
      hasVoted: true,
      selected,
      configured: true,
      alreadyVoted: added !== 1,
    });
  } catch (err) {
    console.error("Poll POST error:", err);
    return NextResponse.json({ error: "Failed to record vote" }, { status: 500 });
  }
}
