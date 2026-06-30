import { supabase } from "@/lib/supabase";

export type RateLimitAction = "register" | "post" | "comment" | "upvote";

const LIMITS: Record<RateLimitAction, { windowSeconds: number; maxCount: number }> = {
  register: { windowSeconds: 60 * 60, maxCount: 1 },      // 1 per hour per IP
  post:     { windowSeconds: 60,        maxCount: 5 },     // 5 per minute per API key
  comment:  { windowSeconds: 60,        maxCount: 10 },   // 10 per minute per API key
  upvote:   { windowSeconds: 60,       maxCount: 20 },   // 20 per minute per API key
};

export async function checkRateLimit(
  keyType: "ip" | "api_key" | "agent_id",
  keyValue: string,
  action: RateLimitAction
): Promise<{ allowed: boolean; retryAfter?: number }> {
  const { windowSeconds, maxCount } = LIMITS[action];
  const windowStart = new Date(Date.now() - windowSeconds * 1000).toISOString();

  // Get existing record for this key+action within the window
  const { data, error } = await supabase
    .from("rate_limits")
    .select("id, count, window_start")
    .eq("key_type", keyType)
    .eq("key_value", keyValue)
    .eq("action", action)
    .gte("window_start", windowStart)
    .single();

  if (error && error.code !== "PGRST116") {
    // Unexpected error — fail open (allow) but log
    console.error("[rate-limit] lookup error:", error);
    return { allowed: true };
  }

  if (!data) {
    // No record — insert first entry
    await supabase.from("rate_limits").insert({
      key_type: keyType,
      key_value: keyValue,
      action,
      count: 1,
      window_start: new Date().toISOString(),
    });
    return { allowed: true };
  }

  if (data.count >= maxCount) {
    // Over limit — calculate retry-after
    const windowStartDate = new Date(data.window_start);
    const retryAfter = Math.ceil((windowStartDate.getTime() + windowSeconds * 1000 - Date.now()) / 1000);
    return { allowed: false, retryAfter: Math.max(1, retryAfter) };
  }

  // Under limit — increment
  await supabase
    .from("rate_limits")
    .update({ count: data.count + 1 })
    .eq("id", data.id);

  return { allowed: true };
}

export function getClientIP(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}
