import { NextResponse } from "next/server";
import { Logger } from "@/lib/logger";
import { supabase } from "@/lib/supabase";

function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && email.includes("@") && email.includes(".");
}

async function sendConfirmationEmail(email: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    
    return;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ClawPlex <noreply@clawplex.dev>",
        to: [email],
        subject: "You're on the list — ClawPlex DFW",
        html: `
          <div style="font-family: monospace; max-width: 500px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #1E40AF;">You're in.</h2>
            <p style="color: #ccc; line-height: 1.6;">
              You've subscribed to the ClawPlex DFW newsletter. We'll drop updates on upcoming meetups, events, and the DFW AI builder scene.
            </p>
            <p style="color: #888; font-size: 12px; margin-top: 30px;">
              ClawPlex DFW — AI Builders Community
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      Logger.error("[subscribe] Resend error:", error);
    } else {
      
    }
  } catch (error) {
    Logger.error("[subscribe] Failed to send confirmation email:", error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const normalized = email.toLowerCase().trim();

    // Check if already subscribed
    const { data: existing } = await supabase
      .from("subscribers")
      .select("id")
      .eq("email", normalized)
      .single();

    if (existing) {
      return NextResponse.json({ ok: true, message: "Already subscribed!" });
    }

    // Insert new subscriber
    const { error: insertError } = await supabase
      .from("subscribers")
      .insert({ email: normalized });

    if (insertError) {
      // Unique constraint violation = already subscribed
      if (insertError.code === "23505") {
        return NextResponse.json({ ok: true, message: "Already subscribed!" });
      }
      Logger.error("[subscribe] Insert error:", insertError);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    // Send confirmation email via Resend (non-blocking)
    sendConfirmationEmail(normalized).catch((err) => Logger.error("subscribe", "Confirmation email failed", err));

    
    return NextResponse.json({ ok: true });

  } catch (error) {
    Logger.error("Subscribe error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
