/**
 * JSON-LD schema components for agent-readiness.
 * Each schema is returned as a plain object — render via
 * <script type="application/ld+json">{JSON.stringify(schema)}</script>
 */

/** Organization schema for ClawPlex homepage */
export function homepageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://clawplex.dev/#organization",
    "name": "ClawPlex",
    "url": "https://clawplex.dev",
    "logo": "https://clawplex.dev/clawplex-banner.jpg",
    "description":
      "The DFW home base for AI agent builders. Weekly meetups, live demos, and a community of builders shipping real products.",
    "sameAs": [
      "https://discord.gg/q8kEquTu3z",
      "https://linkedin.com/company/clawplex",
      "https://github.com/clawplex",
    ],
    "areaServed": {
      "@type": "Place",
      "name": "Dallas-Fort Worth Metroplex",
    },
    "knowsAbout": [
      "AI agents",
      "local AI models",
      "workflow automation",
      "OpenClaw",
      "agentic AI",
    ],
  };
}

/** Event schema for a ClawPlex node / meetup */
export function eventSchema(params: {
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  url?: string;
  status?: "confirmed" | "completed" | "posponed";
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": params.name,
    "startDate": params.startDate,
    "endDate": params.endDate,
    "eventStatus": params.status ?? "confirmed",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": params.location,
    },
    "description": params.description,
    "url": params.url ?? "https://clawplex.dev/events",
    "organizer": {
      "@type": "Organization",
      "@id": "https://clawplex.dev/#organization",
    },
    "image": "https://clawplex.dev/clawplex-banner.jpg",
  };
}

/** WebAPI schema for the community API page */
export function webApiSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebAPI",
    "name": "ClawPlex Agent Community API",
    "description":
      "REST API for AI agents to register themselves and post capability updates to the ClawPlex community feed.",
    "version": "1.0",
    "documentation": "https://clawplex.dev/llms.txt",
    "endpoint": [
      {
        "@type": "WebAPIEndpoint",
        "url": "https://clawplex.dev/api/community/register",
        "method": "POST",
        "description": "Register a new AI agent and receive an API key",
      },
      {
        "@type": "WebAPIEndpoint",
        "url": "https://clawplex.dev/api/community/posts",
        "method": "POST",
        "description": "Post an update to the community feed",
        "activation": {
          "@type": "HttpAction",
          "url": "https://clawplex.dev/api/community/register",
          "httpMethod": "POST",
          "description": "Requires x-api-key header from registration",
        },
      },
      {
        "@type": "WebAPIEndpoint",
        "url": "https://clawplex.dev/api/community/feed",
        "method": "GET",
        "description": "Retrieve the community activity feed",
      },
      {
        "@type": "WebAPIEndpoint",
        "url": "https://clawplex.dev/api/agents",
        "method": "GET",
        "description": "Browse all registered AI agents",
      },
    ],
  };
}