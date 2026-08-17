import { getNewsFeed, formatRelativeTime } from "@/lib/news";
import { getPodcastEpisodes } from "@/lib/podcast";
import type { NewsItem } from "@/data/pinnedNews";
import { ExternalLink, Pin, Headphones } from "lucide-react";

function TagBadge({ tag }: { tag?: NewsItem["tag"] }) {
  if (!tag) return null;
  const styles =
    tag === "Stadium"
      ? "bg-fire-red/20 text-fire-red-light border-fire-red/30"
      : "bg-white/10 text-warm-white/80 border-white/15";
  return (
    <span
      className={`text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded border ${styles}`}
    >
      {tag}
    </span>
  );
}

function NewsRow({ item, pinned }: { item: NewsItem; pinned?: boolean }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-3 items-start rounded-lg border border-fire-red/15 bg-charcoal/60 hover:border-fire-red/35 hover:bg-charcoal/90 px-4 py-3 transition-colors"
    >
      <div className="mt-0.5 shrink-0 text-fire-red-light/80">
        {pinned ? (
          <Pin className="w-4 h-4" aria-hidden />
        ) : (
          <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" aria-hidden />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          {pinned && (
            <span className="text-[10px] uppercase tracking-widest font-semibold text-fire-red-light">
              Pinned
            </span>
          )}
          <TagBadge tag={item.tag} />
        </div>
        <p className="text-sm sm:text-base font-medium text-warm-white group-hover:text-fire-red-light leading-snug">
          {item.title}
        </p>
        <p className="mt-1 text-xs text-muted">
          {item.source}
          {item.publishedAt ? ` · ${formatRelativeTime(item.publishedAt)}` : ""}
        </p>
      </div>
    </a>
  );
}

export default async function NewsFeed() {
  const [{ pinned, latest }, podcast] = await Promise.all([
    getNewsFeed(),
    getPodcastEpisodes(),
  ]);

  const hasNews = pinned.length > 0 || latest.length > 0;
  const hasPodcast = podcast.episodes.length > 0;

  if (!hasNews && !hasPodcast) {
    return null;
  }

  return (
    <section id="news" className="relative w-full border-t border-fire-red/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {hasNews && (
          <>
            <div className="flex items-end justify-between gap-4 mb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-fire-red-light mb-1">
                  Fire & Stadium
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-warm-white tracking-tight">
                  In the news
                </h2>
                <p className="mt-1 text-sm text-muted max-w-xl">
                  Club updates and coverage of McDonald’s Park / The 78 — pinned
                  milestones stay up for everyone.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {pinned.map((item) => (
                <NewsRow key={item.id} item={item} pinned />
              ))}
              {latest.map((item) => (
                <NewsRow key={item.id} item={item} />
              ))}
            </div>
          </>
        )}

        {hasPodcast && (
          <div className={hasNews ? "mt-10" : ""}>
            <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-fire-red-light mb-1">
                  Local podcast
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-warm-white tracking-tight">
                  Latest from {podcast.showName}
                </h3>
                <p className="mt-1 text-sm text-muted max-w-xl">
                  Independent Chicago Fire FC talk — episodes open on the show’s
                  site.
                </p>
              </div>
              <a
                href={podcast.showUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-fire-red-light hover:underline whitespace-nowrap"
              >
                All episodes →
              </a>
            </div>

            <div className="flex flex-col gap-2.5">
              {podcast.episodes.map((ep) => (
                <a
                  key={ep.id}
                  href={ep.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-3 items-start rounded-lg border border-fire-red/15 bg-charcoal/60 hover:border-fire-red/35 hover:bg-charcoal/90 px-4 py-3 transition-colors"
                >
                  <div className="mt-0.5 shrink-0 text-fire-red-light/80">
                    <Headphones
                      className="w-4 h-4 opacity-70 group-hover:opacity-100"
                      aria-hidden
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm sm:text-base font-medium text-warm-white group-hover:text-fire-red-light leading-snug">
                      {ep.title}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {podcast.showName}
                      {ep.publishedAt
                        ? ` · ${formatRelativeTime(ep.publishedAt)}`
                        : ""}
                      {ep.durationLabel ? ` · ${ep.durationLabel}` : ""}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        <p className="mt-4 text-[11px] text-muted/70">
          Headlines and episodes link to original publishers. Independent fan
          site — not affiliated with Chicago Fire FC, MLS, or the podcast
          creators.
        </p>
      </div>
    </section>
  );
}
