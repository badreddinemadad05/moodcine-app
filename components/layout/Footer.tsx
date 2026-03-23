import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Comment ça marche", href: "#how-it-works" },
  { label: "Moods",             href: "#moods" },
  { label: "Commencer",         href: "/chat" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.05] pt-12 pb-10 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">

        {/* ── Corps ── */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">

          {/* Marque */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 group mb-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-zinc-950 font-black text-[10px]">
                MC
              </div>
              <span className="text-lg font-bold text-white">
                Mood<span className="text-amber-400">Ciné</span>
              </span>
            </Link>
            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
              Le bon film, au bon moment — basé sur ton humeur, pas sur un algorithme.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-5 sm:gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-zinc-500 hover:text-white transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ── Séparateur ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-6" />

        {/* ── Copyright ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-zinc-600 text-xs">
          <p>© 2026 {APP_NAME}. Fait avec ❤️ et beaucoup de pop-corn.</p>
          <p className="text-zinc-700">Projet portfolio — stack Next.js + Supabase</p>
        </div>
      </div>
    </footer>
  );
}
