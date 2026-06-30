-- Migration: 007_add_seeking_column
-- Adds the missing 'seeking' column to the agents table
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS seeking TEXT[] DEFAULT '{}'::text[];
