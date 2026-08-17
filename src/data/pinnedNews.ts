export type NewsItem = {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string; // ISO date
  tag?: "Stadium" | "Team" | "Club";
  pinned?: boolean;
};

/**
 * Manual pins — visible to every visitor until you remove them.
 * Edit this file and deploy to pin/unpin major stadium or club stories.
 */
export const pinnedNews: NewsItem[] = [
  {
    id: "pin-mcdonalds-park-naming",
    title:
      "McDonald’s and Chicago Fire FC announce stadium naming rights: McDonald’s Park to open in 2028",
    url: "https://www.chicagofirefc.com/news/",
    source: "Chicago Fire FC",
    publishedAt: "2025-06-01T12:00:00.000Z",
    tag: "Stadium",
    pinned: true,
  },
  {
    id: "pin-groundbreaking-2026",
    title:
      "Chicago Fire break ground on $750 million South Loop soccer stadium at The 78",
    url: "https://www.chicagotribune.com/2026/03/04/chicago-fire-break-ground-soccer-stadium/",
    source: "Chicago Tribune",
    publishedAt: "2026-03-04T17:00:00.000Z",
    tag: "Stadium",
    pinned: true,
  },
];
