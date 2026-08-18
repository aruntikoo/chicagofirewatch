"use client";

import { useState } from "react";
import { Play, Maximize, Volume2, VolumeX, Heart } from "lucide-react";
import Link from "next/link";
import PresenceCounter from "./PresenceCounter";

export default function LivePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // ---------------------------------------------------------------
  // EMBED SOURCE
  // Prefer a specific live VIDEO id — more reliable than channel live_stream.
  // From your live URL: youtube.com/live/VIDEO_ID or watch?v=VIDEO_ID
  // Update LIVE_VIDEO_ID whenever you start a new stream (unless you keep
  // the same persistent live event).
  // ---------------------------------------------------------------
  const LIVE_VIDEO_ID = "Fnonw0DiIaQ"; // ← current live (update if stream id changes)

  // Direct video embed (recommended while live)
  const youtubeEmbedSrc = `https://www.youtube.com/embed/${LIVE_VIDEO_ID}?autoplay=1&mute=1&playsinline=1&rel=0`;

  // Fallback: channel live embed (often shows "unavailable" — keep as backup only)
  // const youtubeEmbedSrc =
  //   "https://www.youtube.com/embed/live_stream?channel=UCCpOx6W4-N2BhFRHdc1043w&autoplay=1&mute=1";
  // ---------------------------------------------------------------

  const supportUrl = "https://donate.stripe.com/6oU28q0vs233554h287Re00";
  const youtubeWatchUrl = `https://www.youtube.com/watch?v=${LIVE_VIDEO_ID}`;

  return (
    <section id="live" className="relative w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-fire-red live-badge" />
                <span className="text-sm font-semibold uppercase tracking-widest text-fire-red-light">
                  Live Now
                </span>
              </div>
              <PresenceCounter />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-warm-white">
              Chicago Fire Stadium
              <span className="block text-fire-red-light mt-1">
                Construction Live
              </span>
            </h1>
            <p className="mt-3 text-muted max-w-2xl text-base sm:text-lg">
              Independent fan view of the new Chicago Fire FC stadium rising at
              The 78. Watch steel, brick, and glass take shape in real time.
            </p>
          </div>
        </div>

        <div className="relative steel-border rounded-xl overflow-hidden bg-black shadow-2xl">
          <div className="aspect-video relative bg-gradient-to-br from-charcoal to-black">
            {!isPlaying ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/60" />
                <button
                  onClick={() => setIsPlaying(true)}
                  className="relative z-10 group flex flex-col items-center gap-4"
                >
                  <div className="w-20 h-20 rounded-full bg-fire-red flex items-center justify-center shadow-lg shadow-fire-red/40 group-hover:scale-110 group-hover:bg-fire-red-light transition-all">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </div>
                  <span className="text-warm-white font-semibold text-lg tracking-wide">
                    Watch Live Construction
                  </span>
                </button>
                <p className="absolute bottom-6 left-0 right-0 text-center text-sm text-warm-white/70 z-10">
                  Click to load the live stream from the construction site
                </p>
              </div>
            ) : (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={youtubeEmbedSrc}
                title="Chicago Fire Stadium Live Construction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="origin-when-cross-origin"
                allowFullScreen
              />
            )}

            {isPlaying && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between opacity-0 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMuted(!muted)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                  >
                    {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <span className="text-xs text-white/80 font-medium">
                    LIVE • The 78 Construction Site
                  </span>
                </div>
                <a
                  href={youtubeWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                  title="Open on YouTube"
                >
                  <Maximize size={18} />
                </a>
              </div>
            )}
          </div>
        </div>

        <p className="mt-3 text-center text-xs text-muted">
          Stream not loading?{" "}
          <a
            href={youtubeWatchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fire-red-light hover:underline"
          >
            Open on YouTube
          </a>
        </p>

        {/* Support the Cam — primary CTA under the player */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href={supportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-fire-red hover:bg-fire-red-light text-white font-semibold text-sm sm:text-base shadow-lg shadow-fire-red/30 transition-colors"
          >
            <Heart className="w-4 h-4 fill-current" />
            Support the Cam
          </a>
          <p className="text-sm text-muted text-center sm:text-left">
            Help keep the live view running for Fire fans.
          </p>
        </div>

        {/* Sponsor placeholder under player */}
        <div className="mt-6">
          <p className="text-[10px] uppercase tracking-widest text-muted/70 text-center mb-2">
            Advertisement
          </p>
          <Link
            href="/sponsor"
            className="group block w-full rounded-lg border border-dashed border-fire-red/35 bg-charcoal/70 hover:border-fire-red/55 hover:bg-charcoal/90 transition-colors"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 px-6 py-7 sm:py-8 min-h-[96px] sm:min-h-[100px]">
              <span className="text-warm-white font-medium text-base sm:text-lg text-center">
                Sponsor this live cam — Reach Chicago Fire fans
              </span>
              <span className="text-fire-red-light text-sm sm:text-base font-semibold group-hover:underline whitespace-nowrap">
                Learn more →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
