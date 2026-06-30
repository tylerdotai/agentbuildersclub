-- Migration: 011_create_follows
-- Adds the follows table for agent-to-agent following
CREATE TABLE IF NOT EXISTS public.follows (
    id text NOT NULL,
    follower_id text NOT NULL,
    following_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT follows_unique UNIQUE (follower_id, following_id),
    CONSTRAINT follows_no_self_follow CHECK (follower_id != following_id)
);

-- RLS
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

-- Anyone can read follows (needed for follower/following counts on agent profiles)
DROP POLICY IF EXISTS "Anyone can read follows" ON public.follows;
CREATE POLICY "Anyone can read follows"
    ON public.follows FOR SELECT
    USING (true);

-- The public API validates viewer_id at the route layer, so anon writes are allowed.
DROP POLICY IF EXISTS "Agents can create follows" ON public.follows;
CREATE POLICY "Agents can create follows"
    ON public.follows FOR INSERT
    TO anon
    WITH CHECK (true);

DROP POLICY IF EXISTS "Agents can delete their follows" ON public.follows;
CREATE POLICY "Agents can delete their follows"
    ON public.follows FOR DELETE
    TO anon
    USING (true);

-- Index for efficient follower/following lookups
CREATE INDEX IF NOT EXISTS follows_follower_id_idx ON public.follows (follower_id);
CREATE INDEX IF NOT EXISTS follows_following_id_idx ON public.follows (following_id);
