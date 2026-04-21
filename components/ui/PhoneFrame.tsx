"use client";

import Image from "next/image";
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
  return (
    <div
      className={clsx(
        "phone-frame relative aspect-[9/19.5] w-full max-w-[320px] rounded-[44px] p-[5px] transition-[transform,box-shadow] duration-500 ease-out will-change-transform hover:-translate-y-2 hover:rotate-[-1deg]",
        className,
      )}
      style={{
        background: "linear-gradient(180deg, #1c1c26 0%, #08080f 55%, #14141e 100%)",
        boxShadow: `0 40px 120px ${accent}40, 0 10px 30px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)`,
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[40px] bg-black">
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
          className="absolute left-1/2 top-[14px] z-10 h-[22px] w-[90px] -translate-x-1/2 rounded-full bg-black"
          style={{ boxShadow: "inset 0 0 10px rgba(0,0,0,0.9)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[40px]"
          style={{
            boxShadow: "inset 0 0 40px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.06)",
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
  );
}
