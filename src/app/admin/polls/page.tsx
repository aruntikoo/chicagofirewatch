"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type PollItem = {
  id: string;
  question: string;
  options: { id: string; label: string }[];
  status: "draft" | "active" | "closed";
  startsAt: string;
  endsAt: string;
  open: boolean;
  counts: Record<string, number>;
  total: number;
};

function toLocalInputValue(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fromLocalInputValue(local: string): string {
  const d = new Date(local);
  return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

export default function AdminPollsPage() {
  const router = useRouter();
  const [items, setItems] = useState<PollItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [redisConfigured, setRedisConfigured] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  // new draft form
  const [question, setQuestion] = useState("");
  const [optionLabels, setOptionLabels] = useState(["", "", "", ""]);
  const [startsAt, setStartsAt] = useState(() =>
    toLocalInputValue(new Date().toISOString())
  );
  const [endsAt, setEndsAt] = useState(() =>
    toLocalInputValue(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString())
  );
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/polls", { cache: "no-store" });
      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to load");
        setLoading(false);
        return;
      }
      setItems(data.items || []);
      setRedisConfigured(data.redisConfigured !== false);
      setError(null);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  async function createDraft(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const options = optionLabels
      .map((l) => l.trim())
      .filter(Boolean)
      .map((label) => ({ label }));
    try {
      const res = await fetch("/api/admin/polls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          options,
          startsAt: fromLocalInputValue(startsAt),
          endsAt: fromLocalInputValue(endsAt),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not save draft");
        setSaving(false);
        return;
      }
      setQuestion("");
      setOptionLabels(["", "", "", ""]);
      await load();
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  }

  async function activate(id: string) {
    if (
      !confirm(
        "Activate this poll? The current live poll (if any) will be closed."
      )
    ) {
      return;
    }
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/polls/${id}/activate`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Activate failed");
      } else {
        await load();
      }
    } catch {
      setError("Network error");
    } finally {
      setBusyId(null);
    }
  }

  async function close(id: string) {
    if (!confirm("Close this poll? Voting will stop.")) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/polls/${id}/close`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Close failed");
      } else {
        await load();
      }
    } catch {
      setError("Network error");
    } finally {
      setBusyId(null);
    }
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-muted text-sm">
        Loading…
      </div>
    );
  }

  const drafts = items.filter((p) => p.status === "draft");
  const active = items.filter((p) => p.status === "active");
  const closed = items.filter((p) => p.status === "closed");

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-warm-white">Poll manager</h1>
          <p className="text-sm text-muted mt-1">
            Draft → review → activate. Grok can suggest copy; only you publish.
          </p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="text-sm text-muted hover:text-warm-white"
        >
          Log out
        </button>
      </div>

      {!redisConfigured && (
        <div className="mb-6 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          Redis is not configured. Admin catalog writes require
          UPSTASH_REDIS_REST_URL and TOKEN.
        </div>
      )}

      {error && (
        <p className="mb-4 text-sm text-fire-red-light">{error}</p>
      )}

      {/* New draft */}
      <section className="rounded-xl border border-fire-red/20 bg-charcoal/60 p-5 mb-10">
        <h2 className="text-lg font-semibold text-warm-white mb-4">
          New draft
        </h2>
        <form onSubmit={createDraft} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted mb-1">
              Question
            </label>
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full rounded-lg border border-fire-red/20 bg-black/40 px-3 py-2 text-sm text-warm-white"
              placeholder="Which milestone are you most excited to watch?"
              required
              minLength={5}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {optionLabels.map((label, i) => (
              <div key={i}>
                <label className="block text-xs text-muted mb-1">
                  Option {i + 1}
                  {i < 2 ? " *" : ""}
                </label>
                <input
                  value={label}
                  onChange={(e) => {
                    const next = [...optionLabels];
                    next[i] = e.target.value;
                    setOptionLabels(next);
                  }}
                  className="w-full rounded-lg border border-fire-red/20 bg-black/40 px-3 py-2 text-sm text-warm-white"
                  required={i < 2}
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-muted mb-1">Starts</label>
              <input
                type="datetime-local"
                value={startsAt}
                onChange={(e) => setStartsAt(e.target.value)}
                className="w-full rounded-lg border border-fire-red/20 bg-black/40 px-3 py-2 text-sm text-warm-white"
              />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">Ends</label>
              <input
                type="datetime-local"
                value={endsAt}
                onChange={(e) => setEndsAt(e.target.value)}
                className="w-full rounded-lg border border-fire-red/20 bg-black/40 px-3 py-2 text-sm text-warm-white"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={saving || !redisConfigured}
            className="rounded-lg bg-fire-red hover:bg-fire-red-light text-white text-sm font-semibold px-4 py-2 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save draft"}
          </button>
        </form>
      </section>

      <PollGroup
        title="Active"
        items={active}
        busyId={busyId}
        onActivate={activate}
        onClose={close}
      />
      <PollGroup
        title="Drafts"
        items={drafts}
        busyId={busyId}
        onActivate={activate}
        onClose={close}
      />
      <PollGroup
        title="Closed"
        items={closed}
        busyId={busyId}
        onActivate={activate}
        onClose={close}
      />
    </div>
  );
}

function PollGroup({
  title,
  items,
  busyId,
  onActivate,
  onClose,
}: {
  title: string;
  items: PollItem[];
  busyId: string | null;
  onActivate: (id: string) => void;
  onClose: (id: string) => void;
}) {
  if (items.length === 0) {
    return (
      <section className="mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">
          {title}
        </h2>
        <p className="text-sm text-muted/70">None</p>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">
        {title}
      </h2>
      <div className="space-y-3">
        {items.map((poll) => (
          <div
            key={poll.id}
            className="rounded-xl border border-fire-red/15 bg-black/30 p-4"
          >
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold border border-fire-red/25 rounded px-1.5 py-0.5 text-fire-red-light">
                {poll.status}
                {poll.open ? " · open" : ""}
              </span>
              <span className="text-xs text-muted font-mono">{poll.id}</span>
            </div>
            <p className="text-sm font-medium text-warm-white mb-2">
              {poll.question}
            </p>
            <ul className="text-xs text-muted space-y-1 mb-3">
              {poll.options.map((o) => (
                <li key={o.id}>
                  {o.label}
                  {poll.status !== "draft" && poll.total > 0
                    ? ` — ${poll.counts[o.id] || 0} (${Math.round(
                        ((poll.counts[o.id] || 0) / poll.total) * 100
                      )}%)`
                    : ""}
                </li>
              ))}
            </ul>
            {poll.status !== "draft" && (
              <p className="text-xs text-muted mb-3">
                {poll.total} vote{poll.total === 1 ? "" : "s"}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {(poll.status === "draft" || poll.status === "closed") && (
                <button
                  type="button"
                  disabled={busyId === poll.id}
                  onClick={() => onActivate(poll.id)}
                  className="text-xs font-semibold rounded-lg bg-fire-red/90 hover:bg-fire-red text-white px-3 py-1.5 disabled:opacity-50"
                >
                  Activate
                </button>
              )}
              {poll.status === "active" && (
                <button
                  type="button"
                  disabled={busyId === poll.id}
                  onClick={() => onClose(poll.id)}
                  className="text-xs font-semibold rounded-lg border border-fire-red/40 text-fire-red-light px-3 py-1.5 disabled:opacity-50"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
