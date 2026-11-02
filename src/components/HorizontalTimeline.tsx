"use client";

import { useState } from "react";
import { milestones } from "@/data/milestones";
import { Play } from "lucide-react";
import TimelapseModal from "./TimelapseModal";

const CURRENT_WEEKLY_ID = "Sqn2CCBWlQE";
const CURRENT_WEEK_LABEL = "Week of Oct 26";

export default function HorizontalTimeline() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="timeline" className="py-10 md:py-14">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-warm-white mb-8">
          Construction Timeline
        </h2>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute top-5 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-fire-red/60 to-transparent hidden md:block" />

          <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-2">
            {milestones.map((item) => {
              const isCurrent = item.status === "current";
              return (
                <div key={item.id} className="flex-1 text-center relative z-10">
                  <div
                    className={`w-10 h-10 mx-auto mb-3 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                      isCurrent
                        ? "bg-fire-red border-fire-red text-white shadow-lg shadow-fire-red/30"
                        : item.status === "completed"
                        ? "bg-charcoal border-green-500 text-green-400"
                        : "bg-charcoal border-white/20 text-muted"
                    }`}
                  >
                    {item.status === "completed" ? "\u2713" : isCurrent ? <Play className="w-4 h-4 fill-current" /> : "\u25CB"}
                  </div>
                  <p className="text-xs font-bold text-fire-red-light mb-1">{item.year}</p>
                  <p className="text-sm font-semibold text-warm-white">{item.title}</p>
                  <p className="text-xs text-muted mt-1 max-w-[140px] mx-auto leading-snug">
                    {item.description.split(".")[0]}.
                  </p>

                  {isCurrent && (
                    <button
                      onClick={() => setModalOpen(true)}
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-fire-red hover:bg-fire-red-light text-white text-xs font-semibold transition-colors"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      This Week’s Timelapse
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <TimelapseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        currentVideoId={CURRENT_WEEKLY_ID}
        currentLabel={CURRENT_WEEK_LABEL}
      />
    </section>
  );
}
