import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-wrapper px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">

        {/* En-tête */}
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

        {/* Étapes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 relative">
          {/* Ligne de connexion desktop */}
          <div className="hidden md:block absolute top-[52px] left-[calc(16.66%+20px)] right-[calc(16.66%+20px)] h-px bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 pointer-events-none" />

          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <div
              key={step.id}
              className="group relative p-7 sm:p-9 rounded-2xl bg-zinc-900/50 border border-white/[0.05] hover:border-amber-500/20 hover:bg-zinc-900/70 transition-all duration-300 overflow-hidden"
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              {/* Grand numéro déco */}
              <div className="absolute top-4 right-5 text-8xl sm:text-9xl font-black text-white/[0.03] select-none pointer-events-none leading-none group-hover:text-amber-500/5 transition-colors duration-400">
                {index + 1}
              </div>

              {/* Badge numéro */}
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-zinc-950 text-sm font-black mb-5 shadow-xl shadow-amber-500/25 glow-badge z-10">
                {index + 1}
              </div>

              {/* Emoji */}
              <div className="text-3xl sm:text-4xl mb-4 sm:mb-5 relative z-10 transition-transform duration-300 group-hover:scale-110 inline-block">
                {step.emoji}
              </div>

              {/* Contenu */}
              <h3 className="text-lg font-bold text-white mb-3 tracking-tight relative z-10">
                {step.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed relative z-10">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
