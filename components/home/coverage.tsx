"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Container, Eyebrow, ButtonLink } from "@/components/ui";

/**
 * The auto-dialer. A working T9 keypad dials each metro's area code
 * key-by-key, rings, and connects — stamping the live answer rate.
 * Tap the keys yourself and dial any U.S. area code we route.
 * The whole coverage story, no scrolling ledger.
 */

type Metro = { code: string; city: string; asr: number; premium?: boolean };

const METROS: Metro[] = [
  { code: "212", city: "New York", asr: 76, premium: true },
  { code: "214", city: "Dallas", asr: 73, premium: true },
  { code: "312", city: "Chicago", asr: 72 },
  { code: "213", city: "Los Angeles", asr: 74, premium: true },
  { code: "713", city: "Houston", asr: 71 },
  { code: "305", city: "Miami", asr: 72 },
  { code: "404", city: "Atlanta", asr: 71 },
  { code: "602", city: "Phoenix", asr: 69 },
  { code: "215", city: "Philadelphia", asr: 70 },
  { code: "617", city: "Boston", asr: 70 },
  { code: "469", city: "Dallas Metro", asr: 72, premium: true },
  { code: "512", city: "Austin", asr: 71 },
  { code: "206", city: "Seattle", asr: 69 },
  { code: "702", city: "Las Vegas", asr: 67 },
  { code: "615", city: "Nashville", asr: 69 },
  { code: "704", city: "Charlotte", asr: 70 },
  { code: "210", city: "San Antonio", asr: 68 },
  { code: "303", city: "Denver", asr: 68 },
  { code: "407", city: "Orlando", asr: 68 },
  { code: "816", city: "Kansas City", asr: 67 },
  { code: "503", city: "Portland", asr: 68 },
  { code: "801", city: "Salt Lake City", asr: 66 },
  { code: "313", city: "Detroit", asr: 69 },
  { code: "919", city: "Raleigh", asr: 70 },
];

const KEYS: { d: string; sub: string }[] = [
  { d: "1", sub: "" },
  { d: "2", sub: "ABC" },
  { d: "3", sub: "DEF" },
  { d: "4", sub: "GHI" },
  { d: "5", sub: "JKL" },
  { d: "6", sub: "MNO" },
  { d: "7", sub: "PQRS" },
  { d: "8", sub: "TUV" },
  { d: "9", sub: "WXYZ" },
  { d: "*", sub: "" },
  { d: "0", sub: "+" },
  { d: "#", sub: "" },
];

