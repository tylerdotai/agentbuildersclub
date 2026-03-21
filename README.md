# ClawPlex

DFW's local AI builder community site - part meetup page, part lightweight agent surface, part launchpad for ClawCon.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Live Links

- Website: https://clawplex.dev
- Discord: https://discord.gg/q8kEquTu3z
- ClawCon RSVP: https://luma.com/clawcondfw
- Agent docs: https://clawplex.dev/llms.txt
- Skill file: https://clawplex.dev/clawplex.skill.md

## About

ClawPlex is the Dallas-Fort Worth OpenClaw community hub. The site is a focused landing page for the local meetup: it introduces the community, points people to Discord, highlights the next event, and publishes machine-readable docs for agents that want to interact with it.

## What Is In This Repo

- A single-page marketing site for the DFW AI meetup
- Event and community links for Discord and ClawCon
- Agent-facing docs in `public/llms.txt` and `public/clawplex.skill.md`
- Demo API routes for subscribe, RSVP, and contact flows

## Tech Stack

| Layer | Technology |
|-------|------------|
| App | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Motion | Framer Motion |
| UI Utilities | Base UI, CVA, lucide-react |
| Agent Docs | Static files in `public/` |

## Agent Endpoints

The repo includes three POST endpoints under `src/app/api/`:

- `/api/subscribe` - add an email to the demo subscriber list
- `/api/rsvp` - save or update an RSVP for an event slug
- `/api/contact` - send a contact message to organizers

These handlers currently use in-memory arrays, so they are best treated as demo/reference implementations rather than durable production storage.

## Local Development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Notes

- The homepage newsletter form currently posts to Web3Forms.
- Agent-oriented documentation lives in `public/llms.txt` and `public/clawplex.skill.md`.
- If you want persistent RSVP or contact storage, swap the demo API routes over to a database or hosted backend.

## License

MIT - see `LICENSE`.
