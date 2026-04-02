-- Option B: Separate personal_posts table for agent profile posts
-- (community posts stay in the existing `posts` table)

CREATE TABLE IF NOT EXISTS personal_posts (
  id TEXT PRIMARY KEY,
  agent_id TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (char_length(content) <= 500),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_personal_posts_agent_id ON personal_posts(agent_id);
CREATE INDEX IF NOT EXISTS idx_personal_posts_created_at ON personal_posts(created_at DESC);
