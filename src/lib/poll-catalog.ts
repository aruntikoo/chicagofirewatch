import { getRedis } from "@/lib/redis";
import { polls as seedPolls, type PollOption } from "@/data/polls";

export type CatalogStatus = "draft" | "active" | "closed";

export type CatalogPoll = {
  id: string;
  question: string;
  options: PollOption[];
  status: CatalogStatus;
  startsAt: string;
  endsAt: string;
};

const CATALOG_KEY = "poll:catalog";

function seedCatalog(): CatalogPoll[] {
  return seedPolls.map((p) => ({
    id: p.id,
    question: p.question,
    options: p.options,
    status: p.status as CatalogStatus,
    startsAt: p.startsAt,
    endsAt: p.endsAt,
  }));
}

function parseCatalog(raw: unknown): CatalogPoll[] | null {
  if (!raw) return null;
  let data = raw;
  if (typeof raw === "string") {
    try {
      data = JSON.parse(raw);
    } catch {
      return null;
    }
  }
  if (!Array.isArray(data)) return null;
  return data as CatalogPoll[];
}

export async function readCatalog(): Promise<CatalogPoll[]> {
  const redis = getRedis();
  if (!redis) {
    return seedCatalog();
  }

  const raw = await redis.get(CATALOG_KEY);
  const parsed = parseCatalog(raw);
  if (parsed && parsed.length > 0) {
    return parsed;
  }

  const seed = seedCatalog();
  await redis.set(CATALOG_KEY, JSON.stringify(seed));
  return seed;
}

export async function writeCatalog(catalog: CatalogPoll[]): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;
  await redis.set(CATALOG_KEY, JSON.stringify(catalog));
  return true;
}

export function isPollOpen(
  poll: CatalogPoll,
  now = Date.now()
): boolean {
  if (poll.status !== "active") return false;
  const start = Date.parse(poll.startsAt);
  const end = Date.parse(poll.endsAt);
  if (Number.isNaN(start) || Number.isNaN(end)) return false;
  return now >= start && now <= end;
}

/** Public display poll: open active, else most recent active/closed (not draft). */
export async function getDisplayPoll(
  now = Date.now()
): Promise<CatalogPoll | null> {
  const catalog = await readCatalog();
  const publicPolls = catalog.filter((p) => p.status !== "draft");
  if (publicPolls.length === 0) return null;
  const open = publicPolls.find((p) => isPollOpen(p, now));
  if (open) return open;
  const active = publicPolls.find((p) => p.status === "active");
  if (active) return active;
  return (
    [...publicPolls].sort(
      (a, b) => Date.parse(b.endsAt) - Date.parse(a.endsAt)
    )[0] ?? null
  );
}

export async function getPollById(id: string): Promise<CatalogPoll | null> {
  const catalog = await readCatalog();
  return catalog.find((p) => p.id === id) ?? null;
}

export async function getClosedPolls(
  limit = 5,
  now = Date.now()
): Promise<CatalogPoll[]> {
  const catalog = await readCatalog();
  const display = await getDisplayPoll(now);
  return catalog
    .filter((p) => p.status === "closed" || (p.status === "active" && !isPollOpen(p, now)))
    .filter((p) => !(display && isPollOpen(display, now) && p.id === display.id))
    .sort((a, b) => Date.parse(b.endsAt) - Date.parse(a.endsAt))
    .slice(0, limit);
}

export function formatPollDateRange(poll: CatalogPoll): string {
  const start = Date.parse(poll.startsAt);
  const end = Date.parse(poll.endsAt);
  if (Number.isNaN(start) || Number.isNaN(end)) return "";
  const fmt = (t: number) =>
    new Date(t).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  return `${fmt(start)} – ${fmt(end)}`;
}

export function slugifyOptionId(label: string, index: number): string {
  const base = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  return base || `option-${index + 1}`;
}

export function makePollId(prefix = "poll"): string {
  const d = new Date();
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6);
  return `${prefix}-${y}${m}${day}-${rand}`;
}

