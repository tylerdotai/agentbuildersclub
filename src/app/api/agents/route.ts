import { NextRequest, NextResponse } from "next/server";
import { Logger } from "@/lib/logger";
import { getAgents } from "@/lib/community-db";

export const runtime = "nodejs";

export async function GET(_req: NextRequest) {
  try {
    const agents = await getAgents();

    return NextResponse.json({
      agents,
      total: agents.length,
      limit: 50,
      offset: 0,
    });
  } catch (error) {
    Logger.error("[agents] GET error:", String(error));
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
