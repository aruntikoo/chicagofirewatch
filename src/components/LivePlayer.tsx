"use client";

import { useEffect, useState } from "react";
import { Maximize, Volume2, VolumeX, Heart, Youtube } from "lucide-react";
import PresenceCounter from "./PresenceCounter";
import RecruitingCrmBanner from "./RecruitingCrmBanner";
import SponsorBanner from "./SponsorBanner";
import { SPONSORSHIPS_ENABLED } from "@/lib/features";
import { withUtm } from "@/lib/utm";

const YOUTUBE_HANDLE_URL = "https://www.youtube.com/@ChicagoFireWatch";
const SUPPORT_URL = "https://donate.stripe.com/6oU28q0vs233554h287Re00";
const REPLAY_URL = withUtm(`${YOUTUBE_HANDLE_URL}/videos`);
const SUBSCRIBE_URL = withUtm(`${YOUTUBE_HANDLE_URL}?sub_confirmation=1`);
const ORIGIN = "https://www.chicagofirewatch.com";
const SITE_STILL = "/images/mcdonalds-park-cam.jpg";
const POLL_LIVE_WINDOW_MS = 60_000;
const POLL_OFF_HOURS_MS = 15 * 60_000;

type LiveStatus = {
  live: boolean;
  videoId: string | null;
};

function isLiveWindowNow(): boolean {
  const hourText = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    hour: "numeric",
    hourCycle: "h23",
  }).format(new Date());
  const hour = parseInt(hourText, 10);
  return hour >= 7 && hour < 18;
}

export default function LivePlayer() {
  const [muted, setMuted] = useState(true);
  const [inLiveWindow, setInLiveWindow] = useState(isLiveWindowNow);
  const [status, setStatus] = useState<LiveStatus>({ live: false, videoId: null });

  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;

    async function refresh() {
      const windowOpen = isLiveWindowNow();
      if (!cancelled) setInLiveWindow(windowOpen);
      try {
        const res = await fetch("/api/live-status", { cache: "no-store" });
        if (res.ok) {
          const data = (await res.json()) as LiveStatus;
          if (!cancelled) {
            setStatus({
              live: Boolean(data.live && data.videoId),
              videoId: data.videoId ?? null,
            });
          }
        }
      } catch {
        // keep last known status
      }
      if (!cancelled) {
        timer = window.setTimeout(refresh, windowOpen ? POLL_LIVE_WINDOW_MS : POLL_OFF_HOURS_MS);
      }
    }

    refresh();
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  const showLive = status.live && Boolean(status.videoId);
  const youtubeEmbedSrc = showLive
    ? `https://www.youtube.com/embed/${status.videoId}?autoplay=1&mute=${muted ? 1 : 0}&playsinline=1&rel=0&origin=${encodeURIComponent(ORIGIN)}`
    : "";
  const youtubeWatchUrl = withUtm(`${YOUTUBE_HANDLE_URL}/live`);

  return (
    <section id="live" className="relative w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <div className="flex items-center gap-2">
                {showLive ? (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-fire-red live-badge" />
                    <span className="text-sm font-semibold uppercase tracking-widest text-fire-red-light">
                      Live Now
                    </span>
                  </>
                ) : (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-muted" />
                    <span className="text-sm font-semibold uppercase tracking-widest text-muted">
                      {inLiveWindow ? "Camera trouble" : "Cam offline"}
                    </span>
                  </>
                )}
              </div>
              {showLive && <PresenceCounter />}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-warm-white">
              McDonald's Park
              <span className="block text-fire-red-light mt-1">
                Chicago Fire Stadium Construction Live
              </span>
            </h1>
            <p className="mt-3 text-muted max-w-2xl text-base sm:text-lg">
              Independent fan view of McDonald's Park, the new Chicago Fire FC
              stadium rising at The 78. Watch steel, brick, and glass take shape in real time.
            </p>
          </div>
        </div>

        <div className="relative steel-border rounded-xl overflow-hidden bg-black shadow-2xl">
          <div className="aspect-video relative bg-gradient-to-br from-charcoal to-black">
            {showLive ? (
              <iframe
                key={status.videoId ?? "live"}
                className="absolute inset-0 w-full h-full"
                src={youtubeEmbedSrc}
                title="Chicago Fire Stadium Live Construction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url('${SITE_STILL}')` }}
              >
                <div className="absolute inset-0 bg-black/70" />
                <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center max-w-lg">
                  {inLiveWindow ? (
                    <>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                        Camera trouble
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold text-warm-white">
                        We’re working on it, back soon
                      </p>
                      <p className="text-sm text-warm-white/75">
                        The cam should be live 7:00 AM–6:00 PM CT. The feed is down right now.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                        Cam offline
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold text-warm-white">
                        Back at 7:00 AM Central
                      </p>
                      <p className="text-sm text-warm-white/75">
                        Live view runs 7:00 AM–6:00 PM CT while crews are on site.
                      </p>
                    </>
                  )}
                  <div className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={REPLAY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-5 py-2.5 rounded-lg border border-white/25 bg-black/40 hover:bg-black/60 text-warm-white text-sm font-semibold transition-colors"
                    >
                      Watch yesterday's replay
                    </a>
                    <a
                      href={SUPPORT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-fire-red hover:bg-fire-red-light text-white text-sm font-semibold transition-colors"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                      Support the Cam
                    </a>
                  </div>
                </div>
              </div>
            )}

            {showLive && (
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

        {showLive && (
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
        )}

        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href={SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-fire-red hover:bg-fire-red-light text-white font-semibold text-sm sm:text-base shadow-lg shadow-fire-red/30 transition-colors"
          >
            <Heart className="w-4 h-4 fill-current" />
            Support the Cam
          </a>
          <a
            href={SUBSCRIBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/25 bg-black/40 hover:bg-black/60 text-warm-white font-semibold text-sm sm:text-base transition-colors"
          >
            <Youtube className="w-4 h-4" />
            Subscribe on YouTube
          </a>
          <p className="text-sm text-muted text-center sm:text-left">
            Help keep the live view running for Fire fans.
          </p>
        </div>

        {SPONSORSHIPS_ENABLED ? <SponsorBanner /> : <RecruitingCrmBanner />}
      </div>
    </section>
  );
}
