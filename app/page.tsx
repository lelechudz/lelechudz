import { HeroCanvas } from "@/components/hero/HeroCanvas";
import { HeroHUD } from "@/components/hero/HeroHUD";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { PitchSection } from "@/components/sections/PitchSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

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
      <ProjectsSection />
      <section id="experience" className="min-h-screen border-t border-[var(--glass-stroke)]"></section>
      <section id="education" className="min-h-screen border-t border-[var(--glass-stroke)]"></section>
      <section id="contact" className="min-h-screen border-t border-[var(--glass-stroke)]"></section>
    </>
  );
}
