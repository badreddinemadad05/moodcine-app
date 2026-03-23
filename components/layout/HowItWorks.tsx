import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-wrapper px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">

        {/* ── En-tête ── */}
        <div className="text-center mb-16 sm:mb-20">
          <p className="section-label mb-4">Le processus</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            En 2 minutes, notre chatbot apprend à te connaître et te suggère
            le film fait pour toi ce soir.
          </p>
        </div>

        {/* ── Étapes ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <div
              key={step.id}
              className="group relative p-7 sm:p-9 rounded-2xl bg-zinc-900/60 border border-white/[0.06] hover:border-amber-500/20 hover:bg-zinc-900/80 transition-all duration-300"
            >
              {/* Grand numéro en arrière-plan */}
              <div className="absolute top-5 right-6 text-7xl sm:text-8xl font-black text-white/[0.04] select-none pointer-events-none leading-none group-hover:text-amber-500/6 transition-colors duration-300">
                {index + 1}
              </div>

              {/* Badge numéro */}
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-zinc-950 text-sm font-black mb-5 sm:mb-6 shadow-lg shadow-amber-500/20">
                {index + 1}
              </div>

              {/* Emoji */}
              <div className="text-3xl sm:text-4xl mb-4 sm:mb-5">{step.emoji}</div>

              {/* Contenu */}
              <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {step.description}
              </p>

              {/* Connecteur entre les étapes (desktop) */}
              {index < HOW_IT_WORKS_STEPS.length - 1 && (
                <div className="hidden md:block absolute top-[52px] -right-3 z-10">
                  <div className="w-6 h-px bg-zinc-700" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
