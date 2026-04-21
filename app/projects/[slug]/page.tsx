import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS, isProjectSlug, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isProjectSlug(slug)) return {};
  const p = getProject(slug);
  return {
    title: `${p.title} — Lei Maboloc`,
    description: p.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isProjectSlug(slug)) notFound();
  const p = getProject(slug);

  return (
    <main className="mx-auto w-full max-w-[1200px] px-6 py-24 md:px-[72px] md:py-32">
      <Link
        href="/#projects"
        data-cursor="hover"
        className="mb-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-text-dim hover:text-accent-amber"
      >
        ← Back to constellation
      </Link>

      <div className="grid gap-16 md:grid-cols-[1fr_0.9fr]">
        <div className="order-2 md:order-1">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-text-quiet">
            {p.status === "shipped" ? "● Shipped" : "◌ In Progress"} · {p.tagline}
          </div>
          <h1 className="font-serif text-5xl leading-[0.95] tracking-[-0.02em] md:text-7xl">
            {p.title}
          </h1>
          <p className="mt-8 max-w-[56ch] text-lg leading-relaxed text-text-dim">
            {p.description}
          </p>

          <div className="mt-10">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-text-quiet">
              Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="border border-[var(--glass-stroke)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-text-dim"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {p.metrics.map((m) => (
              <div key={m.label}>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-quiet">
                  {m.label}
                </div>
                <div className="mt-1 font-serif text-2xl" style={{ color: p.accent }}>
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 md:order-2">
          <div
            className="relative aspect-[9/19.5] overflow-hidden rounded-[32px] border border-[var(--glass-stroke)] bg-[#0a0a12] shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
            style={{ boxShadow: `0 30px 80px ${p.accent}22, 0 0 60px ${p.accent}22` }}
          >
            <Image
              src={p.screen}
              alt={`${p.title} app screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}
