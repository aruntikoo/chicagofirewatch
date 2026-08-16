import { milestones, timelapseVideos } from "@/data/milestones";
import { Play } from "lucide-react";

export default function Timeline() {
  return (
    <section id="timeline" className="py-16 md:py-24 brick-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-warm-white mb-3">
            Construction Timeline
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Follow the journey from groundbreaking to opening day. Click Watch on
            any phase that has a recorded video or timelapse.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-fire-red/30 -translate-x-1/2 hidden sm:block" />

          <div className="space-y-8 md:space-y-12">
            {milestones.map((item, idx) => {
              const watchHref =
                item.videoHref ||
                (item.videoId
                  ? `https://www.youtube.com/watch?v=${item.videoId}`
                  : null);
              const isExternal = Boolean(watchHref && watchHref.startsWith("http"));

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col md:flex-row gap-6 md:gap-0 ${
                    idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-2 border-fire-red bg-charcoal -translate-x-1/2 z-10 hidden sm:block">
                    {item.status === "current" && (
                      <span className="absolute inset-0 rounded-full bg-fire-red animate-ping opacity-40" />
                    )}
                  </div>

                  <div
                    className={`sm:ml-12 md:ml-0 md:w-5/12 ${
                      idx % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <div
                      className={`inline-block px-4 py-3 rounded-xl border steel-border bg-charcoal/90 ${
                        item.status === "current"
                          ? "border-fire-red/50 shadow-lg shadow-fire-red/10"
                          : "border-fire-red/15"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${
                            item.status === "current"
                              ? "text-fire-red-light"
                              : item.status === "completed"
                              ? "text-green-400"
                              : "text-muted"
                          }`}
                        >
                          {item.status === "current"
                            ? "● In Progress"
                            : item.status === "completed"
                            ? "✓ Completed"
                            : "Upcoming"}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-fire-red-light mb-1">
                        {item.year}
                      </p>
                      <h3 className="text-lg font-bold text-warm-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed">
                        {item.description}
                      </p>

                      {watchHref && (
                        <div
                          className={`mt-3 ${
                            idx % 2 === 0 ? "md:flex md:justify-end" : ""
                          }`}
                        >
                          <a
                            href={watchHref}
                            {...(isExternal
                              ? {
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                }
                              : {})}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-fire-red/15 hover:bg-fire-red/25 text-fire-red-light text-xs font-semibold transition-colors"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            {item.videoLabel || "Watch Phase"}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="hidden md:block md:w-5/12" />
                </div>
              );
            })}
          </div>
        </div>

        {timelapseVideos.length > 0 && (
          <div className="mt-16 pt-12 border-t border-fire-red/20">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-warm-white mb-2">
                Cumulative Timelapse
              </h3>
              <p className="text-muted text-sm max-w-xl mx-auto">
                Watch the build progress from the beginning to the latest
                available footage.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
              {timelapseVideos.map((tl) => (
                <a
                  key={tl.id}
                  href={`https://www.youtube.com/watch?v=${tl.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group steel-border rounded-xl bg-charcoal/90 p-5 hover:border-fire-red/40 transition-colors"
                >
                  <p className="text-xs uppercase tracking-wider text-fire-red-light mb-1">
                    {tl.dateLabel}
                  </p>
                  <h4 className="font-semibold text-warm-white group-hover:text-fire-red-light transition-colors">
                    {tl.title}
                  </h4>
                  <p className="text-sm text-muted mt-1">{tl.description}</p>
                  <span className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-fire-red-light">
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Watch Timelapse
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {timelapseVideos.length === 0 && (
          <p className="mt-12 text-center text-sm text-muted/70">
            Cumulative timelapse videos will appear here as they are published.
          </p>
        )}
      </div>
    </section>
  );
}
