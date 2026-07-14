"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container, Eyebrow } from "@/components/ui";

/**
 * "We sign your calls." — the degradation instrument.
 * One signal path, drawn full-width. Add middlemen and watch the caller ID
 * literally decode into "SPAM LIKELY": the readout scrambles, the attestation
 * stamp downgrades, the answer-rate ruler drains. Typography does the work —
 * no cards, no panels.
 */

type Stop = {
  caller: string;
  sub: string;
  grade: string;
  gradeLabel: string;
  answer: number;
  verified: boolean;
};

const STOPS: Stop[] = [
  { caller: "ACME SUPPORT", sub: "VERIFIED CALLER", grade: "A", gradeLabel: "SIGNED AT THE EDGE", answer: 78, verified: true },
  { caller: "(512) 555-0148", sub: "UNVERIFIED", grade: "B", gradeLabel: "PARTIAL ATTESTATION", answer: 57, verified: false },
  { caller: "UNKNOWN CALLER", sub: "NO IDENTITY", grade: "C", gradeLabel: "GATEWAY ATTESTATION", answer: 41, verified: false },
  { caller: "SPAM LIKELY", sub: "BLOCKED BY MOST PHONES", grade: "—", gradeLabel: "UNSIGNED", answer: 28, verified: false },
];

const GLYPHS = "TELANTIX#0123456789*/+—";

