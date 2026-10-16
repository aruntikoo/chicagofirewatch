// Promo banner for the maker's other product (myRecruitingBoard).
// The waitlist is free: do not add prices or payment language here.
// TODO: when myrecruitingboard.com is live, change WAITLIST_URL's host to it.
const WAITLIST_URL =
  "https://recruiting-crm-seven.vercel.app/?waitlist=1&utm_source=chicagofirewatch&utm_medium=banner";

// Fades the photo in over its first ~260px so the headline can sit on top of it.
const FADE =
  "linear-gradient(90deg, transparent 0px, rgba(0,0,0,0.55) 130px, #000 270px)";

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
        {/* Phones: photo fills the card, dimmed, text on top */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40 sm:hidden bg-cover bg-[position:80%_center]"
          style={{ backgroundImage: "url(/images/banner-kick-tall.webp)" }}
        />

        <div className="relative flex flex-col sm:flex-row sm:items-stretch sm:h-[240px]">
          <div className="relative z-10 flex flex-col items-center sm:items-start justify-center gap-3 px-6 py-6 sm:pl-8 sm:pr-0 min-h-[280px] sm:min-h-0 sm:max-w-xl sm:shrink">
            <div className="text-center sm:text-left">
              <p className="text-warm-white font-semibold text-xl sm:text-2xl leading-snug">
                Know a high school athlete chasing a college roster spot?
              </p>
              <p className="text-warm-white/80 text-base mt-1.5">
                <span className="text-warm-white font-medium">myRecruitingBoard</span>{" "}
                helps families track schools, programs, and communication with coaches.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 px-6 py-3 rounded-lg bg-fire-red group-hover:bg-fire-red-light text-white text-base font-semibold whitespace-nowrap shadow-lg shadow-fire-red/25 transition-colors">
              Join the waitlist <span aria-hidden="true">→</span>
            </span>
          </div>

          {/* Desktop: photo starts under the end of the text (-ml-40) and always shows whole.
              The strip to its right stretches the photo's last pixel column, so the grass and
              the white line keep going on wide screens instead of leaving a gap. */}
          <div
            aria-hidden="true"
            className="hidden sm:flex flex-1 min-w-[352px] -ml-40"
            style={{ WebkitMaskImage: FADE, maskImage: FADE }}
          >
            <div
              className="h-full shrink-0 bg-contain bg-left bg-no-repeat"
              style={{
                aspectRatio: "1200 / 821",
                backgroundImage: "url(/images/banner-kick-tall.webp)",
              }}
            />
            <div
              className="h-full flex-1"
              style={{
                backgroundImage: "url(/images/banner-kick-edge.webp)",
                backgroundSize: "100% 100%",
              }}
            />
          </div>
        </div>
      </a>
    </div>
  );
}
