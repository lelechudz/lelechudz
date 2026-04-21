"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { PROJECTS } from "@/lib/projects";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { HeroMobilePhone } from "./HeroMobilePhone";
import { useMotionPrefs } from "@/components/providers/MotionPrefsProvider";

export function HeroMobile() {
  const { reducedMotion } = useMotionPrefs();
  const [focusIdx, setFocusIdx] = useState(0);
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(
        [d.getHours(), d.getMinutes()]
          .map((n) => String(n).padStart(2, "0"))
          .join(":"),
      );
    };
    tick();
    const t = setInterval(tick, 60_000);
    if (reducedMotion) {
      return () => clearInterval(t);
    }
    const id = setInterval(() => setFocusIdx((i) => (i + 1) % PROJECTS.length), 4000);
    return () => {
      clearInterval(t);
      clearInterval(id);
    };
  }, [reducedMotion]);

  const current = PROJECTS[focusIdx] ?? PROJECTS[0]!;

  return (
    <div className="absolute inset-0 flex flex-col px-5 pb-5 pt-10">
      <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-text-dim">
        <span>⌐ DAVAO · {time} ¬</span>
        <span className="flex items-center gap-2 text-text-dim">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-status-ok" />
          AVAILABLE
        </span>
      </div>

      <div className="mt-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-dim">
          Mobile Developer
        </div>
        <h1 className="mt-1 font-sans text-[44px] font-semibold leading-[0.95] tracking-tight text-text-primary">
          <ScrambleText text="LEI MABOLOC" trigger="mount" duration={800} />
        </h1>
        <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-accent-amber">
          Flutter · Dart · 3D &amp; Shaders
        </div>
      </div>

      <div className="relative mt-2 h-[34vh] min-h-[180px]">
        <Canvas
          camera={{ position: [0, 0, 3.2], fov: 38 }}
          dpr={[1, 2]}
          frameloop={reducedMotion ? "demand" : "always"}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          aria-label={`3D mobile app preview: ${current.title}`}
        >
          <Environment preset="night" background={false} />
          <ambientLight intensity={0.25} />
          <pointLight color="#ffb347" position={[4, 3, 4]} intensity={22} />
          <pointLight color="#c66afd" position={[-4, -2, 3]} intensity={12} />
          <Suspense fallback={null}>
            <HeroMobilePhone
              projects={PROJECTS}
              accent={current.accent}
              focusIdx={focusIdx}
              reducedMotion={reducedMotion}
            />
          </Suspense>
        </Canvas>
      </div>
      <div
        className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300"
        style={{ color: current.accent }}
      >
        0{focusIdx + 1} · {current.title}
      </div>

      <div className="mt-3 grid flex-1 grid-cols-2 gap-3">
        {PROJECTS.map((p, i) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="relative flex min-h-0 flex-col"
            style={{
              opacity: focusIdx === i ? 1 : 0.55,
              transition: "opacity 0.6s ease",
            }}
          >
            <div
              className="relative min-h-0 flex-1 overflow-hidden rounded-md border border-[var(--glass-stroke)] bg-black"
              style={{
                boxShadow: focusIdx === i ? `0 6px 20px ${p.accent}66` : "none",
                transition: "box-shadow 0.5s ease",
                borderColor: focusIdx === i ? p.accent : undefined,
              }}
            >
              <Image
                src={p.screen}
                alt={p.title}
                fill
                sizes="(max-width: 767px) 45vw, 200px"
                className="object-cover"
              />
            </div>
            <div className="mt-1.5 truncate font-mono text-[9px] uppercase tracking-[0.15em] text-text-dim">
              <span style={{ color: p.accent }}>0{i + 1}</span> · {p.title}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-text-quiet">
        Tap to dive in · Scroll for more ↓
      </div>
    </div>
  );
}
