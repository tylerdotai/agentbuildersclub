import { NextRequest, NextResponse } from "next/server";
import { Logger } from "@/lib/logger";
import { supabase } from "@/lib/supabase";

const MINIMAX_API_BASE = "https://api.minimax.io/v1";
const MINIMAX_MODEL = "MiniMax-Text-01";

interface ExecuteRequest {
  skill_id: string;
  input: {
    task: string;
    context?: Record<string, unknown>;
  };
}

export async function POST(req: NextRequest) {
  try {
    

    const body: ExecuteRequest = await req.json();

    if (!body.skill_id) {
      
      return NextResponse.json({ error: "skill_id is required" }, { status: 400 });
    }

    if (!body.input?.task) {
      
      return NextResponse.json({ error: "input.task is required" }, { status: 400 });
    }

    // 1. Fetch skill from Supabase
    
    const { data: skill, error: skillError } = await supabase
      .from("skills")
      .select("id, name, description, instructions")
      .eq("id", body.skill_id)
      .eq("approved", true)
      .single();

    if (skillError || !skill) {
      
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    

    // 2. Construct prompt
    const systemPrompt = `You are a helpful assistant with the following skill:\n\n${skill.instructions}`;
    const userMessage = body.input.task + (body.input.context ? `\n\nContext: ${JSON.stringify(body.input.context, null, 2)}` : "");

    

    let output: string;

    const apiKey = process.env.MINIMAX_API_KEY;
    if (!apiKey) {
      // Fallback mock for dev/demo
      
      output = `[MOCK] Executed skill "${skill.name}" for task: ${body.input.task}\n\nThis is a mock response because MINIMAX_API_KEY is not configured.`;
    } else {
      // 3. Call MiniMax API
      const minimaxRes = await fetch(`${MINIMAX_API_BASE}/chat/completions_pro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: MINIMAX_MODEL,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage },
          ],
          stream: false,
        }),
      });

      if (!minimaxRes.ok) {
        const errText = await minimaxRes.text();
        Logger.error(`[skills-execute] MiniMax API error ${minimaxRes.status}:`, errText);
        return NextResponse.json({ error: "AI service error" }, { status: 502 });
      }

      const minimaxData = await minimaxRes.json();
      output = minimaxData.choices?.[0]?.message?.content ?? "";

      
    }

    // 4. Log execution to Supabase
    
    const { error: logError } = await supabase.from("skill_executions").insert({
      skill_id: body.skill_id,
      input: body.input,
      output,
    });

    if (logError) {
      Logger.error("[skills-execute] Failed to log execution:", logError);
      // Non-fatal — don't fail the request if logging fails
    }

    
    return NextResponse.json({ output, skill_id: body.skill_id, skill_name: skill.name });
  } catch (error) {
    Logger.error("[skills-execute] Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
