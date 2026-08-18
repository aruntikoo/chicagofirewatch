"use client";

import { useRef } from "react";
import { Headphones, ExternalLink } from "lucide-react";
import type { PodcastEpisode } from "@/lib/podcast";
import { formatRelativeTime } from "@/lib/news";

type Props = {
  showName: string;
  episodes: PodcastEpisode[];
};

export default function PodcastEpisodeList({ showName, episodes }: Props) {
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());

  function pauseOthers(exceptId: string) {
    audioRefs.current.forEach((el, id) => {
      if (id !== exceptId && !el.paused) {
        el.pause();
      }
    });
  }

  return (
    <div className="flex flex-col gap-2">
      {episodes.map((ep) => {
        const hasAudio = Boolean(ep.audioUrl);

        return (
          <div
            key={ep.id}
            className="rounded-lg border border-fire-red/15 bg-charcoal/60 px-3 sm:px-4 py-2.5 sm:py-3"
          >
            <div className="flex gap-2.5 sm:gap-3 items-start">
              <div className="mt-0.5 shrink-0 text-fire-red-light/80">
                <Headphones className="w-4 h-4 opacity-80" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-warm-white leading-snug">
                  {ep.title}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {showName}
                  {ep.publishedAt
                    ? ` · ${formatRelativeTime(ep.publishedAt)}`
                    : ""}
                  {ep.durationLabel ? ` · ${ep.durationLabel}` : ""}
                </p>

                {hasAudio && (
                  <audio
                    className="mt-2.5 w-full h-9 accent-fire-red"
                    controls
                    preload="none"
                    src={ep.audioUrl}
                    ref={(el) => {
                      if (el) audioRefs.current.set(ep.id, el);
                      else audioRefs.current.delete(ep.id);
                    }}
                    onPlay={() => pauseOthers(ep.id)}
                  >
                    Your browser does not support audio playback.
                  </audio>
                )}

                <p className="mt-2">
                  <a
                    href={ep.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-fire-red-light hover:underline"
                  >
                    Episode page
                    <ExternalLink className="w-3 h-3" aria-hidden />
                  </a>
                  {!hasAudio && (
                    <span className="text-xs text-muted"> · audio unavailable</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
