"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface TimelapseEntry {
  id: string;
  label: string;
  videoId: string;
  isCurrent?: boolean;
}

const RECENT_TIMELAPSES: TimelapseEntry[] = [
  { id: "w-oct26", label: "Week of Oct 26", videoId: "Sqn2CCBWlQE", isCurrent: true },
  { id: "w-oct19", label: "Week of Oct 19", videoId: "Sqn2CCBWlQE" },
  { id: "w-oct12", label: "Week of Oct 12", videoId: "Sqn2CCBWlQE" },
  { id: "c-oct", label: "Cumulative \u2014 October", videoId: "Sqn2CCBWlQE" },
  { id: "c-sep", label: "Cumulative \u2014 September", videoId: "Sqn2CCBWlQE" },
];

interface Props {
  open: boolean;
  onClose: () => void;
  currentVideoId: string;
  currentLabel: string;
}

export default function TimelapseModal({ open, onClose, currentVideoId, currentLabel }: Props) {
  const [activeId, setActiveId] = useState(currentVideoId);
  const [caption, setCaption] = useState(currentLabel);

  useEffect(() => {
    if (open) {
      setActiveId(currentVideoId);
      setCaption(currentLabel);
    }
  }, [open, currentVideoId, currentLabel]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const embedSrc = `https://www.youtube.com/embed/${activeId}?rel=0&modestbranding=1&autoplay=1`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border steel-border bg-charcoal p-5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-fire-red flex items-center justify-center text-white"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <h3 className="text-xl font-bold text-warm-white mb-1">This Week’s Progress</h3>
        <p className="text-sm text-muted mb-4">{caption}</p>

        <div className="aspect-video bg-black rounded-xl overflow-hidden mb-5">
          <iframe
            key={activeId}
            className="w-full h-full"
            src={embedSrc}
            title={caption}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <h4 className="text-sm font-semibold text-warm-white mb-2">Recent Timelapses</h4>
        <ul className="space-y-1">
          {RECENT_TIMELAPSES.map((tl) => (
            <li
              key={tl.id}
              className="flex items-center justify-between py-2 border-b border-white/10 last:border-0"
            >
              <span className="text-sm text-warm-white">
                {tl.label}
                {tl.isCurrent && (
                  <span className="ml-2 text-[10px] uppercase font-bold bg-fire-red text-white px-1.5 py-0.5 rounded">
                    Current
                  </span>
                )}
              </span>
              <button
                onClick={() => {
                  setActiveId(tl.videoId);
                  setCaption(tl.label);
                }}
                className="text-xs font-semibold text-fire-red-light hover:underline"
              >
                Watch
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-4 text-center">
          <a
            href="https://www.youtube.com/@ChicagoFireWatch/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-fire-red-light hover:underline"
          >
            View full playlist on YouTube \u2192
          </a>
        </div>
      </div>
    </div>
  );
}
