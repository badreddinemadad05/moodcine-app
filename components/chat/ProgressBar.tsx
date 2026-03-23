interface ProgressBarProps {
  progress: number;      // 0-100
  totalSteps: number;
  currentStep: number;
}

export default function ProgressBar({ progress, totalSteps, currentStep }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      {/* Barre + label */}
      <div className="flex items-center gap-3">
        {/* Barre */}
        <div className="flex-1 h-1 bg-zinc-800/80 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Compteur */}
        <span className="shrink-0 text-zinc-500 text-xs tabular-nums">
          {currentStep}/{totalSteps}
        </span>
      </div>

      {/* Points indicateurs */}
      <div className="flex gap-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${
              i < currentStep
                ? "bg-amber-500"
                : i === currentStep
                  ? "bg-amber-500/40"
                  : "bg-zinc-800"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
