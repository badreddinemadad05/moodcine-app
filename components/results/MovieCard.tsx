"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ScoredMovie } from "@/types/movie";
import type { MovieGenre, Platform } from "@/types/movie";
import { getTagLabel } from "@/lib/recommendation-engine";

interface MovieCardProps {
  scoredMovie: ScoredMovie;
  rank: number;
}

const GENRE_GRADIENTS: Record<MovieGenre, string> = {
  drama:       "from-slate-800 via-slate-900 to-zinc-950",
  comedy:      "from-amber-900/60 via-zinc-900 to-zinc-950",
  romance:     "from-rose-900/50 via-zinc-900 to-zinc-950",
  thriller:    "from-red-950/70 via-zinc-900 to-zinc-950",
  action:      "from-orange-900/60 via-zinc-900 to-zinc-950",
  adventure:   "from-emerald-900/50 via-zinc-900 to-zinc-950",
  "sci-fi":    "from-blue-950/60 via-zinc-900 to-zinc-950",
  animation:   "from-purple-900/60 via-zinc-900 to-zinc-950",
  documentary: "from-teal-900/50 via-zinc-900 to-zinc-950",
  fantasy:     "from-indigo-900/60 via-zinc-900 to-zinc-950",
  biography:   "from-zinc-700/50 via-zinc-900 to-zinc-950",
};

const PLATFORM_STYLES: Record<Platform, { label: string; className: string }> = {
  netflix: { label: "Netflix",  className: "bg-red-500/15   text-red-400   border-red-500/25" },
  prime:   { label: "Prime",    className: "bg-blue-500/15  text-blue-400  border-blue-500/25" },
  disney:  { label: "Disney+",  className: "bg-indigo-500/15 text-indigo-400 border-indigo-500/25" },
  canal:   { label: "Canal+",   className: "bg-zinc-500/15  text-zinc-300  border-zinc-500/25" },
  mubi:    { label: "MUBI",     className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" },
};

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m.toString().padStart(2, "0")}`;
}

export default function MovieCard({ scoredMovie, rank }: MovieCardProps) {
  const { movie, matchedTags } = scoredMovie;
  const gradient = GENRE_GRADIENTS[movie.genres[0]] ?? "from-zinc-800 via-zinc-900 to-zinc-950";

  const displayTags = matchedTags
    .filter((t) => t.startsWith("feel:") || t.startsWith("theme:") || t.startsWith("vibe:"))
    .slice(0, 3);

  return (
    <motion.article
      className="group flex flex-col rounded-2xl overflow-hidden bg-zinc-900/80 border border-white/[0.06] transition-colors duration-300 card-glow"
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* ── Affiche ── */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-900 shrink-0">
        {movie.posterUrl ? (
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-b ${gradient} flex flex-col items-center justify-center`}>
            <span className="text-7xl font-black text-white/8 select-none leading-none">
              {movie.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Overlay gradient dramatique */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/20 to-transparent" />
        {/* Subtle side vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/20 via-transparent to-zinc-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badge rang */}
        <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-amber-500 text-zinc-950 text-xs font-black flex items-center justify-center shadow-xl shadow-amber-500/40 glow-badge">
          {rank}
        </div>

        {/* Badges plateforme */}
        <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
          {movie.platforms.slice(0, 2).map((p) => {
            const style = PLATFORM_STYLES[p];
            if (!style) return null;
            return (
              <span
                key={p}
                className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border backdrop-blur-md ${style.className}`}
              >
                {style.label}
              </span>
            );
          })}
        </div>

        {/* Raison de recommandation */}
        <div className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-8">
          <p className="text-amber-400/90 text-xs sm:text-sm italic leading-snug line-clamp-2">
            &ldquo;{movie.recommendationReason}&rdquo;
          </p>
        </div>
      </div>

      {/* ── Infos texte ── */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <h3 className="text-white font-bold text-base sm:text-lg leading-tight tracking-tight mb-1">
          {movie.title}
        </h3>
        <p className="text-zinc-500 text-xs mb-3">
          {movie.releaseYear}
          {movie.duration ? ` · ${formatDuration(movie.duration)}` : ""}
          {movie.director ? ` · ${movie.director}` : ""}
        </p>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed line-clamp-3 flex-1">
          {movie.shortDescription}
        </p>

        {displayTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4 pt-3.5 border-t border-white/[0.06]">
            {displayTags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full bg-amber-500/8 border border-amber-500/15 text-amber-400/80 text-[10px] sm:text-xs font-medium"
              >
                {getTagLabel(tag)}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
