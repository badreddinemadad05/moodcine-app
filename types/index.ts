// ─── Types globaux de l'application MoodCiné ───────────────────────────────

export interface Step {
  id: number;
  emoji: string;
  title: string;
  description: string;
}

export interface Mood {
  label: string;
  emoji: string;
}

export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string[];
  moods: string[];
  description: string;
  posterUrl?: string;
  streamingPlatforms?: string[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface UserMoodProfile {
  currentMood: string;
  desiredFeeling: string;
  emotionalIntensity: "low" | "medium" | "high";
  preferredGenres?: string[];
  streamingPlatforms?: string[];
}
