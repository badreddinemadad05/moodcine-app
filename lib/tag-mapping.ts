import type { ChatAnswers } from "@/types/chat";
import type {
  RecommendationCriteria,
  MoodTag,
  EmotionGoalTag,
  ThemeTag,
  VibeTag,
  ContextTag,
  Platform,
  IntensityLevel,
} from "@/types/movie";

// ─── Tables de correspondance : réponses chatbot → tags internes ──────────────
//
// La valeur des réponses chatbot (ChatOption.value) est mappée vers les tags
// du moteur de recommandation. Un seul answer peut générer plusieurs tags
// pour créer des correspondances plus riches.

const MOOD_MAP: Record<string, MoodTag[]> = {
  tired:     ["tired"],
  happy:     ["happy", "energetic"],
  sad:       ["sad", "nostalgic"],
  stressed:  ["stressed", "tired"],
  lost:      ["lost", "sad"],
  energetic: ["energetic", "happy"],
};

const EMOTION_GOAL_MAP: Record<string, EmotionGoalTag[]> = {
  laugh:   ["laugh"],
  cry:     ["cry"],
  shock:   ["shock", "excite"],
  think:   ["think"],
  drift:   ["drift", "comfort"],
  inspire: ["inspire"],
};

const STORY_THEME_MAP: Record<string, ThemeTag[]> = {
  romance:     ["romance"],
  thriller:    ["mystery", "survival"],
  action:      ["adventure", "survival"],
  comedy:      ["friendship"],
  drama:       ["identity", "redemption"],
  documentary: ["society"],
};

// Le type d'histoire influence aussi l'ambiance attendue
const STORY_VIBE_MAP: Record<string, VibeTag[]> = {
  romance:     ["intimate", "feel-good"],
  thriller:    ["tense", "dark"],
  action:      ["epic"],
  comedy:      ["feel-good", "whimsical"],
  drama:       ["raw", "intimate"],
  documentary: ["poetic"],
};

const INTENSITY_MAP: Record<string, IntensityLevel> = {
  calm:      "calm",
  balanced:  "balanced",
  intense:   "intense",
};

// L'intensité choisie enrichit aussi les vibes attendues
const INTENSITY_VIBE_MAP: Record<string, VibeTag[]> = {
  calm:     ["intimate", "poetic"],
  balanced: ["feel-good", "heartwarming"],
  intense:  ["epic", "tense", "raw"],
};

const CONTEXT_MAP: Record<string, ContextTag[]> = {
  solo:    ["solo"],
  couple:  ["couple"],
  friends: ["friends"],
  family:  ["family"],
};

const PLATFORM_MAP: Record<string, Platform[]> = {
  netflix: ["netflix"],
  prime:   ["prime"],
  disney:  ["disney"],
  any:     [], // tableau vide = aucune restriction de plateforme
};

// ─── Fonction principale de mapping ──────────────────────────────────────────

export function mapAnswersToCriteria(answers: ChatAnswers): RecommendationCriteria {
  const criteria: RecommendationCriteria = {
    moodTags:       [],
    emotionGoalTags: [],
    themeTags:      [],
    vibeTags:       [],
    contextTags:    [],
    platforms:      [],
    intensityLevel: null,
  };

  // current_mood → moodTags
  const moodAnswer = answers["current_mood"];
  if (moodAnswer) {
    criteria.moodTags = MOOD_MAP[moodAnswer.value] ?? [];
  }

  // desired_feeling → emotionGoalTags
  const feelingAnswer = answers["desired_feeling"];
  if (feelingAnswer) {
    criteria.emotionGoalTags = EMOTION_GOAL_MAP[feelingAnswer.value] ?? [];
  }

  // story_type → themeTags + vibeTags (premier lot)
  const storyAnswer = answers["story_type"];
  if (storyAnswer) {
    criteria.themeTags = STORY_THEME_MAP[storyAnswer.value] ?? [];
    criteria.vibeTags  = STORY_VIBE_MAP[storyAnswer.value] ?? [];
  }

  // intensity → intensityLevel + vibeTags (deuxième lot, fusionné)
  const intensityAnswer = answers["intensity"];
  if (intensityAnswer) {
    criteria.intensityLevel = INTENSITY_MAP[intensityAnswer.value] ?? null;
    const intensityVibes = INTENSITY_VIBE_MAP[intensityAnswer.value] ?? [];
    // Fusion et déduplication des vibeTags
    criteria.vibeTags = [...new Set([...criteria.vibeTags, ...intensityVibes])];
  }

  // context → contextTags
  const contextAnswer = answers["context"];
  if (contextAnswer) {
    criteria.contextTags = CONTEXT_MAP[contextAnswer.value] ?? [];
  }

  // platform → platforms
  const platformAnswer = answers["platform"];
  if (platformAnswer) {
    criteria.platforms = PLATFORM_MAP[platformAnswer.value] ?? [];
  }

  return criteria;
}

