"use client";

import { useState } from "react";
import Image from "next/image";
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
import type { MovieInsert } from "@/services/movies";

// ─── Options ─────────────────────────────────────────────────────────────────

const GENRE_OPTIONS: { value: MovieGenre; label: string }[] = [
  { value: "drama",       label: "Drame" },
  { value: "comedy",      label: "Comédie" },
  { value: "romance",     label: "Romance" },
  { value: "thriller",    label: "Thriller" },
  { value: "action",      label: "Action" },
  { value: "adventure",   label: "Aventure" },
  { value: "sci-fi",      label: "Sci-Fi" },
  { value: "animation",   label: "Animation" },
  { value: "documentary", label: "Documentaire" },
  { value: "fantasy",     label: "Fantaisie" },
  { value: "biography",   label: "Biographie" },
];

const PLATFORM_OPTIONS: { value: Platform; label: string }[] = [
  { value: "netflix", label: "Netflix" },
  { value: "prime",   label: "Prime Video" },
  { value: "disney",  label: "Disney+" },
  { value: "canal",   label: "Canal+" },
  { value: "mubi",    label: "MUBI" },
];

const MOOD_OPTIONS: { value: MoodTag; label: string }[] = [
  { value: "tired",     label: "Fatigué·e" },
  { value: "happy",     label: "De bonne humeur" },
  { value: "sad",       label: "Mélancolique" },
  { value: "stressed",  label: "Stressé·e" },
  { value: "lost",      label: "Perdu·e" },
  { value: "energetic", label: "Énergique" },
  { value: "nostalgic", label: "Nostalgique" },
];

const EMOTION_OPTIONS: { value: EmotionGoalTag; label: string }[] = [
  { value: "laugh",   label: "Rire" },
  { value: "cry",     label: "Pleurer" },
  { value: "shock",   label: "Être choqué·e" },
  { value: "think",   label: "Réfléchir" },
  { value: "drift",   label: "S'évader" },
  { value: "inspire", label: "Être inspiré·e" },
  { value: "comfort", label: "Être réconforté·e" },
  { value: "excite",  label: "Être excité·e" },
];

const THEME_OPTIONS: { value: ThemeTag; label: string }[] = [
  { value: "romance",       label: "Romance" },
  { value: "friendship",    label: "Amitié" },
  { value: "family",        label: "Famille" },
  { value: "ambition",      label: "Ambition" },
  { value: "survival",      label: "Survie" },
  { value: "identity",      label: "Identité" },
  { value: "redemption",    label: "Rédemption" },
  { value: "adventure",     label: "Aventure" },
  { value: "mystery",       label: "Mystère" },
  { value: "coming-of-age", label: "Coming of age" },
  { value: "society",       label: "Société" },
  { value: "art",           label: "Art & passion" },
  { value: "second-chance", label: "Seconde chance" },
];

const VIBE_OPTIONS: { value: VibeTag; label: string }[] = [
  { value: "feel-good",    label: "Feel-good" },
  { value: "dark",         label: "Sombre" },
  { value: "quirky",       label: "Décalé" },
  { value: "epic",         label: "Épique" },
  { value: "intimate",     label: "Intimiste" },
  { value: "poetic",       label: "Poétique" },
  { value: "raw",          label: "Brut" },
  { value: "whimsical",    label: "Fantaisiste" },
  { value: "tense",        label: "Tendu" },
  { value: "heartwarming", label: "Chaleureux" },
];

const CONTEXT_OPTIONS: { value: ContextTag; label: string }[] = [
  { value: "solo",    label: "Solo" },
  { value: "couple",  label: "En couple" },
  { value: "friends", label: "Entre amis" },
  { value: "family",  label: "En famille" },
];

const INTENSITY_OPTIONS: { value: IntensityLevel; label: string }[] = [
  { value: "calm",     label: "Calme" },
  { value: "balanced", label: "Équilibré" },
  { value: "intense",  label: "Intense" },
];

const ENDING_OPTIONS: { value: EndingType; label: string }[] = [
  { value: "happy",       label: "Heureux" },
  { value: "bittersweet", label: "Doux-amer" },
  { value: "sad",         label: "Triste" },
  { value: "open",        label: "Ouvert" },
  { value: "hopeful",     label: "Plein d'espoir" },
];

