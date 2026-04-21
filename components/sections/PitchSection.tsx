import { GlassPanel } from "@/components/ui/GlassPanel";

const SKILLS = [
  "Flutter",
  "Dart",
  "Android Native",
  "Platform Channels",
  "Firebase",
  "TensorFlow Lite",
  "YOLOv8",
  "MySQL",
  "REST APIs",
  "Python",
  "Java",
  "C++",
];

export function PitchSection() {
  return (
    <section
      id="pitch"
      className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col justify-center px-6 py-24 md:px-[72px]"
    >
      <div className="max-w-3xl">
        <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-amber">
          ⌐ 01 / PITCH ¬
        </div>
        <h2 className="font-serif text-4xl leading-[1.1] text-text-primary md:text-6xl">
          Mobile developer shipping production apps —
          <span className="text-accent-amber"> Flutter, on-device ML, and native audio.</span>
        </h2>
        <p className="mt-8 max-w-2xl font-sans text-lg leading-relaxed text-text-dim md:text-xl">
          Computer Engineering student at the University of Mindanao. Four shipped apps
          including a live Play Store release with 1k+ installs. Interned at Jairosoft
          building Bubble.io workflows for educational LMS modules. Led three
          full-stack university teams that all graded 98–100%.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {SKILLS.map((s) => (
            <GlassPanel
              key={s}
              ditherStrength="subtle"
              className="px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-text-primary"
            >
              {s}
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
