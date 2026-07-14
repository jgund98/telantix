"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container, Eyebrow, ButtonLink } from "@/components/ui";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";

const REGIONS = [
  { name: "Northeast", asr: 76, corridors: "4,200" },
  { name: "Southeast", asr: 72, corridors: "3,850" },
  { name: "Midwest", asr: 71, corridors: "3,410" },
  { name: "Southwest", asr: 73, corridors: "3,120" },
  { name: "West Coast", asr: 74, corridors: "3,680" },
  { name: "Mountain", asr: 68, corridors: "2,240" },
];

const POPS = [
  { code: "NYC", city: "New York", site: "60 Hudson St", lat: "40.7N" },
  { code: "DFW", city: "Dallas", site: "Equinix DA", lat: "32.8N" },
  { code: "CHI", city: "Chicago", site: "350 E Cermak", lat: "41.9N" },
  { code: "ATL", city: "Atlanta", site: "56 Marietta", lat: "33.7N" },
  { code: "LAX", city: "Los Angeles", site: "One Wilshire", lat: "34.0N" },
  { code: "ASH", city: "Ashburn", site: "Equinix DC", lat: "39.0N" },
];

function RegionBar({ r, i, run }: { r: (typeof REGIONS)[0]; i: number; run: boolean }) {
  const top = Math.max(...REGIONS.map((x) => x.asr));
  return (
    <div className="border-b border-hair py-5">
      <div className="mb-2.5 flex items-baseline justify-between">
        <span className="text-[1.05rem] font-medium text-ink">{r.name}</span>
        <div className="flex items-center gap-5 mono-label text-[0.72rem] text-mute tnum">
          <span>{r.corridors} routes</span>
          <span className="text-ink">{r.asr}% answer</span>
        </div>
      </div>
      <div className="h-2 w-full bg-paper-2">
        <motion.div
          className="h-full bg-ink"
          initial={{ width: 0 }}
          animate={run ? { width: `${(r.asr / top) * 100}%` } : {}}
          transition={{ duration: 1, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="h-full w-full" style={{ background: r.asr === top ? "var(--color-signal)" : "var(--color-ink)" }} />
        </motion.div>
      </div>
    </div>
  );
}

export function NetworkContent() {
  const barsRef = useRef(null);
  const runBars = useInView(barsRef, { once: true, margin: "-15%" });

  return (
    <>
      <PageHero
        eyebrow="The Network"
        title="Direct lines, no middlemen."
        lead="We run 16 points of presence across the U.S. and connect straight to the carriers. No hidden hand-offs, no resellers watering your calls down — just routes we own, graded on answer rate and tuned around the clock."
        meta={[
          { k: "U.S. POPS", v: "16" },
          { k: "MEDIAN LATENCY", v: "14MS" },
          { k: "LIVE CHANNELS", v: "49,500" },
          { k: "UPTIME", v: "99.99%" },
        ]}
      />

      {/* Regional coverage bars */}
      <section className="border-b border-hair bg-paper py-24 md:py-32" ref={barsRef}>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <Eyebrow>Coverage by region</Eyebrow>
              <h2 className="display mt-5 text-ink text-[clamp(2rem,4.5vw,3.2rem)] text-balance">
                Graded, region by region.
              </h2>
              <p className="mt-6 max-w-sm text-[1.02rem] leading-relaxed text-mute text-pretty">
                Answer rate — the share of calls that actually get picked up — is the
                honest measure of a dialer route. Here is where we stand across the
                U.S. today, with the strongest region marked in orange.
              </p>
            </div>
            <div className="lg:pt-2">
              <div className="border-t border-hair">
                {REGIONS.map((r, i) => (
                  <RegionBar key={r.name} r={r} i={i} run={runBars} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* POPs */}
      <section className="border-b border-hair bg-ink py-24 md:py-32 text-paper">
        <Container>
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow dark>Where we plug in</Eyebrow>
              <h2 className="display mt-5 text-paper text-[clamp(2rem,4.5vw,3.2rem)] text-balance">
                Carrier hotels, coast to coast.
              </h2>
            </div>
            <p className="max-w-sm text-[1rem] leading-relaxed text-paper/80 text-pretty">
              Cross-connect to us in the U.S. carrier hotels you already live in. We
              can have your trunk live within 24 hours.
            </p>
          </div>

          <div className="border-t border-hair-ink">
            {POPS.map((p, i) => (
              <Reveal key={p.code} delay={i * 0.05}>
                <div className="group grid grid-cols-[auto_1fr] items-center gap-6 border-b border-hair-ink py-7 md:grid-cols-[120px_1fr_1fr_auto] md:gap-10">
                  <span className="display text-signal text-[1.8rem] leading-none">{p.code}</span>
                  <span className="text-[1.15rem] font-medium text-paper">{p.city}</span>
                  <span className="mono-label text-[0.8rem] text-paper/70">{p.site}</span>
                  <span className="hidden md:block mono-label text-[0.75rem] text-paper/55 tnum">{p.lat}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA strip */}
      <section className="bg-paper py-20 md:py-28">
        <Container>
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <h2 className="display max-w-2xl text-ink text-[clamp(1.8rem,4.5vw,3rem)] text-balance">
              Tell us where your calls need to go.
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
