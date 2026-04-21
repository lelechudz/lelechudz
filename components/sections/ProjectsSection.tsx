"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { PROJECTS } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { useMotionPrefs } from "@/components/providers/MotionPrefsProvider";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotionPrefs();

  useEffect(() => {
    if (reducedMotion) return;
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0.3, y: 60 },
          {
            autoAlpha: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 30%",
              scrub: 0.8,
            },
          },
        );
        const screen = card.querySelector("[data-cursor='hover']");
        if (screen) {
          gsap.fromTo(
            screen,
            { rotateY: 15 },
            {
              rotateY: 0,
              ease: "power1.out",
              scrollTrigger: { trigger: card, start: "top 80%", end: "top 30%", scrub: 0.8 },
            },
          );
        }
      });
    }, el);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="projects" ref={containerRef} className="relative">
      <div className="mx-auto max-w-[1440px] px-6 pt-24 md:px-[72px]">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-amber">
          ⌐ 02 / FEATURED WORK ¬
        </div>
        <h2 className="mt-4 font-serif text-4xl leading-[1.05] md:text-6xl">
          Four shipped apps.
        </h2>
      </div>

      <div className="flex flex-col">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
