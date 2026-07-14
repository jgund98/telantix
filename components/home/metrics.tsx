"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Container, Eyebrow } from "@/components/ui";

function useCountUp(target: number, decimals = 0, run = false, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);
  return val.toFixed(decimals);
}

function Figure({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  label,
  sub,
  run,
  big = false,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sub: string;
  run: boolean;
  big?: boolean;
}) {
  const display = useCountUp(value, decimals, run);
  return (
    <div>
      <div
        className={`display text-ink tnum ${
          big
            ? "text-[clamp(4rem,13vw,9rem)] leading-[0.85]"
            : "text-[clamp(2.4rem,5vw,3.6rem)] leading-none"
        }`}
      >
        {prefix}
        {Number(display).toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
        <span className={big ? "text-signal" : "text-signal"}>{suffix}</span>
      </div>
      <div className="mono-label mt-4 text-[0.72rem] text-ink">{label}</div>
      <div className="mt-1 text-[0.9rem] text-mute">{sub}</div>
    </div>
  );
}

export function Metrics() {
  const ref = useRef(null);
  const run = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section className="border-b border-hair bg-paper py-24 md:py-32" ref={ref}>
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>The numbers we stand on</Eyebrow>
            <h2 className="display mt-5 text-ink text-[clamp(2.2rem,5vw,3.4rem)] text-balance">
              Proven, not promised.
            </h2>
          </div>
          <p className="max-w-[15rem] text-[1rem] leading-relaxed text-mute text-pretty">
            Straight from the live network — and onto your bill.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          {/* Hero figure */}
          <div className="flex flex-col justify-between border-t-2 border-ink pt-8">
            <Figure
              value={99.99}
              decimals={2}
              suffix="%"
              label="UPTIME"
              sub="Median monthly, across all 16 U.S. PoPs."
              run={run}
              big
            />
          </div>

          {/* Ruled secondary figures */}
          <div className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2">
            <div className="border-t border-hair pt-6">
              <Figure value={78} suffix="%" label="ANSWER RATE" sub="On premium direct routes." run={run} />
            </div>
            <div className="border-t border-hair pt-6">
              <Figure value={49500} label="LIVE CHANNELS" sub="Carried right now — no cap, no per-channel fee." run={run} />
            </div>
            <div className="border-t border-hair pt-6">
              <Figure value={1247} label="OPERATORS" sub="Dialing on Telantix today." run={run} />
            </div>
            <div className="border-t border-hair pt-6">
              <Figure value={14} suffix="ms" label="MEDIAN LATENCY" sub="Across the U.S. backbone." run={run} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
