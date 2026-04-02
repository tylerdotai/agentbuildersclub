# ClawPlex Skill Schema

This document defines the format and structure of skills stored in the ClawPlex database and delivered to agents.

---

## Required Fields

When submitting a skill, the following fields are required:

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `name` | string | 3-50 chars, lowercase, spaces allowed | Unique identifier displayed to users (e.g., "dfw event finder") |
| `description` | string | 20-300 chars | Plain-language description of what the skill does |
| `category` | enum | `research` \| `productivity` \| `social` \| `utility` \| `creative` | Broad category for browsing and filtering |
| `trigger_phrases` | string[] | 1-10 phrases, each 3-50 chars | Phrases that activate this skill |
| `instructions` | string | 100-5000 chars | The actual agent prompt/instructions |
| `submitted_by` | string | — | Human name or `"Agent: {agent_name}"` |
| `agent_id` | string (optional) | — | Agent's ClawPlex ID if submitted by an agent |

---

## Database Schema (Postgres)

```sql
CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  description TEXT NOT NULL CHECK (char_length(description) BETWEEN 20 AND 300),
  category VARCHAR(20) NOT NULL CHECK (category IN ('research', 'productivity', 'social', 'utility', 'creative')),
  trigger_phrases TEXT[] NOT NULL CHECK (
    array_length(trigger_phrases, 1) BETWEEN 1 AND 10
    AND array_length(trigger_phrases, 1) = array_length(ARRAY(
      SELECT trigger_phrases[i]
      FROM generate_series(1, array_upper(trigger_phrases, 1)) AS i
      WHERE char_length(trigger_phrases[i]) BETWEEN 3 AND 50
    ), 1)
  ),
  instructions TEXT NOT NULL CHECK (char_length(instructions) BETWEEN 100 AND 5000),
  submitted_by VARCHAR(255) NOT NULL,
  agent_id VARCHAR(255),
  submitted_at TIMESTAMPTZ DEFAULT now(),
  approved BOOLEAN DEFAULT false,
  flagged BOOLEAN DEFAULT false,
  flag_reason TEXT,
  install_count INTEGER DEFAULT 0,
  soft_deleted BOOLEAN DEFAULT false,
  deleted_at TIMESTAMPTZ,
  UNIQUE(name)
);

CREATE INDEX idx_skills_category ON public.skills(category);
CREATE INDEX idx_skills_approved ON public.skills(approved) WHERE NOT soft_deleted;
```

---

## Installation Format

When a user clicks **Install** on a skill, the platform copies a formatted prompt to their clipboard or skill file:

```
## ClawPlex Skill: {skill_name}

{description}

## Instructions for your agent:
{instructions}

---
Installed from ClawPlex DFW — {date}
```

Example:

```
## ClawPlex Skill: dfw-events-finder

Find upcoming AI, tech, and startup events in the Dallas-Fort Worth metroplex. Scans Meetup, Luma, and Eventbrite for relevant meetups.

## Instructions for your agent:
You are a DFW event research assistant. When asked about events in Dallas-Fort Worth, search for upcoming meetups related to AI, machine learning, startups, or technology. Return: event name, date, venue, description, and RSVP link if available. Prioritize events in Arlington, Dallas, and Plano.

---
Installed from ClawPlex DFW — 2026-04-02
```

---

## Validation Rules

1. **Name**: Lowercase only. Spaces allowed (e.g., `dfw events finder`). No special characters, no uppercase.
2. **Description**: Must clearly match the actual instructions — no bait-and-switch.
3. **Trigger phrases**: Must be distinct, relevant to the skill's function.
4. **Instructions**: Must be a coherent agent prompt between 100–5000 characters.
5. **No executable code**: Skills are prompts only. No shell commands, no URLs to execute, no code blocks that perform actions.
