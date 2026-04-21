uniform float uTime;
uniform vec2 uPointer;
uniform vec2 uResolution;
varying vec2 vUv;

float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(41.3, 289.1))) * 45758.5);
}

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  uv.x *= aspect;

  vec2 cursor = vec2(uPointer.x * aspect, uPointer.y);
  float d = distance(uv, cursor);

  // Dark gradient base: near-black with a whisper of deep indigo up top,
  // falling to pure black at the edges via a soft radial vignette.
  float vGrad = smoothstep(-1.0, 1.0, uv.y);
  vec3 base = mix(vec3(0.0), vec3(0.028, 0.022, 0.055), vGrad * 0.9);
  float vig = smoothstep(1.5, 0.35, length(uv * 0.9));
  base *= 0.25 + vig * 0.75;

  // Subtle star dust far from the cursor so empty black isn't dead.
  vec2 starId = floor(vUv * 320.0);
  float star = hash21(starId);
  float dust = step(0.9965, star) * 0.22;
  dust *= smoothstep(0.0, 0.8, d);

  // Water: three ripple bands expanding outward from the cursor,
  // each with its own tight exponential fall-off so the effect stays
  // local and doesn't wash over the whole screen.
  float t = uTime;
  float r1 = sin(d * 26.0 - t * 3.6);
  float r2 = sin(d * 14.0 - t * 2.0 + 1.2);
  float r3 = sin(d * 42.0 - t * 5.0 + 2.4);

  float crest1 = smoothstep(0.55, 1.0, r1) * exp(-d * 2.6);
  float crest2 = smoothstep(0.45, 1.0, r2) * exp(-d * 1.4) * 0.7;
  float crest3 = smoothstep(0.75, 1.0, r3) * exp(-d * 3.4) * 0.45;

  // Pool: a soft indigo halo directly under the cursor.
  float pool = exp(-d * 1.6);
  float core = exp(-d * 4.5);

  // Palette — cool cyan-white for the ripple crests, deep indigo for the pool.
  vec3 crestHue = vec3(0.55, 0.82, 1.0);
  vec3 deepHue = vec3(0.10, 0.18, 0.42);

  vec3 col = base;
  col += pool * deepHue * 0.32;
  col += core * crestHue * 0.18;
  col += crest1 * crestHue * 0.14;
  col += crest2 * crestHue * 0.07;
  col += crest3 * crestHue * 0.10;
  col += dust * crestHue * 0.35;

  gl_FragColor = vec4(col, 1.0);
}
