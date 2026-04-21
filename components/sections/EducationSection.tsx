import { GlassPanel } from "@/components/ui/GlassPanel";

export function EducationSection() {
  return (
    <section
      id="education"
      className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col justify-center px-6 py-24 md:px-[72px]"
    >
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-amber">
        ⌐ 04 / EDUCATION &amp; LEADERSHIP ¬
      </div>
      <h2 className="mt-4 font-serif text-4xl md:text-6xl">Foundation.</h2>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <GlassPanel ditherStrength="subtle" className="p-6">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-text-quiet">
            DEGREE
          </div>
          <h3 className="font-sans text-xl font-semibold">B.S. Computer Engineering</h3>
          <div className="font-sans text-sm text-text-dim">University of Mindanao</div>
          <div className="mt-4 font-mono text-accent-amber">CGPA 3.27</div>
          <p className="mt-4 font-sans text-sm leading-relaxed text-text-dim">
            Java OOP, Data Structures &amp; Algorithms, Software Design, Responsive Web Design.
          </p>
        </GlassPanel>

        <GlassPanel ditherStrength="subtle" className="p-6">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-text-quiet">
            SCHOLARSHIPS
          </div>
          <ul className="space-y-3 font-sans text-sm text-text-dim">
            <li>
              <div className="font-semibold text-text-primary">DOST Full Scholarship</div>
              Department of Science and Technology, Philippines
            </li>
            <li>
              <div className="font-semibold text-text-primary">Ateneo de Davao SHS Full Scholarship</div>
              Senior High School (full tuition + allowance)
            </li>
          </ul>
        </GlassPanel>

        <GlassPanel ditherStrength="subtle" className="p-6">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-text-quiet">
            LEADERSHIP
          </div>
          <ul className="space-y-3 font-sans text-sm text-text-dim">
            <li>
              <div className="font-semibold text-text-primary">Team Lead × 3</div>
              Hotel Management, Music Player, POS System — all graded 98–100%.
            </li>
            <li>
              <div className="font-semibold text-text-primary">PyCon Davao 2025</div>
              Volunteer Technical Team
            </li>
            <li>
              <div className="font-semibold text-text-primary">Build with AI 2025</div>
              GDG Davao attendee
            </li>
          </ul>
        </GlassPanel>
      </div>
    </section>
  );
}
