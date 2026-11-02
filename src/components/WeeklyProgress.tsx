const WEEKLY_VIDEO_ID = "Sqn2CCBWlQE";
const WEEK_CAPTION = "Week of Oct 26 \u2014 stadium construction timelapse";
const MORE_TIMELAPSES_URL = `https://www.youtube.com/watch?v=${WEEKLY_VIDEO_ID}`; // placeholder: same video until playlist exists

export default function WeeklyProgress() {
  const embedSrc = `https://www.youtube.com/embed/${WEEKLY_VIDEO_ID}?rel=0&modestbranding=1`;

  return (
    <section id="progress" className="relative w-full border-t border-fire-red/10">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-warm-white tracking-tight">
            This week\u2019s progress
          </h2>
          <p className="mt-1 text-sm text-muted">
            {WEEK_CAPTION}
          </p>
        </div>

        <div className="steel-border rounded-xl overflow-hidden bg-black shadow-2xl max-w-4xl mx-auto">
          <div className="aspect-video relative">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={embedSrc}
              title="This week's stadium construction timelapse"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 max-w-4xl mx-auto">
          <a
            href={MORE_TIMELAPSES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-fire-red-light hover:underline"
          >
            More timelapses \u2192
          </a>
          <p className="text-xs text-muted">
            New every Monday
          </p>
        </div>
      </div>
    </section>
  );
}
