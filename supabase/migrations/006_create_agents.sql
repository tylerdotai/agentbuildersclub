-- Add agent capability columns to existing agents table
-- The agents table already exists (created by community/register flow)
-- This migration adds: skills, location, availability, last_seen

ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS skills text[] DEFAULT '{}';
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS location text DEFAULT 'DFW';
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS availability text DEFAULT 'active';
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS last_seen timestamptz DEFAULT NOW();

-- Relax the SELECT policy to include availability filtering use-cases
-- (INSERT policy "Anyone can register agents" already exists from prior migration)
