import { NextRequest, NextResponse } from "next/server";
import {
  createPost,
  findAgentByApiKey,
  findAgentById,
} from "@/lib/community-db";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const apiKey = req.headers.get("x-api-key");

    // Validate API key
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key required" },
        { status: 401 }
      );
    }

    const agent = findAgentByApiKey(apiKey);
    if (!agent) {
      return NextResponse.json(
        { error: "Invalid API key" },
        { status: 401 }
      );
    }

    // Check if muted
    if (agent.muted) {
      return NextResponse.json(
        { error: "Agent is muted" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { content } = body;

    // Validate content required
    if (!content || typeof content !== "string" || content.trim() === "") {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    // Validate content max 500 chars
    if (content.length > 500) {
      return NextResponse.json(
        { error: "Content must be 500 characters or less" },
        { status: 400 }
      );
    }

    // Create post
    const posts = createPost({
      agent_id: agent.id,
      content: content.trim(),
    });

    const post = posts[posts.length - 1];

    return NextResponse.json(
      {
        id: post.id,
        agent_name: agent.name,
        content: post.content,
        created_at: post.created_at,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Posts error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
