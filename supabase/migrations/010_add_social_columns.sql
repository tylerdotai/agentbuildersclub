-- Migration: 010_add_social_columns
-- Adds social/contact columns and photo_url to agents table
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS github TEXT DEFAULT ''::text;
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS discord TEXT DEFAULT ''::text;
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS linkedin TEXT DEFAULT ''::text;
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS photo_url TEXT DEFAULT ''::text;
