"use client";

import { useState } from "react";
import { Play, Maximize, Volume2, VolumeX } from "lucide-react";

export default function LivePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // Placeholder for actual stream URL (YouTube Live or HLS)
  // Replace with your real embed once streaming is live
  const youtubeEmbedId = "YOUR_YOUTUBE_LIVE_ID"; // e.g. from YouTube Live

  return (
    <section id="live" className="relative w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-fire-red live-badge" />
              <span className="text-sm font-semibold uppercase tracking-widest text-fire-red-light">
                Live Now
              </span>
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
                <p className="absolute bottom-6 left-0 right right-0 text-center text-sm text-warm-white/70 z-10">
                  Stream will connect once the GoPro / camera feed is live
                </p>
              </div>
            ) : (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeEmbedId}?autoplay=1&mute=1`}
                title="Chicago Fire Stadium Live Construction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
                <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white">
                  <Maximize size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Project", value: "Chicago Fire Stadium" },
            { label: "Location", value: "The 78, South Loop" },
            { label: "Target Open", value: "2028 MLS Season" },
            { label: "Capacity", value: "22,000+ seats" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-charcoal/80 border border-fire-red/15 rounded-lg px-4 py-3"
            >
              <p class className="text-xs uppercase tracking-wider text-muted mb-1">
                {stat.label}
              </p>
              <p className="font-semibold text-warm-white text-sm sm:text-base">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
