export type PollStatus = "active" | "closed";

export type PollOption = {
  id: string;
  label: string;
};

export type Poll = {
  id: string;
  question: string;
  options: PollOption[];
  status: PollStatus;
  startsAt: string; // ISO
  endsAt: string; // ISO
};

/**
 * Poll catalog. Keep exactly one status: "active" for the live weekly question.
 * Set status to "closed" (or let endsAt pass) to lock results.
 * Add new weekly polls at the top; leave closed ones for history (Phase B archive).
 */
export const polls: Poll[] = [
  {
    id: "milestone-excitement-2026",
    question: "Which upcoming milestone are you most excited to watch live?",
    options: [
      { id: "steel-topping", label: "Steel structure topping out" },
      { id: "first-seats", label: "First seats installed" },
      { id: "pitch", label: "Pitch / field installation" },
      { id: "opening", label: "Opening day 2028" },
    ],
    status: "active",
    startsAt: "2026-08-11T00:00:00.000Z",
    endsAt: "2026-08-24T23:59:59.000Z",
  },
];

export function isPollOpen(poll: Poll, now = Date.now()): boolean {
  if (poll.status !== "active") return false;
  const start = Date.parse(poll.startsAt);
  const end = Date.parse(poll.endsAt);
  if (Number.isNaN(start) || Number.isNaN(end)) return false;
  return now >= start && now <= end;
}

/** Prefer the currently open active poll; otherwise the most recent catalog entry. */
export function getDisplayPoll(now = Date.now()): Poll | null {
  if (polls.length === 0) return null;
  const open = polls.find((p) => isPollOpen(p, now));
  if (open) return open;
  return polls[0] ?? null;
}

export function getPollById(id: string): Poll | null {
  return polls.find((p) => p.id === id) ?? null;
}
