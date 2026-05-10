import { readdirSync, readFileSync, existsSync } from "fs";
import { join } from "path";

export type TextSegment =
  | { type: "text"; content: string }
  | { type: "bold"; content: string }
  | { type: "code"; content: string }
  | { type: "link"; content: string; href: string };

export interface ParagraphBlock {
  type: "paragraph";
  segments: TextSegment[];
}

export interface NewsletterIssue {
  slug: string;
  number: number;
  date: string;             // display: "May 2026"
  publishedAt: string;     // ISO: "2026-05-14"
  from: string;
  subject: string;
  body: ParagraphBlock[];
  nextNode: {
    title: string;
    venue: string;
    rsvpUrl: string;
  } | null;
  signature: string;
  signatureTitle: string;
}

const NEWSLETTER_DIR = join(process.cwd(), "newsletter");

function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const fence = raw.split(/^---$/m);
  if (fence.length < 3) return { data: {}, content: raw };
  const front = fence[1];
  const content = fence.slice(2).join("---").trim();
  const data: Record<string, string> = {};
  for (const line of front.split("\n")) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const val = line.slice(colon + 1).trim().replace(/^[""]|[""]$/g, "");
    data[key] = val;
  }
  return { data, content };
}

function parseInline(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  // Regex to match markdown inline: **bold**, [text](url), `code`, and plain text
  const regex = /(\*\*[^*]+\*\*)|(`[^`]+`)|(\[([^\]]+)\]\((https?:\/\/[^\)]+)\))|(.+?)(?=\*\*|`|\[|$)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match[1]) {
      // **bold**
      segments.push({ type: "bold", content: match[1].replace(/\*\*/g, "") });
    } else if (match[2]) {
      // `code`
      segments.push({ type: "code", content: match[2].replace(/`/g, "") });
    } else if (match[3]) {
      // [text](url)
      segments.push({ type: "link", content: match[4], href: match[5] });
    } else if (match[6]) {
      // plain text
      segments.push({ type: "text", content: match[6] });
    }
  }

  return segments;
}

function parseBody(content: string): ParagraphBlock[] {
  const lines = content.split("\n").map((l) => l.trim());
  const cutoff = lines.findIndex(
    (l) => l.startsWith("ClawPlex DFW") || l.startsWith("You're getting this")
  );
  const bodyLines = cutoff >= 0 ? lines.slice(0, cutoff) : lines;
  const blocks: ParagraphBlock[] = [];
  for (const line of bodyLines) {
    if (!line) continue;
    blocks.push({
      type: "paragraph",
      segments: parseInline(line),
    });
  }
  return blocks;
}

function sanitizeSlug(s: string): string {
  return s.replace(/[^a-z0-9-]/gi, "");
}

function sanitizeUrl(s: string): string {
  return s.startsWith("https://") ? s : "#";
}

export function getAllIssues(): NewsletterIssue[] {
  if (!existsSync(NEWSLETTER_DIR)) return [];
  const files = readdirSync(NEWSLETTER_DIR).filter((f) => f.endsWith(".md"));
  const issues = files.map((file) => {
    const raw = readFileSync(join(NEWSLETTER_DIR, file), "utf8");
    const { data, content } = parseFrontmatter(raw);
    return {
      slug: sanitizeSlug(data.slug ?? file.replace(".md", "").replace("draft-", "issue-")),
      number: parseInt(data.number ?? "0", 10),
      date: data.date ?? "",
      publishedAt: data.publishedAt ?? "",
      from: data.from ?? "",
      subject: data.subject ?? "",
      body: parseBody(content),
      nextNode: data.nextNodeTitle
        ? {
            title: data.nextNodeTitle ?? "",
            venue: data.nextNodeVenue ?? "",
            rsvpUrl: sanitizeUrl(data.nextNodeRsvp ?? ""),
          }
        : null,
      signature: data.signature ?? "",
      signatureTitle: data.signatureTitle ?? "",
    } as NewsletterIssue;
  });
  return issues.sort((a, b) => b.number - a.number);
}

export function getLatestIssue(): NewsletterIssue | null {
  const all = getAllIssues();
  return all[0] ?? null;
}

export function getIssueBySlug(slug: string): NewsletterIssue | null {
  return getAllIssues().find((i) => sanitizeSlug(i.slug) === sanitizeSlug(slug)) ?? null;
}

export function getAllSlugs(): string[] {
  return getAllIssues().map((i) => sanitizeSlug(i.slug));
}