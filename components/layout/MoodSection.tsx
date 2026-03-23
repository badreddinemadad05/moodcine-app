import Link from "next/link";

const MOODS = [
  {
    emoji:   "😴",
    label:   "Fatigué·e",
    desc:    "Quelque chose de doux et enveloppant",
    bg:      "from-blue-950/80 via-slate-900 to-zinc-950",
    radial:  "rgba(96,165,250,0.12)",
    border:  "border-blue-900/60",
    hover:   "hover:border-blue-500/40",
    glow:    "mood-glow-blue",
    accent:  "text-blue-400/70",
    char:    "🌙",
  },
  {
    emoji:   "😊",
    label:   "De bonne humeur",
    desc:    "Sur un nuage, envie de partager ça",
    bg:      "from-amber-950/80 via-orange-950/50 to-zinc-950",
    radial:  "rgba(251,191,36,0.14)",
    border:  "border-amber-900/60",
    hover:   "hover:border-amber-500/40",
    glow:    "mood-glow-amber",
    accent:  "text-amber-400/70",
    char:    "☀️",
  },
  {
    emoji:   "😢",
    label:   "Mélancolique",
    desc:    "Besoin de laisser sortir quelque chose",
    bg:      "from-indigo-950/80 via-blue-950/50 to-zinc-950",
    radial:  "rgba(129,140,248,0.12)",
    border:  "border-indigo-900/60",
    hover:   "hover:border-indigo-500/40",
    glow:    "mood-glow-indigo",
    accent:  "text-indigo-400/70",
    char:    "🌧",
  },
  {
    emoji:   "😰",
    label:   "Stressé·e",
    desc:    "Besoin de décompresser et d'oublier",
    bg:      "from-red-950/80 via-rose-950/50 to-zinc-950",
    radial:  "rgba(248,113,113,0.12)",
    border:  "border-red-900/60",
    hover:   "hover:border-red-500/40",
    glow:    "mood-glow-red",
    accent:  "text-red-400/70",
    char:    "⚡",
  },
  {
    emoji:   "🌀",
    label:   "Perdu·e",
    desc:    "En quête de sens et d'inspiration",
    bg:      "from-violet-950/80 via-purple-950/50 to-zinc-950",
    radial:  "rgba(167,139,250,0.12)",
    border:  "border-violet-900/60",
    hover:   "hover:border-violet-500/40",
    glow:    "mood-glow-violet",
    accent:  "text-violet-400/70",
    char:    "🌫",
  },
  {
    emoji:   "⚡",
    label:   "Énergique",
    desc:    "Prêt·e pour quelque chose d'intense",
    bg:      "from-orange-950/80 via-red-950/40 to-zinc-950",
    radial:  "rgba(251,146,60,0.14)",
    border:  "border-orange-900/60",
    hover:   "hover:border-orange-500/40",
    glow:    "mood-glow-orange",
    accent:  "text-orange-400/70",
    char:    "🔥",
  },
];

export default function MoodSection() {
  return (
    <section id="moods" className="section-wrapper px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">

        {/* En-tête */}
        <div className="text-center mb-14 sm:mb-18">
          <p className="section-label mb-4">Pour quel mood ?</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Ça commence par{" "}
            <span className="gradient-text">toi.</span>
          </h2>
          <p className="text-zinc-400 text-base max-w-md mx-auto leading-relaxed">
            Peu importe comment tu te sens — MoodCiné trouve le film
            qui résonne avec ton état d&apos;esprit du moment.
          </p>
        </div>

        {/* Grille moods */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {MOODS.map((mood) => (
            <div
              key={mood.label}
              className={`group relative p-5 sm:p-7 rounded-2xl bg-gradient-to-br ${mood.bg} border ${mood.border} ${mood.hover} ${mood.glow} transition-all duration-350 cursor-default overflow-hidden`}
            >
              {/* Glow radial top-right au hover */}
              <div
                className="absolute -top-6 -right-6 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse, ${mood.radial} 0%, transparent 70%)` }}
              />

              {/* Caractère décoratif en fond */}
              <div className={`absolute bottom-3 right-4 text-5xl sm:text-6xl select-none pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity duration-400 ${mood.accent}`}>
                {mood.char}
              </div>

              {/* Emoji */}
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 transition-all duration-350 group-hover:scale-115 inline-block relative z-10">
                {mood.emoji}
              </div>

              {/* Contenu */}
              <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 tracking-tight relative z-10">
                {mood.label}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 group-hover:text-zinc-400 leading-relaxed transition-colors duration-300 relative z-10">
                {mood.desc}
              </p>

              {/* Flèche hover */}
              <div className="absolute bottom-4 right-4 text-white/0 group-hover:text-white/20 transition-all duration-300 translate-x-1 group-hover:translate-x-0 text-sm">
                →
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-zinc-500 text-sm mb-4">
            Lequel correspond à ton soir ?
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 border border-white/[0.08] text-zinc-200 text-sm font-medium hover:border-amber-500/35 hover:text-white hover:bg-zinc-900/80 transition-all duration-200"
          >
            Analyser mon mood →
          </Link>
        </div>
      </div>
    </section>
  );
}
