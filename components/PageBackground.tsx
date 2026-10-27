"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { VERT, FRAG } from "./horizonBloomShader";

// Tuning knobs. Only change these if the Phase 5 checks ask for it.
const SETTINGS = {
  warm: "#FF9FFC",   // sun-side glow
  cool: "#5227FF",   // shadow-side glow
  stars: 0.5,
  grain: 0.25,
  speed: 0.5,        // multiplies time: twinkle, drift, aurora motion
  introSeconds: 2.6,
  interactive: true,
};

function hexToVec3(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function PageBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // Full strength in the hero, calmer behind the content: 0 -> 0.55 over the first ~800px of scroll.
  const dim = useTransform(scrollY, [0, 800], [0, 0.55]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) return; // canvas stays invisible, the CSS fallback shows

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    // one full-screen triangle
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = U("uRes"), uTime = U("uTime"), uIntro = U("uIntro"), uMouse = U("uMouse");
    const uAurora = U("uAurora"), uAuroraX = U("uAuroraX");
    const uStars = U("uStars"), uGrain = U("uGrain"), uWarm = U("uWarm"), uCool = U("uCool");

    const [wR, wG, wB] = hexToVec3(SETTINGS.warm);
    const [cR, cG, cB] = hexToVec3(SETTINGS.cool);
    gl.uniform1f(uStars, SETTINGS.stars);
    gl.uniform1f(uGrain, SETTINGS.grain);
    gl.uniform3f(uWarm, wR, wG, wB);
    gl.uniform3f(uCool, cR, cG, cB);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let aurora = 0;
    let auroraX = 0;
    let raf = 0;
    let first = true;
    const t0 = performance.now();

    const resize = () => {
      const cap = window.innerWidth < 768 ? 1.25 : 1.5; // cap pixel ratio for performance
      const dpr = Math.min(window.devicePixelRatio || 1, cap);
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };

    const draw = (now: number) => {
      const elapsed = (now - t0) / 1000;
      const t = reduce ? 8.0 : elapsed * SETTINGS.speed * 2.0; // reduced motion: one fixed, pleasant frame
      const intro = reduce ? 1 : Math.min(elapsed / SETTINGS.introSeconds, 1);

      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      aurora *= 0.985;

      gl.uniform1f(uTime, t);
      gl.uniform1f(uIntro, 1 - Math.pow(1 - intro, 3)); // ease-out cubic
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uAurora, aurora);
      gl.uniform1f(uAuroraX, auroraX);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (first) {
        first = false;
        canvas.dataset.ready = "true"; // triggers the CSS fade-in
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      resize();
      if (reduce) draw(performance.now()); // static frame must be redrawn after a resize
    };

    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onDown = (e: PointerEvent) => {
      const aspect = window.innerWidth / window.innerHeight;
      auroraX = (e.clientX / window.innerWidth - 0.5) * aspect;
      aurora = 1;
    };
    const onVisibility = () => {
      if (reduce) return;
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(draw);
    };
    const onLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
      canvas.dataset.ready = "false"; // fall back to the CSS gradient
    };

    resize();
    window.addEventListener("resize", onResize);
    canvas.addEventListener("webglcontextlost", onLost);
    document.addEventListener("visibilitychange", onVisibility);
    if (SETTINGS.interactive && !reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
    }
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("webglcontextlost", onLost);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [reduce]);

  return (
    <div aria-hidden="true" className="page-bg">
      <div className="page-bg__fallback" />
      <canvas ref={canvasRef} className="page-bg__canvas" />
      <motion.div className="page-bg__dim" style={{ opacity: dim }} />
    </div>
  );
}
