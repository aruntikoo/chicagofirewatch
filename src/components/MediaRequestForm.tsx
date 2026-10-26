"use client";

import { useState, FormEvent } from "react";

const ASSET_OPTIONS = [
  "Still",
  "Clip",
  "Monthly timelapse",
  "Full timelapse",
  "Other",
] as const;

export default function MediaRequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [outletName, setOutletName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [story, setStory] = useState("");
  const [assets, setAssets] = useState<string[]>([]);
  const [intendedUse, setIntendedUse] = useState("");
  const [deadline, setDeadline] = useState("");
  const [notes, setNotes] = useState("");
  const [acknowledgement, setAcknowledgement] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  function toggleAsset(asset: string) {
    setAssets((prev) =>
      prev.includes(asset) ? prev.filter((a) => a !== asset) : [...prev, asset]
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (
      !outletName.trim() ||
      !contactName.trim() ||
      !email.trim() ||
      !story.trim() ||
      assets.length === 0 ||
      !intendedUse.trim() ||
      !deadline ||
      !acknowledgement
    ) {
      setError("Please fill all required fields, select at least one asset, and accept the terms.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/media-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          outletName: outletName.trim(),
          contactName: contactName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          story: story.trim(),
          assets,
          intendedUse: intendedUse.trim(),
          deadline,
          notes: notes.trim(),
          acknowledgement,
          company_url: honeypot,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(
          typeof data.error === "string"
            ? `${data.error} If this keeps happening, email press@chicagofirewatch.com.`
            : "Something went wrong. Please email press@chicagofirewatch.com."
        );
        return;
      }

      setSubmitted(true);
      setOutletName("");
      setContactName("");
      setEmail("");
      setPhone("");
      setStory("");
      setAssets([]);
      setIntendedUse("");
      setDeadline("");
      setNotes("");
      setAcknowledgement(false);
    } catch {
      setError(
        "Network error. Please check your connection and try again, or email press@chicagofirewatch.com."
      );
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-fire-red/30 bg-charcoal/80 p-8 text-center">
        <h3 className="text-xl font-bold text-warm-white mb-2">Thanks — your request is in</h3>
        <p className="text-muted text-sm max-w-md mx-auto">
          We'll reply within a few hours during 7am–6pm CT. If your deadline is urgent, email{" "}
          <a href="mailto:press@chicagofirewatch.com" className="text-fire-red-light hover:underline">
            press@chicagofirewatch.com
          </a>
          .
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

  const inputClass =
    "w-full rounded-lg bg-background border border-white/10 px-3 py-2.5 text-sm text-warm-white placeholder:text-muted/50 focus:outline-none focus:border-fire-red/50";
  const labelClass = "block text-xs uppercase tracking-wider text-muted mb-1.5";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-fire-red/20 bg-charcoal/80 p-6 sm:p-8 space-y-5"
    >
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
          <label htmlFor="outletName" className={labelClass}>
            Outlet name <span className="text-fire-red-light">*</span>
          </label>
          <input
            id="outletName"
            type="text"
            required
            value={outletName}
            onChange={(e) => setOutletName(e.target.value)}
            className={inputClass}
            placeholder="News outlet or organization"
          />
        </div>
        <div>
          <label htmlFor="contactName" className={labelClass}>
            Contact name <span className="text-fire-red-light">*</span>
          </label>
          <input
            id="contactName"
            type="text"
            required
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            className={inputClass}
            placeholder="Your name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-fire-red-light">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="you@outlet.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            placeholder="Optional"
          />
        </div>
      </div>

      <div>
        <label htmlFor="story" className={labelClass}>
          Story / topic <span className="text-fire-red-light">*</span>
        </label>
        <input
          id="story"
          type="text"
          required
          value={story}
          onChange={(e) => setStory(e.target.value)}
          className={inputClass}
          placeholder="Brief description of the story"
        />
      </div>

      <div>
        <span className={labelClass}>
          Assets wanted <span className="text-fire-red-light">*</span> (select at least one)
        </span>
        <div className="space-y-2 mt-1">
          {ASSET_OPTIONS.map((asset) => (
            <label key={asset} className="flex items-center gap-2 text-sm text-warm-white cursor-pointer">
              <input
                type="checkbox"
                checked={assets.includes(asset)}
                onChange={() => toggleAsset(asset)}
                className="rounded border-white/20 bg-background text-fire-red focus:ring-fire-red"
              />
              {asset}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="intendedUse" className={labelClass}>
          Intended use and platforms <span className="text-fire-red-light">*</span>
        </label>
        <textarea
          id="intendedUse"
          rows={3}
          required
          value={intendedUse}
          onChange={(e) => setIntendedUse(e.target.value)}
          className={`${inputClass} resize-y`}
          placeholder="e.g. TV segment, website article, social posts"
        />
      </div>

      <div>
        <label htmlFor="deadline" className={labelClass}>
          Deadline <span className="text-fire-red-light">*</span>
        </label>
        <input
          id="deadline"
          type="date"
          required
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="notes" className={labelClass}>
          Notes
        </label>
        <textarea
          id="notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className={`${inputClass} resize-y`}
          placeholder="Anything else we should know"
        />
      </div>

      <label className="flex items-start gap-2 text-sm text-warm-white cursor-pointer">
        <input
          type="checkbox"
          required
          checked={acknowledgement}
          onChange={(e) => setAcknowledgement(e.target.checked)}
          className="mt-1 rounded border-white/20 bg-background text-fire-red focus:ring-fire-red"
        />
        <span>
          I agree to credit 'Courtesy Chicago Fire Watch / chicagofirewatch.com' and to the license terms above.{" "}
          <span className="text-fire-red-light">*</span>
        </span>
      </label>

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
        {loading ? "Sending…" : "Submit media request"}
      </button>
    </form>
  );
}
