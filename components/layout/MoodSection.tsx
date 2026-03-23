const MOODS = [
  {
    emoji:  "😴",
    label:  "Fatigué·e",
    desc:   "Quelque chose de doux et enveloppant",
    color:  "from-blue-900/25 to-transparent",
    border: "hover:border-blue-500/20",
  },
  {
    emoji:  "😊",
    label:  "De bonne humeur",
    desc:   "Sur un nuage, envie de partager ça",
    color:  "from-amber-900/25 to-transparent",
    border: "hover:border-amber-500/20",
  },
  {
    emoji:  "😢",
    label:  "Mélancolique",
    desc:   "Besoin de laisser sortir quelque chose",
    color:  "from-indigo-900/25 to-transparent",
    border: "hover:border-indigo-500/20",
  },
  {
    emoji:  "😰",
    label:  "Stressé·e",
    desc:   "Besoin de décompresser et d'oublier",
    color:  "from-red-900/20 to-transparent",
    border: "hover:border-red-500/20",
  },
  {
    emoji:  "🌀",
    label:  "Perdu·e",
    desc:   "En quête de sens et d'inspiration",
    color:  "from-violet-900/25 to-transparent",
    border: "hover:border-violet-500/20",
  },
  {
    emoji:  "⚡",
    label:  "Énergique",
    desc:   "Prêt·e pour quelque chose d'intense",
    color:  "from-orange-900/25 to-transparent",
    border: "hover:border-orange-500/20",
  },
];

export default function MoodSection() {
  return (
    <section id="moods" className="section-wrapper px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">

        {/* ── En-tête ── */}
        <div className="text-center mb-14 sm:mb-18">
          <p className="section-label mb-4">Pour quel mood ?</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Ça commence par{" "}
            <span className="gradient-text">toi.</span>
          </h2>
          <p className="text-zinc-400 text-base max-w-md mx-auto leading-relaxed">
            Peu importe comment tu te sens — MoodCiné trouve le film
            qui résonne avec ton état d'esprit du moment.
          </p>
        </div>

        {/* ── Grille de moods ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {MOODS.map((mood) => (
            <div
              key={mood.label}
              className={`group relative p-5 sm:p-7 rounded-2xl bg-gradient-to-br ${mood.color} border border-white/[0.06] ${mood.border} transition-all duration-300 cursor-default hover:bg-zinc-900/40`}
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110 inline-block">
                {mood.emoji}
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-white mb-1">
                {mood.label}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                {mood.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ── CTA inline ── */}
        <div className="mt-10 text-center">
          <p className="text-zinc-500 text-sm mb-4">
            Lequel correspond à ton soir ?
          </p>
          <a
            href="/chat"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 border border-white/[0.08] text-zinc-200 text-sm font-medium hover:border-amber-500/30 hover:text-white transition-all duration-200"
          >
            Analyser mon mood →
          </a>
        </div>
      </div>
    </section>
  );
}
