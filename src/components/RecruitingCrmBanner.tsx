// Promo banner for the maker's other product (myRecruitingBoard).
// The waitlist is free: do not add prices or payment language here.
// TODO: when myrecruitingboard.com is live, change WAITLIST_URL's host to it.
import type { CSSProperties } from "react";

const WAITLIST_URL =
  "https://recruiting-crm-seven.vercel.app/?waitlist=1&utm_source=chicagofirewatch&utm_medium=banner";

// Desktop layout (lg and up). The banner is 240px tall; the photo is scaled to that height.
// Panorama = the goalkeeper photo with grass extended 2400px on the left and 12000px on the
// right (source px), so green shows on both sides of the player at any window width.
const PHOTO_W = 351; // photo width at 240px tall (1200x821 source)
const PANO_LEFT = 702; // grass to the left of the photo in the panorama, in css px
const PANO_W = 4560; // whole panorama width in css px

// --a is where the player's photo starts: 148px after the text block, or pulled left so the
// whole photo still fits when the window is narrow.
const LAYER_VARS = {
  "--a": `min(700px, calc(100% - ${PHOTO_W}px))`,
  // grass fades in from 320px before the photo so the end of the headline sits on it
  WebkitMaskImage:
    "linear-gradient(90deg, transparent calc(var(--a) - 320px), rgba(0,0,0,0.5) calc(var(--a) - 150px), #000 calc(var(--a) + 20px))",
  maskImage:
    "linear-gradient(90deg, transparent calc(var(--a) - 320px), rgba(0,0,0,0.5) calc(var(--a) - 150px), #000 calc(var(--a) + 20px))",
} as CSSProperties;

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
        {/* Phones and tablets: photo fills the card, dimmed, text on top */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40 lg:hidden bg-cover bg-[position:80%_center]"
          style={{ backgroundImage: "url(/images/banner-kick-tall.webp)" }}
        />

        {/* Desktop: panorama layer, positioned from --a */}
        <div aria-hidden="true" className="absolute inset-0 hidden lg:block" style={LAYER_VARS}>
          <div
            className="absolute top-0 h-full bg-no-repeat"
            style={{
              left: `calc(var(--a) - ${PANO_LEFT}px)`,
              width: PANO_W,
              backgroundImage: "url(/images/banner-kick-pano.webp)",
              backgroundSize: "100% 100%",
            }}
          />
        </div>

        <div className="relative flex flex-col items-center lg:items-start justify-center gap-3 px-6 py-6 lg:pl-8 lg:pr-0 min-h-[280px] lg:min-h-0 lg:h-[240px] lg:w-[552px]">
          <div className="text-center lg:text-left">
            <p className="text-warm-white font-semibold text-xl lg:text-2xl leading-snug">
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
      </a>
    </div>
  );
}
