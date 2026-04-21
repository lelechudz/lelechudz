uniform float uDitherSize;
uniform vec2 uResolution;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 pix = floor(uv * uResolution / uDitherSize);
  float bias = bayer8(pix);
  vec3 quantized = quantizeWarm(inputColor.rgb, bias);
  outputColor = vec4(quantized, inputColor.a);
}
