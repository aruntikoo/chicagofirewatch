import Link from "next/link";

// The original "Sponsor this live cam" banner. Shown only when SPONSORSHIPS_ENABLED is true
// (src/lib/features.ts). While it is off, LivePlayer shows the Recruiting CRM banner instead.
export default function SponsorBanner() {
  return (
    <div className="mt-6">
      <p className="text-[10px] uppercase tracking-widest text-muted/70 text-center mb-2">
        Advertisement
      </p>
      <Link
        href="/sponsor"
        className="group block w-full rounded-lg border border-dashed border-fire-red/35 bg-charcoal/70 hover:border-fire-red/55 hover:bg-charcoal/90 transition-colors"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 px-6 py-7 sm:py-8 min-h-[96px] sm:min-h-[100px]">
          <span className="text-warm-white font-medium text-base sm:text-lg text-center">
            Sponsor this live cam — Reach Chicago Fire fans
          </span>
          <span className="text-fire-red-light text-sm sm:text-base font-semibold group-hover:underline whitespace-nowrap">
            Learn more →
          </span>
        </div>
      </Link>
    </div>
  );
}
