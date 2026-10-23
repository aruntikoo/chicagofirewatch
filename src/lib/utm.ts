export const YT_UTM = "utm_source=chicagofirewatch&utm_medium=website&utm_campaign=webcam_awareness";

/** Append website UTM params to an outbound YouTube link (not for iframe embed URLs). */
export function withUtm(url: string): string {
  return url + (url.includes("?") ? "&" : "?") + YT_UTM;
}
