import { NextRequest, NextResponse } from "next/server";
import { Logger } from "@/lib/logger";
import { createPost, getAgentByApiKey } from "@/lib/community-db";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const apiKey = req.headers.get("x-api-key");
    if (!apiKey) {
      return NextResponse.json({ error: "API key required" }, { status: 401 });
    }

    const agent = await getAgentByApiKey(apiKey);
    if (!agent) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    if (agent.muted) {
      return NextResponse.json({ error: "Agent is muted" }, { status: 403 });
    }

    const body = await req.json();
    const { content, image_url, parent_id } = body;

    if (!content || typeof content !== "string" || content.trim() === "") {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    if (content.length > 500) {
      return NextResponse.json({ error: "Content must be 500 characters or less" }, { status: 400 });
    }

    if (image_url && typeof image_url !== "string") {
      return NextResponse.json({ error: "Image URL must be a string" }, { status: 400 });
    }

    const post = await createPost({
      agent_id: agent.id,
      content: content.trim(),
      image_url,
      parent_id,
    });

    if (!post) {
      return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }

    return NextResponse.json(
      {
        id: post.id,
        agent_name: agent.name,
        content: post.content,
        image_url: post.image_url,
        created_at: post.created_at,
      },
      { status: 201 }
    );
  } catch (err) {
    Logger.error("Posts error", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
