#include ./lib/bayer.glsl

uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  float y = uv.y;

  float w = 0.0;
  w += sin(uv.x * 12.0 + uTime * 0.8) * 0.06;
  w += sin(uv.x * 25.0 - uTime * 0.5) * 0.04;
  w += sin(uv.x * 50.0 + uTime * 1.3) * 0.02;

  float center = 0.5 + w;
  float dist = abs(y - center);
  float line = smoothstep(0.12, 0.0, dist);

  vec3 col = mix(vec3(0.047, 0.039, 0.078), vec3(1.0, 0.701, 0.278), line);

  vec2 pix = floor(vUv * uResolution / 3.0);
  float bias = bayer8(pix);
  col = quantizeWarm(col, bias);

  gl_FragColor = vec4(col, 1.0);
}
