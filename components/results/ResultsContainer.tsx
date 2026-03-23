"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ChatAnswers } from "@/types/chat";
import type { Movie, ScoredMovie } from "@/types/movie";
import { mapAnswersToCriteria } from "@/lib/tag-mapping";
import { getRecommendations } from "@/lib/recommendation-engine";
import RecommendationHeader from "./RecommendationHeader";
import MovieCard from "./MovieCard";

const RESULTS_TOTAL   = 10;
const RESULTS_INITIAL = 5;

type PageState = "loading" | "results" | "no-answers";

interface ResultsContainerProps {
  movies: Movie[];
}

export default function ResultsContainer({ movies }: ResultsContainerProps) {
  const [pageState, setPageState]   = useState<PageState>("loading");
  const [allResults, setAllResults] = useState<ScoredMovie[]>([]);
  const [answers, setAnswers]       = useState<ChatAnswers | null>(null);
  const [showAll, setShowAll]       = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("moodcine-answers");
    if (!stored) { setPageState("no-answers"); return; }

    try {
      const parsedAnswers: ChatAnswers = JSON.parse(stored);
      const criteria = mapAnswersToCriteria(parsedAnswers);
      const results  = getRecommendations(criteria, movies, RESULTS_TOTAL);
      setAnswers(parsedAnswers);
      setAllResults(results);
      setPageState("results");
    } catch {
      setPageState("no-answers");
    }
  }, [movies]);

  const displayed = showAll ? allResults : allResults.slice(0, RESULTS_INITIAL);
  const hasMore   = !showAll && allResults.length > RESULTS_INITIAL;

  // ── Chargement ────────────────────────────────────────────────────────────
  if (pageState === "loading") {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="text-6xl mb-5 animate-float">🎬</div>
          <p className="text-zinc-400 text-sm">Analyse de ton mood en cours…</p>
          {/* Skeleton shimmer */}
          <div className="mt-10 flex gap-4 opacity-30">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-40 h-64 rounded-2xl shimmer" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Pas de réponses ───────────────────────────────────────────────────────
  if (pageState === "no-answers") {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-6 text-center">
        <div className="text-6xl mb-6 animate-float">🎭</div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
          On ne te connaît pas encore
        </h1>
        <p className="text-zinc-400 max-w-sm mb-8 leading-relaxed text-sm sm:text-base">
          Commence par répondre aux 6 questions du chatbot pour recevoir
          ta sélection personnalisée.
        </p>
        <Link
          href="/chat"
          className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-base transition-all duration-200 shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98]"
        >
          Analyser mon mood →
        </Link>
      </div>
    );
  }

  // ── Résultats ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Lueur ambiante */}
      <div className="fixed inset-x-0 top-0 h-80 bg-gradient-to-b from-amber-950/8 to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-20 sm:pb-28">

        <RecommendationHeader answers={answers} count={displayed.length} />

        {displayed.length > 0 ? (
          <>
            {/* Grille animée */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {displayed.map((scored, index) => (
                <motion.div
                  key={scored.movie.id}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <MovieCard scoredMovie={scored} rank={index + 1} />
                </motion.div>
              ))}
            </div>

            {/* Bouton Voir plus */}
            {hasMore && (
              <motion.div
                className="mt-10 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={() => setShowAll(true)}
                  className="inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl border border-white/10 text-zinc-300 text-sm font-medium hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-200 active:scale-[0.98]"
                >
                  Voir d&apos;autres films
                  <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-500 text-xs">
                    +{allResults.length - RESULTS_INITIAL}
                  </span>
                </button>
              </motion.div>
            )}
          </>
        ) : (
          <div className="text-center py-24">
            <p className="text-zinc-500 mb-4 text-sm">Aucun film trouvé pour ce profil.</p>
            <Link href="/chat" className="text-amber-500 text-sm hover:text-amber-400 transition-colors">
              Recommencer le quiz →
            </Link>
          </div>
        )}

        {/* Footer */}
        <div className="mt-14 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-xs text-center sm:text-left">
            Sélection générée le{" "}
            {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}
            {" "}· Basée sur ton profil mood
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors"
            >
              ← Accueil
            </Link>
            <Link
              href="/chat"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs transition-all duration-200 shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              Refaire le test
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
