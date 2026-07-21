const milestones = [
  {
    year: "2025",
    title: "Announcement & Vision",
    description:
      "Joe Mansueto announces privately funded stadium at The 78. Dear Chicago vision unveiled.",
    status: "completed",
  },
  {
    year: "Mar 2026",
    title: "Groundbreaking",
    description:
      "Official groundbreaking ceremony. Pile driving and foundation work begins.",
    status: "completed",
  },
  {
    year: "2026–2027",
    title: "Structural Steel Rising",
    description:
      "Tower cranes erect steel structure. Brick, steel, and glass facade takes shape.",
    status: "current",
  },
  {
    year: "2027",
    title: "Interior Fit-Out",
    description:
      "Seating, pitch, premium hospitality, and fan experience areas installed.",
    status: "upcoming",
  },
  {
    year: "2028",
    title: "Grand Opening",
    description:
      "Stadium opens for 2028 MLS season — first major Chicago pro stadium in 30+ years.",
    status: "upcoming",
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="py-16 md:py-24 brick-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-warm-white mb-3">
            Construction Timeline
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Follow the journey from groundbreaking to opening day. Updated as
            major milestones are reached.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-fire-red/30 -translate-x-1/2 hidden sm:block" />

          <div className="space-y-8 md:space-y-12">
            {milestones.map((item, idx) => (
              <div
                key={item.year}
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
                  </div>
                </div>

                <div className="hidden md:block md:w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
