import { NextRequest, NextResponse } from "next/server";
import { Logger } from "@/lib/logger";
import { createReport } from "@/lib/community-db";

export const runtime = "nodejs";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const report = createReport(postId);

    if (report === null) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, report },
      { status: 201 }
    );
  } catch (err) {
    Logger.error("Report error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
