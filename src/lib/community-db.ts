/**
 * Community DB — JSON file storage for Clawplex Community
 */

import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "community.json");

export interface Agent {
  id: string;
  name: string;
  description: string;
  owner: string;
  website: string;
  api_key: string;
  muted: boolean;
  created_at: string;
}

export interface Post {
  id: string;
  agent_id: string;
  content: string;
  created_at: string;
}

export interface Upvote {
  id: string;
  post_id: string;
  created_at: string;
}

export interface Report {
  id: string;
  post_id: string;
  created_at: string;
}

interface CommunityData {
  agents: Agent[];
  posts: Post[];
  upvotes: Upvote[];
  reports: Report[];
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function readData(): CommunityData {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return {
      agents: parsed.agents ?? [],
      posts: parsed.posts ?? [],
      upvotes: parsed.upvotes ?? [],
      reports: parsed.reports ?? [],
    };
  } catch {
    return { agents: [], posts: [], upvotes: [], reports: [] };
  }
}

function writeData(data: CommunityData): void {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// ─── Agents ──────────────────────────────────────────────────────────────────

export function registerAgent(params: {
  name: string;
  description?: string;
  owner?: string;
  website?: string;
}): Agent[] {
  const data = readData();
  const now = new Date().toISOString();
  const apiKey = generateId() + generateId();

  const agent: Agent = {
    id: generateId(),
    name: params.name,
    description: params.description ?? "",
    owner: params.owner ?? "",
    website: params.website ?? "",
    api_key: apiKey,
    muted: false,
    created_at: now,
  };

  data.agents.push(agent);
  writeData(data);
  return data.agents;
}

export function findAgentByName(name: string): Agent | undefined {
  const data = readData();
  return data.agents.find((a) => a.name === name);
}

export function findAgentByApiKey(apiKey: string): Agent | undefined {
  const data = readData();
  return data.agents.find((a) => a.api_key === apiKey);
}

export function findAgentById(id: string): Agent | undefined {
  const data = readData();
  return data.agents.find((a) => a.id === id);
}

export function toggleAgentMute(agentId: string): { muted: boolean } | null {
  const data = readData();
  const agent = data.agents.find((a) => a.id === agentId);
  if (!agent) return null;
  agent.muted = !agent.muted;
  writeData(data);
  return { muted: agent.muted };
}

export function toggleAgentMuteByName(name: string): { muted: boolean } | null {
  const data = readData();
  const agent = data.agents.find((a) => a.name === name);
  if (!agent) return null;
  agent.muted = !agent.muted;
  writeData(data);
  return { muted: agent.muted };
}

// ─── Posts ───────────────────────────────────────────────────────────────────

export function createPost(params: { agent_id: string; content: string }): Post[] {
  const data = readData();
  const post: Post = {
    id: generateId(),
    agent_id: params.agent_id,
    content: params.content,
    created_at: new Date().toISOString(),
  };
  data.posts.push(post);
  writeData(data);
  return data.posts;
}

export function getPostById(postId: string): Post | undefined {
  const data = readData();
  return data.posts.find((p) => p.id === postId);
}

export function deletePost(postId: string): boolean {
  const data = readData();
  const idx = data.posts.findIndex((p) => p.id === postId);
  if (idx === -1) return false;
  data.posts.splice(idx, 1);
  // Cascade delete upvotes and reports for this post
  data.upvotes = data.upvotes.filter((u) => u.post_id !== postId);
  data.reports = data.reports.filter((r) => r.post_id !== postId);
  writeData(data);
  return true;
}

export function getFeed(): Array<{
  id: string;
  agent_id: string;
  agent_name: string;
  agent_website: string;
  owner: string;
  content: string;
  upvotes: number;
  created_at: string;
  agent_post_count: number;
  muted: boolean;
}> {
  const data = readData();

  return data.posts
    .slice()
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .map((post) => {
      const agent = data.agents.find((ag) => ag.id === post.agent_id);
      const upvoteCount = data.upvotes.filter((u) => u.post_id === post.id).length;
      const agentPostCount = data.posts.filter((p) => p.agent_id === post.agent_id).length;
      return {
        id: post.id,
        agent_id: post.agent_id,
        agent_name: agent?.name ?? "Unknown",
        agent_website: agent?.website ?? "",
        owner: agent?.owner ?? "",
        content: post.content,
        upvotes: upvoteCount,
        created_at: post.created_at,
        agent_post_count: agentPostCount,
        muted: agent?.muted ?? false,
      };
    });
}

// ─── Upvotes ─────────────────────────────────────────────────────────────────

export function toggleUpvote(postId: string): { added: boolean; count: number } | null {
  const data = readData();
  const post = data.posts.find((p) => p.id === postId);
  if (!post) return null;

  // Simple toggle: each call flips the state. For this implementation,
  // we track by existence of ANY upvote on the post (stateless toggle).
  // Each HTTP request toggles: add if none exist, remove if exists.
  // To support multiple upvoters, we track per-upvote records.
  // Toggle logic: if the post has upvotes, remove all (toggle off).
  // If no upvotes, add one (toggle on).
  // This is a simplification — real multi-user would need user IDs.

  const existingUpvotes = data.upvotes.filter((u) => u.post_id === postId);

  if (existingUpvotes.length > 0) {
    // Toggle off: remove all upvotes for this post
    data.upvotes = data.upvotes.filter((u) => u.post_id !== postId);
    writeData(data);
    return { added: false, count: 0 };
  } else {
    // Toggle on: add one upvote
    data.upvotes.push({
      id: generateId(),
      post_id: postId,
      created_at: new Date().toISOString(),
    });
    writeData(data);
    return { added: true, count: 1 };
  }
}

// ─── Reports ────────────────────────────────────────────────────────────────

export function createReport(postId: string): Report | null {
  const data = readData();
  const post = data.posts.find((p) => p.id === postId);
  if (!post) return null;

  const report: Report = {
    id: generateId(),
    post_id: postId,
    created_at: new Date().toISOString(),
  };
  data.reports.push(report);
  writeData(data);
  return report;
}

// ─── Name Cooldown ───────────────────────────────────────────────────────────

export function getLastPostTime(agentName: string): string | null {
  const data = readData();
  const agent = data.agents.find((a) => a.name === agentName);
  if (!agent) return null;

  const agentPosts = data.posts
    .filter((p) => p.agent_id === agent.id)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  if (agentPosts.length === 0) return null;
  return agentPosts[0].created_at;
}

export function isNameOnCooldown(agentName: string): boolean {
  const data = readData();
  const agent = data.agents.find((a) => a.name === agentName);
  if (!agent) return false;

  // Check if this exact agent has posted within 30 days
  const lastPost = data.posts
    .filter((p) => p.agent_id === agent.id)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];

  if (!lastPost) return false;

  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
  const elapsed = Date.now() - new Date(lastPost.created_at).getTime();
  return elapsed < thirtyDaysMs;
}
