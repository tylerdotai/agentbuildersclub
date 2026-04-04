# Skill: ClawPlex Event RSVP

**RSVP for a ClawPlex node or event on behalf of a user or agent.**

---

## Name
ClawPlex Event RSVP

## Description
Registers attendance for a specific ClawPlex node or event. Handles both individual RSVPs and agent-represented RSVPs. Duplicate RSVPs update the existing entry (idempotent).

## Category
Social

## Trigger Phrases
- "rsvp for clawplex"
- "register for node"
- "sign up for clawplex event"
- "clawplex rsvp"
- "attend clawplex"
- "going to clawplex"
- "reserve spot clawplex"

## Prerequisites
None — RSVP is open to anyone.

---

## Instructions

You are a ClawPlex event RSVP agent. Your job is to register attendance for ClawPlex events.

### Known Events

| Event Slug | Event | Date |
|------------|-------|------|
| `dfw-node-02` | DFW Node 02 | April 15, 2026 · 2–3 PM CDT |
| `clawcon-dfw` | ClawCon DFW (past) | March 24, 2026 |

### Steps

1. **Confirm the event:**
   - If the user specifies an event, confirm the event name, date, and venue
   - If no event specified, assume the next upcoming event
   - If the event is in the past, inform the user

2. **Collect attendee details:**
   - `name` — Full name or agent name
   - `email` — Valid email address (for event communications)
   - `eventSlug` — The event identifier (e.g., `dfw-node-02`)

3. **Submit RSVP:**
   ```
   POST https://clawplex.dev/api/rsvp
   Content-Type: application/json
   
   {
     "email": "attendee@example.com",
     "name": "Jane Doe",
     "eventSlug": "dfw-node-02"
   }
   ```

4. **Handle the response:**
   - `{"ok": true}` — RSVP confirmed
   - Duplicate RSVP (same email + event): Returns `{"ok": true}` (updates existing entry)
   - Missing fields: Returns `{"error": "Missing fields"}`

5. **Confirm to the user:**
   - Show event details (date, time, venue)
   - Provide the Google Calendar link or event URL
   - Note any next steps (join Discord for updates, etc.)

### Venue Details

**DFW Node 02 — April 15, 2026**
- Venue: Spark Coworking, Arlington TX
- Address: Texas Live! district, Arlington TX
- Time: 2–3 PM CDT
- Format: Casual hangout, no agenda. Bring your laptop.

---

## Examples

### Example 1: Individual RSVP
**User:** "I'd like to RSVP for the April 15 event"

**Agent:** "Great! Registering you for DFW Node 02 on April 15."

**Agent calls:**
```bash
curl -X POST https://clawplex.dev/api/rsvp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "name": "Jane Doe",
    "eventSlug": "dfw-node-02"
  }'
```

**Response:** `{"ok": true}`

**Agent says:** "You're in! DFW Node 02 — April 15, 2–3 PM at Spark Coworking, Arlington TX. See you there! Join the Discord for any last-minute updates: https://discord.gg/q8kEquTu3z"

---

### Example 2: Agent Representing a Human
**User:** "My agent Scout should RSVP for Node 02 under my name Tyler"

**Agent calls:**
```bash
curl -X POST https://clawplex.dev/api/rsvp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "tyler@example.com",
    "name": "Tyler (represented by Scout)",
    "eventSlug": "dfw-node-02"
  }'
```

**Response:** `{"ok": true}`

---

### Example 3: Already Registered
**User:** "RSVP me again for the April event, I think I already signed up"

**Agent calls API → Returns `{"ok": true}` (idempotent)**

**Agent says:** "You're already registered! No need to sign up again. DFW Node 02, April 15, 2–3 PM at Spark Coworking, Arlington. See you there!"

---

## Calendar Add

After a successful RSVP, offer to generate a calendar link:

**Google Calendar:**
```
https://calendar.google.com/calendar/render?action=TEMPLATE&text=DFW+Node+02&dates=20260415T140000/20260415T150000&location=Spark+Coworking,+Arlington,+TX&details=No+agenda.+Just+show+up+with+your+laptop.+https://clawplex.dev/events
```

---

## Author
ClawPlex Community

## Version
1.0.0

## See Also
- [subscribe](./subscribe.md) — Subscribe to the newsletter for event announcements
- [community-post](./community-post.md) — Announce your attendance on the community feed
