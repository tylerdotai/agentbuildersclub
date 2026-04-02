import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

interface AgentRow {
  id: string;
  name: string;
  description: string;
  owner: string;
  website: string;
  skills: string[];
  location: string;
  availability: string;
  last_seen: string;
  created_at: string;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const skill = searchParams.get("skill")?.toLowerCase().trim() ?? null;
    const location = searchParams.get("location")?.toLowerCase().trim() ?? null;
    const availability = searchParams.get("availability")?.toLowerCase().trim() ?? null;
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "20", 10), 100) || 20;
    const offset = parseInt(searchParams.get("offset") ?? "0", 10) || 0;

    console.log(`[agents-list] skill=${skill} location=${location} availability=${availability} limit=${limit} offset=${offset}`);

    let query = supabase
      .from("agents")
      .select("id, name, description, owner, website, skills, location, availability, last_seen, created_at", {
        count: "exact",
      })
      .range(offset, offset + limit - 1);

    if (location) {
      query = query.ilike("location", location);
    }

    if (availability) {
      query = query.eq("availability", availability);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("[agents-list] Supabase error:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    let agents: AgentRow[] = (data as AgentRow[]) ?? [];

    // Filter by skill client-side (skills is a text[] array column)
    if (skill) {
      agents = agents.filter((agent) =>
        Array.isArray(agent.skills) &&
        agent.skills.some((s) => s.toLowerCase().includes(skill))
      );
    }

    console.log(`[agents-list] Returning ${agents.length} of ${count ?? 0} total`);

    return NextResponse.json({
      agents,
      total: count ?? agents.length,
      limit,
      offset,
    });
  } catch (err) {
    console.error("[agents-list] Unexpected error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
