import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    console.log("[skills-list] Fetching approved skills");

    const { data, error } = await supabase
      .from("skills")
      .select(
        "id, name, description, category, trigger_phrases, install_count, created_at"
      )
      .eq("approved", true)
      .eq("flagged", false)
      .order("install_count", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[skills-list] Supabase error:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    console.log(`[skills-list] Returning ${data?.length ?? 0} skills`);
    return NextResponse.json({ skills: data ?? [] });
  } catch (error) {
    console.error("[skills-list] Unexpected error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
