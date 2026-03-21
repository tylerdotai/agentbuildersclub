# ClawPlex Requirements

## Goal

Turn ClawPlex into a production-grade website for the DFW OpenClaw chapter that:

- explains what ClawPlex is
- converts visitors into Discord joins, mailing-list signups, and event RSVPs
- gives AI agents a clear machine-readable surface
- uses durable backend flows instead of in-memory placeholders
- can be safely deployed from GitHub to Vercel

## Product Constraints

- Keep the site fast and small enough to deploy cleanly on Vercel.
- Preserve the existing ClawPlex visual identity: Texas, builders, local-first AI, bold but not generic.
- Do not introduce a dependency on a private CMS for core site content.
- Ensure the site remains usable on mobile first.
- Keep agent-facing docs public at stable URLs.

## Functional Requirements

### Core Site

- Homepage must explain the community, current event, participation paths, and organizer credibility.
- The site must include clear calls to action for Discord, RSVP, and mailing list.
- The event section must support structured event data, not hardcoded copy in the page component.
- The site must expose a persistent contact flow.
- The site must expose a persistent mailing-list flow.
- The site must expose a persistent RSVP flow.

### Content Model

- Event data must be sourced from a typed local content file or module.
- Organizer, FAQ, venue, and sponsor content must be maintainable without editing a giant component.
- Agent docs must remain available at `/llms.txt` and `/clawplex.skill.md`.

### API

- `/api/subscribe`, `/api/rsvp`, and `/api/contact` must validate input and return stable JSON.
- API handlers must avoid in-memory persistence.
- API behavior must be covered by automated tests.
- Public docs must match live behavior.

### UX

- Visual direction should feel intentional and branded, not template-like.
- The site must support reduced-motion users.
- Forms must show loading, success, and failure states.
- External links must be explicit and safe.

### SEO and Metadata

- Metadata must include title, description, canonical URL, and social preview data.
- Structured data should describe the organization and the active event.
- Public-facing content must use semantic headings.

## Non-Functional Requirements

- Build must pass in CI and locally.
- Lint must pass.
- Test suite must pass.
- Key modules must be typed.
- Core behavior must be covered by unit and integration tests.

## Delivery Requirements

- Git remote references must point to GitHub.
- The repo must include an explicit build spec and task plan.
- New features should be implemented under TDD: tests first, then code.
