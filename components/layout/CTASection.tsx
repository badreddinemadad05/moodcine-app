import Link from "next/link";

const CTA_BG =
  "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=1920&q=80";

export default function CTASection() {
  return (
    <section className="section-wrapper px-5 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden text-center"
          style={{
            backgroundImage: `url("${CTA_BG}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlays */}
          <div className="absolute inset-0 bg-zinc-950/82" />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-950/30 via-transparent to-zinc-950/50" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] pointer-events-none animate-pulse-glow"
            style={{ background: "radial-gradient(ellipse, rgba(245,158,11,0.08) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 p-10 sm:p-16">
            {/* Icône */}
            <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-3xl shadow-2xl shadow-amber-500/30 glow-badge">
              🎬
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-5">
              Prêt à trouver{" "}
              <span className="gradient-text">ton film du soir ?</span>
            </h2>

            <p className="text-zinc-400 text-base sm:text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              Pas d&apos;inscription. Pas de catalogue à parcourir.
              Juste toi, ton mood, et le bon film — en 2 minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/chat"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-base transition-all duration-200 shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.02] active:scale-[0.98]"
              >
                Commencer maintenant →
              </Link>
              <Link
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-2xl border border-white/12 text-zinc-400 text-sm font-medium hover:text-white hover:border-white/25 hover:bg-white/5 transition-all duration-200"
              >
                Comment ça marche ?
              </Link>
            </div>

            {/* Garanties */}
            <div className="flex items-center justify-center gap-6 mt-9 text-zinc-500 text-xs">
              <span>✓ Gratuit</span>
              <span>·</span>
              <span>✓ Sans inscription</span>
              <span>·</span>
              <span>✓ Résultats instantanés</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
