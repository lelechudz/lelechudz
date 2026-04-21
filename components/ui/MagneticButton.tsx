"use client";

import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  radius?: number;
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  radius = 60,
  strength = 0.3,
  ...rest
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > radius) {
      el.style.transform = "translate3d(0,0,0)";
      return;
    }
    el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };

  return (
    <button
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      data-cursor="hover"
      className={clsx("transition-transform duration-150 ease-out", className)}
      {...rest}
    >
      {children}
    </button>
  );
}
