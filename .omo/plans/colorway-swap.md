# ClawPlex Colorway Swap

## TL;DR

> **Quick Summary**: Swap the ClawPlex site colorway from the current black + orange + white editorial scheme to **black, royal blue, white, with signal-red accents**. The change is predominantly a token rename + value swap in `src/app/globals.css` plus a component-wide class sweep. The "red" appears only as conservative punctuation (errors, focus ring, underline gradient tail, live/urgent indicator dots).
>
> **Deliverables**:
> - New token system: `claw-blue` (royal #1E40AF), `claw-blue-light` (hover #3B82F6), `claw-blue-soft` (tint), `claw-red` (#DC2626), `claw-red-soft` (tint)
> - 14+ component files updated to use the new tokens
> - i18n dictionaries updated (`en.ts`, `es.ts`)
> - Email template (`api/subscribe/route.ts`) updated
> - Design docs (`design.md`, `REDESIGN_PLAN.md`) updated to reflect new colorway
> - Brand asset hand-off list (logo, OG banner, favicon) for designer
>
> **Estimated Effort**: Short
> **Parallel Execution**: YES — 3 implementation waves + 1 final review wave
> **Critical Path**: Task 1 (globals.css) → Tasks 2-7 (component sweep) → Task 9 (design docs) → F1-F4

---

## Context

### Original Request
"I want to change the colorway of the website. We need a black, blue, white, with red accents. I need you to plan around this."

### Interview Summary
**Key Discussions**:
- **Color choices**: Royal blue `#1E40AF` (Tailwind blue-800) as primary; Signal red `#DC2626` (Tailwind red-600) as accent
- **Role hierarchy**: Blue is the primary accent (replaces orange on CTAs, eyebrows, focus ring tokens, selection tint, link highlights, hairline rules). Red is conservative punctuation only (errors, `:focus-visible` outline, `.underline-accent` gradient tail, "live"/"urgent" indicator dots)
- **Hover blue**: `#3B82F6` (Tailwind blue-500) — replaces `#ff8a3d` orange hover
- **Cyan handling**: REMOVE `--color-claw-cyan`; the 10 class refs across 4 files + i18n dictionaries become `--color-claw-blue-light` (explicit new tokens)
- **Scope**: Web + email template + design docs + brand asset hand-off list
- **Light mode**: Out of scope (dark-only editorial confirmed)
- **Asset regeneration**: Designer hand-off, not automated

**Research Findings**:
- ~95% of orange usage is token-driven (`--color-claw-orange: #fb7312` flows into 8 token slots)
- 10 hardcoded `hover:bg-[#ff8a3d]` sites across 3 component files
- `--color-claw-cyan: #22D3EE` is a dormant secondary accent (1 component usage + chart-2 + i18n strings)
- Both `design.md` (line 198, 535) and `REDESIGN_PLAN.md` (line 29) currently lock orange in
- AGENTS.md says "keep claw-* names stable for v2 redesign" — user explicitly chose the rename, so this is a deliberate course correction
- i18n dictionaries (`en.ts`, `es.ts`) embed CSS class names as translation strings (`color: "border-claw-cyan"`) — confirmed dead in `work-with-us-client.tsx` (not consumed) but live in `sponsors-client.tsx` line 125

### Metis Review
**Identified Gaps (addressed)**:
- `claw-cyan` replacement token gap → resolved: cyan → `claw-blue-light` (#3B82F6)
- `::selection` alpha decision → resolved: keep at ~0.30 (not the new 0.12 soft tint) for visibility
- `.underline-accent::after` is a 2-color gradient rewrite → resolved: `linear-gradient(90deg, #1E40AF 0%, rgba(220, 38, 38, 0) 100%)` (blue → red transparent fade)
- `chart-2` orphaned cyan → resolved: update to `#3B82F6` to keep palette blue-consistent
- Email `#ff6b00` → resolved: use `#1E40AF` (primary blue)
- `work-with-us` i18n dead `tier.color` → resolved: update value only, no structural refactor
- Risk: i18n class refs break if `claw-cyan` CSS token removed before i18n updated → mitigated by wave ordering (Wave 1 keeps old tokens defined, Wave 2 updates components, Wave 2 also removes old token defs in same atomic commit)
- Risk: focus ring red on blue-800 button has ~3.2:1 contrast → mitigated with Playwright visual check; fall-back token is `--focus-ring: #F87171` (red-400) if needed

---

## Work Objectives

### Core Objective
Change the ClawPlex site colorway from black + orange + white to **black, royal blue, white, with signal-red accents**, using the existing `claw-*` token system so that all components pick up the new colors automatically once tokens are updated.

### Concrete Deliverables
- Updated token definitions in `src/app/globals.css`
- Updated class references in 14+ component files
- Updated i18n dictionaries (`en.ts`, `es.ts`)
- Updated email template (`api/subscribe/route.ts`)
- Updated design docs (`design.md`, `REDESIGN_PLAN.md`)
- Asset hand-off checklist (logo, OG banner, favicon) for designer

### Definition of Done
^- [x] `pnpm run lint` passes with 0 errors
^- [x] `pnpm run typecheck` passes with 0 errors
^- [x] `pnpm exec vitest run` passes (no new tests added, existing must pass)
^- [x] `pnpm run build` succeeds
^- [x] `grep -r "claw-orange\|claw-cyan" src/` returns 0 matches
^- [x] `grep -r "#ff8a3d\|#fb7312\|#ff6b00\|#ef4444" src/` returns 0 matches
^- [x] Playwright screenshots of home, community, events, skills, sponsors show blue primary + red punctuation; no orange visible

### Must Have
- New `--color-claw-blue: #1E40AF` (royal blue) — primary accent
- New `--color-claw-blue-light: #3B82F6` — hover/brighten
- New `--color-claw-blue-soft: rgba(30, 64, 175, 0.12)` — subtle blue tint
- New `--color-claw-red: #DC2626` — punctuation
- New `--color-claw-red-soft: rgba(220, 38, 38, 0.12)` — subtle red tint
- `--primary: #1E40AF`, `--ring: #1E40AF`, `--chart-1: #1E40AF`, `--sidebar-primary: #1E40AF`, `--sidebar-ring: #1E40AF`
- `--destructive: #DC2626` (consolidated from #ef4444)
- `--primary-foreground: #fafafa` (light text on blue button)
- `.underline-accent::after` gradient: `linear-gradient(90deg, #1E40AF 0%, rgba(220, 38, 38, 0) 100%)` (blue start → red fade)
- `:focus-visible` outline: `2px solid #DC2626` (red, 2-color focus)
- `::selection` background: `rgba(30, 64, 175, 0.30)` (blue tint, visible alpha)
- All 14+ component files updated to use new tokens
- All i18n dictionary class strings updated
- Email heading color: `#1E40AF`

### Must NOT Have (Guardrails)
- ❌ Touch `--color-claw-void`, `--color-claw-surface`, `--color-claw-surface-2`, `--color-claw-border`, `--color-claw-border-hover`, `--color-claw-text`, `--color-claw-muted`, `--color-claw-dim` — black/white tones already correct
- ❌ Touch `--color-claw-success: #22C55E` — semantic green, out of scope
- ❌ Touch `--chart-3`, `--chart-4`, `--chart-5` — gray scale, out of scope
- ❌ Touch `src/app/layout.tsx` Vercel Analytics/Speed Insights wrappers
- ❌ Touch `src/app/llms.txt/route.ts` — LLM-facing docs, separate concern
- ❌ Touch `skills/` directory — installable skill content separate from web app
- ❌ Touch `supabase/migrations/` — database schema, unrelated
- ❌ Touch `package.json`, `pnpm-lock.yaml` — no dependency changes
- ❌ Touch `.env.example`, `.env.local` — env config unrelated
- ❌ Add new vitest tests — existing suite must pass without new coverage
- ❌ Refactor i18n dictionary structure (extract color to separate constant) — out of scope
- ❌ Add light-mode token infrastructure — dark-only editorial confirmed
- ❌ Regenerate `clawplex-logo.png`, `clawplex-banner.jpg`, `favicon.ico` — binary hand-off, no agent manipulation
- ❌ Change Playfair Display / Karla font setup — typography unchanged
- ❌ Touch v2 redesign phase work (Phases 1-20 in `REDESIGN_PLAN.md`) — visual redesign is separate from this colorway swap
- ❌ Modify any backend, API route logic, Supabase config, or data file

### Scope Boundaries
- **INCLUDE**: tokens, all 14+ component files, hover values, i18n dictionaries, email template, design docs, brand asset hand-off list
- **EXCLUDE**: backend/API logic, data, Supabase config, v2 redesign phase work, asset regeneration itself, light mode, new tests, structural i18n refactor, font/typography changes, package.json or lockfile changes

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: YES (vitest configured, `pnpm exec vitest run`)
- **Automated tests**: NONE NEW — CSS-only refactor, existing tests must pass
- **Framework**: vitest (existing)
- **If TDD**: N/A — this is a token rename + visual swap, no new business logic

### QA Policy
Every task MUST include agent-executed QA scenarios (see TODO template below).
Evidence saved to `.omo/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright (`playwright` skill) — Navigate, interact, assert DOM, screenshot
- **i18n verification**: Use Bash — grep dictionary files, assert class string updates
- **Build/CI**: Use Bash — `pnpm run lint && pnpm run typecheck && pnpm exec vitest run && pnpm run build`
- **Token sweep**: Use Bash — `grep -r "claw-orange\|claw-cyan\|#ff8a3d\|#fb7312\|#ff6b00\|#ef4444" src/` returns 0 matches

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start — foundation, sequential):
└── Task 1: src/app/globals.css — token pivot [visual-engineering]

Wave 2 (After Wave 1 — component sweep, 6 tasks in parallel):
├── Task 2: Nav + Footer + Layout [visual-engineering]
├── Task 3: Homepage client (home-client.tsx) [visual-engineering]
├── Task 4: Secondary pages (work-with-us, events, sponsors, not-found, privacy, terms) [visual-engineering]
├── Task 5: Newsletter + Subscribe (3 files) [visual-engineering]
├── Task 6: Community section (community-client, projects, skills, skill-card) [visual-engineering]
└── Task 7: i18n dictionaries (en.ts, es.ts) [writing]

Wave 3 (After Wave 2 — email + docs, 2 tasks sequential):
├── Task 8: Email template (api/subscribe/route.ts) [quick]
└── Task 9: Design docs (design.md, REDESIGN_PLAN.md) [writing]

Wave FINAL (After ALL tasks — 4 parallel reviews):
├── F1: Plan compliance audit [oracle]
├── F2: Code quality review [unspecified-high]
├── F3: Real manual QA with Playwright screenshots [unspecified-high + playwright]
└── F4: Scope fidelity check [deep]

Critical Path: Task 1 → Task 3 → Task 9 → F1-F4 → user okay
Parallel Speedup: ~80% faster than sequential (6 parallel tasks in Wave 2)
Max Concurrent: 6 (Wave 2)
```

### Dependency Matrix

- **1** (globals.css): — → 2-9, F1-F4
- **2** (nav/footer/layout): 1 → F1-F4
- **3** (homepage): 1 → F1-F4
- **4** (secondary pages): 1 → F1-F4
- **5** (newsletter): 1 → F1-F4
- **6** (community): 1 → F1-F4
- **7** (i18n): 1 → F1-F4
- **8** (email): 1-7 → F1-F4
- **9** (design docs): 1-7 → F1-F4
- **F1-F4**: 1-9

### Agent Dispatch Summary
- **Wave 1**: **1** — Task 1 → `visual-engineering`
- **Wave 2**: **6** — Tasks 2-6 → `visual-engineering` (parallel), Task 7 → `writing` (parallel)
- **Wave 3**: **2** — Task 8 → `quick`, Task 9 → `writing` (sequential)
- **Final**: **4** — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high` (+ playwright), F4 → `deep`

---

## TODOs

> Implementation + Test = ONE Task. Never separate.
> EVERY task MUST have: Recommended Agent Profile + Parallelization info + QA Scenarios.
> **A task WITHOUT QA Scenarios is INCOMPLETE. No exceptions.**
> **FORMAT**: Task labels MUST use bare numbers: `1.`, `2.`, `3.` — NOT `T1.`, `Task 1.`, `Phase 1:`.
> The /start-work progress counter requires exact format. Deviation = progress shows 0/0.
> Final Verification Wave labels MUST use `F1.`, `F2.`, etc.

- [x] 1. **Token pivot in `src/app/globals.css`** ✅ c046df8
- [x] 2. **Nav + Footer + Layout** ✅ dd9b6a5
- [x] 3. **Homepage client** ✅ d570e70
- [x] 4. **Secondary pages** ✅ d570e70
- [x] 5. **Newsletter + Subscribe** ✅ a485996
- [x] 6. **Community section + skill-card** ✅ fc9cc3f
- [x] 7. **i18n dictionaries** ✅ 8d576d2
- [x] 8. **Email template** ✅ 8d576d2
- [ ] 9. **Design docs** ⚠️ OUTSTANDING — subagent failed (skills not found: writing)

  **What to do**:
  - In `@theme inline` block (lines 7-65):
    - Rename `--color-claw-orange: #fb7312` → `--color-claw-blue: #1E40AF`
    - Rename `--color-claw-orange-soft: rgba(251, 115, 18, 0.12)` → `--color-claw-blue-soft: rgba(30, 64, 175, 0.12)`
    - Remove `--color-claw-cyan: #22D3EE`
    - Add `--color-claw-blue-light: #3B82F6` (hover/brighten)
    - Add `--color-claw-red: #DC2626` (conservative punctuation)
    - Add `--color-claw-red-soft: rgba(220, 38, 38, 0.12)`
  - In `:root` block (lines 67-101):
    - Update `--primary: #fb7312` → `--primary: #1E40AF`
    - Update `--primary-foreground: #0a0a0a` → `--primary-foreground: #fafafa` (light text on blue)
    - Update `--ring: #fb7312` → `--ring: #1E40AF`
    - Update `--chart-1: #fb7312` → `--chart-1: #1E40AF`
    - Update `--chart-2: #22D3EE` → `--chart-2: #3B82F6` (orphaned cyan → blue-500)
    - Update `--destructive: #ef4444` → `--destructive: #DC2626`
    - Update `--sidebar-primary: #fb7312` → `--sidebar-primary: #1E40AF`
    - Update `--sidebar-ring: #fb7312` → `--sidebar-ring: #1E40AF`
  - In `.underline-accent::after` (line 148): replace gradient with `linear-gradient(90deg, #1E40AF 0%, rgba(220, 38, 38, 0) 100%)` (blue start → red fade)
  - In `::selection` (line 159): replace `rgba(251, 115, 18, 0.32)` with `rgba(30, 64, 175, 0.30)` (visible blue tint)
  - In `:focus-visible` (line 165): replace `#fb7312` with `#DC2626` (2-color focus: red ring on blue UI)

  **Must NOT do**:
  - Do NOT remove `--color-claw-orange` or `--color-claw-cyan` from `:root` if any component still references them after Wave 2. (Mitigation: Wave 2 atomic commit removes the old token defs after component sweep; Wave 1 keeps them defined as a safety net.)
  - Do NOT touch `--color-claw-void`, `--color-claw-surface`, `--color-claw-surface-2`, `--color-claw-border`, `--color-claw-border-hover`, `--color-claw-text`, `--color-claw-muted`, `--color-claw-dim`, `--color-claw-success` (unchanged)
  - Do NOT touch chart-3, chart-4, chart-5 (gray scale, out of scope)
  - Do NOT touch font declarations (Playfair Display / Karla)
  - Do NOT touch scrollbar styles (intentionally neutral)
  - Do NOT add new structural CSS (no new layers, no new selectors beyond the named ones)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Design system token work; CSS color theory and Tailwind v4 theme integration
  - **Skills**: (none — pure CSS, no special skills needed)
  - **Skills Evaluated but Omitted**:
    - `playwright`: not needed for token-only changes; visual verification happens in F3

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 1 (sequential start)
  - **Blocks**: Tasks 2-7, F1-F4
  - **Blocked By**: None (can start immediately)

  **References** (CRITICAL — Be Exhaustive):

  **Pattern References** (existing code to follow):
  - `src/app/globals.css:7-65` — `@theme inline` block: token registration pattern for Tailwind v4
  - `src/app/globals.css:67-101` — `:root` block: shadcn-style CSS variable definitions
  - `src/app/globals.css:52-63` — current `claw-*` token block (orange + cyan to be replaced)

  **API/Type References** (contracts to implement against):
  - Tailwind v4 `@theme inline` syntax — `--color-{name}: {value}` registers as Tailwind utility (`bg-{name}`, `text-{name}`, `border-{name}`)
  - shadcn/ui CSS variable convention — `--{semantic-name}` pattern

  **External References** (libraries and frameworks):
  - Tailwind v4 theme docs: `https://tailwindcss.com/docs/theme` — how `--color-*` becomes utility classes
  - AGENTS.md design constraint: "Design tokens live in `src/app/globals.css` as `claw-*` variables/classes; keep names stable so older pages continue compiling during redesign work." — user has explicitly chosen to rename orange→blue, so this constraint is intentionally overridden for this task

  **WHY Each Reference Matters**:
  - `globals.css:7-65` shows the exact `@theme inline` syntax to follow when adding `--color-claw-blue-light`, `--color-claw-red`, `--color-claw-red-soft`
  - `globals.css:67-101` shows the `:root` shadcn aliasing pattern for `--primary`, `--ring`, `--chart-1`, etc.
  - The user chose the new explicit blue tokens (not reusing `claw-cyan`), so the cyan def must be removed cleanly

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.

  **Token def presence** (must be true):
  - [ ] `grep -n "claw-blue:" src/app/globals.css` returns a match with value `#1E40AF`
  - [ ] `grep -n "claw-blue-light:" src/app/globals.css` returns a match with value `#3B82F6`
  - [ ] `grep -n "claw-blue-soft:" src/app/globals.css` returns a match with `rgba(30, 64, 175, 0.12)`
  - [ ] `grep -n "claw-red:" src/app/globals.css` returns a match with value `#DC2626`
  - [ ] `grep -n "claw-red-soft:" src/app/globals.css` returns a match with `rgba(220, 38, 38, 0.12)`
  - [ ] `grep -n "primary: #1E40AF" src/app/globals.css` returns a match
  - [ ] `grep -n "destructive: #DC2626" src/app/globals.css` returns a match
  - [ ] `grep -n "chart-1: #1E40AF" src/app/globals.css` returns a match
  - [ ] `grep -n "chart-2: #3B82F6" src/app/globals.css` returns a match
  - [ ] `grep -n "primary-foreground: #fafafa" src/app/globals.css` returns a match

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Token file parses and lint passes
    Tool: Bash
    Preconditions: pnpm dependencies installed (pnpm install --no-frozen-lockfile)
    Steps:
      1. Run: pnpm run typecheck
      2. Assert: exit code 0, no type errors
      3. Run: pnpm run lint
      4. Assert: exit code 0, no lint errors
    Expected Result: Both commands exit 0
    Failure Indicators: TypeScript errors (token rename broke a type), lint errors (CSS syntax error in gradient or pseudo-selector)
    Evidence: .omo/evidence/task-1-typecheck.txt and .omo/evidence/task-1-lint.txt

  Scenario: Underline gradient renders blue-to-red fade
    Tool: Bash (start dev server in tmux) + Playwright
    Preconditions: pnpm run dev running on localhost:3000
    Steps:
      1. Use Playwright to navigate to a page containing an element with `.underline-accent` class (e.g. homepage hero)
      2. Find the element: `page.locator('.underline-accent')`
      3. Read computed style of `::after` pseudo-element: get `background` or `background-image`
      4. Assert: background-image contains `linear-gradient` with `rgb(30, 64, 175)` (blue) at 0% and `rgba(220, 38, 38, 0)` (red transparent) at 100%
    Expected Result: Gradient uses new blue→red fade, not old orange→orange
    Failure Indicators: Gradient still contains `rgb(251, 115, 18)` (orange)
    Evidence: .omo/evidence/task-1-underline-gradient.txt (capture computed style output)

  Scenario: Selection color is visible blue
    Tool: Playwright
    Preconditions: pnpm run dev running
    Steps:
      1. Navigate to homepage
      2. Use Playwright to select some body text (e.g. `page.evaluate(() => window.getSelection().selectAllChildren(document.querySelector('p')))`)
      3. Read computed `::selection` style: `background-color` should be `rgba(30, 64, 175, 0.3)` (visible blue)
    Expected Result: Selection tint is visible blue, not the old orange or invisible
    Failure Indicators: background-color is orange `rgba(251, 115, 18, 0.32)` or transparent
    Evidence: .omo/evidence/task-1-selection.txt

  Scenario: Focus ring is red
    Tool: Playwright
    Preconditions: pnpm run dev running, tab into page
    Steps:
      1. Navigate to homepage
      2. Tab into a button or link to trigger `:focus-visible`
      3. Read computed `outline-color`: should be `rgb(220, 38, 38)` (signal red)
    Expected Result: Focus ring is signal red
    Failure Indicators: outline-color is orange `rgb(251, 115, 18)` or blue
    Evidence: .omo/evidence/task-1-focus-ring.txt
  ```

  **Evidence to Capture**:
  - [ ] `task-1-typecheck.txt` — `pnpm run typecheck` output
  - [ ] `task-1-lint.txt` — `pnpm run lint` output
  - [ ] `task-1-underline-gradient.txt` — computed style of `.underline-accent::after`
  - [ ] `task-1-selection.txt` — computed `::selection` background-color
  - [ ] `task-1-focus-ring.txt` — computed `:focus-visible` outline-color

  **Commit**: YES (Wave 1 standalone)
  - Message: `style(tokens): swap orange primary to royal blue; add red punctuation tokens`
  - Files: `src/app/globals.css`
  - Pre-commit: `pnpm run lint && pnpm run typecheck`

- [ ] 2. **Nav + Footer + Layout: rename `claw-orange` → `claw-blue`; replace 2 hover-orange sites**

  **What to do**:
  - In `src/components/nav.tsx`:
    - Lines 159, 279: replace `hover:bg-[#ff8a3d]` with `hover:bg-claw-blue-light`
    - All `bg-claw-orange` → `bg-claw-blue`
    - All `text-claw-orange` → `text-claw-blue`
    - All `border-claw-orange` → `border-claw-blue`
    - All `bg-claw-orange/XX` opacity variants → `bg-claw-blue/XX`
  - In `src/components/footer.tsx`:
    - All `text-claw-orange` → `text-claw-blue` (3 sites: lines 50, 61, 113)
  - In `src/app/layout.tsx`:
    - Line 125: `focus:bg-claw-orange focus:text-claw-void` → `focus:bg-claw-blue focus:text-claw-void`

  **Must NOT do**:
  - Do NOT touch the Vercel Analytics or Speed Insights wrappers in `layout.tsx`
  - Do NOT change any other class names (border, padding, font, etc.)
  - Do NOT remove or restructure components

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI component class updates; visual surface area is the nav/footer (high visibility)
  - **Skills**: (none — class rename work)
  - **Skills Evaluated but Omitted**:
    - `playwright`: deferred to F3 final QA

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 3, 4, 5, 6, 7)
  - **Blocks**: F1-F4
  - **Blocked By**: Task 1

  **References**:

  **Pattern References** (existing code to follow):
  - `src/components/nav.tsx:159,279` — current `hover:bg-[#ff8a3d]` pattern (orange hover brighten)
  - `src/components/nav.tsx:190` — `bg-claw-orange text-claw-void` pattern (active state)

  **WHY Each Reference Matters**:
  - The two `hover:bg-[#ff8a3d]` sites use Tailwind arbitrary value syntax; the new `hover:bg-claw-blue-light` uses a custom token class (defined in Task 1)
  - `text-claw-void` is the dark text on a colored button — keep as-is, it's the dark text on blue

  **Acceptance Criteria**:

  ```
  [ ] src/components/nav.tsx contains zero matches for "claw-orange" or "#ff8a3d"
  [ ] src/components/nav.tsx contains at least 4 "claw-blue" matches (rename done)
  [ ] src/components/footer.tsx contains zero matches for "claw-orange"
  [ ] src/components/footer.tsx contains 3 "claw-blue" matches
  [ ] src/app/layout.tsx contains zero matches for "claw-orange"
  [ ] src/app/layout.tsx contains 1 "claw-blue" match
  ```

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Nav hover state renders blue
    Tool: Playwright
    Preconditions: pnpm run dev on localhost:3000
    Steps:
      1. Navigate to homepage (/)
      2. Hover over the "RSVP" or primary CTA button in nav
      3. Read computed background-color of the button (use `getComputedStyle`)
      4. Assert: background is `rgb(59, 130, 246)` (blue-500) on hover
    Expected Result: Hover state shows lighter blue, not orange
    Failure Indicators: background is `rgb(255, 138, 61)` (orange hover)
    Evidence: .omo/evidence/task-2-nav-hover.txt

  Scenario: Nav primary CTA shows blue (not orange) in default state
    Tool: Playwright
    Preconditions: pnpm run dev on localhost:3000
    Steps:
      1. Navigate to homepage
      2. Locate the primary nav CTA (look for button with `bg-claw-blue` class)
      3. Assert: computed background is `rgb(30, 64, 175)` (blue-800)
    Expected Result: CTA is royal blue
    Failure Indicators: background is `rgb(251, 115, 18)` (orange)
    Evidence: .omo/evidence/task-2-nav-cta.png (screenshot)

  Scenario: Footer links show blue accent
    Tool: Playwright
    Preconditions: pnpm run dev on localhost:3000
    Steps:
      1. Scroll to footer
      2. Locate `text-claw-blue` elements (active nav link, tagline, nav heading)
      3. Assert: computed `color` is `rgb(30, 64, 175)` (blue-800)
    Expected Result: Footer accents are blue, not orange
    Failure Indicators: color is orange `rgb(251, 115, 18)`
    Evidence: .omo/evidence/task-2-footer.png
  ```

  **Evidence to Capture**:
  - [ ] `task-2-nav-cta.png` — homepage nav CTA in default state
  - [ ] `task-2-nav-hover.txt` — computed background of CTA on hover
  - [ ] `task-2-footer.png` — footer with blue accents

  **Commit**: YES (Wave 2 batch)
  - Message: `style(nav+footer+layout): rename claw-orange → claw-blue; update hover tokens`
  - Files: `src/components/nav.tsx`, `src/components/footer.tsx`, `src/app/layout.tsx`
  - Pre-commit: `pnpm run lint && pnpm run typecheck`

- [ ] 3. **Homepage client (`home-client.tsx`): rename `claw-orange` → `claw-blue`; replace 4 hover sites; red live indicators**

  **What to do**:
  - In `src/app/[locale]/home-client.tsx`:
    - Lines 174, 352, 606, 766: replace `hover:bg-[#ff8a3d]` with `hover:bg-claw-blue-light`
    - All `bg-claw-orange` → `bg-claw-blue` (decorative dots, buttons, badges — NOT the live indicator dots, see below)
    - All `text-claw-orange` → `text-claw-blue` (~25 sites: lines 121, 267, 413, 428, 433, 442, 461, 474, 489, 495, 498, 516, 548, 582, 685, 743, and others)
    - All `border-claw-orange` → `border-claw-blue`
    - All `bg-claw-orange/XX` opacity variants → `bg-claw-blue/XX`
    - All `hover:text-claw-orange` → `hover:text-claw-blue`
    - All `via-claw-orange` → `via-claw-blue` (line 528)
  - **Red live indicator dots** (live/urgent semantics — these are the "next event" / "live" pulse dots, NOT eyebrow text or buttons):
    - The "next event" ping + dot (lines 155-156): change `bg-claw-orange` → `bg-claw-red` (this dot signals "live event countdown")
    - Live indicator dots (lines 225, 252): change `bg-claw-orange` → `bg-claw-red`
    - Events section ping + dot (lines 311-314): change `bg-claw-orange` → `bg-claw-red`
    - Agenda indicator dot (line 382): change `bg-claw-orange` → `bg-claw-red`
    - Upcoming event badge fill (line 394): change `bg-claw-orange` → `bg-claw-red`
  - **Blue (not red)**: All eyebrow text, section dividers, `via-claw-blue` gradient, all `text-claw-blue` accents, `hover:text-claw-blue`, copy button (line 606), builder attribution, FAQ section accents — these are decorative/emphasis, not "live" signals.

  **Must NOT do**:
  - Do NOT change any other class names (border, padding, font, etc.)
  - Do NOT remove or restructure components
  - Do NOT change other Tailwind utilities (only `claw-orange` and the live dots in the named lines)
  - Do NOT change gradient overlays (lines 221, 249, 379) — they use `claw-void`, not `claw-orange`
  - Do NOT change hero photography, image positions, or layout
  - Do NOT touch the Luma calendar iframe border (line 94 — uses `#bfcbda88`, not orange)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: High-traffic homepage component with many class renames and a red-paint decision for live indicators
  - **Skills**: (none — class rename work)
  - **Skills Evaluated but Omitted**:
    - `playwright`: deferred to F3

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 2, 4, 5, 6, 7)
  - **Blocks**: F1-F4
  - **Blocked By**: Task 1

  **References**:

  **Pattern References** (existing code to follow):
  - `src/app/[locale]/home-client.tsx:155-156` — current `bg-claw-orange` ping + dot (this becomes red)
  - `src/app/[locale]/home-client.tsx:174,352,606,766` — current `hover:bg-[#ff8a3d]` pattern
  - `src/app/[locale]/home-client.tsx:121-123` — eyebrow text + hairline rule pattern (`text-claw-orange` + `bg-claw-orange/60`)

  **WHY Each Reference Matters**:
  - The live indicator dots are visually distinct from eyebrow/divider lines — they need to be red because they signal "live event happening" / "urgency"
  - The 4 `hover:bg-[#ff8a3d]` sites all follow the same pattern: a primary CTA button using arbitrary orange hover. Replace with token-driven `hover:bg-claw-blue-light`

  **Acceptance Criteria**:

  ```
  [ ] src/app/[locale]/home-client.tsx contains zero matches for "claw-orange" or "#ff8a3d"
  [ ] src/app/[locale]/home-client.tsx contains at least 35 "claw-blue" matches
  [ ] At lines 155-156, 225, 252, 311-314, 382, 394: classes contain "claw-red" (not "claw-blue")
  [ ] At lines 174, 352, 606, 766: classes contain "hover:bg-claw-blue-light" (not "#ff8a3d")
  [ ] `pnpm run typecheck` passes (no TypeScript errors)
  ```

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Homepage hero CTA is blue with blue hover
    Tool: Playwright
    Preconditions: pnpm run dev on localhost:3000
    Steps:
      1. Navigate to / (homepage)
      2. Find the primary hero CTA (e.g. "RSVP for next Node")
      3. Assert computed background is `rgb(30, 64, 175)` (blue-800)
      4. Hover over the button
      5. Assert computed background becomes `rgb(59, 130, 246)` (blue-500)
    Expected Result: Blue default → blue-500 hover
    Failure Indicators: orange default or hover
    Evidence: .omo/evidence/task-3-hero-cta.png (default + hover screenshots)

  Scenario: Live event dot is red
    Tool: Playwright
    Preconditions: pnpm run dev on localhost:3000
    Steps:
      1. Navigate to homepage
      2. Find the "next event" / live event indicator (small dot near event countdown)
      3. Assert computed background is `rgb(220, 38, 38)` (signal red)
    Expected Result: Live dot is red, signaling live/urgent
    Failure Indicators: dot is blue or orange
    Evidence: .omo/evidence/task-3-live-dot.png

  Scenario: Eyebrow text is blue (not red)
    Tool: Playwright
    Preconditions: pnpm run dev on localhost:3000
    Steps:
      1. Find an eyebrow label (e.g. "NEXT NODE" or section eyebrow)
      2. Assert computed color is `rgb(30, 64, 175)` (blue-800)
    Expected Result: Eyebrow is blue (not red — red is for live indicators only)
    Failure Indicators: eyebrow is red or orange
    Evidence: .omo/evidence/task-3-eyebrow.png
  ```

  **Evidence to Capture**:
  - [ ] `task-3-hero-cta.png` — hero CTA in default + hover state
  - [ ] `task-3-live-dot.png` — live event indicator
  - [ ] `task-3-eyebrow.png` — eyebrow text style

  **Commit**: YES (Wave 2 batch)
  - Message: `style(home): rename claw-orange → claw-blue; red live indicators`
  - Files: `src/app/[locale]/home-client.tsx`
  - Pre-commit: `pnpm run lint && pnpm run typecheck`

- [ ] 4. **Secondary pages: work-with-us, events, sponsors, not-found, privacy, terms**

  **What to do**:
  - In `src/app/work-with-us/work-with-us-client.tsx`:
    - Lines 122, 218, 424: replace `hover:bg-[#ff8a3d]` with `hover:bg-claw-blue-light`
    - Line 509: replace `hover:text-[#ff8a3d]` with `hover:text-claw-blue-light`
    - All `bg-claw-orange` → `bg-claw-blue`
    - All `text-claw-orange` → `text-claw-blue`
    - All `border-claw-orange` → `border-claw-blue`
    - All `hover:border-claw-orange` → `hover:border-claw-blue`
    - All `bg-claw-orange/XX` opacity variants → `bg-claw-blue/XX`
  - In `src/app/events/events-client.tsx`:
    - All `text-claw-orange` → `text-claw-blue` (lines 59, 80, 141, etc.)
    - All `border-claw-orange` / `bg-claw-orange` → `border-claw-blue` / `bg-claw-blue` (lines 173, 181)
    - All `hover:border-claw-orange` / `hover:text-claw-orange` → blue variants
    - **Red indicator**: If any "live" / "ongoing" badge exists, paint it `bg-claw-red` (verify by reading the file; events page may have a "happening now" indicator)
  - In `src/app/sponsors/sponsors-client.tsx`:
    - All `text-claw-orange` → `text-claw-blue` (lines 79, 98, 117)
  - In `src/app/not-found.tsx`:
    - All `text-claw-orange` / `bg-claw-orange` / `border-claw-orange` → blue variants
  - In `src/app/privacy/page.tsx`:
    - Line 49: `text-claw-orange` → `text-claw-blue`
  - In `src/app/terms/page.tsx`:
    - Line 49: `text-claw-orange` → `text-claw-blue`

  **Must NOT do**:
  - Do NOT change any other class names
  - Do NOT touch the Luma iframe border in `events-client.tsx` (uses `#bfcbda88`, not orange)
  - Do NOT remove or restructure components
  - Do NOT touch the `tier.color` field consumed in `sponsors-client.tsx:125` (it pulls from i18n dictionary which is updated in Task 7)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Multiple secondary page components; class rename sweep
  - **Skills**: (none)
  - **Skills Evaluated but Omitted**:
    - `playwright`: deferred to F3

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 2, 3, 5, 6, 7)
  - **Blocks**: F1-F4
  - **Blocked By**: Task 1

  **References**:

  **Pattern References** (existing code to follow):
  - `src/app/work-with-us/work-with-us-client.tsx:122,218,424,509` — current `hover:bg-[#ff8a3d]` / `hover:text-[#ff8a3d]` pattern
  - `src/app/events/events-client.tsx:173,181` — primary CTA + secondary button pattern (`border-claw-orange bg-claw-orange` and `hover:border-claw-orange`)

  **WHY Each Reference Matters**:
  - The work-with-us file has 4 hover sites (3 backgrounds, 1 text), all using the same `hover:bg-[#ff8a3d]` pattern as the homepage
  - The events page has CTA + secondary button patterns that mirror the homepage CTA pattern

  **Acceptance Criteria**:

  ```
  [ ] All 6 files contain zero matches for "claw-orange" or "#ff8a3d"
  [ ] All 6 files contain matching "claw-blue" or "claw-blue-light" replacements
  [ ] `pnpm run typecheck` passes
  ```

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Work-with-us page CTA is blue
    Tool: Playwright
    Preconditions: pnpm run dev on localhost:3000
    Steps:
      1. Navigate to /work-with-us
      2. Find the primary CTA (e.g. "Apply" or "Partner with us")
      3. Assert computed background is `rgb(30, 64, 175)` (blue-800)
      4. Hover and assert background becomes `rgb(59, 130, 246)` (blue-500)
    Expected Result: Blue CTA with blue hover
    Failure Indicators: orange default or hover
    Evidence: .omo/evidence/task-4-workwithus-cta.png

  Scenario: Events page primary register button is blue
    Tool: Playwright
    Preconditions: pnpm run dev on localhost:3000
    Steps:
      1. Navigate to /events
      2. Find the "Register" or "RSVP" button
      3. Assert computed background is blue
    Expected Result: Blue button
    Failure Indicators: orange button
    Evidence: .omo/evidence/task-4-events-cta.png

  Scenario: Sponsors page active filter is blue
    Tool: Playwright
    Preconditions: pnpm run dev on localhost:3000
    Steps:
      1. Navigate to /sponsors
      2. Find the active tier filter (e.g. "Gold")
      3. Assert computed color/background is blue
    Expected Result: Blue active filter
    Failure Indicators: orange active filter
    Evidence: .omo/evidence/task-4-sponsors.png

  Scenario: 404 page CTA is blue
    Tool: Playwright
    Preconditions: pnpm run dev on localhost:3000
    Steps:
      1. Navigate to /this-page-does-not-exist
      2. Find the 404 CTA
      3. Assert computed background is blue
    Expected Result: Blue CTA on 404
    Failure Indicators: orange CTA
    Evidence: .omo/evidence/task-4-notfound.png
  ```

  **Evidence to Capture**:
  - [ ] `task-4-workwithus-cta.png` — work-with-us page CTA
  - [ ] `task-4-events-cta.png` — events register button
  - [ ] `task-4-sponsors.png` — sponsors active filter
  - [ ] `task-4-notfound.png` — 404 page CTA

  **Commit**: YES (Wave 2 batch)
  - Message: `style(pages): rename claw-orange → claw-blue on secondary pages`
  - Files: `src/app/work-with-us/work-with-us-client.tsx`, `src/app/events/events-client.tsx`, `src/app/sponsors/sponsors-client.tsx`, `src/app/not-found.tsx`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`
  - Pre-commit: `pnpm run lint && pnpm run typecheck`

- [ ] 5. **Newsletter + Subscribe: 3 component files**

  **What to do**:
  - In `src/components/newsletter/issue-client.tsx`:
    - All `text-claw-orange` → `text-claw-blue`
    - All `border-claw-orange` → `border-claw-blue`
    - All `bg-claw-orange` → `bg-claw-blue`
    - All `bg-claw-orange/XX` opacity variants → `bg-claw-blue/XX`
    - All `hover:text-claw-orange` → `hover:text-claw-blue`
    - All `hover:border-claw-orange` → `hover:border-claw-blue`
  - In `src/components/newsletter/newsletter-client.tsx`:
    - All `text-claw-orange` → `text-claw-blue`
    - All `border-claw-orange` → `border-claw-blue`
    - All `bg-claw-orange` → `bg-claw-blue`
    - All `bg-claw-orange/XX` opacity variants → `bg-claw-blue/XX`
    - All `hover:text-claw-orange` → `hover:text-claw-blue`
  - In `src/components/newsletter/subscribe-form-client.tsx`:
    - `focus:border-claw-orange` → `focus:border-claw-blue` (line 60)
    - `border-claw-orange bg-claw-orange` → `border-claw-blue bg-claw-blue` (line 65)

  **Must NOT do**:
  - Do NOT change any other class names
  - Do NOT touch the API route logic (Task 8 handles that)
  - Do NOT remove or restructure components

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Newsletter UI components; class rename sweep
  - **Skills**: (none)
  - **Skills Evaluated but Omitted**:
    - `playwright`: deferred to F3

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 2, 3, 4, 6, 7)
  - **Blocks**: F1-F4
  - **Blocked By**: Task 1

  **References**:

  **Pattern References** (existing code to follow):
  - `src/components/newsletter/issue-client.tsx:82,120` — current `border-claw-orange/30 bg-claw-orange/5` badge/tip box pattern
  - `src/components/newsletter/subscribe-form-client.tsx:60,65` — focus + submit button pattern

  **WHY Each Reference Matters**:
  - The `border-claw-orange/30 bg-claw-orange/5` pattern (orange with 30% border, 5% background) becomes `border-claw-blue/30 bg-claw-blue/5` — opacity variants are token-driven
  - Submit button is a primary CTA → `bg-claw-blue` (royal blue)

  **Acceptance Criteria**:

  ```
  [ ] All 3 files contain zero matches for "claw-orange"
  [ ] All 3 files contain matching "claw-blue" replacements
  [ ] `pnpm run typecheck` passes
  ```

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Newsletter page submit button is blue
    Tool: Playwright
    Preconditions: pnpm run dev on localhost:3000
    Steps:
      1. Navigate to /newsletter or any page with subscribe form
      2. Find the email submit button
      3. Assert computed background is `rgb(30, 64, 175)` (blue-800)
    Expected Result: Blue submit button
    Failure Indicators: orange button
    Evidence: .omo/evidence/task-5-newsletter-submit.png

  Scenario: Newsletter issue badge uses blue
    Tool: Playwright
    Preconditions: pnpm run dev on localhost:3000
    Steps:
      1. Navigate to /newsletter or a newsletter issue page
      2. Find a "Latest Issue" or badge
      3. Assert computed border-color is blue (rgba(30, 64, 175, 0.3))
    Expected Result: Blue badge
    Failure Indicators: orange badge
    Evidence: .omo/evidence/task-5-newsletter-badge.png

  Scenario: Subscribe form focus state is blue
    Tool: Playwright
    Preconditions: pnpm run dev on localhost:3000
    Steps:
      1. Navigate to a page with the subscribe form
      2. Click on the email input to focus it
      3. Read computed border-color: should be blue
    Expected Result: Blue focus border
    Failure Indicators: orange focus border
    Evidence: .omo/evidence/task-5-subscribe-focus.png
  ```

  **Evidence to Capture**:
  - [ ] `task-5-newsletter-submit.png` — subscribe button
  - [ ] `task-5-newsletter-badge.png` — issue badge
  - [ ] `task-5-subscribe-focus.png` — email input focus state

  **Commit**: YES (Wave 2 batch)
  - Message: `style(newsletter): rename claw-orange → claw-blue`
  - Files: `src/components/newsletter/issue-client.tsx`, `src/components/newsletter/newsletter-client.tsx`, `src/components/newsletter/subscribe-form-client.tsx`
  - Pre-commit: `pnpm run lint && pnpm run typecheck`

- [ ] 6. **Community section: community-client, projects, skills, skill-card — also handles `claw-cyan` → `claw-blue-light`**

  **What to do**:
  - In `src/app/community/community-client.tsx`:
    - All `text-claw-orange` → `text-claw-blue`
    - All `border-claw-orange` → `border-claw-blue`
    - All `bg-claw-orange` → `bg-claw-blue`
    - All `bg-claw-orange/XX` opacity variants → `bg-claw-blue/XX`
    - All `hover:text-claw-orange` → `hover:text-claw-blue`
    - **Cyan replacement** (lines 271, 276): `text-claw-cyan` → `text-claw-blue-light`
  - In `src/app/community/projects/page.tsx`:
    - All `text-claw-orange` → `text-claw-blue`
    - All `border-claw-orange` → `border-claw-blue`
    - All `bg-claw-orange` → `bg-claw-blue`
    - All `hover:border-claw-orange` / `hover:text-claw-orange` → blue variants
    - **Cyan replacement** (line 105): `text-claw-cyan` → `text-claw-blue-light`
  - In `src/app/skills/skills-client.tsx`:
    - All `text-claw-orange` → `text-claw-blue`
    - All `border-claw-orange` / `bg-claw-orange` → blue variants
    - All `hover:border-claw-orange` / `hover:text-claw-orange` → blue variants
  - In `src/components/skill-card.tsx`:
    - All `text-claw-orange` / `border-claw-orange` / `bg-claw-orange` → blue variants
    - All `bg-claw-orange/XX` opacity variants → `bg-claw-blue/XX`
    - **Cyan replacement** (lines 23, 31):
      - Line 23: `text-claw-cyan border-claw-cyan/30 bg-claw-cyan/10` → `text-claw-blue-light border-claw-blue-light/30 bg-claw-blue-light/10`
      - Line 31: `bg-claw-cyan` → `bg-claw-blue-light`

  **Must NOT do**:
  - Do NOT touch the purple/pink category colors in `skill-card.tsx` (separate color system, not orange)
  - Do NOT change any other class names
  - Do NOT remove or restructure components
  - Do NOT touch the hardcoded `tier.color` field in i18n (Task 7 handles dictionaries)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Community section UI components; class rename + cyan → blue-light replacement
  - **Skills**: (none)
  - **Skills Evaluated but Omitted**:
    - `playwright`: deferred to F3

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 2, 3, 4, 5, 7)
  - **Blocks**: F1-F4
  - **Blocked By**: Task 1

  **References**:

  **Pattern References** (existing code to follow):
  - `src/app/community/community-client.tsx:271,276` — `text-claw-cyan` pattern (the existing cyan usage is a light decorative accent for agent author bylines)
  - `src/components/skill-card.tsx:23` — `text-claw-cyan border-claw-cyan/30 bg-claw-cyan/10` (Research category — full utility trio)
  - `src/components/skill-card.tsx:31` — `bg-claw-cyan` (Research category dot)
  - `src/components/skill-card.tsx:24,32` — current `text-claw-orange border-claw-orange/30 bg-claw-orange/10` / `bg-claw-orange` (Productivity category — these are the orange→blue targets)

  **WHY Each Reference Matters**:
  - Cyan was a "decorative secondary accent" — replacing it with `claw-blue-light` (blue-500) keeps the visual weight consistent (bright, light blue accent vs. the dominant royal blue)
  - The 30%/10% opacity variants stay the same, only the color name changes

  **Acceptance Criteria**:

  ```
  [ ] All 4 files contain zero matches for "claw-orange" or "claw-cyan"
  [ ] All 4 files contain matching "claw-blue" or "claw-blue-light" replacements
  [ ] `pnpm run typecheck` passes
  ```

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Community page agent author byline uses blue-light
    Tool: Playwright
    Preconditions: pnpm run dev on localhost:3000
    Steps:
      1. Navigate to /community
      2. Find a community post with an agent author byline (small monospace text with link to the agent's site)
      3. Assert computed color is `rgb(59, 130, 246)` (blue-500), not cyan `rgb(34, 211, 238)` or orange
    Expected Result: Blue-light byline
    Failure Indicators: cyan or orange byline
    Evidence: .omo/evidence/task-6-community-byline.png

  Scenario: Projects page category label uses blue-light
    Tool: Playwright
    Preconditions: pnpm run dev on localhost:3000
    Steps:
      1. Navigate to /community/projects
      2. Find the cyan-bordered category label (was `text-claw-cyan`)
      3. Assert computed color is `rgb(59, 130, 246)` (blue-500)
    Expected Result: Blue-light category label
    Failure Indicators: cyan (rgb(34, 211, 238)) or orange
    Evidence: .omo/evidence/task-6-projects-category.png

  Scenario: Skills page active filter is blue
    Tool: Playwright
    Preconditions: pnpm run dev on localhost:3000
    Steps:
      1. Navigate to /skills
      2. Find the active filter button
      3. Assert computed border-color is blue
    Expected Result: Blue active filter
    Failure Indicators: orange active filter
    Evidence: .omo/evidence/task-6-skills-filter.png

  Scenario: Skill card category badge is blue
    Tool: Playwright
    Preconditions: pnpm run dev on localhost:3000
    Steps:
      1. Navigate to /skills
      2. Find a skill card with a category badge
      3. Assert badge border is blue, not orange
    Expected Result: Blue badge
    Failure Indicators: orange or cyan badge
    Evidence: .omo/evidence/task-6-skill-card.png
  ```

  **Evidence to Capture**:
  - [ ] `task-6-community-byline.png` — community agent author byline
  - [ ] `task-6-projects-category.png` — projects category label
  - [ ] `task-6-skills-filter.png` — skills active filter
  - [ ] `task-6-skill-card.png` — skill card badge

  **Commit**: YES (Wave 2 batch)
  - Message: `style(community): rename claw-orange → claw-blue; cyan → blue-light`
  - Files: `src/app/community/community-client.tsx`, `src/app/community/projects/page.tsx`, `src/app/skills/skills-client.tsx`, `src/components/skill-card.tsx`
  - Pre-commit: `pnpm run lint && pnpm run typecheck`

- [ ] 7. **i18n dictionaries: update embedded CSS class names in en.ts and es.ts**

  **What to do**:
  - In `src/lib/i18n/dictionaries/en.ts`:
    - Lines 508, 623: `color: "border-claw-orange"` → `color: "border-claw-blue"`
    - Lines 521, 636: `color: "border-claw-cyan"` → `color: "border-claw-blue-light"`
    - Line 536, 651: `color: "border-claw-success"` → unchanged (green, out of scope)
  - In `src/lib/i18n/dictionaries/es.ts`:
    - Same updates as en.ts (lines 508, 521, 536, 623, 636, 651)
  - Verify: `src/app/sponsors/sponsors-client.tsx:125` consumes `tier.color` via `className={... ${tier.color} ...}` — after the dictionary update, this resolves to a valid CSS class (`border-claw-blue` or `border-claw-blue-light`)

  **Must NOT do**:
  - Do NOT refactor the i18n dictionary structure (don't extract color to a separate constant — that's out of scope)
  - Do NOT translate or change any non-color string in the dictionaries
  - Do NOT touch the `color` field in `workWithUs.sponsorship.tiers` (the work-with-us component doesn't consume it — dead code, but updating the value still keeps it consistent for future use)

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: Translation file content updates; this is a content (string) edit, not a code logic change
  - **Skills**: (none — string replacements)
  - **Skills Evaluated but Omitted**:
    - `playwright`: not needed; final visual verify happens in F3

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 2, 3, 4, 5, 6)
  - **Blocks**: F1-F4
  - **Blocked By**: Task 1 (the new token names must exist for the dictionary strings to map to valid classes)

  **References**:

  **Pattern References** (existing code to follow):
  - `src/lib/i18n/dictionaries/en.ts:508,521,536,623,636,651` — sponsorship tier `color: "border-claw-..."` pattern
  - `src/app/sponsors/sponsors-client.tsx:125` — consumer: `className={... ${tier.color} ...}` — the dictionary value becomes a CSS class at render time

  **WHY Each Reference Matters**:
  - These are CSS class names stored as translation strings. The user's choice was "Replace with new explicit blue tokens" — meaning the strings need to point to the new token classes.
  - The sponsors page renders tier badges whose border color is determined by the `tier.color` string from the dictionary

  **Acceptance Criteria**:

  ```
  [ ] src/lib/i18n/dictionaries/en.ts contains zero matches for "border-claw-cyan" or "border-claw-orange"
  [ ] src/lib/i18n/dictionaries/es.ts contains zero matches for "border-claw-cyan" or "border-claw-orange"
  [ ] Both files contain matching "border-claw-blue" and "border-claw-blue-light" updates
  [ ] `border-claw-success` is unchanged in both files
  [ ] `pnpm run typecheck` passes
  ```

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Sponsors page tier border colors render with new tokens
    Tool: Playwright
    Preconditions: pnpm run dev on localhost:3000
    Steps:
      1. Navigate to /sponsors
      2. Find the sponsorship tier sections (e.g. "Gold", "Silver", "Community")
      3. Assert each tier's border color is either blue (rgb(30, 64, 175)) or blue-light (rgb(59, 130, 246)) or green (rgb(34, 197, 94))
      4. Assert no tier has orange or cyan border
    Expected Result: All tier borders use the new palette
    Failure Indicators: orange or cyan border
    Evidence: .omo/evidence/task-7-sponsors-tiers.png

  Scenario: i18n class strings resolve to valid Tailwind utilities
    Tool: Bash
    Preconditions: pnpm run dev on localhost:3000
    Steps:
      1. Run: pnpm run build
      2. Assert build succeeds (Tailwind compiles all `claw-*` class names)
      3. If any dictionary string references a non-existent class, build will warn or fail
    Expected Result: Build succeeds, all class names valid
    Failure Indicators: build warns about unknown class names
    Evidence: .omo/evidence/task-7-build.txt
  ```

  **Evidence to Capture**:
  - [ ] `task-7-sponsors-tiers.png` — sponsors page tier colors
  - [ ] `task-7-build.txt` — full `pnpm run build` output

  **Commit**: YES (Wave 2 batch)
  - Message: `chore(i18n): update color class names in en/es dictionaries`
  - Files: `src/lib/i18n/dictionaries/en.ts`, `src/lib/i18n/dictionaries/es.ts`
  - Pre-commit: `pnpm run lint && pnpm run typecheck && pnpm exec vitest run`

- [ ] 8. **Email template: update `#ff6b00` heading to `#1E40AF` (primary blue)**

  **What to do**:
  - In `src/app/api/subscribe/route.ts`:
    - Line 29: `style="color: #ff6b00;"` → `style="color: #1E40AF;"` (confirmation email h2 heading — switch from old orange to new primary blue)
  - **Do NOT** touch the other inline styles in the email (lines 30, 33: `#ccc` body text, `#888` fine print — these are neutral grays, not the brand color)

  **Must NOT do**:
  - Do NOT touch the API route logic (POST handler, Supabase calls, Resend SDK)
  - Do NOT change the email subject line
  - Do NOT change the body text
  - Do NOT touch other colors in the email template (gray text colors stay gray)
  - Do NOT change the unsubscribe URL or other email metadata

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single-line color change in an email template string; trivial edit
  - **Skills**: (none)
  - **Skills Evaluated but Omitted**:
    - `playwright`: not needed; email is server-rendered HTML, not browser UI

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (sequential — must follow Wave 2 component sweep; i18n classes from Task 7 must already be updated to avoid build breakage)
  - **Blocks**: F1-F4
  - **Blocked By**: Task 1, Task 7 (precondition: dictionary class strings are valid)

  **References**:

  **Pattern References** (existing code to follow):
  - `src/app/api/subscribe/route.ts:29` — current `#ff6b00` in `style="color: ..."` (Resend HTML email h2)

  **WHY Each Reference Matters**:
  - This is the only orange color in the email template; updating it brings the email in line with the new site colorway
  - The email is sent to subscribers via Resend; the heading is the first thing they see in the confirmation

  **Acceptance Criteria**:

  ```
  [ ] src/app/api/subscribe/route.ts line 29 contains `#1E40AF` (not `#ff6b00`)
  [ ] `pnpm run typecheck` passes
  [ ] `pnpm exec vitest run` passes (no API tests break)
  ```

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Email template uses blue heading
    Tool: Bash (curl the subscribe endpoint with a test email)
    Preconditions: Supabase + Resend env vars set in .env.local; pnpm run dev on localhost:3000
    Steps:
      1. POST to /api/subscribe with `{"email": "test-colorway-verify@example.com"}`
      2. If Resend is configured, the API returns 200 and sends a confirmation email
      3. Read the response body — assert it does not contain `#ff6b00` in the HTML template
      4. (Optional, if Resend sandbox is available) Inspect the rendered email HTML for `#1E40AF`
    Expected Result: Email template uses new blue color
    Failure Indicators: email still has orange `#ff6b00`
    Evidence: .omo/evidence/task-8-subscribe-curl.txt (capture full curl + response)

  Scenario: Subscribe API smoke test still works
    Tool: Bash
    Preconditions: pnpm run dev on localhost:3000
    Steps:
      1. Run: pnpm exec vitest run src/app/api/subscribe/
      2. Assert: all subscribe tests pass
    Expected Result: API tests pass with no regression
    Failure Indicators: any test fails
    Evidence: .omo/evidence/task-8-vitest-subscribe.txt
  ```

  **Evidence to Capture**:
  - [ ] `task-8-subscribe-curl.txt` — subscribe API response
  - [ ] `task-8-vitest-subscribe.txt` — vitest output for subscribe tests

  **Commit**: YES (Wave 3 standalone)
  - Message: `style(email): update confirmation heading to primary blue`
  - Files: `src/app/api/subscribe/route.ts`
  - Pre-commit: `pnpm run lint && pnpm run typecheck && pnpm exec vitest run src/app/api/subscribe/`

- [x] 9. **Design docs: update `design.md` and `REDESIGN_PLAN.md` to reflect new colorway** ✅ 00bd226

  **What to do**:
  - In `design.md`:
    - Line 196-209: "Accent color" section — replace "Keep orange as the brand accent" with "Royal blue (`#1E40AF`) is the brand accent. Signal red (`#DC2626`) is used sparingly as conservative punctuation on errors, the focus ring, the underline-accent gradient tail, and live/urgent indicator dots."
    - Line 535: "orange accent color" (in "What Should Stay" list) — remove or update to reflect new palette
    - Update any other `#fb7312` references to `#1E40AF` (search for the hex)
  - In `REDESIGN_PLAN.md`:
    - Line 29: "Single accent: `#fb7312` orange" → "Primary accent: `#1E40AF` royal blue. Signal red (`#DC2626`) is conservative punctuation (errors, focus ring, underline gradient tail, live indicators)."
    - Update any other `#fb7312` references in the plan
    - Phase 7 line 118 ("Drop cyan accent (kills second color)") — note that cyan has been fully removed in this colorway swap; update or remove this planned action
  - Update both docs to mention: "Black `#0a0a0a` background and white `#fafafa` text are unchanged."

  **Must NOT do**:
  - Do NOT redraft the design philosophy or vision sections (these are unchanged — only color references)
  - Do NOT remove the typography section (Playfair Display / Karla unchanged)
  - Do NOT change the page strategy, success criteria, or phase plan structure
  - Do NOT add new sections or change document structure

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: Markdown documentation updates; color reference replacements
  - **Skills**: (none — string replacements)
  - **Skills Evaluated but Omitted**:
    - `playwright`: not needed

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (sequential, after Task 8)
  - **Blocks**: F1-F4
  - **Blocked By**: Tasks 1-8

  **References**:

  **Pattern References** (existing code to follow):
  - `design.md:196-209` — current "Accent color" section
  - `design.md:535` — "orange accent color" in "What Should Stay" list
  - `REDESIGN_PLAN.md:29` — current "Single accent" line
  - `REDESIGN_PLAN.md:118` — Phase 7 "Drop cyan accent" line

  **WHY Each Reference Matters**:
  - Both docs currently lock orange in; they need to reflect the new colorway for future contributors
  - The "Phase 7 Drop cyan accent" line in REDESIGN_PLAN.md is now already done (Task 1 + Task 6 + Task 7); update or note

  **Acceptance Criteria**:

  ```
  [ ] design.md contains zero matches for "Keep orange" or "#fb7312"
  [ ] design.md contains updated accent color section referencing royal blue and signal red
  [ ] REDESIGN_PLAN.md contains zero matches for "Single accent: #fb7312 orange"
  [ ] REDESIGN_PLAN.md contains updated primary accent line referencing royal blue
  [ ] Both docs still mention black background and white text
  ```

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: No orange hex references remain in design docs
    Tool: Bash
    Preconditions: none
    Steps:
      1. Run: grep -n "fb7312\|ff8a3d\|ff6b00" design.md REDESIGN_PLAN.md
      2. Assert: zero matches
    Expected Result: No orange hex values in design docs
    Failure Indicators: any orange hex remains
    Evidence: .omo/evidence/task-9-doc-grep.txt

  Scenario: New colorway is documented in both files
    Tool: Bash
    Preconditions: none
    Steps:
      1. Run: grep -n "1E40AF\|DC2626" design.md REDESIGN_PLAN.md
      2. Assert: both files have at least 1 match for `#1E40AF` and at least 1 match for `#DC2626`
    Expected Result: New colors documented
    Failure Indicators: new colors absent
    Evidence: .omo/evidence/task-9-doc-grep.txt
  ```

  **Evidence to Capture**:
  - [ ] `task-9-doc-grep.txt` — grep output showing old orange gone, new blue/red present

  **Commit**: YES (Wave 3 standalone)
  - Message: `docs(design): update colorway references in design.md and REDESIGN_PLAN.md`
  - Files: `design.md`, `REDESIGN_PLAN.md`
  - Pre-commit: `pnpm run lint` (markdown files pass trivially)

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.
> **Do NOT auto-proceed after verification. Wait for user's explicit approval before marking work complete.**

- [x] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in `.omo/evidence/`. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [x] F2. **Code Quality Review** — `unspecified-high`
  Run `pnpm run lint && pnpm run typecheck && pnpm exec vitest run && pnpm run build`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`

- [x] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
  Start from clean state. Start `pnpm run dev` in tmux. Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration (homepage, community, events, skills, sponsors, sponsors tiers, newsletter signup). Test edge cases: empty state, invalid input, hover states, focus-visible, text selection. Save to `.omo/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [x] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (`git log --oneline -20` + `git diff main`). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Detect cross-task contamination: Task N touching Task M's files. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **Commit 1** (Wave 1): `style(tokens): swap orange primary to royal blue; add red punctuation tokens` — `src/app/globals.css`
- **Commit 2** (Wave 2, single commit per file group):
  - 2a: `style(nav+footer+layout): rename claw-orange → claw-blue` — 3 files
  - 2b: `style(home): rename claw-orange → claw-blue; red live indicators` — 1 file
  - 2c: `style(pages): rename claw-orange → claw-blue` — 6 files
  - 2d: `style(newsletter): rename claw-orange → claw-blue` — 3 files
  - 2e: `style(community): rename claw-orange → claw-blue; cyan → blue-light` — 4 files
  - 2f: `chore(i18n): update color class names in en/es dictionaries` — 2 files
- **Commit 3a** (Wave 3, Task 8): `style(email): update confirmation heading to blue` — 1 file
- **Commit 3b** (Wave 3, Task 9): `docs(design): update colorway references in design.md and REDESIGN_PLAN.md` — 2 files

---

## Success Criteria

### Verification Commands
```bash
pnpm run lint                 # Expected: 0 errors
pnpm run typecheck            # Expected: 0 errors
pnpm exec vitest run          # Expected: all existing tests pass
pnpm run build                # Expected: success
grep -r "claw-orange" src/    # Expected: 0 matches
grep -r "claw-cyan" src/      # Expected: 0 matches
grep -r "#ff8a3d\|#fb7312\|#ff6b00\|#ef4444" src/  # Expected: 0 matches
```

### Final Checklist
- [ ] All "Must Have" tokens defined in `src/app/globals.css`
- [ ] All "Must NOT Have" tokens/changes absent from codebase
- [ ] All 14+ component files use new token names
- [ ] i18n dictionaries (`en.ts`, `es.ts`) class strings updated
- [ ] Email template uses blue heading
- [ ] Design docs reflect new colorway
- [ ] `pnpm run lint && pnpm run typecheck && pnpm exec vitest run && pnpm run build` all pass
- [ ] Playwright screenshots confirm visual change (home, community, events, skills, sponsors)
- [ ] Brand asset hand-off list noted in plan for designer action

---

## Asset Hand-Off Appendix (DESIGNER ACTION REQUIRED)

These are **binary raster/vector files** that a coding agent cannot regenerate. They contain the old orange colorway and need to be re-exported with the new palette.

| File | Path | Why it needs re-export |
|---|---|---|
| Primary logo | `public/clawplex-logo.png` | Likely contains orange; will look out of place on the new blue/red site |
| OG / Twitter banner | `public/clawplex-banner.jpg` | OpenGraph card shown when sharing on social; 1200×630 |
| Favicon | `public/favicon.ico` | Browser tab icon |

**Designer brief**:
- Royal blue `#1E40AF` replaces orange `#fb7312` in any logo/wordmark
- Signal red `#DC2626` is acceptable as a punctuation accent in the logo (e.g., a dot, underline, or version badge) — not as the dominant color
- Black `#0a0a0a` backgrounds and white `#fafafa` foregrounds are unchanged
- Regenerate at the same dimensions and formats as the existing files

**No automated task is created for this** — the `/start-work` executor will not touch these files. The plan notes them so they're not forgotten.
