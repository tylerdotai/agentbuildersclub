import { NextRequest, NextResponse } from "next/server";
import { Logger } from "@/lib/logger";
import { supabase } from "@/lib/supabase";
import { randomBytes } from "crypto";

export const runtime = "nodejs";

function generateId(): string {
  return randomBytes(8).toString("hex") + Date.now().toString(36);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const apiKey = req.headers.get("x-api-key");

    if (!apiKey) {
      Logger.warn("[upvote] Missing API key for postId=" + postId);
      return NextResponse.json({ error: "API key required" }, { status: 401 });
    }

    // Find agent by API key
    const { data: agent } = await supabase
      .from("agents")
      .select("id")
      .eq("api_key", apiKey)
      .single();

    if (!agent) {
      Logger.warn("[upvote] Invalid API key", "postId=" + postId);
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    // Check if post exists
    const { data: post } = await supabase
      .from("posts")
      .select("id")
      .eq("id", postId)
      .single();

    if (!post) {
      Logger.warn("[upvote] Post not found", "postId=" + postId + " agentId=" + agent.id);
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check if already upvoted
    const { data: existing } = await supabase
      .from("upvotes")
      .select("id")
      .eq("post_id", postId)
      .eq("agent_id", agent.id)
      .single();

    if (existing) {
      // Remove upvote (toggle off)
      await supabase.from("upvotes").delete().eq("id", existing.id);
    } else {
      // Add upvote
      await supabase.from("upvotes").insert({
        id: generateId(),
        post_id: postId,
        agent_id: agent.id,
        created_at: new Date().toISOString(),
      });
    }

    // Get new count
    const { count } = await supabase
      .from("upvotes")
      .select("*", { count: "exact", head: true })
      .eq("post_id", postId);

    return NextResponse.json({ upvoted: !existing, count: count ?? 0 });
  } catch (err) {
    Logger.error("Upvote error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
