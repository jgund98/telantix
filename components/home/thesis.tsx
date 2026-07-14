"use client";

import { Container } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { Mark } from "@/components/brand";

const CREDO = [
  "We sign every call at the edge.",
  "We never cap your channels.",
  "We answer as operators, not reps.",
];

export function Thesis() {
  return (
    <section className="relative overflow-hidden border-b border-hair bg-paper py-24 md:py-36">
      {/* Junction watermark — the mark as quiet texture, bleeding off-edge */}
      <div
        className="pointer-events-none absolute -right-24 -top-16 hidden opacity-[0.05] md:block"
        aria-hidden
      >
        <Mark variant="ink" className="h-[520px] w-auto" />
      </div>

      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
          {/* Left rail label */}
          <Reveal className="lg:pt-3">
            <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-6">
              <span className="eyebrow text-mute">What we believe</span>
              <span className="hidden lg:block h-24 w-px bg-hair" />
              <span className="mono-label text-[0.7rem] text-stone">
                BUILT BY OPERATORS
              </span>
            </div>
          </Reveal>

          {/* The statement + credo */}
          <div className="max-w-4xl">
            <Reveal>
              <p className="text-[clamp(1.7rem,3.8vw,3rem)] font-medium leading-[1.14] tracking-tight text-ink text-balance">
                Your carrier doesn&apos;t know what you do.{" "}
                <span className="text-signal">We built the one that does.</span>
              </p>
            </Reveal>

            {/* Credo — punch lines, not prose */}
            <div className="mt-12 border-t border-hair">
              {CREDO.map((line, i) => (
                <Reveal key={line} delay={0.08 + i * 0.08}>
                  <div className="group flex items-baseline gap-5 border-b border-hair py-6">
                    <span className="mt-2 block h-2.5 w-2.5 shrink-0 bg-signal transition-transform duration-300 group-hover:scale-125" />
                    <span className="text-[clamp(1.35rem,2.7vw,2rem)] font-medium leading-tight tracking-tight text-ink">
                      {line}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
