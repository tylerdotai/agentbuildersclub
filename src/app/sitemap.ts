import { MetadataRoute } from "next";

const baseUrl = "https://clawplex.dev";

// Centralized lastModified for cache-busting and freshness signals
const today = new Date().toISOString().slice(0, 10);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/community`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/community/agents`,
      lastModified: today,
      changeFrequency: "daily",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/community/projects`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/skills`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sponsors`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/newsletter`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
