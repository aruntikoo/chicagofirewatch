export type PodcastEpisode = {
  id: string;
  title: string;
  url: string;
  publishedAt: string;
  durationLabel?: string;
};

const FEED_URL = "https://feeds.simplecast.com/Fd_bZO6f";
const SHOW_NAME = "Feed the Fire";
const SHOW_HOME =
  "https://bleav.com/shows/feed-the-fire-a-chicago-fire-podcast/";
const MAX_EPISODES = 3;
const FETCH_TIMEOUT_MS = 8_000;

function decodeXml(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function stripTags(s: string): string {
  return decodeXml(s).replace(/<[^>]+>/g, "").trim();
}

function formatDuration(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const t = raw.trim();
  // HH:MM:SS or MM:SS
  if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(t)) {
    const parts = t.split(":").map(Number);
    let seconds = 0;
    if (parts.length === 3) seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
    else seconds = parts[0] * 60 + parts[1];
    const mins = Math.max(1, Math.round(seconds / 60));
    return `${mins} min`;
  }
  // itunes duration sometimes pure seconds
  const asNum = Number(t);
  if (!Number.isNaN(asNum) && asNum > 0) {
    return `${Math.max(1, Math.round(asNum / 60))} min`;
  }
  return undefined;
}

function parseEpisodes(xml: string): PodcastEpisode[] {
  const episodes: PodcastEpisode[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = stripTags(block.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "");
    const link = stripTags(block.match(/<link>([\s\S]*?)<\/link>/i)?.[1] ?? "");
    const guid = stripTags(block.match(/<guid[^>]*>([\s\S]*?)<\/guid>/i)?.[1] ?? "");
    const pubDate = stripTags(
      block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1] ?? ""
    );
    const durationRaw =
      block.match(/<itunes:duration>([\s\S]*?)<\/itunes:duration>/i)?.[1] ??
      block.match(/<duration>([\s\S]*?)<\/duration>/i)?.[1];

    if (!title || !link) continue;
    const publishedAt = pubDate
      ? new Date(pubDate).toISOString()
      : new Date().toISOString();
    if (Number.isNaN(Date.parse(publishedAt))) continue;

    episodes.push({
      id: guid || link,
      title,
      url: link,
      publishedAt,
      durationLabel: formatDuration(
        durationRaw ? stripTags(durationRaw) : undefined
      ),
    });

    if (episodes.length >= MAX_EPISODES) break;
  }

  return episodes;
}

export async function getPodcastEpisodes(): Promise<{
  showName: string;
  showUrl: string;
  episodes: PodcastEpisode[];
}> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(FEED_URL, {
      signal: controller.signal,
      headers: { "User-Agent": "ChicagoFireWatch/1.0 (podcast discovery)" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      return { showName: SHOW_NAME, showUrl: SHOW_HOME, episodes: [] };
    }
    const xml = await res.text();
    return {
      showName: SHOW_NAME,
      showUrl: SHOW_HOME,
      episodes: parseEpisodes(xml),
    };
  } catch {
    return { showName: SHOW_NAME, showUrl: SHOW_HOME, episodes: [] };
  } finally {
    clearTimeout(timer);
  }
}
