-- ─── Schéma MoodCiné — table movies ──────────────────────────────────────────
-- Coller ce SQL dans : Supabase Dashboard → SQL Editor → Run

CREATE TABLE IF NOT EXISTS movies (
  id                   UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title                TEXT        NOT NULL,
  slug                 TEXT        NOT NULL UNIQUE,
  original_title       TEXT,
  poster_url           TEXT,
  short_description    TEXT        NOT NULL,
  description          TEXT        NOT NULL DEFAULT '',
  release_year         INTEGER     NOT NULL,
  duration             INTEGER     NOT NULL,  -- en minutes
  director             TEXT,
  genres               TEXT[]      NOT NULL DEFAULT '{}',
  platforms            TEXT[]      NOT NULL DEFAULT '{}',
  mood_tags            TEXT[]      NOT NULL DEFAULT '{}',
  emotion_goal_tags    TEXT[]      NOT NULL DEFAULT '{}',
  theme_tags           TEXT[]      NOT NULL DEFAULT '{}',
  vibe_tags            TEXT[]      NOT NULL DEFAULT '{}',
  context_tags         TEXT[]      NOT NULL DEFAULT '{}',
  intensity            TEXT        NOT NULL DEFAULT 'balanced',
  ending_type          TEXT        NOT NULL DEFAULT 'open',
  recommendation_reason TEXT       NOT NULL DEFAULT '',
  is_featured          BOOLEAN     NOT NULL DEFAULT FALSE,
  is_active            BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Row Level Security ───────────────────────────────────────────────────────
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut lire les films actifs (moteur de recommandation)
CREATE POLICY "Public read active movies"
  ON movies FOR SELECT
  USING (is_active = TRUE);

-- La clé service_role bypasse automatiquement le RLS
-- → les opérations admin (INSERT, UPDATE, DELETE) utilisent la service_role key

-- ─── Index pour les performances ─────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS movies_slug_idx ON movies (slug);
CREATE INDEX IF NOT EXISTS movies_is_active_idx ON movies (is_active);
CREATE INDEX IF NOT EXISTS movies_created_at_idx ON movies (created_at DESC);
