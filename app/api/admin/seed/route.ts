import { NextResponse } from "next/server";
import { addMovie } from "@/services/movies";
import { MOVIES } from "@/data/movies";

// POST /api/admin/seed — insère les 20 films locaux dans Supabase
// À n'utiliser qu'une seule fois pour initialiser la base de données
export async function POST() {
  const results: { title: string; ok: boolean; error?: string }[] = [];

  for (const movie of MOVIES) {
    try {
      await addMovie({
        title:               movie.title,
        slug:                movie.slug,
        originalTitle:       movie.originalTitle,
        posterUrl:           movie.posterUrl,
        shortDescription:    movie.shortDescription,
        description:         movie.description,
        releaseYear:         movie.releaseYear,
        duration:            movie.duration,
        director:            movie.director,
        genres:              movie.genres,
        platforms:           movie.platforms,
        moodTags:            movie.moodTags,
        emotionGoalTags:     movie.emotionGoalTags,
        themeTags:           movie.themeTags,
        vibeTags:            movie.vibeTags,
        contextTags:         movie.contextTags,
        intensity:           movie.intensity,
        endingType:          movie.endingType,
        recommendationReason: movie.recommendationReason,
        isFeatured:          movie.isFeatured,
        isActive:            movie.isActive,
      });
      results.push({ title: movie.title, ok: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur";
      results.push({ title: movie.title, ok: false, error: message });
    }
  }

  const ok    = results.filter((r) => r.ok).length;
  const error = results.filter((r) => !r.ok).length;

  return NextResponse.json({ ok, error, results });
}
