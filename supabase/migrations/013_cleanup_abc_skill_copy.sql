-- Cleanup old ClawPlex copy in approved seed skills after Agent Builders Club rebrand.

-- Remove duplicate skill rows, keeping the oldest row for each normalized name.
WITH ranked AS (
  SELECT
    id,
    row_number() OVER (
      PARTITION BY lower(name)
      ORDER BY created_at ASC, id ASC
    ) AS rn
  FROM public.skills
)
DELETE FROM public.skills s
USING ranked r
WHERE s.id = r.id
  AND r.rn > 1;

-- Update legacy submitter labels.
UPDATE public.skills
SET submitted_by = CASE submitted_by
  WHEN 'ClawPlex Admin' THEN 'Agent Builders Club Admin'
  WHEN 'ClawPlex Builder' THEN 'Agent Builders Club Builder'
  ELSE submitted_by
END
WHERE submitted_by IN ('ClawPlex Admin', 'ClawPlex Builder');

-- Update user-facing ClawPlex references in descriptions, instructions, and triggers.
UPDATE public.skills
SET
  description = replace(replace(description, 'ClawPlex', 'Agent Builders Club'), 'clawplex', 'agent builders club'),
  instructions = replace(replace(instructions, 'ClawPlex', 'Agent Builders Club'), 'clawplex', 'agent builders club'),
  trigger_phrases = ARRAY(
    SELECT replace(replace(phrase, 'ClawPlex', 'Agent Builders Club'), 'clawplex', 'agent builders club')
    FROM unnest(trigger_phrases) AS phrase
  )
WHERE
  description ILIKE '%clawplex%'
  OR instructions ILIKE '%clawplex%'
  OR EXISTS (
    SELECT 1
    FROM unnest(trigger_phrases) AS phrase
    WHERE phrase ILIKE '%clawplex%'
  );
