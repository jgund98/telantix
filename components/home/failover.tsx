"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Container, Eyebrow } from "@/components/ui";

/**
 * Failover, drawn straight on the paper — no card, no chrome.
 * The status is the loudest thing on screen: a display-type word that
 * flips as the network detects, reroutes, and recovers. The diagram
 * carries the proof underneath it.
 */

const ROUTE_A = "M 40 160 C 210 40 430 40 600 160";
const ROUTE_B = "M 40 160 C 210 280 430 280 600 160";

type Phase = {
  route: "A" | "B";
  aDown: boolean;
  word: string;
  label: string;
  tone: "ok" | "warn" | "reroute";
  dur: number;
};

const SEQ: Phase[] = [
  { route: "A", aDown: false, word: "HOLDING.", label: "MAIN ROUTE · DIRECT", tone: "ok", dur: 2600 },
  { route: "A", aDown: true, word: "SLIPPING.", label: "QUALITY DROPPED · 62% → 41%", tone: "warn", dur: 1500 },
  { route: "B", aDown: true, word: "REROUTED.", label: "MOVED TO BACKUP · MID-DIAL", tone: "reroute", dur: 2600 },
  { route: "A", aDown: false, word: "RESTORED.", label: "MAIN ROUTE BACK · RECHECKED", tone: "ok", dur: 1900 },
];

export function Failover() {
  const wrapRef = useRef(null);
  const inView = useInView(wrapRef, { margin: "-15%" });
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setI((v) => (v + 1) % SEQ.length), SEQ[i].dur);
    return () => clearTimeout(t);
  }, [i, inView]);

  const phase = SEQ[i];
  const activePath = phase.route === "A" ? ROUTE_A : ROUTE_B;
  const wordColor =
    phase.tone === "ok" ? "text-ink" : "text-signal";

  return (
    <section className="border-b border-hair bg-paper py-24 md:py-32" ref={wrapRef}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
          {/* Copy + the status word */}
          <div>
            <Eyebrow>How calls stay up</Eyebrow>
            <h2 className="display mt-5 text-ink text-[clamp(2rem,4.6vw,3.2rem)] text-balance">
              A route drops. The call doesn&apos;t.
            </h2>

            {/* Network status — the loudest element in the section */}
            <div className="mt-10 border-t-2 border-ink pt-5">
              <span className="mono-label text-[0.62rem] text-stone">
                NETWORK STATUS
              </span>
              <div className="relative mt-2 h-[1.1em] text-[clamp(3rem,7.5vw,5.2rem)]">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={phase.word}
                    initial={{ y: "70%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-70%", opacity: 0 }}
                    transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                    className={`display absolute inset-x-0 leading-none ${wordColor}`}
                  >
                    {phase.word}
                  </motion.div>
                </AnimatePresence>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={phase.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mono-label mt-3 text-[0.68rem] text-mute"
                >
                  {phase.label}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-10 hidden border-t border-hair lg:block">
              {[
                { k: "WE SPOT IT", v: "In under a second" },
                { k: "WE MOVE IT", v: "Automatically, best route first" },
                { k: "WE RECHECK", v: "Every route, every 60 seconds" },
              ].map((r) => (
                <div key={r.k} className="flex items-center justify-between border-b border-hair py-4">
                  <span className="mono-label text-[0.7rem] text-stone">{r.k}</span>
                  <span className="text-[0.98rem] text-ink">{r.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Diagram — unboxed, straight on the paper */}
          <div>
            <svg viewBox="-16 0 672 340" className="w-full h-auto" fill="none">
              {/* Route A */}
              <path
                d={ROUTE_A}
                stroke={phase.aDown ? "var(--color-stone)" : phase.route === "A" ? "var(--color-signal)" : "var(--color-hair)"}
                strokeWidth={phase.route === "A" && !phase.aDown ? 3 : 2}
                strokeDasharray={phase.aDown ? "6 8" : "0"}
                className="transition-all duration-500"
              />
              {/* Route B */}
              <path
                d={ROUTE_B}
                stroke={phase.route === "B" ? "var(--color-signal)" : "var(--color-hair)"}
                strokeWidth={phase.route === "B" ? 3 : 2}
                className="transition-all duration-500"
              />

              {/* Route labels */}
              <text x="320" y="58" textAnchor="middle" className="font-mono" fontSize="17" letterSpacing="0.08em" fill={phase.aDown ? "var(--color-stone)" : "var(--color-mute)"}>
                MAIN ROUTE{phase.aDown ? " · DOWN" : ""}
              </text>
              <text x="320" y="308" textAnchor="middle" className="font-mono" fontSize="17" letterSpacing="0.08em" fill={phase.route === "B" ? "var(--color-signal)" : "var(--color-mute-2)"}>
                BACKUP ROUTE
              </text>

              {/* Break mark on the down route — a clean severance, no box */}
              <AnimatePresence>
                {phase.aDown && (
                  <motion.text
                    x="320"
                    y="98"
                    textAnchor="middle"
                    className="font-mono"
                    fontSize="24"
                    fill="var(--color-stone)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    ×
                  </motion.text>
                )}
              </AnimatePresence>

              {/* Origin */}
              <circle cx="40" cy="160" r="9" fill="var(--color-ink)" />
              <text x="40" y="200" textAnchor="middle" className="font-mono" fontSize="15" letterSpacing="0.08em" fill="var(--color-mute)">
                CALL IN
              </text>

              {/* Destination */}
              <circle cx="600" cy="160" r="9" fill="var(--color-ink)" />
              <motion.circle
                cx="600"
                cy="160"
                r="9"
                fill="none"
                stroke="var(--color-signal)"
                strokeWidth="2.5"
                key={`arrive-${i}`}
                initial={{ r: 9, opacity: 0 }}
                animate={{ r: 26, opacity: [0, 0.8, 0] }}
                transition={{ duration: 0.9, delay: phase.dur / 1000 - 0.9 > 0 ? phase.dur / 1000 - 0.95 : 0.5 }}
              />
              <text x="600" y="200" textAnchor="middle" className="font-mono" fontSize="15" letterSpacing="0.08em" fill="var(--color-mute)">
                CONNECTED
              </text>

              {/* Running packet */}
              <motion.circle
                key={`pkt-${i}`}
                r="6.5"
                fill="var(--color-signal)"
                style={{ offsetPath: `path("${activePath}")` } as React.CSSProperties}
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ duration: Math.min(phase.dur / 1000 - 0.4, 2), ease: "easeInOut" }}
              />
            </svg>

            {/* Proof ledger */}
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-hair pt-5">
              {[
                { k: "TIME TO CONNECT", v: "380ms" },
                { k: "CARRYING CALLS", v: phase.route === "A" ? "MAIN" : "BACKUP" },
                { k: "CALLS DROPPED", v: "0" },
              ].map((m) => (
                <div key={m.k}>
                  <div className="mono-label text-[0.6rem] text-stone">{m.k}</div>
                  <div className="mono-label mt-1.5 text-[1rem] text-ink tnum">{m.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
