"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container, Eyebrow } from "@/components/ui";

/**
 * Interactive sales piece — "Signed at the edge."
 * Drag the middlemen between you and the destination carrier and watch
 * STIR/SHAKEN attestation fall from A to nothing, the caller ID flip from
 * your name to "Spam Likely", and the answer rate collapse. Telantix is the
 * zero-hop option: we hold our own certificate and sign every call at the edge.
 */

type Stop = {
  hops: number;
  att: string; // attestation letter
  status: string;
  caller: string;
  answer: number;
  verified: boolean;
};

const STOPS: Stop[] = [
  { hops: 0, att: "A", status: "Verified caller", caller: "ACME SUPPORT", answer: 78, verified: true },
  { hops: 1, att: "B", status: "Unverified", caller: "(512) 555-0148", answer: 57, verified: false },
  { hops: 2, att: "C", status: "Unknown number", caller: "(512) 555-0148", answer: 41, verified: false },
  { hops: 3, att: "—", status: "Spam Likely", caller: "SPAM LIKELY", answer: 28, verified: false },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function VerifiedCall() {
  const [hops, setHops] = useState(0);
  const stop = STOPS[hops];

  return (
    <section className="border-b border-hair bg-paper py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          {/* Copy */}
          <div>
            <Eyebrow>Caller ID that survives</Eyebrow>
            <h2 className="display mt-5 text-ink text-[clamp(2rem,4.6vw,3.4rem)] text-balance">
              We sign your calls. Not somebody three hops away.
            </h2>
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-mute text-pretty">
              Every reseller your call passes through re-wraps its verification and
              waters it down. We hold our own carrier certificate and sign each call
              at the edge, so it lands as a real, verified number — not
              &ldquo;Spam Likely.&rdquo;
            </p>
            <p className="mt-6 text-[0.9rem] text-mute-2 text-pretty">
              <span className="mono-label text-[0.7rem] text-signal">TRY IT —</span>{" "}
              add middlemen and watch what reaches the phone.
            </p>
          </div>

          {/* Interactive */}
          <div className="border border-hair bg-white">
            {/* Route strip */}
            <div className="border-b border-hair px-6 py-7 md:px-8">
              <div className="mb-5 flex items-center justify-between">
                <span className="mono-label text-[0.66rem] text-stone">
                  YOUR CALL&apos;S PATH
                </span>
                <span className="mono-label text-[0.66rem] text-stone tnum">
                  {hops === 0
                    ? "0 MIDDLEMEN"
                    : `${hops} ${hops > 1 ? "MIDDLEMEN" : "MIDDLEMAN"}`}
                </span>
              </div>
              <RouteStrip hops={hops} verified={stop.verified} />
            </div>

            {/* Phone + attestation */}
            <div className="grid grid-cols-1 sm:grid-cols-[1.2fr_1fr]">
              {/* Incoming call display */}
              <div className="border-b border-hair p-6 sm:border-b-0 sm:border-r md:p-8">
                <span className="mono-label text-[0.62rem] text-stone">
                  WHAT THE PHONE SHOWS
                </span>
                <div className="mt-4 flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                      stop.verified ? "bg-signal" : "bg-paper-2"
                    }`}
                  >
                    {stop.verified ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M5 12.5l4.5 4.5L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M12 8v5" stroke="var(--color-mute)" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="12" cy="17" r="1.4" fill="var(--color-mute)" />
                      </svg>
                    )}
                  </div>
                  <div className="min-w-0">
                    <motion.div
                      key={stop.caller}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className={`truncate text-[1.15rem] font-bold leading-tight ${
                        stop.verified ? "text-ink" : "text-mute"
                      }`}
                    >
                      {stop.caller}
                    </motion.div>
                    <div className="mono-label text-[0.66rem] text-stone">
                      INCOMING CALL
                    </div>
                  </div>
                </div>
                <motion.div
                  key={stop.status}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35 }}
                  className={`mt-5 inline-flex items-center gap-2 border px-3 py-1.5 ${
                    stop.verified
                      ? "border-signal/40 text-signal"
                      : "border-hair text-mute-2"
                  }`}
                >
                  <span className="h-1.5 w-1.5" style={{ background: stop.verified ? "var(--color-signal)" : "var(--color-stone)" }} />
                  <span className="mono-label text-[0.7rem]">{stop.status.toUpperCase()}</span>
                </motion.div>
              </div>

              {/* Attestation + answer rate */}
              <div className="p-6 md:p-8">
                <span className="mono-label text-[0.62rem] text-stone">
                  SIGNATURE
                </span>
                <div className="mt-3 flex items-baseline gap-3">
                  <motion.span
                    key={stop.att}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className={`display text-[2.6rem] leading-none ${
                      stop.verified ? "text-signal" : "text-stone"
                    }`}
                  >
                    {stop.att}
                  </motion.span>
                  <span className="text-[0.85rem] text-mute">
                    {stop.att === "A" ? "full attestation" : stop.att === "—" ? "no signature" : "downgraded"}
                  </span>
                </div>

                <div className="mt-7">
                  <div className="flex items-baseline justify-between">
                    <span className="mono-label text-[0.62rem] text-stone">LIKELY ANSWER RATE</span>
                    <motion.span
                      key={stop.answer}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`mono-label text-[1rem] tnum ${stop.verified ? "text-ink" : "text-mute"}`}
                    >
                      {stop.answer}%
                    </motion.span>
                  </div>
                  <div className="mt-2 h-2 w-full bg-paper-2">
                    <motion.div
                      className="h-full"
                      style={{ background: stop.verified ? "var(--color-signal)" : "var(--color-stone)" }}
                      animate={{ width: `${stop.answer}%` }}
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Control */}
            <div className="border-t border-hair px-6 py-6 md:px-8">
              <div className="mb-3 flex items-center justify-between">
                <span className="mono-label text-[0.62rem] text-stone">
                  MIDDLEMEN BETWEEN YOU AND THE CARRIER
                </span>
              </div>
              <div className="relative flex items-center justify-between">
                {/* track */}
                <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-hair" />
                {STOPS.map((s) => {
                  const active = s.hops === hops;
                  return (
                    <button
                      key={s.hops}
                      onClick={() => setHops(s.hops)}
                      className="relative z-10 flex flex-col items-center gap-2"
                      aria-label={`${s.hops} middlemen`}
                      aria-pressed={active}
                    >
                      <span
                        className={`block h-4 w-4 rounded-full border-2 transition-all ${
                          active
                            ? s.hops === 0
                              ? "border-signal bg-signal scale-125"
                              : "border-ink bg-ink scale-125"
                            : "border-stone bg-paper hover:border-ink"
                        }`}
                      />
                      <span
                        className={`mono-label text-[0.62rem] tnum ${
                          active ? "text-ink" : "text-stone"
                        }`}
                      >
                        {s.hops === 0 ? "US" : s.hops}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-[0.82rem] text-mute-2 text-pretty">
                {hops === 0
                  ? "Direct on Telantix — signed at the edge, A-level attestation, no one to water it down."
                  : `${hops} reseller${hops > 1 ? "s" : ""} in the path. Each hop re-signs your call and drops the attestation a level.`}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** The path from you to the destination carrier, with reseller hops. */
function RouteStrip({ hops, verified }: { hops: number; verified: boolean }) {
  const nodes = ["YOU", ...Array.from({ length: hops }, () => "RESELLER"), "CARRIER"];
  return (
    <div className="flex items-center">
      {nodes.map((n, i) => {
        const isFirst = i === 0;
        const isLast = i === nodes.length - 1;
        const isReseller = !isFirst && !isLast;
        return (
          <div key={i} className={`flex items-center ${isLast ? "" : "flex-1"}`}>
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={`block h-3 w-3 ${
                  isFirst
                    ? "bg-signal"
                    : isReseller
                    ? "border border-stone bg-paper"
                    : "bg-ink"
                }`}
                style={{ borderRadius: isReseller ? "9999px" : "0" }}
              />
              <span className="mono-label text-[0.54rem] text-stone whitespace-nowrap">
                {isReseller ? "HOP" : n}
              </span>
            </div>
            {!isLast && (
              <div className="mx-1.5 h-px flex-1" style={{ background: verified && i === 0 ? "var(--color-signal)" : "var(--color-hair)" }}>
                <motion.div
                  className="h-full"
                  style={{ background: i === 0 && verified ? "var(--color-signal)" : "var(--color-stone)" }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
