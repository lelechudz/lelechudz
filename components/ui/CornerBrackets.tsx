import type { ReactNode } from "react";
import clsx from "clsx";

interface Props {
  children?: ReactNode;
  className?: string;
  size?: number;
  color?: string;
}

export function CornerBrackets({
  children,
  className,
  size = 12,
  color = "var(--text-dim)",
}: Props) {
  const s = `${size}px`;
  return (
    <div className={clsx("relative", className)}>
      <span style={{ width: s, height: s, borderColor: color }} className="pointer-events-none absolute left-0 top-0 border-l border-t" />
      <span style={{ width: s, height: s, borderColor: color }} className="pointer-events-none absolute right-0 top-0 border-r border-t" />
      <span style={{ width: s, height: s, borderColor: color }} className="pointer-events-none absolute bottom-0 left-0 border-b border-l" />
      <span style={{ width: s, height: s, borderColor: color }} className="pointer-events-none absolute bottom-0 right-0 border-b border-r" />
      {children}
    </div>
  );
}
