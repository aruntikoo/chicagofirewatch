"use client";

import { useState, FormEvent } from "react";

export default function PartnerInterestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeUrl, setStoreUrl] = useState("");
  const [whatYouSell, setWhatYouSell] = useState("");
  const [partnershipInterest, setPartnershipInterest] = useState("Affiliate");
  const [monthlyVisitors, setMonthlyVisitors] = useState("");
  const [trackingReady, setTrackingReady] = useState("Yes");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim() || !storeName.trim() || !storeUrl.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          storeName: storeName.trim(),
          storeUrl: storeUrl.trim(),
          whatYouSell,
          partnershipInterest,
          monthlyVisitors: monthlyVisitors.trim(),
          trackingReady,
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
      setEmail("");
      setStoreName("");
      setStoreUrl("");
      setWhatYouSell("");
      setPartnershipInterest("Affiliate");
      setMonthlyVisitors("");
      setTrackingReady("Yes");
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
        <h3 className="text-xl font-bold text-warm-white mb-2">Thanks — we got it</h3>
        <p className="text-muted text-sm max-w-md mx-auto">
          We received your request and will follow up by email with next steps.
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
          <label htmlFor="name" className={labelClass}>
            Contact name <span className="text-fire-red-light">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Your name"
          />
        </div>
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
            placeholder="you@store.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="storeName" className={labelClass}>
            Business / store name <span className="text-fire-red-light">*</span>
          </label>
          <input
            id="storeName"
            type="text"
            required
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className={inputClass}
            placeholder="Store name"
          />
        </div>
        <div>
          <label htmlFor="storeUrl" className={labelClass}>
            Website / store URL <span className="text-fire-red-light">*</span>
          </label>
          <input
            id="storeUrl"
            type="url"
            required
            value={storeUrl}
            onChange={(e) => setStoreUrl(e.target.value)}
            className={inputClass}
            placeholder="https://"
          />
        </div>
      </div>

      <div>
        <label htmlFor="whatYouSell" className={labelClass}>
          What you sell
        </label>
        <select
          id="whatYouSell"
          value={whatYouSell}
          onChange={(e) => setWhatYouSell(e.target.value)}
          className={inputClass}
        >
          <option value="">Select…</option>
          <option value="Officially licensed Chicago Fire / MLS gear">
            Officially licensed Chicago Fire / MLS gear
          </option>
          <option value="Soccer equipment & apparel">Soccer equipment &amp; apparel</option>
          <option value="Fan scarves / supporter gear">Fan scarves / supporter gear</option>
          <option value="General Chicago sports merch">General Chicago sports merch</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="partnershipInterest" className={labelClass}>
            Partnership interest
          </label>
          <select
            id="partnershipInterest"
            value={partnershipInterest}
            onChange={(e) => setPartnershipInterest(e.target.value)}
            className={inputClass}
          >
            <option value="Affiliate">Affiliate (% of tracked sales)</option>
            <option value="Hybrid">Hybrid (fee and/or %)</option>
            <option value="Not sure">Not sure yet</option>
            <option value="Also banner ads">Also interested in banner ads</option>
          </select>
        </div>
        <div>
          <label htmlFor="trackingReady" className={labelClass}>
            Can you provide a tracking link or coupon code?
          </label>
          <select
            id="trackingReady"
            value={trackingReady}
            onChange={(e) => setTrackingReady(e.target.value)}
            className={inputClass}
          >
            <option value="Yes">Yes</option>
            <option value="Not yet">Not yet</option>
            <option value="Unsure">Unsure</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="monthlyVisitors" className={labelClass}>
          Approximate monthly site visitors (optional)
        </label>
        <input
          id="monthlyVisitors"
          type="text"
          value={monthlyVisitors}
          onChange={(e) => setMonthlyVisitors(e.target.value)}
          className={inputClass}
          placeholder="e.g. 5,000"
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-y`}
          placeholder="Product focus, timing, or anything else we should know…"
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
        {loading ? "Sending…" : "Submit partnership request"}
      </button>
      <p className="text-xs text-muted">
        We&apos;ll reply with tracking options and next steps.
      </p>
    </form>
  );
}
