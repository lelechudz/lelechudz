"use client";

import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import type { Project } from "@/lib/projects";
import screenVert from "@/shaders/screen.vert";
import screenFrag from "@/shaders/screen.frag";

interface Props {
  project: Project;
  focused: boolean;
  onHover: (slug: Project["slug"] | null) => void;
  onClick: (slug: Project["slug"]) => void;
}

export function Phone({ project, focused, onHover, onClick }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.ShaderMaterial>(null);

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
    groupRef.current.position.y =
      project.position[1] + Math.sin(t * 0.8 + project.position[0]) * 0.05;
    groupRef.current.rotation.y =
      project.rotation[1] + Math.sin(t * 0.5 + project.position[0]) * 0.03;
    if (screenRef.current) {
      const u = screenRef.current.uniforms;
      u.uTime!.value += dt;
      const targetBrightness = focused ? 1.3 : 1.0;
      u.uBrightness!.value += (targetBrightness - u.uBrightness!.value) * 0.1;
      const targetDither = focused ? 2.0 : 3.0;
      u.uDitherSize!.value += (targetDither - u.uDitherSize!.value) * 0.1;
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
      <mesh>
        <boxGeometry args={[0.9, 1.85, 0.1]} />
        <meshStandardMaterial color="#14141f" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.051]}>
        <planeGeometry args={[0.82, 1.76]} />
        <shaderMaterial
          ref={screenRef}
          vertexShader={screenVert}
          fragmentShader={screenFrag}
          uniforms={screenUniforms}
          transparent={false}
        />
      </mesh>
    </group>
  );
}
