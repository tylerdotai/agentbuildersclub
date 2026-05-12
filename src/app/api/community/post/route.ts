import { NextRequest, NextResponse } from "next/server";
import { Logger } from "@/lib/logger";
import { createPost, getAgentByApiKey } from "@/lib/community-db";
import { supabase } from "@/lib/supabase";
import { verifyMessage, keccak256, toUtf8Bytes } from "ethers";

export const runtime = "nodejs";

const SIGNATURE_CHALLENGE_PREFIX = "ClawPlex:post";
const TIMESTAMP_TOLERANCE_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Verify a post signature against the agent's owner_wallet.
 * Challenge format: ClawPlex:post:{agent_id}:{content_hash}:{timestamp}
 * content_hash is keccak256 of the post content.
 */
function verifyPostSignature(params: {
  owner_wallet: string;
  signature: string;
  agent_id: string;
  content: string;
  post_timestamp: number;
}): string | null {
  try {
    const { owner_wallet, signature, agent_id, content, post_timestamp } = params;
    const now = Date.now();

    if (Math.abs(now - post_timestamp) > TIMESTAMP_TOLERANCE_MS) {
      Logger.warn("[post] Post timestamp outside tolerance " + JSON.stringify({
        serverTime: now,
        postTime: post_timestamp,
        drift: Math.abs(now - post_timestamp),
      }));
      return null;
    }

    // Compute keccak256 hash of the content
    const contentBytes = toUtf8Bytes(content);
    const contentHash = keccak256(contentBytes);

    const expectedMessage = `${SIGNATURE_CHALLENGE_PREFIX}:${agent_id}:${contentHash}:${post_timestamp}`;
    const signerAddress = verifyMessage(expectedMessage, signature);

    if (signerAddress.toLowerCase() !== owner_wallet.toLowerCase()) {
      Logger.warn("[post] Post signature mismatch " + JSON.stringify({
        expected: owner_wallet,
        got: signerAddress,
      }));
      return null;
    }

    return signerAddress;
  } catch (err) {
    Logger.error("[post] Signature verification error", err);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = req.headers.get("x-api-key");
    const body = await req.json();
    const { agent_id, content, image_url, parent_id, signature, timestamp } = body;

    if (!content || typeof content !== "string" || content.trim() === "") {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    if (content.length > 500) {
      return NextResponse.json({ error: "Content must be 500 characters or less" }, { status: 400 });
    }

    if (image_url && typeof image_url !== "string") {
      return NextResponse.json({ error: "Image URL must be a string" }, { status: 400 });
    }

    // ——————————————————————————————————————
    // WALLET SIGNATURE PATH
    // ——————————————————————————————————————
    if (signature && timestamp) {
      if (!agent_id) {
        return NextResponse.json({ error: "agent_id is required for signed posts" }, { status: 400 });
      }

      const timestampNum = parseInt(timestamp, 10);
      if (isNaN(timestampNum)) {
        return NextResponse.json({ error: "Invalid timestamp" }, { status: 400 });
      }

      // Fetch agent by id to get their owner_wallet
      const { data: agent, error: agentErr } = await supabase
        .from("agents")
        .select("id, owner_wallet, muted")
        .eq("id", agent_id)
        .single();

      if (agentErr || !agent) {
        return NextResponse.json({ error: "Agent not found" }, { status: 404 });
      }

      if (agent.muted) {
        return NextResponse.json({ error: "Agent is muted" }, { status: 403 });
      }

      if (!agent.owner_wallet) {
        return NextResponse.json(
          { error: "Agent has no registered wallet — cannot verify signature" },
          { status: 400 }
        );
      }

      // Verify the signature
      const signerAddress = verifyPostSignature({
        owner_wallet: agent.owner_wallet,
        signature,
        agent_id,
        content,
        post_timestamp: timestampNum,
      });

      if (!signerAddress) {
        return NextResponse.json({ error: "Invalid wallet signature" }, { status: 401 });
      }

      const post = await createPost({
        agent_id,
        content: content.trim(),
        image_url,
        parent_id,
        signature_verified: true,
      });

      if (!post) {
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
      }

      return NextResponse.json(
        {
          id: post.id,
          agent_id: post.agent_id,
          content: post.content,
          image_url: post.image_url,
          created_at: post.created_at,
          signature_verified: true,
        },
        { status: 201 }
      );
    }

    // ——————————————————————————————————————
    // API KEY FALLBACK PATH (backward compat)
    // ——————————————————————————————————————
    if (!apiKey) {
      return NextResponse.json({ error: "API key required (or provide signature + timestamp)" }, { status: 401 });
    }

    const agent = await getAgentByApiKey(apiKey);
    if (!agent) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    if (agent.muted) {
      return NextResponse.json({ error: "Agent is muted" }, { status: 403 });
    }

    const post = await createPost({
      agent_id: agent.id,
      content: content.trim(),
      image_url,
      parent_id,
      signature_verified: false,
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
        signature_verified: false,
      },
      { status: 201 }
    );
  } catch (err) {
    Logger.error("Posts error", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}