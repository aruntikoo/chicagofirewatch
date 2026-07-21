export default function CommunityShop() {
  return (
    <>
      <section id="community" className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-warm-white mb-3">
              Community
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Join fellow fans watching the stadium rise. Comments and chat will
              open once the live stream is active.
            </p>
          </div>

          <div className="max-w-3xl mx-auto steel-border rounded-xl bg-charcoal/80 p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-fire-red/20 flex items-center justify-center">
              <span className="text-3xl">🔥</span>
            </div>
            <h3 className="text-xl font-bold text-warm-white mb-2">
              Coming Soon
            </h3>
            <p className="text-sm text-muted mb-6">
              Live chat (YouTube + moderated comments), viewer polls, and
              milestone celebrations will appear here. Stay tuned.
            </p>
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
              Help keep the cameras rolling. Merch and sponsorship opportunities
              coming soon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Merch",
                desc: '"I Watched It Rise" tees, hoodies, and hard-hat stickers.',
                cta: "Shop Soon",
              },
              {
                title: "Donate",
                desc: "Support hosting, camera gear, and stream uptime.",
                cta: "Coming Soon",
              },
              {
                title: "Sponsor",
                desc: "Local brands and construction partners welcome.",
                cta: "Get in Touch",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="steel-border rounded-xl bg-charcoal/90 p-6 text-center hover:border-fire-red/40 transition-colors"
              >
                <h3 className="text-lg font-bold text-warm-white mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-muted mb-5">{card.desc}</p>
                <button
                  disabled
                  className="px-4 py-2 rounded-lg border border-fire-red/40 text-fire-red-light text-sm font-medium opacity-70 cursor-not-allowed"
                >
                  {card.cta}
                </button>
              </div>
            ))}
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
            the timeless Chicago School architecture and the &quot;Dear
            Chicago&quot; vision, we stream the construction with minimal
            oversight so anyone can follow the rise of the city&apos;s newest
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
