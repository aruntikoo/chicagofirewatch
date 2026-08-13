"use client";

import { useState, FormEvent } from "react";

const CONTACT_EMAIL = "arun.tikoo@gmail.com";

export default function SponsorInterestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [tier, setTier] = useState("Founding");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const subject = encodeURIComponent(
      `CFW Sponsorship Interest — ${business.trim() || name.trim()}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${name.trim()}`,
        `Business: ${business.trim() || "—"}`,
        `Email: ${email.trim()}`,
        `Website: ${website.trim() || "—"}`,
        `Tier interest: ${tier}`,
        "",
        "Message:",
        message.trim() || "—",
      ].join("\n")
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-fire-red/30 bg-charcoal/80 p-8 text-center">
        <h3 className="text-xl font-bold text-warm-white mb-2">Thanks for your interest</h3>
        <p className="text-muted text-sm max-w-md mx-auto">
          Your email client should open with a pre-filled message. Send it and we&apos;ll
          follow up with availability, dates, and payment details.
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
    <form onSubmit={handleSubmit} className="rounded-xl border border-fire-red/20 bg-charcoal/80 p-6 sm:p-8 space-y-5">
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

      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-3 rounded-lg bg-fire-red hover:bg-fire-red-light text-white font-semibold text-sm transition-colors"
      >
        Request a sponsorship spot
      </button>
      <p className="text-xs text-muted">
        We&apos;ll reply with availability and a Stripe payment link. Limited spots to keep the page clean.
      </p>
    </form>
  );
}
