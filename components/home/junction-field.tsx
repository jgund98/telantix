"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Container, Eyebrow } from "@/components/ui";

/**
 * The Junction Field — a living field of the Telantix mark. Every junction
 * turns to face your cursor, brightening as it nears, like a field of routes
 * all orienting to where you point. Built entirely from our own logo.
 * Autonomous drift keeps it alive with no pointer (and on touch).
 *
 * Perf contract: the rAF loop only runs while the section is on screen,
 * reads no layout inside the frame (size comes from a ResizeObserver),
 * and quantizes values so unchanged cells skip their style writes.
 */

function computeGrid(w: number) {
  const cell = w < 640 ? 58 : w < 1024 ? 80 : 96;
  const cols = Math.min(20, Math.max(4, Math.floor((w - 24) / cell)));
  const rows = w < 640 ? 7 : 6;
  return { cols, rows };
}

export function JunctionField() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<Array<HTMLDivElement | null>>([]);
  const centers = useRef<Array<{ x: number; y: number }>>([]);
  const pointer = useRef({ x: 0, y: 0, active: false });
  const size = useRef({ w: 1, h: 1 });
  const [grid, setGrid] = useState({ cols: 12, rows: 6 });

  // responsive grid
  useLayoutEffect(() => {
    const onResize = () => {
      const w = wrapRef.current?.clientWidth ?? window.innerWidth;
      setGrid(computeGrid(w));
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const total = grid.cols * grid.rows;

  // cache cell centers + field size whenever layout changes
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const measure = () => {
      size.current = { w: wrap.clientWidth || 1, h: wrap.clientHeight || 1 };
      centers.current = cellRefs.current.map((el) =>
        el
          ? { x: el.offsetLeft + el.offsetWidth / 2, y: el.offsetTop + el.offsetHeight / 2 }
          : { x: 0, y: 0 }
      );
    };
    measure();
    const id = window.setTimeout(measure, 60);

    const ro = new ResizeObserver(measure);
    ro.observe(wrap);

    return () => {
      window.clearTimeout(id);
      ro.disconnect();
    };
  }, [total, grid.cols, grid.rows]);

  // interaction + animation loop — alive only while on screen
  useEffect(() => {
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    if (!section || !wrap) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onMove = (e: PointerEvent) => {
      // one layout read per pointer event, only while hovering the field
      const r = wrap.getBoundingClientRect();
      pointer.current = { x: e.clientX - r.left, y: e.clientY - r.top, active: true };
    };
    const onLeave = () => {
      pointer.current.active = false;
    };
    wrap.addEventListener("pointermove", onMove, { passive: true });
    wrap.addEventListener("pointerleave", onLeave, { passive: true });

    // last written quantized values per cell — skip no-op style writes
    let lastAng: Float32Array = new Float32Array(0);
    let lastNear: Float32Array = new Float32Array(0);

    let raf = 0;
    let running = false;

    const render = (t: number) => {
      const { w, h } = size.current;
      let fx: number, fy: number;
      if (pointer.current.active) {
        fx = pointer.current.x;
        fy = pointer.current.y;
      } else {
        // autonomous drifting focal point — a slow Lissajous sweep
        fx = w * (0.5 + 0.44 * Math.cos(t * 0.00042));
        fy = h * (0.5 + 0.4 * Math.sin(t * 0.00055));
      }
      const reach = Math.hypot(w, h) * 0.34;
      const cs = centers.current;
      const cells = cellRefs.current;

      if (lastAng.length !== cells.length) {
        lastAng = new Float32Array(cells.length).fill(9999);
        lastNear = new Float32Array(cells.length).fill(-1);
      }

      for (let i = 0; i < cells.length; i++) {
        const el = cells[i];
        const c = cs[i];
        if (!el || !c) continue;
        const dx = fx - c.x;
        const dy = fy - c.y;
        // quantize: 0.5° / 0.01 steps are invisible but let far cells skip writes
        const ang = Math.round(Math.atan2(dy, dx) * (180 / Math.PI) * 2) / 2;
        const near = Math.round(Math.max(0, 1 - Math.hypot(dx, dy) / reach) * 100) / 100;
        if (ang === lastAng[i] && near === lastNear[i]) continue;
        lastAng[i] = ang;
        lastNear[i] = near;
        el.style.transform = `rotate(${ang + 45}deg) scale(${0.82 + near * 0.7})`;
        el.style.opacity = String(0.14 + near * 0.86);
      }
      if (running && !reduced) raf = requestAnimationFrame(render);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(render);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // the loop exists only while the section is actually visible
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "80px" }
    );
    io.observe(section);

    return () => {
      io.disconnect();
      stop();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [total]);

  const markPx = grid.cols > 14 ? 26 : grid.cols > 9 ? 34 : 30;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-hair-ink bg-ink text-paper"
    >
      {/* Field */}
      <div
        ref={wrapRef}
        className="absolute inset-0 grid"
        style={{ gridTemplateColumns: `repeat(${grid.cols}, 1fr)` }}
        aria-hidden
      >
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="flex items-center justify-center">
            <div
              ref={(el) => {
                cellRefs.current[i] = el;
              }}
              className="will-change-transform"
              style={{ opacity: 0.14 }}
            >
              <svg width={markPx} height={markPx * 1.22} viewBox="0 0 88 108" fill="none">
                <polygon points="8,20 36,20 43.5,27.5 29.5,41.5" fill="#F4F1EA" opacity="0.5" />
                <polygon points="66.5,50.5 88,72 60,72 52.5,64.5" fill="#F4F1EA" opacity="0.5" />
                <polygon points="0,80 80,0 80,28 0,108" fill="#F04E00" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Overlaid statement */}
      <Container className="relative z-10 pointer-events-none py-28 md:py-40">
        <div className="max-w-2xl">
          <Eyebrow dark>The whole network</Eyebrow>
          <h2 className="display mt-5 text-paper text-[clamp(2.6rem,7vw,5.4rem)] text-balance">
            Point us anywhere.
          </h2>
          <p className="mt-6 max-w-md text-[1.1rem] leading-relaxed text-paper/80 text-pretty">
            Every route turns to where you need it. Move your cursor — the whole
            network follows.
          </p>
        </div>
      </Container>
    </section>
  );
}
