"use client";

import { useState, FormEvent } from "react";

export default function SponsorInterestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [tier, setTier] = useState("Founding");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/sponsor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          business: business.trim(),
          email: email.trim(),
          website: website.trim(),
          tier,
          message: message.trim(),
          company_url: honeypot,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(
          typeof data.error === "string"
            ? data.error
            : "Something went wrong. Please try again."
        );
        return;
      }

      setSubmitted(true);
      setName("");
      setBusiness("");
      setEmail("");
      setWebsite("");
      setTier("Founding");
      setMessage("");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-fire-red/30 bg-charcoal/80 p-8 text-center">
        <h3 className="text-xl font-bold text-warm-white mb-2">Thanks for your interest</h3>
        <p className="text-muted text-sm max-w-md mx-auto">
          We received your request and will follow up with availability, dates, and
          payment details.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm text-fire-red-light hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-fire-red/20 bg-charcoal/80 p-6 sm:p-8 space-y-5"
    >
      {/* Honeypot — hidden from users */}
      <div className="absolute -left-[9999px] opacity-0 h-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company_url">Company URL</label>
        <input
          id="company_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-xs uppercase tracking-wider text-muted mb-1.5">
            Name <span className="text-fire-red-light">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg bg-background border border-white/10 px-3 py-2.5 text-sm text-warm-white placeholder:text-muted/50 focus:outline-none focus:border-fire-red/50"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="business" className="block text-xs uppercase tracking-wider text-muted mb-1.5">
            Business / organization
          </label>
          <input
            id="business"
            type="text"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            className="w-full rounded-lg bg-background border border-white/10 px-3 py-2.5 text-sm text-warm-white placeholder:text-muted/50 focus:outline-none focus:border-fire-red/50"
            placeholder="Company name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-xs uppercase tracking-wider text-muted mb-1.5">
            Email <span className="text-fire-red-light">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-background border border-white/10 px-3 py-2.5 text-sm text-warm-white placeholder:text-muted/50 focus:outline-none focus:border-fire-red/50"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label htmlFor="website" className="block text-xs uppercase tracking-wider text-muted mb-1.5">
            Website
          </label>
          <input
            id="website"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full rounded-lg bg-background border border-white/10 px-3 py-2.5 text-sm text-warm-white placeholder:text-muted/50 focus:outline-none focus:border-fire-red/50"
            placeholder="https://"
          />
        </div>
      </div>

      <div>
        <label htmlFor="tier" className="block text-xs uppercase tracking-wider text-muted mb-1.5">
          Tier interest
        </label>
        <select
          id="tier"
          value={tier}
          onChange={(e) => setTier(e.target.value)}
          className="w-full rounded-lg bg-background border border-white/10 px-3 py-2.5 text-sm text-warm-white focus:outline-none focus:border-fire-red/50"
        >
          <option value="Founding">Founding — $99/mo (3-month minimum)</option>
          <option value="Rising">Rising — $199/mo</option>
          <option value="Opening">Opening — $349/mo</option>
          <option value="Not sure">Not sure yet</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs uppercase tracking-wider text-muted mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-lg bg-background border border-white/10 px-3 py-2.5 text-sm text-warm-white placeholder:text-muted/50 focus:outline-none focus:border-fire-red/50 resize-y"
          placeholder="Tell us about your brand or preferred start date…"
        />
      </div>

      {error && (
        <p className="text-sm text-fire-red-light" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto px-6 py-3 rounded-lg bg-fire-red hover:bg-fire-red-light disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
      >
        {loading ? "Sending…" : "Request a sponsorship spot"}
      </button>
      <p className="text-xs text-muted">
        We&apos;ll reply with availability and a Stripe payment link. Limited spots to keep the page clean.
      </p>
    </form>
  );
}
