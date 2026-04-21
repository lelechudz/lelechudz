import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS, isProjectSlug, getProject } from "@/lib/projects";
import { PhoneFrame } from "@/components/ui/PhoneFrame";

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

          {p.playStoreUrl ? (
            <div className="mt-12">
              <a
                href={p.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                aria-label={`Get ${p.title} on Google Play`}
                className="inline-flex items-center gap-3 rounded-sm border border-[var(--glass-stroke)] bg-[var(--glass-fill)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-text-primary transition hover:border-accent-amber hover:text-accent-amber"
                style={{ borderColor: p.accent }}
              >
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                >
                  <path
                    d="M3.6 2.4 14 12 3.6 21.6c-.4-.3-.6-.8-.6-1.3V3.7c0-.5.2-1 .6-1.3z"
                    fill="#32BBFF"
                  />
                  <path d="M14 12 17.6 8.4 20.2 9.9c1 .6 1 2 0 2.6L17.6 14 14 12z" fill="#FFBC00" />
                  <path d="M14 12 3.6 21.6c.4.3.9.4 1.4.1l12.6-7.7L14 12z" fill="#E63946" />
                  <path d="M14 12 17.6 8.4 5 .7C4.5.4 4 .5 3.6.8L14 12z" fill="#3BCC75" />
                </svg>
                Get it on Google Play ↗
              </a>
            </div>
          ) : null}
        </div>

        <div className="order-1 flex justify-center md:order-2">
          <PhoneFrame
            src={p.screen}
            alt={`${p.title} app screenshot`}
            accent={p.accent}
            priority
          />
        </div>
      </div>
    </main>
  );
}
