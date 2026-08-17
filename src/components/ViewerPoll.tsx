"use client";

import { useCallback, useEffect, useState } from "react";

const SESSION_KEY = "cfw_presence_id"; // shared with presence counter

type PollOption = { id: string; label: string };

type PollPayload = {
  id: string;
  question: string;
  options: PollOption[];
  status: "active" | "closed";
  startsAt: string;
  endsAt: string;
  open: boolean;
};

type PollResponse = {
  poll: PollPayload;
  counts: Record<string, number>;
  total: number;
  hasVoted: boolean;
  selected: string | null;
  configured: boolean;
  error?: string;
};

function getOrCreateSessionId(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing && existing.length >= 8) return existing;
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID().replace(/-/g, "")
        : `s${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return `s${Date.now().toString(36)}`;
  }
}

export default function ViewerPoll() {
  const [poll, setPoll] = useState<PollPayload | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [total, setTotal] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [configured, setConfigured] = useState(true);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const applyResponse = useCallback((data: PollResponse) => {
    if (!data.poll) return;
    setPoll(data.poll);
    setCounts(data.counts ?? {});
    setTotal(typeof data.total === "number" ? data.total : 0);
    setHasVoted(Boolean(data.hasVoted));
    setSelected(data.selected ?? null);
    setConfigured(data.configured !== false);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const sessionId = getOrCreateSessionId();

    async function load() {
      try {
        const res = await fetch(
          `/api/poll?sessionId=${encodeURIComponent(sessionId)}`,
          { cache: "no-store" }
        );
        if (!res.ok) {
          if (!cancelled) setError("Could not load poll");
          return;
        }
        const data = (await res.json()) as PollResponse;
        if (!cancelled) applyResponse(data);
      } catch {
        if (!cancelled) setError("Could not load poll");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [applyResponse]);

  async function vote(optionId: string) {
    if (!poll || hasVoted || voting || !poll.open) return;
    setVoting(true);
    setError(null);
    const sessionId = getOrCreateSessionId();

    try {
      const res = await fetch("/api/poll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          optionId,
          pollId: poll.id,
        }),
      });
      const data = (await res.json()) as PollResponse;

      if (res.status === 503 || data.configured === false) {
        setConfigured(false);
        setError("Shared voting is not configured yet (Redis).");
        setVoting(false);
        return;
      }

      if (!res.ok && res.status !== 403) {
        setError(data.error || "Vote failed");
        setVoting(false);
        return;
      }

      applyResponse(data);
    } catch {
      setError("Vote failed — try again");
    } finally {
      setVoting(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-fire-red/20 bg-black/30 p-5">
        <p className="text-xs uppercase tracking-wider text-fire-red-light mb-2">
          Viewer Poll
        </p>
        <p className="text-sm text-muted">Loading poll…</p>
      </div>
    );
  }

  if (!poll) {
    return null;
  }

  const showResults = hasVoted || !poll.open;
  const safeTotal = total > 0 ? total : showResults ? 0 : 1;

  return (
    <div className="rounded-xl border border-fire-red/20 bg-black/30 p-5">
      <div className="flex items-center justify-between gap-2 mb-2">
        <p className="text-xs uppercase tracking-wider text-fire-red-light">
          Viewer Poll
        </p>
        {!poll.open && (
          <span className="text-[10px] uppercase tracking-wider font-semibold text-muted border border-fire-red/20 rounded px-1.5 py-0.5">
            Closed
          </span>
        )}
      </div>

      <h4 className="text-base font-semibold text-warm-white mb-4">
        {poll.question}
      </h4>

      <div className="space-y-2">
        {poll.options.map((option) => {
          const count = counts[option.id] || 0;
          const pct =
            showResults && total > 0 ? Math.round((count / safeTotal) * 100) : 0;

          return (
            <button
              key={option.id}
              type="button"
              disabled={hasVoted || !poll.open || voting || !configured}
              onClick={() => vote(option.id)}
              className={`relative w-full text-left rounded-lg border px-3 py-2.5 text-sm transition-colors overflow-hidden ${
                selected === option.id
                  ? "border-fire-red/60 bg-fire-red/15 text-warm-white"
                  : showResults
                  ? "border-fire-red/15 text-muted cursor-default"
                  : "border-fire-red/20 hover:border-fire-red/40 hover:bg-fire-red/10 text-warm-white"
              }`}
            >
              {showResults && total > 0 && (
                <span
                  className="absolute inset-y-0 left-0 bg-fire-red/20 transition-all"
                  style={{ width: `${pct}%` }}
                />
              )}
              <span className="relative z-10 flex items-center justify-between gap-2">
                <span>{option.label}</span>
                {showResults && total > 0 && (
                  <span className="text-xs font-semibold text-fire-red-light tabular-nums shrink-0">
                    {pct}%
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {showResults && (
        <p className="mt-3 text-xs text-muted">
          {total === 1 ? "1 vote" : `${total} votes`}
          {hasVoted ? " · Thanks for voting" : ""}
          {!poll.open ? " · Poll closed" : ""}
        </p>
      )}

      {!showResults && configured && poll.open && (
        <p className="mt-3 text-xs text-muted">
          One vote per browser. Results are shared with all visitors.
        </p>
      )}

      {!configured && (
        <p className="mt-3 text-xs text-amber-400/90">
          Shared voting needs Upstash Redis on the server (same as the live
          counter).
        </p>
      )}

      {error && (
        <p className="mt-2 text-xs text-fire-red-light">{error}</p>
      )}
    </div>
  );
}
