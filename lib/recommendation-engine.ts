import type { Movie, RecommendationCriteria, ScoredMovie, IntensityLevel } from "@/types/movie";

// ─── Poids de scoring par catégorie ──────────────────────────────────────────
//
// Ces poids reflètent l'importance relative de chaque dimension.
// emotionGoal est le signal le plus fort : c'est ce que l'utilisateur veut
// explicitement ressentir. L'intensité a un bonus pour correspondance exacte.

const WEIGHTS = {
  emotionGoal:       4, // ce que l'utilisateur veut ressentir (priorité maximale)
  mood:              3, // humeur actuelle : résonance émotionnelle
  theme:             3, // type d'histoire recherché
  intensityExact:    3, // correspondance exacte d'intensité
  intensityAdjacent: 1, // intensité voisine (calm↔balanced, balanced↔intense)
  context:           2, // situation de visionnage
  vibe:              2, // ambiance générale
  platform:          1, // disponibilité sur la plateforme choisie
  featured:          1, // légère préférence pour les films mis en avant
} as const;

// Score maximum théorique (pour calibration)
// emotionGoal(8) + mood(6) + theme(9) + intensity(3) + context(2) + vibe(12) + platform(1) + featured(1) = ~42

// ─── Scoring d'un film ────────────────────────────────────────────────────────

function scoreMovie(movie: Movie, criteria: RecommendationCriteria): ScoredMovie {
  let score = 0;
  const matchedTags: string[] = [];

  // ── EmotionGoal : +4 par match ─────────────────────────────────────────────
  for (const tag of criteria.emotionGoalTags) {
    if (movie.emotionGoalTags.includes(tag)) {
      score += WEIGHTS.emotionGoal;
      matchedTags.push(`feel:${tag}`);
    }
  }

  // ── Mood : +3 par match ───────────────────────────────────────────────────
  for (const tag of criteria.moodTags) {
    if (movie.moodTags.includes(tag)) {
      score += WEIGHTS.mood;
      matchedTags.push(`mood:${tag}`);
    }
  }

  // ── Thème : +3 par match ──────────────────────────────────────────────────
  for (const tag of criteria.themeTags) {
    if (movie.themeTags.includes(tag)) {
      score += WEIGHTS.theme;
      matchedTags.push(`theme:${tag}`);
    }
  }

  // ── Intensité : +3 exact, +1 adjacent ────────────────────────────────────
  if (criteria.intensityLevel !== null) {
    if (movie.intensity === criteria.intensityLevel) {
      score += WEIGHTS.intensityExact;
    } else {
      const levels: IntensityLevel[] = ["calm", "balanced", "intense"];
      const diff =
        Math.abs(
          levels.indexOf(criteria.intensityLevel) -
          levels.indexOf(movie.intensity)
        );
      if (diff === 1) score += WEIGHTS.intensityAdjacent;
    }
  }

  // ── Contexte : +2 par match ──────────────────────────────────────────────
  for (const tag of criteria.contextTags) {
    if (movie.contextTags.includes(tag)) {
      score += WEIGHTS.context;
      matchedTags.push(`context:${tag}`);
    }
  }

  // ── Vibe : +2 par match ──────────────────────────────────────────────────
  for (const tag of criteria.vibeTags) {
    if (movie.vibeTags.includes(tag)) {
      score += WEIGHTS.vibe;
      matchedTags.push(`vibe:${tag}`);
    }
  }

  // ── Plateforme : +1 si correspondance (ignoré si "any" = tableau vide) ───
  if (criteria.platforms.length > 0) {
    const hasMatch = criteria.platforms.some((p) => movie.platforms.includes(p));
    if (hasMatch) score += WEIGHTS.platform;
  }

  // ── Bonus film mis en avant ──────────────────────────────────────────────
  if (movie.isFeatured) score += WEIGHTS.featured;

  return { movie, score, matchedTags };
}

// ─── Moteur de recommandation ─────────────────────────────────────────────────

export function getRecommendations(
  criteria: RecommendationCriteria,
  movies: Movie[],
  limit = 5
): ScoredMovie[] {
  return movies
    .filter((m) => m.isActive)
    .map((movie) => scoreMovie(movie, criteria))
    .sort((a, b) => {
      // Tri principal : score décroissant
      if (b.score !== a.score) return b.score - a.score;
      // Départage : films en vedette en premier
      if (b.movie.isFeatured !== a.movie.isFeatured)
        return b.movie.isFeatured ? 1 : -1;
      // Départage final : plus récent en premier
      return b.movie.releaseYear - a.movie.releaseYear;
    })
    .slice(0, limit);
}

// ─── Utilitaire : libellé lisible d'un tag ────────────────────────────────────

const TAG_LABELS: Record<string, string> = {
  // EmotionGoal
  "feel:laugh":   "Fait rire",
  "feel:cry":     "Fait pleurer",
  "feel:shock":   "Choquant",
  "feel:think":   "Fait réfléchir",
  "feel:drift":   "Enveloppant",
  "feel:inspire": "Inspirant",
  "feel:comfort": "Réconfortant",
  "feel:excite":  "Excitant",
  // Mood
  "mood:tired":     "Pour les fatigué·es",
  "mood:sad":       "Pour les mélancoliques",
  "mood:lost":      "Pour les perdu·es",
  "mood:happy":     "Feel-good",
  "mood:energetic": "Pour les énergiques",
  "mood:stressed":  "Pour les stressé·es",
  "mood:nostalgic": "Nostalgique",
  // Theme
  "theme:romance":       "Romance",
  "theme:friendship":    "Amitié",
  "theme:family":        "Famille",
  "theme:ambition":      "Ambition",
  "theme:identity":      "Quête d'identité",
  "theme:redemption":    "Rédemption",
  "theme:adventure":     "Aventure",
  "theme:society":       "Société",
  "theme:art":           "Art & passion",
  "theme:second-chance": "Seconde chance",
  // Context
  "context:solo":    "Parfait en solo",
  "context:couple":  "Idéal en couple",
  "context:friends": "Entre amis",
  "context:family":  "En famille",
  // Vibe
  "vibe:feel-good":    "Feel-good",
  "vibe:heartwarming": "Chaleureux",
  "vibe:poetic":       "Poétique",
  "vibe:whimsical":    "Poétique & décalé",
  "vibe:intimate":     "Intimiste",
  "vibe:epic":         "Épique",
  "vibe:raw":          "Brut & authentique",
  "vibe:tense":        "Tendu",
  "vibe:dark":         "Sombre",
  "vibe:quirky":       "Décalé",
};

export function getTagLabel(tag: string): string {
  return TAG_LABELS[tag] ?? tag;
}
