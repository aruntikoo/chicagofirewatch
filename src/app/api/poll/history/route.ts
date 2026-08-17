import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import {
  formatPollDateRange,
  getClosedPolls,
  type Poll,
} from "@/data/polls";

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function countKey(pollId: string, optionId: string) {
  return `poll:${pollId}:count:${optionId}`;
}

async function readCounts(
  redis: Redis,
  poll: Poll
): Promise<Record<string, number>> {
  const counts: Record<string, number> = {};
  await Promise.all(
    poll.options.map(async (opt) => {
      const raw = await redis.get<number | string>(countKey(poll.id, opt.id));
      const n = typeof raw === "number" ? raw : Number(raw);
      counts[opt.id] = Number.isFinite(n) ? n : 0;
    })
  );
  return counts;
}

function emptyCounts(poll: Poll): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const opt of poll.options) counts[opt.id] = 0;
  return counts;
}

export async function GET() {
  try {
    const closed = getClosedPolls(5);
    const redis = getRedis();

    const items = await Promise.all(
      closed.map(async (poll) => {
        const counts = redis
          ? await readCounts(redis, poll)
          : emptyCounts(poll);
        const total = Object.values(counts).reduce((a, b) => a + b, 0);
        return {
          poll: {
            id: poll.id,
            question: poll.question,
            options: poll.options,
            status: "closed" as const,
            startsAt: poll.startsAt,
            endsAt: poll.endsAt,
            dateRange: formatPollDateRange(poll),
          },
          counts,
          total,
        };
      })
    );

    return NextResponse.json({
      items,
      configured: Boolean(redis),
    });
  } catch (err) {
    console.error("Poll history GET error:", err);
    return NextResponse.json(
      { error: "Failed to load poll history" },
      { status: 500 }
    );
  }
}
