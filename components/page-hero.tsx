"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui";
import { AnimatedMark } from "@/components/brand";

const EASE = [0.22, 1, 0.36, 1] as const;

export function PageHero({
  eyebrow,
  title,
  lead,
  meta,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  meta?: { k: string; v: string }[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-hair bg-paper pt-16 pb-16 md:pt-20 md:pb-20">
      {/* Junction mark — quiet brand texture, flexes in on load */}
      <div className="pointer-events-none absolute -right-12 -top-8 hidden opacity-[0.05] md:block" aria-hidden>
        <AnimatedMark variant="ink" className="h-[380px] w-auto" />
      </div>
      <Container className="relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="eyebrow flex items-center gap-2.5 text-mute"
        >
          <span className="inline-block h-[7px] w-[7px] bg-signal" />
          {eyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          className="display mt-6 max-w-4xl text-ink text-[clamp(2.5rem,6.4vw,5.4rem)] text-balance"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
          className="mt-7 max-w-xl text-[1.1rem] leading-relaxed text-mute"
        >
          {lead}
        </motion.p>

        {meta && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
            className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-hair bg-hair sm:grid-cols-4"
          >
            {meta.map((m) => (
              <div key={m.k} className="bg-paper px-5 py-5">
                <div className="mono-label text-[0.65rem] text-stone">{m.k}</div>
                <div className="mono-label mt-2 text-[1rem] text-ink tnum">{m.v}</div>
              </div>
            ))}
          </motion.div>
        )}
      </Container>
    </section>
  );
}
