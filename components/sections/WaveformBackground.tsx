"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import bayerLib from "@/shaders/lib/bayer.glsl";
import waveformVert from "@/shaders/waveform.vert";
import waveformMain from "@/shaders/waveform.frag";
import { useMotionPrefs } from "@/components/providers/MotionPrefsProvider";

const waveformFrag = `${bayerLib}\n${waveformMain}`;

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
  const { reducedMotion } = useMotionPrefs();
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        orthographic
        camera={{ zoom: 1, position: [0, 0, 1] }}
        dpr={[1, 2]}
        frameloop={reducedMotion ? "demand" : "always"}
      >
        <WaveformMesh />
      </Canvas>
    </div>
  );
}
