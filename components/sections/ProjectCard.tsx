"use client";

import Link from "next/link";
import type { Project } from "@/lib/projects";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { ScrambleText } from "@/components/ui/ScrambleText";

interface Props {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: Props) {
  return (
    <article
      data-project-slug={project.slug}
      className="project-card relative mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-8 px-6 py-24 md:grid-cols-[1.1fr_0.9fr] md:px-12"
    >
      <div className="col-span-full flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-text-dim">
        <span>
          ⌐ 0{index + 1} / {project.status === "shipped" ? "SHIPPED" : "IN PROGRESS"} ¬
        </span>
        <span>{project.tagline}</span>
      </div>

      <div className="flex flex-col justify-center">
        <h3 className="font-sans text-5xl font-semibold tracking-tight md:text-7xl">
          <ScrambleText text={project.title} duration={400} />
        </h3>
        <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-text-dim md:text-lg">
          {project.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-sm border border-[var(--glass-stroke)] bg-[var(--glass-fill)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-text-primary"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-quiet">
                {m.label}
              </div>
              <div className="mt-1 font-sans text-xl font-semibold text-accent-amber md:text-2xl">
                {m.value}
              </div>
            </div>
          ))}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          data-cursor="hover"
          className="mt-12 inline-flex items-center gap-2 self-start border-b border-accent-amber pb-1 font-mono text-xs uppercase tracking-[0.2em] text-accent-amber transition-opacity hover:opacity-80"
        >
          Dive in <span aria-hidden>↗</span>
        </Link>
      </div>

      <div className="flex items-center justify-center">
        <PhoneFrame
          src={project.screen}
          alt={`${project.title} app screen`}
          accent={project.accent}
        />
      </div>
    </article>
  );
}
