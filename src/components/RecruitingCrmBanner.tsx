// Promo banner for Recruiting CRM, a separate project by the same maker.
// utm_source=chicagofirewatch tags every waitlist sign-up that comes from this banner,
// so the Waitlist tab in the Recruiting CRM admin shows how many came from here.
// The waitlist is free. Do not add prices or payment language here (Vercel Hobby plan terms).

const WAITLIST_URL =
  "https://recruiting-crm-seven.vercel.app/?waitlist=1&utm_source=chicagofirewatch&utm_medium=banner";

export default function RecruitingCrmBanner() {
  return (
    <div className="mt-6">
      <p className="text-[10px] uppercase tracking-widest text-muted/70 text-center mb-2">
        From the maker of this site
      </p>
      <a
        href={WAITLIST_URL}
        target="_blank"
        rel="noopener"
        className="group block w-full rounded-lg border border-fire-red/40 bg-charcoal/80 hover:border-fire-red/70 hover:bg-charcoal transition-colors"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 px-6 py-6 min-h-[96px] sm:min-h-[100px]">
          <div className="text-center sm:text-left">
            <p className="text-warm-white font-semibold text-base sm:text-lg leading-snug">
              Know a high school athlete chasing a college roster spot?
            </p>
            <p className="text-muted text-sm mt-1">
              <span className="text-warm-white/90 font-medium">Recruiting CRM</span>{" "}
              helps families track schools, coaches and deadlines. Free early access.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 px-5 py-2.5 rounded-lg bg-fire-red group-hover:bg-fire-red-light text-white text-sm font-semibold whitespace-nowrap shadow-lg shadow-fire-red/25 transition-colors">
            Join the waitlist <span aria-hidden="true">→</span>
          </span>
        </div>
      </a>
    </div>
  );
}
