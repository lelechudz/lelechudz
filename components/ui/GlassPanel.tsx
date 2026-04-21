import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  ditherStrength?: "none" | "subtle" | "strong";
}

export function GlassPanel({ children, className, ditherStrength = "subtle", ...rest }: Props) {
  const ditherOpacity = ditherStrength === "none" ? 0 : ditherStrength === "subtle" ? 0.15 : 0.35;
  return (
    <div
      {...rest}
      className={clsx(
        "relative overflow-hidden rounded-[4px] border",
        "bg-[var(--glass-fill)] border-[var(--glass-stroke)]",
        "backdrop-blur-[2px]",
        className,
      )}
    >
      {children}
      {ditherOpacity > 0 && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 mix-blend-overlay"
          style={{
            opacity: ditherOpacity,
            backgroundImage:
              "radial-gradient(circle at 25% 25%, rgba(255,217,160,0.5) 0.5px, transparent 0.8px), radial-gradient(circle at 75% 75%, rgba(255,217,160,0.5) 0.5px, transparent 0.8px)",
            backgroundSize: "3px 3px, 3px 3px",
          }}
        />
      )}
    </div>
  );
}
