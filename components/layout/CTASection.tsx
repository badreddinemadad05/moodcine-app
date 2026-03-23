import Link from "next/link";

export default function CTASection() {
  return (
    <section className="section-wrapper px-5 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="relative p-8 sm:p-14 rounded-3xl bg-zinc-900/70 border border-white/[0.07] text-center overflow-hidden">

          {/* ── Ambiance ── */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/6 rounded-full blur-3xl animate-pulse-glow" />
          </div>

          <div className="relative z-10">
            {/* Icône */}
            <div className="w-14 h-14 mx-auto mb-7 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-3xl shadow-2xl shadow-amber-500/25">
              🎬
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Prêt à trouver{" "}
              <span className="gradient-text">ton film du soir ?</span>
            </h2>

            <p className="text-zinc-400 text-base sm:text-lg mb-9 max-w-lg mx-auto leading-relaxed">
              Pas d&apos;inscription. Pas de catalogue à parcourir.
              Juste toi, ton mood, et le bon film — en 2 minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/chat"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-base transition-all duration-200 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                Commencer maintenant →
              </Link>
              <Link
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-2xl text-zinc-400 text-sm font-medium hover:text-white transition-colors duration-200"
              >
                Comment ça marche ?
              </Link>
            </div>

            {/* Garanties */}
            <div className="flex items-center justify-center gap-6 mt-8 text-zinc-600 text-xs">
              <span>✓ Gratuit</span>
              <span>✓ Sans inscription</span>
              <span>✓ Résultats instantanés</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
