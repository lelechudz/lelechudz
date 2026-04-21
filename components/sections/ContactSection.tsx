"use client";

import { useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { WaveformBackground } from "./WaveformBackground";

const EMAIL = "leizermaboloc@gmail.com";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* empty */
    }
  };

  return (
    <section
      id="contact"
      className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col justify-center overflow-hidden px-6 py-24 md:px-[72px]"
    >
      <WaveformBackground />
      <div className="relative z-10">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-amber">
          ⌐ 05 / CONTACT ¬
        </div>
        <h2 className="mt-4 font-serif text-5xl leading-[1.05] md:text-7xl">
          Let&apos;s build something.
        </h2>
        <p className="mt-6 max-w-xl font-sans text-lg text-text-dim">
          Available for full-time Flutter / mobile roles. Open to interesting contract
          work too. Based in Davao, happy to work remotely across timezones.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <MagneticButton
            onClick={onCopy}
            className="rounded-sm border border-accent-amber bg-[var(--glass-fill)] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-accent-amber"
          >
            {copied ? "COPIED ✓" : "COPY EMAIL"}
          </MagneticButton>
          <a
            href={`mailto:${EMAIL}`}
            data-cursor="hover"
            className="rounded-sm border border-[var(--glass-stroke)] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-text-primary transition hover:border-accent-amber hover:text-accent-amber"
          >
            OPEN MAIL CLIENT ↗
          </a>
        </div>

        <div className="mt-6 font-mono text-sm text-text-dim">{EMAIL}</div>
      </div>
    </section>
  );
}
