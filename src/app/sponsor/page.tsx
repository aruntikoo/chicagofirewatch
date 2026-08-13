import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SponsorInterestForm from "@/components/SponsorInterestForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sponsor | Chicago Fire Watch",
  description:
    "Sponsor the independent live cam of the Chicago Fire FC stadium construction at The 78. Reach engaged Fire fans watching the build in real time.",
};

const tiers = [
  {
    name: "Founding",
    price: "$99",
    period: "/mo",
    when: "Early construction (now)",
    term: "3-month minimum · rate locked",
    highlight: true,
  },
  {
    name: "Rising",
    price: "$199",
    period: "/mo",
    when: "Structure visibly rising",
    term: "Month-to-month or 3-month",
    highlight: false,
  },
  {
    name: "Opening",
    price: "$349",
    period: "/mo",
    when: "Final stretch + opening season",
    term: "Month-to-month or short campaigns",
    highlight: false,
  },
];

export default function SponsorPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="py-12 md:py-16 border-b border-fire-red/15">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-fire-red-light mb-3">
              Sponsorship
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-warm-white mb-4">
              Sponsor the Chicago Fire Stadium Live Cam
            </h1>
            <p className="text-muted text-base sm:text-lg leading-relaxed">
              Put your brand in front of engaged Chicago Fire fans watching the new
              stadium rise at The 78 — the only independent live view of the build.
            </p>
          </div>
        </section>

        {/* Why */}
        <section className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-warm-white mb-6 text-center">
              Why sponsor
            </h2>
            <ul className="space-y-3 text-muted">
              <li className="flex gap-3">
                <span className="text-fire-red-light shrink-0">●</span>
                <span>Niche, high-intent audience — Fire fans and local Chicago interest</span>
              </li>
              <li className="flex gap-3">
                <span className="text-fire-red-light shrink-0">●</span>
                <span>Long dwell time — viewers leave the live cam on while following progress</span>
              </li>
              <li className="flex gap-3">
                <span className="text-fire-red-light shrink-0">●</span>
                <span>Unique placement next to a view no one else has</span>
              </li>
              <li className="flex gap-3">
                <span className="text-fire-red-light shrink-0">●</span>
                <span>Clean page — limited spots so each sponsor stands out</span>
              </li>
            </ul>
          </div>
        </section>

        {/* What's included */}
        <section className="py-12 md:py-16 bg-charcoal/50 border-y border-fire-red/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-warm-white mb-6 text-center">
              What's included
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted">
              <li className="rounded-lg border border-white/5 bg-background/40 px-4 py-3">
                Banner under the live player (desktop + mobile)
              </li>
              <li className="rounded-lg border border-white/5 bg-background/40 px-4 py-3">
                Direct link to your site or offer
              </li>
              <li className="rounded-lg border border-white/5 bg-background/40 px-4 py-3">
                Clear sponsor labeling
              </li>
              <li className="rounded-lg border border-white/5 bg-background/40 px-4 py-3">
                Start/end confirmation by email + screenshot when live
              </li>
            </ul>
            <p className="mt-4 text-xs text-muted text-center">
              You send a logo + URL; we place a clean banner that matches the site. Or supply a finished creative that meets our size specs.
            </p>
          </div>
        </section>

        {/* Rate card */}
        <section className="py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-warm-white mb-2 text-center">
              Rate card
            </h2>
            <p className="text-muted text-sm text-center mb-10 max-w-xl mx-auto">
              Rates rise as construction advances and viewership grows. Founding sponsors lock in the lowest rate.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tiers.map((t) => (
                <div
                  key={t.name}
                  className={`rounded-xl p-6 text-center border ${
                    t.highlight
                      ? "border-fire-red/50 bg-fire-red/10 shadow-lg shadow-fire-red/10"
                      : "border-fire-red/15 bg-charcoal/80"
                  }`}
                >
                  {t.highlight && (
                    <p className="text-[10px] uppercase tracking-widest text-fire-red-light font-semibold mb-2">
                      Best for early supporters
                    </p>
                  )}
                  <h3 className="text-lg font-bold text-warm-white mb-1">{t.name}</h3>
                  <p className="text-3xl font-bold text-warm-white">
                    {t.price}
                    <span className="text-base font-medium text-muted">{t.period}</span>
                  </p>
                  <p className="text-sm text-muted mt-3">{t.when}</p>
                  <p className="text-xs text-muted/80 mt-2">{t.term}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted text-center">
              Optional: “Presented by” mention near the player +$100–150/mo · 3-month prepaid 10% off
            </p>
          </div>
        </section>

        {/* Form */}
        <section id="request" className="py-12 md:py-16 bg-charcoal/40 border-t border-fire-red/10">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-warm-white mb-2 text-center">
              Request a spot
            </h2>
            <p className="text-muted text-sm text-center mb-8">
              Tell us about your brand. We'll follow up with availability and payment details.
            </p>
            <SponsorInterestForm />
          </div>
        </section>

        <section className="py-8 text-center">
          <Link href="/" className="text-sm text-fire-red-light hover:underline">
            ← Back to the live cam
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
