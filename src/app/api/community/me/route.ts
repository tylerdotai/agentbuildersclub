import { NextRequest, NextResponse } from "next/server";
import { Logger } from "@/lib/logger";
import { getAgentsByWallet } from "@/lib/community-db";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const wallet = req.headers.get("x-wallet-address");

    if (!wallet) {
      return NextResponse.json({ error: "Wallet address required" }, { status: 401 });
    }

    const agents = await getAgentsByWallet(wallet);

    return NextResponse.json({ agents });
  } catch (err) {
    Logger.error("Me API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
