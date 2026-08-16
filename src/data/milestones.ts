export type MilestoneStatus = "completed" | "current" | "upcoming";

export interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
  status: MilestoneStatus;
  /** YouTube video ID for this phase (recorded milestone or timelapse) */
  videoId?: string;
  /** Optional short label for the video button */
  videoLabel?: string;
}

export const milestones: Milestone[] = [
  {
    id: "announcement",
    year: "2025",
    title: "Announcement & Vision",
    description:
      "Joe Mansueto announces privately funded stadium at The 78. Dear Chicago vision unveiled.",
    status: "completed",
  },
  {
    id: "groundbreaking",
    year: "Mar 2026",
    title: "Groundbreaking",
    description:
      "Official groundbreaking ceremony. Pile driving and foundation work begins.",
    status: "completed",
    // Example: add videoId when you have a recording of this phase
    // videoId: "xxxxxxxxxxx",
    // videoLabel: "Watch Groundbreaking",
  },
  {
    id: "steel",
    year: "2026–2027",
    title: "Structural Steel Rising",
    description:
      "Tower cranes erect steel structure. Brick, steel, and glass facade takes shape.",
    status: "current",
    // Temporary test / early recording – replace or remove as new phase videos are added
    videoId: "Fnonw0DiIaQ",
    videoLabel: "Watch Current Phase",
  },
  {
    id: "interior",
    year: "2027",
    title: "Interior Fit-Out",
    description:
      "Seating, pitch, premium hospitality, and fan experience areas installed.",
    status: "upcoming",
  },
  {
    id: "opening",
    year: "2028",
    title: "Grand Opening",
    description:
      "Stadium opens for 2028 MLS season — first major Chicago pro stadium in 30+ years.",
    status: "upcoming",
  },
];

/** Cumulative timelapse videos (start → current). Add new entries as you publish them. */
export interface TimelapseVideo {
  id: string;
  title: string;
  description: string;
  videoId: string;
  dateLabel: string;
}

export const timelapseVideos: TimelapseVideo[] = [
  // Example – uncomment and update when you publish the first cumulative timelapse
  // {
  //   id: "tl-2026-q3",
  //   title: "Groundbreaking to Steel Rising",
  //   description: "Time-lapse of the first months of construction at The 78.",
  //   videoId: "xxxxxxxxxxx",
  //   dateLabel: "Mar–Aug 2026",
  // },
];

/** Simple viewer poll definition */
export interface PollOption {
  id: string;
  label: string;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
}

export const currentPoll: Poll = {
  id: "milestone-excitement-2026",
  question: "Which upcoming milestone are you most excited to watch live?",
  options: [
    { id: "steel-topping", label: "Steel structure topping out" },
    { id: "first-seats", label: "First seats installed" },
    { id: "pitch", label: "Pitch / field installation" },
    { id: "opening", label: "Opening day 2028" },
  ],
};
