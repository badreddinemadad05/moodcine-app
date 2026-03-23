import type { Step, Mood } from "@/types";

export const APP_NAME = "MoodCiné";

export const APP_TAGLINE = "Le film parfait pour ton mood du moment.";

export const APP_DESCRIPTION =
  "MoodCiné recommande des films selon ton humeur, tes envies et tes émotions du moment. Pas d'algorithme froid — une vraie conversation.";

export const HOW_IT_WORKS_STEPS: Step[] = [
  {
    id: 1,
    emoji: "💬",
    title: "Tu parles, on écoute",
    description:
      "Notre chatbot t'accueille avec une question simple : comment tu te sens en ce moment ? Tu réponds librement, sans formulaire.",
  },
  {
    id: 2,
    emoji: "🎭",
    title: "On analyse ton mood",
    description:
      "En quelques échanges, on comprend ton humeur, ce que tu veux ressentir ce soir, et le genre d'histoire qui te correspond.",
  },
  {
    id: 3,
    emoji: "🎬",
    title: "Tu reçois ta sélection",
    description:
      "On te propose une sélection de films personnalisée, avec une explication humaine pour chaque recommandation.",
  },
];

export const MOOD_EXAMPLES: Mood[] = [
  { label: "Mélancolique", emoji: "🌧️" },
  { label: "Euphorique", emoji: "⚡" },
  { label: "Cosy & tranquille", emoji: "☕" },
  { label: "Besoin de pleurer", emoji: "😢" },
  { label: "Envie de rire", emoji: "😂" },
  { label: "Introspectif", emoji: "🌙" },
  { label: "Adrénaline", emoji: "🔥" },
];
