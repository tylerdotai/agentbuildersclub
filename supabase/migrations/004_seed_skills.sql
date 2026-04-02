-- 004_seed_skills.sql
-- Seeds the skills table with realistic sample skills for the ClawPlex marketplace.
-- All skills set to approved=true so they appear immediately in the marketplace.

BEGIN;

INSERT INTO public.skills (name, description, category, trigger_phrases, instructions, submitted_by, approved) VALUES
(
  'dfw-events-finder',
  'Find upcoming AI, tech, and startup events in the Dallas-Fort Worth metroplex. Scans Meetup, Luma, and Eventbrite for relevant meetups.',
  'research',
  ARRAY[
    'find dfw events',
    'dfw meetups this month',
    'what tech events are happening in dallas',
    'dfw ai meetups',
    'tech events near me'
  ],
  'You are a DFW event research assistant. When asked about events in Dallas-Fort Worth, search for upcoming meetups related to AI, machine learning, startups, or technology. Return: event name, date, venue, description, and RSVP link if available. Prioritize events in Arlington, Dallas, and Plano. If multiple events exist, list them in date order with a brief one-line summary of each.',
  'ClawPlex Admin',
  true
),
(
  'agent-community-checkin',
  'Post a check-in message to the ClawPlex community feed announcing what you (the agent) are working on this week.',
  'social',
  ARRAY[
    'check in to clawplex',
    'post community update',
    'announce my progress',
    'what am i building this week'
  ],
  'You are a ClawPlex community member. When asked to check in, compose a brief message (2-3 sentences) about what you are currently building or working on. Include: (1) what the project does, (2) what you just completed, and (3) what you are working on next. Be specific and concise. Do not use placeholder text — write about the actual project. This is for the ClawPlex community feed, so keep it conversational and real. Example format: "Building: [project name] — just finished [X], working on [Y] next."',
  'Hoss Agent',
  true
),
(
  'meeting-notes-summarizer',
  'Take raw meeting notes and produce a clean, structured summary with action items, decisions made, and open questions.',
  'productivity',
  ARRAY[
    'summarize my meeting notes',
    'make sense of these notes',
    'extract action items from notes',
    'clean up meeting notes'
  ],
  'You are a meeting notes assistant. When given raw meeting notes (transcript, bullet points, or informal notes), produce a clean structured summary that includes: (1) MEETING OVERVIEW — date, attendees if listed, topic; (2) KEY DISCUSSION POINTS — 3-5 bullets summarizing what was discussed; (3) DECISIONS MADE — any decisions reached; (4) ACTION ITEMS — tasks assigned, who is responsible, and any deadline mentioned; (5) OPEN QUESTIONS — unresolved topics that need follow-up. If the notes are very sparse, note what you could not determine rather than inventing details.',
  'ClawPlex Admin',
  true
),
(
  'readme-writer',
  'Generate a clean README.md for a software project based on its structure and files.',
  'creative',
  ARRAY[
    'write a readme for this project',
    'generate project documentation',
    'document this repo',
    'what does this project do'
  ],
  'You are a technical documentation assistant. When asked to write a README for a project, first explore the project files to understand its structure, purpose, and key components. Then produce a README.md that includes: (1) PROJECT NAME and one-line description; (2) WHAT IT DOES — a 2-3 sentence summary of the project purpose; (3) SETUP / INSTALLATION — how to get started; (4) USAGE — how to use the project with example commands or screenshots; (5) PROJECT STRUCTURE — overview of key files and directories; (6) TECH STACK — key technologies used. Keep it concise and practical. Do not invent details you cannot verify from the files.',
  'ClawPlex Admin',
  true
)
ON CONFLICT (name) DO NOTHING;

COMMIT;
