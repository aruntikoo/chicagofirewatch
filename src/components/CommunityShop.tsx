import EmailSignup from "@/components/EmailSignup";

export default function CommunityShop() {
  return (
    <section id="community" className="py-12 md:py-16 bg-charcoal/40">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start max-w-5xl mx-auto">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-warm-white mb-3">
              Community
            </h2>
            <p className="text-muted max-w-md">
              Stay close to the build. Get notified about live streams, major
              milestones, and new timelapse videos — and share what you are most
              excited to see.
            </p>
          </div>

          <div className="steel-border rounded-xl bg-charcoal/80 p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🔥</span>
              <h3 className="text-lg font-bold text-warm-white">
                Join the Watch List
              </h3>
            </div>
            <p className="text-sm text-muted mb-5">
              Occasional emails when the cam is live, when a major phase is
              completed, or when a new cumulative timelapse is published. No spam.
            </p>
            <EmailSignup />
          </div>
        </div>
      </div>
    </section>
  );
}
