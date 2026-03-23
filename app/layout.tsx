import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Couleur de la barre navigateur sur mobile + configuration viewport
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09090b",
};

export const metadata: Metadata = {
  title: "MoodCiné — Le film parfait pour ton mood",
  description:
    "Découvre le film parfait selon ton humeur du moment. Un chatbot chaleureux t'accompagne pour une recommandation cinéma 100% personnalisée.",
  keywords: ["films", "recommandation", "humeur", "mood", "cinéma", "chatbot"],
  authors: [{ name: "MoodCiné" }],
  openGraph: {
    title: "MoodCiné — Le film parfait pour ton mood",
    description: "Dis-nous comment tu te sens, on te dit quoi regarder.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-zinc-950 text-zinc-100">{children}</body>
    </html>
  );
}
