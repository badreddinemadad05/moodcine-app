/**
 * ─── Service Films — movies.service.ts ───────────────────────────────────────
 *
 * Couche de service unique pour toutes les opérations sur les films.
 * Fonctionne en deux modes transparents :
 *
 *   MODE LOCAL   → utilise le store en mémoire (store/movies.store.ts)
 *                  aucune config requise, délais simulés réalistes
 *
 *   MODE SUPABASE → utilise la base de données réelle
 *                   activé dès que les variables d'env sont renseignées
 *
 * Les composants et API routes n'ont jamais besoin de savoir quel mode est actif.
 * Pour passer à Supabase → remplir .env.local, c'est tout.
 *
 * ─── Architecture ────────────────────────────────────────────────────────────
 *
 *  UI / components
 *       │
 *  app/api/routes          ← endpoints HTTP (Next.js route handlers)
 *       │
 *  services/movies.service ← ici (logique métier + switch local/supabase)
 *       │
 *  ┌────┴────┐
 *  │         │
 * store/    lib/supabase-admin
 * (local)   (production)
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

// ─── Type d'insertion de film (défini ici, re-exporté par movies.ts) ─────────
export interface MovieInsert {
  title: string;
  slug: string;
  originalTitle?: string;
  posterUrl?: string | null;
  shortDescription: string;
  description: string;
  releaseYear: number;
  duration: number;
  director?: string;
  genres: MovieGenre[];
  platforms: Platform[];
  moodTags: MoodTag[];
  emotionGoalTags: EmotionGoalTag[];
  themeTags: ThemeTag[];
  vibeTags: VibeTag[];
  contextTags: ContextTag[];
  intensity: IntensityLevel;
  endingType: EndingType;
  recommendationReason: string;
  isFeatured?: boolean;
  isActive?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
//  Utilitaires internes
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Simule un délai réseau réaliste en mode local.
 * En mode Supabase ce délai n'existe pas (latence réelle du réseau).
 */
function fakeDelay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Vérifie si Supabase est configuré dans les variables d'environnement */
function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("https://") &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  CRUD — fonctions publiques
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Récupère tous les films.
 *
 * @param includeInactive - inclure les films avec isActive=false (admin uniquement)
 */
export async function getMovies(includeInactive = false): Promise<Movie[]> {
  // ── Mode Supabase ──────────────────────────────────────────────────────────
  if (isSupabaseConfigured()) {
    const { createAdminClient } = await import("@/lib/supabase-admin");
    const db = createAdminClient();

    let query = db
      .from("movies")
      .select("*")
      .order("created_at", { ascending: false });

    if (!includeInactive) query = query.eq("is_active", true);

    const { data, error } = await query;
    if (error) throw new Error(`getMovies: ${error.message}`);

    const { rowToMovie } = await import("./_supabase-mapper");
    return (data as Parameters<typeof rowToMovie>[0][]).map(rowToMovie);
  }

  // ── Mode local ────────────────────────────────────────────────────────────
  await fakeDelay(180);
  const { moviesStore } = await import("@/store/movies.store");
  const all = moviesStore.getAll();
  return includeInactive ? all : all.filter((m) => m.isActive);
}

/**
 * Récupère un film par son id.
 * Retourne null si introuvable.
 */
export async function getMovieById(id: string): Promise<Movie | null> {
  // ── Mode Supabase ──────────────────────────────────────────────────────────
  if (isSupabaseConfigured()) {
    const { createAdminClient } = await import("@/lib/supabase-admin");
    const db = createAdminClient();

    const { data, error } = await db
      .from("movies")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    const { rowToMovie } = await import("./_supabase-mapper");
    return rowToMovie(data as Parameters<typeof rowToMovie>[0]);
  }

  // ── Mode local ────────────────────────────────────────────────────────────
  await fakeDelay(120);
  const { moviesStore } = await import("@/store/movies.store");
  return moviesStore.getById(id);
}

