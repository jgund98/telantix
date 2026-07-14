"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Container, Eyebrow } from "@/components/ui";

const ROUTE_A = "M 70 150 C 220 55 400 55 560 150";
const ROUTE_B = "M 70 150 C 220 245 400 245 560 150";

type Phase = { route: "A" | "B"; aDown: boolean; label: string; tone: "ok" | "warn" | "reroute"; dur: number };

const SEQ: Phase[] = [
  { route: "A", aDown: false, label: "MAIN ROUTE · DIRECT", tone: "ok", dur: 2600 },
  { route: "A", aDown: true, label: "QUALITY DROPPED · 62% → 41%", tone: "warn", dur: 1500 },
  { route: "B", aDown: true, label: "MOVED TO BACKUP ROUTE", tone: "reroute", dur: 2600 },
  { route: "A", aDown: false, label: "MAIN ROUTE BACK · RECHECKED", tone: "ok", dur: 1900 },
];

export function Failover() {
  const wrapRef = useRef(null);
  const inView = useInView(wrapRef, { once: true, margin: "-15%" });
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setI((v) => (v + 1) % SEQ.length), SEQ[i].dur);
    return () => clearTimeout(t);
  }, [i, inView]);

  const phase = SEQ[i];
  const activePath = phase.route === "A" ? ROUTE_A : ROUTE_B;

  return (
    <section className="border-b border-hair bg-paper py-24 md:py-32" ref={wrapRef}>
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          {/* Copy */}
          <div>
            <Eyebrow>How calls stay up</Eyebrow>
            <h2 className="display mt-5 text-ink text-[clamp(2.2rem,5vw,3.6rem)] text-balance">
              A route drops.
              <br />
              The call doesn&apos;t.
            </h2>
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-mute text-pretty">
              Every route has an answer-rate floor we won&apos;t dip below. The
              moment one slips, we move your live campaign to the next best route —
              mid-dial, with nothing dropped and nobody paged.
            </p>

            <div className="mt-10 space-y-0 border-t border-hair">
              {[
                { k: "WE SPOT IT", v: "In under a second" },
                { k: "WE MOVE IT", v: "Automatically, best route first" },
                { k: "WE RECHECK", v: "Every route, every 60 seconds" },
              ].map((r) => (
                <div
                  key={r.k}
                  className="flex items-center justify-between border-b border-hair py-4"
                >
                  <span className="mono-label text-[0.7rem] text-stone">{r.k}</span>
                  <span className="text-[0.98rem] text-ink">{r.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Diagram */}
          <div className="relative">
            <div className="border border-hair bg-white p-6 md:p-8">
              {/* readout header */}
              <div className="mb-4 flex items-center justify-between">
                <span className="mono-label text-[0.66rem] text-stone">
                  LIVE REROUTE · EXAMPLE
                </span>
                <motion.span
                  key={phase.label}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`mono-label text-[0.66rem] ${
                    phase.tone === "ok"
                      ? "text-mute"
                      : phase.tone === "warn"
                      ? "text-signal"
                      : "text-ink"
                  }`}
                >
                  {phase.label}
                </motion.span>
              </div>

              <svg viewBox="0 0 630 300" className="w-full h-auto" fill="none">
                {/* Route A */}
                <path
                  d={ROUTE_A}
                  stroke={phase.aDown ? "var(--color-stone)" : phase.route === "A" ? "var(--color-signal)" : "var(--color-hair)"}
                  strokeWidth={phase.route === "A" && !phase.aDown ? 2.5 : 1.5}
                  strokeDasharray={phase.aDown ? "5 6" : "0"}
                  className="transition-all duration-500"
                />
                {/* Route B */}
                <path
                  d={ROUTE_B}
                  stroke={phase.route === "B" ? "var(--color-signal)" : "var(--color-hair)"}
                  strokeWidth={phase.route === "B" ? 2.5 : 1.5}
                  className="transition-all duration-500"
                />

                {/* Route labels */}
                <text x="300" y="66" textAnchor="middle" className="font-mono" fontSize="16" letterSpacing="0.08em" fill={phase.aDown ? "var(--color-stone)" : "var(--color-mute)"}>
                  MAIN ROUTE {phase.aDown ? "· DOWN" : ""}
                </text>
                <text x="300" y="242" textAnchor="middle" className="font-mono" fontSize="16" letterSpacing="0.08em" fill={phase.route === "B" ? "var(--color-signal)" : "var(--color-mute-2)"}>
                  BACKUP ROUTE
                </text>

                {/* Down marker on A */}
                <AnimatePresence>
                  {phase.aDown && (
                    <motion.g
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.3 }}
                    >
                      <rect x="300" y="86" width="30" height="30" transform="translate(-15 0)" fill="var(--color-paper)" stroke="var(--color-stone)" />
                      <path d="M 293 94 L 307 108 M 307 94 L 293 108" stroke="var(--color-mute)" strokeWidth="2" />
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* Origin */}
                <circle cx="70" cy="150" r="8" fill="var(--color-ink)" />
                <text x="70" y="188" textAnchor="middle" className="font-mono" fontSize="15" letterSpacing="0.08em" fill="var(--color-mute)">CALL IN</text>

                {/* Destination */}
                <circle cx="560" cy="150" r="8" fill="var(--color-ink)" />
                <motion.circle
                  cx="560"
                  cy="150"
                  r="8"
                  fill="none"
                  stroke="var(--color-signal)"
                  strokeWidth="2"
                  key={`arrive-${i}`}
                  initial={{ r: 8, opacity: 0 }}
                  animate={{ r: 22, opacity: [0, 0.8, 0] }}
                  transition={{ duration: 0.9, delay: phase.dur / 1000 - 0.9 > 0 ? phase.dur / 1000 - 0.95 : 0.5 }}
                />
                <text x="560" y="188" textAnchor="middle" className="font-mono" fontSize="15" letterSpacing="0.08em" fill="var(--color-mute)">CONNECTED</text>

                {/* Running packet */}
                <motion.circle
                  key={`pkt-${i}`}
                  r="5.5"
                  fill="var(--color-signal)"
                  style={{ offsetPath: `path("${activePath}")` } as React.CSSProperties}
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "100%" }}
                  transition={{ duration: Math.min(phase.dur / 1000 - 0.4, 2), ease: "easeInOut" }}
                />
              </svg>

              {/* footer metrics */}
              <div className="mt-4 grid grid-cols-3 gap-4 border-t border-hair pt-4">
                {[
                  { k: "TIME TO CONNECT", v: "380ms" },
                  { k: "CARRYING CALLS", v: phase.route === "A" ? "MAIN" : "BACKUP" },
                  { k: "CALLS DROPPED", v: "0" },
                ].map((m) => (
                  <div key={m.k}>
                    <div className="mono-label text-[0.6rem] text-stone">{m.k}</div>
                    <div className="mono-label mt-1 text-[0.85rem] text-ink tnum">{m.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
