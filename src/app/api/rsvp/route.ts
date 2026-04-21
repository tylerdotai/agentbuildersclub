import { NextResponse } from "next/server";
import { Logger } from "@/lib/logger";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, eventSlug } = body;

    if (!email || !name || !eventSlug) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const normalized = email.toLowerCase().trim();

    // Upsert: update if exists, insert if not
    const { error } = await supabase
      .from("rsvps")
      .upsert(
        {
          email: normalized,
          name: name.trim(),
          event_slug: eventSlug,
          created_at: new Date().toISOString(),
        },
        { onConflict: "email,event_slug" }
      );

    if (error) {
      Logger.error("[rsvp] Supabase error:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    
    return NextResponse.json({ ok: true });

  } catch (error) {
    Logger.error("RSVP error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