// ─── Utilitaire : génère un résumé lisible du mood utilisateur ───────────────

export function buildMoodSummary(answers: ChatAnswers): string {
  const mood     = answers["current_mood"];
  const feeling  = answers["desired_feeling"];
  const context  = answers["context"];

  const parts: string[] = [];

  if (mood) parts.push(mood.emoji + " " + mood.label.toLowerCase());
  if (feeling) parts.push("envie de " + feeling.label.toLowerCase());
  if (context) parts.push(context.label.toLowerCase());

  return parts.join(" · ");
}

// ─── Sous-titre personnalisé selon le profil ─────────────────────────────────

export function buildPersonalizedSubtitle(answers: ChatAnswers): string {
  const mood    = answers["current_mood"];
  const feeling = answers["desired_feeling"];
  const context = answers["context"];
  const story   = answers["story_type"];

  // Phrases selon le mood
  const moodPhrases: Record<string, string> = {
    tired:     "Une soirée cinéma, c'est exactement ce qu'il te faut.",
    happy:     "On surfe sur ta bonne humeur avec du grand écran.",
    sad:       "Le bon film peut tout changer. On a sélectionné le tien.",
    stressed:  "Décompresse avec une sélection faite pour toi.",
    lost:      "Laisse-toi porter. Ces films te rappelleront où tu veux aller.",
    energetic: "Ton énergie mérite un film à la hauteur.",
  };

  // Phrases selon l'objectif émotionnel
  const feelingPhrases: Record<string, string> = {
    laugh:   "Des films pour rire de bon cœur.",
    cry:     "Des films qui touchent là où ça compte.",
    shock:   "Prépare-toi à être surpris.",
    think:   "Des films qui font réfléchir longtemps après le générique.",
    drift:   "Des films pour s'évader le temps d'une soirée.",
    inspire: "Des films qui donnent envie de changer le monde.",
  };

  // Phrases contextuelles
  const contextPhrases: Record<string, string> = {
    solo:    "Une soirée solo méritait une sélection sans compromis.",
    couple:  "Pour une soirée à deux qui restera en mémoire.",
    friends: "À regarder ensemble pour en parler toute la nuit.",
    family:  "Des films pour toute la famille, sans exception.",
  };

  // Compose la phrase finale avec les éléments disponibles
  const moodLine    = mood    ? moodPhrases[mood.value]        : null;
  const feelingLine = feeling ? feelingPhrases[feeling.value]  : null;
  const contextLine = context ? contextPhrases[context.value]  : null;

  // Priorité : mood + context, ou mood + feeling, ou juste mood, etc.
  if (moodLine && contextLine) {
    return `${moodLine} ${contextLine}`;
  }
  if (moodLine && feelingLine) {
    return `${moodLine} ${feelingLine}`;
  }
  if (moodLine) return moodLine;
  if (feelingLine && contextLine) return `${feelingLine} ${contextLine}`;
  if (feelingLine) return feelingLine;

  // Fallback générique
  const storyLabel = story?.label?.toLowerCase() ?? "cinéma";
  return `Une sélection de ${storyLabel} choisie rien que pour toi.`;
}
