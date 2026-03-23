"use client";

import { useState } from "react";
import Image from "next/image";
import type { Movie } from "@/types/movie";
import AdminMovieForm from "./AdminMovieForm";

interface AdminMovieListProps {
  initialMovies: Movie[];
}

export default function AdminMovieList({ initialMovies }: AdminMovieListProps) {
  const [movies, setMovies]     = useState<Movie[]>(initialMovies);
  const [showForm, setShowForm] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [seeding, setSeeding]   = useState(false);
  const [seedMsg, setSeedMsg]   = useState("");

  // ── Suppression ────────────────────────────────────────────────────────────
  async function handleDelete(id: string, title: string) {
    if (!confirm(`Supprimer "${title}" ? Cette action est irréversible.`)) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/movies/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Échec de la suppression");
      setMovies((prev) => prev.filter((m) => m.id !== id));
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

  // ── Seed : importer les 20 films locaux ───────────────────────────────────
  async function handleSeed() {
    if (!confirm("Importer les 20 films de la base locale dans Supabase ?")) return;
    setSeeding(true);
    setSeedMsg("");
    try {
      const res  = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      setSeedMsg(`✓ ${data.ok} films importés${data.error > 0 ? ` · ${data.error} erreurs` : ""}`);
      // Recharge la liste
      const listRes = await fetch("/api/movies?all=1");
      const list    = await listRes.json();
      setMovies(list);
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

  return (
    <div>
      {/* ── Header admin ── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white font-bold text-2xl">Films</h1>
          <p className="text-zinc-500 text-sm mt-0.5">{movies.length} film{movies.length > 1 ? "s" : ""} dans la base</p>
        </div>
        <div className="flex items-center gap-3">
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
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

      {/* ── Formulaire d'ajout ── */}
      {showForm && (
        <div className="mb-8">
          <AdminMovieForm
            onSuccess={({ title }) => {
              setShowForm(false);
              // Recharge la liste depuis l'API pour avoir le bon id
              fetch("/api/movies?all=1")
                .then((r) => r.json())
                .then(setMovies);
              alert(`✓ "${title}" ajouté avec succès`);
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {/* ── Bouton seed (si base vide) ── */}
      {movies.length === 0 && !showForm && (
        <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl mb-8">
          <p className="text-zinc-500 mb-4">Aucun film dans la base</p>
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 font-semibold text-sm"
            >
              + Ajouter mon premier film
            </button>
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="px-6 py-2 rounded-xl border border-zinc-700 text-zinc-400 text-sm hover:border-zinc-500 transition-colors disabled:opacity-50"
            >
              {seeding ? "Import en cours…" : "Ou importer les 20 films de démo"}
            </button>
            {seedMsg && <p className="text-amber-400 text-sm">{seedMsg}</p>}
          </div>
        </div>
      )}

      {/* ── Option seed rapide si quelques films existent ── */}
      {movies.length > 0 && movies.length < 5 && (
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

      {/* ── Liste des films ── */}
      {movies.length > 0 && (
        <div className="space-y-3">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                movie.isActive
                  ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                  : "bg-zinc-900/50 border-zinc-800/50 opacity-50"
              }`}
            >
              {/* Affiche miniature */}
              <div className="w-12 h-16 shrink-0 rounded-lg overflow-hidden bg-zinc-800 flex items-center justify-center">
                {movie.posterUrl ? (
                  <Image
                    src={movie.posterUrl}
                    alt={movie.title}
                    width={48}
                    height={64}
                    className="object-cover w-full h-full"
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
                  onClick={() => handleToggleActive(movie)}
                  className="px-3 py-1.5 rounded-lg border border-zinc-700 text-zinc-400 text-xs hover:border-zinc-500 hover:text-zinc-200 transition-colors"
                  title={movie.isActive ? "Désactiver" : "Activer"}
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
