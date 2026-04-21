"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import { PROJECTS, type ProjectSlug } from "@/lib/projects";
import { Phone } from "./Phone";
import { useConstellation } from "./useConstellation";
import { setFocusedPhone } from "./focusStore";

interface Props {
  reducedMotion: boolean;
}

export function PhoneConstellation({ reducedMotion }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const backdropRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState<ProjectSlug | null>(null);
  const { scrollProgress } = useConstellation();
  const { pointer } = useThree();
  const router = useRouter();

  const rotTarget = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setFocusedPhone(hovered);
  }, [hovered]);

  useFrame((_, dt) => {
    if (!groupRef.current) return;
    const k = 1 - Math.exp(-dt * 9);

    if (!reducedMotion) {
      rotTarget.current.y += 0.02 * dt;
    }

    const suppressParallax = hovered !== null;
    const targetY = suppressParallax ? 0 : rotTarget.current.y + pointer.x * 0.3;
    const targetX = suppressParallax ? 0 : pointer.y * -0.15;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;

    const compact = scrollProgress;
    groupRef.current.scale.setScalar(1 - compact * 0.6);
    groupRef.current.position.y = -compact * 0.5;

    if (backdropRef.current) {
      const mat = backdropRef.current.material as THREE.MeshBasicMaterial;
      const target = hovered ? 0.82 : 0;
      mat.opacity += (target - mat.opacity) * k;
    }
  });

  return (
    <>
      <mesh ref={backdropRef} position={[0, 0, -2]} renderOrder={-1}>
        <planeGeometry args={[40, 25]} />
        <meshBasicMaterial color="#05050a" transparent opacity={0} depthWrite={false} />
      </mesh>
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
    </>
  );
}
