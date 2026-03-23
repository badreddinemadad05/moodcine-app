// ─── Types du moteur de recommandation MoodCiné ──────────────────────────────

// Genres cinématographiques
export type MovieGenre =
  | "drama"
  | "comedy"
  | "romance"
  | "thriller"
  | "action"
  | "adventure"
  | "sci-fi"
  | "animation"
  | "documentary"
  | "fantasy"
  | "biography";

// Plateformes de streaming disponibles
export type Platform = "netflix" | "prime" | "disney" | "canal" | "mubi";

// ─── Tags du moteur de recommandation ────────────────────────────────────────

// Humeur actuelle de l'utilisateur (mappée depuis les réponses chatbot)
export type MoodTag =
  | "tired"      // fatigué·e
  | "happy"      // de bonne humeur
  | "sad"        // mélancolique
  | "stressed"   // stressé·e
  | "lost"       // indéfini·e
  | "energetic"  // plein·e d'énergie
  | "nostalgic"; // nostalgique (tag interne enrichi)

// Ce que l'utilisateur veut ressentir après le film
export type EmotionGoalTag =
  | "laugh"    // rire
  | "cry"      // pleurer
  | "shock"    // être choqué·e
  | "think"    // réfléchir
  | "drift"    // se laisser emporter
  | "inspire"  // être inspiré·e
  | "comfort"  // être réconforté·e (tag interne enrichi)
  | "excite";  // être excité·e (tag interne enrichi)

// Type de thème narratif du film
export type ThemeTag =
  | "romance"
  | "friendship"
  | "family"
  | "ambition"
  | "survival"
  | "identity"
  | "redemption"
  | "adventure"
  | "mystery"
  | "coming-of-age"
  | "society"
  | "art"
  | "second-chance";

// Ambiance générale du film
export type VibeTag =
  | "feel-good"
  | "dark"
  | "quirky"
  | "epic"
  | "intimate"
  | "poetic"
  | "raw"
  | "whimsical"
  | "tense"
  | "heartwarming";

// Contexte de visionnage
export type ContextTag = "solo" | "couple" | "friends" | "family";

// Intensité émotionnelle du film
export type IntensityLevel = "calm" | "balanced" | "intense";

// Type de dénouement
export type EndingType = "happy" | "bittersweet" | "sad" | "open" | "hopeful";

// ─── Modèle de données d'un film ─────────────────────────────────────────────

export interface Movie {
  id: string;
  title: string;            // titre français ou international
  slug: string;             // identifiant URL
  originalTitle?: string;   // titre original si différent
  posterUrl: string | null; // URL de l'affiche (null = fallback gradient)
  shortDescription: string; // résumé en 1-2 phrases (affiché dans la card)
  description: string;      // description complète (pour la page détail, future)
  releaseYear: number;
  duration: number;         // en minutes
  director?: string;
  genres: MovieGenre[];
  platforms: Platform[];
  // ── Tags du moteur de recommandation ──
  moodTags: MoodTag[];           // humeurs compatibles avec ce film
  emotionGoalTags: EmotionGoalTag[]; // émotions que le film procure
  themeTags: ThemeTag[];         // thèmes narratifs dominants
  vibeTags: VibeTag[];           // ambiance du film
  contextTags: ContextTag[];     // avec qui regarder ce film
  intensity: IntensityLevel;     // intensité émotionnelle globale
  endingType: EndingType;        // type de fin
  recommendationReason: string;  // phrase d'accroche affichée à l'utilisateur
  isFeatured: boolean;           // mis en avant dans les résultats
  isActive: boolean;             // actif dans le moteur
}

// ─── Critères de recherche (produit du mapping chatbot → moteur) ──────────────

export interface RecommendationCriteria {
  moodTags: MoodTag[];
  emotionGoalTags: EmotionGoalTag[];
  themeTags: ThemeTag[];
  vibeTags: VibeTag[];
  contextTags: ContextTag[];
  platforms: Platform[];         // vide = toutes plateformes acceptées
  intensityLevel: IntensityLevel | null;
}

// ─── Résultat scoré du moteur ─────────────────────────────────────────────────

export interface ScoredMovie {
  movie: Movie;
  score: number;
  matchedTags: string[]; // tags qui ont contribué au score (pour debug / affichage)
}
