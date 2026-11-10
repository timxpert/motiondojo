# Motion Dojo

The main brand and community website for Motion Dojo — where motion designers come to grow together.

Built with Next.js 15 (App Router) and plain CSS (`src/app/globals.css`).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Updating links — `src/config/site.ts`

| Setting | What it controls |
| --- | --- |
| `COMMUNITY_JOIN_URL` | Every "Join the community" / "Join Motion Dojo" button |
| `COURSE_URL` | "Explore the course" (Black Belt in Motion Design) |
| `DOJO_AI_URL` | "Discover Dojo's AI". While empty, the section shows "Access opens soon" and other links scroll to the Dojo's AI section |
| `NINJAS_SHOWCASE_URL` | Footer link to the Keyframe Ninjas showcase |
| `SOCIAL_LINKS` | Footer social links |
| `CONTACT` | Footer contact details (hidden while empty) |
| `NAV` | Header, mobile menu and footer navigation |

## Updating content — `src/data/content.ts`

- **`DOJO_AI`** — add `features`, `screenshots`, `demoVideo` and `access` when they're ready. Nothing renders for empty fields, and the product window shows a placeholder until a screenshot or demo is added.
- **`TESTIMONIALS`** — video testimonials supplied by the team (Vimeo links).
- **`COURSE_PHASES`** — the four Black Belt phases.

## Homepage sections (in order)

Hero + 16:9 reel → Introduction → What's inside the dojo → Black Belt in Motion Design → Dojo's AI → The community → Testimonials → Philosophy → Final call to action → Footer.

## Fonts

Sora (Google Fonts) for text and Clash Display (Fontshare) for headings, both loaded in `src/app/layout.tsx`.

## Motion

One load sequence in the hero: the headline rises in, the animation curve draws, the keyframes appear and the playhead sweeps once. Nothing animates on scroll. Hover states change colour only. All motion is off for visitors who prefer reduced motion. Styles are at the end of `globals.css`.

## Design context

`PRODUCT.md` records who the site is for, the brand commitments and what content must not be invented. Design tools such as Impeccable read it.
