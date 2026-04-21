"use client";

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import { PROJECTS, type ProjectSlug } from "@/lib/projects";
import { Phone } from "./Phone";
import { useConstellation } from "./useConstellation";

interface Props {
  reducedMotion: boolean;
}

export function PhoneConstellation({ reducedMotion }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<ProjectSlug | null>(null);
  const { scrollProgress } = useConstellation();
  const { pointer } = useThree();
  const router = useRouter();

  const rotTarget = useRef({ x: 0, y: 0 });

  useFrame((_, dt) => {
    if (!groupRef.current) return;

    if (!reducedMotion) {
      rotTarget.current.y += 0.02 * dt;
    }

    const targetY = rotTarget.current.y + pointer.x * 0.3;
    const targetX = pointer.y * -0.15;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;

    const compact = scrollProgress;
    groupRef.current.scale.setScalar(1 - compact * 0.6);
    groupRef.current.position.y = -compact * 0.5;
    groupRef.current.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        const m = (o as THREE.Mesh).material as THREE.Material | THREE.Material[];
        if (Array.isArray(m)) {
          m.forEach((x) => {
            x.transparent = true;
            x.opacity = 1 - compact * 0.6;
          });
        } else {
          m.transparent = true;
          m.opacity = 1 - compact * 0.6;
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      {PROJECTS.map((p) => (
        <Phone
          key={p.slug}
          project={p}
          focused={hovered === p.slug}
          dimmed={hovered !== null && hovered !== p.slug}
          onHover={setHovered}
          onClick={(slug) => router.push(`/projects/${slug}`)}
        />
      ))}
    </group>
  );
}
