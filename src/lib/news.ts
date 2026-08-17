import { pinnedNews, type NewsItem } from "@/data/pinnedNews";

const MAX_AUTO = 4;
const FETCH_TIMEOUT_MS = 8_000;

/** Official / club-leaning Fire coverage */
const OFFICIAL_FEED =
  "https://news.google.com/rss/search?q=%22Chicago+Fire+FC%22+when:30d&hl=en-US&gl=US&ceid=US:en";

/** Local stadium / The 78 / McDonald's Park construction angle */
const STADIUM_FEED =
  "https://news.google.com/rss/search?q=%28%22McDonald%27s+Park%22+OR+%22The+78%22+OR+%22Fire+stadium%22%29+%28Chicago+OR+%22South+Loop%22%29+when:90d&hl=en-US&gl=US&ceid=US:en";

const BLOCKED_TITLE_PATTERNS = [
  /\bseason\s+\d+\b/i, // TV show seasons
  /\bseveride\b/i,
  /\bfirehouse\s*51\b/i,
  /\bnbc\b.*\bchicago fire\b/i,
  /\bchicago fire\b.*\b(tv|drama|episode|trailer)\b/i,
];

const PREFERRED_OFFICIAL = ["chicagofirefc.com", "mlssoccer.com", "mls.com"];
const PREFERRED_STADIUM = [
  "chicagotribune.com",
  "blockclubchicago.org",
  "chicagofirefc.com",
  "suntimes.com",
];

function isBlocked(title: string): boolean {
  return BLOCKED_TITLE_PATTERNS.some((re) => re.test(title));
}

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

function extractSourceFromTitle(title: string): { cleanTitle: string; source: string } {
  // Google News titles often end with " - Source Name"
  const idx = title.lastIndexOf(" - ");
  if (idx > 0 && idx < title.length - 3) {
    return {
      cleanTitle: title.slice(0, idx).trim(),
      source: title.slice(idx + 3).trim(),
    };
  }
  return { cleanTitle: title, source: "News" };
}

function parseRssItems(xml: string): NewsItem[] {
  const items: NewsItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const titleRaw = block.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "";
    const link = stripTags(block.match(/<link>([\s\S]*?)<\/link>/i)?.[1] ?? "");
    const pubDate = stripTags(
      block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1] ?? ""
    );
    const sourceTag = stripTags(
      block.match(/<source[^>]*>([\s\S]*?)<\/source>/i)?.[1] ?? ""
    );

    const titleDecoded = stripTags(titleRaw);
    if (!titleDecoded || !link) continue;
    if (isBlocked(titleDecoded)) continue;

    const { cleanTitle, source: titleSource } = extractSourceFromTitle(titleDecoded);
    const source = sourceTag || titleSource || "News";
    const publishedAt = pubDate ? new Date(pubDate).toISOString() : new Date().toISOString();
    if (Number.isNaN(Date.parse(publishedAt))) continue;

    items.push({
      id: link,
      title: cleanTitle,
      url: link,
      source,
      publishedAt,
    });
  }

  return items;
}

async function fetchFeed(url: string): Promise<NewsItem[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "ChicagoFireWatch/1.0 (news aggregator)" },
      next: { revalidate: 1800 }, // 30 min ISR-style cache on Vercel
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRssItems(xml);
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

function scoreItem(item: NewsItem, preferredHosts: string[]): number {
  const host = (() => {
    try {
      return new URL(item.url).hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  })();
  const sourceLower = item.source.toLowerCase();
  let score = 0;
  for (const p of preferredHosts) {
    if (host.includes(p) || sourceLower.includes(p.split(".")[0])) score += 10;
  }
  // Prefer fresher
  const ageHours = (Date.now() - Date.parse(item.publishedAt)) / 3_600_000;
  score += Math.max(0, 48 - ageHours) / 10;
  return score;
}

function dedupeByTitle(items: NewsItem[]): NewsItem[] {
  const seen = new Set<string>();
  const out: NewsItem[] = [];
  for (const item of items) {
    const key = item.title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().slice(0, 80);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

export async function getNewsFeed(): Promise<{
  pinned: NewsItem[];
  latest: NewsItem[];
}> {
  const [official, stadium] = await Promise.all([
    fetchFeed(OFFICIAL_FEED),
    fetchFeed(STADIUM_FEED),
  ]);

  const taggedOfficial = official.map((i) => ({
    ...i,
    tag: "Team" as const,
  }));
  const taggedStadium = stadium.map((i) => ({
    ...i,
    tag: "Stadium" as const,
  }));

  // Prefer official hosts for team, local hosts for stadium, then merge
  const rankedOfficial = [...taggedOfficial].sort(
    (a, b) => scoreItem(b, PREFERRED_OFFICIAL) - scoreItem(a, PREFERRED_OFFICIAL)
  );
  const rankedStadium = [...taggedStadium].sort(
    (a, b) => scoreItem(b, PREFERRED_STADIUM) - scoreItem(a, PREFERRED_STADIUM)
  );

  // Interleave stadium + team so construction stays visible
  const merged: NewsItem[] = [];
  const maxLen = Math.max(rankedStadium.length, rankedOfficial.length);
  for (let i = 0; i < maxLen; i++) {
    if (rankedStadium[i]) merged.push(rankedStadium[i]);
    if (rankedOfficial[i]) merged.push(rankedOfficial[i]);
  }

  const pinnedUrls = new Set(pinnedNews.map((p) => p.url));
  const latest = dedupeByTitle(merged)
    .filter((i) => !pinnedUrls.has(i.url))
    .slice(0, MAX_AUTO);

  return {
    pinned: pinnedNews,
    latest,
  };
}

export function formatRelativeTime(iso: string): string {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return "";
  const diffSec = Math.round((Date.now() - t) / 1000);
  if (diffSec < 60) return "just now";
  const min = Math.floor(diffSec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 48) return `${hr}h ago`;
  const days = Math.floor(hr / 24);
  if (days < 14) return `${days}d ago`;
  return new Date(t).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