/**
 * Récupère un film par son slug.
 * Retourne null si introuvable.
 */
export async function getMovieBySlug(slug: string): Promise<Movie | null> {
  // ── Mode Supabase ──────────────────────────────────────────────────────────
  if (isSupabaseConfigured()) {
    const { createAdminClient } = await import("@/lib/supabase-admin");
    const db = createAdminClient();

    const { data, error } = await db
      .from("movies")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) return null;
    const { rowToMovie } = await import("./_supabase-mapper");
    return rowToMovie(data as Parameters<typeof rowToMovie>[0]);
  }

  // ── Mode local ────────────────────────────────────────────────────────────
  await fakeDelay(120);
  const { moviesStore } = await import("@/store/movies.store");
  return moviesStore.getBySlug(slug);
}

/**
 * Ajoute un nouveau film.
 * En mode local → persiste en mémoire jusqu'au redémarrage du serveur.
 * En mode Supabase → persiste en base de données.
 */
export async function addMovie(data: MovieInsert): Promise<Movie> {
  // ── Mode Supabase ──────────────────────────────────────────────────────────
  if (isSupabaseConfigured()) {
    const { createAdminClient } = await import("@/lib/supabase-admin");
    const db = createAdminClient();
    const { movieToRow, rowToMovie } = await import("./_supabase-mapper");

    const { data: inserted, error } = await db
      .from("movies")
      .insert(movieToRow(data))
      .select()
      .single();

    if (error) throw new Error(`addMovie: ${error.message}`);
    return rowToMovie(inserted as Parameters<typeof rowToMovie>[0]);
  }

  // ── Mode local ────────────────────────────────────────────────────────────
  await fakeDelay(350);
  const { moviesStore } = await import("@/store/movies.store");

  return moviesStore.add({
    title:               data.title,
    slug:                data.slug,
    originalTitle:       data.originalTitle,
    posterUrl:           data.posterUrl ?? null,
    shortDescription:    data.shortDescription,
    description:         data.description,
    releaseYear:         data.releaseYear,
    duration:            data.duration,
    director:            data.director,
    genres:              data.genres,
    platforms:           data.platforms,
    moodTags:            data.moodTags,
    emotionGoalTags:     data.emotionGoalTags,
    themeTags:           data.themeTags,
    vibeTags:            data.vibeTags,
    contextTags:         data.contextTags,
    intensity:           data.intensity,
    endingType:          data.endingType,
    recommendationReason: data.recommendationReason,
    isFeatured:          data.isFeatured ?? false,
    isActive:            data.isActive ?? true,
  });
}

/**
 * Supprime un film par son id.
 */
export async function deleteMovie(id: string): Promise<void> {
  // ── Mode Supabase ──────────────────────────────────────────────────────────
  if (isSupabaseConfigured()) {
    const { createAdminClient } = await import("@/lib/supabase-admin");
    const db = createAdminClient();
    const { error } = await db.from("movies").delete().eq("id", id);
    if (error) throw new Error(`deleteMovie: ${error.message}`);
    return;
  }

  // ── Mode local ────────────────────────────────────────────────────────────
  await fakeDelay(220);
  const { moviesStore } = await import("@/store/movies.store");
  const deleted = moviesStore.remove(id);
  if (!deleted) throw new Error(`deleteMovie: film "${id}" introuvable`);
}

/**
 * Met à jour partiellement un film.
 * Seuls les champs fournis sont modifiés.
 */
