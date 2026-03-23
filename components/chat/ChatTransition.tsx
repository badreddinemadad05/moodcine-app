"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const STEPS = [
  { icon: "🎭", text: "Analyse de ton mood…" },
  { icon: "🎬", text: "On prépare ta sélection…" },
  { icon: "✨", text: "Ta sélection est prête !" },
];

const STEP_DURATION  = 850;
const REDIRECT_DELAY = 500;

export default function ChatTransition() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress]   = useState(0);
  const [done, setDone]           = useState(false);

  useEffect(() => {
    let alive = true;
    const total = STEPS.length;
    const totalDuration = STEP_DURATION * total + REDIRECT_DELAY;

    // Avance les étapes
    const stepInterval = setInterval(() => {
      if (!alive) return;
      setStepIndex((prev) => {
        const next = prev + 1;
        if (next >= total) {
          clearInterval(stepInterval);
          setDone(true);
          setTimeout(() => { if (alive) router.push("/results"); }, REDIRECT_DELAY);
        }
        return Math.min(next, total - 1);
      });
    }, STEP_DURATION);

    // Progresse la barre
    const tick = totalDuration / 100;
    const progressInterval = setInterval(() => {
      if (!alive) return;
      setProgress((p) => Math.min(p + 1, 100));
    }, tick);

    return () => {
      alive = false;
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [router]);

  const step = STEPS[stepIndex];

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950 flex flex-col items-center justify-center px-6">
      {/* Fond cinématographique */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] bg-amber-500/5 rounded-full blur-[100px] animate-pulse-glow" />
      </div>

      <div className="relative flex flex-col items-center gap-10 w-full max-w-xs">
        {/* Icône animée */}
        <div
          key={stepIndex}
          className="text-5xl animate-scale-in"
        >
          {step.icon}
        </div>

        {/* Texte séquentiel */}
        <div className="text-center">
          <p
            key={stepIndex}
            className="text-white text-xl sm:text-2xl font-bold tracking-tight animate-fade-up"
          >
            {step.text}
          </p>
          {done && (
            <p className="text-zinc-500 text-sm mt-2 animate-fade-in">
              Redirection en cours…
            </p>
          )}
        </div>

        {/* Barre de progression */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-2">
            {STEPS.map((s, i) => (
              <div
                key={i}
                className={`flex items-center gap-1.5 text-xs transition-colors duration-300 ${
                  i <= stepIndex ? "text-amber-400" : "text-zinc-700"
                }`}
              >
                <span>{s.icon}</span>
              </div>
            ))}
          </div>
          <div className="h-1 w-full bg-zinc-800/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
