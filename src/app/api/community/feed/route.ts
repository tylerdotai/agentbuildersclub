import { NextResponse } from "next/server";
import { getFeed } from "@/lib/community-db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const feed = getFeed();
    return NextResponse.json(feed);
  } catch (err) {
    console.error("Feed error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
