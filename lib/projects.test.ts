import { describe, expect, it } from "vitest";
import { PROJECTS, isProjectSlug, type ProjectSlug } from "./projects";

describe("projects data", () => {
  it("exposes exactly four projects in stable order", () => {
    const slugs = PROJECTS.map((p) => p.slug);
    expect(slugs).toEqual(["enhanced-eq", "medialert", "helmiscan", "fairfare"]);
  });

  it("each project has required fields", () => {
    for (const p of PROJECTS) {
      expect(p.title).toBeTruthy();
      expect(p.tagline).toBeTruthy();
      expect(p.stack.length).toBeGreaterThan(0);
      expect(p.accent).toMatch(/^#[0-9a-f]{6}$/i);
      expect(p.screen).toBeTruthy();
    }
  });

  it("isProjectSlug narrows arbitrary strings", () => {
    expect(isProjectSlug("medialert")).toBe(true);
    expect(isProjectSlug("nope")).toBe(false);
    const s: string = "enhanced-eq";
    if (isProjectSlug(s)) {
      const typed: ProjectSlug = s;
      expect(typed).toBe("enhanced-eq");
    }
  });
});
