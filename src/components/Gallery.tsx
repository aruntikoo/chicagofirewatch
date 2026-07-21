const galleryItems = [
  {
    id: 1,
    title: "Steel Rising",
    caption: "Tower cranes and structural steel take shape at The 78",
    gradient: "from-fire-red/40 to-charcoal",
  },
  {
    id: 2,
    title: "Foundation Work",
    caption: "Pile driving and shallow foundations underway",
    gradient: "from-steel/60 to-charcoal",
  },
  {
    id: 3,
    title: "Riverfront View",
    caption: "Stadium site along the Chicago River",
    gradient: "from-brick/50 to-charcoal",
  },
  {
    id: 4,
    title: "Site Progress",
    caption: "Aerial progress of the open-air bowl",
    gradient: "from-fire-red-dark/50 to-charcoal",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-16 md:py-24 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-warm-white mb-2">
              Progress Gallery
            </h2>
            <p className="text-muted max-w-xl">
              Stills and highlights captured from the live feed and public
              construction updates.
            </p>
          </div>
          <a
            href="#live"
            className="inline-flex items-center gap-2 text-sm font-semibold text-fire-red-light hover:text-fire-red transition-colors"
          >
            Watch Live →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden steel-border cursor-pointer"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
              />
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_40%,#C8102E_0%,transparent_50%)]" />

              <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all">
                <h3 className="font-bold text-warm-white text-lg group-hover:text-fire-red-light transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted mt-0.5">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          Gallery will populate with real stills and time-lapse frames once the
          camera feed is active.
        </p>
      </div>
    </section>
  );
}
