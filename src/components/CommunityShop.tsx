import Link from "next/link";
import EmailSignup from "@/components/EmailSignup";
import ViewerPoll from "@/components/ViewerPoll";

export default function CommunityShop() {
  const supportUrl = "https://donate.stripe.com/6oU28q0vs233554h287Re00";

  return (
    <>
      <section id="community" className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
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
            {/* Email capture */}
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

            {/* Viewer poll */}
            <ViewerPoll />
          </div>

          <div className="mt-8 text-center">
            <a
              href="#live"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-fire-red hover:bg-fire-red-light text-white font-semibold text-sm transition-colors"
            >
              Watch the Live Feed
            </a>
          </div>
        </div>
      </section>

      <section id="shop" className="py-16 md:py-20 brick-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-warm-white mb-3">
              Support the Watch
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Help keep the cameras rolling. Tips, merch partners, and
              sponsorships keep the live view running for Fire fans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="steel-border rounded-xl bg-charcoal/90 p-6 text-center hover:border-fire-red/40 transition-colors">
              <h3 className="text-lg font-bold text-warm-white mb-2">Merch</h3>
              <p className="text-sm text-muted mb-5">
                Retail partners: connect your online Fire or soccer store with
                our audience.
              </p>
              <Link
                href="/partners"
                className="inline-block px-4 py-2 rounded-lg border border-fire-red/40 text-fire-red-light hover:bg-fire-red/10 text-sm font-medium transition-colors"
              >
                Retail partners: get in touch
              </Link>
            </div>

            <div className="steel-border rounded-xl bg-charcoal/90 p-6 text-center hover:border-fire-red/40 transition-colors">
              <h3 className="text-lg font-bold text-warm-white mb-2">Donate</h3>
              <p className="text-sm text-muted mb-5">
                Support hosting, camera gear, and stream uptime.
              </p>
              <a
                href={supportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 rounded-lg bg-fire-red hover:bg-fire-red-light text-white text-sm font-medium transition-colors"
              >
                Support the Cam
              </a>
            </div>

            <div className="steel-border rounded-xl bg-charcoal/90 p-6 text-center hover:border-fire-red/40 transition-colors">
              <h3 className="text-lg font-bold text-warm-white mb-2">Sponsor</h3>
              <p className="text-sm text-muted mb-5">
                Local brands and construction partners welcome.
              </p>
              <Link
                href="/sponsor"
                className="inline-block px-4 py-2 rounded-lg border border-fire-red/40 text-fire-red-light hover:bg-fire-red/10 text-sm font-medium transition-colors"
              >
                Get in Touch
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
