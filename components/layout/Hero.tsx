"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MOOD_EXAMPLES } from "@/lib/constants";

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const STATS = [
  { value: "2 min",   label: "pour analyser" },
  { value: "6",       label: "questions" },
  { value: "100%",    label: "personnalisé" },
];

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-5 sm:px-8 pt-24 pb-16 text-center overflow-hidden">

      {/* ── Fond cinématographique ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Lumière principale — top-center, dorée */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[50vh] bg-gradient-to-b from-amber-500/8 via-amber-500/3 to-transparent" />
        {/* Lueur secondaire — orbe central */}
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[700px] h-[60vw] max-h-[700px] bg-amber-500/5 rounded-full blur-[120px] animate-pulse-glow" />
        {/* Vignette basse */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-zinc-950 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center">

        {/* ── Badge ── */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-amber-500/20 bg-amber-500/8 text-amber-400 text-xs font-medium tracking-wide"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Recommandation cinéma basée sur ton mood
        </motion.div>

        {/* ── Titre principal ── */}
        <motion.h1
          className="text-5xl sm:text-7xl md:text-8xl font-black text-white leading-[0.92] tracking-tight mb-6 sm:mb-8"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Le film parfait{" "}
          <br className="hidden sm:block" />
          pour{" "}
          <span className="gradient-text">ton mood.</span>
        </motion.h1>

        {/* ── Sous-titre ── */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-xl mx-auto mb-10 sm:mb-12 leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          6 questions, 2 minutes. Notre chatbot comprend ton humeur et te
          recommande{" "}
          <span className="text-zinc-200 font-medium">le film qu'il te faut vraiment</span>{" "}
          — pas un algorithme froid, une vraie écoute.
        </motion.p>

        {/* ── Boutons CTA ── */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full mb-12 sm:mb-16 px-4 sm:px-0"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/chat"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-base transition-all duration-200 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-[1.02] active:scale-[0.98]"
          >
            Découvrir mon film du soir
            <span className="text-xl">→</span>
          </Link>
          <Link
            href="#how-it-works"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl border border-white/10 text-zinc-400 font-medium text-base hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-200 active:scale-[0.98]"
          >
            Comment ça marche ?
          </Link>
        </motion.div>

        {/* ── Stats ── */}
        <motion.div
          className="flex items-center gap-6 sm:gap-10 mb-12 sm:mb-16"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-xl sm:text-2xl font-black text-white tabular-nums">{stat.value}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Mood tags ── */}
        <motion.div
          className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center scrollbar-hide w-full max-w-lg"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="shrink-0 text-zinc-600 text-xs">Mood&nbsp;:</span>
          {MOOD_EXAMPLES.map((mood) => (
            <span
              key={mood.label}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/[0.07] text-zinc-400 text-xs hover:border-white/15 hover:text-zinc-200 transition-all duration-200 cursor-default"
            >
              <span>{mood.emoji}</span>
              <span>{mood.label}</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Indicateur de scroll ── */}
      <div className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-zinc-600">
        <span className="text-[10px] tracking-[0.2em] uppercase">Défiler</span>
        <div className="w-px h-10 bg-gradient-to-b from-zinc-600/60 to-transparent" />
      </div>
    </section>
  );
}
