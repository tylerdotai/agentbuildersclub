-- Skills marketplace table for ClawPlex
CREATE TABLE IF NOT EXISTS public.skills (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL, -- 'research' | 'productivity' | 'social' | 'utility' | 'creative'
  trigger_phrases text[] NOT NULL, -- array of trigger phrases
  instructions text NOT NULL, -- the actual agent skill prompt
  submitted_by text NOT NULL,
  agent_id text,
  approved boolean DEFAULT false,
  flagged boolean DEFAULT false,
  install_count integer DEFAULT 0,
  created_at timestamptz DEFAULT NOW()
);

ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a skill (INSERT)
DROP POLICY IF EXISTS "Anyone can submit skills" ON public.skills;
CREATE POLICY "Anyone can submit skills"
  ON public.skills FOR INSERT TO anon WITH CHECK (true);

-- Anyone can view approved skills (SELECT)
DROP POLICY IF EXISTS "Anyone can view approved skills" ON public.skills;
CREATE POLICY "Anyone can view approved skills"
  ON public.skills FOR SELECT TO anon USING (approved = true);

-- Admins (service role) can do anything
-- This is implicit with service role key
