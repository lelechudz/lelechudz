"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import auroraVert from "@/shaders/aurora.vert";
import auroraFrag from "@/shaders/aurora.frag";

export function AuroraBackground() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { pointer, size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    [],
  );

  useFrame((_, dt) => {
    uniforms.uTime.value += dt;
    const target = uniforms.uPointer.value;
    target.x += (pointer.x - target.x) * Math.min(1, dt * 5);
    target.y += (pointer.y - target.y) * Math.min(1, dt * 5);
    uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh position={[0, 0, -4]} renderOrder={-10}>
      <planeGeometry args={[32, 20]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={auroraVert}
        fragmentShader={auroraFrag}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