export function Coverage() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { margin: "-25%" });

  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [pressed, setPressed] = useState<string | null>(null);
  const [result, setResult] = useState<Metro | null>(null);
  const [noRoute, setNoRoute] = useState(false);
  const [recent, setRecent] = useState<Metro[]>([]);
  const [auto, setAuto] = useState(true);
  const resumeTimer = useRef<number | null>(null);

  // Auto-dial loop — dials the current metro digit by digit, connects, moves on
  useEffect(() => {
    if (!inView || !auto) return;
    const metro = METROS[idx % METROS.length];
    const ts: number[] = [];
    setTyped("");
    setResult(null);
    setNoRoute(false);

    metro.code.split("").forEach((d, i) => {
      ts.push(
        window.setTimeout(() => {
          setTyped(metro.code.slice(0, i + 1));
          setPressed(d);
        }, 550 + i * 380)
      );
      ts.push(window.setTimeout(() => setPressed(null), 550 + i * 380 + 200));
    });
    ts.push(window.setTimeout(() => setResult(metro), 550 + 3 * 380 + 320));
    ts.push(
      window.setTimeout(() => {
        setRecent((r) => [metro, ...r.filter((m) => m.code !== metro.code)].slice(0, 3));
        setIdx((v) => (v + 1) % METROS.length);
      }, 550 + 3 * 380 + 320 + 2100)
    );
    return () => ts.forEach(clearTimeout);
  }, [idx, auto, inView]);

  // Manual dialing — tap keys, dial any area code we route
  const tap = (d: string) => {
    setPressed(d);
    window.setTimeout(() => setPressed(null), 180);
    if (!/[0-9]/.test(d)) return;

    setAuto(false);
    const fresh = typed.length >= 3 || result !== null || noRoute;
    const next = (fresh ? "" : typed) + d;
    setResult(null);
    setNoRoute(false);
    setTyped(next);

    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    if (next.length === 3) {
      const m = METROS.find((x) => x.code === next);
      window.setTimeout(() => {
        if (m) {
          setResult(m);
          setRecent((r) => [m, ...r.filter((z) => z.code !== m.code)].slice(0, 3));
        } else {
          setNoRoute(true);
        }
      }, 420);
      resumeTimer.current = window.setTimeout(() => setAuto(true), 3600);
    } else {
      // abandoned half-dial — hand control back to the auto-dialer
      resumeTimer.current = window.setTimeout(() => setAuto(true), 5000);
    }
  };

  const status = result
    ? `CONNECTED · ${result.asr}% ANSWER`
    : noRoute
    ? "NO DIRECT ROUTE — YET"
    : typed.length === 3
    ? "RINGING…"
    : typed.length > 0
    ? "DIALING…"
    : "AUTO-DIALING THE U.S.";

  return (
    <section ref={sectionRef} className="bg-ink py-24 md:py-32 text-paper">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_minmax(360px,440px)] lg:gap-24">
          {/* Copy + stats */}
          <div>
            <Eyebrow dark>The U.S. network</Eyebrow>
            <h2 className="display mt-5 text-paper text-[clamp(2.2rem,5vw,3.6rem)] text-balance">
              Every area code, a route we can prove.
            </h2>
            <p className="mt-6 max-w-sm text-[1.02rem] leading-relaxed text-paper/80 text-pretty">
              Watch the network dial itself through the metros you call most — or
              take the keypad and dial any U.S. area code we route.
            </p>

            <div className="mt-10 flex items-center gap-8">
              <div>
                <div className="display text-signal text-[2.6rem] leading-none tnum">16</div>
                <div className="mono-label mt-2 text-[0.68rem] text-paper/70">U.S. POPS</div>
              </div>
              <span className="h-12 w-px bg-hair-ink" />
              <div>
                <div className="display text-paper text-[2.6rem] leading-none tnum">49,500</div>
                <div className="mono-label mt-2 text-[0.68rem] text-paper/70">LIVE CHANNELS</div>
              </div>
            </div>

            {/* Recent connections ledger */}
            <div className="mt-10 hidden border-t border-hair-ink lg:block">
              <div className="mono-label pt-4 text-[0.62rem] text-paper/50">RECENT CONNECTIONS</div>
              <div className="mt-2 min-h-[10rem]">
                <AnimatePresence initial={false}>
                  {recent.map((m) => (
                    <motion.div
                      key={m.code}
                      layout
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-baseline justify-between border-b border-hair-ink py-3"
                    >
                      <span className="flex items-baseline gap-3">
                        <span className={`mono-label text-[0.85rem] tnum ${m.premium ? "text-signal" : "text-paper"}`}>
                          {m.code}
                        </span>
                        <span className="text-[0.9rem] text-paper/75">{m.city}</span>
                      </span>
                      <span className="mono-label text-[0.72rem] tnum text-paper/55">{m.asr}% ANSWER</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-10">
              <ButtonLink href="/network" variant="paper">
                See the U.S. network
              </ButtonLink>
            </div>
          </div>

          {/* The dialer */}
          <div>
            {/* Readout — three digit slots */}
            <div className="border-b-2 border-paper/90 pb-4">
              <div className="flex items-end justify-between gap-4">
                <div className="flex gap-3">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className={`display w-[1.1em] text-center text-[clamp(3.2rem,9vw,4.6rem)] leading-none tnum ${
                        typed[i] ? "text-paper" : "text-paper/20"
                      }`}
                    >
                      {typed[i] ?? "·"}
                    </span>
                  ))}
                </div>
                {/* Connected city */}
                <div className="min-w-0 pb-1 text-right">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={result ? result.city : noRoute ? "none" : "idle"}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      {result ? (
                        <>
                          <div className="display truncate text-[clamp(1.15rem,2.6vw,1.7rem)] leading-tight text-signal">
                            {result.city}
                          </div>
                          {result.premium && (
                            <div className="mono-label mt-1 text-[0.58rem] text-paper/60">
                              PREMIUM DIRECT ●
                            </div>
                          )}
                        </>
                      ) : noRoute ? (
                        <div className="display text-[clamp(1.15rem,2.6vw,1.7rem)] leading-tight text-paper/40">
                          —
                        </div>
                      ) : null}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Status line */}
            <div className="mt-3 flex items-center justify-between">
              <span
                aria-live="polite"
                className={`mono-label text-[0.68rem] ${
                  result ? "text-signal" : noRoute ? "text-paper/50" : "text-paper/60"
                }`}
              >
                {status}
              </span>
              <span className="mono-label text-[0.6rem] text-paper/40">
                TAP TO DIAL
              </span>
            </div>

            {/* Keypad */}
            <div className="mt-6 grid grid-cols-3 gap-2.5">
              {KEYS.map((k) => {
                const isPressed = pressed === k.d;
                return (
                  <button
                    key={k.d}
                    onClick={() => tap(k.d)}
                    aria-label={`Dial ${k.d}`}
                    className={`group flex h-16 flex-col items-center justify-center border transition-colors duration-150 md:h-[4.4rem] ${
                      isPressed
                        ? "border-signal bg-signal"
                        : "border-hair-ink bg-transparent hover:border-paper/40 active:border-signal"
                    }`}
                  >
                    <span
                      className={`mono-label text-[1.35rem] leading-none tnum ${
                        isPressed ? "text-white" : "text-paper"
                      }`}
                    >
                      {k.d}
                    </span>
                    <span
                      className={`mono-label mt-1 text-[0.52rem] tracking-[0.25em] ${
                        isPressed ? "text-white/80" : "text-paper/40"
                      }`}
                    >
                      {k.sub || " "}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Answer-rate line for the connected metro */}
            <div className="mt-6 h-10">
              <AnimatePresence mode="wait">
                {result && (
                  <motion.div
                    key={result.code}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="h-1.5 w-full bg-ink-2">
                      <motion.div
                        className="h-full bg-signal"
                        initial={{ width: 0 }}
                        animate={{ width: `${result.asr}%` }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                    <div className="mt-2 flex justify-between mono-label text-[0.6rem] text-paper/50 tnum">
                      <span>ANSWER RATE</span>
                      <span>{result.asr}%</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
