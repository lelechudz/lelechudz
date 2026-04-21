uniform float uTime;
uniform vec2 uPointer;
uniform vec2 uResolution;
varying vec2 vUv;

float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// Water height field. Combines:
//   - Four flowing directional waves that live across the whole surface
//     at different frequencies and speeds (ambient ocean motion).
//   - A fine-grain noise layer for surface texture.
//   - A continuous concentric ripple sourced at the cursor whose
//     amplitude decays with distance — this integrates into the ambient
//     field so the cursor's effect reads as *additional waves* rather
//     than a spotlight.
float waterH(vec2 p, float t, vec2 cur) {
  float h = 0.0;
  h += sin(p.x * 1.3 + p.y * 0.7 + t * 0.42) * 0.40;
  h += sin(p.x * -0.8 + p.y * 1.4 + t * 0.33 + 1.4) * 0.30;
  h += sin(p.x * 2.1 + p.y * -1.1 + t * 0.55 + 2.7) * 0.22;
  h += sin(p.x * 0.5 + p.y * 2.6 + t * 0.28 + 0.8) * 0.18;
  h += (vnoise(p * 3.4 + vec2(t * 0.08, -t * 0.06)) - 0.5) * 0.22;
  float d = distance(p, cur);
  float decay = exp(-d * 0.7);
  h += sin(d * 14.0 - t * 3.2) * 0.40 * decay;
  return h;
}

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  uv.x *= aspect;

  vec2 cursor = vec2(uPointer.x * aspect, uPointer.y);
  float t = uTime;

  // Sample height at this pixel and two neighbors to estimate a
  // surface gradient — that gradient drives a pseudo-specular term
  // so wave slopes catch light like a real water surface.
  float h = waterH(uv, t, cursor);
  float eps = 0.014;
  float hx = waterH(uv + vec2(eps, 0.0), t, cursor);
  float hy = waterH(uv + vec2(0.0, eps), t, cursor);
  vec2 grad = vec2(hx - h, hy - h) / eps;

  vec2 lightDir = normalize(vec2(-0.3, 0.7));
  float spec = max(0.0, dot(normalize(grad + vec2(0.001, 0.001)), lightDir));
  spec = pow(spec, 3.0);

  // Dark gradient base. Corners vignette hard to black so the surface
  // reads as deep water rather than a flat navy card.
  vec3 base = mix(
    vec3(0.0),
    vec3(0.02, 0.022, 0.05),
    smoothstep(-0.4, 1.0, uv.y)
  );
  float vig = smoothstep(1.6, 0.3, length(uv * vec2(0.72, 0.95)));
  base *= 0.32 + vig * 0.68;

  // Palette
  vec3 deep = vec3(0.06, 0.12, 0.28);
  vec3 bright = vec3(0.55, 0.82, 1.0);

  // Broad crest wash + tight foam + directional specular.
  float crestMask = smoothstep(0.0, 0.75, h);
  float foamMask = pow(smoothstep(0.55, 1.1, h), 2.0);

  vec3 col = base;
  col += crestMask * deep * 0.16;
  col += foamMask * bright * 0.22;
  col += spec * bright * 0.14;

  gl_FragColor = vec4(col, 1.0);
}
