export const VERT = `
attribute vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }
`;

export const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2  uRes;
uniform float uTime;
uniform float uIntro;     // 0 -> 1 sunrise on load
uniform vec2  uMouse;     // smoothed pointer, -1..1
uniform float uAurora;    // 0..1, decays after a click
uniform float uAuroraX;   // aurora centre in p-space x
uniform float uStars;
uniform float uGrain;
uniform vec3  uWarm;
uniform vec3  uCool;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

void main() {
  float aspect = uRes.x / uRes.y;
  vec2 uv = gl_FragCoord.xy / uRes;                 // 0..1, y up
  vec2 p  = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
  vec2 q  = p - uMouse * vec2(0.02, 0.01);          // parallax on the limb

  // ---- planet limb: a big circle whose top arc is the horizon ----
  float R    = max(aspect * 1.7, 0.9);              // keeps curvature consistent across aspect ratios
  float topY = -0.5 + 0.20 - (1.0 - uIntro) * 0.25; // horizon height; rises during the intro
  vec2  c    = vec2(0.0, topY - R);
  float s    = length(q - c) - R;                   // >0 sky, <0 planet
  float sky  = smoothstep(-0.004, 0.004, s);

  // ---- sun drifting slowly along the limb ----
  float sunX   = -0.30 + 0.12 * sin(uTime * 0.07);
  vec2  sunPos = vec2(sunX, c.y + sqrt(max(R * R - sunX * sunX, 0.0)));
  float along  = q.x - sunX;
  float wide   = exp(-along * along * 3.3);         // 1 near the sun, fades along the horizon

  vec3 atmCol = mix(uCool, uWarm, wide * wide);
  vec3 light  = vec3(0.0);

  // faint violet haze in the sky toward the horizon
  light += uCool * 0.05 * exp(-max(s, 0.0) * 2.0) * sky;

  // atmosphere: soft wide glow + tighter inner glow
  float atm = exp(-max(s, 0.0) / 0.07) * mix(0.18, 1.0, wide);
  light += atmCol * atm * 0.55 * sky;
  light += atmCol * exp(-max(s, 0.0) / 0.012) * mix(0.2, 1.0, wide) * 0.6 * sky;

  // airglow: faint second band above the atmosphere
  float ag = exp(-pow((s - 0.13) / 0.03, 2.0));
  light += uCool * ag * 0.12 * sky;

  // rim: razor-thin line along the edge
  float rim    = exp(-(s * s) / (0.0022 * 0.0022));
  vec3  rimCol = mix(vec3(0.75, 0.55, 1.0), vec3(1.0, 0.82, 1.0), wide);
  light += rimCol * rim * mix(0.25, 1.0, wide) * 1.3;

  // cloud tops catching light just below the horizon
  float cl = noise(vec2(q.x * 6.0 + uTime * 0.02, s * 40.0));
  light += atmCol * exp(s / 0.02) * cl * 0.25 * (1.0 - sky) * mix(0.3, 1.0, wide);

  // sun flare: bright core, soft glare, horizontal streak
  float fd     = length(q - sunPos);
  float core   = 0.0004 / (fd * fd + 0.0004);
  float glare  = exp(-fd * 9.0) * 0.35;
  float streak = exp(-abs(q.y - sunPos.y) * 70.0) * exp(-abs(q.x - sunX) * 5.0) * 0.5;
  light += vec3(1.0, 0.92, 1.0) * core * 0.9 + uWarm * (glare + streak);

  // stars: sparse cell grid, twinkling, hidden near the horizon and below it
  vec2  g  = vec2(uv.x * aspect, uv.y) * 55.0 + uMouse * 0.6;
  vec2  id = floor(g);
  vec2  f  = fract(g) - 0.5;
  float r  = hash(id);
  float on = step(0.92, r);
  vec2  off = (vec2(hash(id + 3.1), hash(id + 7.7)) - 0.5) * 0.6;
  float sd = length(f - off);
  float tw = 0.55 + 0.45 * sin(uTime * (0.8 + r * 2.0) + r * 50.0);
  float st = on * smoothstep(0.09, 0.0, sd) * tw * (0.4 + 0.6 * hash(id + 9.0));
  light += vec3(0.85, 0.88, 1.0) * st * uStars * 1.2 * sky * smoothstep(0.05, 0.35, s);

  // aurora: raised by a click, decays on its own
  float ax    = q.x - uAuroraX;
  float env   = exp(-ax * ax * 5.0);
  float rays  = 0.5 + 0.5 * sin(q.x * 55.0 + sin(q.x * 9.0 + uTime * 0.8) * 2.0 + uTime * 1.2);
  float ah    = smoothstep(0.0, 0.06, s) * exp(-s * 3.5);
  vec3  acol  = mix(uCool, vec3(0.3, 1.0, 0.75), 0.5 + 0.5 * sin(uTime * 0.5 + q.x * 3.0));
  light += acol * env * rays * ah * uAurora * 0.55 * sky;

  // intro fade + soft tone map so highlights roll off instead of clipping
  light *= smoothstep(0.0, 1.0, uIntro);
  light  = 1.0 - exp(-light * 1.3);

  vec3 col = vec3(0.035) + light;                   // 0.035 ~ #090909, matches the site canvas

  // film grain
  col += (hash(gl_FragCoord.xy + fract(uTime) * 100.0) - 0.5) * uGrain * 0.04;

  gl_FragColor = vec4(col, 1.0);
}
`;
