"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Mark } from "@/components/brand";
import { Container, ButtonLink } from "@/components/ui";

const PEERING = [
  { k: "CONNECT VIA", v: "SIP · dialer-native" },
  { k: "SIGNING", v: "A-level STIR / SHAKEN" },
  { k: "U.S. POPS", v: "16 · coast to coast" },
  { k: "GO LIVE", v: "Trunk live in under 24 hours" },
];

export function PeeringCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section className="bg-ink py-24 md:py-36 text-paper" ref={ref}>
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16">
          <div>
            <span className="eyebrow flex items-center gap-2.5 text-paper/75">
              <span className="inline-block h-[7px] w-[7px] bg-signal" />
              Talk to an operator
            </span>
            <h2 className="display mt-6 text-paper text-[clamp(2.8rem,8vw,6rem)]">
              Open a route.
            </h2>
            <p className="mt-6 max-w-md text-[1.1rem] leading-relaxed text-paper/80 text-pretty">
              Tell us what you dial and how hard. We&apos;ll stand up a dialer-grade
              trunk and hand you a live answer rate. No minimums — and a real
              operator on the line.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href="/connect" variant="signal">
                Request Routes
              </ButtonLink>
              <ButtonLink href="/quality" variant="ghostLight">
                See how we keep IDs clean
              </ButtonLink>
            </div>
          </div>

          {/* Peering fact sheet + animated mark */}
          <div className="relative">
            <div className="flex justify-end">
              <Mark
                variant="paper"
                className="h-28 w-auto"
                animate={inView}
              />
            </div>
            <div className="mt-8 border-t border-hair-ink">
              {PEERING.map((p) => (
                <div
                  key={p.k}
                  className="flex items-center justify-between border-b border-hair-ink py-4"
                >
                  <span className="mono-label text-[0.7rem] text-paper/70">{p.k}</span>
                  <span className="mono-label text-[0.9rem] text-paper">{p.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
