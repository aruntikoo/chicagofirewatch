import { NextResponse } from "next/server";

const CHANNEL_ID = "UCCpOx6W4-N2BhFRHdc1043w";
const EMBED_URL = `https://www.youtube.com/embed/live_stream?channel=${CHANNEL_ID}`;
const CACHE_MS = 60_000;

type LiveStatus = {
  live: boolean;
  videoId: string | null;
};

let cache: { at: number; value: LiveStatus } | null = null;

function extractPlayerResponse(html: string): unknown | null {
  const marker = 'player_response":"';
  const i = html.indexOf(marker);
  if (i < 0) return null;
  const start = i + marker.length;
  let esc = false;
  for (let j = start; j < html.length; j++) {
    const c = html[j];
    if (esc) {
      esc = false;
      continue;
    }
    if (c === "\\") {
      esc = true;
      continue;
    }
    if (c === '"') {
      try {
        const literal = html.slice(start, j);
        const decoded = JSON.parse('"' + literal + '"');
        return JSON.parse(decoded);
      } catch {
        return null;
      }
    }
  }
  return null;
}

function readLive(player: unknown): LiveStatus {
  if (!player || typeof player !== "object") {
    return { live: false, videoId: null };
  }
  const p = player as {
    previewPlayabilityStatus?: {
      status?: string;
      liveStreamability?: {
        liveStreamabilityRenderer?: { videoId?: string };
      };
    };
  };
  const status = p.previewPlayabilityStatus?.status;
  const videoId =
    p.previewPlayabilityStatus?.liveStreamability?.liveStreamabilityRenderer
      ?.videoId;
  if (status === "OK" && typeof videoId === "string" && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    return { live: true, videoId };
  }
  return { live: false, videoId: null };
}

function isLiveWindowNow(): boolean {
  const hour = parseInt(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago",
      hour: "numeric",
      hourCycle: "h23",
    }).format(new Date()),
    10,
  );
  return hour >= 7 && hour < 18;
}

// The live_stream embed keeps pointing at the last stream after it ends, so
// confirm with the watch page that YouTube reports this id as live right now.
async function isLiveNow(videoId: string): Promise<boolean> {
  try {
    const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; ChicagoFireWatch/1.0; +https://www.chicagofirewatch.com)",
        "Accept-Language": "en-US,en;q=0.9",
      },
      cache: "no-store",
    });
    if (!res.ok) return true; // can't tell; keep the embed result
    const html = await res.text();
    if (html.includes('"isLiveNow":false')) return false;
    return true;
  } catch {
    return true;
  }
}

async function fetchLiveStatus(): Promise<LiveStatus> {
  if (!isLiveWindowNow()) return { live: false, videoId: null };
  const status = await fetchEmbedStatus();
  if (status.live && status.videoId && !(await isLiveNow(status.videoId))) {
    return { live: false, videoId: null };
  }
  return status;
}

async function fetchEmbedStatus(): Promise<LiveStatus> {
  const res = await fetch(EMBED_URL, {
    headers: {
      Referer: "https://www.chicagofirewatch.com/",
      "User-Agent":
        "Mozilla/5.0 (compatible; ChicagoFireWatch/1.0; +https://www.chicagofirewatch.com)",
    },
    cache: "no-store",
  });
  if (!res.ok) return { live: false, videoId: null };
  const html = await res.text();
  return readLive(extractPlayerResponse(html));
}

export async function GET() {
  const now = Date.now();
  if (cache && now - cache.at < CACHE_MS) {
    return NextResponse.json(cache.value, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  }

  try {
    const value = await fetchLiveStatus();
    cache = { at: now, value };
    return NextResponse.json(value, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (err) {
    console.error("live-status error:", err);
    const value = cache?.value ?? { live: false, videoId: null };
    return NextResponse.json(value, {
      headers: { "Cache-Control": "public, s-maxage=15" },
    });
  }
}
