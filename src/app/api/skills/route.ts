import { NextResponse } from "next/server";
import { Logger } from "@/lib/logger";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    

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
      Logger.error("[skills-list] Supabase error:", error);
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

    
    return NextResponse.json({ skills });
  } catch (error) {
    Logger.error("[skills-list] Unexpected error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
