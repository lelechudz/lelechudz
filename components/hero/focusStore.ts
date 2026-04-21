"use client";

import { useSyncExternalStore } from "react";
import type { ProjectSlug } from "@/lib/projects";

type Listener = () => void;

let focused: ProjectSlug | null = null;
const listeners = new Set<Listener>();

export function setFocusedPhone(slug: ProjectSlug | null) {
  if (focused === slug) return;
  focused = slug;
  listeners.forEach((l) => l());
}

function subscribe(l: Listener) {
  listeners.add(l);
  return () => listeners.delete(l);
}

function getSnapshot() {
  return focused;
}

function getServerSnapshot(): ProjectSlug | null {
  return null;
}

export function useFocusedPhone() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
