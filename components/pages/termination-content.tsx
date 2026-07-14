"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container, Eyebrow, ButtonLink } from "@/components/ui";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";

/* ---- Route-class matrix (a real carrier tier table, not comparison cards) ---- */
const CLASSES = ["Direct", "Premium", "Standard"];
const ROWS: { attr: string; vals: string[] }[] = [
  { attr: "Caller ID shown", vals: ["Guaranteed", "Guaranteed", "Best effort"] },
  { attr: "Connect rate", vals: ["Up to 78%", "Up to 68%", "Up to 55%"] },
  { attr: "Hand-offs to reach you", vals: ["Direct", "1–2", "Shared"] },
  { attr: "Call clarity", vals: ["4.3 / 5", "4.1 / 5", "3.6 / 5"] },
  { attr: "Best for", vals: ["Business calls", "Call centers", "High volume"] },
];

/* ---- The path a call takes (annotated diagram, not numbered steps) ---- */
const NODES = [
  { x: 40, label: "CALL IN", sub: "YOU DIAL" },
  { x: 190, label: "CHECK", sub: "SAFE · REAL" },
  { x: 340, label: "PICK ROUTE", sub: "BEST PATH" },
  { x: 490, label: "HAND OFF", sub: "TO CARRIER" },
  { x: 640, label: "CONNECTED", sub: "ANSWERED" },
];

function CallPath() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  return (
    <div ref={ref} className="overflow-x-auto">
      <svg viewBox="0 0 680 165" className="w-full min-w-[560px]" fill="none">
        {/* base line */}
        <line x1="40" y1="72" x2="640" y2="72" stroke="var(--color-hair-ink)" strokeWidth="2" />
        {/* progress line */}
        <motion.line
          x1="40"
          y1="72"
          x2="640"
          y2="72"
          stroke="var(--color-signal)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
        />
        {NODES.map((n, i) => (
          <g key={n.label}>
            <motion.circle
              cx={n.x}
              cy={72}
              r={i === NODES.length - 1 ? 8 : 6}
              fill={i === NODES.length - 1 ? "var(--color-signal)" : "var(--color-paper)"}
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.34, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: `${n.x}px 72px` }}
            />
            <text x={n.x} y={40} textAnchor="middle" className="font-mono" fontSize="14" fontWeight="400" fill="var(--color-paper)" letterSpacing="0.06em">
              {n.label}
            </text>
            <text x={n.x} y={102} textAnchor="middle" className="font-mono" fontSize="11" fill="var(--color-stone)" letterSpacing="0.08em">
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function TerminationContent() {
  const tableRef = useRef(null);
  const runTable = useInView(tableRef, { once: true, margin: "-15%" });

  return (
    <>
      <PageHero
        eyebrow="Outbound Calling"
        title="Your calls, graded honestly."
        lead="Hand us your outbound and we send each call down the shortest route that clears our answer-rate bar — sorted into clear tiers, signed at the edge, and switched the moment a route starts to slip."
        meta={[
          { k: "ANSWER RATE", v: "UP TO 78%" },
          { k: "QUALITY TIERS", v: "3" },
          { k: "CALLER ID SHOWN", v: "99.1%" },
          { k: "ROUTE SWITCH", v: "UNDER 60s" },
        ]}
      />

      {/* Route class matrix */}
      <section className="border-b border-hair bg-paper py-24 md:py-32" ref={tableRef}>
        <Container>
          <div className="mb-12 max-w-2xl">
            <Eyebrow>Quality tiers</Eyebrow>
            <h2 className="display mt-5 text-ink text-[clamp(2rem,4.5vw,3.2rem)] text-balance">
              Pick the tier the call deserves.
            </h2>
            <p className="mt-6 text-[1.02rem] leading-relaxed text-mute text-pretty">
              Not every call needs the top-tier route, and not every route suits
              every campaign. We lay the tiers out plainly — you choose, route by
              route.
            </p>
          </div>

          {/* Matrix */}
          <div className="overflow-x-auto">
            <div className="min-w-[640px] border-t-2 border-ink">
              {/* header */}
              <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] border-b border-hair">
                <div className="py-4 mono-label text-[0.7rem] text-stone">FEATURE</div>
                {CLASSES.map((c, i) => (
                  <div
                    key={c}
                    className={`py-4 mono-label text-[0.78rem] ${i === 0 ? "text-signal" : "text-ink"}`}
                  >
                    {c.toUpperCase()}
                  </div>
                ))}
              </div>
              {/* rows */}
              {ROWS.map((r, ri) => (
                <motion.div
                  key={r.attr}
                  initial={{ opacity: 0, y: 10 }}
                  animate={runTable ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: ri * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-[1.4fr_1fr_1fr_1fr] border-b border-hair"
                >
                  <div className="py-5 text-[0.98rem] font-medium text-ink">{r.attr}</div>
                  {r.vals.map((v, vi) => (
                    <div
                      key={vi}
                      className={`py-5 text-[0.98rem] tnum ${vi === 0 ? "text-ink" : "text-mute"}`}
                    >
                      {v}
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Call path */}
      <section className="border-b border-hair bg-ink py-24 md:py-32 text-paper">
        <Container>
          <div className="mb-14 max-w-2xl">
            <Eyebrow dark>Inside a call</Eyebrow>
            <h2 className="display mt-5 text-paper text-[clamp(2rem,4.5vw,3.2rem)] text-balance">
              Five steps, milliseconds apart.
            </h2>
            <p className="mt-6 text-[1rem] leading-relaxed text-paper/80 text-pretty">
              Every call is checked and routed before the other phone even rings.
              This is the path it takes — no mystery middlemen in between.
            </p>
          </div>
          <div className="border border-hair-ink bg-ink-2 p-6 md:p-10">
            <CallPath />
          </div>
        </Container>
      </section>

      {/* Interop specs */}
      <section className="border-b border-hair bg-paper py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <Eyebrow>Under the hood</Eyebrow>
              <h2 className="display mt-5 text-ink text-[clamp(2rem,4.5vw,3rem)] text-balance">
                We speak your system&apos;s language.
              </h2>
              <p className="mt-6 max-w-sm text-[1.02rem] leading-relaxed text-mute text-pretty">
                Old phone lines or modern internet calling — bring either. We
                translate between them and hand the call over clean. Here are the
                technical details, for the people who ask.
              </p>
            </div>
            <div className="border-t border-hair">
              {[
                { k: "CONNECTS OVER", v: "SIP · SS7 / ISUP · TDM" },
                { k: "TRANSPORT", v: "UDP · TCP · TLS" },
                { k: "MEDIA", v: "RTP · SRTP" },
                { k: "AUDIO", v: "G.711 · G.729 · G.722 · OPUS" },
                { k: "KEYPAD TONES", v: "RFC 2833 · SIP INFO · INBAND" },
                { k: "SECURITY", v: "IP ALLOWLIST · REGISTER" },
              ].map((s) => (
                <Reveal key={s.k}>
                  <div className="flex flex-col gap-1 border-b border-hair py-5 sm:flex-row sm:items-center sm:justify-between">
                    <span className="mono-label text-[0.72rem] text-stone">{s.k}</span>
                    <span className="mono-label text-[0.92rem] text-ink">{s.v}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-paper py-20 md:py-28">
        <Container>
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <h2 className="display max-w-2xl text-ink text-[clamp(1.8rem,4.5vw,3rem)] text-balance">
              Send us a campaign. Watch the answer rate.
            </h2>
            <ButtonLink href="/connect" variant="signal">
              Request Routes
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
