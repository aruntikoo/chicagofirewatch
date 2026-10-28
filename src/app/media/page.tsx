import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MediaRequestForm from "@/components/MediaRequestForm";
import Link from "next/link";

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
        {/* Compact header + intro */}
        <section className="py-8 md:py-10 border-b border-fire-red/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-fire-red-light mb-2">
              Media & Licensing
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-warm-white mb-3">
              Media & Licensing — McDonald's Park Construction Footage
            </h1>
            <p className="text-muted text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
              Chicago Fire Watch runs a live cam on the construction of McDonald's Park, the Chicago Fire FC's new stadium at The 78, streaming 7am–6pm CT every day. News outlets can request stills, clips, monthly timelapses, and a full start-to-opening-day timelapse. Send your request below and we'll reply within a few hours during stream hours.
            </p>
          </div>
        </section>

        {/* Two-column: license left, form right */}
        <section className="py-8 md:py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
              {/* Left: license summary */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-warm-white mb-3">License summary</h2>
                  <ul className="space-y-2.5 text-muted text-sm">
                    <li className="flex gap-2.5">
                      <span className="text-fire-red-light shrink-0">●</span>
                      <span>You get a non-exclusive license for one story, on your outlet's own platforms.</span>
                    </li>
                    <li className="flex gap-2.5">
                      <span className="text-fire-red-light shrink-0">●</span>
                      <span>We keep ownership. No resale, sublicensing, or use for AI training.</span>
                    </li>
                    <li className="flex gap-2.5">
                      <span className="text-fire-red-light shrink-0">●</span>
                      <span>One still for one story is free with credit. Clips and monthly timelapses are licensed per story; rates quoted on request. The full start-to-opening-day timelapse is premium and quoted separately.</span>
                    </li>
                    <li className="flex gap-2.5">
                      <span className="text-fire-red-light shrink-0">●</span>
                      <span>Files are delivered full-res through an expiring download link. Video carries a small corner watermark. We don't upload to outlet portals or submission forms.</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-fire-red/40 bg-fire-red/10 p-4">
                  <h3 className="text-base font-semibold text-warm-white mb-1">Required credit</h3>
                  <p className="text-warm-white text-sm font-medium">
                    Courtesy Chicago Fire Watch / chicagofirewatch.com — on-screen or in the caption.
                  </p>
                </div>

                <div className="text-xs text-muted space-y-1">
                  <p>
                    <strong className="text-warm-white">Response time:</strong> We reply within a few hours, 7am–6pm CT.
                  </p>
                  <p>
                    Prefer email? Write to{" "}
                    <a href="mailto:press@chicagofirewatch.com" className="text-fire-red-light hover:underline">
                      press@chicagofirewatch.com
                    </a>{" "}
                    with your outlet, story, where it runs, and deadline.
                  </p>
                </div>
              </div>

              {/* Right: form */}
              <div>
                <h2 className="text-xl font-bold text-warm-white mb-1 text-center lg:text-left">
                  Request footage
                </h2>
                <p className="text-muted text-xs text-center lg:text-left mb-4">
                  Fill out the form and we'll get back to you during stream hours.
                </p>
                <MediaRequestForm />
              </div>
            </div>
          </div>
        </section>

        <section className="py-6 text-center">
          <Link href="/" className="text-sm text-fire-red-light hover:underline">
            ← Back to the live cam
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
