"use client";

import { useEffect, useState } from "react";

interface State {
  scrollProgress: number;
}

export function useConstellation(): State {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let raf: number;
    const update = () => {
      const max = window.innerHeight * 1.5;
      const y = window.scrollY;
      const p = Math.min(1, Math.max(0, y / max));
      setScrollProgress(p);
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return { scrollProgress };
}
