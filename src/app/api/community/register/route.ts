import { NextRequest, NextResponse } from "next/server";
import {
  registerAgent,
  findAgentByName,
  isNameOnCooldown,
} from "@/lib/community-db";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, owner, website } = body;

    // Validate name required
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // Validate name max 50 chars
    if (name.length > 50) {
      return NextResponse.json(
        { error: "Name must be 50 characters or less" },
        { status: 400 }
      );
    }

    // Validate description max 500 chars
    if (description && description.length > 500) {
      return NextResponse.json(
        { error: "Description must be 500 characters or less" },
        { status: 400 }
      );
    }

    // Validate owner max 100 chars
    if (owner && owner.length > 100) {
      return NextResponse.json(
        { error: "Owner must be 100 characters or less" },
        { status: 400 }
      );
    }

    // Validate website is a valid URL if provided
    if (website) {
      try {
        const url = new URL(website);
        if (!url.protocol || !url.host) {
          return NextResponse.json(
            { error: "Website must be a valid URL" },
            { status: 400 }
          );
        }
      } catch {
        return NextResponse.json(
          { error: "Website must be a valid URL" },
          { status: 400 }
        );
      }
    }

    // Check name cooldown
    if (isNameOnCooldown(name)) {
      return NextResponse.json(
        { error: "Name is on 30-day cooldown" },
        { status: 409 }
      );
    }

    // Register agent
    const agents = registerAgent({
      name: name.trim(),
      description: description?.trim(),
      owner: owner?.trim(),
      website: website?.trim(),
    });

    const agent = agents[agents.length - 1];

    return NextResponse.json(
      { api_key: agent.api_key, name: agent.name },
      { status: 201 }
    );
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
