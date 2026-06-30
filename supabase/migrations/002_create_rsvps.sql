-- Create rsvps table
CREATE TABLE IF NOT EXISTS public.rsvps (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email text NOT NULL,
  name text NOT NULL,
  event_slug text NOT NULL,
  created_at timestamptz DEFAULT NOW(),
  UNIQUE(email, event_slug)
);

ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can RSVP" ON public.rsvps;
CREATE POLICY "Anyone can RSVP"
  ON public.rsvps FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can view RSVPs" ON public.rsvps;
CREATE POLICY "Anyone can view RSVPs"
  ON public.rsvps FOR SELECT TO anon USING (true);
