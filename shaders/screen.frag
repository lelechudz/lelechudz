#include ./lib/bayer.glsl

uniform sampler2D uScreen;
uniform float uTime;
uniform float uBrightness;
uniform float uDitherSize;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  uv.x += sin(uv.y * 200.0 + uTime * 2.0) * 0.0005;

  vec3 color = texture2D(uScreen, uv).rgb * uBrightness;

  float scan = 0.95 + 0.05 * sin(uv.y * 800.0);
  color *= scan;

  vec2 pix = floor(vUv * 512.0 / uDitherSize);
  float bias = bayer8(pix);
  vec3 quantized = quantizeWarm(color, bias);

  gl_FragColor = vec4(quantized, 1.0);
}
