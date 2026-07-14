"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container, Eyebrow, ButtonLink } from "@/components/ui";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";

/* 24h ASR readout */
const ASR_24H = [
  61, 63, 62, 64, 66, 65, 67, 69, 70, 71, 70, 68, 66, 67, 69, 71, 72, 70, 69, 68, 66, 64, 63, 65,
];

const METRICS = [
  { code: "ANSWER", name: "Answer rate", def: "Out of every 100 calls, how many actually get picked up. The number call centers live and die by (the industry calls it ASR).", val: "78%" },
  { code: "LENGTH", name: "Average call length", def: "How long a connected call lasts. A lot of very short calls usually means a bad route.", val: "4m 12s" },
  { code: "REACH", name: "Reachability", def: "How often we can get through to the other phone, setting aside plain no-answers.", val: "99.2%" },
  { code: "SPEED", name: "Time to connect", def: "How long from dialing to the first ring. Shorter is a better route.", val: "380ms" },
  { code: "CLARITY", name: "Call clarity", def: "How clear the call sounds, scored 1 to 5 and sampled non-stop.", val: "4.3 / 5" },
];

function QualityStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  const W = 720;
  const H = 260;
  const padL = 44;
  const padR = 20;
  const padT = 20;
  const padB = 34;
  const min = 55;
  const max = 75;
  const iW = W - padL - padR;
  const iH = H - padT - padB;
  const x = (i: number) => padL + (i / (ASR_24H.length - 1)) * iW;
  const y = (v: number) => padT + (1 - (v - min) / (max - min)) * iH;
  const line = ASR_24H.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`).join(" ");

  return (
    <div ref={ref} className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[600px]" fill="none">
        {/* gridlines */}
        {[55, 60, 65, 70, 75].map((g) => (
          <g key={g}>
            <line x1={padL} y1={y(g)} x2={W - padR} y2={y(g)} stroke="var(--color-hair)" strokeWidth="1" />
            <text x={padL - 10} y={y(g) + 3} textAnchor="end" className="font-mono" fontSize="10" fill="var(--color-stone)">
              {g}
            </text>
          </g>
        ))}
        {/* x labels */}
        {[0, 6, 12, 18, 23].map((i) => (
          <text key={i} x={x(i)} y={H - 12} textAnchor="middle" className="font-mono" fontSize="10" fill="var(--color-stone)">
            {String(i).padStart(2, "0")}:00
          </text>
        ))}
        {/* the line */}
        <motion.path
          d={line}
          stroke="var(--color-ink)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
        />
        {/* current point */}
        <motion.circle
          cx={x(ASR_24H.length - 1)}
          cy={y(ASR_24H[ASR_24H.length - 1])}
          r="6"
          fill="var(--color-signal)"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 2, duration: 0.4 }}
          style={{ transformOrigin: `${x(ASR_24H.length - 1)}px ${y(ASR_24H[ASR_24H.length - 1])}px` }}
        />
      </svg>
    </div>
  );
}

export function QualityContent() {
  return (
    <>
      <PageHero
        eyebrow="Quality"
        title="We show the numbers we run on."
        lead="Quality here is not a slogan, it is a measurement. Every route is watched around the clock, and the same numbers we route on are the ones you see — starting with answer rate."
        meta={[
          { k: "ANSWER RATE", v: "78%" },
          { k: "CALLER ID SHOWN", v: "99.1%" },
          { k: "A-LEVEL SIGNED", v: "EVERY CALL" },
          { k: "UPTIME", v: "99.99%" },
        ]}
      />

      {/* Live strip */}
      <section className="border-b border-hair bg-paper py-24 md:py-32">
        <Container>
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <Eyebrow>Answer rate · last 24 hours</Eyebrow>
              <h2 className="display mt-5 text-ink text-[clamp(2rem,4.5vw,3.2rem)] text-balance">
                A network you can watch breathe.
              </h2>
            </div>
            <p className="max-w-sm text-[1rem] leading-relaxed text-mute text-pretty">
              The share of calls getting answered across our whole network, checked
              every hour. The orange dot is right now.
            </p>
          </div>
          <div className="border border-hair bg-white p-6 md:p-10">
            <QualityStrip />
          </div>
        </Container>
      </section>

      {/* Metrics glossary */}
      <section className="border-b border-hair bg-paper py-24 md:py-32">
        <Container>
          <div className="mb-12 max-w-2xl">
            <Eyebrow>What we measure</Eyebrow>
            <h2 className="display mt-5 text-ink text-[clamp(2rem,4.5vw,3.2rem)] text-balance">
              Five numbers, no hiding.
            </h2>
          </div>
          <div className="border-t-2 border-ink">
            {METRICS.map((m, i) => (
              <Reveal key={m.code} delay={i * 0.05}>
                <div className="group grid grid-cols-1 gap-3 border-b border-hair py-7 md:grid-cols-[140px_1fr_auto] md:items-center md:gap-10">
                  <span className="display text-ink text-[1.35rem] leading-none transition-colors group-hover:text-signal">
                    {m.code}
                  </span>
                  <div>
                    <div className="text-[1.05rem] font-medium text-ink">{m.name}</div>
                    <div className="mt-1 text-[0.95rem] text-mute">{m.def}</div>
                  </div>
                  <span className="mono-label text-[1.1rem] text-ink tnum md:text-right">{m.val}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CLI integrity */}
      <section className="bg-ink py-24 md:py-32 text-paper">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <Eyebrow dark>Caller ID</Eyebrow>
              <h2 className="display mt-5 text-paper text-[clamp(2rem,4.5vw,3.2rem)] text-balance">
                Your number arrives intact.
              </h2>
              <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-paper/80 text-pretty">
                We hold our own carrier certificate and sign every call at A-level,
                right at the edge — never re-wrapped by a reseller three hops away.
                Your caller IDs are rotated and rested so they don&apos;t get burned,
                and bad traffic is blocked the moment it shows up.
              </p>
            </div>
            <div className="border-t border-hair-ink lg:mt-2">
              {[
                { k: "SIGNED", v: "A-level, every call" },
                { k: "CALLER ID SHOWN", v: "99.1% of the time" },
                { k: "CID POOL", v: "Rotated & rested" },
                { k: "BAD TRAFFIC", v: "Blocked on arrival" },
              ].map((r) => (
                <div key={r.k} className="flex items-center justify-between border-b border-hair-ink py-5">
                  <span className="mono-label text-[0.72rem] text-paper/70">{r.k}</span>
                  <span className="text-[0.98rem] text-paper">{r.v}</span>
                </div>
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
              Ask for the numbers. We&apos;ll hand them over.
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
