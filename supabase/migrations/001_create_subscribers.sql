-- Create subscribers table for ClawPlex newsletter
CREATE TABLE IF NOT EXISTS public.subscribers (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe (insert)
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.subscribers;
CREATE POLICY "Anyone can subscribe"
  ON public.subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anyone to check if email exists (for "already subscribed" UX)
DROP POLICY IF EXISTS "Anyone can view subscribed emails" ON public.subscribers;
CREATE POLICY "Anyone can view subscribed emails"
  ON public.subscribers
  FOR SELECT
  TO anon
  USING (true);
