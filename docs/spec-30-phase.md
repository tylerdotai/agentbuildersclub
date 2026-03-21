# ClawPlex 30-Phase Spec

## Phase 1. Repo Hygiene
- Normalize repository references to GitHub.
- Verify deploy path is GitHub -> Vercel.

## Phase 2. Delivery Docs
- Add requirements, spec, and execution todo files.
- Keep the build plan in-repo.

## Phase 3. Test Harness
- Add a test runner, browser-like DOM testing, and API test coverage.
- Wire scripts for `test`, `test:watch`, and coverage.

## Phase 4. Red/Green Baseline
- Write failing tests for current defects and missing behavior.
- Fix lint and baseline quality issues.

## Phase 5. Content Architecture
- Extract event, CTA, FAQ, and organizer content into typed data modules.
- Remove giant hardcoded page copy blocks where practical.

## Phase 6. Design System Pass
- Establish shared section, container, badge, and CTA primitives.
- Normalize spacing, typography, and color tokens.

## Phase 7. Homepage Rewrite
- Rebuild the homepage with clearer narrative flow.
- Add stronger local identity and credibility.

## Phase 8. Hero Upgrade
- Improve hero copy, CTA hierarchy, and visual composition.
- Preserve the existing ClawPlex tone while making the first screen clearer.

## Phase 9. Event Module
- Build a reusable next-event section from typed data.
- Support venue, date, ticket URL, and status.

## Phase 10. Community Value Props
- Add stronger explanation of why people should join.
- Use cards or sections that read like an actual chapter, not generic SaaS blocks.

## Phase 11. Organizer Section
- Add organizer or host credibility.
- Make it obvious who runs ClawPlex.

## Phase 12. Venue / DFW Section
- Add local context for DFW attendance.
- Include “what to expect” copy for first-time attendees.

## Phase 13. FAQ
- Add answers for cost, experience level, hardware expectations, and format.

## Phase 14. Persistent Subscribe API
- Replace ephemeral subscribe storage with a durable provider-backed implementation.
- Keep contracts stable and documented.

## Phase 15. Persistent RSVP API
- Replace ephemeral RSVP storage with a durable provider-backed implementation.

## Phase 16. Persistent Contact API
- Replace ephemeral contact storage with a durable provider-backed implementation.

## Phase 17. Form Components
- Build reusable form state handling for subscribe, RSVP, and contact.
- Include inline validation and submission states.

## Phase 18. Homepage Signup Integration
- Move the homepage email form onto the site’s own subscribe API or a consistent backend abstraction.
- Eliminate split behavior between docs and UI.

## Phase 19. Dedicated RSVP Surface
- Add a proper RSVP section or page with event context.

## Phase 20. Contact Surface
- Add a visible contact path for organizers and sponsors.

## Phase 21. Agent Docs Alignment
- Ensure `README`, `llms.txt`, and live API behavior agree.
- Remove stale claims.

## Phase 22. Metadata
- Improve metadata, robots, open graph, and Twitter cards.

## Phase 23. Structured Data
- Add JSON-LD for organization and event metadata.

## Phase 24. Accessibility
- Add reduced-motion handling, focus states, labeling, and semantic landmarks.

## Phase 25. Performance
- Replace raw `<img>` usage where appropriate.
- Optimize hero asset loading and rendering.

## Phase 26. Observability
- Add basic analytics or event instrumentation hooks if desired.
- Keep privacy footprint small.

## Phase 27. Error Handling
- Add resilient UI and API error paths.
- Avoid silent failures.

## Phase 28. CI Readiness
- Ensure lint, tests, and build are scriptable and stable.

## Phase 29. Content Polish
- Tighten copy, headings, links, and CTA language.

## Phase 30. Release Sweep
- Final repo pass, final QA, and push to GitHub for Vercel deploy.
