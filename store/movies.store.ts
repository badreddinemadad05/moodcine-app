/**
 * ─── Store en mémoire — mode local (sans Supabase) ───────────────────────────
 *
 * Simule une base de données dans la RAM du serveur Next.js.
 * Les données persistent entre les requêtes le temps de la session serveur.
 * Lors du passage à Supabase → ce fichier n'est plus utilisé,
 * seul movies.service.ts change.
 *
 * Schéma mental :
 *   data/movies.ts  →  seed initial (lecture seule)
 *   store/          →  état mutable en mémoire
 *   services/       →  fonctions async (comme une vraie API)
 *   app/api/        →  endpoints HTTP qui appellent les services
 *   components/     →  UI qui appelle les endpoints
 */

import type { Movie } from "@/types/movie";
import { MOVIES } from "@/data/movies";

// ─── Compteur d'ID local ──────────────────────────────────────────────────────
let _idCounter = 1000;

function generateLocalId(): string {
  return `local-${++_idCounter}`;
}

// ─── État partagé (singleton de module) ──────────────────────────────────────
// structuredClone garantit que le store est indépendant du tableau source
let _movies: Movie[] = structuredClone(MOVIES) as Movie[];

// ─── API du store ─────────────────────────────────────────────────────────────
export const moviesStore = {

  /** Retourne une copie de tous les films */
  getAll(): Movie[] {
    return [..._movies];
  },

  /** Retourne un film par son id, ou null */
  getById(id: string): Movie | null {
    return _movies.find((m) => m.id === id) ?? null;
  },

  /** Retourne un film par son slug, ou null */
  getBySlug(slug: string): Movie | null {
    return _movies.find((m) => m.slug === slug) ?? null;
  },

  /** Ajoute un film et retourne le film avec son id généré */
  add(data: Omit<Movie, "id">): Movie {
    const movie: Movie = { ...data, id: generateLocalId() };
    _movies = [..._movies, movie];
    return { ...movie };
  },

  /** Supprime un film. Retourne true si trouvé et supprimé. */
  remove(id: string): boolean {
    const before = _movies.length;
    _movies = _movies.filter((m) => m.id !== id);
    return _movies.length < before;
  },

  /** Met à jour un film. Retourne le film modifié, ou null si introuvable. */
  update(id: string, patch: Partial<Omit<Movie, "id">>): Movie | null {
    let found: Movie | null = null;
    _movies = _movies.map((m) => {
      if (m.id !== id) return m;
      found = { ...m, ...patch };
      return found;
    });
    return found;
  },

  /** Remet le store à l'état initial (utile pour les tests) */
  reset(): void {
    _movies = structuredClone(MOVIES) as Movie[];
    _idCounter = 1000;
  },
};
