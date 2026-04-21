import { HeroCanvas } from "@/components/hero/HeroCanvas";
import { HeroHUD } from "@/components/hero/HeroHUD";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { PitchSection } from "@/components/sections/PitchSection";

export default function Home() {
  return (
    <>
      <Cursor />
      <ScrollProgressBar />

      <section className="relative h-[150vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <HeroCanvas />
          <HeroHUD />
        </div>
      </section>

      <PitchSection />
      <section id="projects" className="min-h-screen border-t border-[var(--glass-stroke)]"></section>
      <section id="experience" className="min-h-screen border-t border-[var(--glass-stroke)]"></section>
      <section id="education" className="min-h-screen border-t border-[var(--glass-stroke)]"></section>
      <section id="contact" className="min-h-screen border-t border-[var(--glass-stroke)]"></section>
    </>
  );
}
