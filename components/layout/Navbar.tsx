import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-4 border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 group">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-zinc-950 font-black text-[10px] shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40 transition-shadow">
          MC
        </div>
        <span className="text-lg font-bold text-white tracking-tight">
          Mood<span className="text-amber-400">Ciné</span>
        </span>
      </Link>

      <div className="flex items-center gap-5 sm:gap-6">
        {/* Liens nav — desktop uniquement */}
        <Link
          href="#how-it-works"
          className="hidden sm:block text-sm text-zinc-400 hover:text-white transition-colors duration-200"
        >
          Comment ça marche
        </Link>
        <Link
          href="#moods"
          className="hidden sm:block text-sm text-zinc-400 hover:text-white transition-colors duration-200"
        >
          Moods
        </Link>
        <Link
          href="/about"
          className="hidden sm:block text-sm text-zinc-400 hover:text-white transition-colors duration-200"
        >
          À propos
        </Link>

        {/* CTA */}
        <Link
          href="/chat"
          className="relative inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 text-sm font-semibold transition-all duration-200 shadow-md shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="sm:hidden">Commencer</span>
          <span className="hidden sm:inline">Commencer →</span>
        </Link>
      </div>
    </nav>
  );
}
