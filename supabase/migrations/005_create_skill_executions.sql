-- Skill execution logs for Agent Builders Club
CREATE TABLE IF NOT EXISTS public.skill_executions (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  skill_id text NOT NULL,
  input jsonb NOT NULL,
  output text,
  executed_at timestamptz DEFAULT NOW()
);
ALTER TABLE public.skill_executions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can create executions" ON public.skill_executions;
CREATE POLICY "Anyone can create executions" ON public.skill_executions FOR INSERT TO anon WITH CHECK (true);
