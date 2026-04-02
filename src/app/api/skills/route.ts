import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    console.log("[skills-list] Fetching approved skills");

    const { data, error } = await supabase
      .from("skills")
      .select(
        "id, name, description, category, trigger_phrases, instructions, submitted_by, agent_id, install_count, created_at"
      )
      .eq("approved", true)
      .eq("flagged", false)
      .order("install_count", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[skills-list] Supabase error:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    const skills = (data ?? []).map((s) => ({
      id: s.id,
      name: s.name,
      description: s.description,
      category: s.category,
      trigger_phrases: s.trigger_phrases,
      instructions: s.instructions,
      submitter_name: s.submitted_by,
      install_count: s.install_count,
      created_at: s.created_at,
    }));

    console.log(`[skills-list] Returning ${skills.length} skills`);
    return NextResponse.json({ skills });
  } catch (error) {
    console.error("[skills-list] Unexpected error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
