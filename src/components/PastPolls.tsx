"use client";

import { useEffect, useState } from "react";

type PollOption = { id: string; label: string };

type HistoryItem = {
  poll: {
    id: string;
    question: string;
    options: PollOption[];
    status: "closed";
    startsAt: string;
    endsAt: string;
    dateRange: string;
  };
  counts: Record<string, number>;
  total: number;
};

export default function PastPolls() {
  const [items, setItems] = useState<HistoryItem[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/poll/history", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && Array.isArray(data.items)) {
          setItems(data.items);
        }
      } catch {
        // non-critical
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 max-w-3xl mx-auto">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-fire-red-light mb-1">
          Archive
        </p>
        <h3 className="text-lg font-bold text-warm-white">Previous polls</h3>
        <p className="text-sm text-muted mt-1">
          Final results from recent viewer questions.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {items.map(({ poll, counts, total }) => (
          <div
            key={poll.id}
            className="rounded-xl border border-fire-red/15 bg-black/25 px-4 py-4"
          >
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-muted border border-fire-red/20 rounded px-1.5 py-0.5">
                Closed
              </span>
              {poll.dateRange && (
                <span className="text-xs text-muted">{poll.dateRange}</span>
              )}
            </div>
            <p className="text-sm font-semibold text-warm-white mb-3">
              {poll.question}
            </p>
            <div className="space-y-1.5">
              {poll.options.map((option) => {
                const count = counts[option.id] || 0;
                const pct =
                  total > 0 ? Math.round((count / total) * 100) : 0;
                return (
                  <div
                    key={option.id}
                    className="relative rounded-md border border-fire-red/10 overflow-hidden px-3 py-2 text-sm"
                  >
                    {total > 0 && (
                      <span
                        className="absolute inset-y-0 left-0 bg-fire-red/15"
                        style={{ width: `${pct}%` }}
                      />
                    )}
                    <span className="relative z-10 flex items-center justify-between gap-2 text-muted">
                      <span className="text-warm-white/90">{option.label}</span>
                      <span className="text-xs font-semibold text-fire-red-light tabular-nums shrink-0">
                        {total > 0 ? `${pct}%` : "—"}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-muted">
              {total === 0
                ? "No votes recorded"
                : total === 1
                ? "1 vote"
                : `${total} votes`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
