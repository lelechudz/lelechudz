#include ./lib/bayer.glsl

uniform sampler2D tDiffuse;
uniform float uDitherSize;
uniform vec2 uResolution;
varying vec2 vUv;

void main() {
  vec4 src = texture2D(tDiffuse, vUv);
  vec2 pix = floor(vUv * uResolution / uDitherSize);
  float bias = bayer8(pix);
  vec3 quantized = quantizeWarm(src.rgb, bias);
  gl_FragColor = vec4(quantized, src.a);
}
