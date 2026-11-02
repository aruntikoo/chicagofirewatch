import { getNewsFeed, formatRelativeTime } from "@/lib/news";
import { getPodcastEpisodes } from "@/lib/podcast";
import type { NewsItem } from "@/data/pinnedNews";
import { ExternalLink } from "lucide-react";
import PodcastEpisodeList from "@/components/PodcastEpisodeList";

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

function NewsRow({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-2.5 items-start rounded-lg border border-fire-red/15 bg-charcoal/60 hover:border-fire-red/35 hover:bg-charcoal/90 px-3 py-2.5 transition-colors"
    >
      <div className="mt-0.5 shrink-0 text-fire-red-light/60">
        <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <TagBadge tag={item.tag} />
        </div>
        <p className="text-sm font-medium text-warm-white group-hover:text-fire-red-light leading-snug">
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
  const [{ latest }, podcast] = await Promise.all([
    getNewsFeed(),
    getPodcastEpisodes(),
  ]);

  const hasNews = latest.length > 0;
  const hasPodcast = podcast.episodes.length > 0;

  if (!hasNews && !hasPodcast) {
    return null;
  }

  return (
    <section id="news" className="relative w-full border-t border-fire-red/10 bg-charcoal/30">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {hasNews && (
            <div className="flex flex-col h-[420px]">
              <div className="mb-3 shrink-0">
                <h2 className="text-2xl sm:text-3xl font-bold text-warm-white tracking-tight">
                  In the news
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Club updates and McDonald’s Park / The 78 coverage — most recent first
                </p>
              </div>
              <div className="flex-1 overflow-y-auto pr-2 space-y-2 scrollbar-thin">
                {latest.map((item) => (
                  <NewsRow key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}

          {hasPodcast && (
            <div className="flex flex-col h-[420px]">
              <div className="mb-3 shrink-0 flex flex-wrap items-end justify-between gap-2">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-warm-white tracking-tight">
                    {podcast.showName}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    Most recent episodes (last ~2 months)
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
              <div className="flex-1 overflow-y-auto pr-2">
                <PodcastEpisodeList
                  showName={podcast.showName}
                  episodes={podcast.episodes.slice(0, 8)}
                />
              </div>
            </div>
          )}
        </div>

        <p className="mt-6 text-[11px] text-muted/70 text-center">
          Headlines link to original publishers. Podcast audio is streamed from
          the publisher’s feed. Independent fan site — not affiliated with
          Chicago Fire FC, MLS, or the podcast creators.
        </p>
      </div>
    </section>
  );
}
