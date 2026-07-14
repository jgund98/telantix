"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Container, Eyebrow, ButtonLink } from "@/components/ui";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";
import { Mark } from "@/components/brand";

const PRINCIPLES = [
  {
    tag: "EVIDENCE",
    head: "Proof, not promises.",
    body: "Every route earns its calls with a live number. If its connect rate drops, it loses the call — no handshakes, no exceptions.",
  },
  {
    tag: "DIRECTNESS",
    head: "Fewer hops, fewer excuses.",
    body: "We connect as close to the destination as we can and keep the path short. Short paths are honest paths.",
  },
  {
    tag: "TRANSPARENCY",
    head: "The same dashboard we use.",
    body: "You see the very numbers we make decisions on. No polished reports, no quarter-end quality — what we watch, you watch.",
  },
];

const AUDIENCE = [
  { k: "CALL CENTERS", v: "Clean caller ID, high volume, no throttling" },
  { k: "DIALER OPERATORS", v: "VICIdial-native trunks, no channel caps" },
  { k: "BPOs", v: "Multi-campaign routing under one carrier" },
  { k: "RESELLERS", v: "Routes and billing under your brand" },
];

export function CompanyContent() {
  const markRef = useRef(null);
  const markIn = useInView(markRef, { once: true, margin: "-20%" });

  return (
    <>
      <PageHero
        eyebrow="Company"
        title="A carrier built by operators."
        lead="We run our own dialers on our own network. Telantix is wholesale voice run like an engineering shop: quiet, precise, and allergic to the theater the phone industry usually runs on."
      />

      {/* Positioning statement */}
      <section className="border-b border-hair bg-paper py-24 md:py-32">
        <Container>
          <Reveal>
            <p className="max-w-4xl text-[clamp(1.5rem,3.4vw,2.6rem)] font-medium leading-[1.22] tracking-tight text-ink text-balance">
              We started Telantix because generic carriers had stopped answering for
              themselves. Trunks were sold on handshakes, caller IDs got burned, and
              support had never touched a dialer.{" "}
              <span className="text-signal">
                We wanted a carrier operators could hold to a number
              </span>{" "}
              — so we built one, and put the answer rate on the bill.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Principles */}
      <section className="border-b border-hair bg-paper py-24 md:py-32">
        <Container>
          <div className="mb-12">
            <Eyebrow>Operating principles</Eyebrow>
          </div>
          <div className="border-t-2 border-ink">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.tag} delay={i * 0.06}>
                <div className="grid grid-cols-1 gap-4 border-b border-hair py-10 md:grid-cols-[200px_1fr] md:gap-12">
                  <span className="mono-label text-[0.72rem] text-stone md:pt-2">{p.tag}</span>
                  <div>
                    <h3 className="display text-ink text-[clamp(1.7rem,3.6vw,2.6rem)]">{p.head}</h3>
                    <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-mute">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Who we serve */}
      <section className="border-b border-hair bg-ink py-24 md:py-32 text-paper">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <Eyebrow dark>Who we serve</Eyebrow>
              <h2 className="display mt-5 text-paper text-[clamp(2rem,4.5vw,3.2rem)] text-balance">
                If you dial for a living, we&apos;re your carrier.
              </h2>
            </div>
            <div className="border-t border-hair-ink lg:mt-2">
              {AUDIENCE.map((a) => (
                <div key={a.k} className="flex flex-col gap-1 border-b border-hair-ink py-6 sm:flex-row sm:items-center sm:justify-between">
                  <span className="display text-signal text-[1.4rem] leading-none">{a.k}</span>
                  <span className="text-[1rem] text-paper/75 sm:text-right">{a.v}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* The mark */}
      <section className="border-b border-hair bg-paper py-24 md:py-32" ref={markRef}>
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div className="flex justify-center lg:justify-start">
              <Mark variant="ink" className="h-56 w-auto md:h-72" animate={markIn} />
            </div>
            <div>
              <Eyebrow>The mark</Eyebrow>
              <h2 className="display mt-5 text-ink text-[clamp(2rem,4.5vw,3.2rem)]">
                The junction.
              </h2>
              <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-mute text-pretty">
                Two routes cross, and the orange one passes over the black. It is
                the whole company in a single shape — every call is a choice about
                which path wins, and the best route always comes out on top. No
                globe, no swoosh. Just the moment a route gets chosen.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-paper py-20 md:py-28">
        <Container>
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <h2 className="display max-w-2xl text-ink text-[clamp(1.8rem,4.5vw,3rem)] text-balance">
              Work with a carrier that keeps score.
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
