// 8x8 Bayer matrix for ordered dithering
// Returns value in [0, 1) for a given integer pixel position.
float bayer8(vec2 p) {
  int x = int(mod(p.x, 8.0));
  int y = int(mod(p.y, 8.0));
  int idx = x + y * 8;
  int table[64];
  table[0]=0;   table[1]=32;  table[2]=8;   table[3]=40;  table[4]=2;   table[5]=34;  table[6]=10;  table[7]=42;
  table[8]=48;  table[9]=16;  table[10]=56; table[11]=24; table[12]=50; table[13]=18; table[14]=58; table[15]=26;
  table[16]=12; table[17]=44; table[18]=4;  table[19]=36; table[20]=14; table[21]=46; table[22]=6;  table[23]=38;
  table[24]=60; table[25]=28; table[26]=52; table[27]=20; table[28]=62; table[29]=30; table[30]=54; table[31]=22;
  table[32]=3;  table[33]=35; table[34]=11; table[35]=43; table[36]=1;  table[37]=33; table[38]=9;  table[39]=41;
  table[40]=51; table[41]=19; table[42]=59; table[43]=27; table[44]=49; table[45]=17; table[46]=57; table[47]=25;
  table[48]=15; table[49]=47; table[50]=7;  table[51]=39; table[52]=13; table[53]=45; table[54]=5;  table[55]=37;
  table[56]=63; table[57]=31; table[58]=55; table[59]=23; table[60]=61; table[61]=29; table[62]=53; table[63]=21;
  return float(table[idx]) / 64.0;
}

// Warm palette quantization: snap color to one of 4 palette entries
// weighted by luminance+hue proximity. Adds Bayer-offset before snapping.
vec3 quantizeWarm(vec3 c, float bayerOffset) {
  vec3 p0 = vec3(0.047, 0.039, 0.078); // #0c0a14
  vec3 p1 = vec3(1.000, 0.850, 0.627); // #ffd9a0
  vec3 p2 = vec3(1.000, 0.701, 0.278); // #ffb347
  vec3 p3 = vec3(0.776, 0.415, 0.992); // #c66afd

  vec3 offset = c + (bayerOffset - 0.5) * 0.25;
  float d0 = distance(offset, p0);
  float d1 = distance(offset, p1);
  float d2 = distance(offset, p2);
  float d3 = distance(offset, p3);

  vec3 best = p0;
  float bestD = d0;
  if (d1 < bestD) { best = p1; bestD = d1; }
  if (d2 < bestD) { best = p2; bestD = d2; }
  if (d3 < bestD) { best = p3; bestD = d3; }
  return best;
}
