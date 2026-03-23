import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "MoodCiné — À propos du développeur",
  description:
    "Badreddine Madad, étudiant en informatique à l'Université de Namur. Découvrez le développeur derrière MoodCiné.",
};

// ─── Données du développeur ────────────────────────────────────────────────────

const LINKS = [
  {
    label: "GitHub",
    href:  "https://github.com/badreddinemadad05",
    icon:  "github",
  },
  {
    label: "LinkedIn",
    href:  "https://linkedin.com/in/badreddine-madad",
    icon:  "linkedin",
  },
  {
    label: "GitLab",
    href:  "https://gitlab.com/badreddinemadad05",
    icon:  "gitlab",
  },
];

const SKILLS = [
  {
    category: "Langages",
    emoji:    "💻",
    items:    ["Python", "Java", "C", "Rust", "TypeScript", "JavaScript"],
  },
  {
    category: "Informatique",
    emoji:    "🧠",
    items:    ["Algorithms", "Data Structures", "OOP", "Complexity Analysis", "Divide & Conquer", "Dynamic Programming"],
  },
  {
    category: "Web & Outils",
    emoji:    "🌐",
    items:    ["Next.js", "React", "Tailwind CSS", "Supabase", "Git", "GitHub"],
  },
];

// status: "live" | "wip" | "planned" | "done"
const PROJECTS = [
  // ─── Projets personnels ───────────────────────────────────────────────────
  {
    emoji:    "🎬",
    title:    "MoodCiné",
    desc:     "Application web full-stack de recommandation de films basée sur l'humeur. Interface conversationnelle en 6 étapes, algorithme de scoring multi-critères, panel admin protégé, architecture locale + Supabase interchangeable.",
    tags:     ["Next.js 15", "TypeScript", "Tailwind CSS", "Supabase", "Framer Motion"],
    context:  "Projet personnel",
    status:   "live"    as const,
    link:     "/",
    year:     "2026",
    featured: true,
  },
  {
    emoji:    "🤖",
    title:    "StudyAI",
    desc:     "Assistant d'étude intelligent : génération de fiches de révision, quiz adaptatifs et résumés à partir de tes cours. Intégration d'une API IA pour des réponses contextuelles et un mode Pomodoro intelligent.",
    tags:     ["Next.js", "API IA", "TypeScript", "PostgreSQL"],
    context:  "Projet personnel",
    status:   "wip"     as const,
    year:     "2026",
    featured: false,
  },
  {
    emoji:    "💸",
    title:    "PriceWatch Belgium",
    desc:     "Tracker de prix pour le e-commerce belge (Bol.com, Coolblue, Amazon BE). Alertes par email, historique des prix avec graphiques interactifs, scraping automatisé via cron jobs.",
    tags:     ["Node.js", "Puppeteer", "React", "Chart.js", "Cron"],
    context:  "Projet personnel",
    status:   "planned" as const,
    year:     "2026",
    featured: false,
  },
  {
    emoji:    "⚡",
    title:    "DevHub",
    desc:     "Portfolio de développeur dynamique avec activité GitHub en temps réel, vitrine de projets, stats de commits et blog technique en MDX. Design sombre premium, déployé sur Vercel.",
    tags:     ["Next.js", "GitHub API", "MDX", "Vercel"],
    context:  "Projet personnel",
    status:   "planned" as const,
    year:     "2026",
    featured: false,
  },
  // ─── Projets académiques ──────────────────────────────────────────────────
  {
    emoji:    "🎮",
    title:    "Full-Stack Video Game E-Commerce",
    desc:     "Application web full-stack pour vendre des jeux vidéo. Front-end et back-end complets avec base de données.",
    tags:     ["Full-Stack", "Web", "E-Commerce"],
    context:  "Cours TechnoWeb",
    status:   "done"    as const,
    year:     "2025",
    featured: false,
  },
  {
    emoji:    "🐑",
    title:    "AI Sheep Battle Game",
    desc:     "Simulation de bataille en équipe avec comportements IA de base. Applique les principes POO en Python.",
    tags:     ["Python", "IA", "POO", "Simulation"],
    context:  "Cours Python",
    status:   "done"    as const,
    year:     "2024",
    featured: false,
  },
  {
    emoji:    "🚇",
    title:    "Smart Vehicle Transport Simulation",
    desc:     "Simulation d'ascenseur et de métro automatisés avec routage intelligent. Interface graphique interactive en Processing/Java.",
    tags:     ["Processing", "Java", "GUI", "Simulation"],
    context:  "Cours Java",
    status:   "done"    as const,
    year:     "2024",
    featured: false,
  },
  {
    emoji:    "⚙️",
    title:    "Algorithmic Problem Solving",
    desc:     "Résolution de problèmes classiques : divide & conquer, greedy, generate-and-test, programmation dynamique + analyse de complexité.",
    tags:     ["Java", "Algorithmes", "Complexité"],
    context:  "Cours Algorithmes",
    status:   "done"    as const,
    year:     "2024",
    featured: false,
  },
];

