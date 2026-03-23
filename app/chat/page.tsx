import type { Metadata } from "next";
import ChatContainer from "@/components/chat/ChatContainer";

export const metadata: Metadata = {
  title: "MoodCiné — Trouve ton film du soir",
  description:
    "Réponds à quelques questions et découvre le film parfait selon ton mood du moment.",
};

// La page est un Server Component qui charge le Client Component ChatContainer
export default function ChatPage() {
  return <ChatContainer />;
}