/** Decode-scramble: on change, the text resolves left-to-right through noise. */
function useScramble(target: string, duration = 620) {
  const [display, setDisplay] = useState(target);
  const prev = useRef(target);

  useEffect(() => {
    if (prev.current === target) return;
    prev.current = target;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const settled = Math.floor(target.length * p);
      let out = target.slice(0, settled);
      for (let i = settled; i < target.length; i++) {
        const ch = target[i];
        out += ch === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setDisplay(out);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return display;
}

/** The signal path: Junction mark → hops → carrier. Packet runs it on loop. */
function SignalPath({ hops }: { hops: number }) {
  const fractions = Array.from({ length: hops }, (_, i) => (i + 1) / (hops + 1));
  const segs = hops + 1;

  // packet opacity steps down at each hop it crosses
  const opacityValues: number[] = [1];
  const opacityTimes: number[] = [0];
  fractions.forEach((f) => {
    const before = 1 - (opacityValues.length - 1) * 0.3;
    opacityValues.push(before, Math.max(0.25, before - 0.3));
    opacityTimes.push(f, f);
  });
  opacityValues.push(opacityValues[opacityValues.length - 1]);
  opacityTimes.push(1);

  return (
    <div className="relative">
      {/* endpoint labels */}
      <div className="mb-3 flex items-center justify-between mono-label text-[0.62rem] text-stone">
        <span>YOU · ON TELANTIX</span>
        <span>DESTINATION CARRIER</span>
      </div>

      <div className="relative flex h-12 items-center">
        {/* the Junction — we stand at the signing edge */}
        <svg viewBox="0 0 88 108" className="relative z-10 h-9 w-auto shrink-0" aria-hidden>
          <polygon points="8,20 36,20 43.5,27.5 29.5,41.5" fill="var(--color-ink)" />
          <polygon points="66.5,50.5 88,72 60,72 52.5,64.5" fill="var(--color-ink)" />
          <polygon points="0,80 80,0 80,28 0,108" fill="var(--color-signal)" />
        </svg>

        {/* track */}
        <div className="relative mx-4 h-12 flex-1">
          {/* segments — each hop dims the signal that leaves it */}
          <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2">
            {Array.from({ length: segs }).map((_, i) => (
              <div
                key={`${hops}-${i}`}
                className="h-[2.5px] flex-1"
                style={{
                  background: "var(--color-signal)",
                  opacity: Math.max(0.18, 1 - i * 0.3),
                }}
              />
            ))}
          </div>

          {/* hop nodes */}
          <AnimatePresence>
            {fractions.map((f, i) => (
              <motion.span
                key={`hop-${i}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 22 }}
                className="absolute top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                style={{ left: `${f * 100}%` }}
              >
                <span className="h-4 w-4 rounded-full border-[2.5px] border-stone bg-paper" />
                <span className="absolute top-6 mono-label text-[0.56rem] text-stone whitespace-nowrap">
                  RESELLER
                </span>
              </motion.span>
            ))}
          </AnimatePresence>

          {/* running packet — dims as it crosses each hop */}
          <motion.div
            key={`pkt-${hops}`}
            className="absolute top-1/2 z-20 -translate-y-1/2"
            initial={{ left: "0%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 2.6, ease: "linear", repeat: Infinity }}
          >
            <motion.span
              key={`pkt-o-${hops}`}
              className="block h-3 w-3 -translate-x-1/2 rounded-full bg-signal"
              initial={{ opacity: 1 }}
              animate={{ opacity: opacityValues }}
              transition={{ duration: 2.6, ease: "linear", repeat: Infinity, times: opacityTimes }}
            />
          </motion.div>
        </div>

        {/* carrier terminal */}
        <span className="relative z-10 block h-4 w-4 shrink-0 bg-ink" />
      </div>
    </div>
  );
}

export function VerifiedCall() {
  const [hops, setHops] = useState(0);
  const stop = STOPS[hops];
  const scrambled = useScramble(stop.caller);

  return (
    <section className="border-b border-hair bg-paper py-24 md:py-32">
      <Container>
        {/* Header row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Caller ID that survives</Eyebrow>
            <h2 className="display mt-5 max-w-2xl text-ink text-[clamp(2rem,4.6vw,3.4rem)] text-balance">
              We sign your calls. Not somebody three hops away.
            </h2>
          </div>
          <p className="max-w-xs text-[1rem] leading-relaxed text-mute text-pretty">
            Every reseller re-wraps your caller ID and waters it down. Add
            middlemen — watch what survives.
          </p>
        </div>

        {/* The signal path */}
        <div className="mt-14 md:mt-16">
          <SignalPath hops={hops} />
        </div>

        {/* Controls — a counter, not a widget */}
        <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-hair pt-6 md:mt-14">
          <span className="mono-label mr-auto text-[0.66rem] text-stone">
            MIDDLEMEN<span className="hidden sm:inline"> BETWEEN YOU AND THE CARRIER</span> · {hops} / 3
          </span>
          <button
            onClick={() => setHops((h) => Math.max(0, h - 1))}
            disabled={hops === 0}
            className="mono-label border border-ink/25 px-5 py-3 text-[0.72rem] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-25"
          >
            − REMOVE
          </button>
          <button
            onClick={() => setHops((h) => Math.min(3, h + 1))}
            disabled={hops === 3}
            className="mono-label bg-ink px-5 py-3 text-[0.72rem] text-paper transition-colors hover:bg-signal disabled:pointer-events-none disabled:opacity-25"
          >
            + ADD MIDDLEMAN
          </button>
        </div>

        {/* The readout — what their phone shows, in poster type */}
        <div className="mt-12 grid items-end gap-10 md:mt-16 md:grid-cols-[1fr_auto] md:gap-16">
          <div className="min-w-0">
            <div className="mono-label text-[0.66rem] text-stone">
              WHAT THEIR PHONE SHOWS
            </div>
            <div
              className={`display mt-4 break-words text-[clamp(2.3rem,7.4vw,6rem)] tnum transition-colors duration-300 ${
                stop.verified ? "text-ink" : hops === 3 ? "text-stone" : "text-mute"
              }`}
            >
              {scrambled}
            </div>
            <div className="mt-4 flex items-center gap-2.5">
              <span
                className={`block h-2 w-2 ${
                  stop.verified ? "bg-signal" : "border border-stone"
                }`}
              />
              <AnimatePresence mode="wait">
                <motion.span
                  key={stop.sub}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={`mono-label text-[0.7rem] ${
                    stop.verified ? "text-signal" : "text-mute-2"
                  }`}
                >
                  {stop.sub}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Attestation stamp */}
          <div className="shrink-0">
            <motion.div
              key={stop.grade}
              initial={{ scale: 1.45, opacity: 0, rotate: -9 }}
              animate={{ scale: 1, opacity: 1, rotate: -3 }}
              transition={{ type: "spring", stiffness: 320, damping: 16 }}
              className={`inline-flex flex-col items-center border-[3px] px-8 py-5 md:px-10 md:py-6 ${
                stop.verified ? "border-signal" : "border-stone border-dashed"
              }`}
            >
              <span
                className={`display text-[clamp(3.4rem,7vw,5.6rem)] leading-none ${
                  stop.verified ? "text-signal" : "text-stone"
                }`}
              >
                {stop.grade}
              </span>
              <span className="mono-label mt-2 text-[0.6rem] text-mute whitespace-nowrap">
                {stop.gradeLabel}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Answer-rate ruler */}
        <div className="mt-14 md:mt-16">
          <div className="flex items-baseline justify-between">
            <span className="mono-label text-[0.66rem] text-stone">
              LIKELY ANSWER RATE
            </span>
            <span className="display text-ink text-[clamp(1.6rem,3vw,2.4rem)] tnum">
              {stop.answer}
              <span className="text-signal">%</span>
            </span>
          </div>
          <div className="relative mt-3 h-8">
            {/* tick ruler */}
            <div className="absolute inset-x-0 top-0 flex justify-between">
              {Array.from({ length: 21 }).map((_, i) => (
                <span
                  key={i}
                  className="w-px bg-hair"
                  style={{ height: i % 5 === 0 ? 16 : 8 }}
                />
              ))}
            </div>
            {/* fill */}
            <motion.div
              className="absolute left-0 top-0 h-4 bg-signal mix-blend-multiply"
              animate={{ width: `${stop.answer}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 22 }}
              style={{ opacity: stop.verified ? 1 : 0.45 }}
            />
          </div>
          <div className="mt-1 flex justify-between mono-label text-[0.6rem] text-stone tnum">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
