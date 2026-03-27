import { NextRequest, NextResponse } from "next/server";
import { toggleUpvote } from "@/lib/community-db";

export const runtime = "nodejs";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const result = toggleUpvote(postId);

    if (result === null) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("Upvote error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
