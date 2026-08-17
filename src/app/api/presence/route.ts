import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const PRESENCE_KEY = "presence:live";
/** Sessions older than this (ms) are removed from the active set */
const TTL_MS = 45_000;

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function isValidSessionId(id: unknown): id is string {
  return (
    typeof id === "string" &&
    id.length >= 8 &&
    id.length <= 128 &&
    /^[a-zA-Z0-9_-]+$/.test(id)
  );
}

async function refreshAndCount(
  redis: Redis,
  sessionId: string
): Promise<number> {
  const now = Date.now();
  const cutoff = now - TTL_MS;

  // Pipeline: add/refresh this session, drop stale ones, return count
  const pipeline = redis.pipeline();
  pipeline.zadd(PRESENCE_KEY, { score: now, member: sessionId });
  pipeline.zremrangebyscore(PRESENCE_KEY, 0, cutoff);
  pipeline.zcard(PRESENCE_KEY);
  const results = await pipeline.exec();

  // zcard is the last command result
  const count = results[results.length - 1];
  return typeof count === "number" ? count : 1;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const sessionId = body?.sessionId;

    if (!isValidSessionId(sessionId)) {
      return NextResponse.json(
        { error: "Invalid sessionId" },
        { status: 400 }
      );
    }

    const redis = getRedis();
    if (!redis) {
      // Graceful degrade before Upstash is configured
      return NextResponse.json({ count: 1, configured: false });
    }

    const count = await refreshAndCount(redis, sessionId);
    return NextResponse.json({ count, configured: true });
  } catch (err) {
    console.error("Presence POST error:", err);
    return NextResponse.json({ count: 1, configured: false });
  }
}

export async function GET() {
  try {
    const redis = getRedis();
    if (!redis) {
      return NextResponse.json({ count: 0, configured: false });
    }

    const now = Date.now();
    const cutoff = now - TTL_MS;
    await redis.zremrangebyscore(PRESENCE_KEY, 0, cutoff);
    const count = await redis.zcard(PRESENCE_KEY);

    return NextResponse.json({
      count: typeof count === "number" ? count : 0,
      configured: true,
    });
  } catch (err) {
    console.error("Presence GET error:", err);
    return NextResponse.json({ count: 0, configured: false });
  }
}
