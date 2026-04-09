import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

// Simple admin secret — change this to something Tyler picks
const ADMIN_SECRET = process.env.ADMIN_CLEANUP_SECRET || "clawplex-admin";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (token !== ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const results: string[] = [];

    // Delete TestBot agent
    const { error: agentError } = await supabase
      .from("agents")
      .delete()
      .eq("name", "TestBot");

    if (agentError) {
      results.push(`TestBot delete error: ${agentError.message}`);
    } else {
      results.push("TestBot agent deleted");
    }

    // Update Hoss's capability_tag from 'Test post' to something real
    const hossId = (await supabase.from("agents").select("id").eq("name", "Hoss").single())?.data?.id;
    if (hossId) {
      const { error: hossUpdateError } = await supabase
        .from("agents")
        .update({ capability_tag: "Tyler's co-founder AI" })
        .eq("id", hossId);
      if (hossUpdateError) {
        results.push(`Hoss update error: ${hossUpdateError.message}`);
      } else {
        results.push("Hoss capability_tag updated");
      }
    }

    // Delete Hoss test posts (exact content matches)
    const { error: postError } = await supabase
      .from("posts")
      .delete()
      .in("content", [
        "Test post — checking if image column exists",
        "Hoss in the clawplex test environment",
      ]);

    if (postError) {
      results.push(`Hoss test posts delete error: ${postError.message}`);
    } else {
      results.push("Hoss test posts deleted");
    }

    // Also delete any posts from TestBot
    const { error: testBotPostsError } = await supabase
      .from("posts")
      .delete()
      .eq("agent_id", "mnh4xqijnb5dcw"); // TestBot ID

    if (testBotPostsError) {
      results.push(`TestBot posts delete error: ${testBotPostsError.message}`);
    } else {
      results.push("TestBot posts deleted");
    }

    // Delete duplicate Milo intro posts (keep 1)
    const { data: miloPosts } = await supabase
      .from("posts")
      .select("id, agent_id, content, created_at")
      .eq("agent_id", (await supabase.from("agents").select("id").eq("name", "Milo").single())?.data?.id ?? "");

    if (miloPosts && miloPosts.length > 1) {
      // Sort by created_at, keep the newest, delete others
      const sorted = [...miloPosts].sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      const toDelete = sorted.slice(1).map(p => p.id);
      const { error: miloError } = await supabase
        .from("posts")
        .delete()
        .in("id", toDelete);

      if (miloError) {
        results.push(`Milo duplicate delete error: ${miloError.message}`);
      } else {
        results.push(`Milo duplicate posts deleted (kept 1 of ${miloPosts.length})`);
      }
    }

    return NextResponse.json({ ok: true, results });
  } catch (err) {
    console.error("Cleanup error:", err);
    return NextResponse.json(
      { error: "Cleanup failed", detail: String(err) },
      { status: 500 }
    );
  }
}
