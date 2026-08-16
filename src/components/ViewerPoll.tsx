"use client";

import { useEffect, useState } from "react";
import { currentPoll } from "@/data/milestones";

const STORAGE_KEY = `cfw-poll-${currentPoll.id}`;

export default function ViewerPoll() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [counts, setCounts] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    currentPoll.options.forEach((o) => {
      initial[o.id] = 0;
    });
    return initial;
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          selected: string;
          counts: Record<string, number>;
        };
        if (parsed.selected) {
          setSelected(parsed.selected);
          setHasVoted(true);
        }
        if (parsed.counts) {
          setCounts((prev) => ({ ...prev, ...parsed.counts }));
        }
      }
    } catch {
      // ignore
    }
  }, []);

  function vote(optionId: string) {
    if (hasVoted) return;

    setCounts((prev) => {
      const next = { ...prev, [optionId]: (prev[optionId] || 0) + 1 };
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ selected: optionId, counts: next })
        );
      } catch {
        // ignore
      }
      return next;
    });
    setSelected(optionId);
    setHasVoted(true);
  }

  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="rounded-xl border border-fire-red/20 bg-black/30 p-5">
      <p className="text-xs uppercase tracking-wider text-fire-red-light mb-2">
        Viewer Poll
      </p>
      <h4 className="text-base font-semibold text-warm-white mb-4">
        {currentPoll.question}
      </h4>

      <div className="space-y-2">
        {currentPoll.options.map((option) => {
          const count = counts[option.id] || 0;
          const pct = hasVoted ? Math.round((count / total) * 100) : 0;

          return (
            <button
              key={option.id}
              type="button"
              disabled={hasVoted}
              onClick={() => vote(option.id)}
              className={`relative w-full text-left rounded-lg border px-3 py-2.5 text-sm transition-colors overflow-hidden ${
                selected === option.id
                  ? "border-fire-red/60 bg-fire-red/15 text-warm-white"
                  : hasVoted
                  ? "border-fire-red/15 text-muted cursor-default"
                  : "border-fire-red/20 hover:border-fire-red/40 hover:bg-fire-red/10 text-warm-white"
              }`}
            >
              {hasVoted && (
                <span
                  className="absolute inset-y-0 left-0 bg-fire-red/20 transition-all"
                  style={{ width: `${pct}%` }}
                />
              )}
              <span className="relative z-10 flex items-center justify-between gap-2">
                <span>{option.label}</span>
                {hasVoted && (
                  <span className="text-xs font-semibold text-fire-red-light tabular-nums">
                    {pct}%
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {hasVoted && (
        <p className="mt-3 text-xs text-muted">
          Thanks for voting. Results are stored on this device for now.
        </p>
      )}
    </div>
  );
}
