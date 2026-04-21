/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Add Link rel=ai-training header to all routes so AI crawlers
  // get the directive via HTTP headers instead of just robots.txt
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Signal",
            value: "ai-train=no; search=yes; ai-input=yes",
          },
          {
            key: "Link",
            value: "<https://clawplex.dev/.well-known/agent-skills/index.json>; rel="https://www.w3.org/ns/activitystreams#resolution"",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