export async function createDraft(input: {
  question: string;
  options: { label: string; id?: string }[];
  startsAt: string;
  endsAt: string;
  id?: string;
}): Promise<CatalogPoll> {
  const catalog = await readCatalog();
  const id = input.id || makePollId();
  if (catalog.some((p) => p.id === id)) {
    throw new Error("Poll id already exists");
  }
  const options: PollOption[] = input.options.map((o, i) => ({
    id: o.id || slugifyOptionId(o.label, i),
    label: o.label.trim(),
  }));
  const poll: CatalogPoll = {
    id,
    question: input.question.trim(),
    options,
    status: "draft",
    startsAt: input.startsAt,
    endsAt: input.endsAt,
  };
  catalog.unshift(poll);
  const ok = await writeCatalog(catalog);
  if (!ok) throw new Error("Redis not configured");
  return poll;
}

export async function updateDraft(
  id: string,
  patch: {
    question?: string;
    options?: { label: string; id?: string }[];
    startsAt?: string;
    endsAt?: string;
  }
): Promise<CatalogPoll> {
  const catalog = await readCatalog();
  const idx = catalog.findIndex((p) => p.id === id);
  if (idx < 0) throw new Error("Poll not found");
  const existing = catalog[idx]!;
  if (existing.status !== "draft") {
    throw new Error("Only drafts can be edited");
  }
  const next: CatalogPoll = {
    ...existing,
    question: patch.question?.trim() ?? existing.question,
    startsAt: patch.startsAt ?? existing.startsAt,
    endsAt: patch.endsAt ?? existing.endsAt,
    options: patch.options
      ? patch.options.map((o, i) => ({
          id: o.id || slugifyOptionId(o.label, i),
          label: o.label.trim(),
        }))
      : existing.options,
  };
  catalog[idx] = next;
  const ok = await writeCatalog(catalog);
  if (!ok) throw new Error("Redis not configured");
  return next;
}

export async function activatePoll(id: string): Promise<CatalogPoll> {
  const catalog = await readCatalog();
  const idx = catalog.findIndex((p) => p.id === id);
  if (idx < 0) throw new Error("Poll not found");
  const target = catalog[idx]!;
  if (target.options.length < 2) {
    throw new Error("Poll needs at least 2 options");
  }

  const nowIso = new Date().toISOString();
  const updated = catalog.map((p) => {
    if (p.id === id) {
      return {
        ...p,
        status: "active" as const,
        startsAt:
          Date.parse(p.startsAt) > Date.now() ? nowIso : p.startsAt,
      };
    }
    if (p.status === "active") {
      return {
        ...p,
        status: "closed" as const,
        endsAt: nowIso,
      };
    }
    return p;
  });

  const ok = await writeCatalog(updated);
  if (!ok) throw new Error("Redis not configured");
  return updated.find((p) => p.id === id)!;
}

export async function closePoll(id: string): Promise<CatalogPoll> {
  const catalog = await readCatalog();
  const idx = catalog.findIndex((p) => p.id === id);
  if (idx < 0) throw new Error("Poll not found");
  const nowIso = new Date().toISOString();
  catalog[idx] = {
    ...catalog[idx]!,
    status: "closed",
    endsAt: nowIso,
  };
  const ok = await writeCatalog(catalog);
  if (!ok) throw new Error("Redis not configured");
  return catalog[idx]!;
}

export function countKey(pollId: string, optionId: string) {
  return `poll:${pollId}:count:${optionId}`;
}

export function votersKey(pollId: string) {
  return `poll:${pollId}:voters`;
}

export async function readCounts(
  poll: CatalogPoll
): Promise<Record<string, number>> {
  const redis = getRedis();
  const counts: Record<string, number> = {};
  if (!redis) {
    for (const opt of poll.options) counts[opt.id] = 0;
    return counts;
  }
  await Promise.all(
    poll.options.map(async (opt) => {
      const raw = await redis.get<number | string>(countKey(poll.id, opt.id));
      const n = typeof raw === "number" ? raw : Number(raw);
      counts[opt.id] = Number.isFinite(n) ? n : 0;
    })
  );
  return counts;
}
