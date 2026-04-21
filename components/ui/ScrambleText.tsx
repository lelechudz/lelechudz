"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionPrefs } from "@/components/providers/MotionPrefsProvider";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=";

interface Props {
  text: string;
  duration?: number;
  trigger?: "hover" | "mount";
  className?: string;
}

export function ScrambleText({ text, duration = 300, trigger = "hover", className }: Props) {
  const { reducedMotion } = useMotionPrefs();
  const [display, setDisplay] = useState(text);
  const elRef = useRef<HTMLSpanElement>(null);
  const animRef = useRef<number | null>(null);

  const start = () => {
    if (reducedMotion) {
      setDisplay(text);
      return;
    }
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const startTime = performance.now();
    const tick = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      const revealUpTo = Math.floor(progress * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (i < revealUpTo) out += text[i];
        else out += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setDisplay(out);
      if (progress < 1) animRef.current = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    animRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (trigger === "mount") start();
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <span
      ref={elRef}
      onMouseEnter={trigger === "hover" ? start : undefined}
      className={className}
    >
      {display}
    </span>
  );
}
