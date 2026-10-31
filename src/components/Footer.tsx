import { withUtm } from "@/lib/utm";
import { Flame } from "lucide-react";
import Link from "next/link";
import { PARTNERS_ENABLED, SPONSORSHIPS_ENABLED } from "@/lib/features";

const socialLinks = [
  {
    platform: "YouTube",
    label: "Chicago Fire Watch on YouTube",
    href: withUtm("https://www.youtube.com/@ChicagoFireWatch"),
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    platform: "X",
    label: "Chicago Fire Watch on X",
    href: "https://x.com/ChiFiWatch",
    path: "M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z",
  },
  {
    platform: "Instagram",
    label: "Chicago Fire Watch on Instagram",
    href: "https://www.instagram.com/chicagofirewatch/",
    path: "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
  },
  {
    platform: "TikTok",
    label: "Chicago Fire Watch on TikTok",
    href: "https://www.tiktok.com/@chicagofirewatch",
    path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
  {
    platform: "Threads",
    label: "Chicago Fire Watch on Threads",
    href: "https://www.threads.net/@chicagofirewatch",
    path: "M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z",
  },
  {
    platform: "Bluesky",
    label: "Chicago Fire Watch on Bluesky",
    href: "https://bsky.app/profile/chicagofirewatch.bsky.social",
    path: "M5.202 2.857C7.954 4.922 10.913 9.11 12 11.358c1.087-2.247 4.046-6.436 6.798-8.501C20.783 1.366 24 .213 24 3.883c0 .732-.42 6.156-.667 7.037-.856 3.061-3.978 3.842-6.755 3.37 4.854.826 6.089 3.562 3.422 6.299-5.065 5.196-7.28-1.304-7.847-2.97-.104-.305-.152-.448-.153-.327 0-.121-.05.022-.153.327-.568 1.666-2.782 8.166-7.847 2.97-2.667-2.737-1.432-5.473 3.422-6.3-2.777.473-5.899-.308-6.755-3.369C.42 10.04 0 4.615 0 3.883c0-3.67 3.217-2.517 5.202-1.026",
  },
].filter(
  (link) =>
    link.href &&
    !link.href.includes("{{}") &&
    link.href !== "#" &&
    link.href.trim() !== ""
);

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-fire-red/20 pt-12 pb-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-fire-red flex items-center justify-center">
                <Flame className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl text-warm-white">
                Chicago Fire Watch
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-md mb-4">
              Independent live stream of the Chicago Fire FC stadium construction
              at The 78. Built with pride for fans who want a front-row seat to
              Chicago's newest sports landmark.
            </p>
            <p className="text-xs text-muted/80 border-l-2 border-fire-red/40 pl-3">
              This is an independent fan project and is not affiliated with,
              endorsed by, or officially connected to Chicago Fire FC, MLS, or
              Related Midwest.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-warm-white mb-4 text-sm uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/#live" className="hover:text-fire-red-light transition-colors">
                  Live Stream
                </Link>
              </li>
              <li>
                <Link href="/#timeline" className="hover:text-fire-red-light transition-colors">
                  Timeline
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-fire-red-light transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/#community" className="hover:text-fire-red-light transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/media" className="hover:text-fire-red-light transition-colors">
                  Media & Licensing
                </Link>
              </li>
              {SPONSORSHIPS_ENABLED && (
                <li>
                  <Link href="/sponsor" className="hover:text-fire-red-light transition-colors">
                    Sponsor
                  </Link>
                </li>
              )}
              {PARTNERS_ENABLED && (
                <li>
                  <Link href="/partners" className="hover:text-fire-red-light transition-colors">
                    Retail partners
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-warm-white mb-4 text-sm uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex flex-wrap gap-3 mb-4">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  title={link.label}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted hover:text-fire-red-light hover:border-fire-red/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-red-light focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={link.path} />
                  </svg>
                </a>
              ))}
            </div>
            <p className="text-xs text-muted">
              Domain:{" "}
              <a
                href="https://chicagofirewatch.com"
                className="text-fire-red-light hover:underline"
              >
                chicagofirewatch.com
              </a>
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted">
          <p>© {new Date().getFullYear()} Chicago Fire Watch. All rights reserved. Licensing available.</p>
          <p className="flex items-center gap-1">
            Built with pride for Chicago
            <Flame size={12} className="text-fire-red" />
          </p>
        </div>
      </div>
    </footer>
  );
}
