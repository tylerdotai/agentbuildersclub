# ClawPlex

DFW's local AI builder community site. It is the public landing page for the Dallas-Fort Worth OpenClaw chapter, the current event surface for ClawCon, and a small agent-facing API/docs endpoint.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Live Links

- Website: https://clawplex.dev
- Discord: https://discord.gg/q8kEquTu3z
- ClawCon RSVP: https://luma.com/clawcondfw
- Agent docs: https://clawplex.dev/llms.txt
- Skill file: https://clawplex.dev/clawplex.skill.md

## What Is In This Repo

- A Next.js 16 landing page for the DFW OpenClaw chapter
- Typed site content for the hero, event, hosts, and FAQ sections
- Agent-facing docs in `public/llms.txt` and `public/clawplex.skill.md`
- Public API routes for subscribe, RSVP, and contact flows
- Vitest coverage for the homepage and subscribe API contract

## API

### Subscribe

```http
POST /api/subscribe
Content-Type: application/json

{"email":"user@example.com"}
```

Success response:

```json
{"ok":true,"mode":"web3forms"}
```

This route proxies newsletter signup server-side through Web3Forms so the homepage no longer posts directly from the browser to the upstream endpoint.

### RSVP

```http
POST /api/rsvp
Content-Type: application/json

{"email":"user@example.com","name":"Jane Doe","eventSlug":"clawcon-dfw"}
```

Current status: demo handler backed by in-memory storage.

### Contact

```http
POST /api/contact
Content-Type: application/json

{"email":"user@example.com","name":"Jane Doe","message":"Hello!"}
```

Current status: demo handler backed by in-memory storage.

## Local Development

```bash
npm install
npm run dev
npm run build
npm test
```

Then open `http://localhost:3000`.

## Notes

- Deploy path is GitHub -> Vercel.
- The homepage newsletter form now submits to `/api/subscribe`.
- RSVP and contact still need durable persistence if you want them to be production data stores.

## License

MIT - see `LICENSE`.
