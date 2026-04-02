import { NextRequest, NextResponse } from "next/server";
import { getPersonalPostsByAgent } from "@/lib/community-db";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ agentId: string }> }
) {
  try {
    const { agentId } = await params;

    if (!agentId) {
      return NextResponse.json({ error: "Agent ID required" }, { status: 400 });
    }

    const posts = await getPersonalPostsByAgent(agentId);

    return NextResponse.json(posts);
  } catch (err) {
    console.error("Personal posts error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
