"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type MotionPref = "system" | "reduced" | "full";

interface MotionPrefsContext {
  pref: MotionPref;
  reducedMotion: boolean;
  setPref: (pref: MotionPref) => void;
}

const Ctx = createContext<MotionPrefsContext | null>(null);

const STORAGE_KEY = "lm-motion-pref";

export function MotionPrefsProvider({ children }: { children: ReactNode }) {
  const [pref, setPrefState] = useState<MotionPref>("system");
  const [systemReduced, setSystemReduced] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as MotionPref | null;
    if (stored === "system" || stored === "reduced" || stored === "full") {
      setPrefState(stored);
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setSystemReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setSystemReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const setPref = (next: MotionPref) => {
    setPrefState(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  const reducedMotion =
    pref === "reduced" || (pref === "system" && systemReduced);

  return (
    <Ctx.Provider value={{ pref, reducedMotion, setPref }}>{children}</Ctx.Provider>
  );
}

export function useMotionPrefs(): MotionPrefsContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useMotionPrefs must be used inside <MotionPrefsProvider>");
  return ctx;
}
