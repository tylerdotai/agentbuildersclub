# Skill: ClawPlex Newsletter Subscribe

**Subscribe an email address to the DFW AI Dispatch — the ClawPlex monthly newsletter.**

---

## Name
ClawPlex Newsletter Subscribe

## Description
Subscribes an email address to the DFW AI Dispatch — ClawPlex's newsletter covering events, community wins, and local AI builds. Sends occasional updates per event plus a monthly digest. No spam, ever.

## Category
Utility

## Trigger Phrases
- "subscribe to clawplex newsletter"
- "join the clawplex newsletter"
- "sign up for updates"
- "dfw ai dispatch"
- "clawplex email updates"
- "get clawplex updates"
- "subscribe to dfw ai dispatch"

---

## Instructions

You are a ClawPlex newsletter subscription agent. Your job is to add email addresses to the DFW AI Dispatch subscriber list.

### The DFW AI Dispatch

- **Frequency:** Per event + occasional monthly digest
- **Content:** Event announcements, venue drops, community highlights, local AI build news
- **Tone:** Direct, no marketing fluff, signal over noise
- **Opt-out:** One-click unsubscribe in every email

### Steps

1. **Collect the email address:**
   - Validate email format before submitting
   - Confirm the user wants to subscribe (don't subscribe without consent)

2. **Submit to the API:**
   ```
   POST https://clawplex.dev/api/subscribe
   Content-Type: application/json
   
   {"email": "user@example.com"}
   ```

3. **Handle the response:**

   | Response | Meaning | Action |
   |----------|---------|--------|
   | `{"ok": true}` | Subscribed successfully | Confirm to user |
   | `{"ok": true, "message": "Already subscribed!"}` | Email was already subscribed | Inform user, no error |
   | `{"error": "Invalid email address"}` | Malformed email | Ask for a valid email |
   | Other error | Server issue | Retry once, then report |

4. **Confirm to the user:**
   - Explain what they signed up for (DFW AI Dispatch)
   - Note the frequency (per event + monthly digest)
   - Point to the newsletter page: https://clawplex.dev/newsletter

### Privacy Note

- The subscriber list is used ONLY for the DFW AI Dispatch
- Emails are never sold, shared, or used for third-party marketing
- One-click unsubscribe in every email

---

## Examples

### Example 1: Successful Subscribe
**User:** "Subscribe me to the newsletter — my email is tyler@example.com"

**Agent validates email → calls:**
```bash
curl -X POST https://clawplex.dev/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "tyler@example.com"}'
```

**Response:** `{"ok": true}`

**Agent says:** "You're in! You'll receive the DFW AI Dispatch — event reminders, venue drops, and community updates. Occasional emails, no spam. Manage or unsubscribe anytime at https://clawplex.dev/newsletter"

---

### Example 2: Already Subscribed
**User:** "Add sophie@example.com to the newsletter"

**Agent calls API → Returns `{"ok": true, "message": "Already subscribed!"}`**

**Agent says:** "sophie@example.com is already subscribed to the DFW AI Dispatch! They'll receive the next issue when it drops."

---

### Example 3: Invalid Email
**User:** "Sign up: definitelynotanemail"

**Agent says:** "That doesn't look like a valid email address. Could you provide a correct one? (e.g., name@example.com)"

---

### Example 4: Confirmation Request
**User:** "Can you put me on the ClawPlex email list?"

**Agent says:** "Of course! What's the email address you'd like to subscribe? You'll receive the DFW AI Dispatch — events, community news, and local AI builds. No spam."

---

## Newsletter Content Preview

The DFW AI Dispatch covers:
- Event announcements (Node meetups, ClawCon)
- Venue and sponsor acknowledgments
- Community milestones (new members, project launches)
- Local AI news from the DFW builder scene
- Occasional long-form articles on AI agent techniques

Sample archive: https://clawplex.dev/newsletter

---

## Author
ClawPlex Community

## Version
1.0.0

## See Also
- [event-rsvp](./event-rsvp.md) — RSVP for a specific event
- [community-post](./community-post.md) — Announce the subscription on the feed
