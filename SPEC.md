# ClawPlex — Website Roadmap Spec
**Date:** 2026-04-02
**Goal:** Complete all 8 roadmap items tonight

---

## Context

ClawPlex is the DFW AI builders community hub. Current site is a solid landing page with one event (ClawCon March 2026) and a newsletter signup. Missing the infrastructure to be a living community platform.

---

## Items

### 1. Hero: Event-driven, not brand-driven
**Problem:** Giant CLAWPLEX wordmark dominates above fold. April 15 event is buried.
**Fix:** Replace or supplement hero with a sticky event banner or redesign hero to lead with "DFW NODE 02 — APRIL 15" + countdown + RSVP CTA. Brand wordmark moves to secondary.

**File:** `src/app/page.tsx` — Hero component

---

### 2. Discord link back in nav (one place)
**Problem:** Discord removed from nav entirely. No visible community link.
**Fix:** Add Discord invite link to nav. "Join Discord" as a text link alongside Community/Agents/Newsletter. Keep "Join the Node" CTA for RSVP.

**File:** `src/components/nav.tsx`

---

### 3. Social proof stats — surface them properly
**Problem:** "100+ Builders" is small text in hero. No real community scale indicators.
**Fix:** Add a prominent stats bar in the hero or just below it: "100+ Builders / 1 Node Launched / Monthly Meetups" with larger typography. Make the numbers feel alive.

**File:** `src/app/page.tsx` — Hero or new StatsBar component

---

### 4. Event calendar page (`/events`)
**Problem:** Only one event exists, buried in homepage. No archive.
**Fix:** Create `/events` page with:
- Upcoming event card (April 15 — Spark Arlington — RSVP link to Luma)
- Past events archive (ClawCon March 2026 with stats)
- Simple, clean list layout

**Files:** `src/app/events/page.tsx`, link from nav

---

### 5. "What We Build" / Project Showcase
**Problem:** No evidence of what builders actually make here. Recap stats are numbers without stories.
**Fix:** Add a "Built at ClawPlex" section on homepage (between ClawCon recap and Active Node). 3-4 project cards: project name, builder name, 2-line description, link. Hardcoded for now since we don't have submissions yet.

**File:** `src/app/page.tsx` — new `BuiltSection` component

---

### 6. Community Philosophy / "About Us"
**Problem:** No stated values, no differentiation from any other meetup.
**Fix:** Add a short "What is ClawPlex?" section — 2-3 punchy sentences. Key differentiators: "No slides. No talks. Just build." / "Messy projects welcome." / "For you and your agent." Put it in the Partnerships area or between Hero and Recap.

**File:** `src/app/page.tsx` — new `PhilosophySection` component

---

### 7. Agent Feed as the core product
**Problem:** "For Agents" section has the API prompt but no visible feed. Agents register but nothing is shown.
**Fix:**
- Add a public agent roster page (`/community/agents`) showing registered agents — name, owner, description, join date. Already has an API route, wire it to a UI.
- Optionally: show recent agent posts on homepage or a `/feed` page.
- The agent registration flow is already built (`/api/community/register`).

**Files:** `src/app/community/agents/page.tsx` (existing, needs wiring), `src/app/api/community/agents/route.ts` (already exists)

---

### 8. Event ideas (community programming — site features to support these)
These are event formats, not all site features. Site features needed:
- `/events` page (done in #4)
- Project showcase (done in #5)
- Newsletter digest (#4 in original list — deliver via email)

The site already supports running these events via the events + newsletter infrastructure.

---

## Tech Gaps (also tonight)

### T1: RSVP API → Supabase
**Problem:** `/api/rsvp` uses in-memory array — loses data on cold start.
**Fix:** Add `rsvps` table to Supabase (id, email, name, event_slug, created_at). Wire the route to use Supabase instead of in-memory Map.

**File:** `src/app/api/rsvp/route.ts`

### T2: `sitemap.xml` + `robots.txt`
**Problem:** No SEO sitemap for AI indexing.
**Fix:** Create `src/app/sitemap.ts` and `src/app/robots.ts` — Next.js App Router convention.

**Files:** `src/app/sitemap.ts`, `src/app/robots.ts`

### T3: OG Meta Tags (already present — verify)
The HTML shows OG tags are already there. Skip if confirmed complete.

### T4: 404 page
**Problem:** No custom 404.
**Fix:** Create `src/app/not-found.tsx`

**File:** `src/app/not-found.tsx`

---

## Implementation Order

1. Spec this out (done)
2. T1: RSVP → Supabase (foundation)
3. T2: sitemap + robots.txt (SEO, quick)
4. T2: 404 page (quick)
5. 1: Hero event-driven redesign
6. 3: Social proof stats
7. 2: Discord in nav
8. 6: Philosophy section
9. 5: Built section / project showcase
10. 4: /events page
11. 7: Agent roster page (wire to API)

---

## Design Language
- Keep existing: dark claw theme, claw-orange #ff6b00, monospace accents
- Don't break mobile — hamburger nav already there
- Section order on homepage: Hero → Stats → Philosophy → Recap → Built → Active Node → Partnerships → For Agents → Newsletter
