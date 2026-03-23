import type { ChatStep } from "@/types/chat";

// Message d'accueil — affiché avant la première question
export const CHAT_INTRO =
  "Hey ! 👋 Bienvenue sur MoodCiné. Je suis là pour t'aider à trouver le film parfait pour ce soir. Quelques questions rapides, et je m'occupe du reste.";

// Message de clôture — affiché après la dernière réponse
export const CHAT_OUTRO =
  "Parfait, j'ai tout capté 🎬 Je prépare ta sélection personnalisée…";

// ─── Le flow conversationnel ──────────────────────────────────────────────────
export const CHAT_FLOW: ChatStep[] = [
  {
    id: "current_mood",
    question: "Ok, dis-moi un peu… c'est quoi ton vrai mood là, maintenant ?",
    options: [
      {
        id: "tired",
        label: "Fatigué·e, j'ai besoin de calme",
        emoji: "😴",
        value: "tired",
      },
      {
        id: "happy",
        label: "Plutôt de bonne humeur !",
        emoji: "😊",
        value: "happy",
      },
      {
        id: "sad",
        label: "Un peu mélancolique",
        emoji: "😢",
        value: "sad",
      },
      {
        id: "stressed",
        label: "Stressé·e ou agité·e",
        emoji: "😤",
        value: "stressed",
      },
      {
        id: "lost",
        label: "Indéfini·e… c'est flou",
        emoji: "🌀",
        value: "lost",
      },
      {
        id: "energetic",
        label: "Plein·e d'énergie",
        emoji: "⚡",
        value: "energetic",
      },
    ],
  },
  {
    id: "desired_feeling",
    question: "Ce soir, ton cœur veut quoi comme sensation ?",
    options: [
      {
        id: "laugh",
        label: "Rire aux éclats",
        emoji: "😂",
        value: "laugh",
      },
      {
        id: "cry",
        label: "Pleurer (le bon genre, tu vois)",
        emoji: "🥺",
        value: "cry",
      },
      {
        id: "shock",
        label: "Prendre une vraie claque émotionnelle",
        emoji: "🤯",
        value: "shock",
      },
      {
        id: "think",
        label: "Réfléchir et me questionner",
        emoji: "💭",
        value: "think",
      },
      {
        id: "drift",
        label: "Me laisser emporter sans trop penser",
        emoji: "🌙",
        value: "drift",
      },
      {
        id: "inspire",
        label: "Me sentir inspiré·e",
        emoji: "✨",
        value: "inspire",
      },
    ],
  },
  {
    id: "story_type",
    question: "T'es plutôt pour quoi comme genre d'histoire ?",
    options: [
      {
        id: "romance",
        label: "Romance ou feel-good",
        emoji: "💞",
        value: "romance",
      },
      {
        id: "thriller",
        label: "Thriller, suspense ou mystère",
        emoji: "🕵️",
        value: "thriller",
      },
      {
        id: "action",
        label: "Action ou aventure",
        emoji: "🚀",
        value: "action",
      },
      {
        id: "comedy",
        label: "Comédie ou légèreté pure",
        emoji: "😄",
        value: "comedy",
      },
      {
        id: "drama",
        label: "Drame ou film psychologique",
        emoji: "🧠",
        value: "drama",
      },
      {
        id: "documentary",
        label: "Documentaire ou film de réflexion",
        emoji: "🌍",
        value: "documentary",
      },
    ],
  },
  {
    id: "intensity",
    question: "Et niveau intensité, là, t'es plutôt…",
    options: [
      {
        id: "calm",
        label: "Calme et contemplatif — je veux me poser",
        emoji: "🌊",
        value: "calm",
      },
      {
        id: "balanced",
        label: "Équilibré — un peu d'émotions, un peu de plaisir",
        emoji: "🎢",
        value: "balanced",
      },
      {
        id: "intense",
        label: "Intense — je veux être complètement embarqué·e",
        emoji: "⚡",
        value: "intense",
      },
    ],
  },
  {
    id: "context",
    question: "C'est prévu comment ce soir ?",
    options: [
      {
        id: "solo",
        label: "Solo dans mon canapé",
        emoji: "🛋️",
        value: "solo",
      },
      {
        id: "couple",
        label: "En couple ou avec quelqu'un de spécial",
        emoji: "💑",
        value: "couple",
      },
      {
        id: "friends",
        label: "Entre amis ou en groupe",
        emoji: "👫",
        value: "friends",
      },
      {
        id: "family",
        label: "En famille",
        emoji: "👨‍👩‍👧",
        value: "family",
      },
    ],
  },
  {
    id: "platform",
    question: "Dernière chose — t'as accès à quoi comme plateforme ?",
    options: [
      {
        id: "netflix",
        label: "Netflix",
        emoji: "🎬",
        value: "netflix",
      },
      {
        id: "prime",
        label: "Prime Video",
        emoji: "📦",
        value: "prime",
      },
      {
        id: "disney",
        label: "Disney+",
        emoji: "🏰",
        value: "disney",
      },
      {
        id: "any",
        label: "Peu importe, montre-moi le meilleur !",
        emoji: "🎥",
        value: "any",
      },
    ],
  },
];
