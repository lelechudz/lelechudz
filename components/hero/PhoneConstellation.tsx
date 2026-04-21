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
  const hoveredRef = useRef<ProjectSlug | null>(null);
  const { scrollProgress } = useConstellation();
  const { pointer, gl } = useThree();
  const router = useRouter();

  const dragRef = useRef({ active: false, lastX: 0, lastY: 0, moved: false });
  const dragOffset = useRef({ y: 0, x: 0 });

  useEffect(() => {
    setFocusedPhone(hovered);
    hoveredRef.current = hovered;
  }, [hovered]);

  useEffect(() => {
    const el = gl.domElement;

    const onDown = (e: PointerEvent) => {
      if (hoveredRef.current !== null) return;
      dragRef.current.active = true;
      dragRef.current.moved = false;
      dragRef.current.lastX = e.clientX;
      dragRef.current.lastY = e.clientY;
      document.body.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragRef.current.active) return;
      const dx = e.clientX - dragRef.current.lastX;
      const dy = e.clientY - dragRef.current.lastY;
      dragRef.current.lastX = e.clientX;
      dragRef.current.lastY = e.clientY;
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) dragRef.current.moved = true;
      dragOffset.current.y = THREE.MathUtils.clamp(
        dragOffset.current.y + dx * 0.005,
        -1.2,
        1.2,
      );
      dragOffset.current.x = THREE.MathUtils.clamp(
        dragOffset.current.x + dy * 0.003,
        -0.35,
        0.35,
      );
    };
    const onUp = () => {
      if (!dragRef.current.active) return;
      dragRef.current.active = false;
      if (hoveredRef.current === null) document.body.style.cursor = "";
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [gl]);

  useFrame((state, dt) => {
    if (!groupRef.current) return;
    const k = 1 - Math.exp(-dt * 8);

    if (!dragRef.current.active && !reducedMotion) {
      const decay = Math.exp(-dt * 1.3);
      dragOffset.current.y *= decay;
      dragOffset.current.x *= decay;
    }

    const t = state.clock.elapsedTime;
    const swayY = reducedMotion ? 0 : Math.sin(t * 0.22) * 0.11;
    const swayX = reducedMotion ? 0 : Math.sin(t * 0.17 + 1.3) * 0.05;

    const pointerY = pointer.x * 0.22;
    const pointerX = pointer.y * -0.10;

    const suppress = hovered !== null;
    const targetY = suppress ? 0 : swayY + pointerY + dragOffset.current.y;
    const targetX = suppress ? 0 : swayX + pointerX + dragOffset.current.x;

    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * k;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * k;

    const compact = scrollProgress;
    groupRef.current.scale.setScalar(1 - compact * 0.6);
    groupRef.current.position.y = -compact * 0.5;

    if (backdropRef.current) {
      const mat = backdropRef.current.material as THREE.MeshBasicMaterial;
      const target = hovered ? 0.82 : 0;
      mat.opacity += (target - mat.opacity) * k;
    }
  });

  const safeHover = (slug: ProjectSlug | null) => {
    if (dragRef.current.active && dragRef.current.moved) return;
    setHovered(slug);
  };

  const safeClick = (slug: ProjectSlug) => {
    if (dragRef.current.moved) return;
    router.push(`/projects/${slug}`);
  };

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
            onHover={safeHover}
            onClick={safeClick}
          />
        ))}
      </group>
    </>
  );
}
