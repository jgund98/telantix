"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container, ButtonLink } from "@/components/ui";
import { RouteMap, RouteMapMobile } from "@/components/route-map";

const EASE = [0.22, 1, 0.36, 1] as const;

// "OPS" and "CH" render as live, gently-drifting figures
const TICKER: string[] = [
  "ANSWER RATE 78%",
  "CH",
  "OPS",
  "16 U.S. POPS",
  "14MS MEDIAN LATENCY",
  "A-LEVEL STIR / SHAKEN",
  "99.99% UPTIME",
  "TRUNKS LIVE IN <24H",
  "NO CHANNEL CAPS",
  "TCPA-READY",
];

/** A figure that drifts a little in real time, like a live network stat. */
function useDrift(base: number, spread: number, step: number, ms: number) {
  const [n, setN] = useState(base);
  useEffect(() => {
    const id = window.setInterval(() => {
      setN((v) => {
        const next = v + Math.round((Math.random() - 0.48) * step);
        return Math.min(base + spread, Math.max(base - spread, next));
      });
    }, ms);
    return () => window.clearInterval(id);
  }, [base, spread, step, ms]);
  return n;
}

function Word({ children, delay }: { children: string; delay: number }) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.85, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  // live network figures — drift gently so the rail reads as real
  const ops = useDrift(1247, 40, 5, 2200);
  const channels = useDrift(49500, 900, 140, 1400);

  return (
    <section className="relative overflow-hidden border-b border-hair">
      <Container className="pt-16 pb-0 md:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
          {/* Left — the statement */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex items-center gap-4"
            >
              <span className="flex items-center gap-2.5 font-mono uppercase text-mute whitespace-nowrap text-[0.62rem] tracking-[0.14em] sm:text-[0.6875rem] sm:tracking-[0.22em]">
                <span className="inline-block h-[7px] w-[7px] shrink-0 bg-signal" />
                Dialer-Grade SIP · <span className="hidden sm:inline">Built for&nbsp;</span>U.S. Call Centers
              </span>
            </motion.div>

            <h1 className="display mt-7 text-ink text-[clamp(2.9rem,8.2vw,6.6rem)] text-balance">
              <Word delay={0.05}>Routes</Word>{" "}
              <Word delay={0.13}>that</Word>{" "}
              <Word delay={0.21}>terminate.</Word>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
              className="mt-7 max-w-md text-[1.075rem] leading-relaxed text-mute text-pretty"
            >
              The SIP carrier built for the people who dial for a living. Clean
              caller IDs, no channel caps, and answer rates you can actually
              watch.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.62, ease: EASE }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <ButtonLink href="/connect" variant="signal">
                Request Routes
              </ButtonLink>
              <ButtonLink href="/network" variant="ghost">
                See how it works
              </ButtonLink>
            </motion.div>
          </div>

          {/* Right — the live route diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
            className="relative -mx-6 sm:mx-0"
          >
            {/* Mobile: portrait diagram, sized to fill the screen */}
            <div className="relative lg:hidden border-t border-hair pt-8">
              <div className="mb-2 flex items-center justify-between px-6 sm:px-0">
                <span className="eyebrow text-mute-2">Live routing</span>
                <span className="mono-label text-[0.62rem] text-stone">REAL-TIME</span>
              </div>
              <RouteMapMobile className="mx-auto block h-auto w-full max-w-[420px]" />
            </div>

            {/* Desktop: landscape diagram */}
            <div className="relative hidden lg:block">
              <div className="absolute left-0 top-0 eyebrow text-mute-2">
                LIVE ROUTING
              </div>
              <RouteMap className="w-full h-auto" />
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Status ticker rail */}
      <div className="mt-6 border-t border-hair bg-white/60">
        <div
          className="relative flex overflow-hidden py-3"
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            maskImage:
              "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          }}
        >
          <div className="marquee-track flex shrink-0 items-center gap-10 whitespace-nowrap pr-10">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span
                key={i}
                className="mono-label text-[0.72rem] text-mute flex items-center gap-10 tnum"
              >
                {t === "OPS"
                  ? `${ops.toLocaleString("en-US")} OPERATORS ONLINE`
                  : t === "CH"
                  ? `${channels.toLocaleString("en-US")} CHANNELS LIVE`
                  : t}
                <span className="text-signal">▚</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
