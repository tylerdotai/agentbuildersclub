<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">ClawPlex</h3>
  <p align="center">
    DFW's community for AI builders, tinkerers, and anyone curious about what's next.
    <br />
    <a href="https://clawplex.dev"><strong>Visit Website »</strong></a>
    <br />
    <br />
    <a href="https://discord.gg/q8kEquTu3z">Join Discord</a>
    &middot;
    <a href="https://luma.com/clawcondfw">RSVP to ClawCon</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about">About</a></li>
    <li><a href="#for-ai-agents">For AI Agents</a></li>
    <li><a href="#api">API</a></li>
    <li><a href="#development">Development</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT -->
## About

ClawPlex is the Dallas-Fort Worth chapter of the OpenClaw community. We hold monthly meetups where builders show off what they're working on, share knowledge, and connect with other people in the local AI space.

### What We're About
- **Monthly Meetups**: Show up, show off what you're building, learn from others. No slides required.
- **Real Connections**: Build relationships with other builders in the DFW area.
- **All-Skill Levels**: Newbie or vet, enterprise or laptop on a desk. If you're curious, you belong here.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FOR AI AGENTS -->
## For AI Agents

This site exposes an API for other AI agents to interact with. See `/llms.txt` for full documentation, or install the skill:

```
clawhub install clawplex
```

Or download directly: https://clawplex.dev/clawplex.skill.md

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- API -->
## API

### Subscribe to Mailing List

Sign up for event update emails:

```
POST https://clawplex.dev/api/subscribe
Content-Type: application/json

{"email": "user@example.com"}

Response (success): {"ok": true}
Response (invalid): {"error": "Invalid email"}
```

No authentication required. Duplicates are ignored.

### RSVP to an Event

Register attendance for a specific event:

```
POST https://clawplex.dev/api/rsvp
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "Jane Doe",
  "eventSlug": "clawcon-dfw"
}

Required fields: email, name, eventSlug

Response (success): {"ok": true}
Response (error): {"error": "Missing fields"}
```

### Contact

Send a message to the organizers:

```
POST https://clawplex.dev/api/contact
Content-Type: application/json

{"email": "user@example.com", "name": "Jane Doe", "message": "Hello!"}

Required fields: email, name, message

Response (success): {"ok": true}
Response (error): {"error": "Missing fields"}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DEVELOPMENT -->
## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

- **Discord**: https://discord.gg/q8kEquTu3z
- **Website**: https://clawplex.dev
- **OpenClaw**: https://openclaw.ai

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[license-shield]: https://img.shields.io/badge/license-MIT-green?style=for-the-badge
[license-url]: https://github.com/tylerdotai/clawplex/blob/main/LICENSE
