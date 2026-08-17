import Link from "next/link";
import EmailSignup from "@/components/EmailSignup";
import ViewerPoll from "@/components/ViewerPoll";
import PastPolls from "@/components/PastPolls";

export default function CommunityShop() {
  const supportUrl = "https://donate.stripe.com/6oU28q0vs233554h287Re00";

  return (
    <>
      <section id="community" className="pt-16 md:pt-20 pb-8 md:pb-10 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-warm-white mb-3">
              Community
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Stay close to the build. Get notified about live streams, major
              milestones, and new timelapse videos — and share what you are most
              excited to see.
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid gap-6 md:grid-cols-2">
            <div className="steel-border rounded-xl bg-charcoal/80 p-6">
              <div className="w-12 h-12 mb-4 rounded-full bg-fire-red/20 flex items-center justify-center">
                <span className="text-2xl">🔥</span>
              </div>
              <h3 className="text-lg font-bold text-warm-white mb-2">
                Join the Watch List
              </h3>
              <p className="text-sm text-muted mb-5">
                Occasional emails when the cam is live, when a major phase is
                completed, or when a new cumulative timelapse is published.
              </p>
              <EmailSignup />
            </div>

            <ViewerPoll />
          </div>

          <PastPolls />
        </div>
      </section>

      <section id="shop" className="pt-8 md:pt-10 pb-16 md:pb-20 brick-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-warm-white mb-2">
              Support the Watch
            </h2>
            <p className="text-sm text-muted max-w-xl mx-auto">
              Tips, merch partners, and sponsorships keep the live view running.
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="steel-border rounded-xl bg-charcoal/90 p-5 text-center hover:border-fire-red/40 transition-colors flex flex-col">
              <h3 className="text-base font-bold text-warm-white mb-1.5">
                Merch
              </h3>
              <p className="text-xs text-muted mb-4 flex-1">
                Retail partners: reach Fire fans here.
              </p>
              <Link
                href="/partners"
                className="inline-block px-3 py-2 rounded-lg border border-fire-red/40 text-fire-red-light hover:bg-fire-red/10 text-xs font-medium transition-colors"
              >
                Partner with us
              </Link>
            </div>

            <div className="steel-border rounded-xl bg-charcoal/90 p-5 text-center hover:border-fire-red/40 transition-colors flex flex-col">
              <h3 className="text-base font-bold text-warm-white mb-1.5">
                Donate
              </h3>
              <p className="text-xs text-muted mb-4 flex-1">
                Hosting, gear, and stream uptime.
              </p>
              <a
                href={supportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-3 py-2 rounded-lg bg-fire-red hover:bg-fire-red-light text-white text-xs font-medium transition-colors"
              >
                Support the Cam
              </a>
            </div>

            <div className="steel-border rounded-xl bg-charcoal/90 p-5 text-center hover:border-fire-red/40 transition-colors flex flex-col">
              <h3 className="text-base font-bold text-warm-white mb-1.5">
                Sponsor
              </h3>
              <p className="text-xs text-muted mb-4 flex-1">
                Local brands and build partners.
              </p>
              <Link
                href="/sponsor"
                className="inline-block px-3 py-2 rounded-lg border border-fire-red/40 text-fire-red-light hover:bg-fire-red/10 text-xs font-medium transition-colors"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 md:py-20 bg-charcoal">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-warm-white mb-4">
            About This Project
          </h2>
          <p className="text-muted leading-relaxed mb-6">
            Chicago Fire Watch is a passion project giving fans a unique
            high-rise vantage point of the new stadium at The 78. Inspired by
            the timeless Chicago School architecture and the "Dear
            Chicago" vision, we stream the construction with minimal
            oversight so anyone can follow the rise of the city's newest
            landmark.
          </p>
          <p className="text-sm text-muted/80">
            Built independently. Powered by fans. Rooted in Chicago pride.
          </p>
        </div>
      </section>
    </>
  );
}
