"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion";

type Service = {
  id: string;
  name: string;
  blurb: string;
  detail: string;
  specs: { k: string; v: string }[];
};

const SERVICES: Service[] = [
  {
    id: "SIP",
    name: "SIP Trunking",
    blurb: "Carrier-direct trunks tuned for dialers.",
    detail:
      "Trunks built for predictive dialing, not office phones. Native to VICIdial, GoAutoDial, Asterisk and FreeSWITCH, with no artificial concurrency cap and no per-channel fee — dial as hard as your campaign needs.",
    specs: [
      { k: "CHANNELS", v: "NO CAP" },
      { k: "DIALERS", v: "VICIDIAL · ASTERISK" },
      { k: "TRUNK LIVE", v: "UNDER 24H" },
    ],
  },
  {
    id: "CID",
    name: "Caller IDs & Numbers",
    blurb: "Local presence and toll-free, kept clean.",
    detail:
      "Local numbers in the area codes you dial, plus toll-free for inbound. We hold our own certificate and sign every call at A-level, then rotate and rest your caller IDs so they don't get burned or flagged.",
    specs: [
      { k: "NUMBERS", v: "LOCAL · TOLL-FREE" },
      { k: "SIGNING", v: "A-LEVEL" },
      { k: "CID POOL", v: "MANAGED" },
    ],
  },
  {
    id: "OUT",
    name: "Outbound Termination",
    blurb: "High-volume dialing carriers won't throttle.",
    detail:
      "Answer-rate-optimized routes that don't buckle when your traffic spikes. No sudden policy changes, no velocity throttling — just direct routes graded on the one number that matters: how many calls actually get answered.",
    specs: [
      { k: "ANSWER RATE", v: "UP TO 78%" },
      { k: "THROTTLING", v: "NONE" },
      { k: "ROUTES", v: "CARRIER-DIRECT" },
    ],
  },
];

function Row({ service, index }: { service: Service; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="group border-t border-hair last:border-b"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href="/termination"
        className="block"
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <div className="grid grid-cols-1 items-start gap-6 py-8 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10">
          {/* Index */}
          <div className="flex items-center gap-4">
            <span className="mono-label text-[0.72rem] text-stone">
              {service.id}
            </span>
            <motion.span
              className="hidden md:block h-2 w-2 bg-signal"
              animate={{ scale: open ? 1 : 0, opacity: open ? 1 : 0 }}
              transition={{ duration: 0.25 }}
            />
          </div>

          {/* Name + blurb */}
          <div>
            <div className="flex items-baseline gap-4">
              <h3 className="display text-ink text-[clamp(1.8rem,3.6vw,2.8rem)]">
                {service.name}
              </h3>
              <span
                aria-hidden
                className="hidden md:inline-block text-signal text-2xl transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </div>
            <p className="mt-2 text-[1.02rem] text-mute">{service.blurb}</p>
          </div>

          {/* Specs */}
          <div className="flex gap-8 md:justify-end">
            {service.specs.map((s) => (
              <div key={s.k} className="min-w-0">
                <div className="mono-label text-[0.62rem] text-stone">{s.k}</div>
                <div className="mono-label mt-1 text-[0.9rem] text-ink tnum whitespace-nowrap">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expanding detail */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="grid gap-6 pb-8 md:grid-cols-[auto_1fr] md:gap-10">
                <div className="hidden md:block" />
                <p className="max-w-2xl text-[1rem] leading-relaxed text-mute">
                  {service.detail}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>
    </div>
  );
}

export function Services() {
  return (
    <section className="border-b border-hair bg-paper py-24 md:py-32">
      <Container>
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>What we do</Eyebrow>
            <h2 className="display mt-5 text-ink text-[clamp(2.2rem,5vw,3.6rem)] text-balance">
              Three services, built for the dialer.
            </h2>
          </div>
          <p className="max-w-xs text-[1.02rem] leading-relaxed text-mute text-pretty">
            One carrier-direct connection. Read it like a spec sheet.
          </p>
        </div>

        <Reveal>
          <div>
            {SERVICES.map((s, i) => (
              <Row key={s.id} service={s} index={i} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
