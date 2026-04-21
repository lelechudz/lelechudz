"use client";

import { Effect } from "postprocessing";
import { forwardRef, useMemo } from "react";
import type {} from "@react-three/fiber";
import * as THREE from "three";
import bayerLib from "@/shaders/lib/bayer.glsl";
import ditherMain from "@/shaders/dither.frag";

const fragmentShader = `${bayerLib}\n${ditherMain}`;

class DitherEffectImpl extends Effect {
  constructor({ ditherSize = 3 }: { ditherSize?: number } = {}) {
    super("DitherEffect", fragmentShader as unknown as string, {
      uniforms: new Map<string, THREE.Uniform>([
        ["uDitherSize", new THREE.Uniform(ditherSize)],
        ["uResolution", new THREE.Uniform(new THREE.Vector2(1, 1))],
      ]),
    });
  }

  override update(
    _renderer: THREE.WebGLRenderer,
    _inputBuffer: THREE.WebGLRenderTarget,
    _deltaTime?: number,
  ) {
    const res = this.uniforms.get("uResolution")!.value as THREE.Vector2;
    res.set(_renderer.domElement.width, _renderer.domElement.height);
  }
}

export const DitherPass = forwardRef<DitherEffectImpl, { ditherSize?: number }>(
  function DitherPass({ ditherSize }, ref) {
    const effect = useMemo(() => new DitherEffectImpl({ ditherSize }), [ditherSize]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <primitive ref={ref as any} object={effect} dispose={null} />;
  },
);
