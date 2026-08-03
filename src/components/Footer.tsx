import { Flame, Instagram, Youtube } from "lucide-react";

// Official-style X (formerly Twitter) logo as inline SVG
function XIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-fire-red/20 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <a href="#live" className="hover:text-fire-red-light transition-colors">
                  Live Stream
                </a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-fire-red-light transition-colors">
                  Timeline
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-fire-red-light transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-fire-red-light transition-colors">
                  Community
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-warm-white mb-4 text-sm uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex gap-3 mb-4">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on X"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted hover:text-fire-red-light hover:border-fire-red/40 transition-colors"
              >
                <XIcon size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on Instagram"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted hover:text-fire-red-light hover:border-fire-red/40 transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe on YouTube"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted hover:text-fire-red-light hover:border-fire-red/40 transition-colors"
              >
                <Youtube size={16} />
              </a>
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
          <p>© {new Date().getFullYear()} Chicago Fire Watch. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with pride for Chicago
            <Flame size={12} className="text-fire-red" />
          </p>
        </div>
      </div>
    </footer>
  );
}
