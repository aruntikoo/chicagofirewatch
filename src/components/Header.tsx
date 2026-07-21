"use client";

import { useState } from "react";
import { Menu, X, Flame } from "lucide-react";
import Link from "next/link";

const navItems = [
  { name: "Live", href: "#live" },
  { name: "Timeline", href: "#timeline" },
  { name: "Gallery", href: "#gallery" },
  { name: "Community", href: "#community" },
  { name: "Shop", href: "#shop" },
  { name: "About", href: "#about" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-charcoal/95 backdrop-blur-md border-b border-fire-red/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-fire-red flex items-center justify-center group-hover:bg-fire-red-light transition-colors">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-warm-white leading-none">
                Chicago Fire Watch
              </span>
              <span className="text-[10px] uppercase tracking-widest text-muted">
                Live from The 78
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-warm-white/80 hover:text-fire-red-light transition-colors rounded-md hover:bg-white/5"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-fire-red/20 border border-fire-red/40">
              <span className="w-2 h-2 rounded-full bg-fire-red live-badge" />
              <span className="text-xs font-semibold text-fire-red-light uppercase tracking-wide">
                Live
              </span>
            </div>

            <button
              className="md:hidden p-2 text-warm-white hover:text-fire-red-light"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-charcoal border-t border-fire-red/20">
          <nav className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2.5 text-base font-medium text-warm-white/90 hover:text-fire-red-light hover:bg-white/5 rounded-md"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
