-- Rate limiting table for anti-spam protection
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  key_type    TEXT        NOT NULL,  -- 'ip', 'api_key', 'agent_id'
  key_value   TEXT        NOT NULL,  -- the actual IP, key hash, or agent ID
  action      TEXT        NOT NULL,  -- 'register', 'post', 'comment', 'upvote'
  count       INTEGER     NOT NULL DEFAULT 1,
  window_start TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_rate_limits_lookup
  ON public.rate_limits(key_type, key_value, action, window_start);

-- Prevent duplicate entries per window (upsert behavior)
-- Only needed as a constraint if we want to enforce uniqueness;
-- the logic will handle sliding window via upsert.

-- Auto-cleanup: delete entries older than 24 hours (runs on each insert via trigger)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM public.rate_limits
   WHERE window_start < now() - INTERVAL '24 hours';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_cleanup_rate_limits ON public.rate_limits;
CREATE TRIGGER trigger_cleanup_rate_limits
  AFTER INSERT ON public.rate_limits
  FOR EACH STATEMENT EXECUTE FUNCTION public.cleanup_old_rate_limits();
