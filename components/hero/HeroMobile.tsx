"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import { DitheredImage } from "@/components/ui/DitheredImage";

export function HeroMobile() {
  const [focusIdx, setFocusIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setFocusIdx((i) => (i + 1) % PROJECTS.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 grid grid-cols-2 gap-4 p-6 pt-24" style={{ perspective: "1200px" }}>
      {PROJECTS.map((p, i) => (
        <Link
          key={p.slug}
          href={`/projects/${p.slug}`}
          className="relative block"
          style={{
            transform: `rotateY(${i % 2 === 0 ? "10deg" : "-10deg"}) rotateX(-4deg)`,
            opacity: focusIdx === i ? 1 : 0.6,
            transition: "opacity 0.8s ease",
            boxShadow: focusIdx === i ? `0 10px 40px ${p.accent}66` : "none",
          }}
        >
          <DitheredImage
            src={p.screen}
            alt={p.title}
            width={540}
            height={1170}
            ditherSize={2}
            className="aspect-[9/19.5] w-full rounded-lg border border-[var(--glass-stroke)]"
          />
        </Link>
      ))}
    </div>
  );
}
