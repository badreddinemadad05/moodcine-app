import type { Metadata } from "next";
import Link from "next/link";
import { getMovies } from "@/services/movies";
import AdminMovieList from "@/components/admin/AdminMovieList";

export const metadata: Metadata = {
  title: "Admin — MoodCiné",
  robots: "noindex, nofollow",
};

export default async function AdminPage() {
  // Récupère tous les films (actifs + inactifs) pour l'admin
  let movies = await getMovies(true).catch(() => []);

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-zinc-950 font-black text-[10px]">
              MC
            </div>
            <span className="text-white font-semibold text-sm">Admin MoodCiné</span>
            <span className="text-zinc-700 text-xs">·</span>
            <span className="text-zinc-500 text-xs">Panel de gestion</span>
          </div>
          <Link
            href="/"
            className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors"
          >
            ← Voir le site
          </Link>
        </div>
      </header>

      {/* Contenu */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <AdminMovieList initialMovies={movies} />
      </main>
    </div>
  );
}
