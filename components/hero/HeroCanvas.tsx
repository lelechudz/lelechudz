"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, Environment } from "@react-three/drei";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { Suspense, useEffect, useState } from "react";
import { isWebGLAvailable } from "@/lib/webgl";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useMotionPrefs } from "@/components/providers/MotionPrefsProvider";
import { PhoneConstellation } from "./PhoneConstellation";
import { AuroraBackground } from "./AuroraBackground";
import { FallbackImage } from "./FallbackImage";
import { HeroMobile } from "./HeroMobile";

export function HeroCanvas() {
  const { reducedMotion } = useMotionPrefs();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    setWebgl(isWebGLAvailable());
  }, []);

  if (isMobile) return <HeroMobile />;
  if (webgl === false) return <FallbackImage />;
  if (webgl === null) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 38 }}
      dpr={[1, 2]}
      frameloop={reducedMotion ? "demand" : "always"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-label="Interactive 3D showcase of four mobile apps: Enhanced EQ, MediAlert, Helmiscan, FairFare"
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <Environment preset="night" background={false} />
      <ambientLight intensity={0.2} />
      <pointLight color="#ffb347" position={[5, 3, 5]} intensity={28} />
      <pointLight color="#c66afd" position={[-5, -2, 3]} intensity={14} />

      <Suspense fallback={null}>
        <AuroraBackground />
        <PhoneConstellation reducedMotion={reducedMotion} />
      </Suspense>

      <EffectComposer multisampling={0}>
        <Vignette offset={0.28} darkness={0.75} />
      </EffectComposer>
    </Canvas>
  );
}
