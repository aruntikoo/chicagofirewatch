import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PartnerInterestForm from "@/components/PartnerInterestForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Retail Partners | Chicago Fire Watch",
  description:
    "Partner your online store with Chicago Fire Watch. Reach Fire fans watching the stadium rise at The 78 via affiliate or hybrid retail partnerships.",
};

 cons options = [
  {
    name: "Affiliate",
    detail: "Featured Shop link + optional code · you pay a % of tracked sales",
  },
  {
    name: "Hybrid",
    detail: "Small monthly feature fee and/or higher % — your choice",
  },
  {
    name: "Sponsor + shop",
    detail: "Banner on the live page and a merch link (can combine with ad sponsorship)",
  },
];

export default function PartnersPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="py-12 md:py-16 border-b border-fire-red/15">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-fire-red-light mb-3">
              Retail partners
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-warm-white mb-4">
              Partner your store with Chicago Fire Watch
            </h1>
            <p className="text-muted text-base sm:text-lg leading-relaxed mb-8">
              Put your Fire and soccer gear in front of fans already watching the new
              stadium rise at The 78.
            </p>
            <a
              href="#propose"
              className="inline-flex px-6 py-3 rounded-lg bg-fire-red hover:bg-fire-red-light text-white font-semibold text-sm transition-colors"
            >
              Propose a partnership
            </a>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-warm-white mb-6 text-center">
              Why partner
            </h2>
            <ul className="space-y-3 text-muted">
              <li className="flex gap-3">
                <span className="text-fire-red-light shrink-0">●</span>
                <span>Engaged Chicago Fire and local fans with long dwell time on the live cam</span>
              </li>
              <li className="flex gap-3">
                <span className="text-fire-red-light shrink-0">●</span>
                <span>Simple placement: merch card and optional homepage mention</span>
              </li>
              <li className="flex gap-3">
                <span className="text-fire-red-light shrink-0">●</span>
                <span>Tracked traffic via unique link or checkout code</span>
              </li>
              <li className="flex gap-3">
                <span className="text-fire-red-light shrink-0">●</span>
                <span>No inventory, ads, or technical work required on your side</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-charcoal/50 border-y border-fire-red/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-warm-white mb-8 text-center">
              How it works
            </h2>
            <ol className="space-y-6 text-muted">
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fire-red/20 text-fire-red-light text-sm font-bold">
                  1
                </span>
                <span className="pt-1">
                  You share a product or collection URL (and optional discount or tracking code).
                </span>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fire-red/20 text-fire-red-light text-sm font-bold">
                  2
                </span>
                <span className="pt-1">We feature it on chicagofirewatch.com.</span>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fire-red/20 text-fire-red-light text-sm font-bold">
                  3
                </span>
                <span className="pt-1">
                  You report sales from that link or code monthly; we settle on the agreed %.
                </span>
              </li>
            </ol>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-warm-white mb-2 text-center">
              Partnership options
            </h2>
            <p className="text-muted text-sm text-center mb-10 max-w-xl mx-auto">
              Official Fire crest products stay on your licensed store — CFW only sends traffic.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {options.map((o) => (
                <div
                  key={o.name}
                  className="rounded-xl border border-fire-red/15 bg-charcoal/80 p-6 text-center"
                >
                  <h3 className="text-lg font-bold text-warm-white mb-2">{o.name}</h3>
                  <p className="text-sm text-muted">{o.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-charcoal/40 border-t border-fire-red/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-warm-white mb-6 text-center">
              What we need from you
            </h2>
            <ul className="space-y-3 text-muted mb-4">
              <li className="flex gap-3">
                <span className="text-fire-red-light shrink-0">●</span>
                <span>A working online store</span>
              </li>
              <li className="flex gap-3">
                <span className="text-fire-red-light shrink-0">●</span>
                <span>Ability to create a unique link and/or discount code</span>
              </li>
              <li className="flex gap-3">
                <span className="text-fire-red-light shrink-0">●</span>
                <span>
                  Monthly report of coded or linked orders (spreadsheet or dashboard export is fine)
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section id="propose" className="py-12 md:py-16 border-t border-fire-red/10">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-warm-white mb-2 text-center">
              Propose a partnership
            </h2>
            <p className="text-muted text-sm text-center mb-8">
              Tell us about your shop. We&apos;ll reply with next steps and tracking options.
            </p>
            <PartnerInterestForm />
          </div>
        </section>

        <section className="py-8 text-center space-y-3">
          <p className="text-sm text-muted">
            Looking for ad sponsorship instead?{" "}
            <Link href="/sponsor" className="text-fire-red-light hover:underline">
              See sponsorship options
            </Link>
          </p>
          <Link href="/" className="block text-sm text-fire-red-light hover:underline">
            ← Back to the live cam
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
