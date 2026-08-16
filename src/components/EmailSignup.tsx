"use client";

import { useState, FormEvent } from "react";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
      setMessage(data.message || "Thanks for joining.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3">
        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
        <p className="text-sm text-warm-white">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label htmlFor="community-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            id="community-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-black/40 border border-fire-red/25 text-warm-white placeholder:text-muted/60 text-sm focus:outline-none focus:border-fire-red/50"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-fire-red hover:bg-fire-red-light text-white text-sm font-semibold transition-colors disabled:opacity-60"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Joining…
            </>
          ) : (
            "Get Updates"
          )}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-xs text-red-400">{message}</p>
      )}
      <p className="mt-2 text-xs text-muted/70">
        Occasional updates on live stream status, major milestones, and new
        timelapse videos. No spam.
      </p>
    </form>
  );
}
