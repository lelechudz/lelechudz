"use client";

import { useMotionPrefs } from "@/components/providers/MotionPrefsProvider";

const GITHUB_URL = "https://github.com/lelechudz";
const LINKEDIN_URL = "https://www.linkedin.com/in/lei-christian-maboloc-51255523b/";
const SOURCE_URL = "https://github.com/lelechudz/lelechudz.dev";

export function Footer() {
  const { pref, setPref } = useMotionPrefs();

  return (
    <footer className="border-t border-[var(--glass-stroke)]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-[72px]">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-quiet">
          © 2026 LEI CHRISTIAN MABOLOC · DAVAO, PH
        </div>
        <div className="flex flex-wrap items-center gap-6 font-mono text-[11px] uppercase tracking-[0.15em]">
          <a data-cursor="hover" href={GITHUB_URL} target="_blank" rel="noopener" className="text-text-dim hover:text-accent-amber">GitHub ↗</a>
          <a data-cursor="hover" href={LINKEDIN_URL} target="_blank" rel="noopener" className="text-text-dim hover:text-accent-amber">LinkedIn ↗</a>
          <a data-cursor="hover" href="/resume.pdf" target="_blank" rel="noopener" className="text-text-dim hover:text-accent-amber">Resume ↗</a>
          <a data-cursor="hover" href={SOURCE_URL} target="_blank" rel="noopener" className="text-text-dim hover:text-accent-amber">View Source ↗</a>
          <label className="flex items-center gap-2 text-text-dim">
            MOTION
            <select
              value={pref}
              onChange={(e) => setPref(e.target.value as "system" | "reduced" | "full")}
              className="cursor-pointer border border-[var(--glass-stroke)] bg-transparent px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em]"
            >
              <option value="system">System</option>
              <option value="full">Full</option>
              <option value="reduced">Reduced</option>
            </select>
          </label>
        </div>
      </div>
    </footer>
  );
}
