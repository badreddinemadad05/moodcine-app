export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5 sm:gap-3">
      {/* Avatar bot */}
      <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-zinc-950 text-[9px] sm:text-[10px] font-black shadow-lg shadow-amber-500/20">
        MC
      </div>

      {/* Bulle de frappe */}
      <div className="px-4 py-3.5 rounded-2xl rounded-bl-md bg-zinc-900 border border-white/[0.07] flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-zinc-500"
            style={{
              animation: "dot-bounce 1.2s ease-in-out infinite",
              animationDelay: `${i * 180}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
