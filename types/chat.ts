// ─── Types du système de chatbot MoodCiné ────────────────────────────────────

export interface ChatOption {
  id: string;
  label: string;
  emoji: string;
  value: string;
}

export interface ChatStep {
  id: string;
  question: string;
  options: ChatOption[];
}

export interface ChatMessageType {
  id: string;
  role: "bot" | "user";
  content: string;
  emoji?: string;
}

// Toutes les réponses de l'utilisateur, indexées par l'id de l'étape
export type ChatAnswers = Record<string, ChatOption>;

export interface ChatState {
  messages: ChatMessageType[];
  currentStepIndex: number;
  answers: ChatAnswers;
  isTyping: boolean;
  isComplete: boolean;
  showOptions: boolean;
}
