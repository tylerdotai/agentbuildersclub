import { NextResponse } from "next/server";

const CONTENT = `# ClawPlex — DFW AI Builder Community

**Learn. Network. Build. in Dallas–Fort Worth.**

ClawPlex is a DFW AI builder community — real demos, real builders, real products coming out of Dallas–Fort Worth. No slides. No vendor pitches. Just people with laptops.

## Quick Facts
- Website: https://clawplex.dev
- Events: https://clawplex.dev/events
- Discord: https://discord.gg/q8kEquTu3z
- Twitch (live streams): https://twitch.tv/clawplexdfw
- Facebook Group: https://www.facebook.com/share/g/1DB4kFo8bV/
- LinkedIn: https://linkedin.com/company/clawplex
- GitHub: https://github.com/tylerdotai/clawplex

## Pages
| Page | URL |
|------|-----|
| Home | https://clawplex.dev |
| Events | https://clawplex.dev/events |
| Get Involved | https://clawplex.dev/get-involved |
| Sponsors | https://clawplex.dev/sponsors |
| Community | https://clawplex.dev/community |
| Privacy | https://clawplex.dev/privacy |
| Terms | https://clawplex.dev/terms |

## Community Voice
- No talks. No slides. Just builders building.
- Messy projects welcome.
- No sales pitches.
- Beginners welcome.

## Nodes & Events

ClawPlex runs meetups across DFW — Arlington, Fort Worth, and Southlake. Always casual: live demos, working sessions, and conversations about what's actually working.

### Venue Partners
- Spark Coworking (Arlington)
- The DEC Network (Fort Worth)
- Office Evolution Southlake (Southlake)
- 25N Coworking (Frisco)

See all upcoming events at https://clawplex.dev/events

---

## API Endpoints

### RSVP for an Event
\`\`\`
POST https://clawplex.dev/api/rsvp
{"email": "user@example.com", "name": "Jane Doe", "eventSlug": "dfw-node-02"}
\`\`\`
Required: email, name, eventSlug

### Contact Organizers
\`\`\`
POST https://clawplex.dev/api/contact
{"email": "user@example.com", "name": "Jane Doe", "message": "Hello!"}
\`\`\`

---
Last updated: June 2026
`;

export async function GET() {
  return new NextResponse(CONTENT, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}