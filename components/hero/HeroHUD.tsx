"use client";

import { useEffect, useState } from "react";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { useFocusedPhone } from "./focusStore";
import { useMediaQuery } from "@/lib/useMediaQuery";

export function HeroHUD() {
  const [time, setTime] = useState<string>("--:--:--");
  const [hintVisible, setHintVisible] = useState(true);
  const focused = useFocusedPhone();
  const dim = focused !== null;
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(
        [d.getHours(), d.getMinutes(), d.getSeconds()]
          .map((n) => String(n).padStart(2, "0"))
          .join(":"),
      );
    };
    tick();
    const id = setInterval(tick, 1000);

    const hintTimeout = setTimeout(() => setHintVisible(false), 5000);
    const onInteract = () => setHintVisible(false);
    window.addEventListener("pointerdown", onInteract, { once: true });

    return () => {
      clearInterval(id);
      clearTimeout(hintTimeout);
      window.removeEventListener("pointerdown", onInteract);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="pointer-events-none absolute inset-0 z-20 text-text-primary">
        <div aria-hidden="true" className="pointer-events-none absolute inset-3">
          <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-text-dim" />
          <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-text-dim" />
          <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-text-dim" />
          <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-text-dim" />
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-20 text-text-primary">
      <div
        className="absolute left-6 top-6 font-mono text-[11px] uppercase tracking-[0.12em] text-text-dim transition-opacity duration-500"
        style={{ opacity: dim ? 0.15 : 1 }}
      >
        <div>⌐ LAT 7.07° N · LNG 125.61° E ¬</div>
        <div>LOCAL TIME {time}</div>
      </div>

      <div
        className="absolute right-6 top-6 text-right font-mono text-[11px] uppercase tracking-[0.12em] text-text-dim transition-opacity duration-500"
        style={{ opacity: dim ? 0.15 : 1 }}
      >
        <div>◉ 4 SHIPPED</div>
        <div className="flex items-center justify-end gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-status-ok" />
          AVAILABLE FOR HIRE
        </div>
      </div>

      <div
        className="absolute bottom-8 left-6 transition-opacity duration-500 md:bottom-12 md:left-12"
        style={{ opacity: dim ? 0.08 : 1 }}
      >
        <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-text-dim">
          Mobile Developer
        </div>
        <h1 className="font-sans text-6xl font-semibold tracking-tight md:text-[120px] md:leading-[0.95]">
          <ScrambleText text="LEI MABOLOC" trigger="mount" duration={800} />
        </h1>
        <div className="mt-3 font-mono text-xs uppercase tracking-[0.15em] text-accent-amber">
          Flutter · Dart · 3D &amp; Shaders
        </div>
      </div>

      <div
        className="absolute bottom-8 right-6 font-mono text-[10px] uppercase tracking-[0.15em] text-text-quiet transition-opacity duration-700"
        style={{ opacity: dim ? 0 : hintVisible ? 1 : 0 }}
      >
        DRAG TO ORBIT · CLICK A PHONE ↗
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-4">
        <span className="absolute left-0 top-0 h-4 w-4 border-l border-t border-text-dim" />
        <span className="absolute right-0 top-0 h-4 w-4 border-r border-t border-text-dim" />
        <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-text-dim" />
        <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-text-dim" />
      </div>
    </div>
  );
}
