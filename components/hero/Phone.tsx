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

const BODY_COLOR = new THREE.Color("#12121c");
const BODY_COLOR_DIM = new THREE.Color("#0a0a10");

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
    screenTexture.anisotropy = 8;
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
      const targetBrightness = focused ? 1.2 : dimmed ? 0.35 : 1.0;
      u.uBrightness!.value += (targetBrightness - u.uBrightness!.value) * k;
      const targetDither = focused ? 1.2 : 3.0;
      u.uDitherSize!.value += (targetDither - u.uDitherSize!.value) * k;
    }

    if (bodyRef.current) {
      const mat = bodyRef.current.material as THREE.MeshStandardMaterial;
      const target = dimmed ? BODY_COLOR_DIM : BODY_COLOR;
      mat.color.lerp(target, k);
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
      <RoundedBox
        ref={bodyRef}
        args={[0.95, 1.95, 0.1]}
        radius={0.13}
        smoothness={8}
        creaseAngle={0.4}
      >
        <meshStandardMaterial
          color={BODY_COLOR}
          roughness={0.28}
          metalness={0.75}
        />
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
      <mesh position={[0, 0.84, 0.052]}>
        <boxGeometry args={[0.26, 0.06, 0.002]} />
        <meshStandardMaterial color="#030308" roughness={0.95} />
      </mesh>

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
          <meshStandardMaterial
            color="#1e2a5a"
            roughness={0.3}
            metalness={0.8}
          />
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
