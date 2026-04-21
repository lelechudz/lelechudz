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
    const k = 1 - Math.exp(-dt * 9);

    const bob = focused ? 0 : Math.sin(t * 0.8 + project.position[0]) * 0.05;
    const restRotY = project.rotation[1] + Math.sin(t * 0.5 + project.position[0]) * 0.03;

    const targetX = focused ? 0 : project.position[0];
    const targetY = focused ? 0 : project.position[1] + bob;
    const targetZ = focused ? 1.6 : project.position[2];
    const targetRotY = focused ? 0 : restRotY;
    const targetRotX = focused ? 0 : project.rotation[0];
    const targetRotZ = focused ? 0 : project.rotation[2];
    const targetScale = focused ? 1.25 : project.scale;

    const g = groupRef.current;
    g.position.x += (targetX - g.position.x) * k;
    g.position.y += (targetY - g.position.y) * k;
    g.position.z += (targetZ - g.position.z) * k;
    g.rotation.x += (targetRotX - g.rotation.x) * k;
    g.rotation.y += (targetRotY - g.rotation.y) * k;
    g.rotation.z += (targetRotZ - g.rotation.z) * k;
    const ns = g.scale.x + (targetScale - g.scale.x) * k;
    g.scale.setScalar(ns);

    if (screenRef.current) {
      const u = screenRef.current.uniforms;
      u.uTime!.value += dt;
      const targetBrightness = focused ? 1.25 : dimmed ? 0.45 : 1.0;
      u.uBrightness!.value += (targetBrightness - u.uBrightness!.value) * k;
      const targetDither = focused ? 1.5 : 3.0;
      u.uDitherSize!.value += (targetDither - u.uDitherSize!.value) * k;
    }

    if (bodyRef.current) {
      const mat = bodyRef.current.material as THREE.MeshStandardMaterial;
      const targetOpacity = dimmed ? 0.35 : 1.0;
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
