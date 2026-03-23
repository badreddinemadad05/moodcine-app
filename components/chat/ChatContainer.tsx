"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { CHAT_FLOW, CHAT_INTRO, CHAT_OUTRO } from "@/lib/chat-flow";
import type { ChatMessageType, ChatAnswers, ChatOption } from "@/types/chat";
import ChatMessage from "./ChatMessage";
import ChatOptions from "./ChatOptions";
import ProgressBar from "./ProgressBar";
import TypingIndicator from "./TypingIndicator";
import ChatTransition from "./ChatTransition";

function createMessage(
  role: "bot" | "user",
  content: string,
  emoji?: string
): ChatMessageType {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    role,
    content,
    emoji,
  };
}

const DELAY_INTRO   = 900;
const DELAY_FIRST_Q = 800;
const DELAY_NEXT_Q  = 1000;
const DELAY_OUTRO   = 1200;

export default function ChatContainer() {
  const [messages, setMessages]             = useState<ChatMessageType[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers]               = useState<ChatAnswers>({});
  const [isTyping, setIsTyping]             = useState(false);
  const [isComplete, setIsComplete]         = useState(false);
  const [showOptions, setShowOptions]       = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll automatique
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, showOptions, isComplete]);

  // Sauvegarde localStorage
  useEffect(() => {
    if (isComplete && Object.keys(answers).length > 0) {
      localStorage.setItem("moodcine-answers", JSON.stringify(answers));
    }
  }, [isComplete, answers]);

  // Séquence d'introduction
  useEffect(() => {
    let alive = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const after = (ms: number, fn: () => void) => {
      const id = setTimeout(() => { if (alive) fn(); }, ms);
      timers.push(id);
    };

    setIsTyping(true);
    after(DELAY_INTRO, () => {
      setMessages([createMessage("bot", CHAT_INTRO)]);
      after(DELAY_FIRST_Q, () => {
        setMessages((prev) => [...prev, createMessage("bot", CHAT_FLOW[0].question)]);
        setIsTyping(false);
        setShowOptions(true);
      });
    });

    return () => { alive = false; timers.forEach(clearTimeout); };
  }, []);

  const handleOptionSelect = useCallback(
    (option: ChatOption) => {
      const currentStep = CHAT_FLOW[currentStepIndex];
      const isLastStep  = currentStepIndex === CHAT_FLOW.length - 1;

      setShowOptions(false);
      setAnswers((prev) => ({ ...prev, [currentStep.id]: option }));
      setMessages((prev) => [...prev, createMessage("user", option.label, option.emoji)]);
      setIsTyping(true);

      if (isLastStep) {
        const t = setTimeout(() => {
          setMessages((prev) => [...prev, createMessage("bot", CHAT_OUTRO)]);
          setIsTyping(false);
          setTimeout(() => setIsComplete(true), 600);
        }, DELAY_OUTRO);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          const nextStep = CHAT_FLOW[currentStepIndex + 1];
          setMessages((prev) => [...prev, createMessage("bot", nextStep.question)]);
          setCurrentStepIndex((prev) => prev + 1);
          setIsTyping(false);
          setShowOptions(true);
        }, DELAY_NEXT_Q);
        return () => clearTimeout(t);
      }
    },
    [currentStepIndex]
  );

  const progress = isComplete
    ? 100
    : Math.round((currentStepIndex / CHAT_FLOW.length) * 100);

  const statusLabel = isComplete
    ? "Analyse terminée ✓"
    : isTyping
      ? "En train d'écrire…"
      : "En ligne";

  return (
    <>
      {/* Écran de transition vers /results */}
      {isComplete && <ChatTransition />}

      <div className="flex flex-col h-dvh bg-zinc-950">

        {/* ── Header fixe ── */}
        <header className="shrink-0 px-4 pt-4 sm:pt-5 pb-3 sm:pb-4 border-b border-white/[0.06] bg-zinc-950/90 backdrop-blur-xl">
          <div className="max-w-2xl mx-auto">
            {/* Top row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-zinc-950 font-black text-xs shadow-lg shadow-amber-500/25">
                    MC
                  </div>
                  {/* Point de statut */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-zinc-950" />
                </div>

                <div>
                  <p className="text-white font-bold text-sm leading-none mb-0.5 tracking-tight">
                    MoodCiné
                  </p>
                  <p className="text-zinc-500 text-xs">{statusLabel}</p>
                </div>
              </div>

              {/* Lien retour */}
              <Link
                href="/"
                className="flex items-center gap-1.5 text-zinc-600 hover:text-zinc-400 text-xs transition-colors py-1 px-2 -mr-2 rounded-lg hover:bg-zinc-900"
              >
                ← Accueil
              </Link>
            </div>

            {/* Barre de progression */}
            <ProgressBar
              progress={progress}
              totalSteps={CHAT_FLOW.length}
              currentStep={currentStepIndex}
            />
          </div>
        </header>

        {/* ── Zone de messages ── */}
        <main className="flex-1 overflow-y-auto overscroll-none">
          <div className="max-w-2xl mx-auto px-3 sm:px-4 py-5 sm:py-7 pb-safe flex flex-col gap-4 sm:gap-5">

            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {isTyping && <TypingIndicator />}

            {showOptions && !isTyping && !isComplete && (
              <ChatOptions
                options={CHAT_FLOW[currentStepIndex].options}
                onSelect={handleOptionSelect}
              />
            )}

            <div ref={bottomRef} />
          </div>
        </main>
      </div>
    </>
  );
}
