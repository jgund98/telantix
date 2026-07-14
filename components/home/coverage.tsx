"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container, Eyebrow, ButtonLink } from "@/components/ui";

type Dest = { cc: string; name: string; asr: number; premium?: boolean };

const DESTS: Dest[] = [
  { cc: "212", name: "New York", asr: 76, premium: true },
  { cc: "213", name: "Los Angeles", asr: 74, premium: true },
  { cc: "312", name: "Chicago", asr: 72 },
  { cc: "713", name: "Houston", asr: 71 },
  { cc: "602", name: "Phoenix", asr: 69 },
  { cc: "215", name: "Philadelphia", asr: 70 },
  { cc: "210", name: "San Antonio", asr: 68 },
  { cc: "214", name: "Dallas", asr: 73, premium: true },
  { cc: "305", name: "Miami", asr: 72 },
  { cc: "404", name: "Atlanta", asr: 71 },
  { cc: "617", name: "Boston", asr: 70 },
  { cc: "206", name: "Seattle", asr: 69 },
  { cc: "303", name: "Denver", asr: 68 },
  { cc: "702", name: "Las Vegas", asr: 67 },
  { cc: "615", name: "Nashville", asr: 69 },
  { cc: "704", name: "Charlotte", asr: 70 },
  { cc: "469", name: "Dallas Metro", asr: 72, premium: true },
  { cc: "512", name: "Austin", asr: 71 },
  { cc: "407", name: "Orlando", asr: 68 },
  { cc: "816", name: "Kansas City", asr: 67 },
  { cc: "503", name: "Portland", asr: 68 },
  { cc: "801", name: "Salt Lake City", asr: 66 },
  { cc: "313", name: "Detroit", asr: 69 },
  { cc: "919", name: "Raleigh", asr: 70 },
];

function Cell({ d, i }: { d: Dest; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: (i % 12) * 0.03, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex items-center justify-between border-b border-hair-ink px-4 py-4 transition-colors ${
        d.premium ? "" : "hover:bg-ink-2"
      }`}
    >
      <div className="flex items-baseline gap-3">
        <span
          className={`mono-label text-[0.9rem] tnum ${
            d.premium ? "text-signal" : "text-paper"
          }`}
        >
          {d.cc}
        </span>
        <span className="text-[0.9rem] text-paper/75">{d.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="mono-label text-[0.72rem] tnum text-paper/55">
          {d.asr}% ANSWER
        </span>
        {d.premium && (
          <span className="mono-label text-[0.55rem] tracking-[0.15em] text-signal">
            ●
          </span>
        )}
      </div>
    </motion.div>
  );
}

export function Coverage() {
  return (
    <section className="bg-ink py-24 md:py-32 text-paper">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Intro */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow dark>The U.S. network</Eyebrow>
            <h2 className="display mt-5 text-paper text-[clamp(2.2rem,5vw,3.6rem)] text-balance">
              Every area code, a route we can prove.
            </h2>
            <p className="mt-6 max-w-sm text-[1.02rem] leading-relaxed text-paper/80 text-pretty">
              Live answer rates across the U.S. metros you dial most. Orange marks
              are premium direct routes with a guaranteed floor. International on
              request.
            </p>
            <div className="mt-10 flex items-center gap-8">
              <div>
                <div className="display text-signal text-[2.6rem] leading-none tnum">
                  16
                </div>
                <div className="mono-label mt-2 text-[0.68rem] text-paper/70">
                  U.S. POPS
                </div>
              </div>
              <span className="h-12 w-px bg-hair-ink" />
              <div>
                <div className="display text-paper text-[2.6rem] leading-none tnum">
                  49,500
                </div>
                <div className="mono-label mt-2 text-[0.68rem] text-paper/70">
                  LIVE CHANNELS
                </div>
              </div>
            </div>
            <div className="mt-10">
              <ButtonLink href="/network" variant="paper">
                See the U.S. network
              </ButtonLink>
            </div>
          </div>

          {/* Matrix */}
          <div className="grid grid-cols-1 border-t border-hair-ink md:grid-cols-2">
            {DESTS.map((d, i) => (
              <Cell key={d.cc} d={d} i={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
