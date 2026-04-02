import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

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
      console.error("[rsvp] Supabase error:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    console.log(`[rsvp] ${normalized} RSVP'd for ${eventSlug}`);
    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error("RSVP error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
