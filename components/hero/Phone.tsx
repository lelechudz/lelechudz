"use client";

import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { Project } from "@/lib/projects";
import bayerLib from "@/shaders/lib/bayer.glsl";
import screenVert from "@/shaders/screen.vert";
import screenMain from "@/shaders/screen.frag";

const screenFrag = `${bayerLib}\n${screenMain}`;

interface Props {
  project: Project;
  focused: boolean;
  dimmed: boolean;
  onHover: (slug: Project["slug"] | null) => void;
  onClick: (slug: Project["slug"]) => void;
}

export function Phone({ project, focused, dimmed, onHover, onClick }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.ShaderMaterial>(null);
  const bodyRef = useRef<THREE.Mesh>(null);

  const screenTexture = useLoader(THREE.TextureLoader, project.screen);
  useMemo(() => {
    screenTexture.colorSpace = THREE.SRGBColorSpace;
    screenTexture.minFilter = THREE.LinearFilter;
    screenTexture.magFilter = THREE.LinearFilter;
  }, [screenTexture]);

  const screenUniforms = useMemo(
    () => ({
      uScreen: { value: screenTexture },
      uTime: { value: 0 },
      uBrightness: { value: 1.0 },
      uDitherSize: { value: 3.0 },
    }),
    [screenTexture],
  );

  useFrame((state, dt) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const k = 1 - Math.exp(-dt * 10);

    const bob = Math.sin(t * 0.8 + project.position[0]) * 0.05;
    const restRotY = project.rotation[1] + Math.sin(t * 0.5 + project.position[0]) * 0.03;

    const targetY = project.position[1] + bob;
    const targetZ = project.position[2] + (focused ? 1.4 : 0);
    const targetRotY = focused ? 0 : restRotY;
    const targetRotX = focused ? 0 : project.rotation[0];
    const baseScale = project.scale;
    const targetScale = baseScale * (focused ? 1.18 : 1);

    groupRef.current.position.y += (targetY - groupRef.current.position.y) * k;
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * k;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * k;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * k;
    const s = groupRef.current.scale.x;
    const ns = s + (targetScale - s) * k;
    groupRef.current.scale.setScalar(ns);

    if (screenRef.current) {
      const u = screenRef.current.uniforms;
      u.uTime!.value += dt;
      const targetBrightness = focused ? 1.35 : dimmed ? 0.55 : 1.0;
      u.uBrightness!.value += (targetBrightness - u.uBrightness!.value) * k;
      const targetDither = focused ? 2.0 : 3.0;
      u.uDitherSize!.value += (targetDither - u.uDitherSize!.value) * k;
    }

    if (bodyRef.current) {
      const mat = bodyRef.current.material as THREE.MeshStandardMaterial;
      const targetOpacity = dimmed ? 0.45 : 1.0;
      mat.opacity += (targetOpacity - mat.opacity) * k;
    }
  });

  return (
    <group
      ref={groupRef}
      position={project.position}
      rotation={project.rotation}
      scale={project.scale}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(project.slug);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onHover(null);
        document.body.style.cursor = "";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(project.slug);
      }}
    >
      <RoundedBox ref={bodyRef} args={[0.95, 1.95, 0.08]} radius={0.09} smoothness={6} creaseAngle={0.4}>
        <meshStandardMaterial
          color="#0f0f18"
          roughness={0.35}
          metalness={0.55}
          transparent
          opacity={1}
        />
      </RoundedBox>
      <mesh position={[0, 0, 0.041]}>
        <planeGeometry args={[0.84, 1.82]} />
        <shaderMaterial
          ref={screenRef}
          vertexShader={screenVert}
          fragmentShader={screenFrag}
          uniforms={screenUniforms}
          transparent={false}
        />
      </mesh>
      <mesh position={[0, 0.82, 0.042]}>
        <boxGeometry args={[0.22, 0.04, 0.002]} />
        <meshStandardMaterial color="#05050a" roughness={0.9} />
      </mesh>
    </group>
  );
}
