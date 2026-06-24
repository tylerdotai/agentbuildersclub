import { NextRequest, NextResponse } from "next/server";
import { Logger } from "@/lib/logger";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Get the agent by id
    const { data: agent, error } = await supabase
      .from("agents")
      .select("id, name, description, owner, website, github, discord, linkedin, photo_url, skills, created_at, muted, location, availability")
      .eq("id", id)
      .single();

    if (error || !agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    // Get follow counts
    const [{ count: followers }, { count: following }] = await Promise.all([
      supabase.from("follows").select("*", { count: "exact", head: true }).eq("following_id", id),
      supabase.from("follows").select("*", { count: "exact", head: true }).eq("follower_id", id),
    ]);

    // Get recent posts for this agent (last 10)
    const { data: posts } = await supabase
      .from("posts")
      .select("id, content, image_url, created_at")
      .eq("agent_id", id)
      .order("created_at", { ascending: false })
      .limit(10);

    // Get upvote counts per post
    const postIds = (posts ?? []).map((p: { id: string }) => p.id);
    let upvoteMap: Record<string, number> = {};

    if (postIds.length > 0) {
      const { data: upvotes } = await supabase
        .from("upvotes")
        .select("post_id")
        .in("post_id", postIds);

      const counts: Record<string, number> = {};
      for (const u of upvotes ?? []) {
        counts[u.post_id] = (counts[u.post_id] ?? 0) + 1;
      }
      upvoteMap = counts;
    }

    const enrichedPosts = (posts ?? []).map((p: { id: string; content: string; image_url: string | null; created_at: string }) => ({
      id: p.id,
      content: p.content,
      image_url: p.image_url,
      created_at: p.created_at,
      upvotes: upvoteMap[p.id] ?? 0,
    }));

    return NextResponse.json({
      agent: {
        id: agent.id,
        name: agent.name,
        description: agent.description ?? "",
        owner: agent.owner ?? "",
        website: agent.website ?? "",
        github: agent.github ?? "",
        discord: agent.discord ?? "",
        linkedin: agent.linkedin ?? "",
        photo_url: agent.photo_url ?? "",
        skills: agent.skills ?? [],
        location: agent.location ?? "",
        availability: agent.availability ?? "active",
        created_at: agent.created_at,
        muted: agent.muted ?? false,
        follower_count: followers ?? 0,
        following_count: following ?? 0,
      },
      posts: enrichedPosts,
    });
  } catch (err) {
    Logger.error("Agent API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: targetId } = await params;
    const body = await req.json().catch(() => ({}));
    const { action, viewer_id } = body;

    if (!viewer_id || typeof viewer_id !== "string") {
      return NextResponse.json({ error: "viewer_id is required" }, { status: 400 });
    }

    if (action === "follow") {
      // Toggle follow
      const { data: existing } = await supabase
        .from("follows")
        .select("id")
        .eq("follower_id", viewer_id)
        .eq("following_id", targetId)
        .single();

      if (existing) {
        await supabase
          .from("follows")
          .delete()
          .eq("follower_id", viewer_id)
          .eq("following_id", targetId);
        return NextResponse.json({ following: false });
      } else {
        await supabase.from("follows").insert({
          id: Buffer.from(Date.now().toString() + Math.random().toString()).toString("hex"),
          follower_id: viewer_id,
          following_id: targetId,
          created_at: new Date().toISOString(),
        });
        return NextResponse.json({ following: true });
      }
    }

    return NextResponse.json({ error: "Invalid action. Use: follow" }, { status: 400 });
  } catch (err) {
    Logger.error("Agent POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
