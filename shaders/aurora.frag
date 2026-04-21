uniform float uTime;
uniform vec2 uPointer;
uniform vec2 uResolution;
varying vec2 vUv;

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  uv.x *= aspect;

  vec2 cursor = vec2(uPointer.x * aspect, uPointer.y);
  float d = distance(uv, cursor);
  float t = uTime;

  // --- Black base with subtle top-down indigo fade ---
  // The whole field leans black; a faint indigo tint at the top keeps
  // the surface from looking dead. Corners vignette down to pure black.
  vec3 base = mix(
    vec3(0.0),
    vec3(0.022, 0.022, 0.055),
    smoothstep(-0.4, 1.0, uv.y)
  );
  float vig = smoothstep(1.6, 0.3, length(uv * vec2(0.72, 0.95)));
  base *= 0.3 + vig * 0.7;

  // --- Ambient ocean shimmer across the whole surface ---
  // Three flowing sine layers combine into an irregular wave field.
  // smoothstep isolates only the crests so the troughs stay pitch black,
  // which reads as "dark water with faint reflected light" instead of
  // a uniform glow.
  vec2 q = uv * 1.3;
  float w1 = sin(q.x * 2.4 + q.y * 1.0 + t * 0.42);
  float w2 = sin(q.x * -1.6 + q.y * 2.2 + t * 0.35 + 1.8);
  float w3 = sin(q.x * 3.0 + q.y * -1.8 + t * 0.55 + 3.1);
  float shimmer = (w1 + w2 + w3) / 3.0;
  float crest = smoothstep(0.5, 0.95, shimmer);

  // --- Cursor ripples: concentric rings that expand outward and fade ---
  // Four rings, staggered in phase, each continuously emitted at the
  // cursor and growing outward over RING_LIFE seconds. Each is a thin
  // band around its current radius, NOT a filled disc — that was the
  // mistake in the previous version. Fade-in avoids a hard pop and
  // (1 - phase) fades the ring as it expands.
  float rings = 0.0;
  const float RING_LIFE = 2.4;
  const float RING_MAX_R = 1.3;
  for (int i = 0; i < 4; i++) {
    float phase = fract(t / RING_LIFE + float(i) * 0.25);
    float ringR = phase * RING_MAX_R;
    float ring = exp(-pow((d - ringR) * 20.0, 2.0));
    float fade = smoothstep(0.0, 0.08, phase) * pow(1.0 - phase, 1.3);
    rings += ring * fade;
  }

  // --- Compose ---
  vec3 deep = vec3(0.06, 0.14, 0.34);
  vec3 bright = vec3(0.5, 0.8, 1.0);

  vec3 col = base;
  col += crest * deep * 0.22;
  col += rings * bright * 0.28;

  gl_FragColor = vec4(col, 1.0);
}
