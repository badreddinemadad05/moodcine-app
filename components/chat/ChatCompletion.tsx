"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ChatAnswers } from "@/types/chat";
import { CHAT_FLOW } from "@/lib/chat-flow";

interface ChatCompletionProps {
  answers: ChatAnswers;
}

export default function ChatCompletion({ answers }: ChatCompletionProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    /*
     * Mobile  : pas d'indent — occupe toute la largeur
     * Desktop : indent pour s'aligner avec les bulles bot
     */
    <div
      className={`sm:pl-11 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="rounded-2xl bg-zinc-900 border border-amber-500/20 overflow-hidden">
        {/* En-tête */}
        <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4 text-center border-b border-zinc-800">
          <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🎬</div>
          <h2 className="text-white font-bold text-base sm:text-lg mb-1">
            Ton profil du soir est prêt
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm">
            Voilà ce qu&apos;on a retenu
          </p>
        </div>

        {/* Récapitulatif */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 space-y-2">
          {CHAT_FLOW.map((step) => {
            const answer = answers[step.id];
            if (!answer) return null;
            return (
              <div
                key={step.id}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-zinc-800/50"
              >
                <span className="text-lg sm:text-xl shrink-0" aria-hidden="true">
                  {answer.emoji}
                </span>
                <span className="text-zinc-300 text-xs sm:text-sm">
                  {answer.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bouton CTA */}
        <div className="px-4 sm:px-6 pb-5 sm:pb-6">
          <Link
            href="/results"
            className="flex items-center justify-center w-full py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 font-semibold text-sm hover:from-amber-400 hover:to-orange-400 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-amber-500/20"
          >
            Voir mes recommandations →
          </Link>
        </div>
      </div>
    </div>
  );
}