export async function updateMovie(
  id: string,
  data: Partial<MovieInsert>
): Promise<Movie> {
  // ── Mode Supabase ──────────────────────────────────────────────────────────
  if (isSupabaseConfigured()) {
    const { createAdminClient } = await import("@/lib/supabase-admin");
    const db = createAdminClient();
    const { rowToMovie } = await import("./_supabase-mapper");

    // Construit le patch en snake_case (seuls les champs définis)
    const patch: Record<string, unknown> = {};
    if (data.title             !== undefined) patch.title                = data.title;
    if (data.slug              !== undefined) patch.slug                 = data.slug;
    if (data.originalTitle     !== undefined) patch.original_title       = data.originalTitle;
    if (data.posterUrl         !== undefined) patch.poster_url           = data.posterUrl;
    if (data.shortDescription  !== undefined) patch.short_description    = data.shortDescription;
    if (data.description       !== undefined) patch.description          = data.description;
    if (data.releaseYear       !== undefined) patch.release_year         = data.releaseYear;
    if (data.duration          !== undefined) patch.duration             = data.duration;
    if (data.director          !== undefined) patch.director             = data.director;
    if (data.genres            !== undefined) patch.genres               = data.genres;
    if (data.platforms         !== undefined) patch.platforms            = data.platforms;
    if (data.moodTags          !== undefined) patch.mood_tags            = data.moodTags;
    if (data.emotionGoalTags   !== undefined) patch.emotion_goal_tags    = data.emotionGoalTags;
    if (data.themeTags         !== undefined) patch.theme_tags           = data.themeTags;
    if (data.vibeTags          !== undefined) patch.vibe_tags            = data.vibeTags;
    if (data.contextTags       !== undefined) patch.context_tags         = data.contextTags;
    if (data.intensity         !== undefined) patch.intensity            = data.intensity;
    if (data.endingType        !== undefined) patch.ending_type          = data.endingType;
    if (data.recommendationReason !== undefined) patch.recommendation_reason = data.recommendationReason;
    if (data.isFeatured        !== undefined) patch.is_featured          = data.isFeatured;
    if (data.isActive          !== undefined) patch.is_active            = data.isActive;

    const { data: updated, error } = await db
      .from("movies")
      .update(patch)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`updateMovie: ${error.message}`);
    return rowToMovie(updated as Parameters<typeof rowToMovie>[0]);
  }

  // ── Mode local ────────────────────────────────────────────────────────────
  await fakeDelay(280);
  const { moviesStore } = await import("@/store/movies.store");

  const updated = moviesStore.update(id, {
    ...(data.title             !== undefined && { title: data.title }),
    ...(data.slug              !== undefined && { slug: data.slug }),
    ...(data.originalTitle     !== undefined && { originalTitle: data.originalTitle }),
    ...(data.posterUrl         !== undefined && { posterUrl: data.posterUrl }),
    ...(data.shortDescription  !== undefined && { shortDescription: data.shortDescription }),
    ...(data.description       !== undefined && { description: data.description }),
    ...(data.releaseYear       !== undefined && { releaseYear: data.releaseYear }),
    ...(data.duration          !== undefined && { duration: data.duration }),
    ...(data.director          !== undefined && { director: data.director }),
    ...(data.genres            !== undefined && { genres: data.genres }),
    ...(data.platforms         !== undefined && { platforms: data.platforms }),
    ...(data.moodTags          !== undefined && { moodTags: data.moodTags }),
    ...(data.emotionGoalTags   !== undefined && { emotionGoalTags: data.emotionGoalTags }),
    ...(data.themeTags         !== undefined && { themeTags: data.themeTags }),
    ...(data.vibeTags          !== undefined && { vibeTags: data.vibeTags }),
    ...(data.contextTags       !== undefined && { contextTags: data.contextTags }),
    ...(data.intensity         !== undefined && { intensity: data.intensity }),
    ...(data.endingType        !== undefined && { endingType: data.endingType }),
    ...(data.recommendationReason !== undefined && { recommendationReason: data.recommendationReason }),
    ...(data.isFeatured        !== undefined && { isFeatured: data.isFeatured }),
    ...(data.isActive          !== undefined && { isActive: data.isActive }),
  });

  if (!updated) throw new Error(`updateMovie: film "${id}" introuvable`);
  return updated;
}
