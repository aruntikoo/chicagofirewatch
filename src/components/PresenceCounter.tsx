"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cfw_presence_id";
const HEARTBEAT_MS = 20_000;

function getOrCreateSessionId(): string {
  try {
    const existing = sessionStorage.getItem(STORAGE_KEY);
    if (existing && existing.length >= 8) return existing;
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID().replace(/-/g, "")
        : `s${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(STORAGE_KEY, id);
    return id;
  } catch {
    return `s${Date.now().toString(36)}`;
  }
}

export default function PresenceCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const sessionId = getOrCreateSessionId();
    let cancelled = false;

    async function heartbeat() {
      if (typeof document !== "undefined" && document.visibilityState === "hidden") {
        return;
      }
      try {
        const res = await fetch("/api/presence", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        if (!res.ok || cancelled) return;
        const data = await res.json();
        if (typeof data.count === "number" && !cancelled) {
          setCount(data.count);
        }
      } catch {
        // Silent fail — counter is non-critical
      }
    }

    heartbeat();
    const interval = setInterval(heartbeat, HEARTBEAT_MS);

    const onVisibility = () => {
      if (document.visibilityState === "visible") heartbeat();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  if (count === null) {
    return null;
  }

  const label =
    count === 1 ? "1 watching live" : `${count} watching live`;

  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fire-red/15 border border-fire-red/30"
      title="People currently on this page"
    >
      <span className="w-2 h-2 rounded-full bg-fire-red live-badge shrink-0" />
      <span className="text-xs sm:text-sm font-semibold text-fire-red-light tabular-nums">
        {label}
      </span>
    </div>
  );
}