// ─── TagToggle ────────────────────────────────────────────────────────────────

function TagToggle<T extends string>({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  selected: T[];
  onChange: (val: T[]) => void;
}) {
  function toggle(value: T) {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  }
  return (
    <div>
      <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map(({ value, label: lbl }) => (
          <button
            key={value}
            type="button"
            onClick={() => toggle(value)}
            className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
              selected.includes(value)
                ? "bg-amber-500 border-amber-500 text-zinc-950 font-semibold"
                : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
            }`}
          >
            {lbl}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Utilitaire slug ──────────────────────────────────────────────────────────

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ─── État initial ─────────────────────────────────────────────────────────────

const EMPTY_FORM: MovieInsert = {
  title:                "",
  slug:                 "",
  originalTitle:        "",
  posterUrl:            null,
  shortDescription:     "",
  description:          "",
  releaseYear:          new Date().getFullYear(),
  duration:             90,
  director:             "",
  genres:               [],
  platforms:            [],
  moodTags:             [],
  emotionGoalTags:      [],
  themeTags:            [],
  vibeTags:             [],
  contextTags:          [],
  intensity:            "balanced",
  endingType:           "open",
  recommendationReason: "",
  isFeatured:           false,
  isActive:             true,
};

function movieToForm(movie: Movie): MovieInsert {
  return {
    title:                movie.title,
    slug:                 movie.slug,
    originalTitle:        movie.originalTitle ?? "",
    posterUrl:            movie.posterUrl,
    shortDescription:     movie.shortDescription,
    description:          movie.description,
    releaseYear:          movie.releaseYear,
    duration:             movie.duration,
    director:             movie.director ?? "",
    genres:               movie.genres,
    platforms:            movie.platforms,
    moodTags:             movie.moodTags,
    emotionGoalTags:      movie.emotionGoalTags,
    themeTags:            movie.themeTags,
    vibeTags:             movie.vibeTags,
    contextTags:          movie.contextTags,
    intensity:            movie.intensity,
    endingType:           movie.endingType,
    recommendationReason: movie.recommendationReason,
    isFeatured:           movie.isFeatured,
    isActive:             movie.isActive,
  };
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface AdminMovieFormProps {
  onSuccess: (movie: { id: string; title: string }) => void;
  onCancel:  () => void;
  movieToEdit?: Movie; // si fourni → mode édition
}

// ─── Composant ────────────────────────────────────────────────────────────────

export default function AdminMovieForm({
  onSuccess,
  onCancel,
  movieToEdit,
}: AdminMovieFormProps) {
  const isEdit = !!movieToEdit;

  const [form, setForm]           = useState<MovieInsert>(
    movieToEdit ? movieToForm(movieToEdit) : EMPTY_FORM
  );
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  function set<K extends keyof MovieInsert>(key: K, value: MovieInsert[K]) {
    setForm((prev: MovieInsert) => ({ ...prev, [key]: value }));
  }

  function handleTitleChange(title: string) {
    setForm((prev: MovieInsert) => ({
      ...prev,
      title,
      // en mode édition, on ne régénère pas le slug automatiquement
      ...(isEdit ? {} : { slug: toSlug(title) }),
    }));
  }

  // ── Upload image ─────────────────────────────────────────────────────────
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    try {
      const data = new FormData();
      data.append("file", file);

      const res  = await fetch("/api/upload", { method: "POST", body: data });
      const json = await res.json();

      if (!res.ok) throw new Error(json.error ?? "Erreur upload");

      set("posterUrl", json.url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Erreur lors de l'upload");
    } finally {
      setUploading(false);
      e.target.value = ""; // reset input pour permettre re-sélection
    }
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let res: Response;

      if (isEdit && movieToEdit) {
        // Mode édition → PATCH
        res = await fetch(`/api/movies/${movieToEdit.id}`, {
          method:  "PATCH",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(form),
        });
      } else {
        // Mode ajout → POST
        res = await fetch("/api/movies", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(form),
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");

      onSuccess({ id: data.id, title: data.title });
      if (!isEdit) setForm(EMPTY_FORM);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  // ── Rendu ─────────────────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold text-lg">
            {isEdit ? `Modifier · ${movieToEdit!.title}` : "Ajouter un film"}
          </h2>
          {isEdit && (
            <p className="text-zinc-500 text-xs mt-0.5">id : {movieToEdit!.id}</p>
          )}
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
        >
          Annuler ×
        </button>
      </div>

      {/* ── Section 1 : Infos de base ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="text-zinc-500 text-xs uppercase tracking-wider mb-2 block">Titre *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            placeholder="La La Land"
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors text-sm"
          />
        </div>

        <div>
          <label className="text-zinc-500 text-xs uppercase tracking-wider mb-2 block">Slug</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 focus:outline-none focus:border-amber-500 transition-colors text-sm font-mono"
          />
        </div>

        <div>
          <label className="text-zinc-500 text-xs uppercase tracking-wider mb-2 block">Titre original</label>
          <input
            type="text"
            value={form.originalTitle ?? ""}
            onChange={(e) => set("originalTitle", e.target.value)}
            placeholder="The Pursuit of Happyness"
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors text-sm"
          />
        </div>

        <div>
          <label className="text-zinc-500 text-xs uppercase tracking-wider mb-2 block">Année *</label>
          <input
            type="number"
            value={form.releaseYear}
            onChange={(e) => set("releaseYear", Number(e.target.value))}
            required min={1900} max={2030}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-amber-500 transition-colors text-sm"
          />
        </div>

        <div>
          <label className="text-zinc-500 text-xs uppercase tracking-wider mb-2 block">Durée (min) *</label>
          <input
            type="number"
            value={form.duration}
            onChange={(e) => set("duration", Number(e.target.value))}
            required min={1}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-amber-500 transition-colors text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-zinc-500 text-xs uppercase tracking-wider mb-2 block">Réalisateur·trice</label>
          <input
            type="text"
            value={form.director ?? ""}
            onChange={(e) => set("director", e.target.value)}
            placeholder="Damien Chazelle"
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors text-sm"
          />
        </div>

        {/* ── Affiche avec upload ── */}
        <div className="sm:col-span-2">
          <label className="text-zinc-500 text-xs uppercase tracking-wider mb-3 block">
            Affiche
            {uploading && (
              <span className="ml-2 text-amber-400 normal-case animate-pulse">· Upload en cours…</span>
            )}
          </label>

          <div className="flex gap-4 items-start">
            {/* Preview affiche */}
            {form.posterUrl ? (
              <div className="relative shrink-0 w-16 h-24 rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700 group">
                <Image
                  src={form.posterUrl}
                  alt="Aperçu affiche"
                  fill
                  className="object-cover"
                  unoptimized={form.posterUrl.startsWith("/posters/")}
                />
                <button
                  type="button"
                  onClick={() => set("posterUrl", null)}
                  className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/60 transition-colors"
                  title="Supprimer l'affiche"
                >
                  <span className="text-white/0 group-hover:text-white text-xl transition-colors">×</span>
                </button>
              </div>
            ) : (
              <div className="shrink-0 w-16 h-24 rounded-xl bg-zinc-800 border border-dashed border-zinc-700 flex items-center justify-center text-zinc-600 text-xs text-center leading-tight px-1">
                Pas d&apos;affiche
              </div>
            )}

            {/* Contrôles */}
            <div className="flex-1 space-y-2">
              {/* Bouton choisir fichier */}
              <label
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border cursor-pointer transition-all select-none ${
                  uploading
                    ? "border-amber-500/40 bg-amber-500/5 text-amber-400 cursor-wait"
                    : "border-zinc-700 bg-zinc-800/80 text-zinc-300 hover:border-amber-500/50 hover:bg-zinc-700 hover:text-white"
                }`}
              >
                <span className="text-lg">{uploading ? "⏳" : "🖼️"}</span>
                <div>
                  <p className="text-sm font-medium leading-tight">
                    {uploading ? "Upload en cours…" : "Choisir une image"}
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">JPG, PNG, WebP · max 5 Mo</p>
                </div>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>

              {/* URL manuelle */}
              <input
                type="text"
                value={form.posterUrl ?? ""}
                onChange={(e) => set("posterUrl", e.target.value || null)}
                placeholder="ou coller une URL (https://…)"
                className="w-full px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors text-xs"
              />

              {uploadError && (
                <p className="text-red-400 text-xs">{uploadError}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 2 : Descriptions ── */}
      <div className="space-y-4">
        <div>
          <label className="text-zinc-500 text-xs uppercase tracking-wider mb-2 block">
            Description courte * <span className="text-zinc-600 normal-case">(1-2 phrases)</span>
          </label>
          <textarea
            value={form.shortDescription}
            onChange={(e) => set("shortDescription", e.target.value)}
            required rows={2}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors text-sm resize-none"
          />
        </div>

        <div>
          <label className="text-zinc-500 text-xs uppercase tracking-wider mb-2 block">Description complète *</label>
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            required rows={4}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors text-sm resize-none"
          />
        </div>

        <div>
          <label className="text-zinc-500 text-xs uppercase tracking-wider mb-2 block">
            Raison de recommandation * <span className="text-zinc-600 normal-case">(phrase d&apos;accroche)</span>
          </label>
          <textarea
            value={form.recommendationReason}
            onChange={(e) => set("recommendationReason", e.target.value)}
            required rows={2}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors text-sm resize-none"
          />
        </div>
      </div>

      {/* ── Section 3 : Classification ── */}
      <div className="space-y-5">
        <TagToggle label="Genres *" options={GENRE_OPTIONS} selected={form.genres} onChange={(v) => set("genres", v)} />
        <TagToggle label="Plateformes" options={PLATFORM_OPTIONS} selected={form.platforms} onChange={(v) => set("platforms", v)} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Intensité *</p>
            <div className="flex gap-2">
              {INTENSITY_OPTIONS.map(({ value, label }) => (
                <button
                  key={value} type="button"
                  onClick={() => set("intensity", value)}
                  className={`flex-1 py-2 rounded-xl text-xs border transition-colors ${
                    form.intensity === value
                      ? "bg-amber-500 border-amber-500 text-zinc-950 font-semibold"
                      : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Type de fin *</p>
            <div className="flex flex-wrap gap-2">
              {ENDING_OPTIONS.map(({ value, label }) => (
                <button
                  key={value} type="button"
                  onClick={() => set("endingType", value)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                    form.endingType === value
                      ? "bg-amber-500 border-amber-500 text-zinc-950 font-semibold"
                      : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.isFeatured} onChange={(e) => set("isFeatured", e.target.checked)} className="w-4 h-4 accent-amber-500" />
            <span className="text-zinc-400 text-sm">Film mis en avant</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.isActive} onChange={(e) => set("isActive", e.target.checked)} className="w-4 h-4 accent-amber-500" />
            <span className="text-zinc-400 text-sm">Film actif</span>
          </label>
        </div>
      </div>

      {/* ── Section 4 : Tags ── */}
      <div className="space-y-5">
        <p className="text-white font-semibold text-sm border-b border-zinc-800 pb-2">Tags du moteur de recommandation</p>
        <TagToggle label="Humeurs compatibles" options={MOOD_OPTIONS} selected={form.moodTags} onChange={(v) => set("moodTags", v)} />
        <TagToggle label="Émotions procurées" options={EMOTION_OPTIONS} selected={form.emotionGoalTags} onChange={(v) => set("emotionGoalTags", v)} />
        <TagToggle label="Thèmes narratifs" options={THEME_OPTIONS} selected={form.themeTags} onChange={(v) => set("themeTags", v)} />
        <TagToggle label="Ambiance (vibe)" options={VIBE_OPTIONS} selected={form.vibeTags} onChange={(v) => set("vibeTags", v)} />
        <TagToggle label="Contexte de visionnage" options={CONTEXT_OPTIONS} selected={form.contextTags} onChange={(v) => set("contextTags", v)} />
      </div>

      {/* Erreur + Submit */}
      {error && <p className="text-red-400 text-sm text-center">{error}</p>}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 rounded-xl border border-zinc-700 text-zinc-400 text-sm font-medium hover:border-zinc-500 hover:text-zinc-200 transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={
            loading || uploading ||
            !form.title || !form.shortDescription || !form.description ||
            !form.recommendationReason || form.genres.length === 0
          }
          className="flex-2 flex-grow py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 font-bold text-sm hover:from-amber-400 hover:to-orange-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading
            ? (isEdit ? "Enregistrement…" : "Ajout en cours…")
            : (isEdit ? "Enregistrer les modifications" : "Ajouter le film")}
        </button>
      </div>
    </form>
  );
}
