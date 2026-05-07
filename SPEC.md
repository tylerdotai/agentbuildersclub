# SPEC.md — ClawPlex Site Refresh

**Goal:** Funnel every page to drive event RSVPs and attract AI builders, entrepreneurs, business owners, founders, and beginners to ClawPlex meetups.

**Primary conversion:** RSVP for next event (June 3, 2026 · CreateFW · Fort Worth)
**Secondary conversion:** Join Discord (ongoing engagement pipeline)

---

## 1. Remove Crypto/Blockchain from User-Facing UI (Cosmetic Only)

**Scope:** The crypto infrastructure (Privy wallet auth, `owner_wallet` in the backend, `signing.ts`, wallet-based identity) stays in place — it works as a clean email sign-in and is invisible to users. This item is purely cosmetic label updates.

**What to change:**
- Nav `PrivyWalletButton`: "Connect Wallet" → "Sign In" (button label + any tooltip)
- PrivyWrapper `loginMethods`: keep `wallet` in the backend config, but UX is email-first. Users should not see any "wallet" or "crypto" language in the sign-in flow.
- Dashboard sign-in prompt: "Sign in with your wallet..." → "Sign in to view your registered agents..."
- Privacy policy: remove the "wallet address if you connect one via Privy" line from the data collection section (email-only is cleaner and more accurate for what users actually experience)

**Files to change:**
- `src/components/privy-button.tsx`
- `src/components/privy-wrapper.tsx` (loginMethods comment if any)
- `src/app/community/dashboard/page.tsx`
- `src/app/privacy/page.tsx`

**Exit criteria:**
- Zero "wallet" language visible to users in the sign-in UX
- Privacy policy accurately reflects email-only sign-in
- Backend (signing.ts, owner_wallet, Privy config) left unchanged — crypto stays behind the scenes

---

## 2. Homepage Hero — Lead with the Next Event

**Current state:** Hero has banner image + "Built by builders, for builders" headline. Countdown is below the fold. Social proof is minimal.

**Change:**
- Hero section should open with the next event date, venue, and RSVP CTA — above the fold on desktop
- Add meetup photo from May 6 (already added to `/node-03-meetup.png`)
- Add social proof badge: "2 meetups done · Next: June 3 · CreateFW, Fort Worth"
- Headline should feel like an invitation, not a manifesto: something that speaks to showing up and building with others
- Keep the "Built by builders" line but move it below the fold — it's supporting copy now, not the hook

**Files:** `src/app/page.tsx` (HeroBanner + EventSection)

**Exit criteria:**
- Above the fold: next event date + location + RSVP button + meetup photo
- Headline speaks to "showing up and building" not abstract brand positioning
- May 6 meetup photo is visible in hero or immediately below it

---

## 3. Rewrite Homepage Copy for Four Personas

**Personas:**
1. **AI builders** — want proof it's technically serious, hands-on, real projects
2. **Entrepreneurs / founders** — want deal flow, collaborators, people who ship
3. **Business owners** — want automation ROI, practical tools, not hype
4. **Beginners** — want to know it's not intimidating, there's a low bar to show up

**What to change:**
- "What is ClawPlex" section should speak to all four without losing any
- The three "ways to engage" should feel like a progression from curious → committed
- No jargon that excludes beginners; no vagueness that bores builders
- Test: a first-timer lands on the page — do they feel like they belong in 5 seconds?

**Copy principle:** Describe what *actually happens* — weekly meetups, live demos, people showing what they shipped, no slides, no vendor pitches. Real > impressive.

**Files:** `src/app/page.tsx` (WhatIsClawPlex + ThreeWays sections)

**Exit criteria:** All four personas can see themselves in the copy. No exclusionary jargon. Real specificity over generic community language.

---

## 4. Events Page — Track Record, Not Calendar

**Current state:** Events page shows upcoming + past events with venue/location info. Past events have minimal context.

**Change:**
- Past events should feel documented and real — photos, headcount, what happened
- May 6 meetup (Node 03) should have the meetup photo + stats visible
- Upcoming event (Node 04) should have aggressive RSVP CTA — not just a link, but a reason to click now
- Consider adding a "why attend" callout on the upcoming event — what specifically happens there
- The page header should make clear: "this is an ongoing community, not a one-time conference"

**Files:** `src/app/events/page.tsx`

**Exit criteria:**
- Node 03 (May 6) shows meetup photo + attendee count + what happened
- Node 04 (June 3) has prominent RSVP CTA with concrete "what to expect"
- Page reads like a record of real activity, not a schedule board

---

## 5. Sponsor Page — Build Community Legitimacy

**Current state:** `/sponsors` page exists but content is unknown — audit it.

**Change:**
- If no real sponsors exist yet, remove the page from nav and sitemap temporarily
- If Jonesy Cookie or other real local partners exist, add them with logo, description, and link
- Sponsor logos/placement should feel credible, not like placeholder names
- Each sponsor entry should include: name, what they provide, how it ties to the community

**Files:** `src/app/sponsors/page.tsx`, `src/components/nav.tsx`

**Exit criteria:**
- Nav and sitemap only show sponsors page if it has real content
- If sponsors exist, page shows logo + what they do for the community + links
- No empty or placeholder sponsor entries

---

## 6. Remove Crypto/Blockchain from Nav and Footer

**Current state:** Nav and footer may have links to crypto/Web3 features.

**Change:**
- Audit nav links — remove anything that isn't community-relevant (wallet connect, blockchain features, etc.)
- Footer should be minimal: event date, Discord link, newsletter signup, maybe a one-liner about what ClawPlex is
- No crypto/blockchain references anywhere in nav or footer

**Files:** `src/components/nav.tsx`, `src/components/footer.tsx`

**Exit criteria:** Nav and footer only contain links that serve the mission (events, community, Discord, newsletter, skills if active).

---

## 7. Skills Page — Active or Hidden

**Current state:** `/skills` page exists. Is it active content or placeholder?

**Change:**
- If skills page is empty, half-finished, or looks like a template: remove it from nav and sitemap
- If it has real content: make sure it's accurate, has real skill examples, and links to working install/config docs
- Don't keep a page that sends people to dead ends

**Files:** `src/app/skills/page.tsx`, `src/components/nav.tsx`, `src/app/sitemap.ts`

**Exit criteria:**
- Skills page is either (a) genuinely active with real content, or (b) removed from nav and sitemap
- No "coming soon" or empty state skills pages left visible

---

## General Notes

- Do not touch `llms.txt` — it's for agent ingestion, not user-facing
- Preserve existing build passing (`npm run build`)
- Preserve existing tests if any exist
- Commit cleanly — one logical commit per item above, message describes the change, not "updates"
- PR from `feat/site-refresh` → `main` when all 7 items are complete
- All changes should feel intentional, not incremental drift — the site's voice should be consistent by the end