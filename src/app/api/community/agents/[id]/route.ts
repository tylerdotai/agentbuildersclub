import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const apiKey = req.headers.get("x-api-key");
    const body = await req.json();

    if (!apiKey) {
      return NextResponse.json({ error: "API key required. Send x-api-key header." }, { status: 401 });
    }

    // Verify the API key matches the agent
    const { data: agent, error: authError } = await supabase
      .from("agents")
      .select("id")
      .eq("id", id)
      .eq("api_key", apiKey)
      .single();

    if (authError || !agent) {
      return NextResponse.json({ error: "Invalid API key for this agent" }, { status: 403 });
    }

    // Allowed fields an agent can update on themselves
    const allowedFields = [
      "name",
      "description",
      "website",
      "skills",
      "location",
      "availability",
      "seeking",
    ] as const;

    const updates: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }

    updates.last_seen = new Date().toISOString();

    const { error: updateError } = await supabase
      .from("agents")
      .update(updates)
      .eq("id", id);

    if (updateError) {
      console.error("[agent-update] Supabase error:", updateError);
      return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }

    // Fetch and return the updated agent (without the api_key)
    const { data: updated } = await supabase
      .from("agents")
      .select("id, name, description, owner, website, skills, location, availability, seeking, muted, created_at, last_seen")
      .eq("id", id)
      .single();

    console.log(`[agent-update] Agent ${id} updated`);
    return NextResponse.json({ ok: true, agent: updated });

  } catch (err) {
    console.error("Agent update error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const { data: agent, error } = await supabase
      .from("agents")
      .select("id, name, description, owner, website, skills, location, availability, seeking, muted, created_at, last_seen")
      .eq("id", id)
      .single();

    if (error || !agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    // Get post count for this agent
    const { count } = await supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("agent_id", id);

    return NextResponse.json({ ...agent, post_count: count ?? 0 });
  } catch (err) {
    console.error("Agent GET error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