const LANGUAGES  = ["Arabe", "Français", "Anglais", "Néerlandais"];
const STRENGTHS  = ["Hard-working", "Eye for detail", "Motivator & Leader"];
const COURSEWORK = ["Python", "Java", "C", "Algorithmes & Structures de données", "Programmation orientée objet"];

// ─── Icônes SVG inline ────────────────────────────────────────────────────────

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function GitlabIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 01-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 014.82 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0118.6 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.51L23 13.45a.84.84 0 01-.35.94z"/>
    </svg>
  );
}

const ICON_MAP = { github: GithubIcon, linkedin: LinkedinIcon, gitlab: GitlabIcon };

// ─── Sous-composants projets ──────────────────────────────────────────────────

type ProjectStatus = "live" | "wip" | "planned" | "done";

const STATUS_CONFIG: Record<ProjectStatus, { label: string; dot: string; pill: string }> = {
  live:    { label: "Live",      dot: "bg-emerald-400",  pill: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" },
  wip:     { label: "En cours",  dot: "bg-amber-400",    pill: "bg-amber-500/10   border-amber-500/20   text-amber-400" },
  planned: { label: "Planifié",  dot: "bg-zinc-500",     pill: "bg-zinc-800       border-zinc-700       text-zinc-400" },
  done:    { label: "Terminé",   dot: "bg-indigo-400",   pill: "bg-indigo-500/10  border-indigo-500/20  text-indigo-300" },
};

function StatusBadge({ status }: { status: ProjectStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-semibold ${cfg.pill}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

type ProjectData = typeof PROJECTS[number];

function PersonalProjectCard({ project }: { project: ProjectData }) {
  return (
    <div className="group p-5 sm:p-6 rounded-2xl bg-zinc-900/60 border border-white/[0.06] hover:border-white/[0.12] hover:bg-zinc-900/80 transition-all duration-300 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-2">
        <div className="w-10 h-10 rounded-xl bg-zinc-800 group-hover:bg-zinc-700/80 flex items-center justify-center text-lg transition-colors duration-300 shrink-0">
          {project.emoji}
        </div>
        <StatusBadge status={project.status} />
      </div>

      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <h3 className="text-white font-bold text-sm sm:text-base tracking-tight">{project.title}</h3>
          <span className="text-zinc-600 text-[10px]">{project.year}</span>
        </div>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{project.desc}</p>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 text-[10px] font-medium border border-white/[0.04]">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function AcademicProjectCard({ project }: { project: ProjectData }) {
  return (
    <div className="group flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-zinc-900/40 border border-white/[0.05] hover:border-white/[0.09] hover:bg-zinc-900/60 transition-all duration-300">
      <div className="w-10 h-10 rounded-xl bg-zinc-800/70 group-hover:bg-zinc-800 flex items-center justify-center text-lg shrink-0 transition-colors duration-300">
        {project.emoji}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3 className="text-white font-semibold text-sm tracking-tight">{project.title}</h3>
          <span className="px-2 py-0.5 rounded-full bg-zinc-800 border border-white/[0.06] text-zinc-500 text-[9px] font-medium uppercase tracking-wide shrink-0">
            {project.context}
          </span>
        </div>
        <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed mb-3">{project.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-md bg-zinc-800/60 text-zinc-500 text-[10px] font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <Navbar />

      <main className="pt-20">

        {/* ══════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════ */}
        <section className="relative flex flex-col items-center justify-center px-5 sm:px-8 pt-16 sm:pt-24 pb-16 text-center overflow-hidden">
          {/* Fond */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-gradient-to-b from-amber-500/6 to-transparent" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-7 rounded-full border border-amber-500/20 bg-amber-500/8 text-amber-400 text-xs font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Développeur MoodCiné
            </div>

            {/* Nom */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-[0.95] tracking-tight mb-4">
              Badreddine{" "}
              <span className="gradient-text">Madad</span>
            </h1>

            {/* Titre */}
            <p className="text-zinc-400 text-base sm:text-lg mb-3">
              BSc Computer Science · University of Namur
            </p>

            {/* Localisation */}
            <div className="inline-flex items-center gap-1.5 text-zinc-500 text-sm mb-8">
              <span>📍</span>
              <span>Namur, Belgium · 2023–2027</span>
            </div>

            {/* Liens sociaux */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {LINKS.map(({ label, href, icon }) => {
                const Icon = ICON_MAP[icon as keyof typeof ICON_MAP];
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.08] bg-zinc-900/60 text-zinc-300 text-sm font-medium hover:border-amber-500/30 hover:text-white hover:bg-zinc-900 transition-all duration-200 active:scale-[0.97]"
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            ABOUT + WHY MOODCINÉ
        ══════════════════════════════════════════════════════ */}
        <section className="section-wrapper px-5 sm:px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">

            {/* Qui suis-je */}
            <div className="p-7 sm:p-8 rounded-2xl bg-zinc-900/60 border border-white/[0.06]">
              <p className="section-label mb-4">Qui suis-je ?</p>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-4">
                Étudiant passionné par le code.
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-4">
                Je suis en 2e année de Bachelier en Sciences Informatiques à l'Université de Namur.
                J'aime construire des projets concrets qui mêlent logique, design et expérience utilisateur.
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Mon parcours combine les fondamentaux de l'algorithmique avec des projets web full-stack modernes.
                Je suis toujours en train d'apprendre quelque chose de nouveau.
              </p>
            </div>

            {/* Pourquoi MoodCiné */}
            <div className="relative p-7 sm:p-8 rounded-2xl bg-zinc-900/60 border border-amber-500/15 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
              <p className="section-label mb-4">Le projet</p>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-4">
                Pourquoi j'ai créé{" "}
                <span className="gradient-text">MoodCiné</span> ?
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-4">
                J'avais envie de créer une vraie app full-stack du début à la fin — pas juste un tutoriel.
                L'idée : recommander des films selon l'humeur du moment, une approche plus humaine que les algorithmes classiques.
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed">
                MoodCiné m'a permis de maîtriser Next.js, TypeScript, Tailwind CSS, Supabase et Framer Motion
                dans un contexte réaliste — architecture propre, base de données, panel admin, design premium.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            COMPÉTENCES TECHNIQUES
        ══════════════════════════════════════════════════════ */}
        <section className="section-wrapper px-5 sm:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10 sm:mb-12">
              <p className="section-label mb-3">Stack & compétences</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                Ce avec quoi je travaille.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {SKILLS.map((group) => (
                <div
                  key={group.category}
                  className="p-6 rounded-2xl bg-zinc-900/60 border border-white/[0.06] hover:border-white/[0.10] transition-colors duration-300"
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="text-xl">{group.emoji}</span>
                    <span className="text-white font-semibold text-sm">{group.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300 text-xs font-medium border border-white/[0.05]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            PROJETS
        ══════════════════════════════════════════════════════ */}
        <section className="section-wrapper px-5 sm:px-8">
          <div className="max-w-5xl mx-auto">

            {/* Header */}
            <div className="mb-10 sm:mb-12">
              <p className="section-label mb-3">Projets</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                Ce que j&apos;ai construit.
              </h2>
            </div>

            {/* ── Projet vedette : MoodCiné ─────────────────────── */}
            {(() => {
              const featured = PROJECTS.find((p) => p.featured)!;
              return (
                <div className="relative mb-5 group rounded-2xl bg-zinc-900/70 border border-amber-500/20 overflow-hidden hover:border-amber-500/35 transition-all duration-300">
                  {/* Ligne supérieure dorée */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
                  {/* Lueur fond */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent pointer-events-none" />

                  <div className="relative z-10 p-7 sm:p-9 flex flex-col sm:flex-row gap-6 sm:gap-10">
                    {/* Icône + badges */}
                    <div className="flex flex-col items-start gap-3 shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-3xl">
                        {featured.emoji}
                      </div>
                      <StatusBadge status={featured.status} />
                    </div>

                    {/* Contenu */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-white font-black text-xl sm:text-2xl tracking-tight">
                          {featured.title}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/12 border border-amber-500/20 text-amber-400/90 text-[10px] font-semibold uppercase tracking-wider">
                          {featured.context}
                        </span>
                        <span className="text-zinc-600 text-xs">{featured.year}</span>
                      </div>

                      <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-5">
                        {featured.desc}
                      </p>

                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex flex-wrap gap-1.5">
                          {featured.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300 text-xs font-medium border border-white/[0.06]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        {featured.link && (
                          <Link
                            href={featured.link}
                            className="ml-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] shrink-0"
                          >
                            Voir le projet →
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* ── Sous-titre : Projets personnels en cours ────────── */}
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3 mt-8">
              À venir · Projets personnels
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {PROJECTS.filter((p) => !p.featured && p.context === "Projet personnel").map((project) => (
                <PersonalProjectCard key={project.title} project={project} />
              ))}
            </div>

            {/* ── Sous-titre : Projets académiques ────────────────── */}
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
              Académique · UNamur
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROJECTS.filter((p) => p.context !== "Projet personnel").map((project) => (
                <AcademicProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            FORMATION + PROFIL
        ══════════════════════════════════════════════════════ */}
        <section className="section-wrapper px-5 sm:px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">

            {/* Formation */}
            <div className="p-7 sm:p-8 rounded-2xl bg-zinc-900/60 border border-white/[0.06]">
              <p className="section-label mb-4">Formation</p>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-2xl shrink-0">
                  🎓
                </div>
                <div>
                  <p className="text-white font-bold text-base sm:text-lg leading-tight">
                    BSc in Computer Science
                  </p>
                  <p className="text-amber-400/80 text-sm mt-0.5">University of Namur</p>
                  <p className="text-zinc-500 text-xs mt-1">2023 – juin 2027 (expected)</p>
                </div>
              </div>

              {/* Coursework */}
              <div>
                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-3">Cours pertinents</p>
                <div className="flex flex-wrap gap-2">
                  {COURSEWORK.map((course) => (
                    <span
                      key={course}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 text-xs font-medium border border-white/[0.05]"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Langues + Forces */}
            <div className="flex flex-col gap-5">

              {/* Langues */}
              <div className="flex-1 p-6 sm:p-7 rounded-2xl bg-zinc-900/60 border border-white/[0.06]">
                <p className="section-label mb-4">Langues</p>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((lang) => (
                    <span
                      key={lang}
                      className="px-3 py-1.5 rounded-full bg-zinc-800 border border-white/[0.06] text-zinc-200 text-sm font-medium"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Forces */}
              <div className="flex-1 p-6 sm:p-7 rounded-2xl bg-zinc-900/60 border border-white/[0.06]">
                <p className="section-label mb-4">Forces</p>
                <div className="flex flex-col gap-2.5">
                  {STRENGTHS.map((strength) => (
                    <div key={strength} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      <span className="text-zinc-200 text-sm font-medium">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            PHILOSOPHIE
        ══════════════════════════════════════════════════════ */}
        <section className="py-14 sm:py-20 px-5 sm:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="relative inline-block">
              <p className="text-amber-400/30 text-[80px] sm:text-[100px] font-black leading-none select-none absolute -top-6 left-1/2 -translate-x-1/2">
                "
              </p>
              <blockquote className="relative text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight pt-8">
                It&apos;s a long road{" "}
                <span className="gradient-text">but it&apos;s worth it.</span>
              </blockquote>
            </div>
            <p className="text-zinc-600 text-sm mt-6">— Badreddine Madad</p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            CTA / CONTACT
        ══════════════════════════════════════════════════════ */}
        <section className="pb-16 sm:pb-24 px-5 sm:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="relative p-8 sm:p-12 rounded-3xl bg-zinc-900/70 border border-white/[0.07] text-center overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/4 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10">
                <p className="section-label mb-4">Me contacter</p>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
                  Intéressé par mon travail ?
                </h2>
                <p className="text-zinc-400 text-sm sm:text-base mb-8 max-w-lg mx-auto leading-relaxed">
                  Je suis ouvert aux opportunités de stage, aux collaborations et aux retours sur mes projets.
                  Retrouve-moi sur mes profils ou essaie MoodCiné !
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  {/* CTA principal */}
                  <Link
                    href="/chat"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm transition-all duration-200 shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    🎬 Essayer MoodCiné
                  </Link>

                  {/* Liens sociaux */}
                  {LINKS.map(({ label, href, icon }) => {
                    const Icon = ICON_MAP[icon as keyof typeof ICON_MAP];
                    return (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl border border-white/[0.08] text-zinc-400 text-sm font-medium hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-200 active:scale-[0.97]"
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
