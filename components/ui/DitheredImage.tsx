import Image, { type ImageProps } from "next/image";
import clsx from "clsx";

interface Props extends Omit<ImageProps, "placeholder"> {
  ditherSize?: number;
}

export function DitheredImage({ ditherSize = 3, className, alt, ...rest }: Props) {
  return (
    <div className={clsx("relative overflow-hidden", className)}>
      <Image {...rest} alt={alt} className="block h-full w-full object-cover" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          mixBlendMode: "multiply",
          opacity: 0.7,
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #0c0a14 0.7px, transparent 1px), radial-gradient(circle at 75% 75%, #0c0a14 0.7px, transparent 1px)",
          backgroundSize: `${ditherSize}px ${ditherSize}px, ${ditherSize}px ${ditherSize}px`,
        }}
      />
    </div>
  );
}
