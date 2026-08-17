import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import {
  formatPollDateRange,
  getClosedPolls,
  readCounts,
  type CatalogPoll,
} from "@/lib/poll-catalog";

function emptyCounts(poll: CatalogPoll): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const opt of poll.options) counts[opt.id] = 0;
  return counts;
}

export async function GET() {
  try {
    const closed = await getClosedPolls(5);
    const redis = getRedis();

    const items = await Promise.all(
      closed.map(async (poll) => {
        const counts = redis ? await readCounts(poll) : emptyCounts(poll);
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
