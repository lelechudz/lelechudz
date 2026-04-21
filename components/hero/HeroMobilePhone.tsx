"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { Project } from "@/lib/projects";
import bayerLib from "@/shaders/lib/bayer.glsl";
import screenVert from "@/shaders/screen.vert";
import screenMain from "@/shaders/screen.frag";

const screenFrag = `${bayerLib}\n${screenMain}`;

interface Props {
  projects: readonly Project[];
  accent: string;
  focusIdx: number;
  reducedMotion?: boolean;
}

export function HeroMobilePhone({ projects, focusIdx, reducedMotion = false }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.ShaderMaterial>(null);

  const screenURLs = projects.map((p) => p.screen);
  const textures = useLoader(THREE.TextureLoader, screenURLs) as THREE.Texture[];

  useMemo(() => {
    for (const tex of textures) {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.anisotropy = 8;
    }
  }, [textures]);

  const screenUniforms = useMemo(
    () => ({
      uScreen: { value: textures[0] },
      uTime: { value: 0 },
      uBrightness: { value: 1.15 },
      uDitherSize: { value: 1.4 },
    }),
    [textures],
  );

  useEffect(() => {
    const u = screenRef.current?.uniforms.uScreen;
    const tex = textures[focusIdx];
    if (u && tex) u.value = tex;
  }, [focusIdx, textures]);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      if (reducedMotion) {
        groupRef.current.rotation.y = 0;
        groupRef.current.rotation.x = 0;
        groupRef.current.position.y = 0;
      } else {
        groupRef.current.rotation.y = Math.sin(t * 0.45) * 0.35;
        groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.05;
        groupRef.current.position.y = Math.sin(t * 0.7) * 0.04;
      }
    }
    if (screenRef.current) {
      screenRef.current.uniforms.uTime!.value += dt;
    }
  });

  return (
    <group ref={groupRef}>
      <RoundedBox args={[0.95, 1.95, 0.1]} radius={0.13} smoothness={8} creaseAngle={0.4}>
        <meshStandardMaterial color="#12121c" roughness={0.28} metalness={0.75} />
      </RoundedBox>
      <mesh position={[0, 0, 0.051]}>
        <planeGeometry args={[0.88, 1.88]} />
        <shaderMaterial
          ref={screenRef}
          vertexShader={screenVert}
          fragmentShader={screenFrag}
          uniforms={screenUniforms}
          transparent={false}
        />
      </mesh>
      <RoundedBox
        position={[0, 0.87, 0.055]}
        args={[0.24, 0.055, 0.005]}
        radius={0.027}
        smoothness={12}
      >
        <meshStandardMaterial color="#010105" roughness={0.9} metalness={0.15} />
      </RoundedBox>

      <group position={[-0.26, 0.74, -0.07]}>
        <RoundedBox args={[0.32, 0.32, 0.04]} radius={0.11} smoothness={12}>
          <meshStandardMaterial color="#080810" roughness={0.5} metalness={0.6} />
        </RoundedBox>
        <mesh position={[-0.06, 0.06, -0.025]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.058, 0.058, 0.02, 32]} />
          <meshStandardMaterial color="#02020a" roughness={0.15} metalness={0.95} />
        </mesh>
        <mesh position={[-0.06, 0.06, -0.037]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.028, 0.028, 0.003, 32]} />
          <meshStandardMaterial color="#1e2a5a" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0.06, 0.06, -0.025]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.052, 0.052, 0.02, 32]} />
          <meshStandardMaterial color="#02020a" roughness={0.15} metalness={0.95} />
        </mesh>
        <mesh position={[0.06, 0.06, -0.037]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.024, 0.024, 0.003, 32]} />
          <meshStandardMaterial color="#0a0a14" roughness={0.4} metalness={0.7} />
        </mesh>
        <mesh position={[0, -0.05, -0.025]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.048, 0.048, 0.02, 32]} />
          <meshStandardMaterial color="#02020a" roughness={0.15} metalness={0.95} />
        </mesh>
        <mesh position={[0, -0.05, -0.037]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 0.003, 32]} />
          <meshStandardMaterial color="#14141e" roughness={0.5} metalness={0.6} />
        </mesh>
        <mesh position={[0.08, -0.08, -0.023]}>
          <boxGeometry args={[0.022, 0.022, 0.004]} />
          <meshStandardMaterial
            color="#ffe7c2"
            emissive="#ffb668"
            emissiveIntensity={0.35}
          />
        </mesh>
      </group>
    </group>
  );
}
