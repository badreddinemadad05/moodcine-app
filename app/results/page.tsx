import type { Metadata } from "next";
import { getMovies } from "@/services/movies";
import ResultsContainer from "@/components/results/ResultsContainer";

export const metadata: Metadata = {
  title: "MoodCiné — Tes recommandations du soir",
  description:
    "Découvre les films sélectionnés spécialement pour ton mood du moment.",
};

// Server Component : récupère les films depuis Supabase (ou données locales)
// puis passe le tableau à ResultsContainer qui gère localStorage + scoring
export default async function ResultsPage() {
  const movies = await getMovies().catch(() => {
    // Si Supabase est down, fallback silencieux sur tableau vide
    // ResultsContainer affichera un message d'erreur propre
    return [];
  });

  return <ResultsContainer movies={movies} />;
}
