"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import waveformVert from "@/shaders/waveform.vert";
import waveformFrag from "@/shaders/waveform.frag";

function WaveformMesh() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  const uniforms = useRef({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  }).current;

  useFrame((_, dt) => {
    uniforms.uTime.value += dt;
    uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={waveformVert}
        fragmentShader={waveformFrag}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function WaveformBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 1] }} dpr={[1, 2]}>
        <WaveformMesh />
      </Canvas>
    </div>
  );
}
