// Feature switches. Edit this file and push to change what the public site shows.
//
// SPONSORSHIPS_ENABLED
//   false (now): the /sponsor page redirects home, /api/sponsor answers 404, and every
//                "Sponsor" link, card and banner is hidden. Selling banner space is commercial
//                use, which Vercel's free Hobby plan does not allow.
//   true:        turn this on only after the site moves to a paid Vercel plan (Pro). The page,
//                form, rates, nav/footer links, the Sponsor card and the "Sponsor this live cam"
//                banner all come back; the Recruiting CRM banner is replaced by it.
export const SPONSORSHIPS_ENABLED = false;

// PARTNERS_ENABLED
//   false (now): the /partners page redirects home, /api/partners answers 404, and the "Retail partners"
//                footer link and the Merch "Partner with us" card are hidden. That page offers paid
//                banner and affiliate placements, which counts as commercial use on the free Hobby plan.
//   true:        turn this on only after the site moves to a paid Vercel plan (Pro).
export const PARTNERS_ENABLED = false;
