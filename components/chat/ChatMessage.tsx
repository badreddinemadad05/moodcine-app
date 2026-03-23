import type { ChatMessageType } from "@/types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === "bot";

  if (isBot) {
    return (
      <div className="flex items-end gap-2.5 sm:gap-3 animate-message-in">
        {/* Avatar bot */}
        <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-zinc-950 text-[9px] sm:text-[10px] font-black shadow-lg shadow-amber-500/20">
          MC
        </div>

        {/* Bulle */}
        <div className="max-w-[84%] sm:max-w-[76%]">
          <div className="relative px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl rounded-bl-md bg-zinc-900 border border-white/[0.07]">
            {/* Ligne accent gauche */}
            <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-r-full bg-gradient-to-b from-amber-500/60 to-orange-500/40" />
            <p className="text-zinc-100 text-sm sm:text-base leading-relaxed pl-1">
              {message.content}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Message utilisateur
  return (
    <div className="flex items-end justify-end gap-2.5 animate-message-in">
      <div className="max-w-[80%] sm:max-w-[72%]">
        <div className="px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl rounded-br-md bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/15">
          <div className="flex items-center gap-2.5">
            {message.emoji && (
              <span className="text-lg sm:text-xl shrink-0">{message.emoji}</span>
            )}
            <p className="text-zinc-950 font-semibold text-sm sm:text-base leading-relaxed">
              {message.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
