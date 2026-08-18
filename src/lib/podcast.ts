export type PodcastEpisode = {
  id: string;
  title: string;
  url: string;
  publishedAt: string;
  durationLabel?: string;
  /** Direct audio file from RSS <enclosure> when available */
  audioUrl?: string;
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
  if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(t)) {
    const parts = t.split(":").map(Number);
    let seconds = 0;
    if (parts.length === 3) seconds = parts[0]! * 3600 + parts[1]! * 60 + parts[2]!;
    else seconds = parts[0]! * 60 + parts[1]!;
    const mins = Math.max(1, Math.round(seconds / 60));
    return `${mins} min`;
  }
  const asNum = Number(t);
  if (!Number.isNaN(asNum) && asNum > 0) {
    return `${Math.max(1, Math.round(asNum / 60))} min`;
  }
  return undefined;
}

function attr(tag: string, name: string): string | undefined {
  const re = new RegExp(`${name}\\s*=\\s*["']([^"']+)["']`, "i");
  const m = tag.match(re);
  return m?.[1] ? decodeXml(m[1]) : undefined;
}

/** Prefer audio/mpeg / .mp3 enclosure URL from an item block. */
function parseEnclosureUrl(block: string): string | undefined {
  const tags = block.match(/<enclosure\b[^>]*\/?\s*>/gi) ?? [];
  if (tags.length === 0) {
    // Some feeds use media:content
    const media =
      block.match(/<media:content\b[^>]*>/gi) ??
      block.match(/<media:content\b[^>]*\/>/gi) ??
      [];
    for (const tag of media) {
      const url = attr(tag, "url");
      const type = (attr(tag, "type") || "").toLowerCase();
      if (url && /^https?:\/\//i.test(url) && (type.includes("audio") || /\.(mp3|m4a|aac)(\?|$)/i.test(url))) {
        return url;
      }
    }
    return undefined;
  }

  const scored: { url: string; score: number }[] = [];
  for (const tag of tags) {
    const url = attr(tag, "url");
    if (!url || !/^https?:\/\//i.test(url)) continue;
    const type = (attr(tag, "type") || "").toLowerCase();
    let score = 0;
    if (type.includes("mpeg") || type === "audio/mp3") score += 3;
    else if (type.includes("audio")) score += 2;
    if (/\.mp3(\?|$)/i.test(url)) score += 2;
    if (/\.m4a(\?|$)/i.test(url)) score += 1;
    scored.push({ url, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.url;
}

function parseEpisodes(xml: string): PodcastEpisode[] {
  const episodes: PodcastEpisode[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1]!;
    const title = stripTags(block.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "");
    const link = stripTags(block.match(/<link>([\s\S]*?)<\/link>/i)?.[1] ?? "");
    const guid = stripTags(block.match(/<guid[^>]*>([\s\S]*?)<\/guid>/i)?.[1] ?? "");
    const pubDate = stripTags(
      block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1] ?? ""
    );
    const durationRaw =
      block.match(/<itunes:duration>([\s\S]*?)<\/itunes:duration>/i)?.[1] ??
      block.match(/<duration>([\s\S]*?)<\/duration>/i)?.[1];
    const audioUrl = parseEnclosureUrl(block);

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
      audioUrl,
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
