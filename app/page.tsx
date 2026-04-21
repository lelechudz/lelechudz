import { HeroCanvas } from "@/components/hero/HeroCanvas";
import { HeroHUD } from "@/components/hero/HeroHUD";
import { PitchSection } from "@/components/sections/PitchSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <main id="main">
        <section className="relative h-[150vh]">
          <div className="sticky top-0 h-screen overflow-hidden">
            <HeroCanvas />
            <HeroHUD />
          </div>
        </section>

        <PitchSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
