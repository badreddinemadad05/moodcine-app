"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MOOD_EXAMPLES } from "@/lib/constants";

const HERO_BG =
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1920&q=80";

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const STATS = [
  { value: "2 min",  label: "pour analyser" },
  { value: "6",      label: "questions" },
  { value: "100%",   label: "personnalisé" },
];

export default function Hero() {
  return (
    <section
      className="film-grain relative flex flex-col items-center justify-center min-h-screen px-5 sm:px-8 pt-24 pb-16 text-center"
      style={{
        backgroundImage: `url("${HERO_BG}")`,
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
      }}
    >
      {/* ── Overlays cinématographiques ── */}
      {/* Assombrissement principal */}
      <div className="absolute inset-0 bg-zinc-950/72 pointer-events-none" />
      {/* Gradient vertical : noir en bas + léger en haut */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-zinc-950/55 pointer-events-none" />
      {/* Vignette horizontale bords */}
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/50 via-transparent to-zinc-950/50 pointer-events-none" />
      {/* Lueur ambrée centrale */}
      <div
        className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] max-w-[650px] h-[55vw] max-h-[650px] rounded-full pointer-events-none animate-pulse-glow"
        style={{ background: "radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 70%)" }}
      />

      {/* ── Contenu ── */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center">

        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-amber-500/25 bg-amber-500/10 text-amber-400 text-xs font-medium tracking-wide backdrop-blur-sm"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Recommandation cinéma basée sur ton mood
        </motion.div>

        {/* Titre principal */}
        <motion.h1
          className="text-5xl sm:text-7xl md:text-8xl font-black text-white leading-[0.92] tracking-tight mb-6 sm:mb-8"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Le film parfait{" "}
          <br className="hidden sm:block" />
          pour{" "}
          <span className="gradient-text">ton mood.</span>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-zinc-300/80 max-w-xl mx-auto mb-10 sm:mb-12 leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          6 questions, 2 minutes. Notre chatbot comprend ton humeur et te recommande{" "}
          <span className="text-white font-medium">le film qu&apos;il te faut vraiment</span>{" "}
          — pas un algorithme froid, une vraie écoute.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full mb-14 px-4 sm:px-0"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/chat"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-base transition-all duration-200 shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.03] active:scale-[0.98]"
          >
            🎬 Découvrir mon film du soir
          </Link>
          <Link
            href="#how-it-works"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl border border-white/15 text-zinc-300 font-medium text-base hover:text-white hover:border-white/30 hover:bg-white/5 backdrop-blur-sm transition-all duration-200 active:scale-[0.98]"
          >
            Comment ça marche ?
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex items-center gap-8 sm:gap-12 mb-14"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl sm:text-3xl font-black text-white tabular-nums">
                {stat.value}
              </p>
              <p className="text-xs text-zinc-500 mt-0.5 tracking-wide">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Mood tags */}
        <motion.div
          className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center scrollbar-hide w-full max-w-lg"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="shrink-0 text-zinc-500 text-xs">Mood :</span>
          {MOOD_EXAMPLES.map((mood) => (
            <span
              key={mood.label}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/70 border border-white/[0.08] text-zinc-400 text-xs hover:border-amber-500/30 hover:text-zinc-200 backdrop-blur-sm transition-all duration-200 cursor-default"
            >
              <span>{mood.emoji}</span>
              <span>{mood.label}</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-zinc-500 z-10">
        <span className="text-[9px] tracking-[0.25em] uppercase">Défiler</span>
        <div className="w-px h-10 bg-gradient-to-b from-zinc-500/60 to-transparent" />
      </div>
    </section>
  );
}
