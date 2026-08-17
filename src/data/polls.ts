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
 * Add new weekly polls at the top; leave closed ones for history.
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
  // Closed example — shows in Previous polls; replace/remove as you rotate
  {
    id: "cam-habit-2026-w32",
    question: "How often do you check the construction cam?",
    options: [
      { id: "daily", label: "Most days" },
      { id: "few-week", label: "A few times a week" },
      { id: "milestones", label: "Only for big milestones" },
      { id: "first-visit", label: "First time here" },
    ],
    status: "closed",
    startsAt: "2026-08-01T00:00:00.000Z",
    endsAt: "2026-08-10T23:59:59.000Z",
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

/** Closed polls for archive UI (excludes the currently displayed open poll). */
export function getClosedPolls(limit = 5, now = Date.now()): Poll[] {
  const display = getDisplayPoll(now);
  return polls
    .filter((p) => !isPollOpen(p, now))
    .filter((p) => !display || p.id !== display.id || display.status === "closed")
    .filter((p) => p.status === "closed" || !isPollOpen(p, now))
    .filter((p, i, arr) => {
      // de-dupe by id
      return arr.findIndex((x) => x.id === p.id) === i;
    })
    .filter((p) => {
      // If display is open, never include it in closed list
      if (display && isPollOpen(display, now) && p.id === display.id) return false;
      return true;
    })
    .sort((a, b) => Date.parse(b.endsAt) - Date.parse(a.endsAt))
    .slice(0, limit);
}

export function formatPollDateRange(poll: Poll): string {
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
