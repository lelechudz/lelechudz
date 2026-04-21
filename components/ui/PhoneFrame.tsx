"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import clsx from "clsx";

interface Props {
  src: string;
  alt: string;
  accent?: string;
  className?: string;
  priority?: boolean;
}

export function PhoneFrame({
  src,
  alt,
  accent = "#ffb347",
  className,
  priority = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * 14, y: px * 18 });
  };

  const handleLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const lift = hovered ? 40 : 0;
  const scale = hovered ? 1.03 : 1;

  return (
    <div className={clsx("phone-frame-wrap", className)} style={{ perspective: "1400px" }}>
      <div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative mx-auto aspect-[9/18] w-full max-w-[280px] rounded-[40px] p-[5px] will-change-transform"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${lift}px) scale(${scale})`,
          transformStyle: "preserve-3d",
          transition:
            "transform 700ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 500ms cubic-bezier(0.22, 1, 0.36, 1)",
          background:
            "linear-gradient(180deg, #2b2b38 0%, #14141e 55%, #20202c 100%)",
          boxShadow: hovered
            ? `0 60px 140px ${accent}66, 0 18px 40px rgba(0,0,0,0.7), 0 0 0 1.5px rgba(255,255,255,0.18), inset 0 1px 0 rgba(255,255,255,0.14)`
            : `0 28px 90px ${accent}44, 0 12px 30px rgba(0,0,0,0.65), 0 0 0 1.5px rgba(255,255,255,0.14), inset 0 1px 0 rgba(255,255,255,0.12)`,
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden rounded-[36px] bg-black"
          style={{ transform: "translateZ(1px)" }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 80vw, 320px"
            className="object-cover"
            priority={priority}
          />
          <div
            aria-hidden
            className="absolute left-1/2 top-[7px] z-10 h-[26px] w-[88px] -translate-x-1/2 rounded-full bg-black"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.04), 0 2px 6px rgba(0,0,0,0.8)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[36px]"
            style={{
              background: hovered
                ? `linear-gradient(135deg, transparent 30%, ${accent}15 50%, transparent 70%)`
                : "transparent",
              boxShadow:
                "inset 0 0 40px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.06)",
              transition: "background 500ms ease",
            }}
          />
        </div>
        <span
          aria-hidden
          className="absolute right-[-2px] top-[96px] h-[58px] w-[3px] rounded-r bg-[#1a1a24]"
        />
        <span
          aria-hidden
          className="absolute left-[-2px] top-[82px] h-[28px] w-[3px] rounded-l bg-[#1a1a24]"
        />
        <span
          aria-hidden
          className="absolute left-[-2px] top-[128px] h-[52px] w-[3px] rounded-l bg-[#1a1a24]"
        />
        <span
          aria-hidden
          className="absolute left-[-2px] top-[194px] h-[52px] w-[3px] rounded-l bg-[#1a1a24]"
        />
      </div>
    </div>
  );
}
