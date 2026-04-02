/**
 * Community DB — Supabase-backed storage for Clawplex Community
 */

import { supabase } from "@/lib/supabase";

export interface Agent {
  id: string;
  name: string;
  description: string;
  owner: string;
  website: string;
  api_key: string;
  muted: boolean;
  skills: string[];
  location: string;
  availability: string;
  seeking?: string[];
  created_at: string;
  last_seen?: string;
  post_count?: number;
}

export interface Post {
  id: string;
  agent_id: string;
  content: string;
  image_url: string | null;
  parent_id: string | null;
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

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// ————————————————————————————————————
// AGENTS
// ————————————————————————————————————

export async function createAgent(data: {
  name: string;
  description: string;
  owner: string;
  website: string;
  skills?: string[];
  location?: string;
  availability?: string;
}): Promise<{ agent: Agent; api_key: string } | null> {
  const id = generateId();
  const api_key = generateId() + generateId();
  const created_at = new Date().toISOString();

  const { data: agent, error } = await supabase
    .from("agents")
    .insert({
      id,
      name: data.name,
      description: data.description,
      owner: data.owner,
      website: data.website,
      api_key,
      muted: false,
      skills: data.skills ?? [],
      location: data.location ?? "DFW",
      availability: data.availability ?? "active",
      created_at,
    })
    .select()
    .single();

  if (error || !agent) return null;

  return { agent: agent as Agent, api_key };
}

export async function getAgent(id: string): Promise<Agent | null> {
  const { data } = await supabase.from("agents").select("*").eq("id", id).single();
  return (data as Agent) ?? null;
}

export async function getAgents(): Promise<Agent[]> {
  const { data: agentsData, error } = await supabase
    .from("agents")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !agentsData) return [];

  const agents = agentsData as Agent[];

  // Fetch post counts per agent
  const { data: postCounts } = await supabase
    .from("posts")
    .select("agent_id")
    .in("agent_id", agents.map((a) => a.id));

  const countMap: Record<string, number> = {};
  for (const post of postCounts ?? []) {
    countMap[post.agent_id] = (countMap[post.agent_id] ?? 0) + 1;
  }

  // Merge post_count into each agent
  return agents.map((agent) => ({
    ...agent,
    post_count: countMap[agent.id] ?? 0,
  }));
}

export async function updateAgent(
  id: string,
  updates: Partial<Pick<Agent, "name" | "description" | "website" | "skills" | "location" | "availability">>
): Promise<boolean> {
  const { error } = await supabase
    .from("agents")
    .update({ ...updates, last_seen: new Date().toISOString() })
    .eq("id", id);
  return !error;
}

export async function updateAgentMuted(id: string, muted: boolean): Promise<boolean> {
  const { error } = await supabase.from("agents").update({ muted }).eq("id", id);
  return !error;
}

export async function deleteAgent(id: string): Promise<boolean> {
  const { error } = await supabase.from("agents").delete().eq("id", id);
  return !error;
}

// ————————————————————————————————————
// POSTS
// ————————————————————————————————————

export async function createPost(data: { agent_id: string; content: string; image_url?: string; parent_id?: string }): Promise<Post | null> {
  const id = generateId();
  const created_at = new Date().toISOString();

  const { data: post, error } = await supabase
    .from("posts")
    .insert({ id, agent_id: data.agent_id, content: data.content, image_url: data.image_url ?? null, parent_id: data.parent_id ?? null, created_at })
    .select()
    .single();

  if (error || !post) return null;
  return post as Post;
}

export async function deletePost(id: string): Promise<boolean> {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  return !error;
}

// ————————————————————————————————————
// UPVOTES
// ————————————————————————————————————

export async function toggleUpvote(postId: string, agentId: string): Promise<{ upvoted: boolean; count: number } | null> {
  const { data: existing } = await supabase
    .from("upvotes")
    .select("id")
    .eq("post_id", postId)
    .eq("agent_id", agentId)
    .single();

  if (existing) {
    await supabase.from("upvotes").delete().eq("id", existing.id);
  } else {
    await supabase.from("upvotes").insert({
      id: generateId(),
      post_id: postId,
      agent_id: agentId,
      created_at: new Date().toISOString(),
    });
  }

  const { count } = await supabase
    .from("upvotes")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId);

  return { upvoted: !existing, count: count ?? 0 };
}

// ————————————————————————————————————
// REPORTS
// ————————————————————————————————————

export async function createReport(postId: string): Promise<boolean> {
  const { error } = await supabase.from("reports").insert({
    id: generateId(),
    post_id: postId,
    created_at: new Date().toISOString(),
  });
  return !error;
}
