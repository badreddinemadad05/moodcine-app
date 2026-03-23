import Link from "next/link";
import type { ChatAnswers } from "@/types/chat";
import { buildPersonalizedSubtitle, buildMoodSummary } from "@/lib/tag-mapping";

interface RecommendationHeaderProps {
  answers: ChatAnswers | null;
  count: number;
}

export default function RecommendationHeader({ answers, count }: RecommendationHeaderProps) {
  const subtitle = answers ? buildPersonalizedSubtitle(answers) : null;
  const summary  = answers ? buildMoodSummary(answers) : null;

  return (
    <div className="mb-10 sm:mb-14">
      {/* Fil d'Ariane */}
      <div className="flex items-center gap-2 text-xs text-zinc-600 mb-7">
        <Link href="/" className="hover:text-zinc-400 transition-colors">Accueil</Link>
        <span>/</span>
        <Link href="/chat" className="hover:text-zinc-400 transition-colors">Quiz</Link>
        <span>/</span>
        <span className="text-zinc-500">Résultats</span>
      </div>

      {/* Corps de l'en-tête */}
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div className="flex-1 min-w-0">
          {/* Label */}
          <p className="section-label mb-3">Ta sélection personnalisée</p>

          {/* Titre */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-3">
            Voici les films{" "}
            <span className="gradient-text">faits pour toi.</span>
          </h1>

          {/* Sous-titre personnalisé */}
          {subtitle && (
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl">
              {subtitle}
            </p>
          )}

          {/* Tags mood */}
          {summary && (
            <p className="text-zinc-600 text-xs mt-3 font-mono">
              {summary}
            </p>
          )}
        </div>

        {/* Badge count */}
        <div className="shrink-0 flex flex-col items-center gap-1 px-5 py-4 rounded-2xl bg-zinc-900/80 border border-white/[0.06]">
          <span className="text-2xl">🎬</span>
          <span className="text-white font-black text-xl tabular-nums">{count}</span>
          <span className="text-zinc-500 text-xs">films</span>
        </div>
      </div>

      {/* Séparateur */}
      <div className="mt-8 h-px bg-gradient-to-r from-amber-500/30 via-zinc-700/50 to-transparent" />
    </div>
  );
}
