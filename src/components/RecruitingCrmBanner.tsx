// Promo banner for the maker's other product (myRecruitingBoard).
// The waitlist is free: do not add prices or payment language here.
// TODO: when myrecruitingboard.com is live, change WAITLIST_URL's host to it.
const WAITLIST_URL =
  "https://recruiting-crm-seven.vercel.app/?waitlist=1&utm_source=chicagofirewatch&utm_medium=banner";

const FADE = "linear-gradient(90deg, transparent 0%, #000 30%)";

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
        className="group relative block w-full overflow-hidden rounded-lg border border-fire-red/40 bg-charcoal hover:border-fire-red/70 transition-colors"
      >
        {/* Photo: 350px wide on the right at desktop (shows both legs, glove and ball), full width and dimmed on phones */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-full opacity-40 sm:w-[350px] sm:opacity-100 bg-cover bg-[position:80%_center] sm:bg-center"
          style={{
            backgroundImage: "url(/images/banner-kick-tall.webp)",
            WebkitMaskImage: FADE,
            maskImage: FADE,
          }}
        />
        <div className="relative flex flex-col items-center sm:items-start justify-center gap-3 px-6 py-6 sm:pl-8 sm:pr-6 min-h-[280px] sm:h-[240px] sm:min-h-0 sm:w-[56%]">
          <div className="text-center sm:text-left">
            <p className="text-warm-white font-semibold text-lg sm:text-xl leading-snug">
              Know a high school athlete chasing a college roster spot?
            </p>
            <p className="text-warm-white/75 text-sm mt-1">
              <span className="text-warm-white font-medium">myRecruitingBoard</span>{" "}
              helps families track schools, programs, and communication with coaches.
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
