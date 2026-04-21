"use client";

import { useEffect, useRef } from "react";
import { useMotionPrefs } from "@/components/providers/MotionPrefsProvider";

const TRAIL_LENGTH = 4;

export function Cursor() {
  const { reducedMotion } = useMotionPrefs();
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pos = useRef({ x: -100, y: -100 });
  const trail = useRef<{ x: number; y: number }[]>(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 })),
  );

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (reducedMotion) return;

    const onMove = (e: PointerEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };
    const onOverInteractive = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor='hover']")) {
        ringRef.current?.setAttribute("data-state", "hover");
      } else {
        ringRef.current?.setAttribute("data-state", "idle");
      }
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOverInteractive);

    let raf: number;
    const loop = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x - 16}px, ${pos.current.y - 16}px, 0)`;
      }
      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const prev = i === 0 ? pos.current : trail.current[i - 1]!;
        const cur = trail.current[i]!;
        cur.x += (prev.x - cur.x) * 0.25;
        cur.y += (prev.y - cur.y) * 0.25;
        const el = trailRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${cur.x - 4}px, ${cur.y - 4}px, 0)`;
          el.style.opacity = String(0.6 - i * 0.12);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOverInteractive);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999]">
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className="absolute h-2 w-2 rounded-full bg-accent-amber"
          style={{ filter: "blur(1px)" }}
        />
      ))}
      <div
        ref={ringRef}
        data-state="idle"
        className="absolute h-8 w-8 rounded-full border border-accent-amber transition-[width,height,border-color,transform] duration-150 data-[state=hover]:h-14 data-[state=hover]:w-14 data-[state=hover]:border-accent-violet"
        style={{ boxShadow: "0 0 12px rgba(255,179,71,0.4)" }}
      />
    </div>
  );
}
