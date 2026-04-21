uniform sampler2D uScreen;
uniform float uTime;
uniform float uBrightness;
uniform float uDitherSize;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  uv.x += sin(uv.y * 240.0 + uTime * 1.6) * 0.00025;

  vec3 color = texture2D(uScreen, uv).rgb * uBrightness;

  float scan = 0.97 + 0.03 * sin(uv.y * 1600.0);
  color *= scan;

  vec2 pix = floor(vUv * 512.0 / max(uDitherSize, 0.5));
  float bias = bayer8(pix);
  color += (bias - 0.5) * 0.012;

  gl_FragColor = vec4(color, 1.0);
}
