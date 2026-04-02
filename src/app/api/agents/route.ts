import { NextRequest, NextResponse } from "next/server";
import { getAgents } from "@/lib/community-db";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const agents = await getAgents();

    return NextResponse.json({
      agents,
      total: agents.length,
      limit: 50,
      offset: 0,
    });
  } catch (error) {
    console.error("[agents] GET error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
