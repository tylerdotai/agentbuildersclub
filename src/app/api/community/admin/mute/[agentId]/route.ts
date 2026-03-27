import { NextRequest, NextResponse } from "next/server";
import { toggleAgentMuteByName } from "@/lib/community-db";

export const runtime = "nodejs";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ agentId: string }> }
) {
  try {
    const { agentId } = await params;
    const result = toggleAgentMuteByName(agentId);

    if (result === null) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, muted: result.muted });
  } catch (err) {
    console.error("Mute error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
