import type { ChatOption } from "@/types/chat";

interface ChatOptionsProps {
  options: ChatOption[];
  onSelect: (option: ChatOption) => void;
}

export default function ChatOptions({ options, onSelect }: ChatOptionsProps) {
  return (
    <div className="sm:pl-11 animate-fade-up">
      {/* Invite */}
      <p className="text-zinc-600 text-xs mb-3 ml-0.5">Choisis une réponse ↓</p>

      {/* Grille de boutons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 stagger">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option)}
            className="
              group relative flex items-center gap-3 w-full
              px-4 py-3.5 rounded-xl
              border border-white/[0.07] bg-zinc-900/80
              text-left text-sm text-zinc-300
              hover:border-amber-500/30 hover:bg-zinc-900 hover:text-white
              active:scale-[0.98]
              transition-all duration-200
              animate-fade-up
            "
          >
            {/* Emoji dans un carré */}
            <span className="shrink-0 w-9 h-9 rounded-lg bg-zinc-800 group-hover:bg-amber-500/10 flex items-center justify-center text-base transition-colors duration-200">
              {option.emoji}
            </span>

            {/* Label */}
            <span className="font-medium leading-snug flex-1">{option.label}</span>

            {/* Flèche */}
            <span className="shrink-0 text-zinc-700 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all duration-200 text-xs">
              →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
