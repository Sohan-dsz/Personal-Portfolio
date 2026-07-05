"use client";

import { useEffect, useRef } from "react";

type Dot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function HeroAuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.6);

    const state = {
      w: 0,
      h: 0,
      dots: [] as Dot[],
      mouseX: -1e9,
      mouseY: -1e9,
      lastT: performance.now(),
    };

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      state.w = Math.max(1, Math.floor(rect.width));
      state.h = Math.max(1, Math.floor(rect.height));

      canvas.width = Math.floor(state.w * dpr);
      canvas.height = Math.floor(state.h * dpr);

      canvas.style.width = `${state.w}px`;
      canvas.style.height = `${state.h}px`;

      // Denser than typical; responsive cap for performance.
      const area = state.w * state.h;
      const target = clamp(Math.floor(area / 9500), 55, 150);

      // Initialize / re-seed dots.
      state.dots = Array.from({ length: target }, () => {
        const hue = Math.random() < 0.55 ? 185 + Math.random() * 25 : 265 + Math.random() * 25; // cyan-ish / purple-ish
        const speed = prefersReducedMotion ? 0.0 : 0.15 + Math.random() * 0.35;

        return {
          x: Math.random() * state.w,
          y: Math.random() * state.h,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          r: 0.9 + Math.random() * 1.9,
          hue,
        };
      });
    };

    const onResize = () => resize();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      state.mouseX = e.clientX - rect.left;
      state.mouseY = e.clientY - rect.top;
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const rect = canvas.getBoundingClientRect();
      state.mouseX = t.clientX - rect.left;
      state.mouseY = t.clientY - rect.top;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    resize();

    const draw = (now: number) => {
      if (!running) return;

      const dt = Math.min(0.05, (now - state.lastT) / 1000);
      state.lastT = now;

      const w = state.w;
      const h = state.h;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Dark base; keep readability.
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(10,14,23,0.10)";
      ctx.fillRect(0, 0, w, h);

      // Background vignette gradient (subtle).
      const vignette = ctx.createRadialGradient(
        w * 0.5,
        h * 0.35,
        Math.min(w, h) * 0.1,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.75
      );
      vignette.addColorStop(0, "rgba(10,14,23,0.00)");
      vignette.addColorStop(1, "rgba(10,14,23,0.60)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      const maxDist = clamp(Math.min(w, h) * 0.22, 95, 170);
      const maxDist2 = maxDist * maxDist;

      // Update dots
      for (const p of state.dots) {
        if (!prefersReducedMotion) {
          // Gentle drift
          p.x += p.vx * (dt * 60);
          p.y += p.vy * (dt * 60);

          // Mouse attraction
          const dxm = p.x - state.mouseX;
          const dym = p.y - state.mouseY;
          const dm2 = dxm * dxm + dym * dym;

          if (state.mouseX > -1e8 && dm2 < maxDist2 * 4) {
            const dm = Math.sqrt(dm2) || 1;
            const pull = (1 - dm / Math.sqrt(maxDist2 * 4)) * 0.055;
            p.x += (-dxm / dm) * pull * (dt * 60);
            p.y += (-dym / dm) * pull * (dt * 60);
          }

          // Wrap bounds
          if (p.x < -20) p.x = w + 20;
          if (p.x > w + 20) p.x = -20;
          if (p.y < -20) p.y = h + 20;
          if (p.y > h + 20) p.y = -20;
        }
      }

      // Lines
      ctx.lineWidth = 1;
      for (let i = 0; i < state.dots.length; i++) {
        const a = state.dots[i];
        for (let j = i + 1; j < state.dots.length; j++) {
          const b = state.dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > maxDist2) continue;

          const t = 1 - d2 / maxDist2;

          const alpha = 0.10 + t * 0.20; // keep text readable
          const hue = (a.hue + b.hue) * 0.5;

          ctx.strokeStyle = `hsla(${hue}, 100%, 65%, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Dots
      for (const p of state.dots) {
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5.5);
        glow.addColorStop(0, `hsla(${p.hue}, 100%, 70%, 0.35)`);
        glow.addColorStop(0.25, `hsla(${p.hue}, 100%, 65%, 0.18)`);
        glow.addColorStop(1, `hsla(${p.hue}, 100%, 60%, 0.0)`);

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 5.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, 0.55)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-1 overflow-hidden"
    >
      <canvas ref={canvasRef} className="h-full w-full opacity-70" />
    </div>
  );
}
