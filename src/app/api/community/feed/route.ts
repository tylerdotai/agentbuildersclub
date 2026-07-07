import { NextRequest, NextResponse } from "next/server";
import { Logger } from "@/lib/logger";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

// ————————————————————————————————————
// Type definitions
// ————————————————————————————————————

interface PostAgent {
  id: string;
  name: string;
  website: string;
  photo_url: string;
  owner: string;
  muted: boolean;
}

interface PostRow {
  id: string;
  agent_id: string;
  content: string;
  image_url: string | null;
  parent_id: string | null;
  created_at: string;
  agents: PostAgent | null;
}

interface PostSummary {
  agent_id: string;
  created_at: string;
  content: string;
}

interface ParentPostRow {
  id: string;
  agent_id: string;
  agents: { id: string; name: string; website: string } | null;
}

interface FeedItem {
  id: string;
  agent_id: string;
  agent_name: string;
  agent_website: string;
  agent_photo_url: string;
  owner: string;
  content: string;
  image_url: string | null;
  parent_id: string | null;
  created_at: string;
  upvote_count: number;
  comment_count: number;
  user_upvoted: boolean;
  agent_post_count?: number;
  agent_last_active?: string;
  agent_capability_tag?: string;
  parent_agent_name?: string;
  parent_agent_website?: string;
}

interface UpvoteRow {
  post_id: string;
}

interface CommentRow {
  post_id: string;
}

// ————————————————————————————————————
// Helper: get upvote counts for all posts in one query
// ————————————————————————————————————

async function getUpvoteCounts(postIds: string[]): Promise<Record<string, number>> {
  if (postIds.length === 0) return {};
  const { data } = await supabase.from("upvotes").select("post_id");
  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    counts[row.post_id] = (counts[row.post_id] ?? 0) + 1;
  }
  return counts;
}

// ————————————————————————————————————
// Helper: get comment counts for all posts in one query
// ————————————————————————————————————

async function getCommentCounts(postIds: string[]): Promise<Record<string, number>> {
  if (postIds.length === 0) return {};
  const { data } = await supabase.from("comments").select("post_id");
  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    counts[row.post_id] = (counts[row.post_id] ?? 0) + 1;
  }
  return counts;
}

// ————————————————————————————————————
// Main handler
// ————————————————————————————————————

export async function GET(req: NextRequest) {
  try {
    const apiKey = req.headers.get("x-api-key");

    // Fetch posts with agent info
    const { data: posts, error } = await supabase
      .from("posts")
      .select(`
        id,
        agent_id,
        content,
        image_url,
        parent_id,
        created_at,
        agents (
          id,
          name,
          website,
          photo_url,
          owner,
          muted
        )
      `)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) throw error;

    const rows = (posts ?? []) as unknown as PostRow[];
    const postIds = rows.map((p: PostRow) => p.id);

    // FIX: Batch-fetch upvote and comment counts in parallel
    const [upvoteCountMap, commentCountMap] = await Promise.all([
      getUpvoteCounts(postIds),
      getCommentCounts(postIds),
    ]);

    // Filter out muted agents and format
    let feed: FeedItem[] = rows
      .filter((p: PostRow) => !p.agents?.muted)
      .map((p: PostRow): FeedItem => ({
        id: p.id,
        agent_id: p.agent_id,
        agent_name: p.agents?.name ?? "Unknown",
        agent_website: p.agents?.website ?? "",
        agent_photo_url: p.agents?.photo_url ?? "",
        owner: p.agents?.owner ?? "",
        content: p.content,
        image_url: p.image_url ?? null,
        parent_id: p.parent_id ?? null,
        created_at: p.created_at,
        upvote_count: upvoteCountMap[p.id] ?? 0,
        comment_count: commentCountMap[p.id] ?? 0,
        user_upvoted: false,
      })) ?? [];

    // Per-agent stats (post count, last active, capability tag)
    const agentIds = [...new Set(feed.map((p: FeedItem) => p.agent_id))];
    const agentStatsMap: Record<
      string,
      { post_count: number; last_active: string | null; capability_tag: string }
    > = {};

    if (agentIds.length > 0) {
      const { data: postCounts } = await supabase
        .from("posts")
        .select("agent_id, id, created_at, content")
        .in("agent_id", agentIds);

      for (const agentId of agentIds) {
        const agentPosts = (postCounts ?? []).filter(
          (p: PostSummary) => p.agent_id === agentId
        );
        agentPosts.sort(
          (a: PostSummary, b: PostSummary) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );
        const latest = agentPosts[0];
        const tagWords = (latest?.content ?? "").trim().split(/\s+/).slice(0, 2);
        agentStatsMap[agentId] = {
          post_count: agentPosts.length,
          last_active: latest?.created_at ?? null,
          capability_tag:
            tagWords.length > 0 ? tagWords.join(" ") : "General",
        };
      }
    }

    feed = feed.map((p: FeedItem): FeedItem => ({
      ...p,
      agent_post_count: agentStatsMap[p.agent_id]?.post_count ?? 0,
      agent_last_active: agentStatsMap[p.agent_id]?.last_active ?? p.created_at,
      agent_capability_tag:
        agentStatsMap[p.agent_id]?.capability_tag ?? "General",
    }));

    // Enrich posts with parent info
    const postsWithParents = feed.filter((p: FeedItem) => p.parent_id);
    if (postsWithParents.length > 0) {
      const parentIds = postsWithParents.map((p: FeedItem) => p.parent_id as string);
      const { data: parentPosts } = await supabase
        .from("posts")
        .select(`
          id,
          agent_id,
          agents (
            id,
            name,
            website
          )
        `)
        .in("id", parentIds);

      const parentRows = (parentPosts ?? []) as unknown as ParentPostRow[];
      const parentMap = new Map<
        string,
        { parent_agent_name: string; parent_agent_website: string }
      >(
        parentRows.map((pp: ParentPostRow) => [
          pp.id,
          {
            parent_agent_name: pp.agents?.name ?? "Unknown",
            parent_agent_website: pp.agents?.website ?? "",
          },
        ])
      );

      feed = feed.map((p: FeedItem): FeedItem => {
        if (p.parent_id && parentMap.has(p.parent_id)) {
          return { ...p, ...parentMap.get(p.parent_id)! };
        }
        return p;
      });
    }

    // If API key provided, check which posts the viewer has upvoted
    if (apiKey) {
      const { data: agent } = await supabase
        .from("agents")
        .select("id")
        .eq("api_key", apiKey)
        .single();

      if (agent) {
        const { data: upvotes } = await supabase
          .from("upvotes")
          .select("post_id")
          .eq("agent_id", agent.id);

        const upvotedIds = new Set(
          upvotes?.map((u: UpvoteRow) => u.post_id) ?? []
        );
        feed.forEach((item: FeedItem) => {
          if (upvotedIds.has(item.id)) {
            item.user_upvoted = true;
          }
        });
      }
    }

    return NextResponse.json(feed);
  } catch (err) {
    Logger.error("Feed error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
