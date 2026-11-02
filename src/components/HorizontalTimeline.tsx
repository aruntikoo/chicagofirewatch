"use client";

import { milestones } from "@/data/milestones";
import { Play } from "lucide-react";

const WEEKLY_VIDEO_ID = "Sqn2CCBWlQE";
const WEEK_CAPTION = "Week of Oct 26";

export default function HorizontalTimeline() {
  return (
    <section id="timeline" className="py-10 md:py-14 bg-background border-t border-fire-red/10">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-warm-white">
            Construction Timeline
          </h2>
          <p className="text-sm text-muted mt-1">
            Follow the build. Current phase includes this week's timelapse.
          </p>
        </div>

        <div className="relative">
          {/* Horizontal line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-fire-red/30 hidden md:block" />

          <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-2 overflow-x-auto pb-4">
            {milestones.map((item) => {
              const isCurrent = item.status === "current";
              const hasVideo = isCurrent || item.videoId || item.videoHref;

              return (
                <div
                  key={item.id}
                  className={`relative flex-1 min-w-[160px] md:min-w-0 text-center ${
                    isCurrent ? "z-10" : ""
                  }`}
                >
                  <div
                    className={`mx-auto w-16 h-16 rounded-full border-2 flex items-center justify-center mb-3 ${
                      isCurrent
                        ? "border-fire-red bg-fire-red/20 shadow-lg shadow-fire-red/20"
                        : item.status === "completed"
                        ? "border-green-500/50 bg-green-500/10"
                        : "border-white/20 bg-charcoal"
                    }`}
                  >
                    {isCurrent ? (
                      <a
                        href={`https://www.youtube.com/watch?v=${WEEKLY_VIDEO_ID}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-fire-red flex items-center justify-center hover:bg-fire-red-light transition-colors"
                        title={`Watch ${WEEK_CAPTION} timelapse`}
                      >
                        <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                      </a>
                    ) : hasVideo ? (
                      <Play className="w-5 h-5 text-fire-red-light" />
                    ) : (
                      <span className="text-xs font-bold text-muted">{item.year.slice(0, 4)}</span>
                    )}
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-fire-red-light">
                    {item.year}
                  </p>
                  <h3 className="text-sm font-bold text-warm-white mt-1">{item.title}</h3>
                  {isCurrent && (
                    <p className="text-[10px] text-muted mt-1">{WEEK_CAPTION} timelapse</p>
                  )}
                  <p
                    className={`text-[10px] mt-1 ${
                      item.status === "current"
                        ? "text-fire-red-light font-semibold"
                        : item.status === "completed"
                        ? "text-green-400"
                        : "text-muted"
                    }`}
                  >
                    {item.status === "current"
                      ? "Current"
                      : item.status === "completed"
                      ? "Completed"
                      : "Upcoming"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
