"use client";

import { useEffect, useRef } from "react";

export function ScrollProgressBar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${progress})`;
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-0 left-0 z-50 h-[2px] w-full bg-transparent"
    >
      <div
        ref={ref}
        className="h-full w-full origin-left bg-accent-amber"
        style={{ transform: "scaleX(0)", boxShadow: "0 0 8px rgba(255,179,71,0.6)" }}
      />
    </div>
  );
}
