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
| `DOJO_AI_URL` | Footer link to Dojo’s AI. Hidden while it’s empty (the homepage no longer has a Dojo’s AI tile) |
| `NINJAS_SHOWCASE_URL` | Footer link to the Keyframe Ninjas showcase |
| `SOCIAL_LINKS` | Footer social links |
| `CONTACT` | Footer contact details (hidden while empty) |
| `NAV` | Header, mobile menu and footer navigation |

## Updating content — `src/data/content.ts`

- **`TESTIMONIALS`** — video testimonials supplied by the team (Vimeo links).
- **`COURSE_PHASES`** — the four Black Belt phases.

## Homepage sections (in order)

Hero + 16:9 reel → Introduction → Meet the team → What's inside the dojo → Black Belt in Motion Design → The community → Testimonials → Final call to action → Footer.

## Course page — `/blackbelt`

Black Belt in Motion Design has its own page at `/blackbelt` (`src/app/blackbelt/page.tsx`). Links to it from the homepage open it in a new tab. Course copy, curriculum, sample projects, pricing and FAQs live in `src/data/blackbelt.ts`.

Payment uses Paystack. Only the **public** key is in the code (`ENROL.paystackPublicKey`). Before going live:

1. In Vercel → this project → Settings → Environment Variables, add `PAYSTACK_SECRET_KEY` (never commit it).
2. In the Paystack dashboard, set the webhook URL to `https://<your domain>/api/paystack-webhook`.
3. To serve the page at `joinmotiondojo.com/blackbelt`, add `joinmotiondojo.com` as a domain of this Vercel project.

Payments are confirmed on the server by `/api/verify-payment` (₦40,000, NGN) before the visitor sees "Payment received".

## Motion Dojo Connect: `connect.joinmotiondojo.com`

A community space for Keyframe Ninjas (students of Black Belt in Motion Design): profiles, a directory, work posts with likes and comments, follows and direct messages. Anyone can browse; signed-in members can follow, like, comment and message; only verified students can post work.

It lives in this same project (`src/connect`, route `src/app/connect`). `src/middleware.ts` serves it on any `connect.` host, so `connect.joinmotiondojo.com/students` shows `/connect/students`. Until Supabase is connected it runs as a preview with clearly labelled sample members.

**Setup (one time):**

1. Create a free project at [supabase.com](https://supabase.com).
2. In Supabase → SQL Editor, paste all of `supabase/schema.sql` and run it.
3. In Supabase → Authentication → URL Configuration, set the Site URL to `https://connect.joinmotiondojo.com` and add it to Redirect URLs.
4. In Vercel → this project → Settings → Environment Variables, add:
   - `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Supabase → Project Settings → API)
   - `SUPABASE_SERVICE_ROLE_KEY` (same page; server only, never commit it)
5. In Vercel → Domains, add `connect.joinmotiondojo.com` to this project, then redeploy.

**Students get the Keyframe Ninja badge automatically** when the email they sign in with paid for the course through Paystack (the webhook records it). For students who paid another way, add their email in Supabase → Table Editor → `enrolments`, or add a code to `invite_codes` and give it to them (use long random codes, e.g. `NINJA-7K2Q-9XMD`, so they can't be guessed). **Moderators:** set `is_moderator` to true on their row in `profiles`; they can remove any post or comment and read `reports`.

## Fonts

Sora (Google Fonts) for text and Clash Display (Fontshare) for headings, both loaded in `src/app/layout.tsx`.

## Motion

The logo reel under the hero is the only thing that moves on its own. Nothing animates on scroll. Hover states change colour only. All motion is off for visitors who prefer reduced motion. Styles are at the end of `globals.css`.

## Design context

`PRODUCT.md` records who the site is for, the brand commitments and what content must not be invented. Design tools such as Impeccable read it.
