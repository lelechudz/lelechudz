uniform float uTime;
uniform vec2 uPointer;
uniform vec2 uResolution;
varying vec2 vUv;

float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(41.3, 289.1))) * 45758.5);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  uv.x *= aspect;

  vec2 cursor = vec2(uPointer.x * aspect, uPointer.y);
  float t = uTime * 0.045;

  float d = distance(uv, cursor);
  float glow = exp(-d * 1.15);
  float tight = exp(-d * 3.5);

  vec2 q = uv + vec2(t * 0.6, -t * 0.4);
  float field = fbm(q * 1.3);

  float scan = sin(uv.y * 3.5 + uTime * 0.35) * 0.5 + 0.5;
  scan = pow(scan, 5.0);

  vec2 gridUv = uv * 14.0;
  vec2 g = abs(fract(gridUv) - 0.5);
  float dots = exp(-dot(g, g) * 180.0);

  float warp = tight * 0.5;
  vec2 warpedUv = uv + (uv - cursor) * warp * 0.15;
  vec2 lineUv = warpedUv * 1.2;
  float lines = sin(lineUv.x * 6.0 - lineUv.y * 4.0 + uTime * 0.2) * 0.5 + 0.5;
  lines = pow(lines, 8.0);

  vec3 dark = vec3(0.010, 0.008, 0.022);
  vec3 warm = vec3(1.0, 0.68, 0.22);
  vec3 cool = vec3(0.32, 0.22, 0.62);

  vec3 col = dark;
  col += glow * mix(cool, warm, 0.6) * 0.22;
  col += tight * warm * 0.12;
  col += field * cool * 0.035;
  col += scan * warm * 0.025;
  col += dots * mix(cool, warm, glow) * (0.03 + glow * 0.08);
  col += lines * cool * 0.04;

  col += mix(vec3(0.0), cool * 0.012, uv.y * 0.5 + 0.5);

  gl_FragColor = vec4(col, 1.0);
}
