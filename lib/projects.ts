export type ProjectSlug = "enhanced-eq" | "medialert" | "helmiscan" | "fairfare";

export type ProjectStatus = "shipped" | "in-progress";

export interface Project {
  slug: ProjectSlug;
  title: string;
  tagline: string;
  status: ProjectStatus;
  stack: string[];
  accent: string;
  screen: string;
  description: string;
  metrics: { label: string; value: string }[];
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  playStoreUrl?: string;
}

export const PROJECTS: readonly Project[] = [
  {
    slug: "enhanced-eq",
    title: "Enhanced EQ",
    tagline: "System-wide Android audio equalizer",
    status: "shipped",
    stack: ["Flutter", "Dart", "Android Native", "Platform Channels", "DSP"],
    accent: "#4a9eff",
    screen: "/screens/enhanced-eq.png",
    description:
      "A published Play Store app (4.5★, 1k+ downloads in 2 weeks with no ads) featuring 10/15/31-band graphic + parametric EQ, 8D spatial audio, 95+ headphone correction profiles, and community preset sharing. Integrates Android native AudioEffect APIs for system-wide processing with no root required.",
    metrics: [
      { label: "Play Store rating", value: "4.5★" },
      { label: "First 2 weeks", value: "1k+ installs" },
      { label: "EQ bands", value: "10 / 15 / 31" },
    ],
    position: [0.05, -0.05, 0.35],
    rotation: [0, 0.02, 0],
    scale: 1.18,
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.enhancedeq.app",
  },
  {
    slug: "medialert",
    title: "MediAlert",
    tagline: "Campus emergency response",
    status: "shipped",
    stack: ["Flutter", "Dart", "Firebase", "Cloud Messaging"],
    accent: "#ff6aaf",
    screen: "/screens/medialert.png",
    description:
      "A Flutter app for academic settings enabling students to trigger instant alerts to school nurses via a single-tap emergency button — cutting response time when the clinic is physically distant from the incident. Role-based dual interfaces (student / nurse), real-time push notifications, alert confirmation workflow, resolution tracking.",
    metrics: [
      { label: "Roles", value: "Student / Nurse" },
      { label: "Backend", value: "Firebase RTDB + FCM" },
      { label: "Activation", value: "Single-tap SOS" },
    ],
    position: [-1.95, 0.2, -0.5],
    rotation: [0, 0.22, -0.03],
    scale: 0.92,
  },
  {
    slug: "helmiscan",
    title: "Helmiscan",
    tagline: "On-device ML helminth detection",
    status: "shipped",
    stack: ["Flutter", "Dart", "YOLOv8", "TensorFlow Lite"],
    accent: "#7affb7",
    screen: "/screens/helmiscan.png",
    description:
      "Thesis project — an on-device soil-transmitted-helminth detection app using YOLOv8 compiled to TensorFlow Lite. Real-time camera inference, fully offline. One-year project completed August 2025.",
    metrics: [
      { label: "Model", value: "YOLOv8 → TFLite" },
      { label: "Inference", value: "On-device, real-time" },
      { label: "Completed", value: "Aug 2025" },
    ],
    position: [1.95, -0.25, -0.55],
    rotation: [0, -0.24, 0.02],
    scale: 0.92,
  },
  {
    slug: "fairfare",
    title: "FairFare",
    tagline: "Global travel fare calculator",
    status: "in-progress",
    stack: ["Flutter", "Dart", "Google Maps API", "REST"],
    accent: "#c66afd",
    screen: "/screens/fairfare.png",
    description:
      "A scalable fare calculator integrating Google Maps and live currency exchange APIs for worldwide travel cost estimation. In active development.",
    metrics: [
      { label: "Status", value: "In Progress" },
      { label: "Scope", value: "Global routes" },
      { label: "Data", value: "Maps + FX APIs" },
    ],
    position: [2.6, 1.05, -1.5],
    rotation: [0, -0.3, -0.06],
    scale: 0.66,
  },
] as const;

const SLUG_SET = new Set<string>(PROJECTS.map((p) => p.slug));

export function isProjectSlug(value: string): value is ProjectSlug {
  return SLUG_SET.has(value);
}

export function getProject(slug: ProjectSlug): Project {
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) throw new Error(`Unknown project: ${slug}`);
  return p;
}
