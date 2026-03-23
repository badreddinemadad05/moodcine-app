import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import HowItWorks from "@/components/layout/HowItWorks";
import MoodSection from "@/components/layout/MoodSection";
import CTASection from "@/components/layout/CTASection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <MoodSection />
      <CTASection />
      <Footer />
    </div>
  );
}
