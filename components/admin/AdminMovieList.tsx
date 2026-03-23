"use client";

import { useState } from "react";
import Image from "next/image";
import type { Movie } from "@/types/movie";
import AdminMovieForm from "./AdminMovieForm";

interface AdminMovieListProps {
  initialMovies: Movie[];
}

export default function AdminMovieList({ initialMovies }: AdminMovieListProps) {
  const [movies, setMovies]           = useState<Movie[]>(initialMovies);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [deleting, setDeleting]       = useState<string | null>(null);
  const [seeding, setSeeding]         = useState(false);
  const [seedMsg, setSeedMsg]         = useState("");

  // ── Helpers liste ──────────────────────────────────────────────────────────
  async function refreshList() {
    const res  = await fetch("/api/movies?all=1");
    const data = await res.json();
    setMovies(data);
  }

  // ── Suppression ────────────────────────────────────────────────────────────
  async function handleDelete(id: string, title: string) {
    if (!confirm(`Supprimer "${title}" ? Cette action est irréversible.`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/movies/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Échec de la suppression");
      setMovies((prev) => prev.filter((m) => m.id !== id));
      if (editingMovie?.id === id) setEditingMovie(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erreur");
    } finally {
      setDeleting(null);
    }
  }

  // ── Toggle actif/inactif ───────────────────────────────────────────────────
  async function handleToggleActive(movie: Movie) {
    try {
      const res = await fetch(`/api/movies/${movie.id}`, {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ isActive: !movie.isActive }),
      });
      if (!res.ok) throw new Error("Mise à jour échouée");
      const updated = await res.json();
      setMovies((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erreur");
    }
  }

  // ── Édition ────────────────────────────────────────────────────────────────
  function handleEdit(movie: Movie) {
    setEditingMovie(movie);
    setShowAddForm(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ── Seed ───────────────────────────────────────────────────────────────────
  async function handleSeed() {
    if (!confirm("Importer les films de la base locale dans Supabase ?")) return;
    setSeeding(true);
    setSeedMsg("");
    try {
      const res  = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      setSeedMsg(`✓ ${data.ok} films importés${data.error > 0 ? ` · ${data.error} erreurs` : ""}`);
      await refreshList();
    } catch {
      setSeedMsg("Erreur lors de l'import");
    } finally {
      setSeeding(false);
    }
  }

  // ── Déconnexion ────────────────────────────────────────────────────────────
  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  const formVisible = showAddForm || !!editingMovie;

  return (
    <div>
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white font-bold text-2xl">Films</h1>
          <p className="text-zinc-500 text-sm mt-0.5">
            {movies.length} film{movies.length > 1 ? "s" : ""} dans la base
          </p>
        </div>
        <div className="flex items-center gap-3">
          {!formVisible && (
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 font-semibold text-sm hover:from-amber-400 hover:to-orange-400 transition-all"
            >
              + Ajouter un film
            </button>
          )}
          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl border border-zinc-800 text-zinc-500 text-sm hover:border-zinc-700 hover:text-zinc-300 transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </div>

      {/* ── Formulaire ajout ── */}
      {showAddForm && !editingMovie && (
        <div className="mb-8">
          <AdminMovieForm
            onSuccess={async ({ title }) => {
              setShowAddForm(false);
              await refreshList();
              alert(`✓ "${title}" ajouté avec succès`);
            }}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {/* ── Formulaire édition ── */}
      {editingMovie && (
        <div className="mb-8">
          <AdminMovieForm
            movieToEdit={editingMovie}
            onSuccess={async ({ title }) => {
              setEditingMovie(null);
              await refreshList();
              alert(`✓ "${title}" modifié avec succès`);
            }}
            onCancel={() => setEditingMovie(null)}
          />
        </div>
      )}

      {/* ── Base vide ── */}
      {movies.length === 0 && !formVisible && (
        <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl mb-8">
          <p className="text-zinc-500 mb-4">Aucun film dans la base</p>
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 font-semibold text-sm"
            >
              + Ajouter mon premier film
            </button>
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="px-6 py-2 rounded-xl border border-zinc-700 text-zinc-400 text-sm hover:border-zinc-500 transition-colors disabled:opacity-50"
            >
              {seeding ? "Import en cours…" : "Ou importer les films de démo"}
            </button>
            {seedMsg && <p className="text-amber-400 text-sm">{seedMsg}</p>}
          </div>
        </div>
      )}

      {/* ── Seed rapide ── */}
      {movies.length > 0 && movies.length < 5 && !formVisible && (
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="px-4 py-2 rounded-xl border border-zinc-800 text-zinc-500 text-xs hover:border-zinc-600 hover:text-zinc-300 transition-colors disabled:opacity-50"
          >
            {seeding ? "Import…" : "Importer les films de démo"}
          </button>
          {seedMsg && <p className="text-amber-400 text-xs">{seedMsg}</p>}
        </div>
      )}

      {/* ── Liste ── */}
      {movies.length > 0 && (
        <div className="space-y-3">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                editingMovie?.id === movie.id
                  ? "bg-amber-500/5 border-amber-500/30"
                  : movie.isActive
                  ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                  : "bg-zinc-900/50 border-zinc-800/50 opacity-50"
              }`}
            >
              {/* Miniature affiche */}
              <div className="w-12 h-16 shrink-0 rounded-lg overflow-hidden bg-zinc-800 flex items-center justify-center">
                {movie.posterUrl ? (
                  <Image
                    src={movie.posterUrl}
                    alt={movie.title}
                    width={48}
                    height={64}
                    className="object-cover w-full h-full"
                    unoptimized={movie.posterUrl.startsWith("/posters/")}
                  />
                ) : (
                  <span className="text-zinc-600 text-lg font-black">
                    {movie.title.charAt(0)}
                  </span>
                )}
              </div>

              {/* Infos */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-white font-semibold text-sm truncate">{movie.title}</p>
                  {movie.isFeatured && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] border border-amber-500/30">
                      ★ Vedette
                    </span>
                  )}
                  {!movie.isActive && (
                    <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-500 text-[10px] border border-zinc-700">
                      Inactif
                    </span>
                  )}
                  {movie.posterUrl && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20">
                      🖼 Affiche
                    </span>
                  )}
                </div>
                <p className="text-zinc-500 text-xs mt-0.5">
                  {movie.releaseYear} · {movie.genres.slice(0, 2).join(", ")}
                </p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {movie.platforms.map((p) => (
                    <span key={p} className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px]">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleEdit(movie)}
                  disabled={!!editingMovie && editingMovie.id !== movie.id}
                  className={`px-3 py-1.5 rounded-lg border text-xs transition-colors ${
                    editingMovie?.id === movie.id
                      ? "border-amber-500/50 bg-amber-500/10 text-amber-400"
                      : "border-zinc-700 text-zinc-400 hover:border-amber-500/50 hover:text-amber-400 disabled:opacity-30"
                  }`}
                >
                  {editingMovie?.id === movie.id ? "En cours…" : "Modifier"}
                </button>
                <button
                  onClick={() => handleToggleActive(movie)}
                  className="px-3 py-1.5 rounded-lg border border-zinc-700 text-zinc-400 text-xs hover:border-zinc-500 hover:text-zinc-200 transition-colors"
                >
                  {movie.isActive ? "Désactiver" : "Activer"}
                </button>
                <button
                  onClick={() => handleDelete(movie.id, movie.title)}
                  disabled={deleting === movie.id}
                  className="px-3 py-1.5 rounded-lg border border-red-900/50 text-red-500 text-xs hover:border-red-700 hover:text-red-400 transition-colors disabled:opacity-50"
                >
                  {deleting === movie.id ? "…" : "Supprimer"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
