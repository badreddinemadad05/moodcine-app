/**
 * ─── Mappeurs Supabase snake_case ↔ camelCase ─────────────────────────────────
 *
 * Fichier interne (préfixe _) — utilisé uniquement par movies.service.ts.
 * Isole toute la logique de transformation des données Supabase.
 * Quand le schéma Supabase change → un seul endroit à modifier.
 */

import type {
  Movie,
  MovieGenre,
  Platform,
  MoodTag,
  EmotionGoalTag,
  ThemeTag,
  VibeTag,
  ContextTag,
  IntensityLevel,
  EndingType,
} from "@/types/movie";
import type { MovieInsert } from "./movies.service";

// ─── Type de ligne Supabase (snake_case) ─────────────────────────────────────

export interface MovieRow {
  id: string;
  title: string;
  slug: string;
  original_title: string | null;
  poster_url: string | null;
  short_description: string;
  description: string;
  release_year: number;
  duration: number;
  director: string | null;
  genres: string[];
  platforms: string[];
  mood_tags: string[];
  emotion_goal_tags: string[];
  theme_tags: string[];
  vibe_tags: string[];
  context_tags: string[];
  intensity: string;
  ending_type: string;
  recommendation_reason: string;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
}

// ─── snake_case → camelCase ───────────────────────────────────────────────────

export function rowToMovie(row: MovieRow): Movie {
  return {
    id:                   row.id,
    title:                row.title,
    slug:                 row.slug,
    originalTitle:        row.original_title ?? undefined,
    posterUrl:            row.poster_url,
    shortDescription:     row.short_description,
    description:          row.description,
    releaseYear:          row.release_year,
    duration:             row.duration,
    director:             row.director ?? undefined,
    genres:               row.genres as MovieGenre[],
    platforms:            row.platforms as Platform[],
    moodTags:             row.mood_tags as MoodTag[],
    emotionGoalTags:      row.emotion_goal_tags as EmotionGoalTag[],
    themeTags:            row.theme_tags as ThemeTag[],
    vibeTags:             row.vibe_tags as VibeTag[],
    contextTags:          row.context_tags as ContextTag[],
    intensity:            row.intensity as IntensityLevel,
    endingType:           row.ending_type as EndingType,
    recommendationReason: row.recommendation_reason,
    isFeatured:           row.is_featured,
    isActive:             row.is_active,
  };
}

// ─── camelCase → snake_case ───────────────────────────────────────────────────

export function movieToRow(data: MovieInsert): Omit<MovieRow, "id" | "created_at"> {
  return {
    title:                 data.title,
    slug:                  data.slug,
    original_title:        data.originalTitle ?? null,
    poster_url:            data.posterUrl ?? null,
    short_description:     data.shortDescription,
    description:           data.description,
    release_year:          data.releaseYear,
    duration:              data.duration,
    director:              data.director ?? null,
    genres:                data.genres,
    platforms:             data.platforms,
    mood_tags:             data.moodTags,
    emotion_goal_tags:     data.emotionGoalTags,
    theme_tags:            data.themeTags,
    vibe_tags:             data.vibeTags,
    context_tags:          data.contextTags,
    intensity:             data.intensity,
    ending_type:           data.endingType,
    recommendation_reason: data.recommendationReason,
    is_featured:           data.isFeatured ?? false,
    is_active:             data.isActive ?? true,
  };
}
