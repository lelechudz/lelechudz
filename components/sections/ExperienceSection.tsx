import { GlassPanel } from "@/components/ui/GlassPanel";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col justify-center px-6 py-24 md:px-[72px]"
    >
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-amber">
        ⌐ 03 / EXPERIENCE ¬
      </div>
      <h2 className="mt-4 font-serif text-4xl md:text-6xl">Where I&apos;ve worked.</h2>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <GlassPanel ditherStrength="subtle" className="p-8">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-text-quiet">
            2026
          </div>
          <h3 className="font-sans text-2xl font-semibold md:text-3xl">
            Web Developer Intern (Full-Stack)
          </h3>
          <div className="font-mono text-sm text-accent-amber">Jairosoft Inc.</div>
          <ul className="mt-4 space-y-3 font-sans text-base leading-relaxed text-text-dim">
            <li>
              Selected for the core ELMS team after rapid onboarding; engineered complex
              Bubble.io workflows to automate educational administrative and tracking modules.
            </li>
            <li>
              Built dynamic data structures and relational databases for large-scale learning
              content; collaborated cross-functionally using Azure DevOps and Figma.
            </li>
          </ul>
        </GlassPanel>

        <GlassPanel ditherStrength="subtle" className="p-8">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-text-quiet">
            2015 – 2025
          </div>
          <h3 className="font-sans text-2xl font-semibold md:text-3xl">
            Computer Shop Attendant / Operator
          </h3>
          <div className="font-mono text-sm text-accent-violet">Nestrapper Computer Shop</div>
          <p className="mt-4 font-sans text-base leading-relaxed text-text-dim">
            Assembled custom PCs, installed operating systems and drivers, and provided
            technical support and customer service over a decade — the hands-on foundation.
          </p>
        </GlassPanel>
      </div>
    </section>
  );
}
