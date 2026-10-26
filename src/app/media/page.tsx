import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MediaRequestForm from "@/components/MediaRequestForm";
import Link from "next/link";

// Same real still used on the landing page player background (September 2026, CC0)
const SITE_STILL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/McDonald%E2%80%99s_Park_September_2026.jpg/1600px-McDonald%E2%80%99s_Park_September_2026.jpg";

export const metadata: Metadata = {
  title: "Media & Licensing | Chicago Fire Watch",
  description:
    "Request Chicago Fire Watch footage of McDonald's Park construction at The 78. Stills, clips, and timelapses for news outlets. License terms and request form.",
  alternates: { canonical: "/media" },
  openGraph: {
    title: "Media & Licensing | Chicago Fire Watch",
    description:
      "Request Chicago Fire Watch footage of McDonald's Park construction at The 78. Stills, clips, and timelapses for news outlets.",
    url: "/media",
    siteName: "Chicago Fire Watch",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Media & Licensing | Chicago Fire Watch",
    description:
      "Request Chicago Fire Watch footage of McDonald's Park construction at The 78. Stills, clips, and timelapses for news outlets.",
    images: ["/og-image.jpg"],
  },
};

export default function MediaPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section
          className="relative py-12 md:py-16 border-b border-fire-red/15 overflow-hidden"
          style={{ backgroundImage: `url('${SITE_STILL}')` }}
        >
          <div className="absolute inset-0 bg-black/75" />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-fire-red-light mb-3">
              Media & Licensing
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-warm-white mb-4">
              Media & Licensing — McDonald's Park Construction Footage
            </h1>
            <p className="text-muted text-base sm:text-lg leading-relaxed mb-6">
              Chicago Fire Watch runs a live cam on the construction of McDonald's Park, the Chicago Fire FC's new stadium at The 78, streaming 7am–6pm CT every day. News outlets can request stills, clips, monthly timelapses, and a full start-to-opening-day timelapse. Send your request below and we'll reply within a few hours during stream hours.
            </p>
          </div>
        </section>

        <section
          className="relative py-12 md:py-16 overflow-hidden"
          style={{ backgroundImage: `url('${SITE_STILL}')` }}
        >
          <div className="absolute inset-0 bg-black/80" />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-warm-white mb-4">License summary</h2>
              <ul className="space-y-3 text-muted">
                <li className="flex gap-3">
                  <span className="text-fire-red-light shrink-0">●</span>
                  <span>You get a non-exclusive license for one story, on your outlet's own platforms.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-fire-red-light shrink-0">●</span>
                  <span>We keep ownership. No resale, sublicensing, or use for AI training.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-fire-red-light shrink-0">●</span>
                  <span>One still for one story is free with credit. Clips and monthly timelapses are licensed per story; rates quoted on request. The full start-to-opening-day timelapse is premium and quoted separately.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-fire-red-light shrink-0">●</span>
                  <span>Files are delivered full-res through an expiring download link. Video carries a small corner watermark. We don't upload to outlet portals or submission forms.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-fire-red/40 bg-fire-red/10 p-6">
              <h3 className="text-lg font-semibold text-warm-white mb-2">Required credit</h3>
              <p className="text-warm-white font-medium">
                Courtesy Chicago Fire Watch / chicagofirewatch.com — on-screen or in the caption.
              </p>
            </div>

            <div className="text-sm text-muted">
              <p className="mb-2">
                <strong className="text-warm-white">Response time:</strong> We reply within a few hours, 7am–6pm CT.
              </p>
              <p>
                Prefer email? Write to{" "}
                <a
                  href="mailto:press@chicagofirewatch.com"
                  className="text-fire-red-light hover:underline"
                >
                  press@chicagofirewatch.com
                </a>{" "}
                with your outlet, story, where it runs, and deadline.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-charcoal/40 border-t border-fire-red/10">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-warm-white mb-2 text-center">
              Request footage
            </h2>
            <p className="text-muted text-sm text-center mb-8">
              Fill out the form and we'll get back to you during stream hours.
            </p>
            <MediaRequestForm />
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
