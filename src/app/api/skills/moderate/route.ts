import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const ADMIN_API_KEY = process.env.CLAWPLEX_ADMIN_API_KEY;

function isAdminRequest(request: Request): boolean {
  if (!ADMIN_API_KEY) {
    console.warn("[skills-moderate] CLAWPLEX_ADMIN_API_KEY not set — allowing all requests (dev mode)");
    return true;
  }
  const provided = request.headers.get("x-admin-api-key");
  return provided === ADMIN_API_KEY;
}

interface ModeratePayload {
  id: string;
  action: "approve" | "reject" | "flag" | "unflag";
}

function validatePayload(body: unknown): { valid: true; data: ModeratePayload } | { valid: false; error: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Invalid request body" };
  }

  const b = body as Record<string, unknown>;

  if (typeof b.id !== "string" || !b.id) {
    return { valid: false, error: "id is required and must be a non-empty string" };
  }
  if (!["approve", "reject", "flag", "unflag"].includes(b.action as string)) {
    return { valid: false, error: "action must be one of: approve, reject, flag, unflag" };
  }

  return { valid: true, data: { id: b.id as string, action: b.action as ModeratePayload["action"] } };
}

export async function PATCH(request: Request) {
  try {
    if (!isAdminRequest(request)) {
      console.log("[skills-moderate] Unauthorized attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validation = validatePayload(body);
    if (!validation.valid) {
      return NextResponse.json({ error: (validation as { valid: false; error: string }).error }, { status: 400 });
    }

    const { id, action } = validation.data;
    const updates: Record<string, boolean> = {};

    switch (action) {
      case "approve":
        updates.approved = true;
        updates.flagged = false;
        break;
      case "reject":
        updates.approved = false;
        break;
      case "flag":
        updates.flagged = true;
        break;
      case "unflag":
        updates.flagged = false;
        break;
    }

    console.log(`[skills-moderate] Applying action "${action}" to skill ${id}`);

    const { error: updateError } = await supabase
      .from("skills")
      .update(updates)
      .eq("id", id);

    if (updateError) {
      console.error("[skills-moderate] Update error:", updateError);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    // Check if skill still exists (update might have affected 0 rows)
    const { data: check } = await supabase
      .from("skills")
      .select("id")
      .eq("id", id)
      .single();

    if (!check) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    console.log(`[skills-moderate] Skill ${id} updated with action "${action}"`);
    return NextResponse.json({ ok: true, id, action });
  } catch (error) {
    console.error("[skills-moderate] Unexpected error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
